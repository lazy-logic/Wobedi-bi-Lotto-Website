# Design Brief — Wobedi Bi Lotto website

**Status:** Discovery output. Not a final design spec. To be reviewed and signed off by the project owner before any high-fidelity design work begins (per §11 of `AccurateGiant_SuperPrompt.md`).

**Inputs:** the five reference sites in §2, with text extracted into `public/inspiration/<source>/extracted.md`. Imagery has not been captured — see `public/inspiration/_README.md` for why and what's needed manually.

---

## 1. Project intent in one sentence

A modern, charity-led marketing and information site for an NLA-licensed Ghanaian lotto operator — quietly premium, calm, optimistic, and deliberately distant from the noisy, neon "scratch-card" aesthetic of legacy lottery sites.

## 2. Three positioning truths

1. **Charity-first, not gambling-first.** The homepage hero leads with mission, not jackpots. Audited giving and licensed status carry equal weight to the games themselves.
2. **Information site, not transactional site.** No buy flow, no online ticketing. Every game tile points to *information*, not checkout. (Per §9 of the super prompt — selling tickets online is a separate licensing question, deferred.)
3. **Built for trust and regulators, not for hype.** NLA license number, 18+ badge, and a real `/responsible-play` page are first-class — present on every relevant page, not buried in the footer fine print.

---

## 3. Reference-by-reference: keep, discard, modernise

### 3.1 myalphaonline.com (Alpha Lotto)

**Role:** Local Ghanaian lotto site. Content + IA reference only.

**Keep:**
- Multi-channel play model in copy (online · USSD · agent) — Ghanaian users expect all three.
- Multiple contact phone numbers in footer (local convention).
- "18+" and "Play responsibly" present in the footer.

**Discard:**
- The visual design wholesale.
- Ticket-purchase CTA ("Buy Tickets Now") — out of scope.
- App-download promotion — no app in this phase.
- Vague "Transparent / Fair / Professional" tagline — we need sharper, charity-led language.

**Modernise:**
- Replace "Buy" with information-first CTAs ("See draw schedule", "Find an agent", "View results").
- Replace generic value words with one mission line tied to charity outcomes.

### 3.2 theluckiestafrica.com

**Role:** Was meant to inform Africa-focused mood and tone. **Capture failed** (SPA / bot-blocked). Documented in `public/inspiration/theluckiestafrica/extracted.md`. Excluded from this brief until a manual visit happens or the owner nominates a substitute.

### 3.3 agentlotto.com

**Role:** UI/UX pattern reference (catalogue + results layout).

**Keep:**
- Tile composition — logo, schedule, latest result, "view details".
- Inline number-chip rendering for winning numbers.
- Filter tabs over the results archive (Date · Game).
- Distinguished bonus-ball treatment.

**Discard:**
- Multi-region grouping (irrelevant — single operator).
- Syndicates / live casino / instant games — not in scope.
- Currency selector — GHS only.
- All "Play" / "Pick numbers" / "Buy" CTAs.

**Modernise:**
- Replace "Play" CTA with "View game" + "Find an agent" pair.
- Numbers reveal animation (one digit at a time) per super-prompt §3.

### 3.4 nla.com.gh/products

**Role:** **Authoritative game catalogue.** Defines what `/games` and the `games` Supabase table must contain.

**Keep:**
- All 15 games captured (see `content-inventory.md` §1).
- The launch-year / origin story per game — useful narrative on detail pages.
- Local-language names (e.g. *Aseda*) — explain rather than translate.
- Channel callouts (USSD code, POS-only restriction).

**Discard:**
- Dense, dated table presentation. We render a product grid.

**Open data gaps (TBC, must be sourced before content load):**
- Ticket prices (GHS) for every game.
- Exact draw times for every game.
- Per-game prize structures.

### 3.5 nla.com.gh + /winning-numbers

**Role:** Authoritative results data structure and freshness benchmark.

**Keep:**
- Underlying data shape: Draw Date · Draw Name · Numbers · Draw Number.
- Three-filter pattern: draw name, start date, end date.
- Act 722 + WLA Level 2 RG framework framing (compliance backbone).

**Discard:**
- The unstyled table-first presentation.
- Generic "VIEW ALL" CTA wording.
- "Searching…" placeholder UX (replaced with skeletons).

