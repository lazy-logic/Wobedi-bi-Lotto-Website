# Wireframes — Wobedi Bi Lotto

**Status:** §8 step 3 deliverable. Structural specs for the six pages called out in the super prompt: Home, Games, Game Detail, Results, About, Responsible Play. Pre-hi-fi — these define hierarchy, components, breakpoint behaviour, and states. Pixel-perfect visual design follows in §8 step 4.

**Inputs:** [docs/content-inventory.md](content-inventory.md) for copy blocks · [docs/design-system.md](design-system.md) for spacing, type, motion · [docs/brand-tokens.md](brand-tokens.md) for colour · [docs/nla-compliance.md](nla-compliance.md) for mandatory disclosures.

**Conventions used in this doc**

- `[Component]` = a named component to live in `components/`
- `→` = link / nav target
- ⬜ = block in the layout diagram
- **bold** = text content (placeholder unless quoted from inventory)
- _Mobile / Desktop_ headings call out responsive differences

---

## Global shell (every page)

### Header

```
┌──────────────────────────────────────────────────────────────────┐
│  [Logo: ag-logo.png]   Games  Results  How to play  Agents  About  News   │
│                                                                              │
└──────────────────────────────────────────────────────────────────┘
```

- Sticky on scroll, condenses to slimmer height after 80 px scroll.
- _Mobile_: logo + hamburger. Drawer mirrors the desktop nav. License number shows in drawer footer.
- Logo: PNG via `next/image`, 32–40 px tall desktop, 28 px mobile (per [brand-tokens.md §2](brand-tokens.md)).
- Active route: `--brand-primary` underline, animated via Framer Motion `layoutId="nav-underline"`.
- Focus state: 3 px `shadow-focus` ring on each nav item.

### Footer (every page — mandatory disclosures)

```
Baloo 2 (display) + Inter (body) is a real upgrade if "warm, community-led charity" is the priority over "premium-editorial".
```

- Background: `--brand-paper-muted`. Dividers: `--brand-border`.
- License number, 18+ badge, "Play responsibly" link are MANDATORY on every page (per [nla-compliance.md §2](nla-compliance.md)).
- _Mobile_: nav columns collapse to a single accordion; trust strip stays in the same fixed bar at bottom.

### Cookie consent banner

- Slide-up from bottom on first visit. Three buttons: Accept all · Reject non-essential · Manage preferences.
- Non-essential cookies blocked until choice is made.
- Re-entry point: "Cookie preferences" link in footer.

---

## 1. `/` Home

### Goal

Lead with charity mission. Surface the latest results inside two scrolls. Drive towards `/games`, `/results`, `/agents`. Earn trust through visible licensing.

### Layout — desktop ≥ `lg`

```
┌──────────────────────────────────────────────────────────────────┐
│  HEADER                                                                      │
├──────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ⬜ HERO                                                                      │
│     • Display headline (Fraunces, text-6xl)                                  │
│     • Sub-line (Inter, text-xl)                                              │
│     • Primary CTA: "View latest results" → /results                          │
│     • Secondary CTA: "Find an agent" → /agents                               │
│     • Background: subtle parallax photography (Ghanaian people / locations)  │
│     • Trust micro-line under CTAs: "NLA-licensed · Charity · 18+"            │
│                                                                              │
├──────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ⬜ MISSION STRIP                                                             │
│     • One-sentence charity mission (Fraunces, text-3xl)                      │
│     • Link: "How giving works" → /about                                      │
│                                                                              │
├──────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ⬜ LATEST RESULTS WIDGET   [View all results →]                              │
│     ┌──────────────┬──────────────┬──────────────┐                           │
│     │ [GameLogo]   │ [GameLogo]   │ [GameLogo]   │                           │
│     │ Game name    │ Game name    │ Game name    │                           │
│     │ Draw date    │ Draw date    │ Draw date    │                           │
│     │ ⓿ ⓿ ⓿ ⓿ ⓿  │ ⓿ ⓿ ⓿ ⓿ ⓿  │ ⓿ ⓿ ⓿ ⓿ ⓿  │                           │
│     │ Next draw in │ Next draw in │ Next draw in │                           │
│     │   05:23:11   │   05:23:11   │   05:23:11   │                           │
│     └──────────────┴──────────────┴──────────────┘                           │
│     (carries the layoutId that morphs into /results latest-draw card)        │
│                                                                              │
├──────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ⬜ FEATURED GAMES (3 highest-volume — owner picks)                           │
│     ┌──────────────┬──────────────┬──────────────┐                           │
│     │ [GameTile]   │ [GameTile]   │ [GameTile]   │                           │
│     └──────────────┴──────────────┴──────────────┘                           │
│     [See all 15 games →]                                                     │
│                                                                              │
├──────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ⬜ TRUST STRIP                                                               │
│     [NLA license #]  [18+]  [Responsible play →]  [Licensed charity]         │
│                                                                              │
├──────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ⬜ WINNERS' STORIES TEASER   [More stories →]                                │
│     ┌──────────────┬──────────────┬──────────────┐                           │
│     │ [Photo]      │ [Photo]      │ [Photo]      │                           │
│     │ Winner name  │ Winner name  │ Winner name  │                           │
│     │ Game · date  │ Game · date  │ Game · date  │                           │
│     │ Pull quote   │ Pull quote   │ Pull quote   │                           │
│     └──────────────┴──────────────┴──────────────┘                           │
│                                                                              │
├──────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ⬜ CHARITY-IMPACT CALLOUT                                                    │
│     • "Audited annual giving" figure (large numeric, tnum)                   │
│     • One-paragraph context                                                  │
│     • Link: "Read about our charity work" → /about                           │
│                                                                              │
├──────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ⬜ AGENT LOCATOR CTA                                                         │
│     • Headline: "Find a lotto agent near you"                                │
│     • CTA: "Open the locator" → /agents                                      │
│     • Background: muted Accra map illustration (NOT live map here)           │
│                                                                              │
├──────────────────────────────────────────────────────────────────┤
│  FOOTER                                                                      │
└──────────────────────────────────────────────────────────────────┘
```

