/**
 * /legal/cookies — Cookie Policy.
 *
 * Lists each cookie / local-storage entry we set, its purpose, and category.
 * Pairs with the consent banner (to be wired up) — non-essential cookies
 * blocked until consent.
 *
 * Categories follow the standard Strictly Necessary / Functional / Analytics
 * / Marketing split. Only the first three are in use today; Marketing is
 * listed as "none" so the policy is honest about what we DON'T do.
 */
import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { LegalLayout, type LegalSection } from "@/components/layout/LegalLayout";

export const metadata: Metadata = {
  title: "Cookie policy",
  description:
    "What cookies and local-storage entries we use on the Wobedi Bi Lotto website, what they do, and how to manage them.",
};

const SECTIONS: LegalSection[] = [
  {
    id: "what",
    title: "What are cookies",
    body: "Cookies are small files placed on your device by the websites you visit. We also use related browser-storage technologies (local storage) for similar purposes. This policy uses the word \"cookies\" to cover all of them.",
  },
  {
    id: "categories",
    title: "Categories we use",
    body: (
      <>
        <p>We group the cookies we set into three categories:</p>
        <ul>
          <li>
            <strong>Strictly necessary:</strong> required for the site to
            work. You cannot opt out of these without breaking the site.
          </li>
          <li>
            <strong>Functional:</strong> remember your preferences (e.g.
            consent choice, filter selections).
          </li>
          <li>
            <strong>Analytics:</strong> help us understand how the site is
            used so we can improve it. Off by default — only set if you
            consent.
          </li>
        </ul>
        <p>
          We do <strong>not</strong> set marketing or advertising cookies.
        </p>
      </>
    ),
  },
  {
    id: "list",
    title: "The cookies we set",
    body: (
      <>
        <p>
          The table below lists the actual entries placed by this site.
          Third-party cookies set by services we embed (e.g. Mapbox tiles)
          are noted in the next section.
        </p>
        <div className="not-prose overflow-x-auto rounded-lg border border-brand-border my-4">
          <table className="w-full text-left text-sm">
            <thead className="bg-brand-paper-muted text-xs uppercase tracking-wider text-brand-ink-muted">
              <tr>
                <th className="px-4 py-3 font-bold">Name</th>
                <th className="px-4 py-3 font-bold">Category</th>
                <th className="px-4 py-3 font-bold">Purpose</th>
                <th className="px-4 py-3 font-bold">Lifetime</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border">
              <tr>
                <td className="px-4 py-3 code text-xs">sb-*-auth-token</td>
                <td className="px-4 py-3">Strictly necessary</td>
                <td className="px-4 py-3">Supabase admin session (set only when you sign in to /admin).</td>
                <td className="px-4 py-3">Session</td>
              </tr>
              <tr>
                <td className="px-4 py-3 code text-xs">wb_consent</td>
                <td className="px-4 py-3">Functional</td>
                <td className="px-4 py-3">Stores your cookie-consent choice so we don't ask again.</td>
                <td className="px-4 py-3">12 months</td>
              </tr>
              <tr>
                <td className="px-4 py-3 code text-xs">wb_analytics_id</td>
                <td className="px-4 py-3">Analytics</td>
                <td className="px-4 py-3">Anonymous identifier for aggregated traffic stats.</td>
                <td className="px-4 py-3">12 months</td>
              </tr>
            </tbody>
          </table>
        </div>
      </>
    ),
  },
  {
    id: "third-party",
    title: "Third-party services",
    body: (
      <>
        <p>
          Some pages embed third-party services that may set their own
          cookies under their own privacy policies:
        </p>
        <ul>
          <li>
            <strong>Mapbox</strong> on the agents map — sets functional
            cookies for tile delivery.{" "}
            <a
              href="https://www.mapbox.com/legal/privacy"
              target="_blank"
              rel="noopener noreferrer"
            >
              Mapbox Privacy Policy
            </a>
            .
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "manage",
    title: "Managing your preferences",
    body: (
      <>
        <p>
          When you first visit the site you'll see a consent banner with
          three choices: Accept all, Reject non-essential, or Manage
          preferences. You can revisit this any time via the "Cookie
          preferences" link in the footer.
        </p>
        <p>
          You can also manage cookies in your browser settings. Blocking
          strictly-necessary cookies will break parts of the site (notably
          the admin area).
        </p>
      </>
    ),
  },
  {
    id: "contact",
    title: "Contact",
    body: (
      <>
        <p>
          Questions about cookies can be directed to{" "}
          <a href="mailto:privacy@wobedibilotto.com">privacy@wobedibilotto.com</a>.
        </p>
      </>
    ),
  },
];

export default function CookiesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Cookie policy."
        subtitle="What cookies and browser-storage entries this site uses, why, and how to manage them."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Legal" },
          { label: "Cookies" },
        ]}
      />
      <LegalLayout lastUpdated="2026-04-30" sections={SECTIONS} />
    </>
  );
}
