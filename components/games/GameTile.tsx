/**
 * GameTile — colour-forward "draw poster" catalogue card.
 *
 * The game's own `ballColor` is the hero hue, filling a saturated header band.
 * The GAME NAME is the headline. The schedule lives as a faint giant watermark
 * across the band (e.g. "MON–SAT", "SAT") — decorative, never a placeholder.
 *
 * Creative touches in the body: a row of five mini "lotto balls" (a 5/90 nod)
 * tinted with the accent, an accent rule, and a sliding "View" affordance.
 * Every game is `standard` channel with a null price, so those chips are
 * omitted as noise. The whole tile is one <Link>.
 */
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Game } from "@/lib/games";
import type { Draw } from "@/lib/results";
import { GameLogo } from "./GameLogo";

type GameTileProps = {
  game: Game;
  /** Reserved for future use; ignored after the latest-result strip was removed. */
  latestDraw?: Draw;
};

// Turn a stored schedule label into a short, always-real watermark — never a
// "TBC" placeholder. Games without a fixed single day (VAG, Noon Rush) run the
// full Monday–Saturday week, so they read "MON–SAT".
function watermark(label: string): string {
  if (label === "Schedule TBC" || label === "Mon-Sat") return "MON-SAT";
  // "Saturdays" to "SAT", "Wednesdays" to "WED", etc.
  return label.replace(/s$/i, "").slice(0, 3).toUpperCase();
}

export function GameTile({ game }: GameTileProps) {
  const accent = game.ballColor ?? "var(--color-brand-primary)";
  const mark = watermark(game.scheduleLabel);

  return (
    <Link
      href={`/games/${game.slug}`}
      style={{ ["--accent" as string]: accent }}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-brand-border bg-white transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-border-strong"
    >
      {/* ── Colour header band ─────────────────────────────────────────── */}
      <div
        className="relative overflow-hidden px-6 pt-6 pb-7"
        style={{
          background:
            "linear-gradient(145deg, color-mix(in srgb, var(--accent) 92%, white) 0%, var(--accent) 55%, color-mix(in srgb, var(--accent) 78%, black) 100%)",
        }}
      >
        {/* Giant schedule watermark (e.g. MON–SAT / SAT) */}
        <span
          aria-hidden
          className="pointer-events-none absolute -bottom-4 right-3 select-none whitespace-nowrap font-display font-black uppercase leading-none text-white/10 text-[3.25rem] tracking-tighter"
        >
          {mark}
        </span>
        {/* Diagonal sheen */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(115deg, rgba(255,255,255,0.18) 0%, transparent 42%)",
          }}
        />

        <div className="relative flex items-center justify-between gap-3">
          <div className="w-16 transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-6">
            <GameLogo game={game} size={64} />
          </div>
          {game.introducedYear && (
            <span className="rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white tnum backdrop-blur-sm">
              Est. {game.introducedYear}
            </span>
          )}
        </div>

        {/* Game name — the hero headline */}
        <h3 className="relative mt-5 font-display font-black leading-[1.05] tracking-tight text-white text-2xl md:text-[1.7rem]">
          {game.name}
        </h3>
        <p className="relative mt-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-white/75">
          5/90 fixed odds
        </p>
      </div>

      {/* ── White body ─────────────────────────────────────────────────── */}
      <div className="flex flex-1 flex-col px-6 pt-5 pb-6">
        <p className="text-sm leading-relaxed text-brand-ink-muted line-clamp-2">
          {game.hook}
        </p>

        {/* Creative touch — five mini "lotto balls" (a 5/90 nod). They sit
            hollow, then fill with the accent one-by-one on hover (staggered),
            like a line being drawn. */}
        <div aria-hidden className="mt-5 flex items-center gap-1.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              className="h-2.5 w-2.5 rounded-full border bg-transparent transition-colors duration-300 group-hover:bg-[var(--accent)]"
              style={{
                borderColor: accent,
                backgroundColor: i === 0 ? accent : undefined,
                transitionDelay: `${i * 60}ms`,
              }}
            />
          ))}
        </div>

        <div className="mt-auto pt-5 flex items-center justify-between border-t border-brand-border">
          <span
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider"
            style={{ color: accent }}
          >
            <span className="h-2 w-2 rounded-full" style={{ background: accent }} />
            Play this draw
          </span>
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-ink transition-all group-hover:gap-2.5">
            View
            <ArrowRight size={16} strokeWidth={2} />
          </span>
        </div>
      </div>
    </Link>
  );
}
