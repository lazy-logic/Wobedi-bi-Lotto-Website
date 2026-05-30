/**
 * Async data access layer.
 *
 * Every page imports from HERE, not from lib/games.ts or lib/results.ts directly.
 * The async functions below check whether Supabase is configured (env vars set)
 * and either:
 *   - hit Supabase via the server-side client, or
 *   - fall back to the in-memory seed data
 *
 * That means the site renders with mock data out of the box, and switches to
 * real data automatically the moment NEXT_PUBLIC_SUPABASE_URL +
 * NEXT_PUBLIC_SUPABASE_ANON_KEY are set in .env.local. No code changes needed
 * to flip the switch.
 *
 * All functions are async server-side reads. Never import this from a client
 * component — pass the result down as props instead.
 */
import { cookies } from "next/headers";
import { createServerClient, isSupabaseConfigured } from "./supabase-server";
import {
  games as mockGames,
  type Game,
  type GameChannel,
  type GameDay,
} from "./games";
import { draws as mockDraws, type Draw } from "./results";
import type { GameRow, DrawRow, DrawSourceDb } from "./database.types";

// ---------------------------------------------------------------------------
// Error helper.
//
// Supabase / PostgREST errors stringify to `{}` when passed straight to
// console.* because their fields are non-enumerable — produce a useful
// message ourselves. Also detect "table not found" cases (typical when the
// project is set up but migrations haven't been applied) and downgrade
// those to a single warn with actionable advice instead of repeated errors.
// ---------------------------------------------------------------------------
type SupabaseErrorShape = {
  message?: string;
  code?: string;
  details?: string;
  hint?: string;
};

const TABLE_NOT_FOUND_CODES = new Set(["42P01", "PGRST205", "PGRST204"]);
const warnedAboutMissingSchema = new Set<string>();

function reportSupabaseError(context: string, error: unknown): void {
  if (!error) return;
  const e = error as SupabaseErrorShape;
  if (e.code && TABLE_NOT_FOUND_CODES.has(e.code)) {
    if (!warnedAboutMissingSchema.has(context)) {
      warnedAboutMissingSchema.add(context);
      console.warn(
        `[data] ${context}: Supabase tables not found (${e.code}). ` +
          `Falling back to in-memory mocks. ` +
          `Apply the schema with \`supabase db push\` (see docs/supabase-setup.md).`,
      );
    }
    return;
  }
  console.error(`[data] ${context} failed:`, {
    message: e.message ?? String(error),
    code: e.code,
    details: e.details,
    hint: e.hint,
  });
}

// ---------------------------------------------------------------------------
// Retired-slug denylist.
//
// 2026-04-30 / 05-01: Lucky 3 + Daywa 5/39 Direct were removed from the live
// catalogue. The Supabase rows persist until `supabase/seed.sql`'s cleanup
// `DELETE` is re-applied — until then the public-facing read paths filter
// these out so they don't reappear on /games or /results.
//
// Remove from this set once the DB cleanup has run.
// ---------------------------------------------------------------------------
const RETIRED_SLUGS = new Set(["lucky-3", "daywa-5-39-direct"]);

// ---------------------------------------------------------------------------
// Mappers — Supabase rows → app types. Keep schemas decoupled from UI types
// so a column rename doesn't ripple through every component.
// ---------------------------------------------------------------------------
function mapGameRow(row: GameRow): Game {
  // Per-game logos live at /public/games/<slug>.png. The Supabase row's
  // `logo_url` column is optional — if a logo file exists at the conventional
  // path we use that; otherwise the GameLogo component falls back to the
  // monogram letter. Looking up the mock record gives us the truth about
  // whether the file exists.
  const fromMock = mockGames.find((g) => g.slug === row.slug);
  return {
    slug: row.slug,
    name: row.name,
    hook: row.hook,
    longDescription: row.long_description,
    schedule: row.schedule as GameDay[],
    scheduleLabel: row.schedule_label,
    drawTime: row.draw_time,
    priceGhs: row.price_ghs,
    channel: row.channel as GameChannel,
    channelDetail: row.channel_detail,
    prizeStructure: row.prize_structure,
    featured: row.featured,
    introducedYear: row.introduced_year,
    logoUrl: row.logo_url ?? fromMock?.logoUrl,
    ballColor: fromMock?.ballColor,
    externalEventIds: row.external_event_ids ?? [],
  };
}

function mapDrawRow(row: DrawRow, gameSlug: string): Draw {
  return {
    gameSlug,
    drawNumber: row.draw_number,
    drawDate: row.draw_date,
    numbers: row.numbers,
    bonusNumbers: row.bonus_numbers.length > 0 ? row.bonus_numbers : undefined,
  };
}

