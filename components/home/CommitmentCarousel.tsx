/**
 * CommitmentCarousel — the mobile/desktop presentation for WhatWeDo's six
 * commitments.
 *
 * Mobile: a horizontal scroll-snap carousel with a peek of the next card and
 * pagination dots that track scroll position (active dot derived from the
 * nearest snap point). No text "swipe" hint — the peek + dots are the
 * affordance. Desktop (md+): a calm 2/3-column grid, no scroll, no dots.
 *
 * Client component (the dots need scroll state); the parent WhatWeDo section
 * stays a server component and just renders this with static data.
 */
"use client";

import { useEffect, useRef, useState } from "react";

export type Commitment = {
  index: string;
  title: string;
  body: string;
  /** Brand-blue-family accent for the top bar + index. */
  accent: string;
};

type Props = { commitments: Commitment[] };

export function CommitmentCarousel({ commitments }: Props) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  // Derive the active card from scroll position (nearest card to the left edge
  // of the scroller). Cheap, rAF-throttled, and only meaningful on mobile where
  // the scroller actually overflows.
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const cards = Array.from(el.children) as HTMLElement[];
        if (cards.length === 0) return;
        const left = el.scrollLeft;
        let nearest = 0;
        let best = Infinity;
        cards.forEach((card, i) => {
          const d = Math.abs(card.offsetLeft - el.offsetLeft - left);
          if (d < best) {
            best = d;
            nearest = i;
          }
        });
        setActive(nearest);
      });
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const goTo = (i: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.children[i] as HTMLElement | undefined;
    if (card) {
      el.scrollTo({ left: card.offsetLeft - el.offsetLeft, behavior: "smooth" });
    }
  };

  return (
    <div className="md:contents">
      {/* Scroller — carousel on mobile, native grid on md+ (display:contents
          would drop the scroll container, so we switch the element's role via
          classes instead and keep a real grid below md via md:grid). */}
      <div
        ref={scrollerRef}
        className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-1 [-webkit-overflow-scrolling:touch] [scroll-padding-left:1.25rem] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:grid md:snap-none md:grid-cols-2 md:gap-5 md:overflow-visible md:px-0 lg:grid-cols-3"
      >
        {commitments.map((c) => (
          <CommitmentCard key={c.index} {...c} />
        ))}
      </div>

      {/* Pagination dots — mobile only. Tappable; reflect scroll position. */}
      <div className="mt-6 flex items-center justify-center gap-2 md:hidden" role="tablist" aria-label="Commitments">
        {commitments.map((c, i) => {
          const isActive = i === active;
          return (
            <button
              key={c.index}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-label={`Go to ${c.title}`}
              onClick={() => goTo(i)}
              className="h-2 rounded-full transition-all duration-300"
              style={{
                width: isActive ? "1.5rem" : "0.5rem",
                backgroundColor: isActive ? "var(--color-brand-primary)" : "var(--color-brand-border-strong)",
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

function CommitmentCard({ index, title, body, accent }: Commitment) {
  return (
    <article
      style={{ ["--accent" as string]: accent }}
      className="group relative flex w-[82%] min-w-[260px] max-w-[340px] shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-brand-border bg-white p-6 transition-all duration-300 active:-translate-y-0.5 active:border-[var(--accent)] sm:w-[58%] md:w-auto md:min-w-0 md:max-w-none md:rounded-none md:p-9 md:hover:-translate-y-1 md:hover:border-[var(--accent)] md:hover:bg-brand-paper-muted"
    >
      {/* Accent top bar — slightly lighter on mobile, fuller on desktop */}
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-1 md:h-1.5"
        style={{ background: accent }}
      />

      {/* Underline that reveals on hover (desktop only) */}
      <span
        aria-hidden
        className="absolute left-9 right-9 bottom-9 hidden h-0.5 scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100 md:block"
        style={{ background: accent }}
      />

      <span className="font-display font-bold tnum text-base md:text-lg md:font-black" style={{ color: accent }}>
        {index}
      </span>
      <h3 className="mt-3 md:mt-4 font-display font-extrabold md:font-black text-xl md:text-2xl text-brand-ink leading-[1.12] tracking-tight">
        {title}
      </h3>
      <p className="mt-2.5 md:mt-3 text-sm md:text-base font-medium text-brand-ink-muted leading-relaxed">
        {body}
      </p>
    </article>
  );
}
