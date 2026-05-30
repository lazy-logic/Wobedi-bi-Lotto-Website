/**
 * PageHeader — the header band at the top of every non-home page.
 *
 * Minimal-yet-modern: a quiet dark "Blue Hour" band that pairs with the white
 * content section below it. Stripped back to the essentials — a single,
 * barely-there accent (one soft radial glow + a faint fine-line grid), a small
 * accent-dot eyebrow, a clean Outfit title, and one hairline. No drifting
 * ribbons, no five-colour aurora, no multi-hue gradient rule. The restraint is
 * the point: the type carries the page, the decoration just keeps it from
 * reading flat.
 *
 * The `tone` prop is still accepted (call sites pass it / it's auto-picked) but
 * now drives only the hue of that one accent, so pages stay subtly varied
 * without the visual noise.
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

// The brand light blue. The header keeps one cool accent everywhere — the
// glow and the eyebrow dot — so pages stay consistent and never read warm.
const ACCENT = "#3b9bff";

export function PageHeader({
  eyebrow,
  title,
  subtitle,
  breadcrumbs,
  children,
}: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden bg-brand-paper-sunken text-white -mt-16 md:-mt-20 pt-16 md:pt-20 border-b border-white/10">
      {/* One soft glow, top-right. Always the brand light blue — the single
          concession to colour, kept cool so it never reads warm/gold. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-1/3 right-[-10%] h-[34rem] w-[34rem] rounded-full opacity-50"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${ACCENT}, transparent 70%)`,
          filter: "blur(120px)",
        }}
      />

      {/* Faint fine-line grid — a quiet modern texture, masked to fade out. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.6]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(120% 100% at 50% 0%, black 30%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(120% 100% at 50% 0%, black 30%, transparent 75%)",
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
            <p className="mt-4 text-base md:text-lg text-white/65 leading-relaxed max-w-2xl text-balance">
              {subtitle}
            </p>
          )}

          {children && <div className="mt-6">{children}</div>}
        </div>
      </Container>

      {/* Multi-hue gradient hairline along the bottom edge — the one bit of
          colour that carries over, marking the seam into the white section. */}
      <div
        aria-hidden
        className="absolute bottom-0 inset-x-0 h-px pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent, #0a6ed3, #8b6dff, #f6b73c, #1fc9a8, transparent)",
        }}
      />
    </section>
  );
}
