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
    <section className="relative overflow-hidden bg-brand-paper-sunken text-brand-ink -mt-16 md:-mt-20 pt-16 md:pt-20">
      {/* Layer 1 — electric radial glow over rich black */}
      <div
        aria-hidden
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 72% 30%, rgba(10,110,211,0.28) 0%, rgba(5,78,152,0.10) 38%, transparent 70%)",
        }}
      />
      {/* Layer 2 — slow electric conic sweep */}
      <div
        aria-hidden
        className="absolute inset-0 z-0 pointer-events-none opacity-60"
        style={{
          maskImage:
            "radial-gradient(ellipse 80% 70% at 72% 36%, black, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 70% at 72% 36%, black, transparent 80%)",
        }}
      >
        <div
          className="hero-sweep absolute -inset-[25%]"
          style={{
            background:
              "conic-gradient(from 0deg at 50% 50%, transparent, rgba(10,110,211,0.22), transparent, rgba(59,155,255,0.14), transparent, rgba(5,78,152,0.20), transparent)",
          }}
        />
      </div>
      {/* Layer 3 — faint blue dot grid */}
      <div
        aria-hidden
        className="absolute inset-0 z-0 pointer-events-none opacity-50"
        style={{
          backgroundImage:
            "radial-gradient(rgba(96,150,220,0.14) 1.1px, transparent 1.1px)",
          backgroundSize: "30px 30px",
          maskImage:
            "linear-gradient(to bottom, black 0%, black 60%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 0%, black 60%, transparent 100%)",
        }}
      />
      {/* Layer 4 — warm gold + violet accent pools. The one place we let
          non-blue light into the hero so the field stops reading as pure
          electric blue; kept low and blurred so blue still leads. */}
      <div aria-hidden className="absolute inset-0 z-0 pointer-events-none">
        <span
          className="blob-drift-slow absolute bottom-[-12%] left-[-8%] w-[34rem] h-[34rem] rounded-full"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(246,183,60,0.12), transparent 68%)",
            filter: "blur(120px)",
          }}
        />
        <span
          className="blob-drift absolute top-[8%] left-[-6%] w-[26rem] h-[26rem] rounded-full"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(139,109,255,0.14), transparent 70%)",
            filter: "blur(110px)",
          }}
        />
      </div>

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
            <ShieldCheck size={13} strokeWidth={2.25} className="text-brand-primary" />
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
              — Ghana&rsquo;s daily NLA&nbsp;5/90 draw. Pick five numbers,
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
                className="inline-flex items-center gap-2 h-13 px-8 rounded-full border border-white/15 bg-white/5 backdrop-blur-sm text-brand-ink text-sm md:text-base font-bold uppercase tracking-wider hover:border-white/35 hover:-translate-y-0.5 transition-all"
              >
                Our games
              </Link>
            </div>

            {/* Trust row — mono, electric live dot */}
            <div
              className="fade-rise mt-8 md:mt-10 flex flex-wrap items-center gap-x-4 gap-y-2 eyebrow text-brand-ink-muted"
              style={{ animationDelay: "0.7s" }}
            >
              <span className="inline-flex items-center gap-2">
                <span className="relative flex w-2 h-2">
                  <span className="absolute inline-flex w-full h-full rounded-full bg-brand-primary opacity-80 animate-ping" />
                  <span className="relative inline-flex w-2 h-2 rounded-full bg-brand-primary" />
                </span>
                Live draws
              </span>
              <span className="text-brand-border-strong">/</span>
              <span>NLA-licensed</span>
              <span className="text-brand-border-strong">/</span>
              <span className="inline-flex items-center gap-1.5">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-brand-primary text-white text-[10px] font-extrabold">
                  18+
                </span>
                <span>Strictly 18 and over</span>
              </span>
            </div>
          </div>

          {/* Cluster column — bigger, vivid, individually-animated balls on
              a multi-hue aura (celtic · violet · gold · teal) */}
          <div className="lg:col-span-6 lg:order-2 order-1 flex justify-center">
            <div
              className="fade-rise relative w-full max-w-[min(94vw,660px)] md:max-w-[820px] lg:w-[112%] lg:max-w-none xl:w-[122%] lg:-mt-10 xl:-mt-14"
              style={{ animationDelay: "0.25s" }}
            >
              {/* Bright core — makes the glass balls pop off the dark field */}
              <div
                aria-hidden
                className="absolute inset-[16%] z-0 rounded-full pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle, rgba(255,255,255,0.18), rgba(255,255,255,0) 60%)",
                  filter: "blur(46px)",
                }}
              />
              {/* Celtic halo — top */}
              <div
                aria-hidden
                className="absolute inset-[-12%] z-0 rounded-full pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle at 50% 24%, rgba(10,110,211,0.48), rgba(10,110,211,0) 60%)",
                  filter: "blur(70px)",
                }}
              />
              {/* Violet pool — bottom-left */}
              <div
                aria-hidden
                className="absolute inset-[-8%] z-0 rounded-full pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle at 20% 82%, rgba(139,109,255,0.38), rgba(139,109,255,0) 55%)",
                  filter: "blur(62px)",
                }}
              />
              {/* Gold pool — bottom-right */}
              <div
                aria-hidden
                className="absolute inset-[-8%] z-0 rounded-full pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle at 80% 82%, rgba(246,183,60,0.34), rgba(246,183,60,0) 55%)",
                  filter: "blur(60px)",
                }}
              />
              {/* Teal glint — top-right */}
              <div
                aria-hidden
                className="absolute inset-[-6%] z-0 rounded-full pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle at 82% 22%, rgba(31,201,168,0.26), rgba(31,201,168,0) 50%)",
                  filter: "blur(56px)",
                }}
              />

              <LottoCluster
                className="cluster-float relative z-10 w-full h-auto"
                style={{
                  filter:
                    "drop-shadow(0 36px 70px rgba(0,6,15,0.72)) drop-shadow(0 0 48px rgba(10,110,211,0.34))",
                }}
              />
            </div>
          </div>
        </div>
      </Container>

      {/* Wire ticker — mono, electric markers on deepest dark */}
      <div className="relative z-10 overflow-hidden border-t border-brand-border bg-brand-paper-sunken text-brand-ink">
        <div className="flex items-center gap-3 py-4">
          <span className="ml-5 md:ml-8 flex-shrink-0 inline-flex items-center gap-2 eyebrow text-brand-primary">
            <span className="relative flex w-2 h-2">
              <span className="absolute inline-flex w-full h-full rounded-full bg-brand-primary opacity-75 animate-ping" />
              <span className="relative inline-flex w-2 h-2 rounded-full bg-brand-primary" />
            </span>
            Wire
          </span>
          <span className="h-4 w-px bg-brand-border flex-shrink-0" />
          <div className="flex-1 overflow-hidden">
            <div className="marquee flex items-center gap-8 whitespace-nowrap font-mono text-sm">
              {marqueeLoop.length > 0
                ? marqueeLoop.map((item, i) => (
                    <span key={i} className="inline-flex items-center gap-3">
                      <span className="font-bold uppercase tracking-wider text-brand-ink">
                        {item.name}
                      </span>
                      <span className="text-brand-primary">·</span>
                      <span className="tnum tracking-wider text-brand-ink-muted">
                        {item.numbers.join("  ·  ")}
                      </span>
                      <span className="px-4 text-brand-border-strong">———</span>
                    </span>
                  ))
                : (
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
