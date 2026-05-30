/**
 * GET /api/cron/sync-results
 *
 * Pull the last N days of draw results from the Moovon Lotus API and upsert
 * them into Supabase's `draws` table. Idempotent: keyed on `external_id`
 * (Lotus's `eventOccurrenceId`).
 *
 * Auth: must include `Authorization: Bearer ${CRON_SECRET}` — anything else
 * returns 401. The shared secret keeps the route private even though it
 * lives at a public path.
 *
 * ---------------------------------------------------------------------------
 * Deploy checklist (one-time, on EC2):
 *
 *   1. Add to /home/admin/wobedibi/shared/.env:
 *        LOTUS_API_BASE_URL=http://18.119.94.68/api
 *        LOTUS_API_TOKEN=<bearer>
 *        CRON_SECRET=<random-32+-char-string>
 *        SUPABASE_SERVICE_ROLE_KEY=<service-role-key>
 *      Then `sudo -n supervisorctl restart wobedibi`.
 *
 *   2. Apply the migration:
 *        supabase db push   (or paste 0003_lotus_sync.sql into Studio's SQL editor)
 *
 *   3. Add to admin's user crontab (run `crontab -e`). The schedule below
 *      runs every 15 minutes; substitute the real CRON_SECRET inline.
 *
 *          [slash-15] * * * * curl -fsS -m 30 \
 *              -H "Authorization: Bearer <CRON_SECRET>" \
 *              http://127.0.0.1:3002/api/cron/sync-results \
 *              >> /var/log/wobedibi-cron.log 2>&1
 *
 *      ([slash-15] is the literal Unix-cron `*` then slash then `15` — not
 *      written out here because the slash-star sequence would close this
 *      block comment.)
 * ---------------------------------------------------------------------------
 */
import { NextResponse, type NextRequest } from "next/server";
import { createServiceClient } from "@/lib/supabase-server";
import { fetchCheckDraw, parseDrawNumbers, type LotusCheckDrawRow } from "@/lib/lotus";
import type { GameRow } from "@/lib/database.types";

// Always run on the Node runtime (env access, Supabase service key).
// `force-dynamic` prevents Next.js from trying to cache the route's output.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SYNC_WINDOW_DAYS = 14;

type SyncSummary = {
  status: "ok";
  windowFrom: string;
  windowTo: string;
  fetched: number;
  upserted: number;
  skippedPending: number;
  skippedNoMapping: number;
  skippedMalformed: number;
  errors: string[];
};

export async function GET(req: NextRequest) {
  // ---- auth ---------------------------------------------------------------
  const authHeader = req.headers.get("authorization") ?? "";
  const expected = process.env.CRON_SECRET;
  if (!expected) {
    return NextResponse.json(
      { status: "error", message: "CRON_SECRET not configured on the server." },
      { status: 500 },
    );
  }
  if (authHeader !== `Bearer ${expected}`) {
    return NextResponse.json({ status: "error", message: "Unauthorized" }, { status: 401 });
  }

  // ---- date window --------------------------------------------------------
  const today = new Date();
  const start = new Date(today);
  start.setUTCDate(start.getUTCDate() - SYNC_WINDOW_DAYS);
  const windowFrom = start.toISOString().slice(0, 10);
  const windowTo = today.toISOString().slice(0, 10);

  // ---- fetch from Lotus ---------------------------------------------------
  let rows: LotusCheckDrawRow[];
  try {
    rows = await fetchCheckDraw({ fromDate: windowFrom, toDate: windowTo });
  } catch (err) {
    const cause =
      err instanceof Error && err.cause instanceof Error ? err.cause.message : undefined;
    return NextResponse.json(
      {
        status: "error",
        message: "Lotus fetch failed",
        details: err instanceof Error ? err.message : String(err),
        cause,
      },
      { status: 502 },
    );
  }

  // ---- resolve Lotus eventId → local game_id ------------------------------
  const supabase = createServiceClient();
  const { data: gamesData, error: gamesErr } = await supabase
    .from("games")
    .select("id, slug, external_event_ids");
  if (gamesErr || !gamesData) {
    return NextResponse.json(
      { status: "error", message: "Could not load games", details: gamesErr?.message },
      { status: 500 },
    );
  }

  const gameIdByEventId = new Map<number, string>();
  for (const g of gamesData as Pick<GameRow, "id" | "slug" | "external_event_ids">[]) {
    for (const eid of g.external_event_ids ?? []) {
      gameIdByEventId.set(eid, g.id);
    }
  }

  // ---- transform + upsert -------------------------------------------------
  const summary: SyncSummary = {
    status: "ok",
    windowFrom,
    windowTo,
    fetched: rows.length,
    upserted: 0,
    skippedPending: 0,
    skippedNoMapping: 0,
    skippedMalformed: 0,
    errors: [],
  };

  type DrawUpsert = {
    external_id: string;
    game_id: string;
    draw_number: number;
    draw_date: string;
    drawn_at: string | null;
    numbers: number[];
    bonus_numbers: number[];
    source: "nla";
    published: true;
  };

  const upserts: DrawUpsert[] = [];

  for (const row of rows) {
    const numbers = parseDrawNumbers(row.result);
    if (numbers === null) {
      summary.skippedPending += 1;
      continue;
    }
    if (numbers.length === 0) {
      summary.skippedMalformed += 1;
      continue;
    }
    const gameId = gameIdByEventId.get(row.eventId);
    if (!gameId) {
      summary.skippedNoMapping += 1;
      continue;
    }
    upserts.push({
      external_id: String(row.eventOccurrenceId),
      game_id: gameId,
      // No native "lifetime sequence number" on the Lotus side, so we use
      // eventOccurrenceId — monotonic, unique per draw, displays cleanly as
      // "Draw #1542". Replace with a real per-game counter if/when Lotus
      // exposes one.
      draw_number: row.eventOccurrenceId,
      draw_date: row.eventDate,
      drawn_at: row.drawDate ? new Date(row.drawDate.replace(" ", "T") + "Z").toISOString() : null,
      numbers,
      bonus_numbers: [],
      source: "nla",
      published: true,
    });
  }

  if (upserts.length > 0) {
    const { error: upsertErr, count } = await supabase
      .from("draws")
      .upsert(upserts, { onConflict: "external_id", count: "exact" });
    if (upsertErr) {
      summary.errors.push(`upsert failed: ${upsertErr.message}`);
    } else {
      summary.upserted = count ?? upserts.length;
    }
  }

  return NextResponse.json(summary, {
    status: summary.errors.length === 0 ? 200 : 207,
  });
}
