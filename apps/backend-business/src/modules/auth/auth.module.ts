import { Module } from "@nestjs/common";

import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { PasswordHasher } from "./password-hasher";

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    { provide: PasswordHasher, useFactory: () => new PasswordHasher() },
  ],
  exports: [PasswordHasher],
})
export class AuthModule {}