### Layout — mobile (< `md`)

Same blocks, single column. Featured games becomes a horizontal snap-scroll (3 cards, swipeable). Latest results widget becomes a vertical stack (max 3 cards).

### States

- **Loading (results widget):** skeleton chips with shimmer per [design-system.md §4.4](design-system.md).
- **Stale (results widget):** if last refresh > 30 min and no new draw expected, show a discreet "Last updated HH:MM" line, no alarm UI.
- **Error (results widget):** keep the last successfully fetched data, append "Couldn't refresh — last updated HH:MM" line, no scary modal.

### Components used

`[Header]` `[Hero]` `[MissionStrip]` `[ResultsWidget]` (from `components/results/`) `[GameTile]` (from `components/games/`) `[TrustStrip]` `[StoryTile]` `[CharityImpactCallout]` `[AgentLocatorCta]` `[Footer]`

### Content references

Maps to [content-inventory.md §2 `/` Home](content-inventory.md). Open items: hero copy (OWNER), mission line (OWNER), audited giving figure (OWNER), three featured games (OWNER), at least one winner story (OWNER), at least one charity-impact post (OWNER).

---

## 2. `/games` (catalogue)

### Goal

Show every NLA-licensed game we operate. No purchase flow — every CTA leads to information.

### Layout — desktop ≥ `lg`

```
┌──────────────────────────────────────────────────────────────────┐
│  HEADER                                                                      │
├──────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ⬜ PAGE HEAD                                                                 │
│     • Title (Fraunces, text-4xl): "Our games"                                │
│     • Lead (Inter, text-lg): one-sentence framing                            │
│                                                                              │
├──────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ⬜ FILTER BAR (sticky after page-head)                                       │
│     [ All ] [ Mon ] [ Tue ] [ Wed ] [ Thu ] [ Fri ] [ Sat ] [ Sun ] [Daily]  │
│     [ All channels ] [ Standard ] [ USSD ] [ POS ]                           │
│     Sort: [ Schedule | Name | Recently drawn ]                               │
│                                                                              │
├──────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ⬜ GAME GRID (4 columns desktop, 2 columns md, 1 column sm)                  │
│     ┌──────────┬──────────┬──────────┬──────────┐                            │
│     │[GameTile]│[GameTile]│[GameTile]│[GameTile]│                            │
│     ├──────────┼──────────┼──────────┼──────────┤                            │
│     │ ...      │ ...      │ ...      │ ...      │                            │
│     └──────────┴──────────┴──────────┴──────────┘                            │
│     (15 tiles total — see content-inventory.md §1)                           │
│                                                                              │
├──────────────────────────────────────────────────────────────────┤
│  FOOTER                                                                      │
└──────────────────────────────────────────────────────────────────┘
```

