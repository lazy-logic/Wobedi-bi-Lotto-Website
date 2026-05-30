# nla.com.gh — winning numbers + site reference

**Captured:** 2026-04-29 via WebFetch on `/` and `/winning-numbers` (text only).

**Role in our project:** Authoritative source for winning-numbers data structure and freshness expectations. Visual treatment to be modernised, NOT mirrored.

---

## Homepage results module

- Section title: **"Recent Winning Numbers"**
- Table with columns: **Draw Date · Draw Name · Results · Draw Number**
- CTA: "Check if you're a lucky winner" → "VIEW ALL" → `/winning-numbers`

No live countdown or "next draw" display visible at fetch time.

## /winning-numbers page

Filter controls present:

- Draw Name (dropdown, default "All")
- Start Date
- End Date

The results table itself loads asynchronously (the fetcher saw a "Searching…" loading state), so column structure beyond the homepage version is unconfirmed. Manual visit needed to confirm pagination and exact per-row fields.

## Top-level navigation

Home · About Us · Products · Media · Responsible Gaming · Contact Us

## Footer / regulatory presence

- RTI Manual (PDF link)
- ACT 722 (PDF link)
- Social: Facebook, Instagram, Twitter, LinkedIn
- "18+" + "Play responsibly" present site-wide
- "Committed to the World Lottery Association (WLA) Principles on Responsible Gaming"
- WLA Level 2 Responsible Gaming Framework certified (June 2023)
- WLA member since 2006

## Regulatory copy worth quoting

> "The NLA is committed to the World Lottery Association (WLA) Principles on Responsible Gaming."

## Contact

- Phone: +233 266 087 946 / +233 266 087 966
- Email: info@nla.com.gh
- (Physical address not published on the homepage.)

---

## What to KEEP

- The four-column data shape — Draw Date · Draw Name · Numbers · Draw Number — as the underlying schema.
- The three filter controls — draw name + start date + end date.
- Footer placement of "18+" and "Play responsibly".
- The Act 722 / WLA framing as our compliance backbone.

## What to MODERNISE (not mirror)

- The table-only presentation. We layer a card-led "latest draw" hero, with a denser archive table beneath.
- Add a "next draw in HH:MM:SS" countdown per game.
- Animate digit reveal one at a time per the super-prompt motion direction (§3).
- Add per-game permalinks (`/results/<game-slug>`) so a Friday-Bonanza fan can deep-link to *just* that game's draws.

## What to DISCARD

- "Searching…" placeholder UX (we render skeletons, not blank states).
- Generic "View all" CTA copy — replace with a context-aware label per game.
