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
import { AuroraBackdrop } from "@/components/layout/AuroraBackdrop";

export function VisionMission() {
  return (
    <section className="relative bg-brand-paper border-t border-brand-border overflow-hidden">
      {/* Multi-colour ribbon (top edge) — blue → teal → gold → violet. */}
      <div
        aria-hidden
        className="absolute top-0 left-0 right-0 h-1 pointer-events-none z-10"
        style={{
          background:
            "linear-gradient(90deg, transparent, #0a6ed3, #1fc9a8, #3b9bff, #f6b73c, #8b6dff, transparent)",
          backgroundSize: "200% 100%",
        }}
      />

      {/* Abstract ember aurora (gold + violet) */}
      <AuroraBackdrop tone="ember" />

      <Container>
        <div className="relative z-10 py-20 md:py-28">
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
                className="absolute -top-6 md:-top-8 -left-2 font-display font-black text-[8rem] md:text-[10rem] leading-none text-brand-violet/15 select-none"
              >
                “
              </span>
              <p className="relative eyebrow text-brand-violet mb-5">
                Our vision
              </p>
              <p className="relative font-display font-extrabold text-2xl md:text-3xl xl:text-4xl leading-[1.15] tracking-[-0.02em] text-brand-ink text-balance">
                To become one of the most trusted and innovative lotto
                companies in Ghana — recognised for excellence,
                transparency, and customer satisfaction.
              </p>
            </div>

            {/* Mission */}
            <div className="relative">
              <span
                aria-hidden
                className="absolute -top-6 md:-top-8 -left-2 font-display font-black text-[8rem] md:text-[10rem] leading-none text-brand-gold/15 select-none"
              >
                “
              </span>
              <p className="relative eyebrow text-brand-gold mb-5">
                Our mission
              </p>
              <p className="relative text-lg md:text-xl xl:text-2xl leading-relaxed text-brand-ink text-balance">
                To provide secure, fair, and accessible lottery services
                while empowering our agents, supporting our customers, and
                creating value for the communities we serve — through
                professionalism, integrity, and innovation.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
