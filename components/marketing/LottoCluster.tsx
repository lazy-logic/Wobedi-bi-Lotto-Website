/**
 * LottoCluster — the hero's nine glassy lottery balls as a "Living
 * Constellation": a slowly-orbiting star-map of a draw in progress.
 *
 * Inlined SVG (a flat <img> can't animate its parts). Motion is pure CSS
 * (see globals.css `.cluster-float` / `.lc-*`) so this stays a server
 * component and respects prefers-reduced-motion. Three coordinated systems:
 *   - the whole field slowly sways/drifts            → .cluster-float (on <svg>)
 *   - satellites ride depth-tiered elliptical orbits → .lc-front/.lc-mid/.lc-back
 *   - the gold focal "jackpot" ball breathes + lifts → .lc-core
 * plus a faint connecting network that breathes (.lc-arcs) and travelling
 * "data-feed" glint packets that race along the spokes (.lc-glint) — echoing
 * the hero's live "Wire" ticker and "drawn live under the NLA" promise.
 *
 * Nine UNIQUE numbers (gold focal 90 ↔ the "five from ninety" headline, then
 * 7, 52, 23, 41, 14, 66, 38, 79). Numbers are white with a deep tinted outline
 * so they stay crisp on every hue; 2-digit balls use a smaller font-size.
 */
import type { CSSProperties } from "react";

const NUMBER_PROPS = {
  textAnchor: "middle" as const,
  fontFamily: "Outfit, 'Arial Black', sans-serif",
  fontWeight: 800,
  fill: "#ffffff",
  strokeLinejoin: "round" as const,
  paintOrder: "stroke" as const,
  letterSpacing: "-2",
};

type BallSpec = {
  cx: number;
  cy: number;
  r: number;
  grad: string;
  num: string;
  fs: number;
  stroke: string;
  cls: string;
  delay?: string;
};

// Centre gold "jackpot" ball — the calm anchor.
const CORE: BallSpec = {
  cx: 300, cy: 320, r: 118, grad: "ballGold", num: "90", fs: 104,
  stroke: "#5a3a00", cls: "lc-core",
};

// Eight satellites on the ring (215px from centre). Radius varies by depth
// tier (front 80 / mid 72 / back 64) for parallax; delays spread them out of
// phase across the 16/19/24s orbit cycles.
const SATELLITES: BallSpec[] = [
  { cx: 300, cy: 105, r: 72, grad: "ballBlue",   num: "7",  fs: 76, stroke: "#031b3d", cls: "lc-ball lc-mid",   delay: "1.3s" },
  { cx: 452, cy: 168, r: 80, grad: "ballViolet", num: "52", fs: 58, stroke: "#2a1c63", cls: "lc-ball lc-front", delay: "0s" },
  { cx: 515, cy: 320, r: 64, grad: "ballTeal",   num: "23", fs: 52, stroke: "#073d31", cls: "lc-ball lc-back",  delay: "1.9s" },
  { cx: 452, cy: 472, r: 80, grad: "ballCoral",  num: "41", fs: 58, stroke: "#6a1810", cls: "lc-ball lc-front", delay: "2.6s" },
  { cx: 300, cy: 535, r: 72, grad: "ballSky",    num: "14", fs: 56, stroke: "#073761", cls: "lc-ball lc-mid",   delay: "3.4s" },
  { cx: 148, cy: 472, r: 64, grad: "ballOrange", num: "66", fs: 52, stroke: "#5a3000", cls: "lc-ball lc-back",  delay: "4.5s" },
  { cx: 85,  cy: 320, r: 80, grad: "ballPink",   num: "38", fs: 58, stroke: "#6a163f", cls: "lc-ball lc-front", delay: "5.2s" },
  { cx: 148, cy: 168, r: 72, grad: "ballLime",   num: "79", fs: 56, stroke: "#2f5a18", cls: "lc-ball lc-mid",   delay: "6.5s" },
];

function Ball({ cx, cy, r, grad, num, fs, stroke, cls, delay, sw = 4, hi = "bHiSm" }: BallSpec & { sw?: number; hi?: string }) {
  const hiX = cx - r * 0.26;
  const hiY = cy - r * 0.37;
  return (
    <g className={cls} style={delay ? { animationDelay: delay } : undefined}>
      <circle cx={cx} cy={cy} r={r} fill={`url(#${grad})`} />
      <ellipse cx={hiX} cy={hiY} rx={r * 0.34} ry={r * 0.19} fill={`url(#${hi})`} transform={`rotate(-22 ${hiX} ${hiY})`} />
      <text {...NUMBER_PROPS} x={cx} y={cy + fs * 0.34} fontSize={fs} stroke={stroke} strokeWidth={sw}>{num}</text>
    </g>
  );
}

const GLINT_STYLE: CSSProperties = { filter: "drop-shadow(0 0 5px rgba(180,215,255,0.9))" };

