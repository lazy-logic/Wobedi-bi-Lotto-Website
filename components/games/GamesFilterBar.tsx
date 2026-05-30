/**
 * Filter chips above the games catalogue.
 *
 * State lives in the URL — that means filters are deep-linkable, share-able,
 * and survive page refresh. Toggling a chip re-pushes the URL via router.replace
 * (not push) so the back button doesn't fill up with filter intermediates.
 *
 * Uses `useSearchParams` (client) to read current state, then `router.replace`
 * to write. The page re-renders server-side and re-runs filterGames().
 */
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { X } from "lucide-react";
import { CHANNEL_OPTIONS, DAY_OPTIONS } from "@/lib/filterGames";
import { cn } from "@/lib/utils";

export function GamesFilterBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const currentDay = searchParams.get("day");
  const currentChannel = searchParams.get("channel") ?? "all";
  const hasActive = currentDay !== null || currentChannel !== "all";

  function setParam(key: string, value: string | null) {
    const params = new URLSearchParams(searchParams.toString());
    if (value === null || value === "" || value === "all") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    const qs = params.toString();
    startTransition(() => {
      router.replace(qs ? `?${qs}` : "?", { scroll: false });
    });
  }

  return (
    <div
      className={cn(
        "sticky top-16 md:top-20 z-30 -mx-4 md:-mx-6 lg:-mx-8 px-4 md:px-6 lg:px-8 py-4 bg-white/85 backdrop-blur border-y border-brand-border-strong transition-opacity",
        isPending && "opacity-70",
      )}
    >
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs uppercase tracking-wider text-brand-ink-muted mr-2">
            Day
          </span>
          {DAY_OPTIONS.map((opt) => {
            const active = currentDay === opt.code;
            return (
              <button
                key={opt.code}
                type="button"
                onClick={() => setParam("day", active ? null : opt.code)}
                aria-pressed={active}
                className={cn(
                  "h-10 md:h-8 px-3 rounded-md text-xs font-medium border transition-colors focus-visible:outline-none focus-visible:border-brand-signal focus-visible:shadow-[0_0_0_3px_rgba(10,110,211,0.25)]",
                  active
                    ? "bg-brand-primary text-white border-brand-primary"
                    : "bg-brand-paper text-brand-ink border-brand-border hover:border-brand-border-strong",
                )}
              >
                {opt.short}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-xs">
            <span className="uppercase tracking-wider text-brand-ink-muted">Channel</span>
            <select
              value={currentChannel}
              onChange={(e) => setParam("channel", e.target.value)}
              className="h-10 md:h-8 px-2 rounded-md border border-brand-border bg-brand-paper text-xs font-medium text-brand-ink transition-all duration-150 focus:outline-none focus:border-brand-signal focus:shadow-[0_0_0_3px_rgba(10,110,211,0.25)]"
            >
              {CHANNEL_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </label>
          {hasActive && (
            <button
              type="button"
              onClick={() => router.replace("?", { scroll: false })}
              className="inline-flex items-center gap-1 h-8 px-2 text-xs font-medium text-brand-ink-muted hover:text-brand-primary"
            >
              <X size={12} strokeWidth={2} />
              Clear
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