**Modernise:**
- "Latest draw" hero card per game above the dense archive table.
- Per-game countdown to next draw.
- One-digit-at-a-time number reveal animation (GSAP, per §5 of super prompt).
- Permalinks per game (`/results/<game-slug>`).

---

## 4. Information architecture decisions

We adopt the IA from §4 of the super prompt verbatim — the page list is sound. Two refinements based on the reference research:

1. **`/games/[slug]` should be opinionated, not just a stat sheet.** Each detail page reads as: hero (origin story + schedule + ticket price + agent CTA) → how to play → recent results for this game → trust strip. Borrowed from the rich per-game storytelling implied in the NLA catalogue copy.
2. **`/results` should expose a deep-linkable per-game view.** The flat archive at nla.com.gh/winning-numbers is easy to under-use. Combine a hero "latest" card per game with a filterable archive beneath. Clicking a game's hero card deep-links to its own `/results/<game-slug>` page.

## 5. Visual language

Brand kit partially landed on 2026-04-29 — primary logo and two brand colours supplied. Full token set documented in [brand-tokens.md](brand-tokens.md).

- **Palette:** `--brand-primary: #013982` (deep navy) and `--brand-primary-deep: #00347B` (deeper navy), blended with a cool-neutral grey ramp (`--brand-ink` through `--brand-border-strong`). Two-tone palette by design — the system leans on weight, scale, and motion for contrast rather than a third hue.
- **Logo:** [public/brand/ag-logo.png](../public/brand/ag-logo.png) — full lockup. **PNG only — no SVG, per owner direction.** Mono / inverse PNGs and a monogram-only PNG still needed (see [brand-tokens.md](brand-tokens.md) §2).
- **Type:** modern sans for body (Inter, default proposal). One expressive display face for headlines (Fraunces, default proposal). Configured via `next/font`. **Pending owner confirmation.**
- **Motion:** restrained. GSAP for digit-by-digit number reveal on the results page. Framer Motion for component transitions. Hero parallax kept subtle. Honour `prefers-reduced-motion` everywhere.
- **Imagery:** real Ghanaian people and locations — placeholder until photography is sourced. No generic stock-money imagery.

## 6. What's *not* decided yet (open questions for the owner)

1. **Brand assets** — primary logo (PNG), two brand colours, and grey neutral ramp confirmed 2026-04-29 (see [brand-tokens.md](brand-tokens.md)). **Still needed:** mono / inverse PNG variants, monogram-only PNG for favicon, three DRAFT state colours, final type pairing. PNG-only — no SVG.
2. **NLA logo permission.** Per super prompt §7, the official NLA logo can only appear with written permission. Has this been requested? On what timeline?
3. **NLA data permission.** Mirroring winning numbers from nla.com.gh requires the owner to confirm data-use permission and the agreed refresh cadence. Without it, ingest is manual-only.
4. **theluckiestafrica.com fallback.** Either a manual visit + capture, or owner nominates a substitute Africa-modern reference.
5. **Game data gaps** — ticket prices, exact draw times, prize structures. Where do these come from? NLA documentation? Direct contact?
6. **Agent network data.** Locator page needs a list of Accra agents. Source?
7. **Charity disclosures** — exact license number, audited annual giving figures, leadership names + bios. Owner to supply.
8. **Photography.** Hero / editorial photography of real Ghanaian people. Commission, source, or stock?
9. **Admin users.** §5 of the super prompt says "single admin role" for `/admin`. Confirm — or is multi-editor needed for results publishing?
10. **i18n.** English first per super prompt §5. Confirm French / local-language launch is a future-only concern (so we scaffold but don't ship translations now).

## 7. Definition of "discovery complete"

Per super prompt §11 and §8 step 1, discovery is complete when:

- [x] Five reference sites researched and notes captured under `public/inspiration/<source>/`. *(4/5 — `theluckiestafrica.com` failed; manual visit pending.)*
- [ ] Image / screenshot capture for each source. *(Blocked — needs human or headless-browser tool. See `public/inspiration/_README.md`.)*
- [x] `docs/design-brief.md` (this file).
- [x] `docs/content-inventory.md`.
- [x] `docs/nla-compliance.md`.
- [ ] Owner sign-off on IA, content inventory, and the regulatory checklist.

**Hard stop until owner sign-off.** No high-fidelity design or component work begins before that.
