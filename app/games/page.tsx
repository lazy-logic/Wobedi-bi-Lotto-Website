/**
 * /games — full catalogue, image-led modern grid.
 *
 * Top section is the shared PageHeader (brand-primary navy band) for visual
 * consistency with other non-home pages. Filters + grid follow underneath.
 *
 * Filters (day-of-week, channel) are URL-driven via GamesFilterBar (client).
 * Server component: parses searchParams, fetches games + per-game latest
 * draws via lib/data.ts, runs filterGames() pure-function, ships everything
 * down.
 */
import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { GameTile } from "@/components/games/GameTile";
import { GamesFilterBar } from "@/components/games/GamesFilterBar";
import { LightSection } from "@/components/layout/LightSection";
import { fetchGames, fetchLatestDraw } from "@/lib/data";
import { filterGames, parseGameFilters } from "@/lib/filterGames";

export const metadata: Metadata = {
  title: "Games",
  description:
    "Every NLA-licensed game we operate at Wobedi Bi Lotto. Filter by day or channel; tap a game to see its rules, schedule, and recent results.",
};

export default async function GamesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const filters = parseGameFilters(params);

  const allGames = await fetchGames();
  const filtered = filterGames(allGames, filters);
  const latestDraws = await Promise.all(filtered.map((g) => fetchLatestDraw(g.slug)));

  return (
    <>
      <PageHeader
        eyebrow="Our games"
        title="Pick your game, pick your day."
        subtitle={`${allGames.length} draws across the week. Tap any game for its schedule, how it works, and recent winning numbers.`}
      />

      <LightSection className="pt-6 md:pt-8 pb-12 md:pb-16">
        <Container>
          <GamesFilterBar />
        </Container>
        <Container>
          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-brand-border bg-brand-paper-muted p-16 text-center">
              <p className="font-display font-extrabold text-3xl text-brand-ink">
                No games match those filters.
              </p>
              <p className="mt-3 text-base text-brand-ink-muted">
                Try clearing them. Every game is here somewhere.
              </p>
            </div>
          ) : (
            <>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-ink-muted mb-6 tnum">
                Showing {filtered.length} of {allGames.length} games
              </p>
              <div className="grid scroll-mt-36 md:scroll-mt-44 gap-5 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filtered.map((g, i) => (
                  <GameTile key={g.slug} game={g} latestDraw={latestDraws[i]} />
                ))}
              </div>
            </>
          )}
        </Container>
      </LightSection>
    </>
  );
}
