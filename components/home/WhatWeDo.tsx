/**
 * WhatWeDo — section 03 on the homepage.
 *
 * The six commitments are copied directly from the company brief's
 * "What We Do" section:
 *   1. Provide reliable lottery services to customers.
 *   2. Support and manage a network of lotto agents and writers.
 *   3. Ensure transparency and fairness in all operations.
 *   4. Deliver excellent customer support through efficient communication channels.
 *   5. Promote responsible gaming practices within our communities.
 *   6. Use modern systems and technology to improve service delivery and customer experience.
 *
 * Visual: six commitment cards. Mobile renders a scroll-snap carousel with
 * pagination dots (CommitmentCarousel); md+ renders a calm 2/3-column grid.
 * Every accent is drawn from the brand-blue family so the section reads as one
 * cohesive blue identity, never a rainbow.
 */
import { Container } from "@/components/layout/Container";
import { CommitmentCarousel, type Commitment } from "./CommitmentCarousel";

// Brand-blue family only — a tonal ladder from bright signal to deep royal, so
// the six cards stay on-brand and read as variations of one identity.
const COMMITMENTS: Commitment[] = [
  {
    index: "01",
    title: "Reliable lottery services",
    body: "Trusted NLA 5/90 draws delivered consistently to customers across Ghana.",
    accent: "#3b9bff", // brand signal — brightest
  },
  {
    index: "02",
    title: "Agents and writers",
    body: "We support and manage a growing network of lotto agents and writers.",
    accent: "#0a6ed3", // brand signal-deep
  },
  {
    index: "03",
    title: "Transparency and fairness",
    body: "Operations conducted openly in every transaction and every draw.",
    accent: "#2563eb", // mid royal
  },
  {
    index: "04",
    title: "Excellent customer support",
    body: "Efficient communication channels and a team that answers when called.",
    accent: "#054e98", // brand secondary
  },
  {
    index: "05",
    title: "Responsible gaming",
    body: "Promoting healthy, age-verified play within every community we serve.",
    accent: "#0d337d", // brand primary — the royal lead
  },
  {
    index: "06",
    title: "Modern systems",
    body: "Technology that improves service delivery and customer experience.",
    accent: "#092556", // brand primary-deep — deepest
  },
];

export function WhatWeDo() {
  return (
    <section className="section-light relative overflow-hidden">
      <Container>
        <div className="py-20 md:py-28">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 md:gap-4 mb-10 md:mb-14">
            <span className="font-display font-extrabold text-brand-primary tnum text-base md:text-lg">
              03
            </span>
            <span className="h-px w-12 md:w-20 bg-brand-border" />
            <span className="eyebrow text-brand-ink-muted">
              What we do
            </span>
          </div>

          {/* Headline */}
          <div className="grid gap-6 md:gap-8 md:grid-cols-12 items-end mb-12 md:mb-16">
            <h2 className="md:col-span-8 font-display font-extrabold text-4xl md:text-5xl xl:text-6xl leading-[1.04] tracking-[-0.02em] text-brand-ink text-balance">
              Six commitments that shape every draw.
            </h2>
            <p className="md:col-span-4 text-sm md:text-base text-brand-ink-muted leading-relaxed">
              Every part of the operation, from head office to a kiosk in
              Adansi-Asokwa, is held to these same six things.
            </p>
          </div>

          {/* Commitment cards — carousel on mobile (with pagination dots),
              2/3-column grid on md+. */}
          <CommitmentCarousel commitments={COMMITMENTS} />
        </div>
      </Container>
    </section>
  );
}
