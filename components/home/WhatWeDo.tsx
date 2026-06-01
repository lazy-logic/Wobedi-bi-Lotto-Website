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
 * Visual: six tiles in a 3-column grid on lg+. Each tile carries a coloured
 * accent corner drawn from a mixed palette (blue · gold · teal · violet ·
 * celtic · coral) so the section reads as a generous, multi-coloured grid
 * rather than six uniform blue cards.
 */
import { Container } from "@/components/layout/Container";

type Commitment = {
  index: string;
  title: string;
  body: string;
  accent: string; // CSS color literal, feeds the corner triangle + number
};

const COMMITMENTS: Commitment[] = [
  {
    index: "01",
    title: "Reliable lottery services",
    body: "Trusted NLA 5/90 draws delivered consistently to customers across Ghana.",
    accent: "#3b9bff", // sky blue
  },
  {
    index: "02",
    title: "Agents and writers",
    body: "We support and manage a growing network of lotto agents and writers.",
    accent: "#f6b73c", // gold
  },
  {
    index: "03",
    title: "Transparency and fairness",
    body: "Operations conducted openly in every transaction and every draw.",
    accent: "#1fc9a8", // teal
  },
  {
    index: "04",
    title: "Excellent customer support",
    body: "Efficient communication channels and a team that answers when called.",
    accent: "#8b6dff", // violet
  },
  {
    index: "05",
    title: "Responsible gaming",
    body: "Promoting healthy, age-verified play within every community we serve.",
    accent: "#0a6ed3", // celtic
  },
  {
    index: "06",
    title: "Modern systems",
    body: "Technology that improves service delivery and customer experience.",
    accent: "#ff7a59", // coral
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

          {/* Commitment grid */}
          <div className="grid gap-px bg-brand-border md:grid-cols-2 lg:grid-cols-3">
            {COMMITMENTS.map((c) => (
              <CommitmentTile key={c.index} {...c} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

function CommitmentTile({ index, title, body, accent }: Commitment) {
  return (
    <div className="group relative bg-white p-7 md:p-9 overflow-hidden transition-colors duration-300 hover:bg-brand-paper-muted">
      {/* Coloured corner triangle — the per-tile accent */}
      <div
        aria-hidden
        className="absolute top-0 right-0 w-0 h-0 transition-all duration-300 group-hover:w-24 group-hover:h-24"
        style={{
          width: "16px",
          height: "16px",
          borderTop: `16px solid ${accent}`,
          borderLeft: "16px solid transparent",
        }}
      />

      {/* Underline that reveals on hover */}
      <span
        aria-hidden
        className="absolute left-7 md:left-9 right-7 md:right-9 bottom-7 md:bottom-9 h-px scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"
        style={{ background: accent }}
      />

      <span
        className="font-display font-extrabold tnum text-base"
        style={{ color: accent }}
      >
        {index}
      </span>
      <h3 className="mt-4 font-display font-extrabold text-xl md:text-2xl text-brand-ink leading-tight tracking-tight">
        {title}
      </h3>
      <p className="mt-3 text-sm md:text-base text-brand-ink-muted leading-relaxed">
        {body}
      </p>
    </div>
  );
}
