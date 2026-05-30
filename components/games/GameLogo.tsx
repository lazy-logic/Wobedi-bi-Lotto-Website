/**
 * GameLogo renders a game's logo on top of a uniform white 3D lottery ball.
 *
 * The ball is white-cream so the colourful game logos pop against it. The
 * logo is sized large (~85% of the ball's diameter) with `mix-blend-mode:
 * multiply` applied — this makes the logo's pixels darken against the ball's
 * own radial shading instead of sitting flat on top, so the logo appears
 * to wrap around the curved sphere.
 *
 * The 3D ball uses radial gradients for the sphere shading: a soft white
 * highlight at top-left, a darker terminator on the bottom-right. Multi-
 * layer drop shadow gives proper grounded depth.
 *
 * If a game has no logoUrl, a Montserrat-Black initial fills the ball.
 *
 * Note: `ballColor` on the Game record is kept in the type but ignored here
 * — every ball renders white by design choice. Future iteration could use
 * ballColor for a small accent (e.g. ring at the equator) without bringing
 * back the per-game tinted spheres.
 */
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Game } from "@/lib/games";

type Props = {
  game: Game;
  className?: string;
  /** Image dimensions hint for next/image. Display size is controlled by className. */
  size?: number;
  /**
   * When false, renders a plain white sphere with no logo or monogram inside.
   * Used by LatestDrawCard for a clean decorative ball in the corner of the
   * draw cards (logo there competes with the numbers and feels noisy).
   */
  showLogo?: boolean;
};

export function GameLogo({ game, className, size = 320, showLogo = true }: Props) {
  return (
    <div
      className={cn("relative aspect-square rounded-full", className)}
      style={{
        // White-cream sphere with a subtle gradient for the spherical shading
        background: [
          // Bottom-right shadow (terminator)
          "radial-gradient(circle at 70% 78%, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0) 55%)",
          // Top-left highlight
          "radial-gradient(circle at 28% 22%, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 55%)",
          // Base
          "radial-gradient(circle at 50% 50%, #ffffff 0%, #f1f3f7 60%, #d6dae4 100%)",
        ].join(", "),
        boxShadow: [
          // Inset shading kept so the sphere reads as 3D rather than a flat
          // white disc. Outer drop shadows + cyan halo removed.
          "inset -8px -14px 28px rgba(20,30,60,0.18)",
          "inset 4px 6px 14px rgba(255,255,255,0.95)",
        ].join(", "),
      }}
    >
      {/* Specular highlight in the upper-left */}
      <div
        aria-hidden
        className="absolute top-[10%] left-[18%] w-[30%] h-[24%] rounded-full pointer-events-none z-20"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 70%)",
          filter: "blur(2px)",
        }}
      />

      {/*
       * Logo wrapper — generous size so it dominates the ball.
       * mix-blend-mode: multiply makes the logo pick up the ball's own
       * sphere shading, producing the "printed on / wraps around the ball"
       * illusion instead of looking flat-pasted.
       */}
      {showLogo && (
        <div
          className="absolute inset-[8%] flex items-center justify-center z-10"
          style={{ mixBlendMode: "multiply" }}
        >
          {game.logoUrl ? (
            <Image
              src={game.logoUrl}
              alt={`${game.name} logo`}
              width={size}
              height={size}
              className="object-contain max-w-full max-h-full w-auto h-auto"
            />
          ) : (
            <span
              aria-label={`${game.name} logo placeholder`}
              className="font-display font-black text-brand-primary leading-none select-none uppercase tracking-tight"
              style={{ fontSize: "clamp(2.5rem, 38%, 7rem)" }}
            >
              {game.name.charAt(0).toUpperCase()}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
