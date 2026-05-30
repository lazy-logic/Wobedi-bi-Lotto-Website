/**
 * The signature card that surfaces a single game's most recent draw.
 *
 * Used in three places: the Home results widget, the Results page hero strip,
 * and the per-game results detail.
 *
 * Refinements 2026-04-30 (later in the day):
 *  - Smaller title (`text-xl md:text-2xl`) so multi-word names like
 *    "Fortune Thursday" no longer wrap to two lines and force the card
 *    taller than its siblings.
 *  - `h-full` so the article fills its grid row regardless of content
 *    length — siblings always end up the same height.
 *  - Raw logo image (no white ball wrapper) sits in the top-right
 *    corner. The 3D ball is too much next to the colour stripe and the
 *    blue number balls below.
 *
 * The `layoutId` makes the card a shared-element transition target for
 * Framer Motion when navigating between Home, Results, and Game Detail.
 */
"use client";

import Image from "next/image";
import Link from "next/link";
import { m } from "framer-motion";
import { ArrowRight, CalendarClock } from "lucide-react";
import { NumberRow } from "./NumberRow";
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
  const stripeColor = game.ballColor ?? "#0a6ed3";
  const daysToNext = daysUntilNextDraw(game.schedule);

  const inner = (
    <m.article
      layoutId={`draw-${game.slug}`}
      transition={{ duration: 0.4, ease: [0.3, 0, 0, 1] }}
      className={cn(
        "group relative flex flex-col h-full rounded-2xl border border-brand-border bg-brand-paper overflow-hidden transition-all duration-300 ease-[var(--ease-gentle)]",
        linkToArchive &&
          "hover:shadow-lifted hover:-translate-y-1 hover:border-brand-border-strong hover:drop-shadow-[0_0_20px_rgba(10,110,211,0.25)]",
        className,
      )}
    >
      {/* Top stripe — brand identifier per game */}
      <div
        aria-hidden
        className="h-1.5 w-full"
        style={{ background: stripeColor }}
      />

      <div className="flex flex-col flex-1 p-6 md:p-7">
        {/* Logo — raw, top-right corner (no ball wrapper) */}
        {game.logoUrl && (
          <div className="absolute top-5 right-5 w-11 h-11 flex items-center justify-center pointer-events-none">
            <Image
              src={game.logoUrl}
              alt=""
              width={88}
              height={88}
              className="object-contain max-w-full max-h-full w-auto h-auto"
            />
          </div>
        )}

        <header className="pr-14">
          <p className="eyebrow text-brand-ink-muted">
            {game.scheduleLabel}
          </p>
          <h3 className="font-display font-extrabold text-xl md:text-2xl mt-1.5 leading-tight tracking-[-0.02em] text-brand-ink">
            {game.name}
          </h3>
          <p className="text-xs text-brand-ink-muted mt-1.5 tnum">
            Drawn {formatDate(draw.drawDate)} · #{draw.drawNumber}
          </p>
        </header>

        {/* Numbers — centred, given their own breathing room */}
        <div className="flex justify-center py-6 md:py-7">
          <NumberRow
            numbers={draw.numbers}
            bonusNumbers={draw.bonusNumbers}
            size="md"
            animated={animated}
          />
        </div>

        {/* Footer pinned to the bottom */}
        <footer className="mt-auto pt-4 border-t border-brand-border flex items-center justify-between text-xs">
          {daysToNext !== null ? (
            <span className="inline-flex items-center gap-1.5 font-semibold text-brand-ink-muted">
              <CalendarClock size={13} strokeWidth={2} className="text-brand-primary" />
              Next draw in{" "}
              <span className="text-brand-primary tnum">
                {daysToNext} {daysToNext === 1 ? "day" : "days"}
              </span>
            </span>
          ) : (
            <span className="text-brand-ink-muted">Schedule TBC</span>
          )}
          {linkToArchive && (
            <span className="inline-flex items-center gap-1 font-semibold text-brand-primary group-hover:gap-2 transition-all">
              Archive
              <ArrowRight size={12} strokeWidth={2.5} />
            </span>
          )}
        </footer>
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
