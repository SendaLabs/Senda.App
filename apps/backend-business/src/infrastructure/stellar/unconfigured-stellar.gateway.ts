import { AppError } from "../../common/errors/app-error";
import type {
  PreparedTransaction,
  StellarGateway,
  SubmittedTransaction,
} from "./stellar.gateway";

/** Placeholder until the Soroban RPC integration lands. */
export class UnconfiguredStellarGateway implements StellarGateway {
  readonly isConfigured = false;

  preparePayment(): Promise<PreparedTransaction> {
    return Promise.reject(AppError.notImplemented("Stellar payments"));
  }

  submitSigned(): Promise<SubmittedTransaction> {
    return Promise.reject(AppError.notImplemented("Stellar payments"));
  }
}
