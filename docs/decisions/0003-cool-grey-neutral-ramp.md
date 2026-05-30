# 0003 — Cool-grey neutral ramp

**Status:** Accepted (2026-04-29) · Revised under WObedibi rebrand (2026-05-28). The cool-neutral grey *intent* carries over — only the hex values were refined to sit with the new navies (`#013982` / `#00347B`) instead of the old `#013299`. The cyan-on-white limitation that originally motivated the ramp no longer applies because the cyan was removed from the palette. Current ramp lives in [docs/brand-tokens.md](../brand-tokens.md). Original AG-era context kept for the historical record.

## Context

The owner supplied two brand colours: `#013299` (deep blue, primary) and `#00B9EF` (cyan, secondary). A two-colour brand can't ship without a neutral system to host body text, surfaces, borders, and disabled states. The cyan additionally fails WCAG AA contrast on white at body-text size (~2.6:1), so it can't carry any text-on-paper duty.

## Decision

Adopt a seven-step cool-neutral grey ramp tuned to sit calmly next to `#013299` without picking up a competing tint. Tokens (with hex):

```
--brand-ink            #1A1F2B
--brand-ink-muted      #5B6473
--brand-paper          #FFFFFF
--brand-paper-muted    #F5F6F8
--brand-paper-sunken   #ECEEF2
--brand-border         #D9DDE5
--brand-border-strong  #A7AEBC
```

State colours (`--brand-success`, `--brand-warning`, `--brand-danger`) remain DRAFT pending owner confirmation.

## Consequences

- The grey ramp is locked. Components consume the tokens, never literal hex.
- Cool-leaning greys mean the deep blue does not look "warm" by contrast — it stays crisp.
- Any future re-skin to a warmer brand colour will need the grey ramp revisited; the cool tilt is currently a function of pairing with deep blue.
- Cyan's body-text limitation is encoded in the Badge component variants and called out in [docs/brand-tokens.md §1](../brand-tokens.md). Don't loosen this.
