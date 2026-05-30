/**
 * Trust strip — section 02 on the homepage.
 *
 * Editorial direction: a numbered section block with four large numeric
 * markers (Act 722 · 18+ · 5/90 · NLA-licensed). Each marker is a
 * standalone visual unit — no shared pill, no soft band. The whole strip
 * sits flat on the paper surface with hairlines top and bottom.
 *
 * Reused on Home, every game-detail page, and the results page.
 * Deliberately NOT shown on /about or /responsible-play.
 */
import Link from "next/link";
import { Container } from "./Container";
import {
  NLA_LICENCE_NUMBER,
  NLA_REGISTER_URL,
  NLA_REGISTERED_LABEL,
} from "@/lib/regulatory";

const MARKERS: { label: string; sub: string }[] = [
  { label: "722", sub: "National Lotto Act 2006" },
  { label: "18+", sub: "Strictly age-verified play" },
  { label: "5/90", sub: "NLA lotto product" },
  { label: "NLA", sub: "Licensed private operator" },
];

export function TrustStrip() {
  return (
    <section className="bg-brand-paper border-y border-brand-border">
      <Container>
        <div className="py-10 md:py-14">
          {/* Eyebrow row */}
          <div className="flex items-center gap-3 md:gap-4 mb-8 md:mb-10">
            <span className="font-display font-extrabold text-brand-primary tnum text-base md:text-lg">
              02
            </span>
            <span className="h-px w-12 md:w-20 bg-brand-border" />
            <span className="eyebrow text-brand-ink-muted">
              Regulated, verifiable
            </span>
          </div>

          {/* Four-up numeric markers */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-brand-border">
            {MARKERS.map((m) => (
              <div
                key={m.label}
                className="bg-brand-paper p-6 md:p-8 flex flex-col"
              >
                <span className="font-display font-black text-4xl md:text-5xl xl:text-6xl text-brand-primary leading-none tnum tracking-tight">
                  {m.label}
                </span>
                <span className="mt-4 text-xs md:text-sm text-brand-ink-muted leading-snug">
                  {m.sub}
                </span>
              </div>
            ))}
          </div>

          {/* Footnote links */}
          <div className="mt-6 md:mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-brand-ink-muted">
            <Link
              href={NLA_REGISTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold uppercase tracking-wider hover:text-brand-primary transition-colors"
            >
              {NLA_LICENCE_NUMBER
                ? `Verify licence #${NLA_LICENCE_NUMBER} →`
                : `${NLA_REGISTERED_LABEL} →`}
            </Link>
            <Link
              href="/responsible-play"
              className="font-bold uppercase tracking-wider hover:text-brand-primary transition-colors"
            >
              Play responsibly →
            </Link>
            <Link
              href="/legal/license"
              className="font-bold uppercase tracking-wider hover:text-brand-primary transition-colors"
            >
              Licence &amp; regulation →
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
