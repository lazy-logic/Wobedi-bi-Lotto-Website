# Design System Foundations — Wobedi Bi Lotto

**Status:** §8 step 2 deliverable. Defines the non-colour design primitives. Colour tokens live in [brand-tokens.md](brand-tokens.md). Once these foundations are signed off, wireframes (§8 step 3) follow.

**Stack reminder** ([super prompt §5](../AccurateGiant_SuperPrompt.md)): Next.js 15 App Router, Tailwind CSS v4 with `--brand-*` custom properties, shadcn/ui, Framer Motion + GSAP, `next/font`. Every primitive below is expressed so it composes with that stack.

---

## 1. Typography

### 1.1 Type pair — locked (updated 2026-04-30)

| Role | Family | Loaded via | Weights |
|------|--------|------------|---------|
| Display (h1, h2, h3, big numerals) | **Outfit** | `next/font/google` | 400, 500, 600, 700, 800, 900 |
| Body / UI (everything else) | **Outfit** | `next/font/google` | 400, 500, 600, 700, 800, 900 |
| Eyebrows / ticker / numerals | **Montserrat** (with `font-feature-settings: "tnum" 1, "lnum" 1` for figures) | `next/font/google` | 400, 500, 600, 700, 800 |

> Outfit is the single display + body face — geometric-grotesque, confident at huge display sizes and clean at body sizes. Montserrat is a small accent for eyebrows, the results ticker, and tabular numerals. Defaults stay heavy (h1 800, h2/h3 700) because Outfit at 400 reads thin at display sizes. See [ADR 0010](decisions/0010-outfit-montserrat-type-pair.md) for the move from Montserrat + Inter.

Exposed as CSS variables: `--font-display` / `--font-sans` (both Outfit) and `--font-mono` (Montserrat). Literal code uses the `.code` monospace utility. Components reference variables, never the literal family.

### 1.2 Type scale (1.333 modular)

Base = 16 px. Scale ratio = 1.333 (perfect fourth) — bigger steps than the previous 1.250 so display sizes feel confidently large rather than polite.

| Token | rem | Computed px | Use |
|-------|-----|-------------|-----|
| `text-2xs` | 0.633 | 10.1 | Footnotes, badges |
| `text-xs` | 0.750 | 12 | Captions, table metadata |
| `text-sm` | 0.875 | 14 | Helper text, secondary labels |
| `text-base` | 1.000 | 16 | Body default |
| `text-lg` | 1.125 | 18 | Large body, lead paragraphs |
| `text-xl` | 1.333 | 21.3 | Sub-heads, list-tile titles |
| `text-2xl` | 1.777 | 28.4 | Card titles, section labels |
| `text-3xl` | 2.369 | 37.9 | Small page titles |
| `text-4xl` | 3.157 | 50.5 | Page titles, section h2s (mobile) |
| `text-5xl` | 4.209 | 67.3 | Section h2s (desktop), small hero |
| `text-6xl` | 5.610 | 89.8 | Hero headline (mobile/tablet) |
| `text-7xl` | 7.478 | 119.6 | Hero headline (desktop), big numerals |
| `text-8xl` | 9.969 | 159.5 | Mega-hero, charity-giving callout |

Display headlines (`text-4xl` and up) use Outfit. Default weights via the heading element type — h1 weight 800, h2/h3 weight 700. Override via `font-bold`, `font-extrabold`, `font-black` Tailwind utilities when a non-heading needs the same treatment (e.g. a `<p>` with `font-display font-extrabold text-7xl` for the GHS giving figure).

### 1.3 Line-height pairings

| Type role | Family | Line-height |
|-----------|--------|-------------|
| Mega display (`text-7xl`/`text-8xl`) | Outfit | 1 |
| Hero / page titles (h1) | Outfit | 1 |
| Section headings (h2) | Outfit | 1.05 |
| Sub-heads (h3) | Outfit | 1.15 |
| Body (`text-base`/`text-lg`) | Outfit | 1.55 |
| UI labels and buttons | Outfit | 1.2 |

### 1.4 Letter-spacing

| Use | Tracking |
|-----|----------|
| Mega display (`text-7xl`+) | `-0.04em` |
| h1 | `-0.035em` (base default) |
| h2 | `-0.025em` (base default) |
| h3 | `-0.02em` (base default) |
| Body | `0` |
| All-caps labels | `+0.04em` |

Defaults live in `app/globals.css` under `@layer base`. Don't add `tracking-*` utilities to headings unless you need to deviate from the base.

### 1.5 Numeric type (load-bearing for results page)

Winning-number digits use **tabular lining figures** so they don't shift width as draws update:

```css
.tnum { font-feature-settings: "tnum" 1, "lnum" 1; }
```

