/**
 * /about — Wobedi Bi Lotto corporate page.
 *
 * Narrative essay, the "what we do" pillar grid, and the vision + mission
 * statement — sourced directly from the company brief.
 */
import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  Target,
  Users,
  Scale,
  Headphones,
  Cpu,
  TrendingUp,
  Lightbulb,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { LightSection } from "@/components/layout/LightSection";

export const metadata: Metadata = {
  title: "About",
  description:
    "Wobedi Bi Lotto is a trusted, customer-focused lottery company committed to providing exciting, transparent, and responsible gaming experiences across Ghana — lottery operations, digital gaming, and agent-based services led by a dedicated management team.",
};

const PILLARS: { title: string; body: string; icon: LucideIcon }[] = [
  {
    icon: Target,
    title: "Reliable lottery services",
    body: "Trusted NLA 5/90 draws delivered consistently across our network of agents and writers.",
  },
  {
    icon: Users,
    title: "Strong agent network",
    body: "We support and manage the agents and writers who keep the games close to the community.",
  },
  {
    icon: Scale,
    title: "Transparency and fairness",
    body: "Operations conducted openly and in line with NLA regulations under Act 722.",
  },
  {
    icon: Headphones,
    title: "Excellent customer support",
    body: "Efficient communication channels and a team that answers when you call.",
  },
  {
    icon: ShieldCheck,
    title: "Responsible gaming",
    body: "Promoting healthy play, age verification, and self-control across every community we serve.",
  },
  {
    icon: Cpu,
    title: "Modern systems",
    body: "Technology that improves service delivery and the day-to-day experience for players, writers, and agents.",
  },
];

