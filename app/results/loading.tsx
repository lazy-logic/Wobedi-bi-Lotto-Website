/**
 * /results loading fallback — static navy PageHeader + a hero strip of
 * latest-draw card shells + the archive skeleton, so the signature page
 * never shows blank space on first paint or filter transition.
 */
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import {
  LatestDrawCardSkeleton,
  ResultsArchiveSkeleton,
} from "@/components/results/ResultsArchiveSkeleton";

export default function ResultsLoading() {
  return (
    <>
      <PageHeader
        eyebrow="Winning numbers"
        title="The latest draws, the moment they land."
        subtitle="Loading the latest results…"
      />

      <section className="section-light relative overflow-hidden py-12 md:py-16" aria-busy="true" aria-label="Loading results">
        <Container>
          <div className="grid gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <LatestDrawCardSkeleton key={i} />
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-20">
        <Container>
          <div className="h-10 w-40 rounded bg-brand-paper-muted animate-pulse mb-6" />
          <ResultsArchiveSkeleton />
        </Container>
      </section>
    </>
  );
}
