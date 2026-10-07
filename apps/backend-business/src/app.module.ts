import { Module } from "@nestjs/common";
import { APP_GUARD, RouterModule } from "@nestjs/core";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import { LoggerModule } from "nestjs-pino";

import { APP_ROUTES, ROUTE_MODULES } from "./app.routes";
import { createLoggerOptions } from "./common/logging/logger.options";
import { APP_CONFIG, ConfigModule } from "./config/config.module";
import type { AppConfig } from "./config/env";
import { DatabaseModule } from "./infrastructure/database/database.module";
import { StellarModule } from "./infrastructure/stellar/stellar.module";

@Module({
  imports: [
    ConfigModule,
    LoggerModule.forRootAsync({
      inject: [APP_CONFIG],
      useFactory: (config: AppConfig) => createLoggerOptions(config),
    }),
    ThrottlerModule.forRootAsync({
      inject: [APP_CONFIG],
      useFactory: (config: AppConfig) => ({
        throttlers: [
          {
            name: "default",
            ttl: config.rateLimit.ttlMs,
            limit: config.rateLimit.limit,
          },
        ],
      }),
    }),
    DatabaseModule,
    StellarModule,
    ...ROUTE_MODULES,
    RouterModule.register(APP_ROUTES),
  ],
  providers: [{ provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule {}
