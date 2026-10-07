import { z } from "zod";

const LOG_LEVELS = [
  "fatal",
  "error",
  "warn",
  "info",
  "debug",
  "trace",
  "silent",
] as const;

const booleanString = z
  .enum(["true", "false"])
  .default("false")
  .transform((value) => value === "true");

/** Treats "" as "not set" so .env.example placeholders stay valid. */
const optionalUrl = z
  .string()
  .trim()
  .transform((value) => (value === "" ? undefined : value))
  .pipe(z.string().url().optional());

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  HOST: z.string().trim().min(1).default("0.0.0.0"),
  PORT: z.coerce.number().int().min(1).max(65535).default(4000),
  LOG_LEVEL: z.enum(LOG_LEVELS).default("info"),
  CORS_ORIGINS: z
    .string()
    .default("")
    .transform((value) =>
      value
        .split(",")
        .map((origin) => origin.trim())
        .filter(Boolean),
    )
    .pipe(z.array(z.string().url())),
  TRUST_PROXY: booleanString,
  RATE_LIMIT_TTL_MS: z.coerce.number().int().positive().default(60_000),
  RATE_LIMIT_MAX: z.coerce.number().int().positive().default(100),
  DATABASE_URL: z
    .string()
    .url()
    .refine((value) => /^postgres(ql)?:\/\//.test(value), {
      message: "Expected a PostgreSQL connection string",
    }),
  STELLAR_NETWORK: z.enum(["testnet", "mainnet", "futurenet"]).default("testnet"),
  STELLAR_HORIZON_URL: optionalUrl.optional(),
  SOROBAN_RPC_URL: optionalUrl.optional(),
  BUSINESS_PAYMENTS_CONTRACT_ID: z
    .string()
    .trim()
    .transform((value) => (value === "" ? undefined : value))
    .pipe(
      z
        .string()
        .regex(/^C[A-Z2-7]{55}$/, "Expected a Soroban contract address")
        .optional(),
    )
    .optional(),
});

export type Env = z.infer<typeof envSchema>;

export interface AppConfig {
  nodeEnv: Env["NODE_ENV"];
  isProduction: boolean;
  host: string;
  port: number;
  logLevel: Env["LOG_LEVEL"];
  corsOrigins: string[];
  trustProxy: boolean;
  rateLimit: { ttlMs: number; limit: number };
  databaseUrl: string;
  stellar: {
    network: Env["STELLAR_NETWORK"];
    horizonUrl: string | undefined;
    sorobanRpcUrl: string | undefined;
    businessPaymentsContractId: string | undefined;
  };
}

export class InvalidEnvironmentError extends Error {
  constructor(public readonly issues: string[]) {
    super(`Invalid environment configuration:\n  - ${issues.join("\n  - ")}`);
    this.name = "InvalidEnvironmentError";
  }
}

/** Fails fast at boot; error messages never echo the offending values. */
export function loadConfig(source: NodeJS.ProcessEnv = process.env): AppConfig {
  const parsed = envSchema.safeParse(source);
  if (!parsed.success) {
    throw new InvalidEnvironmentError(
      parsed.error.issues.map(
        (issue) => `${issue.path.join(".") || "(root)"}: ${issue.message}`,
      ),
    );
  }

  const env = parsed.data;
  return {
    nodeEnv: env.NODE_ENV,
    isProduction: env.NODE_ENV === "production",
    host: env.HOST,
    port: env.PORT,
    logLevel: env.LOG_LEVEL,
    corsOrigins: env.CORS_ORIGINS,
    trustProxy: env.TRUST_PROXY,
    rateLimit: { ttlMs: env.RATE_LIMIT_TTL_MS, limit: env.RATE_LIMIT_MAX },
    databaseUrl: env.DATABASE_URL,
    stellar: {
      network: env.STELLAR_NETWORK,
      horizonUrl: env.STELLAR_HORIZON_URL,
      sorobanRpcUrl: env.SOROBAN_RPC_URL,
      businessPaymentsContractId: env.BUSINESS_PAYMENTS_CONTRACT_ID,
    },
  };
}