// How the leadership team works — drawn from the management narrative.
const LEADERSHIP: { title: string; body: string; icon: LucideIcon }[] = [
  {
    icon: TrendingUp,
    title: "Sustainable growth",
    body: "Effective decision-making, strong operational systems, and continuous improvement drive long-term success.",
  },
  {
    icon: ShieldCheck,
    title: "Professionalism & integrity",
    body: "High standards of professionalism, transparency, and integrity in every aspect of the company's operations.",
  },
  {
    icon: Users,
    title: "People & teamwork",
    body: "Staff development, teamwork, and responsible business practices that build a productive, trusted organization.",
  },
  {
    icon: Lightbulb,
    title: "Innovation & excellence",
    body: "Modern business practices and deep market understanding, focused on efficiency and customer satisfaction.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About us"
        title="Welcome to Wobedi Bi Lotto."
        subtitle="A trusted Ghanaian lotto company, NLA-licensed under the National Lotto Act 2006 (Act 722), built on integrity, transparency, and responsible gaming."
      />

      {/* Who we are — narrative */}
      <LightSection className="py-20 md:py-24">
        <Container>
          <div className="max-w-2xl mx-auto space-y-7 text-base md:text-lg leading-relaxed text-brand-ink">
            <p>
              Wobedi Bi Lotto is a trusted and customer-focused lottery company
              committed to providing exciting, transparent, and responsible
              gaming experiences across Ghana. The company specializes in
              lottery operations, digital gaming solutions, and agent-based
              services designed to create opportunities for players while
              promoting convenience and reliability.
            </p>
            <p className="text-brand-ink-muted">
              At Wobedi Bi Lotto, we believe in integrity, innovation, and
              excellent customer service. Our mission is to deliver secure and
              rewarding lottery services through modern technology and
              professional operations, while contributing positively to the
              communities we serve.
            </p>
          </div>
        </Container>
      </LightSection>

      {/* What we do — pillar grid (light) */}
      <LightSection className="py-16 md:py-20" wave="left">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-12">
            <p className="eyebrow text-brand-primary mb-3">
              What we do
            </p>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl tracking-[-0.01em] text-brand-ink text-balance">
              Six commitments that shape every draw.
            </h2>
          </div>

          <div className="grid gap-5 md:gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
            {PILLARS.map((p, i) => (
              <div
                key={p.title}
                className="fade-rise rounded-2xl border border-brand-border bg-white p-6 shadow-soft transition-all duration-300 hover:shadow-medium hover:-translate-y-0.5"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-brand-primary-soft text-brand-primary mb-4">
                  <p.icon size={20} strokeWidth={2} />
                </div>
                <h3 className="font-display font-extrabold text-lg text-brand-ink mb-2 leading-tight tracking-[-0.01em]">
                  {p.title}
                </h3>
                <p className="text-sm text-brand-ink-muted leading-relaxed">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </LightSection>

      {/* Management team — the page's one dark contrast band. A deep blue
          field with a soft glow carries an editorial lead statement on the
          left and the leadership operating principles on the right. */}
      <section className="relative overflow-hidden bg-brand-paper-sunken text-white py-20 md:py-28 border-y border-white/10">
        {/* Soft blue glow, top-right */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-1/4 right-[-8%] h-[36rem] w-[36rem] rounded-full opacity-50"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(59,155,255,0.20), transparent 70%)",
            filter: "blur(120px)",
          }}
        />

        <Container>
          <div className="relative z-10 grid gap-12 lg:gap-16 lg:grid-cols-12 items-start">
            {/* Lead statement */}
            <div className="lg:col-span-5">
              <div className="flex items-center gap-2.5 mb-5">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-signal" />
                <span className="eyebrow text-white/60">Our leadership</span>
              </div>
              <h2 className="font-display font-extrabold text-3xl md:text-4xl leading-[1.1] tracking-[-0.025em] text-white text-balance">
                A dedicated <span className="gradient-ink">management team.</span>
              </h2>
              <div className="mt-6 space-y-5 text-base md:text-lg text-white/70 leading-relaxed">
                <p>
                  Our management team is committed to building a strong,
                  reliable, and customer-focused organization. With a shared
                  passion for excellence, innovation, and accountability, the
                  team brings together diverse experience in business
                  operations, customer service, administration, finance, and
                  strategic management.
                </p>
                <p className="text-white/55">
                  As a growing company, our leadership remains committed to
                  innovation, operational excellence, and delivering quality
                  services that meet the needs of our customers and
                  stakeholders.
                </p>
              </div>
            </div>

            {/* Operating principles */}
            <div className="lg:col-span-7 grid gap-4 sm:grid-cols-2">
              {LEADERSHIP.map((l) => (
                <div
                  key={l.title}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm transition-colors hover:bg-white/[0.07]"
                >
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-brand-signal/15 text-brand-signal mb-4">
                    <l.icon size={20} strokeWidth={2} />
                  </div>
                  <h3 className="font-display font-extrabold text-lg text-white mb-2 leading-tight tracking-[-0.01em]">
                    {l.title}
                  </h3>
                  <p className="text-sm text-white/60 leading-relaxed">
                    {l.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Vision + Mission — light editorial split with an asymmetric
          two-column layout and oversized index numerals. Uses the
          section-light scope so brand tokens read dark-on-light. */}
      <section className="section-light relative overflow-hidden py-24 md:py-32">
        <Container>
          <div className="relative z-10 max-w-5xl mx-auto">
            {/* Section eyebrow */}
            <div className="flex items-center gap-3 mb-12 md:mb-16">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-primary" />
              <span className="eyebrow text-brand-ink-muted">What drives us</span>
              <span className="h-px flex-1 bg-gradient-to-r from-brand-border-strong to-transparent" />
            </div>

            <div className="grid gap-x-12 gap-y-14 md:grid-cols-12">
              {/* Vision — the larger, leading statement */}
              <div className="md:col-span-7">
                <div className="flex items-baseline gap-4">
                  <span className="font-display font-black text-brand-primary/25 tnum text-2xl leading-none select-none">
                    01
                  </span>
                  <p className="eyebrow text-brand-primary">Our vision</p>
                </div>
                <h2 className="mt-5 font-display font-extrabold text-[1.75rem] md:text-4xl xl:text-[2.75rem] leading-[1.14] tracking-[-0.025em] text-brand-ink text-balance">
                  To become one of the most trusted and innovative lotto
                  companies in Ghana — recognised for{" "}
                  <span className="gradient-ink">excellence, transparency,
                  and customer satisfaction.</span>
                </h2>
              </div>

              {/* Mission — the supporting prose, set apart by a vertical rule */}
              <div className="md:col-span-5 md:border-l md:border-brand-border md:pl-12">
                <div className="flex items-baseline gap-4">
                  <span className="font-display font-black text-brand-primary/25 tnum text-2xl leading-none select-none">
                    02
                  </span>
                  <p className="eyebrow text-brand-ink-muted">Our mission</p>
                </div>
                <p className="mt-5 text-base md:text-lg leading-relaxed text-brand-ink-muted text-balance">
                  To deliver secure and rewarding lottery services through
                  modern technology and professional operations — empowering
                  our agents, supporting our customers, and contributing
                  positively to the communities we serve.
                </p>
              </div>
            </div>

            {/* Minimal CTA — one quiet line + a single pill, divider above. */}
            <div className="mt-14 md:mt-20 pt-10 border-t border-brand-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
              <p className="text-base md:text-lg text-brand-ink">
                Have a question, or interested in becoming an agent?
              </p>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 h-12 px-7 rounded-full bg-brand-primary text-white text-base font-semibold hover:bg-brand-primary-deep transition-all whitespace-nowrap"
              >
                Get in touch
                <ArrowRight
                  size={18}
                  strokeWidth={2}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </Link>
            </div>
          </div>
        </Container>

        {/* Multi-hue gradient hairline at the bottom, echoing the PageHeader. */}
        <div
          aria-hidden
          className="absolute bottom-0 inset-x-0 h-px pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, transparent, #0a6ed3, #8b6dff, #f6b73c, #1fc9a8, transparent)",
          }}
        />
      </section>
    </>
  );
}
