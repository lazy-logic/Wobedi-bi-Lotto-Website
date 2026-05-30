/**
 * Pure filter helpers for the /results archive.
 *
 * URL-driven state: ?game=<slug>&from=YYYY-MM-DD&to=YYYY-MM-DD
 *
 * Date strings stay as ISO YYYY-MM-DD throughout — comparable lexicographically,
 * no tz pitfalls.
 */
import type { Draw } from "./results";

export type DrawFilterState = {
  gameSlug: string | null;
  from: string | null;
  to: string | null;
};

export function parseDrawFilters(searchParams: Record<string, string | string[] | undefined>): DrawFilterState {
  const gameRaw = searchParams.game;
  const fromRaw = searchParams.from;
  const toRaw = searchParams.to;

  return {
    gameSlug: typeof gameRaw === "string" && gameRaw.length > 0 ? gameRaw : null,
    from: typeof fromRaw === "string" && /^\d{4}-\d{2}-\d{2}$/.test(fromRaw) ? fromRaw : null,
    to: typeof toRaw === "string" && /^\d{4}-\d{2}-\d{2}$/.test(toRaw) ? toRaw : null,
  };
}

export function filterDraws(draws: Draw[], filters: DrawFilterState): Draw[] {
  return draws.filter((d) => {
    if (filters.gameSlug && d.gameSlug !== filters.gameSlug) return false;
    if (filters.from && d.drawDate < filters.from) return false;
    if (filters.to && d.drawDate > filters.to) return false;
    return true;
  });
}

export function hasActiveDrawFilters(filters: DrawFilterState): boolean {
  return Boolean(filters.gameSlug || filters.from || filters.to);
}
