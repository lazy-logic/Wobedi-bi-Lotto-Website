/**
 * WhoWeAre — section 02 on the homepage.
 *
 * Content sourced verbatim from the Wobedi Bi Lotto company brief:
 *   "Who We Are" + "What Our Business Is" — combined into a single
 *   editorial moment with two paragraph beats.
 *
 * Visual: large display headline split across two lines, supporting copy
 * column to the right. Subtle animated gradient stripe at the top of the
 * section so the surface change from the hero reads as a deliberate
 * editorial break.
 */
import { Container } from "@/components/layout/Container";
import { AuroraBackdrop } from "@/components/layout/AuroraBackdrop";

export function WhoWeAre() {
  return (
    <section className="relative bg-brand-paper-muted border-t border-brand-border overflow-hidden">
      {/* Decorative gradient stripe — now blue → violet → gold so the top
          edge previews the section's mixed palette, not just blue. */}
      <div
        aria-hidden
        className="absolute top-0 left-0 right-0 h-1 pointer-events-none z-10"
        style={{
          background:
            "linear-gradient(90deg, transparent, #0a6ed3, #8b6dff, #3b9bff, #f6b73c, #0a6ed3, transparent)",
          backgroundSize: "200% 100%",
        }}
      />

      {/* Abstract violet aurora */}
      <AuroraBackdrop tone="violet" />

      <Container>
        <div className="relative z-10 py-20 md:py-28">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 md:gap-4 mb-10 md:mb-14">
            <span className="font-display font-extrabold text-brand-primary tnum text-base md:text-lg">
              02
            </span>
            <span className="h-px w-12 md:w-20 bg-brand-border" />
            <span className="eyebrow text-brand-ink-muted">
              Who we are
            </span>
          </div>

          <div className="grid gap-10 md:gap-14 lg:gap-20 lg:grid-cols-12 items-start">
            <div className="lg:col-span-6">
              <h2 className="font-display font-extrabold text-4xl md:text-5xl xl:text-6xl leading-[1.04] tracking-[-0.02em] text-brand-ink text-balance">
                A reliable, fast-growing lotto company —{" "}
                <span className="text-brand-primary">built for Ghana.</span>
              </h2>
            </div>
            <div className="lg:col-span-6 space-y-6 text-base md:text-lg text-brand-ink leading-relaxed">
              <p>
                Wobedi Bi Lotto is a trusted, customer-focused lottery company
                committed to providing exciting, transparent, and responsible
                gaming experiences across Ghana — creating opportunities for
                players while promoting convenience and reliability.
              </p>
              <p className="text-brand-ink-muted">
                We specialize in lottery operations, digital gaming solutions,
                and agent-based services — a secure platform where customers
                take part with confidence, built on integrity, innovation, and
                excellent customer service.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
