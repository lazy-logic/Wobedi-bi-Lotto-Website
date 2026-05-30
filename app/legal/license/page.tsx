/**
 * /legal/license — License & Regulation page.
 *
 * Centralised place to display the operator's NLA registration, the
 * regulatory framework (Act 722), responsible-gaming alignment, and the
 * group-structure context. Counsel review required for the formal text.
 *
 * NLA logo placement: ONLY here, AND ONLY ONCE written usage permission is
 * on file (per docs/nla-compliance.md §4). Until then, the page renders
 * the licence details in plain text.
 */
import type { Metadata } from "next";
import { ExternalLink, ShieldCheck } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import {
  NLA_LICENCE_NUMBER,
  NLA_REGISTER_URL,
  NLA_ACT_LABEL,
} from "@/lib/regulatory";

export const metadata: Metadata = {
  title: "License & regulation",
  description:
    "Wobedi Bi Lotto is a registered private lotto operator under the National Lottery Authority of Ghana (Act 722). Verify our registration on the public NLA register.",
};

export default function LicensePage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="License &amp; regulation."
        subtitle="We operate under the National Lotto Act 2006 (Act 722) as a registered private lotto operator. Our entry on the NLA's public register is verifiable below."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Legal" },
          { label: "License" },
        ]}
      />

      <section className="py-16 md:py-20">
        <Container>
          <div className="grid gap-10 lg:gap-14 lg:grid-cols-12">
            <div className="lg:col-span-8 space-y-10">
              {/* Public register confirmation */}
              <div className="rounded-2xl border border-brand-border bg-brand-paper p-6 md:p-8 shadow-soft">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-brand-primary text-white">
                    <ShieldCheck size={22} strokeWidth={2} />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-brand-ink-muted">
                      Public NLA register
                    </p>
                    <h2 className="font-display font-extrabold text-2xl md:text-3xl text-brand-ink mt-1 leading-tight tracking-[-0.015em]">
                      WOBEDI BI LOTTO
                    </h2>
                    <p className="mt-3 text-base text-brand-ink-muted">
                      Listed by the National Lottery Authority of Ghana as a
                      registered private lotto operator under{" "}
                      {NLA_ACT_LABEL}.
                    </p>
                    <a
                      href={NLA_REGISTER_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-primary hover:underline"
                    >
                      Verify on nla.com.gh
                      <ExternalLink size={14} strokeWidth={2} />
                    </a>
                  </div>
                </div>
              </div>

              {/* Licence details */}
              <div>
                <h3 className="font-display font-extrabold text-xl md:text-2xl text-brand-ink mb-5 tracking-[-0.015em]">
                  <span className="text-brand-primary tnum mr-2">01</span>
                  Licence details
                </h3>
                <dl className="rounded-2xl border border-brand-border bg-brand-paper-muted divide-y divide-brand-border">
                  <div className="grid grid-cols-3 px-5 py-4">
                    <dt className="text-xs font-bold uppercase tracking-wider text-brand-ink-muted col-span-1">
                      Operator
                    </dt>
                    <dd className="col-span-2 text-base text-brand-ink">
                      Wobedi Bi Lotto
                    </dd>
                  </div>
                  <div className="grid grid-cols-3 px-5 py-4">
                    <dt className="text-xs font-bold uppercase tracking-wider text-brand-ink-muted col-span-1">
                      Operating framework
                    </dt>
                    <dd className="col-span-2 text-base text-brand-ink">
                      National Lotto Act 2006 ({NLA_ACT_LABEL})
                    </dd>
                  </div>
                  <div className="grid grid-cols-3 px-5 py-4">
                    <dt className="text-xs font-bold uppercase tracking-wider text-brand-ink-muted col-span-1">
                      Licence number
                    </dt>
                    <dd className="col-span-2 font-display font-extrabold text-xl tnum text-brand-ink">
                      {NLA_LICENCE_NUMBER ? `#${NLA_LICENCE_NUMBER}` : "[OWNER to supply from licence certificate]"}
                    </dd>
                  </div>
                  <div className="grid grid-cols-3 px-5 py-4">
                    <dt className="text-xs font-bold uppercase tracking-wider text-brand-ink-muted col-span-1">
                      Scope
                    </dt>
                    <dd className="col-span-2 text-base text-brand-ink">
                      Private lotto operations in Accra under the NLA framework.
                    </dd>
                  </div>
                </dl>
              </div>

              {/* Responsible gaming */}
              <div>
                <h3 className="font-display font-extrabold text-xl md:text-2xl text-brand-ink mb-3 tracking-[-0.015em]">
                  <span className="text-brand-primary tnum mr-2">02</span>
                  Responsible-gaming alignment
                </h3>
                <p className="text-base text-brand-ink leading-relaxed">
                  We align with the World Lottery Association's Responsible
                  Gaming Principles, including the Level 2 framework held by
                  the National Lottery Authority. Our internal responsible-play
                  guidance is published at{" "}
                  <a href="/responsible-play" className="text-brand-primary font-semibold hover:underline">
                    /responsible-play
                  </a>
                  .
                </p>
              </div>

              {/* Operator info */}
              <div>
                <h3 className="font-display font-extrabold text-xl md:text-2xl text-brand-ink mb-3 tracking-[-0.015em]">
                  <span className="text-brand-primary tnum mr-2">03</span>
                  About the operator
                </h3>
                <p className="text-base text-brand-ink leading-relaxed">
                  Wobedi Bi Lotto is a private lotto operator serving
                  communities across Ghana through a network of approved
                  agents and writers.{" "}
                  <a href="/about" className="text-brand-primary font-semibold hover:underline">
                    Read more on the About page
                  </a>
                  .
                </p>
              </div>
            </div>

            {/* TOC sidebar */}
            <aside className="lg:col-span-4 lg:sticky lg:top-32 lg:self-start">
              <div className="rounded-2xl border border-brand-border bg-brand-paper-muted p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-brand-ink-muted mb-4">
                  Quick links
                </p>
                <ul className="space-y-2.5 text-sm">
                  <li>
                    <a
                      href={NLA_REGISTER_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-brand-ink hover:text-brand-primary"
                    >
                      NLA public register
                      <ExternalLink size={12} strokeWidth={2} />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.nla.com.gh"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-brand-ink hover:text-brand-primary"
                    >
                      National Lottery Authority
                      <ExternalLink size={12} strokeWidth={2} />
                    </a>
                  </li>
                  <li>
                    <a
                      href="/responsible-play"
                      className="text-brand-ink hover:text-brand-primary"
                    >
                      Our responsible-play page
                    </a>
                  </li>
                  <li>
                    <a href="/about" className="text-brand-ink hover:text-brand-primary">
                      About the operator
                    </a>
                  </li>
                </ul>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}
