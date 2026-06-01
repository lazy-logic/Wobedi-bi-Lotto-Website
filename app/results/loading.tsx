/**
 * /results loading fallback — static brand PageHeader + a grid of latest-draw
 * card shells, mirroring the minimal results layout so the page never shows
 * blank space on first paint.
 */
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { LatestDrawCardSkeleton } from "@/components/results/ResultsArchiveSkeleton";

export default function ResultsLoading() {
  return (
    <>
      <PageHeader
        eyebrow="Results"
        title="The latest winning numbers."
        subtitle="Loading the latest draws…"
      />

      <section
        className="section-light relative overflow-hidden py-12 md:py-16"
        aria-busy="true"
        aria-label="Loading results"
      >
        <Container>
          <div className="grid gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <LatestDrawCardSkeleton key={i} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
