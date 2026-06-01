/**
 * /results — latest winning numbers, one clean card per game.
 *
 * Minimal by design: the page shows only the most-recent draw for each game as
 * a big, legible card. The freshest draw across all games gets a "just drawn"
 * marker. Per-game history lives on each game's /results/[slug] page (every
 * card links there), so this page stays fast and uncluttered — no archive
 * table, no filters.
 *
 * Server-rendered (RSC) via lib/data.ts so the data is in the HTML on first
 * byte (the §10 acceptance: 5 most-recent draws within 1.5s of navigation).
 */
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { LightSection } from "@/components/layout/LightSection";
import { LatestDrawCard } from "@/components/results/LatestDrawCard";
import { fetchGames, fetchLatestDraw } from "@/lib/data";

export const metadata: Metadata = {
  title: "Winning numbers",
  description:
    "The latest winning numbers for every Wobedi Bi Lotto draw, updated within minutes of the official NLA result.",
};

export default async function ResultsPage() {
  const games = await fetchGames();

  // Latest draw per game, parallel-fetched; keep only games that have a draw.
  const latestPerGame = (
    await Promise.all(
      games.map(async (g) => ({ game: g, draw: await fetchLatestDraw(g.slug) })),
    )
  ).filter((row) => row.draw !== undefined);

  // The single most-recent draw across all games gets the "just drawn" marker.
  const freshestSlug = latestPerGame.reduce<string | undefined>((best, row) => {
    if (!row.draw) return best;
    const bestDate = latestPerGame.find((r) => r.game.slug === best)?.draw?.drawDate;
    return !bestDate || row.draw.drawDate > bestDate ? row.game.slug : best;
  }, undefined);

  return (
    <>
      <PageHeader
        eyebrow="Results"
        title="The latest winning numbers."
        subtitle="One card per game, refreshed within minutes of every official NLA draw. Tap a game for its full history."
      />

      <LightSection className="py-12 md:py-16">
        <Container>
          {latestPerGame.length === 0 ? (
            <div className="mx-auto max-w-md rounded-2xl border border-brand-border bg-white p-12 text-center">
              <p className="font-display font-extrabold text-2xl text-brand-ink">
                No results yet.
              </p>
              <p className="mt-2 text-sm text-brand-ink-muted">
                Winning numbers appear here the moment each draw is published.
              </p>
            </div>
          ) : (
            <>
              {/* Count line */}
              <div className="mb-6 flex items-center gap-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-primary" />
                <span className="eyebrow text-brand-ink-muted">
                  Latest across {latestPerGame.length}{" "}
                  {latestPerGame.length === 1 ? "draw" : "draws"}
                </span>
              </div>

              {/* Clean card grid — one latest draw per game */}
              <div className="grid gap-x-4 md:gap-x-6 gap-y-8 md:gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
                {latestPerGame.map(({ game, draw }) => {
                  const isFreshest = game.slug === freshestSlug;
                  return (
                    <div
                      key={game.slug}
                      className={isFreshest ? "relative rounded-2xl signal-pulse" : undefined}
                    >
                      {isFreshest && (
                        <span className="absolute -top-2.5 left-4 z-10 inline-flex items-center gap-1.5 rounded-full bg-brand-signal px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-brand-signal-ink font-mono">
                          <span className="relative flex h-1.5 w-1.5">
                            <span className="absolute inline-flex h-full w-full rounded-full bg-brand-signal-ink opacity-60 animate-ping" />
                            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand-signal-ink" />
                          </span>
                          Latest draw
                        </span>
                      )}
                      <LatestDrawCard game={game} draw={draw!} animated />
                    </div>
                  );
                })}
              </div>

              {/* Quiet footnote — source + per-game history pointer */}
              <div className="mt-10 flex flex-col gap-3 border-t border-brand-border pt-6 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-brand-ink-muted">
                  Source: National Lottery Authority.
                </p>
                <Link
                  href="/games"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-primary hover:gap-2.5 transition-all"
                >
                  Browse all games
                  <ArrowRight size={16} strokeWidth={2} />
                </Link>
              </div>
            </>
          )}
        </Container>
      </LightSection>
    </>
  );
}
