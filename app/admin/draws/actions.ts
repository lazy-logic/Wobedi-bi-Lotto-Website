/**
 * Server actions for the /admin/draws CRUD surface.
 *
 * Three actions: create, update, delete. Each writes via Supabase using the
 * route-style client (cookies are writable so an in-flight session refresh
 * sticks). Public results pages are revalidated after every successful write
 * so visitors see the change immediately.
 *
 * Auth: middleware.ts already redirects unauthenticated users away from
 * /admin/*, so these actions trust the session is valid. The Supabase RLS
 * policies (migration 0002) require an authenticated role for writes — if the
 * cookie has somehow expired by the time the action runs, the DB rejects it.
 */
"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createRouteClient, isSupabaseConfigured } from "@/lib/supabase-server";

const NUMBER_PATTERN = /^\s*\d+\s*(?:[,\s]+\s*\d+\s*)*$/;

export type DrawActionResult =
  | { ok: true }
  | { ok: false; error: string };

function parseNumberList(raw: string, opts: { allowEmpty?: boolean } = {}): number[] | null {
  const trimmed = raw.trim();
  if (!trimmed) return opts.allowEmpty ? [] : null;
  if (!NUMBER_PATTERN.test(trimmed)) return null;
  const parts = trimmed.split(/[,\s]+/).filter(Boolean);
  const nums = parts.map((p) => Number(p));
  if (nums.some((n) => !Number.isFinite(n) || n < 1 || n > 90)) return null;
  return nums;
}

type DrawFormPayload = {
  gameId: string;
  drawNumber: number;
  drawDate: string;
  drawnAt: string | null;
  numbers: number[];
  bonusNumbers: number[];
  source: string;
  published: boolean;
};

function readForm(formData: FormData): DrawFormPayload | { error: string } {
  const gameId = String(formData.get("gameId") ?? "").trim();
  if (!gameId) return { error: "Pick a game." };

  const drawNumberRaw = String(formData.get("drawNumber") ?? "").trim();
  const drawNumber = Number(drawNumberRaw);
  if (!Number.isInteger(drawNumber) || drawNumber < 1) {
    return { error: "Draw number must be a positive integer." };
  }

  const drawDate = String(formData.get("drawDate") ?? "").trim();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(drawDate)) {
    return { error: "Draw date must be YYYY-MM-DD." };
  }

  const drawnAtRaw = String(formData.get("drawnAt") ?? "").trim();
  const drawnAt = drawnAtRaw ? new Date(drawnAtRaw).toISOString() : null;
  if (drawnAtRaw && drawnAt && Number.isNaN(new Date(drawnAtRaw).getTime())) {
    return { error: "Drawn-at timestamp is invalid." };
  }

  const numbers = parseNumberList(String(formData.get("numbers") ?? ""));
  if (!numbers || numbers.length === 0) {
    return { error: "Enter the winning numbers — comma- or space-separated, between 1 and 90." };
  }

  const bonusNumbers = parseNumberList(String(formData.get("bonusNumbers") ?? ""), {
    allowEmpty: true,
  });
  if (bonusNumbers === null) {
    return { error: "Bonus numbers must be 1–90, comma- or space-separated. Leave blank if there are none." };
  }

  const sourceRaw = String(formData.get("source") ?? "manual");
  const source = ["nla", "manual", "admin"].includes(sourceRaw) ? sourceRaw : "manual";

  const published = formData.get("published") === "on";

  return {
    gameId,
    drawNumber,
    drawDate,
    drawnAt,
    numbers,
    bonusNumbers,
    source,
    published,
  };
}

function revalidatePublicResults() {
  revalidatePath("/");
  revalidatePath("/results");
  revalidatePath("/games");
}

async function getClient() {
  const cookieStore = await cookies();
  return createRouteClient({
    getAll: () => cookieStore.getAll(),
    set: (name, value, options) => cookieStore.set(name, value, options),
  });
}

export async function createDraw(_prev: DrawActionResult | null, formData: FormData): Promise<DrawActionResult> {
  if (!isSupabaseConfigured()) {
    return { ok: false, error: "Supabase isn't configured. See docs/supabase-setup.md." };
  }
  const parsed = readForm(formData);
  if ("error" in parsed) return { ok: false, error: parsed.error };

  const supabase = await getClient();
  // Cast to never — the hand-written database.types.ts sometimes infers Insert
  // payloads as `never` due to deep-generic positions, same caveat noted in
  // lib/data.ts. Once `supabase gen types typescript --linked` runs, this can
  // drop the cast.
  const insertPayload = {
    game_id: parsed.gameId,
    draw_number: parsed.drawNumber,
    draw_date: parsed.drawDate,
    drawn_at: parsed.drawnAt,
    numbers: parsed.numbers,
    bonus_numbers: parsed.bonusNumbers,
    source: parsed.source as "nla" | "manual" | "admin",
    published: parsed.published,
  };
  const { error } = await supabase.from("draws").insert(insertPayload as never);
  if (error) {
    if (error.code === "23505") {
      return {
        ok: false,
        error: `A draw with number ${parsed.drawNumber} already exists for this game.`,
      };
    }
    return { ok: false, error: error.message };
  }
  revalidatePath("/admin/draws");
  revalidatePublicResults();
  redirect("/admin/draws");
}

export async function updateDraw(id: string, _prev: DrawActionResult | null, formData: FormData): Promise<DrawActionResult> {
  if (!isSupabaseConfigured()) {
    return { ok: false, error: "Supabase isn't configured. See docs/supabase-setup.md." };
  }
  if (!id) return { ok: false, error: "Missing draw id." };

  const parsed = readForm(formData);
  if ("error" in parsed) return { ok: false, error: parsed.error };

  const supabase = await getClient();
  const updatePayload = {
    game_id: parsed.gameId,
    draw_number: parsed.drawNumber,
    draw_date: parsed.drawDate,
    drawn_at: parsed.drawnAt,
    numbers: parsed.numbers,
    bonus_numbers: parsed.bonusNumbers,
    source: parsed.source as "nla" | "manual" | "admin",
    published: parsed.published,
  };
  const { error } = await supabase
    .from("draws")
    .update(updatePayload as never)
    .eq("id", id);
  if (error) {
    if (error.code === "23505") {
      return {
        ok: false,
        error: `A draw with number ${parsed.drawNumber} already exists for this game.`,
      };
    }
    return { ok: false, error: error.message };
  }
  revalidatePath("/admin/draws");
  revalidatePath(`/admin/draws/${id}/edit`);
  revalidatePublicResults();
  redirect("/admin/draws");
}

export async function deleteDraw(id: string): Promise<void> {
  if (!isSupabaseConfigured()) return;
  if (!id) return;
  const supabase = await getClient();
  const { error } = await supabase.from("draws").delete().eq("id", id);
  if (error) {
    throw new Error(error.message);
  }
  revalidatePath("/admin/draws");
  revalidatePublicResults();
}
