/**
 * ResponsibleHook — section 06 on the homepage. "Blue Hour" dark edition.
 *
 * Teaser into /responsible-play. Deep rich-black panel with an electric
 * wash; a red 18+ glyph (the one semantic safety exception to the
 * monochrome-blue palette) anchors the left.
 */
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { AuroraBackdrop } from "@/components/layout/AuroraBackdrop";

const RULES = [
  "Set personal spending limits.",
  "Avoid borrowing money to play.",
  "Play only with money you can afford to lose.",
  "Take regular breaks from gaming activities.",
];

export function ResponsibleHook() {
  return (
    <section className="relative bg-brand-paper-sunken text-brand-ink overflow-hidden border-t border-brand-border">
      {/* Electric depth pool */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 70% at 15% 100%, rgba(10,110,211,0.22), transparent 60%)",
        }}
      />

      {/* Abstract gold aurora — warm balance against the red 18+ glyph */}
      <AuroraBackdrop tone="gold" ribbon={false} />

      <Container>
        <div className="relative z-10 py-20 md:py-28">
          <div className="flex items-center gap-3 md:gap-4 mb-10 md:mb-14">
            <span className="font-mono font-bold text-brand-primary tnum text-base md:text-lg">06</span>
            <span className="h-px w-12 md:w-20 bg-brand-border-strong" />
            <span className="eyebrow text-brand-ink-muted">Responsible play</span>
          </div>

          <div className="grid gap-12 lg:gap-20 lg:grid-cols-12 items-center">
            {/* 18+ glyph — red (semantic age-restriction marker) */}
            <div className="lg:col-span-4 flex justify-center lg:justify-start">
              <div className="relative inline-flex items-center justify-center w-40 h-40 md:w-56 md:h-56 rounded-full bg-brand-danger text-white font-display font-extrabold text-5xl md:text-7xl shadow-[0_24px_60px_-20px_rgba(239,90,82,0.5)]">
                18+
                <span
                  aria-hidden
                  className="absolute inset-0 rounded-full border-2 border-brand-danger/50 animate-ping"
                />
              </div>
            </div>

            <div className="lg:col-span-8">
              <h2 className="font-display font-extrabold text-4xl md:text-5xl xl:text-6xl leading-[1.05] tracking-[-0.02em] text-brand-ink text-balance">
                Lotto is entertainment.{" "}
                <span className="text-brand-primary">Strictly 18 and over.</span>
              </h2>
              <p className="mt-5 text-base md:text-lg text-brand-ink-muted leading-relaxed max-w-xl">
                Customers are encouraged to participate in lottery games
                strictly for entertainment — not as a source of income or
                financial recovery.
              </p>

              <ul className="mt-8 grid gap-3 sm:grid-cols-2 max-w-2xl">
                {RULES.map((r) => (
                  <li
                    key={r}
                    className="flex items-start gap-3 border-l-2 border-brand-primary pl-4 py-1 text-sm md:text-base text-brand-ink"
                  >
                    {r}
                  </li>
                ))}
              </ul>

              <Link
                href="/responsible-play"
                className="group mt-10 inline-flex items-center gap-2 h-12 px-6 rounded-lg bg-brand-primary text-white text-sm font-bold uppercase tracking-wider hover:bg-brand-primary-deep transition-colors"
              >
                Read the full policy
                <ArrowRight size={16} strokeWidth={2.25} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