### `[GameTile]` anatomy

```
┌────────────────────────────┐
│  [Game logo (PNG)]         │
│                            │
│  Game name (text-2xl)      │
│  One-line origin / hook    │
│                            │
│  [Schedule chip] [Channel] │
│  Ticket price (if known)   │
│                            │
│  Last result:              │
│  ⓿ ⓿ ⓿ ⓿ ⓿ ⓿               │
│  Drawn 27 Apr · #1234      │
│                            │
│  [View game →]             │
└────────────────────────────┘
```

- Background: `--brand-paper`. Border: `--brand-border`. Hover: `shadow-soft` + `translateY(-2px)`.
- Schedule chip uses `--brand-paper-muted` background; channel chip uses `--brand-secondary` 12 % background.
- Whole tile is a single link to `/games/[slug]` (anchor wraps the tile).
- Loading state: skeleton fields, shimmer.
- Empty state (filters return nothing): friendly message + "Clear filters" button.

### States

- Filter chips have a clear-all `×` when any is active.
- URL reflects filter state (`/games?day=fri&channel=ussd`) so deep links work.

### Content references

Pulls every row from [content-inventory.md §1](content-inventory.md). Channels and schedules drive the filters.

---

## 3. `/games/[slug]` (per-game detail)

### Goal

The opinionated detail page for one game — origin story + how-to-play + recent results + agent CTA. **Not** a stat sheet.

### Layout — desktop ≥ `lg`

```
┌──────────────────────────────────────────────────────────────────┐
│  HEADER                                                                      │
├──────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ⬜ HERO (split 60/40)                                                        │
│     ┌─────────────────────────────────────┬─────────────────────┐            │
│     │ Breadcrumb: Games / Friday Bonanza  │  [Game logo PNG]    │            │
│     │                                     │  (large, on tile)   │            │
│     │ H1 (Fraunces, text-5xl): Game name  │                     │            │
│     │ Origin / hook (Inter, text-lg)      │                     │            │
│     │                                     │                     │            │
│     │ [Day chip] [Channel] [Price chip]   │                     │            │
│     │                                     │                     │            │
│     │ Primary CTA: "Find an agent"        │                     │            │
│     │   → /agents?game=friday-bonanza     │                     │            │
│     └─────────────────────────────────────┴─────────────────────┘            │
│                                                                              │
├──────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ⬜ HOW TO PLAY (3 steps)                                                     │
│     ┌───────────┬───────────┬───────────┐                                    │
│     │ 1.        │ 2.        │ 3.        │                                    │
│     │ Find an   │ Pick your │ Wait for  │                                    │
│     │ agent     │ numbers   │ the draw  │                                    │
│     └───────────┴───────────┴───────────┘                                    │
│     [Read the full how-to-play guide →] /how-to-play                         │
│                                                                              │
├──────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ⬜ PRIZE STRUCTURE (table)                                                   │
│     Match | Prize                                                            │
│     5 numbers | TBC (NLA)                                                    │
│     ...                                                                      │
│                                                                              │
├──────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ⬜ RECENT RESULTS FOR THIS GAME   [Full archive →] /results/<slug>           │
│     ┌──────────────┬──────────────┬──────────────┐                           │
│     │ 27 Apr · #1234                                                          │
│     │ ⓿ ⓿ ⓿ ⓿ ⓿                                                              │
│     ├──────────────┴──────────────┴──────────────┤                           │
│     │ 24 Apr · #1233                                                          │
│     │ ⓿ ⓿ ⓿ ⓿ ⓿                                                              │
│     └──────────────────────────────────────────────                           │
│                                                                              │
├──────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ⬜ TRUST STRIP                                                               │
│     [NLA license #]  [18+]  [Responsible play →]                             │
│                                                                              │
├──────────────────────────────────────────────────────────────────┤
│  FOOTER                                                                      │
└──────────────────────────────────────────────────────────────────┘
```

### Layout — mobile

Hero stacks logo above text. Prize table becomes a definition list. Recent results becomes a vertical list.

### States

- Game has no published results yet: results section shows "Draws will appear here from `<first-draw-date>`". No empty zero-state spinner.
- Channel is POS-only (Super 6) or USSD-only (Lucky 3, Daywa): the "Find an agent" CTA changes to "How to play via POS / USSD" with a teach-the-rules tone.

### Components used

