import type { PaymentAsset } from "@senda/shared";

export const STELLAR_GATEWAY = Symbol("STELLAR_GATEWAY");

export interface PaymentInstruction {
  /** Idempotency key; the same reference must never settle twice. */
  reference: string;
  destination: string;
  asset: PaymentAsset;
  /** Decimal string with Stellar precision (7 digits). */
  amount: string;
  memo?: string;
}

export interface PreparedTransaction {
  /** Unsigned transaction envelope (XDR, base64) for the client to sign. */
  xdr: string;
  networkPassphrase: string;
  expiresAt: Date;
}

export interface SubmittedTransaction {
  hash: string;
  ledger: number;
}

/**
 * Boundary between business logic and Stellar/Soroban. Services depend on
 * this interface only, so the SDK can be swapped or mocked in tests.
 * The backend never holds user signing keys: it prepares, the client signs.
 */
export interface StellarGateway {
  readonly isConfigured: boolean;
  preparePayment(instruction: PaymentInstruction): Promise<PreparedTransaction>;
  submitSigned(xdr: string): Promise<SubmittedTransaction>;
}
