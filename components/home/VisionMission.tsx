/**
 * VisionMission — section 05 on the homepage.
 *
 * Both blocks quote the company brief verbatim:
 *
 *   Vision  — "To become one of the most trusted and innovative lotto
 *              companies in Ghana, recognized for excellence, transparency,
 *              and customer satisfaction."
 *   Mission — "Our mission is to provide secure, fair, and accessible
 *              lottery services while empowering our agents, supporting
 *              our customers, and creating value for the communities we
 *              serve through professionalism, integrity, and innovation."
 *
 * Visual: side-by-side editorial split. Big quote marks (typographic
 * device) anchor each block. A faint moving multi-colour ribbon at the
 * top edge keeps the section visually generous without dropping into the
 * heavier dark-band treatment.
 */
import { Container } from "@/components/layout/Container";

export function VisionMission() {
  return (
    <section className="section-light relative overflow-hidden border-t border-brand-border">
      <Container>
        <div className="py-20 md:py-28">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 md:gap-4 mb-10 md:mb-14">
            <span className="font-display font-extrabold text-brand-primary tnum text-base md:text-lg">
              05
            </span>
            <span className="h-px w-12 md:w-20 bg-brand-border" />
            <span className="eyebrow text-brand-ink-muted">
              Vision &amp; mission
            </span>
          </div>

          <div className="grid gap-12 md:gap-16 lg:gap-20 md:grid-cols-2">
            {/* Vision */}
            <div className="relative">
              <span
                aria-hidden
                className="absolute -top-6 md:-top-8 -left-2 font-display font-black text-[8rem] md:text-[10rem] leading-none text-brand-primary/15 select-none"
              >
                “
              </span>
              <p className="relative eyebrow text-brand-primary mb-5">
                Our vision
              </p>
              <p className="relative font-display font-extrabold text-2xl md:text-3xl xl:text-4xl leading-[1.15] tracking-[-0.02em] text-brand-ink text-balance">
                To become one of the most trusted and innovative lotto
                companies in Ghana, recognised for excellence,
                transparency, and customer satisfaction.
              </p>
            </div>

            {/* Mission */}
            <div className="relative">
              <span
                aria-hidden
                className="absolute -top-6 md:-top-8 -left-2 font-display font-black text-[8rem] md:text-[10rem] leading-none text-brand-signal/20 select-none"
              >
                “
              </span>
              <p className="relative eyebrow text-brand-signal-deep mb-5">
                Our mission
              </p>
              <p className="relative text-lg md:text-xl xl:text-2xl leading-relaxed text-brand-ink text-balance">
                To provide secure, fair, and accessible lottery services
                while empowering our agents, supporting our customers, and
                creating value for the communities we serve, through
                professionalism, integrity, and innovation.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
