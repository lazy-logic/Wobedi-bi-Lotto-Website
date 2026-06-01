/**
 * Shared layout for legal pages (terms, privacy). Provides:
 *   - Two-column grid: sticky table-of-contents on the right (desktop),
 *     scrollable body on the left
 *   - Last-updated date metadata
 *
 * Each section in `sections` becomes both a TOC entry and a `<section>`
 * with the matching id, so anchor links work via the URL hash.
 */
import Link from "next/link";
import { ScrollText } from "lucide-react";
import { Container } from "./Container";
import { LightSection } from "./LightSection";

export type LegalSection = {
  id: string;
  title: string;
  /** Body content. Plain string is rendered as paragraph(s); ReactNode passes through. */
  body: React.ReactNode;
};

type LegalLayoutProps = {
  lastUpdated: string;
  sections: LegalSection[];
};

export function LegalLayout({ lastUpdated, sections }: LegalLayoutProps) {
  return (
    <LightSection className="py-16 md:py-20">
      <Container>
        <div className="grid gap-10 lg:gap-14 lg:grid-cols-12">
          {/* Body */}
          <div className="lg:col-span-8 space-y-12">
            <p className="text-xs font-bold uppercase tracking-wider text-brand-ink-muted">
              Last updated · <span className="tnum">{lastUpdated}</span>
            </p>
            {sections.map((s, i) => (
              <section key={s.id} id={s.id} className="scroll-mt-32">
                <h2 className="font-display font-extrabold text-2xl md:text-3xl text-brand-ink tracking-[-0.015em] mb-4">
                  <span className="text-brand-primary tnum mr-2">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {s.title}
                </h2>
                <div className="prose prose-sm md:prose-base max-w-none text-brand-ink leading-relaxed [&_p]:mb-3 [&_p:last-child]:mb-0 [&_a]:text-brand-primary [&_a]:font-semibold hover:[&_a]:underline [&_ul]:list-disc [&_ul]:ml-5 [&_li]:mb-1 [&_strong]:text-brand-ink">
                  {typeof s.body === "string" ? <p>{s.body}</p> : s.body}
                </div>
              </section>
            ))}
          </div>

          {/* Sticky TOC */}
          <aside className="lg:col-span-4 lg:sticky lg:top-32 lg:self-start">
            <div className="rounded-2xl border border-brand-border bg-brand-paper-muted p-5">
              <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-ink-muted mb-4">
                <ScrollText size={14} strokeWidth={2} />
                On this page
              </p>
              <nav aria-label="Table of contents">
                <ol className="space-y-2 text-sm">
                  {sections.map((s, i) => (
                    <li key={s.id}>
                      <Link
                        href={`#${s.id}`}
                        className="flex items-baseline gap-3 text-brand-ink hover:text-brand-primary transition-colors"
                      >
                        <span className="tnum text-xs text-brand-ink-muted w-5 flex-shrink-0">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span>{s.title}</span>
                      </Link>
                    </li>
                  ))}
                </ol>
              </nav>
            </div>
          </aside>
        </div>
      </Container>
    </LightSection>
  );
}