// ---------------------------------------------------------------------------
// Games
// ---------------------------------------------------------------------------
export async function fetchGames(): Promise<Game[]> {
  if (!isSupabaseConfigured()) return mockGames;
  const supabase = createServerClient(await cookies());
  const { data, error } = await supabase
    .from("games")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error || !data) {
    reportSupabaseError("fetchGames", error);
    return mockGames;
  }
  return (data as GameRow[])
    .filter((row) => !RETIRED_SLUGS.has(row.slug))
    .map(mapGameRow);
}

export async function fetchGameBySlug(slug: string): Promise<Game | undefined> {
  if (RETIRED_SLUGS.has(slug)) return undefined;
  if (!isSupabaseConfigured()) return mockGames.find((g) => g.slug === slug);
  const supabase = createServerClient(await cookies());
  const { data, error } = await supabase
    .from("games")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  if (error) {
    reportSupabaseError("fetchGameBySlug", error);
    return mockGames.find((g) => g.slug === slug);
  }
  return data ? mapGameRow(data as GameRow) : undefined;
}

export async function fetchFeaturedGames(): Promise<Game[]> {
  const all = await fetchGames();
  return all.filter((g) => g.featured);
}

// ---------------------------------------------------------------------------
// Draws
// ---------------------------------------------------------------------------
// Resolve slug → id once per request; per-slug fetches are cheap enough that
// we keep the lookup uncached. If profiling later shows hot-path pressure,
// memoise per request via React's `cache()`.
//
// Types: hand-written database.types.ts sometimes infers `never` in deep
// generic positions (a known Supabase typing limitation pre-CLI). We cast
// narrow result rows here. `supabase gen types typescript --linked` will
// produce a fully-inferred file once the project is linked — at that point,
// remove these casts.
async function resolveGameId(slug: string): Promise<string | null> {
  const supabase = createServerClient(await cookies());
  const { data } = await supabase.from("games").select("id").eq("slug", slug).maybeSingle();
  return (data as { id: string } | null)?.id ?? null;
}