export function LottoCluster({
  className,
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 600 620"
      className={className}
      style={style}
      role="img"
      aria-label="A constellation of nine numbered lottery balls in vivid colours — a gold 90 at the centre surrounded by 7, 52, 23, 41, 14, 66, 38 and 79 — slowly orbiting on a dark field."
    >
      <defs>
        <radialGradient id="ballGold" cx="35%" cy="28%" r="72%">
          <stop offset="0%" stopColor="#fff7e2" />
          <stop offset="16%" stopColor="#ffd877" />
          <stop offset="58%" stopColor="#f6b73c" />
          <stop offset="100%" stopColor="#7a5006" />
        </radialGradient>
        <radialGradient id="ballBlue" cx="35%" cy="28%" r="72%">
          <stop offset="0%" stopColor="#dff0ff" />
          <stop offset="16%" stopColor="#7fc0ff" />
          <stop offset="58%" stopColor="#0a6ed3" />
          <stop offset="100%" stopColor="#03306a" />
        </radialGradient>
        <radialGradient id="ballSky" cx="35%" cy="28%" r="72%">
          <stop offset="0%" stopColor="#eaf5ff" />
          <stop offset="18%" stopColor="#9fd0ff" />
          <stop offset="60%" stopColor="#3b9bff" />
          <stop offset="100%" stopColor="#0a4d92" />
        </radialGradient>
        <radialGradient id="ballViolet" cx="35%" cy="28%" r="72%">
          <stop offset="0%" stopColor="#f3eeff" />
          <stop offset="18%" stopColor="#bba8ff" />
          <stop offset="60%" stopColor="#8b6dff" />
          <stop offset="100%" stopColor="#34247f" />
        </radialGradient>
        <radialGradient id="ballTeal" cx="35%" cy="28%" r="72%">
          <stop offset="0%" stopColor="#e3fff8" />
          <stop offset="18%" stopColor="#84ecd7" />
          <stop offset="60%" stopColor="#1fc9a8" />
          <stop offset="100%" stopColor="#0a5444" />
        </radialGradient>
        <radialGradient id="ballCoral" cx="35%" cy="28%" r="72%">
          <stop offset="0%" stopColor="#ffeae5" />
          <stop offset="18%" stopColor="#ffab9e" />
          <stop offset="60%" stopColor="#ff6b5c" />
          <stop offset="100%" stopColor="#84211a" />
        </radialGradient>
        <radialGradient id="ballOrange" cx="35%" cy="28%" r="72%">
          <stop offset="0%" stopColor="#fff1e0" />
          <stop offset="18%" stopColor="#ffc78a" />
          <stop offset="60%" stopColor="#ff9f43" />
          <stop offset="100%" stopColor="#7d4406" />
        </radialGradient>
        <radialGradient id="ballPink" cx="35%" cy="28%" r="72%">
          <stop offset="0%" stopColor="#ffe7f3" />
          <stop offset="18%" stopColor="#ffa1d0" />
          <stop offset="60%" stopColor="#ff5ca8" />
          <stop offset="100%" stopColor="#841d55" />
        </radialGradient>
        <radialGradient id="ballLime" cx="35%" cy="28%" r="72%">
          <stop offset="0%" stopColor="#f3ffe2" />
          <stop offset="18%" stopColor="#c2f58c" />
          <stop offset="60%" stopColor="#7ed957" />
          <stop offset="100%" stopColor="#2f6b1f" />
        </radialGradient>
        <radialGradient id="bHi" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="white" stopOpacity="0.9" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="bHiSm" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="white" stopOpacity="0.78" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Sparkle field — slow twinkle */}
      <g className="lc-spark" fill="#ffffff">
        <circle cx="68" cy="92" r="5" opacity="0.5" />
        <circle cx="98" cy="58" r="3" opacity="0.4" />
        <circle cx="540" cy="80" r="4" opacity="0.5" />
        <circle cx="40" cy="240" r="3" opacity="0.38" />
        <circle cx="34" cy="430" r="4" opacity="0.46" />
        <circle cx="72" cy="560" r="5" opacity="0.5" />
        <circle cx="560" cy="220" r="3" opacity="0.4" />
        <circle cx="540" cy="380" r="4" opacity="0.46" />
        <circle cx="568" cy="500" r="5" opacity="0.5" />
        <circle cx="220" cy="40" r="2" opacity="0.36" />
        <circle cx="380" cy="32" r="3" opacity="0.46" />
        <circle cx="280" cy="600" r="2" opacity="0.36" />
        <circle cx="408" cy="588" r="3" opacity="0.4" />
      </g>

      {/* Connecting network — spokes from the centre + an outer ring. Sits
          behind the balls and breathes in opacity. */}
      <g className="lc-arcs" stroke="rgba(150,190,255,0.55)" strokeWidth={1.5} fill="none" strokeLinecap="round">
        {SATELLITES.map((s) => (
          <line key={`spoke-${s.num}`} x1={CORE.cx} y1={CORE.cy} x2={s.cx} y2={s.cy} />
        ))}
        <polyline points="300,105 452,168 515,320 452,472 300,535 148,472 85,320 148,168 300,105" />
      </g>

      {/* Travelling data-feed glints — short bright packets race along two
          diagonal spokes (staggered), reading as live draw activity. */}
      <line
        className="lc-glint"
        x1={CORE.cx} y1={CORE.cy} x2={452} y2={168}
        pathLength={100} strokeDasharray="9 100"
        stroke="#eaf4ff" strokeWidth={2.5} strokeLinecap="round"
        opacity={0} style={GLINT_STYLE}
      />
      <line
        className="lc-glint"
        x1={CORE.cx} y1={CORE.cy} x2={148} y2={472}
        pathLength={100} strokeDasharray="9 100"
        stroke="#eaf4ff" strokeWidth={2.5} strokeLinecap="round"
        opacity={0} style={{ ...GLINT_STYLE, animationDelay: "2.75s" }}
      />

      {/* Balls — centre first, then the eight orbiting satellites */}
      <Ball {...CORE} sw={5} hi="bHi" />
      {SATELLITES.map((s) => (
        <Ball key={s.num} {...s} />
      ))}
    </svg>
  );
}
