/**
 * /games loading fallback. Renders a static navy PageHeader (matching the
 * real page) + a staggered grid of GameTile skeletons so navigation feels
 * instant and the layout never shifts when data resolves.
 */
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { GameTileSkeleton } from "@/components/games/GameTileSkeleton";

export default function GamesLoading() {
  return (
    <>
      <PageHeader
        eyebrow="Our games"
        title="Every NLA-licensed game, in one place."
        subtitle="Loading the catalogue…"
      />
      <section className="section-light relative overflow-hidden py-12 md:py-16" aria-busy="true" aria-label="Loading games">
        <Container>
          <div className="grid gap-5 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} style={{ animationDelay: `${i * 80}ms` }}>
                <GameTileSkeleton />
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
