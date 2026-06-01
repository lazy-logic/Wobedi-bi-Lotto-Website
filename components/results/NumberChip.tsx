/**
 * A single winning-number chip — flat SQUARE tile style.
 *
 * VISUAL DECISIONS:
 *  - SQUARE (rounded-md), flat solid fill — a clean, modern result tile rather
 *    than a glossy 3D ball. (The earlier circular-ball treatment is retired.)
 *  - Tabular numerals (`tnum`) so digits don't shift width when results refresh.
 *  - Aria-label calls each number out individually for screen readers.
 *
 * MOTION:
 *  - Uses Framer Motion staggered blur-in. The super prompt names GSAP for the
 *    digit reveal (§5/§3); Framer is in here as a temporary stand-in because it
 *    was already a dependency. When GSAP is added, replace this animation block
 *    with the GSAP timeline and keep the same visual outcome.
 *  - `animated={false}` is used on tiles and small recap rows where each card
 *    would otherwise re-fire the reveal — call out the latest hero, not every
 *    historical row.
 *  - `prefers-reduced-motion` is handled by the global rule in globals.css that
 *    flattens transition-duration to ~0ms.
 */
"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type NumberChipProps = {
  value: number;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "bonus" | "muted";
  index?: number;
  animated?: boolean;
};

const sizeClasses = {
  sm: "w-8 h-8 text-sm",
  md: "w-10 h-10 text-base md:w-11 md:h-11 md:text-lg",
  lg: "w-11 h-11 text-lg md:w-12 md:h-12 md:text-xl",
};

const variantClasses = {
  // Flat solid square tiles — no gradient, no glow.
  primary: "text-white bg-brand-primary",
  bonus: "text-white bg-brand-signal-deep",
  // muted = a pale "blank" tile, so its label is dark for contrast.
  muted: "text-[#0c1c30] bg-brand-paper-sunken",
};

export function NumberChip({
  value,
  size = "md",
  variant = "primary",
  index = 0,
  animated = true,
}: NumberChipProps) {
  if (!animated) {
    return (
      <span
        aria-label={`Winning number ${value}`}
        className={cn(
          "inline-flex items-center justify-center font-extrabold tnum rounded-md",
          sizeClasses[size],
          variantClasses[variant],
        )}
      >
        {value}
      </span>
    );
  }

  return (
    <motion.span
      aria-label={`Winning number ${value}`}
      initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{
        duration: 0.32,
        delay: index * 0.08,
        ease: [0.2, 0, 0, 1],
      }}
      className={cn(
        "inline-flex items-center justify-center font-extrabold tnum rounded-md",
        sizeClasses[size],
        variantClasses[variant],
      )}
    >
      {value}
    </motion.span>
  );
}
