/**
 * Global 404. Renders inside the root layout (so Header + Footer come along)
 * because Next.js places not-found.tsx inside the layout tree by default.
 *
 * Centred composition with a giant ghost "404" watermark behind the message,
 * matching the marketing pages' aesthetic (mesh gradient + dot grid). Two
 * CTAs — Home and Latest results — covering the most likely intent of
 * someone landing on a broken link.
 */
import Link from "next/link";
import { ArrowRight, Home, Trophy } from "lucide-react";
import { Container } from "@/components/layout/Container";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden -mt-28 md:-mt-32 pt-28 md:pt-32 pb-24 md:pb-32 min-h-[80vh] flex items-center">
      {/* Mesh background — Midnight Draw: a rationed gold pool + navy depth. */}
      <div
        aria-hidden
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 88% -5%, rgba(10,110,211,0.22), transparent 60%), radial-gradient(ellipse 55% 65% at 12% 105%, rgba(5,78,152,0.30), transparent 55%)",
        }}
      />
      {/* Dot grid */}
      <div
        aria-hidden
        className="absolute inset-0 z-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(96,150,220,0.16) 1.2px, transparent 1.2px)",
          backgroundSize: "32px 32px",
          maskImage:
            "linear-gradient(to bottom, black 0%, black 65%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 0%, black 65%, transparent 100%)",
        }}
      />

      <Container>
        <div className="relative z-10 mx-auto max-w-2xl text-center">
          {/* Giant ghost "404" — sits behind, partially clipped at the top */}
          <p
            aria-hidden
            className="font-display font-black text-[12rem] md:text-[16rem] leading-none tnum text-brand-primary/[0.07] select-none pointer-events-none -mb-20 md:-mb-28"
          >
            404
          </p>

          <p className="eyebrow text-brand-primary mb-4">
            Lost ticket
          </p>
          <h1 className="text-5xl md:text-6xl xl:text-7xl text-brand-ink text-balance">
            We couldn't find that page.
          </h1>
          <p className="mt-6 text-base md:text-lg text-brand-ink-muted leading-relaxed text-balance max-w-lg mx-auto">
            It might have moved, or you may have followed an old link. Try the
            homepage, or jump straight to the latest draw results.
          </p>

          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link
              href="/"
              className="group inline-flex items-center gap-2 h-12 px-7 rounded-full bg-brand-primary text-white text-base font-semibold hover:bg-brand-primary-deep transition-all"
            >
              <Home size={18} strokeWidth={2} />
              Go home
              <ArrowRight
                size={18}
                strokeWidth={2}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>
            <Link
              href="/results"
              className="inline-flex items-center gap-2 h-12 px-7 rounded-full border border-brand-primary/40 text-brand-signal text-base font-semibold hover:bg-brand-paper-muted hover:border-brand-primary transition-all"
            >
              <Trophy size={18} strokeWidth={2} />
              Latest results
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
