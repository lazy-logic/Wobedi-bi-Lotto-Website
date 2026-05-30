/**
 * Skeletons for the results page — a hero strip of latest-draw card shells
 * + the archive (table on md+, stacked cards below). Mirrors the real
 * geometry so first paint and filter transitions never flash blank space.
 */

export function LatestDrawCardSkeleton() {
  return (
    <div
      aria-hidden
      className="flex flex-col h-full rounded-2xl border border-brand-border bg-brand-paper overflow-hidden animate-pulse"
    >
      <div className="h-1.5 w-full bg-brand-primary-soft" />
      <div className="flex flex-col flex-1 p-6 md:p-7">
        <div className="h-3 w-24 rounded bg-brand-border" />
        <div className="mt-2 h-6 w-2/3 rounded bg-brand-border" />
        <div className="mt-2 h-3 w-32 rounded bg-brand-border" />
        <div className="flex justify-center gap-2 py-7">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="w-9 h-9 rounded-full bg-brand-border" />
          ))}
        </div>
        <div className="mt-auto pt-4 border-t border-brand-border h-4 w-full rounded bg-brand-border" />
      </div>
    </div>
  );
}

export function ResultsArchiveSkeleton() {
  return (
    <div
      aria-hidden
      className="rounded-lg border border-brand-border bg-brand-paper overflow-hidden animate-pulse"
    >
      {/* Desktop rows */}
      <div className="hidden md:block divide-y divide-brand-border">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex items-center gap-6 px-6 py-4">
            <div className="h-4 w-24 rounded bg-brand-border" />
            <div className="h-4 w-32 rounded bg-brand-border" />
            <div className="flex gap-1.5 ml-auto">
              {Array.from({ length: 5 }).map((_, j) => (
                <div key={j} className="w-6 h-6 rounded-full bg-brand-border" />
              ))}
            </div>
          </div>
        ))}
      </div>
      {/* Mobile cards */}
      <div className="md:hidden divide-y divide-brand-border">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="border-l-4 border-brand-primary px-4 py-4">
            <div className="flex justify-between gap-3 mb-3">
              <div className="h-4 w-28 rounded bg-brand-border" />
              <div className="h-3 w-16 rounded bg-brand-border" />
            </div>
            <div className="flex gap-1.5">
              {Array.from({ length: 5 }).map((_, j) => (
                <div key={j} className="w-6 h-6 rounded-full bg-brand-border" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
