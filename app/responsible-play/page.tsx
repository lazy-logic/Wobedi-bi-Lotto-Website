/**
 * /responsible-play — MANDATORY page (compliance requirement).
 *
 * Tone is calm, not lecturing. Specifically NO motion on this page beyond
 * the global page-transition; animation here would feel inappropriate.
 *
 * Content sourced from Wobedi Bi Lotto's published Responsible Gaming
 * Policy (six principles + prohibited practices + awareness + policy
 * review).
 *
 * The 18+ badge in the hero is rendered as REAL TEXT (not an icon) so
 * screen readers announce it correctly.
 */
import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { LightSection } from "@/components/layout/LightSection";
import {
  Wallet,
  Pause,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Users,
  HeartHandshake,
  XCircle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Responsible play",
  description:
    "Wobedi Bi Lotto's Responsible Gaming Policy. Play within your means. Strictly 18+. Self-control, fair operations, and support for problem gaming.",
};

const PRINCIPLES = [
  {
    icon: Sparkles,
    title: "Gaming for entertainment",
    body: "Play for fun, not as a source of income or a way to recover losses. Treat every ticket as a small piece of entertainment.",
  },
  {
    icon: ShieldCheck,
    title: "Strictly 18 and over",
    body: "Participation is limited to persons 18 years and above. Our agents and writers verify age and refuse service to anyone underage.",
  },
  {
    icon: Wallet,
    title: "Self-control and spending limits",
    body: "Set personal limits, don't borrow money to play, play only with what you can afford to lose, and take regular breaks.",
  },
  {
    icon: HeartHandshake,
    title: "Fair and transparent operations",
    body: "Every draw and transaction is conducted with fairness, honesty, and integrity, in line with NLA regulations.",
  },
  {
    icon: Users,
    title: "Employee and agent responsibility",
    body: "Our team promotes responsible play, treats every customer respectfully, and never encourages excessive gaming.",
  },
  {
    icon: MessageCircle,
    title: "Support for problem gaming",
    body: "If play stops being fun, speak to family, a professional counsellor, or a support organisation. We'll point you to the right place.",
  },
];

const WARNING_SIGNS = [
  "Spending beyond personal financial limits.",
  "Neglecting work or family responsibilities.",
  "Chasing losses continuously.",
  "Borrowing money to continue playing.",
];

const PROHIBITED = [
  "Underage gaming.",
  "Fraudulent activities.",
  "Misleading promotions or false promises of guaranteed winnings.",
  "Harassment or pressure on customers to play.",
];