Applied to every number chip on `/results` and the per-game results carousel. Critical because the GSAP one-digit-at-a-time reveal (super prompt §3) would otherwise jitter between proportional digits.

---

## 2. Spacing

### 2.1 The 4 px rhythm

Every measurement in the system snaps to a 4 px grid. This is Tailwind v4's default and we don't override it.

| Token | rem | Computed px |
|-------|-----|-------------|
| `space-0` | 0 | 0 |
| `space-1` | 0.25 | 4 |
| `space-2` | 0.5 | 8 |
| `space-3` | 0.75 | 12 |
| `space-4` | 1 | 16 |
| `space-5` | 1.25 | 20 |
| `space-6` | 1.5 | 24 |
| `space-8` | 2 | 32 |
| `space-10` | 2.5 | 40 |
| `space-12` | 3 | 48 |
| `space-16` | 4 | 64 |
| `space-20` | 5 | 80 |
| `space-24` | 6 | 96 |
| `space-32` | 8 | 128 |

### 2.2 Component spacing conventions

- **Inside a card:** padding `space-6` mobile, `space-8` desktop.
- **Between cards in a grid:** gap `space-4` mobile, `space-6` desktop.
- **Section vertical rhythm:** `space-16` mobile, `space-24` desktop. `space-32` for hero-bordering sections.
- **Form field stack:** `space-4` between fields.
- **Inline icon + label:** `space-2` gap.

### 2.3 Page layout grid

| Breakpoint | Container max-width | Side gutter | Columns |
|-----------|---------------------|-------------|---------|
| `sm` (≥ 640) | 100% | `space-4` | 4 |
| `md` (≥ 768) | 720 px | `space-6` | 8 |
| `lg` (≥ 1024) | 960 px | `space-8` | 12 |
| `xl` (≥ 1280) | 1200 px | `space-8` | 12 |
| `2xl` (≥ 1536) | 1320 px | `space-8` | 12 |

The grid is implemented via Tailwind's container utility plus a single `<Container>` component in `components/layout/`. Per super-prompt acceptance criteria, the site is responsive **320 px → 1920 px** ([§10](../AccurateGiant_SuperPrompt.md)). Below 640 px it's a fluid single column with `space-4` gutters.

### 2.4 Touch targets

Minimum interactive target: **44 × 44 px** (WCAG 2.5.5 AAA, but we hold to it for the broad mobile audience). Spacing between adjacent targets: at least `space-2`.

---

## 3. Radius and elevation

### 3.1 Radius scale

| Token | rem | Computed px | Use |
|-------|-----|-------------|-----|
| `radius-none` | 0 | 0 | Number chips on results (square reads more "official") |
| `radius-sm` | 0.25 | 4 | Inputs, badges, small chips |
| `radius-md` | 0.5 | 8 | Buttons, callout pills |
| `radius-lg` | 0.75 | 12 | Cards |
| `radius-xl` | 1 | 16 | Hero / featured tiles |
| `radius-2xl` | 1.5 | 24 | Modal sheets |
| `radius-full` | 9999 | — | Avatars, status dots |

### 3.2 Elevation (shadows)

Elevation comes from layered, low-opacity shadows tuned to read calm — not the chunky Material defaults.

| Token | Use | Definition |
|-------|-----|------------|
| `shadow-flat` | Default cards | none — relies on `--brand-border` for separation |
| `shadow-soft` | Hover state on cards, dropdowns | `0 1px 2px rgba(20,30,60,0.04), 0 4px 12px rgba(20,30,60,0.06)` |
| `shadow-lifted` | Modals, popovers | `0 4px 8px rgba(20,30,60,0.06), 0 24px 48px rgba(20,30,60,0.10)` |
| `shadow-focus` | Focused interactive elements | `0 0 0 3px rgba(1,50,153,0.25)` (uses `--brand-primary` at 25%) |

Default cards are **flat with a 1 px border**, not shadowed. Shadows are reserved for state changes and floating surfaces. Aligns with the calm-fintech direction.

---

## 4. Motion

### 4.1 Principles

1. **Motion explains, then disappears.** Animation supports a state change, then ends. No looping decoration.
2. **Honour `prefers-reduced-motion` everywhere.** Substitute fades for movement, snap-cuts for parallax, instant reveals for the digit animation.
3. **One signature moment per page** — the place the eye is supposed to land. On `/results` it's the digit reveal. On `/` it's the subtle hero parallax.
4. **Page transitions share one element.** Per super prompt §3 — the latest-results card on `/` morphs into the latest-draw hero on `/results`. Implemented with Framer Motion `layoutId`.

### 4.2 Duration tokens

