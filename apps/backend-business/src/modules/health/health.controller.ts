import { Controller, Get } from "@nestjs/common";
import { SkipThrottle } from "@nestjs/throttler";

import {
  HealthService,
  type LivenessReport,
  type ReadinessReport,
} from "./health.service";

@SkipThrottle()
@Controller()
export class HealthController {
  constructor(private readonly health: HealthService) {}

  @Get()
  liveness(): LivenessReport {
    return this.health.liveness();
  }

  @Get("ready")
  readiness(): Promise<ReadinessReport> {
    return this.health.readiness();
  }
}
