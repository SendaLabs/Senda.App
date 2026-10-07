import { z } from "zod";

export const PAYMENT_ASSETS = ["USDC", "XLM"] as const;
export type PaymentAsset = (typeof PAYMENT_ASSETS)[number];

/** Stellar account IDs are base32 strkeys starting with "G". */
export const stellarAccountIdSchema = z
  .string()
  .trim()
  .regex(/^G[A-Z2-7]{55}$/, "Expected a Stellar public key");

/** Decimal string with up to 7 fractional digits (Stellar precision). */
export const amountSchema = z
  .string()
  .trim()
  .regex(/^(?!0+(?:\.0+)?$)\d{1,12}(?:\.\d{1,7})?$/, "Expected a positive amount");

export const createPaymentIntentSchema = z.object({
  companyId: z.string().trim().min(1).max(64),
  destination: stellarAccountIdSchema,
  asset: z.enum(PAYMENT_ASSETS),
  amount: amountSchema,
  memo: z.string().trim().max(28).optional(),
});
export type CreatePaymentIntentDto = z.infer<typeof createPaymentIntentSchema>;