| Token | ms | Use |
|-------|----|-----|
| `dur-instant` | 80 | Hover state colour swap, focus rings |
| `dur-fast` | 160 | Button press, micro-feedback |
| `dur-base` | 240 | Card hover lift, dropdown open |
| `dur-slow` | 400 | Page-level transitions, modal open |
| `dur-deliberate` | 600 | Section reveal on scroll |
| `dur-numeric` | 80 per digit, sequenced | GSAP digit reveal on results |

### 4.3 Easing tokens

| Token | Curve | Use |
|-------|-------|-----|
| `ease-standard` | `cubic-bezier(0.2, 0, 0, 1)` | Default for all transitions |
| `ease-emphasised` | `cubic-bezier(0.3, 0, 0, 1)` | Hero parallax, big reveals |
| `ease-exit` | `cubic-bezier(0.4, 0, 1, 1)` | Elements leaving the viewport |

### 4.4 Specific motion specs

- **Digit reveal (results):** GSAP. Numbers blur in from `translateY(8px)` with a stagger of `dur-numeric` per digit. After the last digit lands, the chip outline pulses once at `--brand-primary` 25%, then settles.
- **Hero parallax:** scroll-linked, max translation `space-3` (12 px). Off below 640 px viewport.
- **Card hover:** `translateY(-2px)`, shadow `flat → soft`, `dur-base`, `ease-standard`.
- **Skeleton loaders:** `--brand-paper-sunken` background with a subtle 1.5 s shimmer that pauses once content arrives.

---

## 5. Iconography

- **Library:** Lucide React (per super prompt §5).
- **Default size:** 20 px in body context, 16 px inline with text, 24 px in CTAs and tiles.
- **Stroke weight:** 1.75 px (the slightly heavier setting reads better at small sizes than Lucide's 1.5 default).
- **Colour:** `currentColor`. Never hardcode an icon colour — inherit from the parent.

---

## 6. Imagery

- All `<img>` and decorative imagery served via `next/image`. AVIF preferred, JPEG fallback.
- Hero photography aspect ratio: 16:9 desktop, 4:3 mobile. Subject anchored left so right-hand text overlays don't compete.
- Editorial / news post imagery: 3:2.
- Game tile illustrations (when supplied): 1:1.
- All decorative imagery has empty `alt=""`. Content imagery has descriptive `alt`. Per WCAG 2.1 AA acceptance ([§10](../AccurateGiant_SuperPrompt.md)).
- No generic stock-money imagery. Real Ghanaian people and locations. Placeholder thumbnails until photography is sourced — track the gap in [content-inventory.md](content-inventory.md) §4 item 8.

---

## 7. Tone of voice (writing primitives)

Not strictly visual, but it's part of the design system because every screen carries copy.

- **Mission first.** Lead with charity outcomes; lottery is the mechanism, not the headline.
- **Calm and direct.** No exclamation marks. No urgency theatre ("HURRY!" / "LAST CHANCE!"). The countdown speaks for itself.
- **Plain English with local respect.** Keep local names (e.g. *Aseda*) and explain them once; don't translate them away.
- **Disclose, don't bury.** Regulatory copy (NLA license, 18+, responsible play) is part of the design, not a footer afterthought. Treat it as content.
- **Numbers are sacred.** Winning numbers are quoted exactly as published. Never abbreviated, never rounded, never decorated with emoji.

---

## 8. Component-level conventions

Stops short of designing components — that's wireframes (§8 step 3). What's locked here:

- All components consume CSS variables, never literal hex values or hardcoded font families.
- All components ship with mobile-first styles. Desktop refinements via `md:` and `lg:` modifiers.
- Every interactive component has visible `:focus-visible` styling using `shadow-focus`.
- Every form input has an accessible label, an error region with `aria-live="polite"`, and Zod-backed server validation.
- shadcn/ui provides the baseline; we only override what the brand demands.

---

## 9. What this system intentionally does NOT define yet

- **Specific component anatomy** (game tile dimensions, results card layout) — that's wireframes, next deliverable.
- **Hero composition variants** — design phase.
- **Loading and empty states for each route** — design phase, but the primitives above (skeleton + sunken background + tone-of-voice rules) carry through.
- **Dark mode.** Out of scope unless owner requests. The brand is built around one surface.

---

## 10. Definition of "design system foundations complete"

- [x] Colour tokens (in [brand-tokens.md](brand-tokens.md)).
- [x] Type pair, scale, line-heights, tracking, numeric type rules.
- [x] Spacing scale, layout grid, breakpoints, touch-target minimums.
- [x] Radius and elevation tokens.
- [x] Motion principles, duration + easing tokens, named animation specs.
- [x] Iconography rules.
- [x] Imagery rules.
- [x] Tone of voice primitives.
- [x] Type pairing confirmed (Fraunces + Inter, 2026-04-29).
- [x] Owner sign-off to proceed to wireframes (2026-04-29).
