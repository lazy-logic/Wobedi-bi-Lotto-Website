/**
 * Mock winning-numbers data.
 *
 * Until the Supabase `winning_numbers` table is wired (super prompt §8 step 6) and
 * the NLA results pipeline is in place (step 7), this seeds the UI with realistic
 * recent draws so the layouts have something to render.
 *
 * IMPORTANT: this is mock data. Per docs/nla-compliance.md §5, real winning numbers
 * MUST come from an authorised NLA mirror with a documented refresh cadence — never
 * scraped per-request. When the pipeline lands, swap the export for an async
 * function that hits Supabase; the helper signatures below are deliberately the
 * same shape so call-sites won't change.
 *
 * Date logic: each game has a scheduled day-of-week (Mon..Sun). Its most-recent
 * draw is calculated at module-load as the latest PAST occurrence of that day
 * (i.e. for a Wednesday game on a Friday, the latest draw is the Wednesday of
 * the same week; for a Wednesday game on a Tuesday, it's the previous Wednesday).
 * Earlier draws are 7 days back per occurrence. This keeps the dates honest in
 * dev — no more "Mid Week drawn on a Thursday" mismatches.
 */
export type Draw = {
  gameSlug: string;
  drawNumber: number;
  drawDate: string;
  numbers: number[];
  bonusNumbers?: number[];
};

// Day-of-week numbers per JS Date#getDay convention (0 = Sun ... 6 = Sat).
const DOW = {
  sun: 0,
  mon: 1,
  tue: 2,
  wed: 3,
  thu: 4,
  fri: 5,
  sat: 6,
} as const;

/**
 * Returns the ISO date string (YYYY-MM-DD) of the most recent past
 * occurrence of `dayOfWeek` relative to today. If today IS that day,
 * returns today.
 */
function lastOccurrenceOf(dayOfWeek: number): Date {
  const today = new Date();
  const todayDow = today.getDay();
  const daysBack = (todayDow - dayOfWeek + 7) % 7; // 0..6
  const d = new Date(today);
  d.setDate(d.getDate() - daysBack);
  return d;
}

/** ISO YYYY-MM-DD slice of a Date. */
function iso(d: Date): string {
  return d.toISOString().slice(0, 10);
}

/**
 * Build a sequence of draws for a game on a given weekday: the latest
 * (most recent past occurrence) and `count - 1` weekly draws before it.
 */
function buildDrawsForDay(
  gameSlug: string,
  dayOfWeek: number,
  startingDrawNumber: number,
  numberSets: number[][],
): Draw[] {
  const latest = lastOccurrenceOf(dayOfWeek);
  return numberSets.map((numbers, i) => {
    const d = new Date(latest);
    d.setDate(d.getDate() - i * 7);
    return {
      gameSlug,
      drawNumber: startingDrawNumber - i,
      drawDate: iso(d),
      numbers,
    };
  });
}

export const draws: Draw[] = [
  ...buildDrawsForDay("national-week-lotto", DOW.sat, 2154, [
    [12, 27, 34, 56, 78],
    [4, 19, 33, 47, 81],
    [8, 22, 41, 59, 73],
    [3, 17, 38, 52, 66],
  ]),
  ...buildDrawsForDay("mid-week", DOW.wed, 1187, [
    [7, 18, 31, 49, 82],
    [11, 23, 36, 54, 69],
    [2, 25, 44, 61, 88],
    [9, 21, 35, 57, 76],
  ]),
  ...buildDrawsForDay("monday-special", DOW.mon, 1124, [
    [10, 24, 37, 51, 70],
    [6, 20, 33, 58, 79],
  ]),
  ...buildDrawsForDay("lucky-tuesday", DOW.tue, 1320, [
    [13, 30, 45, 62, 87],
    [4, 17, 32, 60, 84],
  ]),
  ...buildDrawsForDay("fortune-thursday", DOW.thu, 1156, [
    [15, 22, 40, 53, 75],
    [3, 19, 43, 64, 89],
  ]),
  ...buildDrawsForDay("friday-bonanza", DOW.fri, 1232, [
    [8, 26, 35, 50, 77],
    [12, 29, 46, 65, 83],
  ]),
  ...buildDrawsForDay("sunday-aseda", DOW.sun, 198, [
    [5, 14, 29, 48, 71],
    [16, 28, 39, 55, 80],
    [1, 26, 42, 63, 85],
  ]),
];

export function getLatestDraw(gameSlug: string): Draw | undefined {
  return draws
    .filter((d) => d.gameSlug === gameSlug)
    .sort((a, b) => (a.drawDate < b.drawDate ? 1 : -1))[0];
}

export function getDrawsForGame(gameSlug: string, limit = 10): Draw[] {
  return draws
    .filter((d) => d.gameSlug === gameSlug)
    .sort((a, b) => (a.drawDate < b.drawDate ? 1 : -1))
    .slice(0, limit);
}

export function getRecentDrawsForGames(slugs: string[]): Draw[] {
  return slugs
    .map((slug) => getLatestDraw(slug))
    .filter((d): d is Draw => d !== undefined);
}

export function getAllDrawsSorted(): Draw[] {
  return [...draws].sort((a, b) => (a.drawDate < b.drawDate ? 1 : -1));
}
