import { Inject, Injectable, type OnModuleDestroy } from "@nestjs/common";
import { createDatabaseClient, type PrismaClient } from "@senda/database";

import { APP_CONFIG } from "../../config/config.module";
import type { AppConfig } from "../../config/env";

/**
 * Owns the Prisma client for the process. Connection is lazy (first query),
 * so the API can boot and report readiness even when Postgres is down.
 */
@Injectable()
export class DatabaseService implements OnModuleDestroy {
  readonly client: PrismaClient;

  constructor(@Inject(APP_CONFIG) config: AppConfig) {
    this.client = createDatabaseClient({
      url: config.databaseUrl,
      log: config.isProduction ? ["error"] : ["error", "warn"],
    });
  }

  async isReachable(): Promise<boolean> {
    try {
      await this.client.$queryRaw`SELECT 1`;
      return true;
    } catch {
      return false;
    }
  }

  async onModuleDestroy(): Promise<void> {
    await this.client.$disconnect();
  }
}
