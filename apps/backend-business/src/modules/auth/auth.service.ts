import { Injectable } from "@nestjs/common";
import type { LoginDto, RegisterDto } from "@senda/shared";

import { AppError } from "../../common/errors/app-error";

export interface SessionResponse {
  userId: string;
  expiresAt: string;
}

/**
 * Planned flow: register hashes with PasswordHasher and creates the
 * BusinessUser; login verifies the hash and issues an opaque session token
 * whose SHA-256 is stored in BusinessSession (httpOnly cookie to the client).
 */
@Injectable()
export class AuthService {
  register(_dto: RegisterDto): Promise<SessionResponse> {
    return Promise.reject(AppError.notImplemented("Business registration"));
  }

  login(_dto: LoginDto): Promise<SessionResponse> {
    return Promise.reject(AppError.notImplemented("Business login"));
  }
}
