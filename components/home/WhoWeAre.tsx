/**
 * WhoWeAre — section 02 on the homepage.
 *
 * Content sourced verbatim from the Wobedi Bi Lotto company brief:
 *   "Who We Are" + "What Our Business Is" — combined into a single
 *   editorial moment with two paragraph beats.
 *
 * Visual: a clean WHITE section (section-light scope) — a deliberate light
 * break right after the dark hero + ticker. Large display headline on the
 * left, supporting copy column on the right.
 */
import { Container } from "@/components/layout/Container";

export function WhoWeAre() {
  return (
    <section className="section-light relative overflow-hidden border-t border-brand-border">
      <Container>
        <div className="py-20 md:py-28">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 md:gap-4 mb-10 md:mb-14">
            <span className="font-display font-extrabold text-brand-primary tnum text-base md:text-lg">
              02
            </span>
            <span className="h-px w-12 md:w-20 bg-brand-border" />
            <span className="eyebrow text-brand-ink-muted">Who we are</span>
          </div>

          <div className="grid gap-10 md:gap-14 lg:gap-20 lg:grid-cols-12 items-start">
            <div className="lg:col-span-6">
              <h2 className="font-display font-extrabold text-4xl md:text-5xl xl:text-6xl leading-[1.04] tracking-[-0.02em] text-brand-ink text-balance">
                A reliable, fast-growing lotto company,{" "}
                <span className="text-brand-primary">built for Ghana.</span>
              </h2>
            </div>
            <div className="lg:col-span-6 space-y-6 text-base md:text-lg text-brand-ink leading-relaxed">
              <p>
                Wobedi Bi Lotto is a trusted, customer-focused lottery company
                committed to providing exciting, transparent, and responsible
                gaming experiences across Ghana, creating opportunities for
                players while promoting convenience and reliability.
              </p>
              <p className="text-brand-ink-muted">
                We specialize in lottery operations, digital gaming solutions,
                and agent-based services, a secure platform where customers
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
