import { z } from "zod";

export const countryCodeSchema = z
  .string()
  .trim()
  .toUpperCase()
  .regex(/^[A-Z]{2}$/, "Expected an ISO 3166-1 alpha-2 country code");

export const createCompanySchema = z.object({
  legalName: z.string().trim().min(2).max(200),
  taxId: z.string().trim().min(2).max(32).optional(),
  country: countryCodeSchema,
});
export type CreateCompanyDto = z.infer<typeof createCompanySchema>;

export const companyIdSchema = z.string().trim().min(1).max(64);
