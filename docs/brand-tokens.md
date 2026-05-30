# Brand Tokens — Wobedi Bi Lotto · "Blue Hour"

**Status:** Identity relocked 2026-05-29 to **"Blue Hour"** — a deliberate, total break from the original Accurate Giant look (which this codebase was forked from). AG is a *light/white* site with mid-navy `#013299`; Blue Hour is **DARK-LED**: rich-black `#000919` is the dominant surface and electric **Celtic blue `#0A6ED3`** is the accent/glow. Same blue *hue family*, opposite *gestalt* — plus new typefaces (off Montserrat/Inter) and tighter component shapes, so there is no visual resemblance.

Palette is owner-supplied: Celtic `#0A6ED3` · Polynesian `#054E98` · Yale `#04356A` · Oxford `#001D3F` · Rich Black `#000919`.

> Supersedes the prior "Midnight Draw" (light navy + gold) direction. Gold is fully retired.

**Source asset:** [public/brand/wobedibi-logo.png](../public/brand/wobedibi-logo.png) — wordmark / monogram on transparent background.

**Why this direction:** the brand is sold on trust first, joy second. An NLA-regulated operator competing against 50+ others wins by looking like the safe choice. Navy is that signal; the gold spark keeps the lottery joy alive without turning the site into a casino. The emotional ratio — vast calm navy, rare gold — mirrors responsible play itself.

---

## 1. Colour tokens

### Brand navy — the surface and the authority

| Token | Hex | Role |
|-------|-----|------|
| `--brand-primary` | `#013982` | Daytime brand colour. Buttons, links, key accents, wordmark, hero base. |
| `--brand-primary-deep` | `#00266B` | Hover/pressed states, dark surface bands, marquee. |
| `--brand-primary-ink` | `#0A2A5E` | Hero / page-header gradient floor (deepest navy). |
| `--brand-primary-soft` | `#E6ECF6` | Navy tint on white — pill chips, soft callouts. |
| `--brand-secondary` | `#00266B` | Alias of `--brand-primary-deep`, backwards-compat only. |

### Signal gold — the ONLY accent, rationed

Gold appears ONLY on: the primary CTA, the "live"/"just drawn" dot, the most-recent result pulse, page-header eyebrows, and the hero cluster glow. **Never** use it as a generic decorative colour — its scarcity is what makes it carry meaning.

| Token | Hex | Role |
|-------|-----|------|
| `--brand-signal` | `#E0A526` | Badges, glow, on-navy text & accents. |
| `--brand-signal-deep` | `#C7941D` | 6.5:1 — the text-safe variant for gold-on-white. |
| `--brand-signal-soft` | `#FBF1D8` | Gold tint surfaces (e.g. "updating soon" pills). |

### Neutral ramp — warm-leaning

| Token | Hex | Role |
|-------|-----|------|
| `--brand-ink` | `#0F1827` | Primary text. |
| `--brand-ink-muted` | `#4D5663` | Secondary text, captions, metadata. |
| `--brand-paper` | `#FFFFFF` | Page background. |
| `--brand-paper-warm` | `#FAF7F1` | Default warm section background (sheds the clinical feel). |
| `--brand-paper-muted` | `#F5F7FA` | Cool data surfaces (tables, archive). |
| `--brand-paper-sunken` | `#EBEEF4` | Inset surfaces. |
| `--brand-border` | `#DCE1EA` | Hairlines, card outlines. |
| `--brand-border-strong` | `#A3ABBB` | Form-input borders, hover affordance. |
| `--brand-success` | `#1E8A44` | Positive states. |
| `--brand-warning` | `#E0A526` | = signal gold (intentional). |
| `--brand-danger` | `#C0392B` | Errors, 18+ marker. |

### Accessibility check

