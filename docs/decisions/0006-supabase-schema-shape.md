# 0006 — Supabase schema shape

**Status:** Accepted (2026-04-29)

## Context

The super prompt names five tables for the Supabase layer: `games`, `draws`, `winning_numbers`, `agents`, `posts` (super prompt §6). Two reasonable interpretations of `draws` + `winning_numbers`:

- **Single table:** combine into a `winning_numbers` table with `numbers int[]` + metadata. Simpler, fewer joins.
- **Two tables:** `draws` for event metadata (date, draw number, source), `winning_numbers` as one row per ball drawn. More normalised, better for analytics.

## Decision

Use **both**, kept in sync via a database trigger:

- `draws` holds the event row with `numbers int[]` and `bonus_numbers int[]` for fast UI rendering (one query renders a draw card).
- `winning_numbers` holds one row per ball drawn (`draw_id`, `position`, `value`, `is_bonus`) for analytics queries ("how often did 42 appear last quarter?").
- An `after insert or update` trigger on `draws.numbers` populates `winning_numbers` automatically — writers only ever insert into `draws`.

## Consequences

- UI fetches stay one-shot — no joins to render the latest 5 draws.
- Analytics queries get a normalised view without writers having to remember to insert twice.
- The trigger adds write latency on draw inserts (~one extra round-trip per record). Acceptable: draws are written tens of times per week, not per second.
- If we later remove the `winning_numbers` table, all reads from it must be ported to expanded `draws.numbers[]` queries — a noisy refactor but well-bounded.
- Schema lives in `supabase/migrations/0001_initial_schema.sql` + `0002_row_level_security.sql`. RLS is permissive on read for published rows, authenticated-only on write. When multi-editor is needed, narrow the `authenticated` policies to a role check.
