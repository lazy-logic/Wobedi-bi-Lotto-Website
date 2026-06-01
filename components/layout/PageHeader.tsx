/**
 * PageHeader — the header band at the top of every non-home page.
 *
 * Deep-royal brand band (#0D337D — the real WObedibi blue, matching the logo)
 * with a flowing "corporate wave" ribbon sweeping across the lower edge — a
 * family of tonal-blue curves rising left-to-right, purely decorative (no
 * text on the art). A soft glow adds depth; the title + eyebrow sit on the
 * clear upper-left field, well clear of the waves.
 *
 * The `tone` prop is still accepted (call sites pass it / it's auto-picked) but
 * is now a no-op — every header uses the one brand band for consistency.
 *
 * The negative top margin + matching top padding pull the band UP under the
 * transparent floating navbar.
 *
 * Slots:
 *   - eyebrow      small uppercase label (Montserrat)
 *   - title        required, becomes the page h1
 *   - subtitle     optional descriptive paragraph
 *   - breadcrumbs  optional array {label, href}
 *   - children     optional extra content after the subtitle (chips, stats…)
 *   - tone         optional override for the accent hue (else auto-picked)
 */
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Container } from "./Container";

type Crumb = { label: string; href?: string };
type Tone = "blue" | "violet" | "gold" | "teal" | "ember";

type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  breadcrumbs?: Crumb[];
  children?: React.ReactNode;
  tone?: Tone;
};

// The real WObedibi brand blue — the PageHeader band.
const BRAND = "#0d337d";
// A brighter sky-blue accent that pops on the royal band (glow + eyebrow dot).
const ACCENT = "#5b9bff";

export function PageHeader({
  eyebrow,
  title,
  subtitle,
  breadcrumbs,
  children,
}: PageHeaderProps) {
  return (
    <section
      className="relative overflow-hidden text-white -mt-16 md:-mt-20 pt-16 md:pt-20 border-b border-white/10"
      style={{
        // Band led by the exact logo navy (#0D337D). Only a whisper of
        // darkening toward the bottom for depth — never lighter than the logo,
        // so the header reads as the same navy as the mark.
        background: `linear-gradient(170deg, ${BRAND} 0%, #0c2f72 55%, #0a275f 100%)`,
      }}
    >
      {/* One soft sky-blue glow, top-right — subtle depth behind the title.
          Kept low so the band stays the logo navy, not lifted lighter. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-1/3 right-[-10%] h-[34rem] w-[34rem] rounded-full opacity-25"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${ACCENT}, transparent 70%)`,
          filter: "blur(120px)",
        }}
      />

      {/* Flowing "corporate wave" ribbon — tonal-blue curves sweeping across
          the lower edge, rising left→right. Decorative only (no text). Sits
          full-bleed behind the content; the title block stays upper-left. */}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 w-full h-[55%] md:h-[68%]"
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

      {/* Overlay scrim — a darker brand-blue (#0D337D = rgb 13,51,125) tint
          deepening toward the upper-left over the glow + waves. Unifies the
          decoration and keeps the title + subtitle crisp. Sits above the art,
          below the content. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(115deg, rgba(8,32,84,0.96) 0%, rgba(10,40,100,0.82) 40%, rgba(13,51,125,0.55) 72%, rgba(13,51,125,0.30) 100%)",
        }}
      />

      <Container>
        <div className="relative z-10 max-w-3xl py-14 md:py-18 lg:py-20">
          {breadcrumbs && breadcrumbs.length > 0 && (
            <nav
              aria-label="Breadcrumb"
              className="mb-5 flex flex-wrap items-center gap-1.5 text-xs font-semibold text-white/55"
            >
              {breadcrumbs.map((c, i) => {
                const last = i === breadcrumbs.length - 1;
                return (
                  <span key={`${c.label}-${i}`} className="inline-flex items-center gap-1.5">
                    {c.href && !last ? (
                      <Link href={c.href} className="hover:text-white transition-colors">
                        {c.label}
                      </Link>
                    ) : (
                      <span className={last ? "text-white" : ""}>{c.label}</span>
                    )}
                    {!last && (
                      <ChevronRight size={12} strokeWidth={2.5} className="text-white/35" />
                    )}
                  </span>
                );
              })}
            </nav>
          )}

          {eyebrow && (
            <div className="flex items-center gap-2.5 mb-4">
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: ACCENT }}
              />
              <span className="eyebrow text-white/70">{eyebrow}</span>
            </div>
          )}

          <h1 className="font-display font-bold text-3xl md:text-4xl xl:text-[2.875rem] leading-[1.08] tracking-[-0.025em] text-white text-balance">
            {title}
          </h1>

          {subtitle && (
            <p className="mt-4 text-base md:text-lg text-white/85 leading-relaxed max-w-2xl text-balance">
              {subtitle}
            </p>
          )}

          {children && <div className="mt-6">{children}</div>}
        </div>
      </Container>
    </section>
  );
}
