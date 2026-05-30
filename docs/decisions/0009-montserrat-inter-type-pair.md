# 0009 — Montserrat (display) + Inter (body) — supersedes 0002

**Status:** Accepted (2026-04-30) — supersedes [ADR 0002](0002-fraunces-inter-type-pair.md)

## Context

The Fraunces + Inter pair landed on 2026-04-29 as the "premium-editorial" interpretation of the brand brief. After living with it on the shipped pages, the brand owner judged the result "not modern enough." The direction shifted to:

- Bigger, bolder headlines
- A geometric sans for display rather than a serif
- A more confident, contemporary visual signal closer to current consumer-fintech product sites

## Decision

Replace Fraunces with **Montserrat** (display). Inter stays for body / UI.

Practical changes that fall out of this:

- Heading defaults move heavy: h1 = 800, h2 = 700, h3 = 700 (Montserrat at 400 reads thin and unconvincing at display sizes; the modern direction wants weight)
- Type scale ratio bumped from 1.250 (major third) to 1.333 (perfect fourth) — display sizes feel confidently large rather than polite
- Added `text-8xl` (~160 px) for mega-hero and the audited-giving callout
- Tracking defaults tightened: h1 -0.035em, h2 -0.025em, h3 -0.02em (and -0.04em on text-7xl+)
- Hero headlines bumped to `text-6xl md:text-7xl lg:text-8xl`; section h2s to `text-4xl md:text-5xl`; About/Charity giving figures to `text-7xl md:text-8xl`

## Consequences

- **Wins:** the site reads as modern consumer brand rather than editorial / regulator publication. Closer to the "calm fintech" intent of the original brief now that "calm" is interpreted as restrained-not-polite. Hero now has visual weight worthy of the charity headline.
- **Losses:** the editorial / serif-driven gravitas that Fraunces brought is gone. The site signals less "centuries-old institution" and more "well-run product company." That's the right trade for a charity that's also operating a modern mobile app + USSD product, but worth knowing.
- Pairing two sans-serifs (Montserrat + Inter) is unusual but works because the families have distinct personalities — Montserrat is geometric with character, Inter is humanist and neutral.
- Two-family load adds ~30-50 KB of woff2 (Montserrat with five weights). Acceptable; both are subsetted via `next/font/google` and self-hosted.
- The cyan `--brand-secondary` accessibility caveat (fails AA on white at body size) still stands. No change there.

## What stays from ADR 0002

- Inter for body and UI
- `font-feature-settings: "tnum" 1, "lnum" 1` on number chips and any tabular numerics
- Wide language coverage (Latin Extended) for any later French / local-language launch
- One serif + one sans is rejected as the maximum complexity — replaced by "two sans-serifs with strongly distinct roles"
