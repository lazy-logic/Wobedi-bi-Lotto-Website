/**
 * /games/[slug] — per-game detail page. Hero + how-to-play + recent results +
 * trust strip. See docs/wireframes.md §3.
 *
 * Uses generateStaticParams to pre-build a route per game at build time. This
 * still works with Supabase: Next builds the routes from the games table at
 * build, and ISR refreshes them on demand once draws update.
 *
 * Every game ships through the same channel — approved agents' NLA-licensed
 * POS terminals — and the CTA points at the how-to-play guide.
 */
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, MapPin, Store } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { LightSection } from "@/components/layout/LightSection";
import { PageHeader } from "@/components/layout/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { NumberRow } from "@/components/results/NumberRow";
import { GameLogo } from "@/components/games/GameLogo";
import { games as mockGames } from "@/lib/games";
import { fetchGameBySlug, fetchDrawsForGame } from "@/lib/data";
import { formatDate, daysUntilNextDraw } from "@/lib/utils";
import {
  generateBreadcrumbSchema,
  generateGameSchema,
  jsonLd,
} from "@/lib/structured-data";

// Pre-build paths from the seed data. When Supabase is the source of truth,
// the seed mirrors the DB so this stays accurate. Once the games table grows
// dynamic, swap to: const games = await fetchGames(); return games.map(...).
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
  if (!game) return { title: "Game not found" };
  return {
    title: game.name,
    description: game.longDescription,
    alternates: { canonical: `/games/${slug}` },
  };
}

const channelMeta: Record<string, { label: string; icon: typeof MapPin }> = {
  standard: { label: "Standard", icon: MapPin },
  pos: { label: "POS only", icon: Store },
};
const defaultChannel = channelMeta.standard;

