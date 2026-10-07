import { PrismaClient, type Prisma } from "@prisma/client";

export * from "@prisma/client";

export type DatabaseLogLevel = Prisma.LogLevel;

export interface CreateDatabaseClientOptions {
  /** Overrides DATABASE_URL, e.g. for tests or read replicas. */
  url?: string;
  log?: DatabaseLogLevel[];
}

export function createDatabaseClient(
  options: CreateDatabaseClientOptions = {},
): PrismaClient {
  return new PrismaClient({
    log: options.log ?? ["error"],
    ...(options.url ? { datasourceUrl: options.url } : {}),
  });
}
