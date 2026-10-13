/**
 * Marketing CTA destination.
 *
 * NEXT_PUBLIC_PRODUCT_START_URL (optional):
 *   Overrides where primary start CTAs go. Defaults to the landing WhatsApp deep link.
 */

/** Live WhatsApp bot (+54 9 11 7812-2756). */
export const WHATSAPP_START_URL =
  "https://wa.me/5491178122756?text=Hola!%20Quiero%20comenzar%20a%20operar%20con%20Senda" as const;
export const PRODUCT_START_FALLBACK = WHATSAPP_START_URL;

/** Absolute path or hash/URL for primary "Empezar" CTAs. */
export function getMarketingStartHref(): string {
  return (
    process.env.NEXT_PUBLIC_PRODUCT_START_URL?.trim() ?? PRODUCT_START_FALLBACK
  );
}

export function isInternalMarketingPath(href: string): boolean {
  return href.startsWith("/") && !href.startsWith("//");
}
