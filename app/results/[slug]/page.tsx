/**
 * /results/[slug] — per-game results archive. The deep-link target from the
 * hero strip cards on /results, the recent-results section on /games/[slug],
 * and the home page's results widget.
 *
 * Uses the shared PageHeader (brand-primary navy band) with breadcrumbs so
 * inner pages have visual consistency with /results, /games, /about, etc.
 *
 * The LatestDrawCard's layoutId ensures Framer Motion morphs the same card
 * across navigations rather than fading between disjoint cards.
 */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { LightSection } from "@/components/layout/LightSection";
import { LatestDrawCard } from "@/components/results/LatestDrawCard";
import { NumberRow } from "@/components/results/NumberRow";
import { games as mockGames } from "@/lib/games";
import { fetchGameBySlug, fetchLatestDraw, fetchDrawsForGame } from "@/lib/data";
import { formatDate, daysUntilNextDraw } from "@/lib/utils";
import {
  generateBreadcrumbSchema,
  generateGameSchema,
  jsonLd,
} from "@/lib/structured-data";

export function generateStaticParams() {
  return mockGames.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const game = await fetchGameBySlug(slug);
  if (!game) return { title: "Results" };
  return {
    title: `${game.name} results`,
    description: `Latest winning numbers and draw archive for ${game.name}.`,
    alternates: { canonical: `/results/${slug}` },
  };
}

export default async function GameResultsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const game = await fetchGameBySlug(slug);
  if (!game) notFound();

  const [latest, archive] = await Promise.all([
    fetchLatestDraw(game.slug),
    fetchDrawsForGame(game.slug, 50),
  ]);

  // Quick-scan stats for the per-game dashboard band.
  const daysToNext = daysUntilNextDraw(game.schedule);
  const now = new Date();
  const drawsThisMonth = archive.filter((d) => {
    const dt = new Date(d.drawDate);
    return dt.getMonth() === now.getMonth() && dt.getFullYear() === now.getFullYear();
  }).length;
  // Most-frequently-drawn number across the loaded archive.
  const freq = new Map<number, number>();
  for (const d of archive) {
    for (const n of d.numbers) freq.set(n, (freq.get(n) ?? 0) + 1);
  }
  let mostCommon: number | null = null;
  let mostCommonCount = 0;
  for (const [n, c] of freq) {
    if (c > mostCommonCount) {
      mostCommon = n;
      mostCommonCount = c;
    }
  }

  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Results", href: "/results" },
    { label: game.name },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(generateBreadcrumbSchema(crumbs)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(generateGameSchema(game, latest ?? undefined)) }}
      />
      <PageHeader
        eyebrow={game.scheduleLabel}
        title={`${game.name} results`}
        subtitle="Latest winning numbers, plus the full archive of past draws. Updated within minutes of each official NLA draw."
        breadcrumbs={crumbs}
      />

      {latest && (
        <LightSection className="py-12 md:py-16" wave="left">
          <Container>
            <LatestDrawCard
              game={game}
              draw={latest}
              linkToArchive={false}
              animated
            />
          </Container>
        </LightSection>
      )}

      {/* Quick-scan stats band — turns the archive into a small dashboard. */}
      {archive.length > 0 && (
        <LightSection className="py-8 md:py-10" wave="right">
          <Container>
            <div className="grid grid-cols-3 gap-px bg-brand-border rounded-2xl overflow-hidden">
              <div className="bg-white px-4 py-5 md:px-6 md:py-6 text-center">
                <p className="eyebrow text-brand-ink-muted mb-2">Next draw</p>
                <p className="font-display font-extrabold text-2xl md:text-3xl text-brand-primary tnum">
                  {daysToNext !== null ? (
                    <>
                      {daysToNext}
                      <span className="text-sm md:text-base text-brand-ink-muted font-bold ml-1">
                        {daysToNext === 1 ? "day" : "days"}
                      </span>
                    </>
                  ) : (
                    <span className="text-base text-brand-ink-muted font-bold">{game.scheduleLabel}</span>
                  )}
                </p>
              </div>
              <div className="bg-white px-4 py-5 md:px-6 md:py-6 text-center">
                <p className="eyebrow text-brand-ink-muted mb-2">This month</p>
                <p className="font-display font-extrabold text-2xl md:text-3xl text-brand-ink tnum">
                  {drawsThisMonth}
                  <span className="text-sm md:text-base text-brand-ink-muted font-bold ml-1">
                    {drawsThisMonth === 1 ? "draw" : "draws"}
                  </span>
                </p>
              </div>
              <div className="bg-white px-4 py-5 md:px-6 md:py-6 text-center">
                <p className="eyebrow text-brand-ink-muted mb-2">Most drawn</p>
                {mostCommon !== null ? (
                  <span
                    className="inline-flex items-center justify-center w-11 h-11 md:w-12 md:h-12 rounded-full font-display font-extrabold text-lg md:text-xl text-white tnum shadow-soft"
                    style={{ background: game.ballColor ?? "var(--color-brand-primary)" }}
                  >
                    {mostCommon}
                  </span>
                ) : (
                  <p className="text-base text-brand-ink-muted font-bold">, </p>
                )}
              </div>
            </div>
          </Container>
        </LightSection>
      )}

      <LightSection className="py-16 md:py-20" wave="left">
        <Container>
          <h2 className="font-display font-extrabold text-2xl md:text-3xl tracking-[-0.015em] mb-6">
            Archive
          </h2>
          {archive.length === 0 ? (
            <p className="text-brand-ink-muted">No draws published yet.</p>
          ) : (
            <ul className="divide-y divide-brand-border rounded-lg border border-brand-border bg-white">
              {archive.map((d) => (
                <li
                  key={d.drawNumber}
                  className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 px-5 md:px-6 py-5"
                >
                  <div>
                    <p className="font-medium text-brand-ink tnum">
                      {formatDate(d.drawDate)}
                    </p>
                    <p className="text-xs text-brand-ink-muted tnum">
                      Draw #{d.drawNumber}
                    </p>
                  </div>
                  <NumberRow
                    numbers={d.numbers}
                    bonusNumbers={d.bonusNumbers}
                    size="sm"
                    animated={false}
                  />
                </li>
              ))}
            </ul>
          )}
        </Container>
      </LightSection>
    </>
  );
}
