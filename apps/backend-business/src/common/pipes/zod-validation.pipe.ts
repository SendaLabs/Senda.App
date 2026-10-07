import { Injectable, type PipeTransform } from "@nestjs/common";
import type { ZodType, ZodTypeDef } from "zod";

import { AppError } from "../errors/app-error";

/** Validates and normalizes a request part against a shared zod schema. */
@Injectable()
export class ZodValidationPipe<TOutput> implements PipeTransform<unknown, TOutput> {
  constructor(private readonly schema: ZodType<TOutput, ZodTypeDef, unknown>) {}

  transform(value: unknown): TOutput {
    const result = this.schema.safeParse(value);
    if (result.success) return result.data;

    throw new AppError(
      "VALIDATION_FAILED",
      "The request is invalid.",
      result.error.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message,
      })),
    );
  }
}
