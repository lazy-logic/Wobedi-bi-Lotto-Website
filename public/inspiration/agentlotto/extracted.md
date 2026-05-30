# agentlotto.com — extracted reference

**Captured:** 2026-04-29 via WebFetch (text only).

**Role in our project:** UI/UX patterns only — catalogue layout and results display. Their commercial multi-region model does NOT apply.

---

## Game tile pattern (worth borrowing)

A tile contains:

- Game logo
- Current jackpot amount (large)
- Time-to-next-draw counter (e.g. "18 hours")
- Pricing tiers / quick-pick options
- Action buttons: Play · Pick numbers · Latest results

Sort tabs above the grid: **Jackpot · Date · Popularity**.

> For our site we drop "Play / Pick numbers" (no online ticketing) and keep "Latest results", "Game details", and "Find an agent".

## Results display pattern

- Lottery name + draw date in a strip
- Winning numbers shown inline as discrete number elements
- Bonus / supplementary balls visually distinguished
- Carousel rotates several recent draws
- Quick link to full results

## Filtering on results

- Date range
- Game / region filter
- Sort: by date, by jackpot

## Navigation pattern

- Top-level: product categories, Promotions, Results, Support
- Footer: Quick links · Legal · Language selector

---

## What to KEEP

- The tile composition (logo, schedule, last result, "view details").
- Inline number-chip presentation for winning numbers (we'll modernise the visual treatment).
- Filter-tab sorting on the results page.
- Distinguished treatment for bonus / supplementary balls.

## What to DISCARD

- Multi-region game grouping — irrelevant; we have one operator.
- Syndicate / system / live-casino sections — not in scope.
- Currency selectors — single-currency (GHS).
- "Buy" CTAs — not transactional.
