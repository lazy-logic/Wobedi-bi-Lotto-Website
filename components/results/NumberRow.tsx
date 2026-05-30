/**
 * Renders a winning-numbers row, with optional bonus / supplementary balls.
 *
 * Bonus balls use the cyan variant of NumberChip so they read as visually
 * distinct from primary numbers (pattern borrowed from agentlotto — see
 * public/inspiration/agentlotto/extracted.md).
 *
 * The `index` passed to each chip drives stagger order during the reveal
 * animation, so primary numbers reveal first, bonus balls after.
 */
import { NumberChip } from "./NumberChip";

type NumberRowProps = {
  numbers: number[];
  bonusNumbers?: number[];
  size?: "sm" | "md" | "lg";
  animated?: boolean;
};

export function NumberRow({ numbers, bonusNumbers = [], size = "md", animated = true }: NumberRowProps) {
  return (
    <div className="flex flex-wrap items-center gap-1.5 md:gap-2" role="list" aria-label="Winning numbers">
      {numbers.map((n, i) => (
        <span key={`n-${i}`} role="listitem">
          <NumberChip value={n} size={size} variant="primary" index={i} animated={animated} />
        </span>
      ))}
      {bonusNumbers.map((n, i) => (
        <span key={`b-${i}`} role="listitem">
          <NumberChip
            value={n}
            size={size}
            variant="bonus"
            index={numbers.length + i}
            animated={animated}
          />
        </span>
      ))}
    </div>
  );
}
