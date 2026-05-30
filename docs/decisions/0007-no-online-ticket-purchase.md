# 0007 — No online ticket purchase in this phase

**Status:** Accepted (per super prompt §9, 2026-04-29)

## Context

A natural reading of "lottery website" includes online ticket purchase. The super prompt explicitly defers this:

> Do not build a ticket-purchase flow in this phase. This site is **brochure + results display + agent locator**, not a transactional gambling platform. Selling tickets directly online is a separate licensing question.

## Decision

Build no purchase flow, no cart, no payment integration in this phase. Replace any "Buy" CTA pattern from reference sites (myalphaonline, agentlotto) with information-led equivalents:

- "Find an agent" instead of "Buy now"
- "How to play via USSD ({code})" for USSD-only games (Lucky 3, Daywa 5/39 Direct)
- "How to play via POS" for POS-only games (Super 6)

The channel-aware CTA on `/games/[slug]` is the explicit affordance for this — no game tile sends the user toward purchase, only toward learning where they CAN play.

## Consequences

- The Supabase schema does not include `orders`, `payments`, `tickets`, or wallet-related tables. Adding them later is a separate migration.
- The site stays under the lighter regulatory regime appropriate to a marketing / information property; transactional gambling has separate NLA licensing and KYC obligations.
- The Stripe / Flutterwave / Paystack integrations one would normally include are deliberately absent. Don't add them speculatively.
- If purchase is added later, it's a discrete project — re-evaluate the entire IA, regulatory posture, and the visual treatment of "play" vs "view" CTAs.
