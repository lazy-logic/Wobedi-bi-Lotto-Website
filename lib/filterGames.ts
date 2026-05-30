/**
 * Pure filter helpers for the /games catalogue.
 *
 * Lives in lib/ so both server pages and client filter bars import the same
 * logic. State is URL-driven (?day=fri&channel=ussd) — see GamesFilterBar.
 *
 * Day filter values are short codes ("mon", "tue", ...) NOT full day names,
 * so URLs stay short. The mapping to Game.schedule values lives below.
 *
 * Channel option `ussd` was retired 2026-04-30 — the marketing site no longer
 * surfaces USSD as a play channel. The `pos` option stays in case the catalogue
 * adds a POS-only game in future.
 */
import type { Game, GameChannel, GameDay } from "./games";

export const DAY_OPTIONS: { code: string; day: GameDay; label: string; short: string }[] = [
  { code: "mon", day: "monday", label: "Monday", short: "Mon" },
  { code: "tue", day: "tuesday", label: "Tuesday", short: "Tue" },
  { code: "wed", day: "wednesday", label: "Wednesday", short: "Wed" },
  { code: "thu", day: "thursday", label: "Thursday", short: "Thu" },
  { code: "fri", day: "friday", label: "Friday", short: "Fri" },
  { code: "sat", day: "saturday", label: "Saturday", short: "Sat" },
  { code: "sun", day: "sunday", label: "Sunday", short: "Sun" },
  { code: "daily", day: "daily", label: "Daily", short: "Daily" },
];

export const CHANNEL_OPTIONS: { value: GameChannel | "all"; label: string }[] = [
  { value: "all", label: "All channels" },
  { value: "standard", label: "Standard" },
  { value: "pos", label: "POS only" },
];

export type GameFilterState = {
  day: string | null;
  channel: GameChannel | "all";
};

export function parseGameFilters(searchParams: Record<string, string | string[] | undefined>): GameFilterState {
  const dayRaw = searchParams.day;
  const day = typeof dayRaw === "string" && DAY_OPTIONS.some((o) => o.code === dayRaw) ? dayRaw : null;

  const channelRaw = searchParams.channel;
  const channel: GameChannel | "all" =
    channelRaw === "standard" || channelRaw === "pos" ? channelRaw : "all";

  return { day, channel };
}

export function filterGames(games: Game[], filters: GameFilterState): Game[] {
  return games.filter((g) => {
    if (filters.channel !== "all" && g.channel !== filters.channel) return false;
    if (filters.day) {
      const dayOption = DAY_OPTIONS.find((o) => o.code === filters.day);
      if (!dayOption) return true;
      if (!g.schedule.includes(dayOption.day)) return false;
    }
    return true;
  });
}
