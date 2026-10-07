import "reflect-metadata";

import { existsSync } from "node:fs";

import { NestFactory } from "@nestjs/core";
import type { NestExpressApplication } from "@nestjs/platform-express";

import { AppModule } from "./app.module";
import { configureApp } from "./bootstrap/configure-app";
import { APP_CONFIG } from "./config/config.module";
import { type AppConfig, InvalidEnvironmentError } from "./config/env";

async function bootstrap(): Promise<void> {
  if (existsSync(".env")) process.loadEnvFile(".env");

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    abortOnError: false,
    bufferLogs: true,
    bodyParser: false,
  });
  const config = app.get<AppConfig>(APP_CONFIG);

  configureApp(app, config);
  await app.listen(config.port, config.host);
}

bootstrap().catch((error: unknown) => {
  // The app logger may not exist yet (e.g. invalid env), so use stderr.
  if (error instanceof InvalidEnvironmentError) console.error(error.message);
  else console.error("Failed to start backend-business", error);
  process.exit(1);
});
