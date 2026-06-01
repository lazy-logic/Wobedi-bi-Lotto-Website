/**
 * Hero — Wobedi Bi Lotto, "Blue Hour".
 *
 * Rich-black field lit by electric Celtic-blue. White Outfit headline, a
 * mono-style eyebrow/ticker (Montserrat), and the lotto-ball cluster glowing
 * in the blue spectrum. The deliberate inverse of a light corporate-navy
 * site — zero Accurate Giant resemblance.
 *
 * Layers (back → front):
 *   1. Rich-black base + electric radial glow
 *   2. Slow conic sweep in electric tints
 *   3. Faint blue dot grid
 *   4. Cluster (gentle float) lit by an electric halo
 *   5. White editorial text block
 *   6. Mono wire-ticker
 *
 * Async server component — pulls latest draws for the ticker.
 */
import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { LottoCluster } from "@/components/marketing/LottoCluster";
import { fetchAllDrawsSorted, fetchGames } from "@/lib/data";

export async function Hero() {
  const [games, recentDraws] = await Promise.all([
    fetchGames(),
    fetchAllDrawsSorted(6),
  ]);

  const marqueeItems = recentDraws
    .map((d) => {
      const game = games.find((g) => g.slug === d.gameSlug);
      return game ? { name: game.name, numbers: d.numbers.slice(0, 5) } : null;
    })
    .filter((x): x is { name: string; numbers: number[] } => x !== null);
  const marqueeLoop = [...marqueeItems, ...marqueeItems];

  return (
    <section className="section-light relative overflow-hidden -mt-16 md:-mt-20 pt-16 md:pt-20">
      {/* Soft brand-blue corner glow — a light "mesh" touch on white. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 55% at 88% 8%, rgba(10,110,211,0.10), transparent 60%), radial-gradient(ellipse 50% 50% at 4% 96%, rgba(59,155,255,0.08), transparent 60%)",
        }}
      />
      {/* Faint dot grid, masked to fade. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-70"
        style={{
          backgroundImage:
            "radial-gradient(rgba(13,51,125,0.08) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
          maskImage:
            "radial-gradient(120% 90% at 30% 30%, black, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(120% 90% at 30% 30%, black, transparent 75%)",
        }}
      />

      <Container>
        {/* Eyebrow row — mono, electric marker */}
        <div
          className="relative z-10 pt-8 md:pt-10 flex items-center justify-between gap-4 fade-rise"
          style={{ animationDelay: "0.05s" }}
        >
          <div className="flex items-center gap-3 md:gap-4">
            <span className="font-mono font-bold tnum text-base md:text-lg text-brand-primary">
              01
            </span>
            <span className="h-px w-12 md:w-20 bg-brand-border-strong" />
            <span className="eyebrow text-brand-ink-muted">Trusted NLA 5/90 lotto</span>
          </div>
          <span className="hidden md:inline-flex items-center gap-2 eyebrow text-brand-ink-muted">
            <ShieldCheck size={13} strokeWidth={2.25} className="text-brand-signal" />
            Act 722
          </span>
        </div>

        {/* Two-column: text left, cluster right (cluster-first on mobile) */}
        <div className="relative z-10 mt-10 md:mt-14 lg:mt-16 grid gap-10 md:gap-14 lg:gap-16 lg:grid-cols-12 items-center pb-16 md:pb-24">
          {/* Text column */}
          <div className="lg:col-span-6 lg:order-1 order-2">
            <h1
              className="fade-rise leading-[0.92] tracking-[-0.04em] text-balance"
              style={{ animationDelay: "0.15s" }}
            >
              <span className="block text-brand-ink" style={{ fontSize: "clamp(2.2rem, 5vw, 4.4rem)", fontWeight: 700 }}>
                Your numbers,
              </span>
              <span
                className="block mt-1.5 md:mt-2"
                style={{ fontSize: "clamp(2.8rem, 5.6vw, 5.6rem)", fontWeight: 800, letterSpacing: "-0.03em" }}
              >
                <span className="text-brand-ink">drawn </span>
                <span className="gradient-ink" style={{ paddingBottom: "0.06em" }}>live.</span>
              </span>
            </h1>

            <p
              className="fade-rise mt-6 md:mt-8 text-base md:text-xl leading-relaxed max-w-xl text-balance text-brand-ink-muted"
              style={{ animationDelay: "0.4s", fontWeight: 500 }}
            >
              <span className="font-semibold text-brand-ink">Wobedi&nbsp;Bi&nbsp;Lotto</span>{" "}
, Ghana&rsquo;s daily NLA&nbsp;5/90 draw. Pick five numbers,
              drawn live under the National Lottery Authority, every single day.
            </p>

            {/* CTAs — gradient primary pill + glass secondary pill */}
            <div
              className="fade-rise mt-8 md:mt-10 flex flex-wrap items-center gap-3"
              style={{ animationDelay: "0.55s" }}
            >
              <Link
                href="/results"
                className="group inline-flex items-center gap-2 h-13 px-8 rounded-full text-white text-sm md:text-base font-bold uppercase tracking-wider hover:-translate-y-0.5 transition-all"
                style={{ background: "linear-gradient(120deg, #0a6ed3, #3b9bff)" }}
              >
                Draw results
                <ArrowRight size={18} strokeWidth={2.25} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/games"
                className="inline-flex items-center gap-2 h-13 px-8 rounded-full border border-brand-border-strong bg-white text-brand-ink text-sm md:text-base font-bold uppercase tracking-wider hover:border-brand-primary hover:text-brand-primary hover:-translate-y-0.5 transition-all"
              >
                Our games
              </Link>
            </div>

            {/* Trust row — small mono markers, electric live dot */}
            <div
              className="fade-rise mt-8 md:mt-10 flex flex-wrap items-center gap-x-3 gap-y-2 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.16em] text-brand-ink-muted"
              style={{ animationDelay: "0.7s" }}
            >
              <span className="inline-flex items-center gap-1.5">
                <span className="relative flex w-1.5 h-1.5">
                  <span className="absolute inline-flex w-full h-full rounded-full bg-brand-primary opacity-80 animate-ping" />
                  <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-brand-primary" />
                </span>
                Live draws
              </span>
              <span className="text-brand-border-strong">/</span>
              <span>NLA-licensed</span>
              <span className="text-brand-border-strong">/</span>
              <span className="inline-flex items-center gap-1.5">
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-brand-danger text-white text-[9px] font-extrabold">
                  18+
                </span>
                <span>Strictly 18 and over</span>
              </span>
            </div>
          </div>

          {/* Cluster column — standalone balls on the white hero (no panel).
              Soft tinted auras only, so the colourful balls read cleanly on
              white without a dark backing. */}
          <div className="lg:col-span-6 lg:order-2 order-1 flex justify-center">
            <div
              className="fade-rise relative w-full max-w-[min(78vw,500px)] md:max-w-[600px] lg:w-[92%] lg:max-w-none xl:w-[96%] lg:-mt-8 xl:-mt-10"
              style={{ animationDelay: "0.25s" }}
            >
              {/* Soft brand-blue aura behind the balls — light, for depth on
                  white (no hard glow). */}
              <div
                aria-hidden
                className="absolute inset-[-4%] z-0 rounded-full pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle at 50% 45%, rgba(10,110,211,0.12), rgba(10,110,211,0) 60%)",
                  filter: "blur(70px)",
                }}
              />

              <LottoCluster
                className="cluster-float relative z-10 w-full h-auto"
                style={{
                  // Soft grounding shadow only — no dark-field glow.
                  filter: "drop-shadow(0 18px 36px rgba(13,51,125,0.22))",
                }}
              />
            </div>
          </div>
        </div>
      </Container>

      {/* Live results ticker — a clean dark strip with a LIVE pill, an
          edge-faded marquee of the latest winning numbers. */}
      <div className="relative z-10 border-y border-white/10 bg-[#06122b] text-brand-ink">
        <div className="flex items-stretch">
          {/* LIVE pill — fixed on the left, the marquee scrolls past it */}
          <span className="z-10 flex flex-shrink-0 items-center gap-2 bg-brand-primary px-4 md:px-5 text-[11px] font-bold uppercase tracking-[0.2em] text-white">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-white opacity-70 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
            </span>
            Live
          </span>

          {/* Marquee, faded at both edges */}
          <div
            className="relative flex-1 overflow-hidden py-3.5"
            style={{
              maskImage:
                "linear-gradient(90deg, transparent, #000 4%, #000 96%, transparent)",
              WebkitMaskImage:
                "linear-gradient(90deg, transparent, #000 4%, #000 96%, transparent)",
            }}
          >
            <div className="marquee flex items-center gap-10 whitespace-nowrap pl-6 text-sm">
              {marqueeLoop.length > 0 ? (
                marqueeLoop.map((item, i) => (
                  <span key={i} className="inline-flex items-center gap-3">
                    <span className="font-display font-bold uppercase tracking-wide text-white">
                      {item.name}
                    </span>
                    <span className="inline-flex items-center gap-1.5 font-mono tnum text-brand-signal">
                      {item.numbers.map((n, j) => (
                        <span
                          key={j}
                          className="inline-flex h-6 min-w-6 items-center justify-center rounded bg-white/10 px-1.5 text-xs font-bold text-white"
                        >
                          {n}
                        </span>
                      ))}
                    </span>
                  </span>
                ))
              ) : (
                <span className="text-sm text-brand-ink-muted">
                  Latest winning numbers publish here the moment each draw lands.
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
