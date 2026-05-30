# 0001 — PNG-only logo format

**Status:** Accepted (2026-04-29) · Reaffirmed under WObedibi rebrand (2026-05-28). The decision now applies to [public/brand/wobedibi-logo.png](../../public/brand/wobedibi-logo.png) — the rest of the rationale below carries over unchanged. Original AG-specific context kept for the historical record.

## Context

The Accurate Giant logo was supplied as a single PNG file (full lockup: AG monogram + "ACCURATE GIANT COMPANY LTD." wordmark). The standard ask in a build of this kind is to also request an SVG version and mono / inverse variants, plus a monogram-only mark for favicons.

The owner explicitly directed us to maintain the PNG and not generate or substitute an SVG.

## Decision

Use the supplied PNG as the only approved logo file across the site. Do not:

- Trace, auto-vectorise, or otherwise convert it to SVG
- Recolour it (no inverse / mono variants synthesised in code)
- Modify the file in any way

For sizing across viewports, lean on `next/image` to serve appropriately scaled raster sizes. Don't try to compensate for the lack of SVG with custom CSS hacks.

For dark surfaces or future favicons that need different treatment, **wait for the owner to supply additional PNG variants** (mono PNG, inverse PNG, monogram-only PNG). Until then, render the colour PNG inside a light tile rather than altering it.

## Consequences

- Logo bytes are higher than they would be with SVG (~110 KB vs a few KB).
- Sharp scaling at very small sizes (favicon, tiny header) requires owner-supplied variants — we cannot synthesise them.
- Any future re-skin of the logo is a single asset replacement at `public/brand/ag-logo.png`, no SVG markup to keep in sync.
- Footer, header, and admin login all reference the same PNG path.