`[Header]` `[GameDetailHero]` `[HowToPlaySteps]` `[PrizeTable]` `[GameResultsList]` `[TrustStrip]` `[Footer]`

### Content references

Maps to [content-inventory.md §2 `/games/[slug]`](content-inventory.md). Origin / schedule / price / channel come from the seeded `games` table; results come from `winning_numbers` joined on `game_slug`.

---

## 4. `/results`

### Goal

The signature page. Latest draw per game above; deep filterable archive below. The digit-reveal animation lives here.

### Layout — desktop ≥ `lg`

```
┌──────────────────────────────────────────────────────────────────┐
│  HEADER                                                                      │
├──────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ⬜ PAGE HEAD                                                                 │
│     • Title (Fraunces, text-4xl): "Winning numbers"                          │
│     • Freshness disclosure (Inter, text-sm, --brand-ink-muted):              │
│       "Updated within minutes of each official NLA draw.                     │
│        Source: National Lottery Authority. Last updated HH:MM."              │
│     • Disclaimer line: "In case of discrepancy, NLA's record is              │
│       authoritative."                                                        │
│                                                                              │
├──────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ⬜ LATEST DRAW HERO (per game — horizontal snap-scroll on mobile)            │
│     ┌──────────────────┬──────────────────┬──────────────────┐               │
│     │ [GameLogo]       │ [GameLogo]       │ [GameLogo]       │               │
│     │ Game name        │ Game name        │ Game name        │               │
│     │ Drawn 27 Apr     │ Drawn 27 Apr     │ Drawn 27 Apr     │               │
│     │  Draw #1234      │  Draw #1234      │  Draw #1234      │               │
│     │                  │                  │                  │               │
│     │ ⓿ ⓿ ⓿ ⓿ ⓿       │ ⓿ ⓿ ⓿ ⓿ ⓿       │ ⓿ ⓿ ⓿ ⓿ ⓿       │               │
│     │ (digits reveal   │                  │                  │               │
│     │ one at a time)   │                  │                  │               │
│     │                  │                  │                  │               │
│     │ Next draw in     │ Next draw in     │ Next draw in     │               │
│     │ HH:MM:SS         │ HH:MM:SS         │ HH:MM:SS         │               │
│     │                  │                  │                  │               │
│     │ [View archive →] │ [View archive →] │ [View archive →] │               │
│     └──────────────────┴──────────────────┴──────────────────┘               │
│     (each card morphs to /results/<slug> via Framer Motion layoutId)         │
│                                                                              │
├──────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ⬜ FILTER BAR (sticky)                                                       │
│     Game: [ All ▼ ]   From: [ date ]   To: [ date ]                          │
│     [Clear filters]                                                          │
│                                                                              │
├──────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ⬜ ARCHIVE TABLE                                                             │
│     ┌────────────┬─────────────────┬───────────────┬─────────┐               │
│     │ Date       │ Game            │ Numbers       │ Draw #  │               │
│     ├────────────┼─────────────────┼───────────────┼─────────┤               │
│     │ 27 Apr 26  │ Friday Bonanza  │ ⓿⓿⓿⓿⓿       │ 1234    │               │
│     │ 26 Apr 26  │ Lucky Tuesday   │ ⓿⓿⓿⓿⓿       │ 1233    │               │
│     │ ...                                                                    │               │
│     └────────────┴─────────────────┴───────────────┴─────────┘               │
│     [ Load more ]   (cursor pagination)                                      │
│                                                                              │
├──────────────────────────────────────────────────────────────────┤
│  FOOTER                                                                      │
└──────────────────────────────────────────────────────────────────┘
```

### Number chip anatomy

- Square (`radius-none`), `space-12` (48 px) on desktop, `space-10` (40 px) on mobile.
- Background `--brand-primary`, text white, `text-2xl`, weight 600, tabular numerals.
- Bonus / supplementary balls: `--brand-secondary` background.
- Reveal: GSAP, `dur-numeric` (80 ms) per digit, blur-in from `translateY(8px)`. After last digit lands, chip outline pulses once at `--brand-primary` 25 %, then settles. Skipped under `prefers-reduced-motion` — render directly with no animation.

### States

- Pre-fetch: 5 hero cards as skeletons, archive shows 10 skeleton rows.
- Filtered to a game with no results in range: "No draws for `<game>` between `<date>` and `<date>`." plus "Clear filters" button.
- Pipeline error: keep last good data; banner above hero strip says "Couldn't refresh from NLA — last successful update HH:MM."

