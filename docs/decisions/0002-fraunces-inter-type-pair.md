# 0002 — Fraunces (display) + Inter (body) type pair

**Status:** Superseded by [ADR 0009](0009-montserrat-inter-type-pair.md) (2026-04-30)

## Context

The super prompt called for a modern, premium, calm aesthetic — "calm fintech" rather than legacy lottery noise. Owner shortlisted three candidate display faces during discovery: Fraunces, Baloo 2, Exo 2.

- **Fraunces** — premium-editorial. Soft-but-considered serif.
- **Baloo 2** — warm, community, friendly. Echoes the rounded curves of the AG logo.
- **Exo 2** — geometric, tech / esports / crypto territory.

## Decision

Pair **Fraunces** (display) with **Inter** (body / UI), both loaded via `next/font/google`.

Rejected:

- **Baloo 2** — viable, but drifts toward "kid-friendly" in long-form. Specifically, the regulator-facing License & Privacy pages would feel light next to it. Worth revisiting if the brand later wants a warmer pivot.
- **Exo 2** — pulls the brand toward "modern lottery tech," which is the *exact* aesthetic the super prompt tells us to avoid. Geometric forms also fight the friendly curves of the supplied logo.

## Consequences

- Premium-editorial signal — credibility for the regulator, mission, and About pages.
- Inter's wide language coverage covers any later French / local-language launch with no font swap needed.
- Numerals on `/results` use Inter with `font-feature-settings: "tnum" 1, "lnum" 1` so digits stay column-aligned during the GSAP reveal.
- One serif + one sans is the maximum complexity we want; do not introduce a third family without a strong reason.
