#![no_std]
//! Settles corporate payments in one Stellar asset (e.g. the USDC SAC).
//!
//! Every payment carries a 32-byte `reference` generated off-chain by the
//! backend. The contract refuses to settle the same reference twice, so a
//! retried submission can never move funds again.
//!
//! The contract is immutable on purpose: no admin, no upgrade entrypoint.

use soroban_sdk::{
    contract, contracterror, contractevent, contractimpl, contracttype, token, Address, BytesN,
    Env,
};

/// ~30 days at 5s ledgers.
const RECEIPT_TTL_EXTEND_TO: u32 = 518_400;
/// Extend when fewer than ~7 days remain.
const RECEIPT_TTL_THRESHOLD: u32 = 120_960;

#[contracterror]
#[derive(Copy, Clone, Debug, Eq, PartialEq, PartialOrd, Ord)]
#[repr(u32)]
pub enum PaymentError {
    InvalidAmount = 1,
    SamePayerAndPayee = 2,
    DuplicateReference = 3,
}

#[contracttype]
#[derive(Clone)]
enum DataKey {
    Token,
    Receipt(BytesN<32>),
}

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct Receipt {
    pub payer: Address,
    pub payee: Address,
    pub amount: i128,
    pub ledger: u32,
}

#[contractevent(topics = ["settled"])]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct PaymentSettled {
    #[topic]
    pub reference: BytesN<32>,
    pub payer: Address,
    pub payee: Address,
    pub amount: i128,
}

#[contract]
pub struct BusinessPayments;

#[contractimpl]
impl BusinessPayments {
    /// `token` is the only asset this deployment can move.
    pub fn __constructor(env: Env, token: Address) {
        env.storage().instance().set(&DataKey::Token, &token);
    }

    pub fn token(env: Env) -> Address {
        Self::stored_token(&env)
    }

    /// Transfers `amount` from `payer` to `payee` and records the receipt.
    /// Requires the payer's signature over these exact arguments.
    pub fn pay(
        env: Env,
        payer: Address,
        payee: Address,
        amount: i128,
        reference: BytesN<32>,
    ) -> Result<(), PaymentError> {
        payer.require_auth();

        if amount <= 0 {
            return Err(PaymentError::InvalidAmount);
        }
        if payer == payee {
            return Err(PaymentError::SamePayerAndPayee);
        }

        let key = DataKey::Receipt(reference.clone());
        if env.storage().persistent().has(&key) {
            return Err(PaymentError::DuplicateReference);
        }

        // Record before the external call so the reference is consumed even
        // if a future token implementation re-enters this contract.
        let receipt = Receipt {
            payer: payer.clone(),
            payee: payee.clone(),
            amount,
            ledger: env.ledger().sequence(),
        };
        env.storage().persistent().set(&key, &receipt);
        env.storage()
            .persistent()
            .extend_ttl(&key, RECEIPT_TTL_THRESHOLD, RECEIPT_TTL_EXTEND_TO);

        token::Client::new(&env, &Self::stored_token(&env)).transfer(&payer, &payee, &amount);

        PaymentSettled {
            reference,
            payer,
            payee,
            amount,
        }
        .publish(&env);

        env.storage()
            .instance()
            .extend_ttl(RECEIPT_TTL_THRESHOLD, RECEIPT_TTL_EXTEND_TO);
        Ok(())
    }

    pub fn receipt(env: Env, reference: BytesN<32>) -> Option<Receipt> {
        env.storage()
            .persistent()
            .get(&DataKey::Receipt(reference))
    }
}

impl BusinessPayments {
    fn stored_token(env: &Env) -> Address {
        env.storage()
            .instance()
            .get(&DataKey::Token)
            .expect("constructor always sets the token")
    }
}

#[cfg(test)]
mod test;
