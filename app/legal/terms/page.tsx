/**
 * /legal/terms — Terms of Service.
 *
 * Draft scaffolding. The structure is solid and reflects the typical
 * sections an NLA-licensed lotto operator's Terms cover, but the exact
 * wording must be reviewed by counsel before launch.
 */
import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { LegalLayout, type LegalSection } from "@/components/layout/LegalLayout";

export const metadata: Metadata = {
  title: "Terms of service",
  description:
    "Terms of service for the Wobedi Bi Lotto website and the NLA-licensed games we operate.",
};

const SECTIONS: LegalSection[] = [
  {
    id: "acceptance",
    title: "Acceptance",
    body: "By accessing this website or playing any game operated by Wobedi Bi Lotto (the operator), you agree to these Terms of Service together with our Privacy Policy and any game-specific rules. If you do not accept these terms, please do not use the site or our services.",
  },
  {
    id: "eligibility",
    title: "Eligibility",
    body: (
      <>
        <p>
          You must be <strong>18 years of age or older</strong> to play any
          game operated by Wobedi Bi Lotto. By playing, you confirm that you
          meet the age requirement and that you are playing within Ghana.
        </p>
        <p>
          Employees of the operator, of the National Lottery Authority, and
          their immediate family members are restricted from participation
          per our internal policy.
        </p>
      </>
    ),
  },
  {
    id: "games",
    title: "Game rules &amp; fairness",
    body: (
      <>
        <p>
          All games are operated under the National Lotto Act 2006 (Act 722)
          and the operating framework of the National Lottery Authority of
          Ghana. Each game has its own published rules covering numbers,
          draw schedule, and prize structure. The published rules form part
          of these Terms.
        </p>
        <p>
          Draws are conducted in line with NLA regulations. Results
          published on this site mirror the official NLA record. In any case
          of discrepancy, the official NLA record is authoritative.
        </p>
      </>
    ),
  },
  {
    id: "tickets",
    title: "Tickets, plays &amp; prizes",
    body: (
      <>
        <p>
          Tickets and plays must be purchased through approved channels: an
          NLA-approved agent operating an Wobedi Bi Lotto POS terminal.
          Tickets purchased through unauthorised channels are not recognised.
        </p>
        <p>
          Prize claims must be submitted within the period specified by the
          NLA for each game. Unclaimed prizes after that window are forfeited
          and handled per Act 722.
        </p>
      </>
    ),
  },
  {
    id: "responsibilities",
    title: "Your responsibilities",
    body: (
      <ul>
        <li>Play within your means. Lotto is entertainment, not investment.</li>
        <li>Keep your tickets, receipts, and play credentials safe.</li>
        <li>
          Report suspected underage play or non-compliant agent activity to{" "}
          <a href="mailto:compliance@wobedibilotto.com">compliance@wobedibilotto.com</a>.
        </li>
        <li>Do not attempt to defeat any technical control or verification.</li>
      </ul>
    ),
  },
  {
    id: "ip",
    title: "Intellectual property",
    body: "All site content, design, and the Wobedi Bi Lotto brand belong to the operator or its licensors. NLA-licensed game names and artwork remain the property of the National Lottery Authority and are used under the operating framework of Act 722.",
  },
  {
    id: "liability",
    title: "Limitation of liability",
    body: "To the fullest extent permitted by Ghanaian law, Wobedi Bi Lotto is not liable for any indirect, incidental, or consequential loss arising from the use of this website. Nothing in these Terms limits any liability that cannot lawfully be excluded.",
  },
  {
    id: "termination",
    title: "Suspension &amp; termination",
    body: "We may suspend or terminate access to the site or to specific accounts where there is reasonable belief of underage play, fraud, breach of these Terms, or where required by NLA or law-enforcement authorities.",
  },
  {
    id: "changes",
    title: "Changes to these terms",
    body: "We may update these Terms from time to time. The Last updated date at the top reflects the most recent change. Continued use of the site after a change is effective constitutes acceptance of the revised Terms.",
  },
  {
    id: "law",
    title: "Governing law",
    body: "These Terms are governed by the laws of the Republic of Ghana. Disputes are subject to the exclusive jurisdiction of the courts of Ghana.",
  },
  {
    id: "contact",
    title: "Contact",
    body: (
      <>
        <p>
          Questions about these Terms can be directed to{" "}
          <a href="mailto:legal@wobedibilotto.com">legal@wobedibilotto.com</a>{" "}
          or via our <a href="/contact">contact form</a>.
        </p>
      </>
    ),
  },
];

export default function TermsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Terms of service."
        subtitle="The terms that apply to your use of this website and to gameplay through Wobedi Bi Lotto's NLA-licensed services."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Legal" },
          { label: "Terms" },
        ]}
      />
      <LegalLayout lastUpdated="2026-04-30" sections={SECTIONS} />
    </>
  );
}