### Components used

`[Header]` `[ResultsPageHead]` `[LatestDrawCard]` `[ResultsFilterBar]` `[ResultsArchiveTable]` `[NumberChip]` `[Footer]`

### Acceptance hook

Per super prompt §10: "Results page renders the 5 most recent draws within 1.5 seconds of navigation." Means the latest-hero strip is server-rendered (RSC) with cached data, not client-fetched on hydration.

### Per-game permalink: `/results/[slug]`

Same page minus the multi-game hero strip — replaced with a single `[LatestDrawCard]` for that game and the archive pre-filtered. `useRouter` does NOT remount; `layoutId` morphs the card from `/` or `/games/[slug]`.

---

## 5. `/about`

### Goal

Establish charity credibility. Visible license. Real leadership. Audited giving.

### Layout — desktop ≥ `lg`

```
┌──────────────────────────────────────────────────────────────────┐
│  HEADER                                                                      │
├──────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ⬜ HERO                                                                      │
│     • Title (Fraunces, text-5xl): "A Ghanaian charity, licensed by the NLA"  │
│     • Lead paragraph: founding story / why we exist                          │
│                                                                              │
├──────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ⬜ MISSION                                                                   │
│     • Title: "Our mission"                                                   │
│     • 1–2 paragraphs                                                         │
│     • Pull-quote (Fraunces italic) for the mission line                      │
│                                                                              │
├──────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ⬜ AUDITED ANNUAL GIVING                                                     │
│     • Big numeric (Inter tnum, text-7xl): GHS X.XX                           │
│     • Subtext: period (e.g. "FY2025") + "audited by [auditor]"               │
│     • Link to audit summary PDF if available                                 │
│                                                                              │
├──────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ⬜ LEADERSHIP                                                                │
│     ┌──────────┬──────────┬──────────┬──────────┐                            │
│     │ [Photo]  │ [Photo]  │ [Photo]  │ [Photo]  │                            │
│     │ Name     │ Name     │ Name     │ Name     │                            │
│     │ Role     │ Role     │ Role     │ Role     │                            │
│     │ Bio (2L) │ Bio (2L) │ Bio (2L) │ Bio (2L) │                            │
│     └──────────┴──────────┴──────────┴──────────┘                            │
│                                                                              │
├──────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ⬜ LICENSE & REGULATION                                                      │
│     • Heading: "Licensed by the National Lottery Authority of Ghana"         │
│     • License number (large, monospaced if applicable)                       │
│     • Effective dates if applicable                                          │
│     • Charity-registration details                                           │
│     • Reference to Act 722 (link)                                            │
│     • Reference to WLA Level 2 Responsible Gaming Framework                  │
│     • [Download license PDF] (if available)                                  │
│                                                                              │
│     NLA logo placement: ONLY here, AND ONLY once written permission is on    │
│     file (per nla-compliance.md §4). Until then — no NLA logo.               │
│                                                                              │
├──────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ⬜ HOW WE OPERATE                                                            │
│     • Short explainer of the agent network model                             │
│     • Link: "Find an agent" → /agents                                        │
│                                                                              │
├──────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ⬜ CONTACT                                                                   │
│     • Office address                                                         │
│     • Phone numbers                                                          │
│     • Email                                                                  │
│                                                                              │
├──────────────────────────────────────────────────────────────────┤
│  FOOTER                                                                      │
└──────────────────────────────────────────────────────────────────┘
```

### States

- License-PDF link absent: hide the download button, don't render an empty placeholder.
- Leadership not yet supplied: section is hidden entirely, not shown with placeholders.

### Content references

Maps to [content-inventory.md §2 `/about`](content-inventory.md). Most copy is OWNER-supplied.

---

## 6. `/responsible-play`

### Goal

A real, useful page — not boilerplate. Modelled on NLA's framing (Act 722 + WLA principles) but in our own voice.

### Layout — desktop ≥ `lg`

