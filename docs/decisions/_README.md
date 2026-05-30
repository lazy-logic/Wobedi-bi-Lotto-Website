# Architecture Decision Records (ADRs)

Light-weight log of decisions that *aren't* obvious from reading the code. Use these when a future developer (including future-you) needs the *why* behind a choice.

## When to write one

- A non-default architectural choice (e.g. "we picked X over Y because Z")
- A constraint imposed by a stakeholder, the regulator, or the brand
- A reversible decision that should still be revisitable later
- A trade-off where the loser is plausible enough to come back around

## When NOT to write one

- It's already documented in CLAUDE.md, the super prompt, or another doc
- It's obvious from the code
- It's an implementation detail that won't outlive a single sprint

## Format

One file per decision, numbered sequentially. Each ADR has:

- **Status:** Proposed / Accepted / Superseded by [N]
- **Context:** What's the situation? What pressure is on the decision?
- **Decision:** What we're doing.
- **Consequences:** What this enables, what it costs, what's now harder.

## Index

| # | Title | Status |
|---|-------|--------|
| [0001](0001-png-only-logo-format.md) | PNG-only logo format | Accepted |
| [0002](0002-fraunces-inter-type-pair.md) | Fraunces + Inter type pair | Superseded by [0009](0009-montserrat-inter-type-pair.md) |
| [0003](0003-cool-grey-neutral-ramp.md) | Cool-grey neutral ramp | Accepted |
| [0004](0004-featured-games-selection.md) | Featured games selection | Accepted |
| [0005](0005-square-number-chips.md) | Square (not rounded) number chips | Accepted |
| [0006](0006-supabase-schema-shape.md) | Supabase schema shape | Accepted |
| [0007](0007-no-online-ticket-purchase.md) | No online ticket purchase in this phase | Accepted |
| [0008](0008-conditional-header-footer.md) | Conditional Header/Footer rather than route groups | Accepted |
| [0009](0009-montserrat-inter-type-pair.md) | Montserrat + Inter type pair | Superseded by [0010](0010-outfit-montserrat-type-pair.md) |
| [0010](0010-outfit-montserrat-type-pair.md) | Outfit + Montserrat type pair | Accepted |
