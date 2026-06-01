/**
 * /games error boundary. Catches a failed catalogue fetch and offers a
 * retry. Mirrors the not-found page's Midnight Draw mesh treatment.
 */
"use client";

import Link from "next/link";
import { RotateCw, Trophy } from "lucide-react";
import { Container } from "@/components/layout/Container";

export default function GamesError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="relative overflow-hidden -mt-28 md:-mt-32 pt-28 md:pt-32 pb-24 md:pb-32 min-h-[70vh] flex items-center">
      <div
        aria-hidden
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 88% -5%, rgba(10,110,211,0.22), transparent 60%), radial-gradient(ellipse 55% 65% at 12% 105%, rgba(5,78,152,0.30), transparent 55%)",
        }}
      />
      <Container>
        <div className="relative z-10 mx-auto max-w-2xl text-center">
          <p className="eyebrow text-brand-signal-deep mb-4">Something went wrong</p>
          <h1 className="text-4xl md:text-5xl xl:text-6xl text-brand-ink text-balance">
            The catalogue is unavailable.
          </h1>
          <p className="mt-6 text-base md:text-lg text-brand-ink-muted leading-relaxed max-w-lg mx-auto">
            We couldn&rsquo;t load the games right now. Try again, or jump
            straight to the latest results.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={reset}
              className="group inline-flex items-center gap-2 h-12 px-7 rounded-full bg-brand-primary text-white text-base font-semibold hover:bg-brand-primary-deep transition-all"
            >
              <RotateCw size={18} strokeWidth={2} className="transition-transform group-hover:rotate-90" />
              Try again
            </button>
            <Link
              href="/results"
              className="inline-flex items-center gap-2 h-12 px-7 rounded-full border border-brand-primary/40 text-brand-signal text-base font-semibold hover:bg-brand-paper-muted hover:border-brand-primary transition-all"
            >
              <Trophy size={18} strokeWidth={2} />
              View results
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