export default function ResponsiblePlayPage() {
  return (
    <>
      <PageHeader
        eyebrow="Responsible play"
        title="Play within your means."
        subtitle="Wobedi Bi Lotto is committed to responsible gaming. Our six principles, the warning signs to watch for, and what to do if you need help."
      >
        <span className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-brand-danger/15 ring-1 ring-brand-danger/40 text-white text-sm font-bold">
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-brand-danger text-white text-xs font-extrabold shadow-soft">
            18+
          </span>
          Strictly 18 and over
        </span>
      </PageHeader>

      {/* Six principles */}
      <LightSection className="py-16 md:py-20">
        <Container>
          <div className="max-w-3xl mb-10 md:mb-12">
            <p className="eyebrow text-brand-primary mb-3">
              Our policy
            </p>
            <h2 className="text-4xl md:text-5xl tracking-[-0.02em]">
              Six responsible-gaming principles.
            </h2>
            <p className="mt-5 text-base md:text-lg text-brand-ink-muted leading-relaxed text-balance">
              The principles below shape how we operate every day — at head
              office, at writer desks, and at every agent's POS terminal.
            </p>
          </div>

          <div className="grid gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PRINCIPLES.map((p) => (
              <article
                key={p.title}
                className="rounded-2xl border border-brand-border bg-brand-paper p-6 shadow-soft"
              >
                <p.icon
                  size={26}
                  strokeWidth={1.75}
                  className="text-brand-primary mb-4"
                />
                <h3 className="font-display font-extrabold text-lg text-brand-ink leading-tight">
                  {p.title}
                </h3>
                <p className="text-sm text-brand-ink-muted mt-2 leading-relaxed">
                  {p.body}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </LightSection>

      {/* Warning signs — the one intentional dark contrast band */}
      <section className="py-16 md:py-20 border-y border-white/10 bg-brand-paper-muted text-white">
        <Container>
          <div className="grid gap-10 md:gap-14 md:grid-cols-12 items-start">
            <div className="md:col-span-5">
              <p className="eyebrow text-brand-signal mb-3">
                Warning signs
              </p>
              <h2 className="text-3xl md:text-4xl tracking-[-0.02em] text-balance">
                When play stops being fun.
              </h2>
              <p className="mt-5 text-base text-white/70 leading-relaxed">
                If any of these patterns sound familiar — for yourself or for
                someone close — please take a step back, take a break, and
                reach out for support.
              </p>
            </div>
            <ul className="md:col-span-7 space-y-3">
              {WARNING_SIGNS.map((sign) => (
                <li
                  key={sign}
                  className="flex items-start gap-3 rounded-xl bg-white/5 border border-white/10 p-4"
                >
                  <Pause
                    size={18}
                    strokeWidth={2}
                    className="text-brand-warning mt-0.5 flex-shrink-0"
                  />
                  <span className="text-sm md:text-base text-white">
                    <span className="sr-only">Warning sign: </span>
                    {sign}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* Support + self-exclusion */}
      <LightSection className="py-16 md:py-20" wave="left">
        <Container>
          <div className="max-w-2xl">
            <p className="eyebrow text-brand-primary mb-3">
              Support resources
            </p>
            <h2 className="text-4xl md:text-5xl tracking-[-0.02em]">
              If you need help.
            </h2>
            <p className="mt-5 text-base text-brand-ink-muted leading-relaxed">
              Ghana-specific helplines and support organisations will be
              listed here before launch. In the meantime, you can reach our
              office directly and we'll point you to the right place.
            </p>
            <div className="mt-8 rounded-2xl border border-brand-border border-l-4 border-l-brand-signal bg-brand-signal-soft/40 p-6">
              <h3 className="font-display font-extrabold text-brand-ink">Self-exclusion</h3>
              <p className="text-sm text-brand-ink-muted mt-2 leading-relaxed">
                If you'd like to be excluded from play, contact the office at{" "}
                <a
                  href="mailto:info@wobedibilotto.com"
                  className="text-brand-primary font-medium hover:underline"
                >
                  info@wobedibilotto.com
                </a>{" "}
                and we'll guide you through the process.
              </p>
            </div>
          </div>
        </Container>
      </LightSection>

      {/* Underage play reporting */}
      <LightSection className="py-16 md:py-20" wave="right">
        <Container>
          <div className="max-w-2xl">
            <p className="eyebrow text-brand-primary mb-3">
              Underage play
            </p>
            <h2 className="text-4xl md:text-5xl tracking-[-0.02em]">
              Report underage play.
            </h2>
            <p className="mt-5 text-base text-brand-ink-muted leading-relaxed">
              If you've seen someone under 18 being sold a ticket, please tell
              us. Reports go directly to our compliance lead and to the NLA
              where appropriate.
            </p>
            <a
              href="mailto:compliance@wobedibilotto.com"
              className="mt-6 inline-flex items-center h-12 px-7 rounded-full bg-brand-primary text-white text-base font-semibold hover:bg-brand-primary-deep transition-all"
            >
              Email compliance
            </a>
          </div>
        </Container>
      </LightSection>

      {/* Prohibited practices */}
      <LightSection className="py-16 md:py-20" wave="left">
        <Container>
          <div className="max-w-3xl">
            <p className="eyebrow text-brand-primary mb-3">
              What we will not do
            </p>
            <h2 className="text-3xl md:text-4xl tracking-[-0.02em] text-balance">
              Prohibited practices.
            </h2>
            <p className="mt-5 text-base text-brand-ink-muted leading-relaxed">
              Wobedi Bi Lotto strictly prohibits the following — at every
              level of our operation, with no exception:
            </p>
            <ul className="mt-6 space-y-3">
              {PROHIBITED.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-base text-brand-ink"
                >
                  <XCircle
                    size={18}
                    strokeWidth={2}
                    className="text-brand-danger mt-1 flex-shrink-0"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </LightSection>

      {/* Commitments + review */}
      <LightSection className="py-16 md:py-20" wave="right">
        <Container>
          <div className="max-w-3xl">
            <p className="eyebrow text-brand-primary mb-3">
              Our commitments
            </p>
            <h2 className="text-3xl md:text-4xl tracking-[-0.02em]">
              How we operate.
            </h2>
            <p className="mt-5 text-base text-brand-ink-muted leading-relaxed">
              Wobedi Bi Lotto operates under the National Lotto Act 2006
              (Act 722). We continuously train staff and agents, run
              awareness campaigns, and publish educational materials so
              responsible play is part of the daily routine — not an
              afterthought. This policy is reviewed periodically to stay
              aligned with regulatory requirements and industry best
              practice.
            </p>
          </div>
        </Container>
      </LightSection>
    </>
  );
}
