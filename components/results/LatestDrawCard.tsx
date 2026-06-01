/**
 * The signature card that surfaces a single game's most recent draw.
 *
 * Used in three places: the Home results widget, the Results page grid, and
 * the per-game results detail.
 *
 * "Result ticket" design: a clean white card where the WINNING NUMBERS lead at
 * the top as the dominant element, separated from the game details by a
 * perforated (dashed) divider with notch cut-outs — like a lottery slip. The
 * game's colour shows only as a small dot + the accent on the day and CTA, so
 * the numbers stay the focus and the grid reads calm but distinctive.
 *
 * The `layoutId` makes the card a shared-element transition target for Framer
 * Motion when navigating between Home, Results, and Game Detail.
 */
"use client";

import Image from "next/image";
import Link from "next/link";
import { m } from "framer-motion";
import { ArrowRight, CalendarClock } from "lucide-react";
import { NumberRow } from "./NumberRow";
import { WaveRibbon } from "@/components/ui/WaveRibbon";
import type { Game } from "@/lib/games";
import type { Draw } from "@/lib/results";
import { formatDate, daysUntilNextDraw, cn } from "@/lib/utils";

type Props = {
  game: Game;
  draw: Draw;
  className?: string;
  /**
   * When true (default) the whole card is a link to /results/[slug]. Set false
   * on the per-game results page where the card IS the focus and would link
   * to itself.
   */
  linkToArchive?: boolean;
  animated?: boolean;
};

export function LatestDrawCard({
  game,
  draw,
  className,
  linkToArchive = true,
  animated = true,
}: Props) {
  const accent = game.ballColor ?? "#0a6ed3";
  const daysToNext = daysUntilNextDraw(game.schedule);

  const inner = (
    <m.article
      layoutId={`draw-${game.slug}`}
      transition={{ duration: 0.4, ease: [0.3, 0, 0, 1] }}
      style={{ ["--accent" as string]: accent }}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-brand-border bg-white transition-all duration-300 ease-[var(--ease-gentle)]",
        linkToArchive && "hover:-translate-y-1 hover:border-brand-border-strong",
        className,
      )}
    >
      {/* A small accent tab on the left edge — the card's colour identifier. */}
      <span
        aria-hidden
        className="pointer-events-none absolute top-4 left-0 h-8 w-1.5 rounded-r-full"
        style={{ background: accent }}
      />

      {/* ── Header: logo + game name + schedule, left-aligned ────────── */}
      <div className="relative flex items-center gap-3 px-6 pt-4 md:px-7">
        {game.logoUrl ? (
          <span className="flex h-11 w-11 shrink-0 items-center justify-center transition-transform duration-300 group-hover:scale-105">
            <Image
              src={game.logoUrl}
              alt=""
              width={96}
              height={96}
              className="h-auto max-h-full w-auto max-w-full object-contain"
            />
          </span>
        ) : (
          <span aria-hidden className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: accent }} />
        )}
        <div className="min-w-0">
          <h3 className="font-display font-extrabold text-lg md:text-xl leading-tight tracking-[-0.015em] text-brand-ink truncate">
            {game.name}
          </h3>
          <p className="text-[11px] font-bold uppercase tracking-wider" style={{ color: accent }}>
            {game.scheduleLabel}
          </p>
        </div>
      </div>

      {/* ── Winning numbers — centred hero ───────────────────────────── */}
      <div className="px-6 py-5 md:px-7 text-center">
        <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-ink-muted">
          Winning numbers
        </span>
        <div className="mt-2.5 flex justify-center">
          <NumberRow
            numbers={draw.numbers}
            bonusNumbers={draw.bonusNumbers}
            size="md"
            animated={animated}
          />
        </div>
        <p className="mt-2.5 text-[11px] font-medium text-brand-ink-muted tnum">
          Drawn {formatDate(draw.drawDate)} · #{draw.drawNumber}
        </p>
      </div>

      {/* ── Footer band — the SAME wave treatment as the PageHeader base:
          a deep brand-blue band filled with the identical layered wave
          ribbon. White text sits above. ─────────────────────────────── */}
      <div
        className="relative mt-auto overflow-hidden px-6 py-4 text-xs md:px-7 text-white"
        style={{
          background: "linear-gradient(165deg, #114199 0%, #0d337d 55%, #0a2a66 100%)",
        }}
      >
        {/* Exact PageHeader wave ribbon — fills the whole band (shared component). */}
        <WaveRibbon className="pointer-events-none absolute inset-0 h-full w-full" />

        <div className="relative z-10 flex items-center justify-between">
          {daysToNext !== null ? (
            <span className="inline-flex items-center gap-1.5 font-medium text-white/75">
              <CalendarClock size={13} strokeWidth={2} className="text-[#9cc4ff]" />
              Next in{" "}
              <span className="font-bold text-white tnum">
                {daysToNext} {daysToNext === 1 ? "day" : "days"}
              </span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-white/75">
              <CalendarClock size={13} strokeWidth={2} className="text-white/75" />
              Schedule pending
            </span>
          )}
          {linkToArchive && (
            <span className="inline-flex items-center gap-1 font-bold text-white transition-all group-hover:gap-2">
              Archive
              <ArrowRight size={12} strokeWidth={2.5} />
            </span>
          )}
        </div>
      </div>
    </m.article>
  );

  if (linkToArchive) {
    return (
      <Link
        href={`/results/${game.slug}`}
        className="block h-full"
        aria-label={`${game.name} results archive`}
      >
        {inner}
      </Link>
    );
  }
  return inner;
}