```
┌──────────────────────────────────────────────────────────────────┐
│  HEADER                                                                      │
├──────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ⬜ HERO                                                                      │
│     • Title (Fraunces, text-5xl): "Play within your means."                  │
│     • Lead: 1-paragraph framing — calm, not lecturing                        │
│     • [18+ badge — large, prominent]                                         │
│                                                                              │
├──────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ⬜ WHO CAN PLAY (age requirement)                                            │
│     • "You must be 18 or over to play any NLA-licensed game."                │
│     • Short paragraph on enforcement at agents and POS                       │
│                                                                              │
├──────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ⬜ PLAY WITHIN YOUR MEANS                                                    │
│     • 3–5 plain-English guidance points (cards, no icons-as-decoration)      │
│     • Card 1: Set a budget                                                   │
│     • Card 2: Play for fun, not to recover losses                            │
│     • Card 3: Take breaks                                                    │
│     • Card 4: Talk to someone if it's not fun any more                       │
│                                                                              │
├──────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ⬜ IF YOU NEED HELP                                                          │
│     • Heading: "Support resources"                                           │
│     • List of Ghana-specific helplines / support orgs (OWNER to supply)      │
│     • Each: name, phone, hours, brief description of what they offer         │
│     • Self-exclusion section (OWNER decides: in-house mechanism, refer to    │
│       NLA, or refer external)                                                │
│                                                                              │
├──────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ⬜ REPORT UNDERAGE PLAY                                                      │
│     • One-sentence framing                                                   │
│     • Contact route: phone / email / form (OWNER)                            │
│                                                                              │
├──────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ⬜ OUR REGULATORY COMMITMENTS                                                │
│     • 1-paragraph alignment with WLA Responsible Gaming Principles           │
│     • Reference to Act 722 (link)                                            │
│     • Reference to WLA Level 2 RG Framework                                  │
│     • Charity-status disclosure                                              │
│                                                                              │
├──────────────────────────────────────────────────────────────────┤
│  FOOTER                                                                      │
└──────────────────────────────────────────────────────────────────┘
```

### Visual / motion notes

- No motion on this page beyond the global page-transition. The tone is calm and serious; animation here would feel inappropriate.
- The 18+ badge is rendered as a real component, not an icon — `--brand-primary` background, white text, `radius-md`, `space-6` padding.
- This page is linked from every game page, the results page, and the footer (per [nla-compliance.md §3](nla-compliance.md)).

### States

- Support helplines not yet supplied: section reads "Support resources will be added before launch — contact us in the meantime." This is acceptable for the discovery / wireframe phase but **must be filled before launch** (compliance gate).

### Components used

`[Header]` `[ResponsiblePlayHero]` `[GuidanceCard]` `[SupportResourceList]` `[Footer]`

### Content references

Maps to [content-inventory.md §2 `/responsible-play`](content-inventory.md). Several blocks are MANDATORY before launch — see [nla-compliance.md §3](nla-compliance.md).

---

## Cross-cutting wireframe notes

### Mandatory disclosures (every page)

All six pages render the global `[Footer]` with: NLA license number, 18+ badge, Responsible play link, charity-status line, operator legal name. No exceptions.

### Trust strip placement

Reused on `/`, every `/games/[slug]`, and `/results`. Always visible above the footer on those pages. Specifically: NOT on `/about` (the License & Regulation section replaces it) and NOT on `/responsible-play` (the page itself is the trust statement).

### Page-transition shared element

`[LatestDrawCard]` carries a `layoutId` so it morphs cleanly across:

- `/` (results widget on the home page)
- `/results` (latest draw hero strip)
- `/results/[slug]` (single hero)
- `/games/[slug]` (recent results section, top entry)

### Loading philosophy

Skeletons over spinners. Per-component, never page-blocking. Failed fetches show last-good-data plus a discreet "couldn't refresh" line — never a blank state, never a scary modal.

### Reduced motion

`prefers-reduced-motion: reduce` swaps:

- Digit-reveal animation → instant render
- Hero parallax → static image
- Card hover lift → colour change only
- Page transitions → cross-fade only

### Accessibility specifics for these pages

- Number chips on `/results` have `aria-label="Winning number {n}"`.
- The countdown to next draw on `/` and `/results` is announced via `aria-live="polite"` only on minute boundaries (otherwise screen readers spam every second).
- Filter bars on `/games` and `/results` are keyboard-traversable in document order; chip toggles use `aria-pressed`.
- The 18+ badge is real text, not an icon, so it announces correctly.

---

## Definition of "wireframes complete"

- [X] Six pages specified: Home, Games, Game Detail, Results, About, Responsible Play.
- [X] Each page documents structure, components, breakpoint behaviour, states, and content references.
- [X] Cross-cutting concerns called out (footer disclosures, transitions, reduced motion, a11y).
- [ ] Owner sign-off on the structure of these six pages.
- [ ] **Then** §8 step 4 — high-fidelity visual design — can begin.
