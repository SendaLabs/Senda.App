import { Global, Module } from "@nestjs/common";

import { STELLAR_GATEWAY } from "./stellar.gateway";
import { UnconfiguredStellarGateway } from "./unconfigured-stellar.gateway";

@Global()
@Module({
  providers: [
    { provide: STELLAR_GATEWAY, useClass: UnconfiguredStellarGateway },
  ],
  exports: [STELLAR_GATEWAY],
})
export class StellarModule {}
