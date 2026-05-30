# Inspiration folder

This folder holds reference material extracted from the five sites listed in §2 of `AccurateGiant_SuperPrompt.md`.

## What's here

One subfolder per source. Each contains an `extracted.md` file with copy, IA, and patterns pulled from that site.

## What's NOT here yet — needs manual capture

The build agent's web-fetch tool returns **text/markdown only**. It cannot:

- Capture screenshots
- Download hero images, illustrations, or logos
- Render JavaScript-driven pages (one source — `theluckiestafrica.com` — failed for this reason)

The super prompt asks for "every screenshot, hero image, illustration" to be saved here. That step requires either:

1. **A human pass** — visit each URL, screenshot key sections, save imagery into the matching subfolder.
2. **A headless-browser tool** (Puppeteer / Playwright trace) added to the toolchain.

Until that happens, treat this folder as **copy + IA only**, not a visual moodboard. The `docs/design-brief.md` synthesis is built from the text material below, plus the visual direction described in §3 of the super prompt.

## Per-source notes

| Source | Text extracted? | Notes |
|--------|-----------------|-------|
| `myalphaonline/` | Yes | Live Ghana lotto site (Alpha Lotto). Useful for IA, copy patterns, contact-info conventions. |
| `theluckiestafrica/` | **No** | Page returned empty body — likely SPA needing JS. Manual visit required. |
| `agentlotto/` | Yes | International aggregator. Useful for catalogue layout and results display patterns only. Their commercial / multi-region model does NOT apply. |
| `nla-products/` | Yes (partial) | 15 NLA-licensed games captured. Prices and draw times missing from the public page — must be sourced from NLA directly or per-game pages. |
| `nla-results/` | Yes (partial) | Homepage references captured. The `/winning-numbers` table loads via JS so column structure is partially inferred. |
