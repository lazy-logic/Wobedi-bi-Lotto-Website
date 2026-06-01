/**
 * /about — Wobedi Bi Lotto corporate page.
 *
 * Narrative essay, the "what we do" pillar grid, and the vision + mission
 * statement — sourced directly from the company brief.
 */
import type { Metadata } from "next";
import {
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
    "Wobedi Bi Lotto is a trusted, customer-focused lottery company committed to providing exciting, transparent, and responsible gaming experiences across Ghana, lottery operations, digital gaming, and agent-based services led by a dedicated management team.",
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
        title="A Ghanaian lotto built on trust."
        subtitle="We run fair, NLA-licensed 5/90 draws and back them with a network of agents who keep the game close to home."
      />

      {/* Who we are — editorial two-column narrative */}
      <LightSection className="py-20 md:py-24">
        <Container>
          <div className="grid gap-10 lg:gap-16 lg:grid-cols-12 items-start">
            {/* Left rail — eyebrow, lead statement, at-a-glance chips */}
            <div className="lg:col-span-5">
              <div className="flex items-center gap-2.5 mb-5">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-primary" />
                <span className="eyebrow text-brand-primary">Who we are</span>
              </div>
              <h2 className="font-display font-extrabold text-3xl md:text-4xl xl:text-[2.75rem] leading-[1.1] tracking-[-0.025em] text-brand-ink text-balance">
                A trusted, customer-focused{" "}
                <span className="gradient-ink">Ghanaian lotto.</span>
              </h2>

              {/* At-a-glance chips */}
              <div className="mt-8 flex flex-wrap gap-2.5">
                {[
                  { icon: ShieldCheck, label: "NLA-licensed" },
                  { icon: Users, label: "Agent network" },
                  { icon: Cpu, label: "Modern systems" },
                ].map((c) => (
                  <span
                    key={c.label}
                    className="inline-flex items-center gap-2 rounded-full border border-brand-border bg-white px-3.5 py-2 text-sm font-semibold text-brand-ink"
                  >
                    <c.icon size={15} strokeWidth={2} className="text-brand-primary" />
                    {c.label}
                  </span>
                ))}
              </div>
            </div>

            {/* Right — narrative prose, first paragraph as a lead */}
            <div className="lg:col-span-7 lg:pt-2">
              <p className="text-xl md:text-2xl leading-relaxed text-brand-ink text-balance">
                Wobedi Bi Lotto is a trusted and customer-focused lottery
                company committed to providing exciting, transparent, and
                responsible gaming experiences across Ghana.
              </p>
              <div className="mt-6 space-y-5 text-base md:text-lg leading-relaxed text-brand-ink-muted border-l-2 border-brand-border pl-6">
                <p>
                  The company specializes in lottery operations, digital gaming
                  solutions, and agent-based services designed to create
                  opportunities for players while promoting convenience and
                  reliability.
                </p>
                <p>
                  We believe in integrity, innovation, and excellent customer
                  service. Our mission is to deliver secure and rewarding
                  lottery services through modern technology and professional
                  operations, while contributing positively to the communities
                  we serve.
                </p>
              </div>
            </div>
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
                className="fade-rise rounded-2xl border border-brand-border bg-white p-6 transition-all duration-300 hover:border-brand-border-strong hover:-translate-y-0.5"
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

      {/* Vision + Mission — minimal: two quiet labelled statements. */}
      <section className="section-light py-24 md:py-32">
        <Container>
          <div className="max-w-5xl mx-auto grid gap-12 md:gap-16 md:grid-cols-2">
            <div>
              <p className="eyebrow text-brand-primary mb-4">Our vision</p>
              <h2 className="font-display font-extrabold text-2xl md:text-3xl leading-[1.2] tracking-[-0.02em] text-brand-ink text-balance">
                To become one of the most trusted and innovative lotto
                companies in Ghana, recognised for excellence, transparency,
                and customer satisfaction.
              </h2>
            </div>

            <div>
              <p className="eyebrow text-brand-primary mb-4">Our mission</p>
              <p className="text-base md:text-lg leading-relaxed text-brand-ink-muted text-balance">
                To deliver secure and rewarding lottery services through modern
                technology and professional operations, empowering our agents,
                supporting our customers, and contributing positively to the
                communities we serve.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
