/**
 * Marketing CTA destination switch.
 *
 * NEXT_PUBLIC_MARKETING_CTA_MODE:
 *   - "waitlist" (default) → primary start CTAs go to the waitlist page
 *   - "product"            → primary start CTAs go to the live product entry
 *
 * NEXT_PUBLIC_PRODUCT_START_URL (optional):
 *   Used when mode is "product". Defaults to the landing WhatsApp deep link.
 */

export type MarketingCtaMode = "waitlist" | "product";

export const WAITLIST_PATH = "/lista-de-espera" as const;
/** Live product entry already used by the landing CTAs. */
export const WHATSAPP_START_URL =
  "https://wa.me/15556186469?text=Hola!%20Quiero%20comenzar%20a%20operar%20con%20Senda" as const;
export const PRODUCT_START_FALLBACK = WHATSAPP_START_URL;

function readMode(): MarketingCtaMode {
  const raw = process.env.NEXT_PUBLIC_MARKETING_CTA_MODE?.trim().toLowerCase();
  if (raw === "product") return "product";
  return "waitlist";
}

export function getMarketingCtaMode(): MarketingCtaMode {
  return readMode();
}

/** Absolute path or hash/URL for primary "Empezar" CTAs. */
export function getMarketingStartHref(): string {
  if (readMode() === "product") {
    const product =
      process.env.NEXT_PUBLIC_PRODUCT_START_URL?.trim() ||
      PRODUCT_START_FALLBACK;
    return product;
  }
  return WAITLIST_PATH;
}

export function isInternalMarketingPath(href: string): boolean {
  return href.startsWith("/") && !href.startsWith("//");
}
