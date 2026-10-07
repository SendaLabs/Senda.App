import type { Routes } from "@nestjs/core";

import { AuthModule } from "./modules/auth/auth.module";
import { CompaniesModule } from "./modules/companies/companies.module";
import { HealthModule } from "./modules/health/health.module";
import { PaymentsModule } from "./modules/payments/payments.module";

/** Public URL map. Every path is served under the global `/v1` prefix. */
export const APP_ROUTES: Routes = [
  { path: "health", module: HealthModule },
  { path: "auth", module: AuthModule },
  { path: "companies", module: CompaniesModule },
  { path: "payments", module: PaymentsModule },
];

export const ROUTE_MODULES = [
  HealthModule,
  AuthModule,
  CompaniesModule,
  PaymentsModule,
];
