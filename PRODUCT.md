# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary (hackathon / demo): families abroad (Spain, Italy, Chile, US) sending to recipients who want pesos in Mercado Pago — real corridor, small TAM vs Mexico/CA.

Secondary: Argentine freelancers/contractors cashing out USD or stables to spendable pesos — larger crypto flow, already competitive (Wise, Payoneer, Belo, Lemon, Buenbit, Takenos); BCRA friction lower than a year ago.

Audience: Argentina Builder Challenge judges. Pitch honesty: we are filling Stellar’s consumer-facing gap in Argentina (Felix pattern, localized), not claiming an unsolved remittance desert.

## Product Purpose

Senda is a B2C remittance product: send money to Argentina from WhatsApp. Recipients get pesos via Mercado Pago. This repository ships a marketing and pitch landing only. Remittance, blockchain, and wallet logic are out of scope here.

## Positioning

Felix-like WhatsApp-first remittances on Stellar, localized to Argentina before Felix’s declared map includes it. Peanut already proves Mercado Pago last-mile demand in AR on non-Stellar rails. Differentiator vs both: amount privacy via Confidential Token (MVP). Stellar and stablecoins stay invisible to the user.

## Operating Context

Visitor arrives on `/es` or `/en` to understand the offer and act (WhatsApp or email). T3 stack (Next.js, tRPC, Prisma, NextAuth) remains in the repo and must keep compiling. No product checkout in this surface.

## Capabilities and Constraints

- Marketing site only. Do not implement transfers, KYC, or chain writes.
- WhatsApp is the product channel. No new consumer app.
- Quotes and rates on the page are illustrative unless labeled otherwise.
- WhatsApp number is not confirmed. Contact fallback: sendanetwork@gmail.com.
- Do not invent customers, volume, licenses, or live FX.

## Brand Commitments

- Reuse Senda landing identity: cream/forest/charcoal, Geist + Georgia italic, logoverde / logoblanco / favicon, team integrantes (Emilio Alfaro CPO, Delfina Corradini CEO, Nicolas Bustelo CTO) and portraits, LatAm map.
- Voice: Spanish Rioplatense, professional, warm. Voseo.
- Header structure close to Felix Pago (logo left, nav, primary CTA).
- Binding references: senda-landing.vercel.app, felixpago.com, useazza.com cross-border page.

## Evidence on Hand

- Brand assets in `public/images` and `public/maps` copied from senda-landing.vercel.app.
- Team names, roles, and socials from that landing. Shared manifesto only. No individual bios.
- No real remittance testimonials, licenses, or production WhatsApp bot in this repo.
- Hackathon: Argentina Builder Challenge (BAF × Stellar), 12–26 Sep 2026. Mention lightly, not as a trophy.

## Product Principles

- Invisible rails: Stellar and stablecoins never lead the story.
- Familiar last mile: Mercado Pago is what the family sees.
- Chat is the product: every primary action goes to WhatsApp or the start section.
- Honest pitch: do not fabricate proof; label examples.
- Argentina first, more local rails later.

## Accessibility & Inclusion

WCAG AA contrast. Spanish `lang="es-AR"`. Keyboard focus and `prefers-reduced-motion`.
