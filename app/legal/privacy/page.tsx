/**
 * /legal/privacy — Privacy Policy.
 *
 * Draft scaffolding aligned to Ghana's Data Protection Act 2012 (Act 843).
 * Counsel review required before launch.
 */
import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { LegalLayout, type LegalSection } from "@/components/layout/LegalLayout";

export const metadata: Metadata = {
  title: "Privacy policy",
  description:
    "How Wobedi Bi Lotto collects, uses, and protects your personal data. Aligned with Ghana's Data Protection Act 2012 (Act 843).",
};

const SECTIONS: LegalSection[] = [
  {
    id: "intro",
    title: "Who we are",
    body: "Wobedi Bi Lotto (the operator) is the Data Controller for personal data collected through this website. We operate under the National Lotto Act 2006 (Act 722) and handle personal data in accordance with Ghana's Data Protection Act 2012 (Act 843).",
  },
  {
    id: "data",
    title: "Personal data we collect",
    body: (
      <>
        <p>We may collect:</p>
        <ul>
          <li>
            <strong>Contact form data:</strong> name, email, subject, and the
            message you send. Used only to respond to your enquiry.
          </li>
          <li>
            <strong>Technical data:</strong> IP address, browser type, device
            characteristics, and pages visited. Collected via standard server
            logs and (where you consent) analytics cookies.
          </li>
          <li>
            <strong>Cookies and local storage:</strong> see our{" "}
            <a href="/legal/cookies">Cookie Policy</a> for the full breakdown.
          </li>
        </ul>
        <p>
          We do not knowingly collect data from anyone under 18. If you
          believe a child has submitted information to us, contact{" "}
          <a href="mailto:compliance@wobedibilotto.com">compliance@wobedibilotto.com</a>{" "}
          and we will delete it promptly.
        </p>
      </>
    ),
  },
  {
    id: "uses",
    title: "How we use your data",
    body: (
      <ul>
        <li>To respond to enquiries you send via the contact form.</li>
        <li>To operate, secure, and improve this website.</li>
        <li>To meet our obligations under Act 722, NLA regulations, and Act 843.</li>
        <li>To investigate and prevent fraud or abuse of our services.</li>
      </ul>
    ),
  },
  {
    id: "lawful-basis",
    title: "Lawful basis",
    body: "We process your data on the basis of (a) your explicit consent (e.g. for analytics cookies), (b) the legitimate interests of operating and securing the site, and (c) compliance with our legal and regulatory obligations.",
  },
  {
    id: "sharing",
    title: "Who we share with",
    body: (
      <>
        <p>We share data only where necessary, with:</p>
        <ul>
          <li>Hosting and infrastructure providers (Vercel, Supabase) acting under contract.</li>
          <li>The National Lottery Authority of Ghana, where required by Act 722 or NLA regulations.</li>
          <li>Law-enforcement authorities, where lawfully compelled.</li>
        </ul>
        <p>
          We do not sell or rent personal data. Vercel and Supabase host
          outside Ghana; data transfers are protected by contractual safeguards
          and the providers' own certifications.
        </p>
      </>
    ),
  },
  {
    id: "retention",
    title: "How long we keep it",
    body: "Contact-form submissions are retained for the period necessary to handle the enquiry and any follow-up, typically up to 24 months. Technical logs are retained for 90 days. Records required under Act 722 or for tax purposes are retained for the statutory period.",
  },
  {
    id: "rights",
    title: "Your rights",
    body: (
      <>
        <p>Under Act 843 you have the right to:</p>
        <ul>
          <li>Access the personal data we hold about you.</li>
          <li>Correct inaccurate data.</li>
          <li>Request deletion of your data, subject to legal-retention exceptions.</li>
          <li>Object to processing in specified circumstances.</li>
          <li>Withdraw consent at any time, where consent was the basis for processing.</li>
        </ul>
        <p>
          Direct requests to{" "}
          <a href="mailto:privacy@wobedibilotto.com">privacy@wobedibilotto.com</a>.
        </p>
      </>
    ),
  },
  {
    id: "security",
    title: "Security",
    body: "We use industry-standard technical and organisational measures to protect personal data, including encryption in transit (HTTPS) and access controls on administrative systems. No system is perfectly secure; if you believe your data has been compromised, contact us immediately.",
  },
  {
    id: "cookies",
    title: "Cookies",
    body: (
      <>
        <p>
          See our <a href="/legal/cookies">Cookie Policy</a> for the full
          list of cookies in use, their purpose, and how to manage your
          preferences.
        </p>
      </>
    ),
  },
  {
    id: "complaints",
    title: "Complaints",
    body: "If you believe we have not handled your data properly you can complain to the Data Protection Commission of Ghana, the regulator established under Act 843. We would prefer to address concerns directly first; please contact us before lodging a complaint.",
  },
  {
    id: "updates",
    title: "Updates",
    body: "We may update this Privacy Policy. Substantive changes will be flagged here and reflected in the Last updated date.",
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Privacy policy."
        subtitle="How we collect, use, and protect your personal data. Aligned with the Ghana Data Protection Act 2012 (Act 843)."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Legal" },
          { label: "Privacy" },
        ]}
      />
      <LegalLayout lastUpdated="2026-04-30" sections={SECTIONS} />
    </>
  );
}
