# 0010 — Outfit (display + body) + Montserrat (labels) — supersedes 0009

- **Status:** Accepted
- **Date:** 2026-05-29

## Context

The Montserrat (display) + Inter (body) pair from [0009](0009-montserrat-inter-type-pair.md) — and the Sora / Hanken Grotesk / Space Mono trio that actually shipped on the "Blue Hour" dark redesign — were both judged as still reading like "two competing sans". The brand owner wanted a single, unmistakably modern voice across the whole site, with one small accent face reserved for the data-feed details (eyebrows, the results ticker, tabular numerals).

## Decision

- **Outfit** is the single display **and** body face. Geometric-grotesque: confident at huge display sizes, clean at body sizes. Loaded via `next/font/google`, weights 400–900. Exposed as both `--font-display` and `--font-sans` (with `--font-serif` aliased to it).
- **Montserrat** is the one accent — it occupies the `--font-mono` slot — for eyebrows, the results ticker, and tabular numerals (`tnum`). It is NOT monospaced; literal code / IDs / env vars use a dedicated `.code` utility (a true monospace stack) instead of `font-mono`.
- Hanken Grotesk, Space Mono, Sora, Inter and Fraunces are all dropped.

## Consequences

- One typeface carries the brand → cleaner, more modern, and a smaller font payload than a two-family display + body split.
- Heading weights stay heavy by design (h1 = 800, h2/h3 = 700); Outfit at 400 reads thin at display sizes.
- Montserrat was the original Accurate Giant body face, but here it is confined to small label / numeral text while Outfit owns display + body, so the deliberate divergence from AG still holds at the headline level.
- Gradient clip-text (the hero accent word) carries a solid ink fallback + a `forced-colors` override via the `.gradient-ink` utility, so the word never vanishes in High Contrast mode or where `background-clip: text` is unsupported.
