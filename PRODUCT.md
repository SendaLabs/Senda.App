# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: people outside Argentina who need to send money home, and recipients in Argentina who want pesos in Mercado Pago. Secondary: Argentina Builder Challenge judges evaluating a B2C remittance pitch.

Inferred from the implementation brief (parent task). No live interview this session.

## Product Purpose

Senda is a B2C remittance product: send money to Argentina from WhatsApp. Recipients get pesos via Mercado Pago. This repository ships a marketing and pitch landing only. Remittance, blockchain, and wallet logic are out of scope here.

## Positioning

Felix Pago-like WhatsApp-first remittances, specialized on Argentina. Stellar and stablecoins move value under the hood and stay invisible to the user. Familiar last mile: Mercado Pago. Anyone in the world can send to Argentina now; later corridors receive on their local rails.

## Operating Context

Visitor arrives on `/` to understand the offer and act (WhatsApp or email). T3 stack (Next.js, tRPC, Prisma, NextAuth) remains in the repo and must keep compiling. No product checkout in this surface.

## Capabilities and Constraints

- Marketing site only. Do not implement transfers, KYC, or chain writes.
- WhatsApp is the product channel. No new consumer app.
- Quotes and rates on the page are illustrative unless labeled otherwise.
- WhatsApp number is not confirmed. Contact fallback: hello@senda.org.
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
