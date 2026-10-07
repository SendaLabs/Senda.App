import {
  type ArgumentsHost,
  Catch,
  type ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from "@nestjs/common";
import { ThrottlerException } from "@nestjs/throttler";
import type { ApiErrorResponse, ErrorCode } from "@senda/shared";
import type { Request, Response } from "express";

import { AppError, ERROR_STATUS } from "../errors/app-error";

const STATUS_TO_CODE: Partial<Record<number, ErrorCode>> = {
  [HttpStatus.BAD_REQUEST]: "VALIDATION_FAILED",
  [HttpStatus.UNAUTHORIZED]: "UNAUTHENTICATED",
  [HttpStatus.FORBIDDEN]: "FORBIDDEN",
  [HttpStatus.NOT_FOUND]: "NOT_FOUND",
  [HttpStatus.CONFLICT]: "CONFLICT",
  [HttpStatus.PAYLOAD_TOO_LARGE]: "PAYLOAD_TOO_LARGE",
  [HttpStatus.TOO_MANY_REQUESTS]: "RATE_LIMITED",
  [HttpStatus.NOT_IMPLEMENTED]: "NOT_IMPLEMENTED",
  [HttpStatus.SERVICE_UNAVAILABLE]: "SERVICE_UNAVAILABLE",
};

const PUBLIC_MESSAGES: Record<ErrorCode, string> = {
  VALIDATION_FAILED: "The request is invalid.",
  UNAUTHENTICATED: "Authentication is required.",
  FORBIDDEN: "You do not have access to this resource.",
  NOT_FOUND: "The requested resource was not found.",
  CONFLICT: "The request conflicts with the current state.",
  PAYLOAD_TOO_LARGE: "The request body is too large.",
  RATE_LIMITED: "Too many requests. Try again later.",
  NOT_IMPLEMENTED: "This feature is not available yet.",
  SERVICE_UNAVAILABLE: "The service is temporarily unavailable.",
  INTERNAL: "An unexpected error occurred.",
};

/** Body-parser errors carry a numeric `status` but are not HttpExceptions. */
function statusFromUnknown(error: unknown): number | undefined {
  if (typeof error !== "object" || error === null) return undefined;
  const status = (error as { status?: unknown }).status;
  return typeof status === "number" && status >= 400 && status < 500
    ? status
    : undefined;
}

/**
 * Single place that turns any thrown value into the public error contract.
 * Unknown errors are logged with their stack and returned as INTERNAL so
 * implementation details never reach the client.
 */
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const http = host.switchToHttp();
    const request = http.getRequest<Request>();
    const response = http.getResponse<Response>();
    const requestId = typeof request.id === "string" ? request.id : undefined;

    const body = this.toErrorBody(exception);
    const status = ERROR_STATUS[body.code];

    if (exception instanceof AppError) {
      if (status >= HttpStatus.INTERNAL_SERVER_ERROR) {
        this.logger.warn({ code: body.code, requestId }, exception.message);
      }
    } else if (status >= HttpStatus.INTERNAL_SERVER_ERROR) {
      this.logger.error(
        { err: exception, requestId, path: request.url },
        "Unhandled error",
      );
    }

    const payload: ApiErrorResponse = {
      error: { ...body, ...(requestId ? { requestId } : {}) },
    };
    response.status(status).json(payload);
  }

  private toErrorBody(exception: unknown): ApiErrorResponse["error"] {
    if (exception instanceof AppError) {
      return {
        code: exception.code,
        message: exception.message,
        ...(exception.details ? { details: exception.details } : {}),
      };
    }

    if (exception instanceof ThrottlerException) {
      return { code: "RATE_LIMITED", message: PUBLIC_MESSAGES.RATE_LIMITED };
    }

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : statusFromUnknown(exception);
    const code = (status !== undefined && STATUS_TO_CODE[status]) || "INTERNAL";

    return { code, message: PUBLIC_MESSAGES[code] };
  }
}
