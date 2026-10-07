import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { Throttle } from "@nestjs/throttler";
import {
  type LoginDto,
  loginSchema,
  type RegisterDto,
  registerSchema,
} from "@senda/shared";

import { ZodValidationPipe } from "../../common/pipes/zod-validation.pipe";
import { AuthService, type SessionResponse } from "./auth.service";

/** Credential endpoints get a stricter budget than the global limit. */
const CREDENTIALS_THROTTLE = { default: { limit: 10, ttl: 60_000 } };

@Controller()
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post("register")
  @Throttle(CREDENTIALS_THROTTLE)
  register(
    @Body(new ZodValidationPipe(registerSchema)) dto: RegisterDto,
  ): Promise<SessionResponse> {
    return this.auth.register(dto);
  }

  @Post("login")
  @HttpCode(HttpStatus.OK)
  @Throttle(CREDENTIALS_THROTTLE)
  login(
    @Body(new ZodValidationPipe(loginSchema)) dto: LoginDto,
  ): Promise<SessionResponse> {
    return this.auth.login(dto);
  }
}
