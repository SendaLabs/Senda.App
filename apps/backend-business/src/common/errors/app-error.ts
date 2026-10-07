import { HttpStatus } from "@nestjs/common";
import type { ErrorCode, ErrorDetail } from "@senda/shared";

export const ERROR_STATUS: Record<ErrorCode, HttpStatus> = {
  VALIDATION_FAILED: HttpStatus.BAD_REQUEST,
  UNAUTHENTICATED: HttpStatus.UNAUTHORIZED,
  FORBIDDEN: HttpStatus.FORBIDDEN,
  NOT_FOUND: HttpStatus.NOT_FOUND,
  CONFLICT: HttpStatus.CONFLICT,
  PAYLOAD_TOO_LARGE: HttpStatus.PAYLOAD_TOO_LARGE,
  RATE_LIMITED: HttpStatus.TOO_MANY_REQUESTS,
  NOT_IMPLEMENTED: HttpStatus.NOT_IMPLEMENTED,
  SERVICE_UNAVAILABLE: HttpStatus.SERVICE_UNAVAILABLE,
  INTERNAL: HttpStatus.INTERNAL_SERVER_ERROR,
};

/**
 * Domain error thrown by services. The message is returned to clients,
 * so it must never include secrets or internal identifiers.
 */
export class AppError extends Error {
  readonly status: HttpStatus;

  constructor(
    readonly code: ErrorCode,
    message: string,
    readonly details?: ErrorDetail[],
    options?: { cause?: unknown },
  ) {
    super(message, options);
    this.name = "AppError";
    this.status = ERROR_STATUS[code];
  }

  static notImplemented(feature: string): AppError {
    return new AppError("NOT_IMPLEMENTED", `${feature} is not available yet.`);
  }

  static notFound(resource: string): AppError {
    return new AppError("NOT_FOUND", `${resource} was not found.`);
  }
}
