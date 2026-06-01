/**
 * GamesShowcase — section 04 on the homepage.
 *
 * Surfaces the three FEATURED draws from the live catalogue (lib/games.ts:
 * National Week Lotto, Mid Week, Sunday Aseda) as the flagship preview, then
 * points to /games for the rest. No invented totals or product-line groupings —
 * every card is a real game that exists on /games, framed in the brand-blue
 * family (each game's own blue ballColor) so the trio stays on-brand.
 */
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { AuroraBackdrop } from "@/components/layout/AuroraBackdrop";
import { GameLogo } from "@/components/games/GameLogo";
import { getFeaturedGames } from "@/lib/games";

export function GamesShowcase() {
  const featured = getFeaturedGames();

  return (
    <section className="relative bg-brand-paper-muted text-brand-ink overflow-hidden border-y border-brand-border">
      {/* Diagonal hairlines + a single electric pool top-right */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, rgba(96,150,220,0.7) 0, rgba(96,150,220,0.7) 1px, transparent 1px, transparent 28px)",
          maskImage:
            "radial-gradient(ellipse 80% 70% at 50% 50%, black, transparent 90%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 70% at 50% 50%, black, transparent 90%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 60% at 88% 0%, rgba(10,110,211,0.18), transparent 60%)",
        }}
      />

      {/* Abstract aurora — brand blue, no off-brand hues */}
      <AuroraBackdrop tone="blue" />

      <Container>
        <div className="relative z-10 py-20 md:py-28">
          <div className="flex items-center gap-3 md:gap-4 mb-10 md:mb-14">
            <span className="font-mono font-bold text-brand-signal tnum text-base md:text-lg">04</span>
            <span className="h-px w-12 md:w-20 bg-brand-border-strong" />
            <span className="eyebrow text-brand-ink-muted">Our games, NLA 5/90</span>
          </div>

          <div className="grid gap-6 md:gap-8 md:grid-cols-12 items-end mb-12 md:mb-16">
            <h2 className="md:col-span-7 font-display font-extrabold text-3xl md:text-4xl xl:text-5xl leading-[1.08] tracking-[-0.02em] text-brand-ink text-balance">
              Draws for every day of the week.
            </h2>
            <p className="md:col-span-5 text-sm md:text-base text-brand-ink-muted leading-relaxed">
              Our flagship NLA 5/90 draws, all played at licensed POS terminals
              through our network of agents and writers.
            </p>
          </div>

          {/* Three featured game panels */}
          <div className="grid gap-px bg-brand-border lg:grid-cols-3">
            {featured.map((game) => {
              const accent = game.ballColor ?? "var(--color-brand-primary)";
              return (
                <Link
                  key={game.slug}
                  href={`/games/${game.slug}`}
                  style={{ ["--accent" as string]: accent }}
                  className="group relative flex flex-col bg-brand-paper p-7 md:p-10 transition-colors duration-300 hover:bg-brand-paper-warm"
                >
                  <div
                    className="absolute top-0 left-0 right-0 h-1.5"
                    style={{ background: accent }}
                    aria-hidden
                  />
                  <div
                    className="absolute top-0 right-0 w-0.5 h-0 transition-all duration-300 group-hover:h-full"
                    style={{ background: accent }}
                    aria-hidden
                  />

                  <div className="flex items-start justify-between gap-4">
                    <div className="w-16 md:w-20 shrink-0 transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-6">
                      <GameLogo game={game} size={96} bare />
                    </div>
                    {game.introducedYear && (
                      <span className="rounded-full border border-brand-border bg-brand-paper-muted px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-brand-ink-muted tnum">
                        Since {game.introducedYear}
                      </span>
                    )}
                  </div>

                  <h3 className="mt-6 font-display font-extrabold text-3xl md:text-4xl text-brand-ink leading-[1.05] tracking-tight">
                    {game.name}
                  </h3>
                  <p className="mt-2 text-xs font-bold uppercase tracking-[0.18em]" style={{ color: accent }}>
                    {game.scheduleLabel}
                  </p>
                  <p className="mt-4 text-sm md:text-base text-brand-ink-muted leading-relaxed">
                    {game.hook}
                  </p>

                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-brand-signal transition-all group-hover:gap-2.5">
                    View game
                    <ArrowRight size={16} strokeWidth={2.25} />
                  </span>
                </Link>
              );
            })}
          </div>

          <div className="mt-10 md:mt-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-t border-brand-border pt-6">
            <span className="text-xs md:text-sm text-brand-ink-muted">
              Every game operates under the National Lotto Act 2006 (Act 722).
            </span>
            <Link
              href="/games"
              className="group inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-brand-signal hover:text-white transition-colors"
            >
              Browse every game
              <ArrowRight size={16} strokeWidth={2.25} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
