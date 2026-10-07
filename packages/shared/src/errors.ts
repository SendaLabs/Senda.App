export const ERROR_CODES = [
  "VALIDATION_FAILED",
  "UNAUTHENTICATED",
  "FORBIDDEN",
  "NOT_FOUND",
  "CONFLICT",
  "PAYLOAD_TOO_LARGE",
  "RATE_LIMITED",
  "NOT_IMPLEMENTED",
  "SERVICE_UNAVAILABLE",
  "INTERNAL",
] as const;

export type ErrorCode = (typeof ERROR_CODES)[number];

export interface ErrorDetail {
  /** Dot-separated path of the offending field, empty for form-level issues. */
  path: string;
  message: string;
}

/** Body of every non-2xx response returned by Senda APIs. */
export interface ApiErrorResponse {
  error: {
    code: ErrorCode;
    message: string;
    requestId?: string;
    details?: ErrorDetail[];
  };
}
