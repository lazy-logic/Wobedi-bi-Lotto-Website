/**
 * FaqAccordion — accessible, zero-JS FAQ built on native <details>/<summary>.
 * Works without hydration; keyboard + screen-reader friendly out of the box.
 * Gold chevron rotates on open (the rationed accent signalling state change).
 *
 * Shared component — reused on /how-to-play and (later) /contact + /support.
 * Pass an array of { q, a }; `a` may be a string or rich ReactNode.
 */
import { ChevronDown } from "lucide-react";

export type FaqItem = { q: string; a: React.ReactNode };

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  return (
    <div className="divide-y divide-brand-border border-y border-brand-border">
      {items.map((item, i) => (
        <details key={i} className="group">
          <summary className="flex items-center justify-between gap-4 py-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
            <span className="font-display font-bold text-base md:text-lg text-brand-ink leading-snug">
              {item.q}
            </span>
            <span className="flex-shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-full border border-brand-border text-brand-signal-deep transition-transform duration-300 group-open:rotate-180 group-open:border-brand-signal">
              <ChevronDown size={18} strokeWidth={2.25} />
            </span>
          </summary>
          <div className="pb-6 -mt-1 text-sm md:text-base text-brand-ink-muted leading-relaxed max-w-2xl">
            {item.a}
          </div>
        </details>
      ))}
    </div>
  );
}
