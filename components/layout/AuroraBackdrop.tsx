/**
 * AuroraBackdrop — decorative, non-interactive background art.
 *
 * Drops soft, blurred organic colour pools ("auroras") plus a faint curvy
 * ribbon behind a section. This is the device that breaks the site out of
 * its flat monochrome-blue field: each `tone` mixes a different secondary
 * hue (gold, violet, teal, coral) with the brand electric blue, so
 * consecutive sections no longer read as one continuous blue wash.
 *
 * Purely presentational — renders as a server component, always
 * aria-hidden + pointer-events-none. Pair with a `relative overflow-hidden`
 * parent and give the real content `relative z-10` so it sits on top.
 *
 * Single source of truth for the hues is docs/brand-tokens.md / globals.css
 * (--color-brand-gold / -violet / -teal / -coral); the rgba() literals here
 * are the same colours at low alpha for the gradient pools.
 */
import { cn } from "@/lib/utils";

type Tone = "blue" | "violet" | "gold" | "teal" | "ember";

type Pool = {
  /** Tailwind position + size utilities. */
  pos: string;
  /** rgba centre colour of the radial pool. */
  color: string;
  /** blur radius in px. */
  blur: number;
  /** drift speed. */
  slow?: boolean;
};

type Ribbon = {
  /** SVG path `d`. */
  d: string;
  /** gradient id suffix (kept unique per tone). */
  from: string;
  to: string;
};

const CELTIC = "rgba(10,110,211,";
const SIGNAL = "rgba(59,155,255,";
const GOLD = "rgba(246,183,60,";
const VIOLET = "rgba(139,109,255,";
const TEAL = "rgba(31,201,168,";
const CORAL = "rgba(255,122,89,";

const TONES: Record<Tone, { pools: Pool[]; ribbon: Ribbon }> = {
  blue: {
    pools: [
      { pos: "top-[-14%] right-[-8%] w-[40rem] h-[40rem]", color: `${CELTIC}0.22)`, blur: 120, slow: true },
      { pos: "bottom-[-22%] left-[-10%] w-[34rem] h-[34rem]", color: `${SIGNAL}0.16)`, blur: 130 },
    ],
    ribbon: { d: "M-60 380 C 200 240 360 520 600 340 S 960 160 1140 320", from: "#0a6ed3", to: "#3b9bff" },
  },
  violet: {
    pools: [
      { pos: "top-[-16%] right-[-6%] w-[42rem] h-[42rem]", color: `${VIOLET}0.20)`, blur: 130, slow: true },
      { pos: "bottom-[-20%] left-[-12%] w-[36rem] h-[36rem]", color: `${CELTIC}0.20)`, blur: 130 },
    ],
    ribbon: { d: "M-40 320 C 220 460 380 200 620 360 S 980 460 1160 280", from: "#8b6dff", to: "#0a6ed3" },
  },
  gold: {
    pools: [
      { pos: "top-[-18%] left-[-6%] w-[40rem] h-[40rem]", color: `${GOLD}0.16)`, blur: 135, slow: true },
      { pos: "bottom-[-24%] right-[-8%] w-[38rem] h-[38rem]", color: `${CELTIC}0.22)`, blur: 130 },
    ],
    ribbon: { d: "M-60 300 C 240 180 360 460 640 300 S 980 200 1160 380", from: "#f6b73c", to: "#0a6ed3" },
  },
  teal: {
    pools: [
      { pos: "top-[-14%] right-[-10%] w-[40rem] h-[40rem]", color: `${TEAL}0.16)`, blur: 130, slow: true },
      { pos: "bottom-[-22%] left-[-8%] w-[36rem] h-[36rem]", color: `${CELTIC}0.20)`, blur: 130 },
    ],
    ribbon: { d: "M-50 360 C 200 260 380 480 600 320 S 960 220 1150 360", from: "#1fc9a8", to: "#0a6ed3" },
  },
  ember: {
    pools: [
      { pos: "top-[-16%] left-[-8%] w-[40rem] h-[40rem]", color: `${GOLD}0.14)`, blur: 135, slow: true },
      { pos: "bottom-[-22%] right-[-10%] w-[38rem] h-[38rem]", color: `${VIOLET}0.18)`, blur: 130 },
      { pos: "top-[20%] right-[6%] w-[22rem] h-[22rem]", color: `${CORAL}0.10)`, blur: 110, slow: true },
    ],
    ribbon: { d: "M-40 300 C 220 420 380 220 640 360 S 980 240 1160 360", from: "#f6b73c", to: "#8b6dff" },
  },
};

export function AuroraBackdrop({
  tone = "blue",
  className,
  ribbon = true,
}: {
  tone?: Tone;
  className?: string;
  /** Hide the curvy ribbon if a section only wants the colour pools. */
  ribbon?: boolean;
}) {
  const { pools, ribbon: r } = TONES[tone];
  const gid = `aurora-${tone}`;

  return (
    <div
      aria-hidden
      className={cn(
        "absolute inset-0 z-0 overflow-hidden pointer-events-none",
        className,
      )}
    >
      {pools.map((p, i) => (
        <span
          key={i}
          className={cn(
            "absolute rounded-full",
            p.pos,
            p.slow ? "blob-drift-slow" : "blob-drift",
          )}
          style={{
            background: `radial-gradient(circle at 50% 50%, ${p.color}, transparent 70%)`,
            filter: `blur(${p.blur}px)`,
          }}
        />
      ))}

      {ribbon && (
        <svg
          className="absolute inset-0 h-full w-full opacity-[0.10]"
          viewBox="0 0 1100 600"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor={r.from} stopOpacity="0" />
              <stop offset="35%" stopColor={r.from} />
              <stop offset="65%" stopColor={r.to} />
              <stop offset="100%" stopColor={r.to} stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d={r.d}
            stroke={`url(#${gid})`}
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="14 22"
            className="curve-flow"
          />
          {/* A second, fainter offset curl for depth. */}
          <path
            d={r.d}
            stroke={`url(#${gid})`}
            strokeWidth="1"
            strokeLinecap="round"
            opacity="0.5"
            transform="translate(0 56)"
          />
        </svg>
      )}
    </div>
  );
}
