/**
 * /how-to-play — POS-led mechanics explainer.
 *
 * Sections:
 *   1. Page hero
 *   2. HowItWorks — the three-step pattern
 *   3. FAQ — common questions (the company brief lists FAQ under Support)
 *   4. TrustStrip
 *
 * The FAQ answers are kept deliberately non-specific on regulated details
 * (exact prize-claim windows, helplines) — those are owner/compliance copy.
 */
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { LightSection } from "@/components/layout/LightSection";
import { PageHeader } from "@/components/layout/PageHeader";
import { HowItWorks } from "@/components/marketing/HowItWorks";
import { TrustStrip } from "@/components/layout/TrustStrip";
import { FaqAccordion, type FaqItem } from "@/components/FaqAccordion";
import { jsonLd } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "How to play",
  description:
    "NLA-licensed games at every approved Wobedi Bi Lotto POS terminal. Pick your draw, play at an approved agent, then watch for the result.",
};

const FAQS: FaqItem[] = [
  {
    q: "Where can I play?",
    a: "At any approved Wobedi Bi Lotto agent operating an NLA-licensed POS terminal. The games and odds are identical at every approved agent across Ghana.",
  },
  {
    q: "What is NLA 5/90?",
    a: "Ghana's standard lottery format: five winning numbers are drawn from a pool of ninety (1 to 90). Every Wobedi Bi Lotto game, VAG, Noon Rush, and the Main Games, runs on this format.",
  },
  {
    q: "How do I know an agent is legitimate?",
    a: "Approved agents operate an NLA-licensed POS terminal and can issue a printed ticket. If you're ever unsure, contact us and we'll confirm.",
  },
  {
    q: "Do I have to be a certain age?",
    a: "Yes, play is strictly limited to persons 18 years and over. Agents verify age before selling a ticket. See our responsible-play guidance for more.",
  },
  {
    q: "How do I claim a prize?",
    a: "Prize claims are handled in line with National Lottery Authority rules. Keep your ticket safe and present it at an approved agent, or contact our office and we'll guide you through the process.",
  },
  {
    q: "Where are the results published?",
    a: "On our Results page, updated within minutes of each official NLA draw. In any case of discrepancy, the NLA's record is authoritative.",
  },
];

function faqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: typeof f.a === "string" ? f.a : "" },
    })),
  };
}

export default function HowToPlayPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema()) }}
      />
      <PageHeader
        eyebrow="How to play"
        title="Playing is simple."
        subtitle="Find an approved agent, pick your numbers, and you're in. Same games, same odds, wherever you play."
      />

      <HowItWorks />

      {/* FAQ */}
      <LightSection className="py-16 md:py-24" wave="right">
        <Container>
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10 md:mb-12">
              <p className="eyebrow text-brand-primary mb-3">Common questions</p>
              <h2 className="font-display font-extrabold text-3xl md:text-4xl tracking-[-0.01em] text-brand-ink">
                Everything you need to know.
              </h2>
            </div>

            <FaqAccordion items={FAQS} />

            <div className="mt-10 text-center">
              <p className="text-sm text-brand-ink-muted mb-4">
                Still have a question?
              </p>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 h-12 px-7 rounded-full bg-brand-primary text-white text-sm font-bold uppercase tracking-wider hover:bg-brand-primary-deep transition-all"
              >
                Contact support
                <ArrowRight
                  size={16}
                  strokeWidth={2.25}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </Link>
            </div>
          </div>
        </Container>
      </LightSection>

      <TrustStrip />
    </>
  );
}