| Foreground | Background | Ratio | WCAG AA |
|------------|------------|-------|---------|
| white | `--brand-primary` (#013982) | ~12.0 : 1 | Pass |
| `--brand-signal` (#E0A526) | `--brand-primary` (#013982) | ~5.6 : 1 | Pass (large + UI) |
| `--brand-signal-deep` (#C7941D) | white | ~6.5 : 1 | Pass (body) |
| `--brand-primary` (#013982) | white | ~12.0 : 1 | Pass |

> The previous orange "festival" hero (navy ink on `#f57a18`, ~3.2:1) **failed AA** and was retired in favour of white-on-navy. Do not reintroduce dark text on a warm fill at body size.

### Eyebrow

All small uppercase section labels use the `.eyebrow` component class (in `globals.css`), NOT ad-hoc `tracking-[...]` + `text-[10px]`. It clamps to a legible size at 375px and widens tracking at `md`.

---

## 2. Logo usage

**Primary lockup:** [public/brand/wobedibi-logo.png](../public/brand/wobedibi-logo.png).

### Format handling

- Use the supplied PNG as-is everywhere it appears. Do not invert, recolour, trace, or auto-vectorise.
- For darker surfaces, place the PNG on `--brand-paper` (white) or `--brand-paper-muted` inside its container instead of altering the file.
- Serve via `next/image` so the PNG renders at appropriately scaled sizes per viewport.
- Header rendering: 32–44 px tall on desktop, 32 px on mobile. Paired with the "Wobedi Bi" typographic wordmark on `sm+` screens.

### Still needed (owner)

- **Mono / inverse logo variants.** Useful for: footer on a dark surface, single-colour stamps, favicons.
- **Favicon set regenerated from the new mark.** The current `public/favicon/` set still carries the AG glyph and needs to be re-exported from the WObedibi mark.
- **Open Graph share card** using the new palette.
- **Clear-space and minimum-size guidelines.**

---

## 3. Typography — locked

| Role | Family | Loaded via | Weights |
|------|--------|------------|---------|
| Display (h1, h2, h3, big numerals) | **Outfit** | `next/font/google` | 400, 500, 600, 700, 800, 900 |
| Body / UI | **Outfit** | `next/font/google` | 400, 500, 600, 700, 800, 900 |
| Eyebrows / ticker / numerals | **Montserrat** | `next/font/google` | 400, 500, 600, 700, 800 |

Default heading weights are heavy by design (h1 = 800, h2 = 700, h3 = 700). Outfit leads as the single display + body face; Montserrat is the small label / numeral accent (the `--font-mono` slot). See [ADR 0010](decisions/0010-outfit-montserrat-type-pair.md).

Type scale ratio is **1.333** (perfect fourth) so display sizes feel confidently large. Full scale in [docs/design-system.md §1.2](design-system.md).

---

## 4. CSS custom-property contract

All colour tokens above are exposed via Tailwind v4's `@theme` block in [app/globals.css](../app/globals.css). The brand swap is a single-file change.

```css
@theme {
  /* Brand — Wobedi Bi Lotto */
  --color-brand-primary: #013982;
  --color-brand-primary-deep: #00347b;
  --color-brand-primary-soft: #e6ecf6;
  --color-brand-secondary: #00347b;

  /* Neutrals */
  --color-brand-ink: #0f1827;
  --color-brand-ink-muted: #4d5663;
  --color-brand-paper: #ffffff;
  --color-brand-paper-muted: #f5f7fa;
  --color-brand-paper-sunken: #ebeef4;
  --color-brand-border: #d7dce6;
  --color-brand-border-strong: #a3abbb;

  /* State */
  --color-brand-success: #0e8c4d;
  --color-brand-warning: #c77a00;
  --color-brand-danger: #c0392b;
}
```

No component is allowed to hardcode the navy hex values — always reference the token.

---

## 5. Outstanding owner decisions

1. Mono / inverse logo variants.
2. Favicon set + Open Graph share card regenerated from the WObedibi mark.
3. Brand-book / clear-space rules (if any).
4. Photography direction (current Impact page reuses archive imagery from the previous brand — refresh with WObedibi-era photography when available).
