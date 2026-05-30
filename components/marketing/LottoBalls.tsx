/**
 * LottoBalls — hero animation.
 *
 * Seven coloured lotto balls drop in, settle into a soft arc, then bob
 * gently out of phase. Each ball uses a distinct hue mirroring real NLA
 * 5/90 colour balls (red, gold, green, blue, purple, orange) plus brand
 * navy. The numbers shown are the digits 5 / 9 / 0 mixed with two-digit
 * picks for variety.
 *
 * Pure-CSS animations (see globals.css @keyframes lotto-ball-drop /
 * lotto-ball-float). Each ball composes drop + float with staggered
 * animation-delay so neighbours drift out of sync.
 *
 * Respects prefers-reduced-motion via the global @media block in
 * globals.css — animations collapse to ~0ms, leaving balls in their
 * resting positions.
 */
type Hue =
  | "navy"
  | "red"
  | "gold"
  | "green"
  | "blue"
  | "purple"
  | "orange";

type Ball = {
  n: number;
  size: number;
  yOffset: number;
  delay: number;
  hue: Hue;
};

/**
 * Per-hue radial-gradient pair (outer ball + inner disc number colour).
 * Carefully tuned for similar luminance so the row reads as a set rather
 * than as seven competing accents.
 */
const HUES: Record<
  Hue,
  { ball: string; inkLight: string; inkDark: string; shadow: string }
> = {
  navy: {
    ball:
      "radial-gradient(circle at 30% 28%, #ffffff 0%, #cdd8ee 14%, #013982 55%, #001f5a 100%)",
    inkLight: "#013982",
    inkDark: "#001f5a",
    shadow: "0_18px_38px_-12px_rgba(0,52,123,0.55)",
  },
  red: {
    ball:
      "radial-gradient(circle at 30% 28%, #ffffff 0%, #f7c8c8 14%, #c93030 55%, #7a1414 100%)",
    inkLight: "#c93030",
    inkDark: "#7a1414",
    shadow: "0_18px_38px_-12px_rgba(170,30,30,0.55)",
  },
  gold: {
    ball:
      "radial-gradient(circle at 30% 28%, #ffffff 0%, #fbe7b3 14%, #e2a526 55%, #8a5d0c 100%)",
    inkLight: "#9c6a0d",
    inkDark: "#5b3d05",
    shadow: "0_18px_38px_-12px_rgba(180,120,20,0.50)",
  },
  green: {
    ball:
      "radial-gradient(circle at 30% 28%, #ffffff 0%, #c2e7c9 14%, #1e8a44 55%, #0b4720 100%)",
    inkLight: "#1e8a44",
    inkDark: "#0b4720",
    shadow: "0_18px_38px_-12px_rgba(20,110,50,0.50)",
  },
  blue: {
    ball:
      "radial-gradient(circle at 30% 28%, #ffffff 0%, #c6d9f4 14%, #2a64b8 55%, #112e60 100%)",
    inkLight: "#2a64b8",
    inkDark: "#112e60",
    shadow: "0_18px_38px_-12px_rgba(30,80,170,0.55)",
  },
  purple: {
    ball:
      "radial-gradient(circle at 30% 28%, #ffffff 0%, #dfd1ef 14%, #6b3eb3 55%, #321858 100%)",
    inkLight: "#6b3eb3",
    inkDark: "#321858",
    shadow: "0_18px_38px_-12px_rgba(80,40,140,0.55)",
  },
  orange: {
    ball:
      "radial-gradient(circle at 30% 28%, #ffffff 0%, #fcd6b6 14%, #e07825 55%, #803c08 100%)",
    inkLight: "#b85b15",
    inkDark: "#6e3308",
    shadow: "0_18px_38px_-12px_rgba(200,100,30,0.55)",
  },
};

const BALLS: Ball[] = [
  { n: 7,  size: 76,  yOffset: 18,  delay: 0.00, hue: "red" },
  { n: 14, size: 92,  yOffset: -4,  delay: 0.12, hue: "gold" },
  { n: 28, size: 108, yOffset: 22,  delay: 0.24, hue: "green" },
  { n: 41, size: 124, yOffset: -10, delay: 0.36, hue: "navy" },
  { n: 56, size: 108, yOffset: 24,  delay: 0.48, hue: "blue" },
  { n: 73, size: 92,  yOffset: -2,  delay: 0.60, hue: "purple" },
  { n: 89, size: 76,  yOffset: 20,  delay: 0.72, hue: "orange" },
];

export function LottoBalls() {
  return (
    <div
      aria-hidden
      className="relative w-full h-[320px] md:h-[420px] lg:h-[480px] flex items-center justify-center"
    >
      {/* Soft glow disc behind the balls — anchors the arc visually. */}
      <div
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[280px] md:h-[340px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(1,57,130,0.16), transparent 70%)",
          filter: "blur(24px)",
        }}
      />

      {/* Ball row */}
      <div className="relative flex items-center justify-center gap-2 md:gap-4 lg:gap-5">
        {BALLS.map((ball, i) => (
          <BallSphere key={i} {...ball} />
        ))}
      </div>

      {/* Decorative trace line beneath the balls. */}
      <div
        className="absolute left-1/2 -translate-x-1/2 bottom-10 md:bottom-14 w-[85%] max-w-[640px] h-px pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(1,57,130,0.20), rgba(1,57,130,0.32), rgba(1,57,130,0.20), transparent)",
        }}
      />
    </div>
  );
}

function BallSphere({ n, size, yOffset, delay, hue }: Ball) {
  const palette = HUES[hue];

  return (
    <div
      className="lotto-ball relative shrink-0 rounded-full select-none"
      style={{
        width: size,
        height: size,
        animationDelay: `${delay}s, ${delay + 0.9}s`,
      }}
    >
      <div
        className={`absolute inset-0 rounded-full shadow-[${palette.shadow},_0_4px_10px_rgba(0,52,123,0.18)]`}
        style={{
          transform: `translateY(${yOffset}px)`,
          background: palette.ball,
          boxShadow: `${palette.shadow.replace(/_/g, " ")}, 0 4px 10px rgba(0,52,123,0.18)`,
        }}
      >
        {/* Inner cream disc for the number. */}
        <div
          className="absolute inset-[18%] rounded-full flex items-center justify-center"
          style={{
            background:
              "radial-gradient(circle at 50% 35%, #ffffff, #f1f3f8 70%, #dde2ee 100%)",
            boxShadow:
              "inset 0 2px 4px rgba(0,0,0,0.06), inset 0 -1px 2px rgba(0,52,123,0.08)",
          }}
        >
          <span
            className="font-display font-extrabold tracking-tight tabular-nums"
            style={{
              fontSize: size * 0.36,
              color: palette.inkLight,
              lineHeight: 1,
              transform: "translateY(2%)",
            }}
          >
            {n}
          </span>
        </div>

        {/* Top-left specular highlight. */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            top: "8%",
            left: "12%",
            width: "32%",
            height: "22%",
            background:
              "radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.72), transparent 70%)",
            filter: "blur(1px)",
          }}
        />
      </div>
    </div>
  );
}
