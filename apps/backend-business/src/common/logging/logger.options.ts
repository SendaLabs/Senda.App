import { randomUUID } from "node:crypto";
import type { IncomingMessage, ServerResponse } from "node:http";

import { RequestMethod } from "@nestjs/common";
import type { Params } from "nestjs-pino";

import type { AppConfig } from "../../config/env";

export const REQUEST_ID_HEADER = "x-request-id";

/** Accept upstream IDs only when they are short and opaque. */
const SAFE_REQUEST_ID = /^[A-Za-z0-9._-]{8,64}$/;

function resolveRequestId(req: IncomingMessage, res: ServerResponse): string {
  const incoming = req.headers[REQUEST_ID_HEADER];
  const id =
    typeof incoming === "string" && SAFE_REQUEST_ID.test(incoming)
      ? incoming
      : randomUUID();
  res.setHeader(REQUEST_ID_HEADER, id);
  return id;
}

export function createLoggerOptions(config: AppConfig): Params {
  return {
    // Express 5 / path-to-regexp v8 wildcard syntax.
    forRoutes: [{ path: "{*path}", method: RequestMethod.ALL }],
    pinoHttp: {
      level: config.logLevel,
      genReqId: resolveRequestId,
      redact: {
        paths: [
          "req.headers.authorization",
          "req.headers.cookie",
          'res.headers["set-cookie"]',
          "*.password",
          "*.passwordHash",
          "*.token",
        ],
        censor: "[redacted]",
      },
      autoLogging: {
        ignore: (req) => req.url?.startsWith("/v1/health") ?? false,
      },
      ...(config.nodeEnv === "development"
        ? {
            transport: {
              target: "pino-pretty",
              options: { singleLine: true, translateTime: "SYS:HH:MM:ss" },
            },
          }
        : {}),
    },
  };
}