export async function fetchLatestDraw(gameSlug: string): Promise<Draw | undefined> {
  if (!isSupabaseConfigured()) {
    return mockDraws
      .filter((d) => d.gameSlug === gameSlug)
      .sort((a, b) => (a.drawDate < b.drawDate ? 1 : -1))[0];
  }
  const gameId = await resolveGameId(gameSlug);
  if (!gameId) return undefined;
  const supabase = createServerClient(await cookies());
  const { data, error } = await supabase
    .from("draws")
    .select("*")
    .eq("game_id", gameId)
    .eq("published", true)
    .order("draw_date", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (error || !data) return undefined;
  return mapDrawRow(data as DrawRow, gameSlug);
}

export async function fetchDrawsForGame(gameSlug: string, limit = 10): Promise<Draw[]> {
  if (!isSupabaseConfigured()) {
    return mockDraws
      .filter((d) => d.gameSlug === gameSlug)
      .sort((a, b) => (a.drawDate < b.drawDate ? 1 : -1))
      .slice(0, limit);
  }
  const gameId = await resolveGameId(gameSlug);
  if (!gameId) return [];
  const supabase = createServerClient(await cookies());
  const { data, error } = await supabase
    .from("draws")
    .select("*")
    .eq("game_id", gameId)
    .eq("published", true)
    .order("draw_date", { ascending: false })
    .limit(limit);
  if (error || !data) return [];
  return (data as DrawRow[]).map((d) => mapDrawRow(d, gameSlug));
}

export async function fetchAllDrawsSorted(limit = 50): Promise<Draw[]> {
  if (!isSupabaseConfigured()) {
    return mockDraws
      .slice()
      .sort((a, b) => (a.drawDate < b.drawDate ? 1 : -1))
      .slice(0, limit);
  }
  const supabase = createServerClient(await cookies());
  // Fetch games + draws in parallel, then resolve game_id → slug in memory.
  // Cleaner than juggling Supabase's join-typing for a tiny in-memory join.
  const [gamesResult, drawsResult] = await Promise.all([
    supabase.from("games").select("id, slug"),
    supabase
      .from("draws")
      .select("*")
      .eq("published", true)
      .order("draw_date", { ascending: false })
      .limit(limit),
  ]);
  if (gamesResult.error || drawsResult.error || !gamesResult.data || !drawsResult.data) {
    reportSupabaseError("fetchAllDrawsSorted (games)", gamesResult.error);
    reportSupabaseError("fetchAllDrawsSorted (draws)", drawsResult.error);
    // When Supabase isn't ready (no schema yet), fall back to the mock draws
    // sorted the same way as the in-memory branch above.
    return mockDraws
      .slice()
      .sort((a, b) => (a.drawDate < b.drawDate ? 1 : -1))
      .slice(0, limit);
  }
  // Narrow casts — see note in resolveGameId above.
  const gamesNarrow = gamesResult.data as { id: string; slug: string }[];
  const drawsNarrow = drawsResult.data as DrawRow[];
  const slugById = new Map(gamesNarrow.map((g) => [g.id, g.slug]));
  return drawsNarrow
    .map((d) => {
      const slug = slugById.get(d.game_id);
      if (!slug || RETIRED_SLUGS.has(slug)) return null;
      return mapDrawRow(d, slug);
    })
    .filter((d): d is Draw => d !== null);
}

/**
 * Convenience for the home page: pulls the latest draw per game, then sorts
 * by date desc and slices.
 */
export async function fetchRecentLatestDrawsAcrossGames(slugs: string[]): Promise<Draw[]> {
  const results = await Promise.all(slugs.map((s) => fetchLatestDraw(s)));
  return results.filter((d): d is Draw => d !== undefined);
}

// ---------------------------------------------------------------------------
// Admin-only reads. Bypass the `published = true` filter so editors can see
// drafts.
// ---------------------------------------------------------------------------
export type AdminDrawRow = Draw & {
  id: string;
  gameName: string;
  published: boolean;
  source: DrawSourceDb;
};

export async function fetchAllDrawsForAdmin(limit = 200): Promise<AdminDrawRow[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = createServerClient(await cookies());
  const [gamesResult, drawsResult] = await Promise.all([
    supabase.from("games").select("id, slug, name"),
    supabase
      .from("draws")
      .select("*")
      .order("draw_date", { ascending: false })
      .limit(limit),
  ]);
  if (gamesResult.error || drawsResult.error || !gamesResult.data || !drawsResult.data) {
    reportSupabaseError("fetchAllDrawsForAdmin (games)", gamesResult.error);
    reportSupabaseError("fetchAllDrawsForAdmin (draws)", drawsResult.error);
    return [];
  }
  const gamesNarrow = gamesResult.data as { id: string; slug: string; name: string }[];
  const drawsNarrow = drawsResult.data as DrawRow[];
  const gameById = new Map(gamesNarrow.map((g) => [g.id, g]));
  return drawsNarrow
    .map((d) => {
      const game = gameById.get(d.game_id);
      if (!game) return null;
      return {
        ...mapDrawRow(d, game.slug),
        id: d.id,
        gameName: game.name,
        published: d.published,
        source: d.source,
      };
    })
    .filter((d): d is AdminDrawRow => d !== null);
}

export type AdminDrawDetail = {
  id: string;
  gameId: string;
  gameSlug: string;
  drawNumber: number;
  drawDate: string;
  drawnAt: string | null;
  numbers: number[];
  bonusNumbers: number[];
  source: string;
  published: boolean;
};

export async function fetchDrawByIdForAdmin(id: string): Promise<AdminDrawDetail | null> {
  if (!isSupabaseConfigured()) return null;
  const supabase = createServerClient(await cookies());
  const { data, error } = await supabase
    .from("draws")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error || !data) {
    reportSupabaseError("fetchDrawByIdForAdmin", error);
    return null;
  }
  const draw = data as DrawRow;
  const { data: gameData } = await supabase
    .from("games")
    .select("slug")
    .eq("id", draw.game_id)
    .maybeSingle();
  const slug = (gameData as { slug: string } | null)?.slug ?? "";
  return {
    id: draw.id,
    gameId: draw.game_id,
    gameSlug: slug,
    drawNumber: draw.draw_number,
    drawDate: draw.draw_date,
    drawnAt: draw.drawn_at,
    numbers: draw.numbers,
    bonusNumbers: draw.bonus_numbers,
    source: draw.source,
    published: draw.published,
  };
}

export async function fetchGamesForAdmin(): Promise<{ id: string; slug: string; name: string }[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = createServerClient(await cookies());
  const { data, error } = await supabase
    .from("games")
    .select("id, slug, name")
    .order("sort_order", { ascending: true });
  if (error || !data) {
    reportSupabaseError("fetchGamesForAdmin", error);
    return [];
  }
  return data as { id: string; slug: string; name: string }[];
}
