import type { NestExpressApplication } from "@nestjs/platform-express";
import helmet from "helmet";
import { Logger } from "nestjs-pino";

import { AllExceptionsFilter } from "../common/filters/all-exceptions.filter";
import { REQUEST_ID_HEADER } from "../common/logging/logger.options";
import type { AppConfig } from "../config/env";

export const API_PREFIX = "v1";
const JSON_BODY_LIMIT = "100kb";

/** Shared by main.ts and e2e tests so both exercise the same HTTP stack. */
export function configureApp(
  app: NestExpressApplication,
  config: AppConfig,
): void {
  app.useLogger(app.get(Logger));

  app.disable("x-powered-by");
  if (config.trustProxy) app.set("trust proxy", 1);

  app.use(helmet());
  app.useBodyParser("json", { limit: JSON_BODY_LIMIT });

  app.enableCors({
    origin: config.corsOrigins.length > 0 ? config.corsOrigins : false,
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", REQUEST_ID_HEADER],
    exposedHeaders: [REQUEST_ID_HEADER],
    maxAge: 600,
  });

  app.setGlobalPrefix(API_PREFIX);
  app.useGlobalFilters(new AllExceptionsFilter());
  app.enableShutdownHooks();
}
