/**
 * GamesShowcase — section 04 on the homepage. "Blue Hour" dark edition.
 *
 * Three NLA 5/90 product lines (VAG · Noon Rush · Main Games) from the
 * company brief, shown as three dark panels on the rich-black field, each
 * framed by its own accent hue (blue · gold · violet) so the trio reads as
 * three distinct products rather than three shades of the same blue.
 */
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { AuroraBackdrop } from "@/components/layout/AuroraBackdrop";

type ProductLine = {
  name: string;
  hook: string;
  schedule: string[];
  accent: string; // its own accent hue (blue · gold · violet)
};

const LINES: ProductLine[] = [
  {
    name: "VAG",
    hook: "Six VAG draws, Monday through Saturday — a daily companion product across the week.",
    schedule: [
      "VAG Monday", "VAG Tuesday", "VAG Wednesday",
      "VAG Thursday", "VAG Friday", "VAG Saturday",
    ],
    accent: "#3b9bff",
  },
  {
    name: "Noon Rush",
    hook: "Midday NLA draws Monday through Saturday — six chances around the lunchtime window.",
    schedule: [
      "Noon Rush Monday", "Noon Rush Tuesday", "Noon Rush Wednesday",
      "Noon Rush Thursday", "Noon Rush Friday", "Noon Rush Saturday",
    ],
    accent: "#f6b73c", // gold — the midday sun line
  },
  {
    name: "Main Games",
    hook: "Seven flagship NLA 5/90 draws across the week — including the National Saturday draw.",
    schedule: [
      "Monday Special", "Lucky Tuesday", "Midweek (Wednesday)",
      "Fortune Thursday", "Friday Bonanza", "National (Saturday)", "Sunday Aseda",
    ],
    accent: "#8b6dff", // violet — the flagship line
  },
];

export function GamesShowcase() {
  return (
    <section className="relative bg-brand-paper-muted text-brand-ink overflow-hidden border-y border-brand-border">
      {/* Diagonal hairlines + a single electric pool top-right */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, rgba(96,150,220,0.7) 0, rgba(96,150,220,0.7) 1px, transparent 1px, transparent 28px)",
          maskImage:
            "radial-gradient(ellipse 80% 70% at 50% 50%, black, transparent 90%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 70% at 50% 50%, black, transparent 90%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 60% at 88% 0%, rgba(10,110,211,0.18), transparent 60%)",
        }}
      />

      {/* Abstract teal aurora */}
      <AuroraBackdrop tone="teal" />

      <Container>
        <div className="relative z-10 py-20 md:py-28">
          <div className="flex items-center gap-3 md:gap-4 mb-10 md:mb-14">
            <span className="font-mono font-bold text-brand-primary tnum text-base md:text-lg">04</span>
            <span className="h-px w-12 md:w-20 bg-brand-border-strong" />
            <span className="eyebrow text-brand-ink-muted">Our products — NLA 5/90</span>
          </div>

          <div className="grid gap-6 md:gap-8 md:grid-cols-12 items-end mb-12 md:mb-16">
            <h2 className="md:col-span-8 font-display font-extrabold text-4xl md:text-5xl xl:text-6xl leading-[1.04] tracking-[-0.02em] text-brand-ink text-balance">
              Nineteen NLA-licensed draws across the week.
            </h2>
            <p className="md:col-span-4 text-sm md:text-base text-brand-ink-muted leading-relaxed">
              Three product lines — VAG, Noon Rush, and the Main Games —
              all played at NLA-licensed POS terminals through our network
              of agents and writers.
            </p>
          </div>

          {/* Three product panels */}
          <div className="grid gap-px bg-brand-border lg:grid-cols-3">
            {LINES.map((line) => (
              <article
                key={line.name}
                className="group relative bg-brand-paper p-7 md:p-10 transition-colors duration-300 hover:bg-brand-paper-warm"
              >
                <div className="absolute top-0 left-0 right-0 h-1.5" style={{ background: line.accent }} aria-hidden />
                <div
                  className="absolute top-0 right-0 w-0.5 h-0 transition-all duration-300 group-hover:h-full"
                  style={{ background: line.accent }}
                  aria-hidden
                />

                <p className="eyebrow" style={{ color: line.accent }}>Product line</p>
                <h3 className="mt-3 font-display font-extrabold text-3xl md:text-4xl text-brand-ink leading-[1.05] tracking-tight">
                  {line.name}
                </h3>
                <p className="mt-4 text-sm md:text-base text-brand-ink-muted leading-relaxed">
                  {line.hook}
                </p>

                <ul className="mt-6 flex flex-wrap gap-2">
                  {line.schedule.map((draw) => (
                    <li
                      key={draw}
                      className="px-3 py-1.5 font-mono text-xs font-medium border border-brand-border text-brand-ink-muted"
                    >
                      {draw}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <div className="mt-10 md:mt-12 flex items-center justify-between gap-4 border-t border-brand-border pt-6">
            <span className="text-xs md:text-sm text-brand-ink-muted">
              Every game operates under the National Lotto Act 2006 (Act 722).
            </span>
            <Link
              href="/games"
              className="group inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-brand-primary hover:text-brand-signal transition-colors"
            >
              Browse every game
              <ArrowRight size={16} strokeWidth={2.25} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
