import { Inject, Injectable } from "@nestjs/common";
import type { CreatePaymentIntentDto } from "@senda/shared";

import { AppError } from "../../common/errors/app-error";
import {
  STELLAR_GATEWAY,
  type StellarGateway,
} from "../../infrastructure/stellar/stellar.gateway";

export interface PaymentIntentView {
  id: string;
  status: "awaiting_signature";
  /** Unsigned XDR the client signs with its own wallet. */
  xdr: string;
  networkPassphrase: string;
  expiresAt: string;
}

@Injectable()
export class PaymentsService {
  constructor(
    @Inject(STELLAR_GATEWAY) private readonly stellar: StellarGateway,
  ) {}

  /**
   * Planned: authorize the caller's membership in dto.companyId, persist the
   * intent, then build the envelope with this.stellar.preparePayment().
   */
  createIntent(_dto: CreatePaymentIntentDto): Promise<PaymentIntentView> {
    return Promise.reject(AppError.notImplemented("Corporate payments"));
  }
}
