import { z } from "zod";

export const emailSchema = z.string().trim().toLowerCase().email().max(254);

/** Bounded to keep password hashing cost predictable. */
export const passwordSchema = z.string().min(12).max(128);

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1).max(128),
});
export type LoginDto = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  fullName: z.string().trim().min(1).max(120).optional(),
});
export type RegisterDto = z.infer<typeof registerSchema>;