export default async function GameDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const game = await fetchGameBySlug(slug);
  if (!game) notFound();

  const draws = await fetchDrawsForGame(game.slug, 5);
  // Defensive fallback for legacy channel values (e.g. `ussd` rows in
  // Supabase from before the 2026-04-30 catalogue cleanup).
  const channel = channelMeta[game.channel] ?? defaultChannel;
  const ChannelIcon = channel.icon;

  const isPosOnly = game.channel === "pos";
  const daysToNext = daysUntilNextDraw(game.schedule);

  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Games", href: "/games" },
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
        dangerouslySetInnerHTML={{ __html: jsonLd(generateGameSchema(game, draws[0])) }}
      />
      <PageHeader
        eyebrow={game.scheduleLabel}
        title={game.name}
        subtitle={game.longDescription}
        breadcrumbs={crumbs}
      />

      {/* Details strip — badges + CTA on left, ball on right */}
      <LightSection wave="left">
        <Container>
          <div className="py-12 md:py-16 grid gap-10 md:grid-cols-12 items-center">
            <div className="md:col-span-7">
              <div className="flex flex-wrap gap-2">
                {/* Only show the schedule chip when a real draw day is known —
                    "Schedule TBC" reads as a placeholder, so it's suppressed.
                    The channel chip is dropped entirely: every game is the same
                    "standard" channel, so it added no information. */}
                {game.scheduleLabel !== "Schedule TBC" && (
                  <Badge variant="default">{game.scheduleLabel}</Badge>
                )}
                {game.channelDetail && (
                  <Badge variant="secondary">
                    <ChannelIcon size={12} strokeWidth={2} />
                    {game.channelDetail}
                  </Badge>
                )}
                <Badge variant="muted">5/90 fixed odds</Badge>
                {game.priceGhs && (
                  <Badge variant="muted">GHS {game.priceGhs}</Badge>
                )}
              </div>
              <div className="mt-8">
                <Link
                  href="/how-to-play"
                  className="inline-flex items-center gap-2 h-12 px-7 rounded-full bg-brand-primary text-white text-base font-semibold hover:bg-brand-primary-deep transition-all"
                >
                  How to play
                  <ArrowRight size={18} strokeWidth={2} />
                </Link>
              </div>
            </div>
            <div className="md:col-span-5">
              <div className="relative aspect-square flex items-center justify-center max-w-sm mx-auto">
                <div
                  aria-hidden
                  className="absolute inset-[8%] rounded-full bg-gradient-to-br from-brand-secondary/30 via-brand-primary/15 to-transparent blur-3xl"
                />
                <div className="relative w-[72%]">
                  <GameLogo game={game} size={600} />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </LightSection>

      {/* Next-draw band — server-computed from the game schedule, gold
          accent for the "next draw" countdown (a live/forthcoming moment). */}
      <section className="bg-brand-paper-warm text-white border-y border-brand-border">
        <Container>
          <div className="py-6 md:py-7 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <span className="eyebrow text-white/70">Next draw</span>
            <p className="font-display font-extrabold text-xl md:text-2xl tracking-tight">
              {daysToNext !== null ? (
                <>
                  <span className="text-brand-signal tnum">
                    {daysToNext} {daysToNext === 1 ? "day" : "days"}
                  </span>{" "}
                  <span className="text-white/80 font-semibold text-base md:text-lg">
                    · {game.scheduleLabel}
                    {game.drawTime ? ` · ${game.drawTime}` : ""}
                  </span>
                </>
              ) : (
                <span className="text-white/80 font-semibold text-base md:text-lg">
                  Drawn {game.scheduleLabel}
                </span>
              )}
            </p>
          </div>
        </Container>
      </section>

      <LightSection className="py-20 md:py-24" wave="left">
        <Container>
          <p className="eyebrow text-brand-primary mb-3">
            How to play
          </p>
          <h2 className="text-4xl md:text-5xl mb-10">
            Three steps from start to draw.
          </h2>
          <div className="grid gap-4 md:gap-6 md:grid-cols-3">
            {[
              {
                n: "1",
                title: "Visit an approved POS",
                body: isPosOnly
                  ? "POS-only game. Walk into any approved agent and look for the NLA-licensed sticker."
                  : "Walk into any approved Wobedi Bi Lotto agent and play on their NLA-licensed POS terminal.",
              },
              {
                n: "2",
                title: "Pick your numbers",
                body:
                  "Choose your numbers manually, or ask the agent for a Quick Pick.",
              },
              {
                n: "3",
                title: "Wait for the draw",
                body: `Drawn ${game.scheduleLabel.toLowerCase()}. Results appear here within minutes.`,
              },
            ].map((step) => (
              <div
                key={step.n}
                className="rounded-lg border border-brand-border bg-white p-6"
              >
                <div className="font-display font-extrabold text-4xl text-brand-primary tnum">
                  {step.n}
                </div>
                <h3 className="font-display text-xl mt-2">{step.title}</h3>
                <p className="text-sm text-brand-ink-muted mt-2 leading-relaxed">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
          <Link
            href="/how-to-play"
            className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-brand-primary hover:gap-2.5 transition-all"
          >
            Read the full how-to-play guide
            <ArrowRight size={16} strokeWidth={1.75} />
          </Link>
        </Container>
      </LightSection>

      <LightSection className="py-16 md:py-20" wave="right">
        <Container>
          <div className="flex items-end justify-between gap-6 mb-8">
            <div>
              <p className="eyebrow text-brand-primary mb-3">
                Recent results
              </p>
              <h2 className="text-4xl md:text-5xl">
                Last five draws
              </h2>
            </div>
            <Link
              href={`/results/${game.slug}`}
              className="hidden md:inline-flex items-center gap-1.5 text-sm font-medium text-brand-primary hover:gap-2.5 transition-all whitespace-nowrap"
            >
              Full archive
              <ArrowRight size={16} strokeWidth={1.75} />
            </Link>
          </div>
          {draws.length === 0 ? (
            <p className="text-brand-ink-muted">
              Draws will appear here once results are published.
            </p>
          ) : (
            <ul className="divide-y divide-brand-border rounded-lg border border-brand-border bg-white" aria-label="Recent draws">
              {draws.map((d, i) => (
                <li
                  key={d.drawNumber}
                  className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 px-5 md:px-6 py-5"
                >
                  <div>
                    <p className="font-medium text-brand-ink tnum">
                      {formatDate(d.drawDate)}
                      {i === 0 && (
                        <span className="ml-2 inline-flex items-center gap-1 align-middle px-2 py-0.5 rounded-full bg-brand-signal-soft text-brand-signal-deep text-[10px] font-bold uppercase tracking-wider">
                          Latest
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-brand-ink-muted tnum">
                      Draw #{d.drawNumber}
                    </p>
                  </div>
                  {/* Only the most-recent draw animates in — the rationed
                      delight moment; history stays static. */}
                  <NumberRow
                    numbers={d.numbers}
                    bonusNumbers={d.bonusNumbers}
                    size="sm"
                    animated={i === 0}
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
