/**
 * WaveRibbon — the brand's "corporate wave" ribbon.
 *
 * A family of tonal-blue curves rising left-to-right, anchored to the bottom
 * edge of whatever brand-navy band it sits in. Purely decorative (no text on
 * the art). Single source of truth for the wave so the PageHeader band and the
 * LatestDrawCard footer can never drift apart.
 *
 * Render it as the first child of a `relative` band; it fills the band via
 * `absolute inset-x-0 bottom-0` and stretches with `preserveAspectRatio="none"`.
 * Control how tall a slice of the band it covers with the `className` height
 * (e.g. `h-full`, `h-[55%] md:h-[68%]`).
 */

type WaveRibbonProps = {
  /** Tailwind classes for sizing/position. Height controls how much of the band the wave covers. */
  className?: string;
};

export function WaveRibbon({ className }: WaveRibbonProps) {
  return (
    <svg
      aria-hidden
      className={className}
      viewBox="0 0 1440 320"
      preserveAspectRatio="none"
      fill="none"
    >
      {/* back wave — faintest, highest crest */}
      <path
        d="M0,210 C 260,140 520,150 760,205 C 1000,260 1220,250 1440,175 L1440,320 L0,320 Z"
        fill="#ffffff"
        fillOpacity="0.05"
      />
      {/* mid wave */}
      <path
        d="M0,250 C 300,190 560,200 820,248 C 1060,292 1240,288 1440,232 L1440,320 L0,320 Z"
        fill="#5b9bff"
        fillOpacity="0.16"
      />
      {/* hairline crest on the mid wave */}
      <path
        d="M0,250 C 300,190 560,200 820,248 C 1060,292 1240,288 1440,232"
        stroke="#9cc4ff"
        strokeOpacity="0.5"
        strokeWidth="2"
      />
      {/* front wave — brightest, lowest, anchors the bottom edge */}
      <path
        d="M0,288 C 320,244 600,252 880,290 C 1110,320 1280,316 1440,284 L1440,320 L0,320 Z"
        fill="#3b9bff"
        fillOpacity="0.30"
      />
    </svg>
  );
}
