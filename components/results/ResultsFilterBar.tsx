/**
 * Filter bar for the results archive: game dropdown + date range.
 *
 * URL-driven state, mirroring GamesFilterBar's pattern. Date inputs use the
 * native date picker; values are ISO YYYY-MM-DD strings.
 */
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

type Option = { value: string; label: string };

export function ResultsFilterBar({ gameOptions }: { gameOptions: Option[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const currentGame = searchParams.get("game") ?? "";
  const currentFrom = searchParams.get("from") ?? "";
  const currentTo = searchParams.get("to") ?? "";
  const hasActive = currentGame !== "" || currentFrom !== "" || currentTo !== "";

  function setParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "") params.delete(key);
    else params.set(key, value);
    const qs = params.toString();
    startTransition(() => {
      router.replace(qs ? `?${qs}` : "?", { scroll: false });
    });
  }

  return (
    <div
      className={cn(
        "sticky top-16 md:top-20 z-30 -mx-4 md:-mx-6 lg:-mx-8 px-4 md:px-6 lg:px-8 py-4 bg-brand-paper/85 backdrop-blur border-y border-brand-border transition-opacity",
        isPending && "opacity-70",
      )}
    >
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-4">
        <label className="flex items-center gap-2 text-xs">
          <span className="uppercase tracking-wider text-brand-ink-muted">Game</span>
          <select
            value={currentGame}
            onChange={(e) => setParam("game", e.target.value)}
            className="h-11 md:h-9 px-2 min-w-[160px] rounded-md border border-brand-border bg-brand-paper text-sm font-medium text-brand-ink transition-all duration-150 focus:outline-none focus:border-brand-signal focus:shadow-[0_0_0_3px_rgba(10,110,211,0.25)]"
          >
            <option value="">All games</option>
            {gameOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </label>

        <label className="flex items-center gap-2 text-xs">
          <span className="uppercase tracking-wider text-brand-ink-muted">From</span>
          <input
            type="date"
            value={currentFrom}
            onChange={(e) => setParam("from", e.target.value)}
            className="h-11 md:h-9 px-2 rounded-md border border-brand-border bg-brand-paper text-sm text-brand-ink tnum transition-all duration-150 focus:outline-none focus:border-brand-signal focus:shadow-[0_0_0_3px_rgba(10,110,211,0.25)]"
          />
        </label>

        <label className="flex items-center gap-2 text-xs">
          <span className="uppercase tracking-wider text-brand-ink-muted">To</span>
          <input
            type="date"
            value={currentTo}
            onChange={(e) => setParam("to", e.target.value)}
            className="h-11 md:h-9 px-2 rounded-md border border-brand-border bg-brand-paper text-sm text-brand-ink tnum transition-all duration-150 focus:outline-none focus:border-brand-signal focus:shadow-[0_0_0_3px_rgba(10,110,211,0.25)]"
          />
        </label>

        {hasActive && (
          <button
            type="button"
            onClick={() => router.replace("?", { scroll: false })}
            className="inline-flex items-center gap-1 h-11 md:h-9 px-3 text-xs font-medium text-brand-ink-muted hover:text-brand-signal"
          >
            <X size={12} strokeWidth={2} />
            Clear filters
          </button>
        )}
      </div>
    </div>
  );
}
