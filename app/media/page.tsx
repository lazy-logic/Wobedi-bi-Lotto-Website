/**
 * /media — Wobedi Bi Lotto media room.
 *
 * Per the company brief's site structure: "Media — photo gallery,
 * testimonials, achievements". This is the entry point for that material.
 *
 * Until the owner supplies the actual photographs, testimonials, and
 * achievements, the page renders three labelled scaffolds so the structure
 * is in place and obvious-to-the-eye where each piece of content will
 * eventually live.
 */
import type { Metadata } from "next";
import { Camera, Quote, Award } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { LightSection } from "@/components/layout/LightSection";

export const metadata: Metadata = {
  title: "Media",
  description:
    "Photo gallery, testimonials, and achievements from Wobedi Bi Lotto.",
};

const SECTIONS = [
  {
    icon: Camera,
    eyebrow: "01",
    title: "Photo gallery",
    body:
      "Moments from our agent network, community events, and day-to-day operations across Ghana.",
  },
  {
    icon: Quote,
    eyebrow: "02",
    title: "Testimonials",
    body:
      "What players, agents, and writers have to say about working and playing with us.",
  },
  {
    icon: Award,
    eyebrow: "03",
    title: "Achievements",
    body:
      "Milestones in our growth as a trusted Ghanaian lotto operator.",
  },
];

export default function MediaPage() {
  return (
    <>
      <PageHeader
        eyebrow="Media"
        title="Photo gallery, testimonials, achievements."
        subtitle="A growing record of Wobedi Bi Lotto, the people, the places, and the milestones along the way."
      />

      <LightSection className="py-16 md:py-20">
        <Container>
          <div className="grid gap-px bg-brand-border md:grid-cols-3">
            {SECTIONS.map((s) => (
              <div
                key={s.title}
                className="bg-white p-8 md:p-10 flex flex-col"
              >
                <span className="font-display font-extrabold tnum text-base text-brand-primary mb-4">
                  {s.eyebrow}
                </span>
                <s.icon size={26} strokeWidth={1.5} className="text-brand-primary mb-4" />
                <h2 className="font-display font-extrabold text-2xl md:text-3xl text-brand-ink leading-tight tracking-tight">
                  {s.title}
                </h2>
                <p className="mt-3 text-sm md:text-base text-brand-ink-muted leading-relaxed">
                  {s.body}
                </p>
                <span className="mt-6 inline-flex items-center gap-1.5 self-start px-2.5 py-1 rounded-full bg-brand-signal-soft text-brand-signal-deep text-[10px] font-bold uppercase tracking-wider">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-brand-signal-deep" />
                  Updating soon
                </span>
              </div>
            ))}
          </div>
        </Container>
      </LightSection>

      {/* Placeholder strip — full-bleed band so the page has a presence
          even without imagery loaded yet. */}
      <LightSection className="py-16 md:py-20" wave="left">
        <Container>
          <div className="max-w-2xl">
            <p className="eyebrow text-brand-primary mb-3">
              Get in touch
            </p>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl tracking-[-0.02em] text-brand-ink text-balance">
              Press, partnerships, and media enquiries.
            </h2>
            <p className="mt-4 text-base text-brand-ink-muted leading-relaxed">
              For media enquiries, interviews, or content requests please
              reach out via our{" "}
              <a
                href="/contact?subject=press"
                className="text-brand-primary font-semibold hover:underline"
              >
                contact form
              </a>
              .
            </p>
          </div>
        </Container>
      </LightSection>
    </>
  );
}
