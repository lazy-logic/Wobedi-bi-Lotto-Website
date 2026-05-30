/**
 * Shared utilities.
 *
 * `cn` is the canonical class-merging helper used by every component:
 * - clsx handles conditional / array / object class lists
 * - twMerge resolves Tailwind conflicts (e.g. "px-2 px-4" → "px-4")
 *
 * Date formatters use en-GB so the site renders DD MMM YYYY (e.g. "27 Apr 2026"),
 * matching Ghanaian convention. NEVER format dates inline — always go through
 * these helpers so the convention stays consistent across the app.
 */
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(input: Date | string): string {
  const date = typeof input === "string" ? new Date(input) : input;
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function formatShortDate(input: Date | string): string {
  const date = typeof input === "string" ? new Date(input) : input;
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
  });
}

/**
 * Days from today until the next draw of a game on the given weekday(s).
 * Returns null if the game has no schedule. "daily" games return 1.
 *
 * If today IS one of the game's draw days, the most recent draw has
 * already happened — the next draw is the same weekday next week (7 days).
 *
 * `schedule` accepts the lib/games.ts day strings: "monday".."sunday" or "daily".
 */
const DOW_MAP: Record<string, number> = {
  sunday: 0,
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6,
};

export function daysUntilNextDraw(schedule: string[]): number | null {
  if (!schedule || schedule.length === 0) return null;
  if (schedule.includes("daily")) return 1;
  const todayDow = new Date().getDay();
  let min = Infinity;
  for (const day of schedule) {
    const target = DOW_MAP[day];
    if (target === undefined) continue;
    let diff = (target - todayDow + 7) % 7;
    if (diff === 0) diff = 7; // today already drawn; next is next week
    if (diff < min) min = diff;
  }
  return min === Infinity ? null : min;
}
