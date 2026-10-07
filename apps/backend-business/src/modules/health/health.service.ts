import { Injectable } from "@nestjs/common";

import { AppError } from "../../common/errors/app-error";
import { DatabaseService } from "../../infrastructure/database/database.service";

export interface LivenessReport {
  status: "ok";
  uptimeSeconds: number;
}

export interface ReadinessReport {
  status: "ready";
  checks: { database: "up" };
}

@Injectable()
export class HealthService {
  constructor(private readonly database: DatabaseService) {}

  liveness(): LivenessReport {
    return { status: "ok", uptimeSeconds: Math.round(process.uptime()) };
  }

  async readiness(): Promise<ReadinessReport> {
    if (!(await this.database.isReachable())) {
      throw new AppError("SERVICE_UNAVAILABLE", "Database is not reachable.");
    }
    return { status: "ready", checks: { database: "up" } };
  }
}
