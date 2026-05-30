# 0004 — Featured games selection

**Status:** Accepted (2026-04-29)

## Context

The homepage Featured Games strip surfaces three games per super prompt §4 ("3 highest-volume"). Without owner-supplied volume data at this stage, the choice fell to editorial judgement. Fifteen games are in the catalogue.

## Decision

Feature three games:

1. **National Week Lotto** — flagship since 1962, NLA describes as "most patronised". The defining product.
2. **Mid Week** — NLA's own self-described "second most popular" draw.
3. **Sunday Aseda** — local-language *thanksgiving* meaning, charity-tone alignment, weekend cadence. Adds a non-flagship game to balance the lineup.

Selection driven by the `featured: true` flag in [`lib/games.ts`](../../lib/games.ts) — flip the flag there to change the choice without touching component code.

## Consequences

- Three different days of the week (Saturday / Wednesday / Sunday) are featured, so the homepage reads as a "live week" rather than back-to-back draws.
- One of the three (Sunday Aseda) carries the charity tone explicitly — important for the homepage's first-impression.
- When real volume data is supplied, revisit. If volume contradicts editorial fit, the owner makes the call.
- A different homepage experiment (e.g. spotlight the next-to-be-drawn game) would require a real change here, not a config swap. Worth doing if engagement data later supports it.
