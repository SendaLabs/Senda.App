extern crate std;

use soroban_sdk::{
    testutils::{Address as _, AuthorizedFunction, AuthorizedInvocation},
    token::{StellarAssetClient, TokenClient},
    Address, BytesN, Env, IntoVal, Symbol,
};

use crate::{BusinessPayments, BusinessPaymentsClient, PaymentError, Receipt};

const INITIAL_BALANCE: i128 = 1_000;

struct Fixture {
    env: Env,
    contract: BusinessPaymentsClient<'static>,
    token: TokenClient<'static>,
    payer: Address,
    payee: Address,
}

fn setup() -> Fixture {
    let env = Env::default();
    env.mock_all_auths();

    let issuer = Address::generate(&env);
    let token_id = env.register_stellar_asset_contract_v2(issuer).address();
    let payer = Address::generate(&env);
    let payee = Address::generate(&env);
    StellarAssetClient::new(&env, &token_id).mint(&payer, &INITIAL_BALANCE);

    let contract_id = env.register(BusinessPayments, (token_id.clone(),));

    Fixture {
        contract: BusinessPaymentsClient::new(&env, &contract_id),
        token: TokenClient::new(&env, &token_id),
        env,
        payer,
        payee,
    }
}

fn reference(env: &Env, seed: u8) -> BytesN<32> {
    BytesN::from_array(env, &[seed; 32])
}

#[test]
fn settles_payment_and_stores_receipt() {
    let f = setup();
    let reference = reference(&f.env, 1);

    f.contract.pay(&f.payer, &f.payee, &250, &reference);

    assert_eq!(f.token.balance(&f.payer), INITIAL_BALANCE - 250);
    assert_eq!(f.token.balance(&f.payee), 250);
    assert_eq!(
        f.contract.receipt(&reference),
        Some(Receipt {
            payer: f.payer.clone(),
            payee: f.payee.clone(),
            amount: 250,
            ledger: f.env.ledger().sequence(),
        })
    );
}

#[test]
fn requires_payer_signature_over_exact_arguments() {
    let f = setup();
    let reference = reference(&f.env, 2);

    f.contract.pay(&f.payer, &f.payee, &100, &reference);

    assert_eq!(
        f.env.auths(),
        std::vec![(
            f.payer.clone(),
            AuthorizedInvocation {
                function: AuthorizedFunction::Contract((
                    f.contract.address.clone(),
                    Symbol::new(&f.env, "pay"),
                    (&f.payer, &f.payee, 100_i128, reference.clone()).into_val(&f.env),
                )),
                sub_invocations: std::vec![AuthorizedInvocation {
                    function: AuthorizedFunction::Contract((
                        f.token.address.clone(),
                        Symbol::new(&f.env, "transfer"),
                        (&f.payer, &f.payee, 100_i128).into_val(&f.env),
                    )),
                    sub_invocations: std::vec![],
                }],
            },
        )]
    );
}

#[test]
fn fails_without_payer_authorization() {
    let f = setup();
    f.env.set_auths(&[]);

    let result = f
        .contract
        .try_pay(&f.payer, &f.payee, &100, &reference(&f.env, 3));

    assert!(result.is_err());
    assert_eq!(f.token.balance(&f.payer), INITIAL_BALANCE);
}

#[test]
fn rejects_duplicate_reference_without_moving_funds() {
    let f = setup();
    let reference = reference(&f.env, 4);
    f.contract.pay(&f.payer, &f.payee, &100, &reference);

    let result = f.contract.try_pay(&f.payer, &f.payee, &100, &reference);

    assert_eq!(result, Err(Ok(PaymentError::DuplicateReference)));
    assert_eq!(f.token.balance(&f.payee), 100);
}

#[test]
fn rejects_non_positive_amounts() {
    let f = setup();

    for amount in [0_i128, -1] {
        let result = f
            .contract
            .try_pay(&f.payer, &f.payee, &amount, &reference(&f.env, 5));
        assert_eq!(result, Err(Ok(PaymentError::InvalidAmount)));
    }
    assert_eq!(f.contract.receipt(&reference(&f.env, 5)), None);
}

#[test]
fn rejects_paying_yourself() {
    let f = setup();

    let result = f
        .contract
        .try_pay(&f.payer, &f.payer, &10, &reference(&f.env, 6));

    assert_eq!(result, Err(Ok(PaymentError::SamePayerAndPayee)));
}

#[test]
fn exposes_configured_token() {
    let f = setup();
    assert_eq!(f.contract.token(), f.token.address);
}
