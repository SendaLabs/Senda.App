import { InvalidEnvironmentError, loadConfig } from "./env";

const BASE_ENV = {
  DATABASE_URL: "postgresql://user:pass@localhost:5432/senda",
};

describe("loadConfig", () => {
  it("applies safe defaults", () => {
    const config = loadConfig(BASE_ENV);
    expect(config).toMatchObject({
      nodeEnv: "development",
      port: 4000,
      corsOrigins: [],
      trustProxy: false,
      stellar: { network: "testnet", sorobanRpcUrl: undefined },
    });
  });

  it("parses comma-separated CORS origins", () => {
    const config = loadConfig({
      ...BASE_ENV,
      CORS_ORIGINS: "https://senda.app, http://localhost:3000",
    });
    expect(config.corsOrigins).toEqual([
      "https://senda.app",
      "http://localhost:3000",
    ]);
  });

  it("treats empty optional URLs as unset", () => {
    const config = loadConfig({ ...BASE_ENV, SOROBAN_RPC_URL: "" });
    expect(config.stellar.sorobanRpcUrl).toBeUndefined();
  });

  it("rejects non-PostgreSQL databases", () => {
    expect(() => loadConfig({ DATABASE_URL: "mysql://localhost/db" })).toThrow(
      InvalidEnvironmentError,
    );
  });

  it("does not echo secret values in the error message", () => {
    const secret = "postgresql-but-not-a-url-s3cr3t";
    try {
      loadConfig({ DATABASE_URL: secret });
      throw new Error("expected loadConfig to throw");
    } catch (error) {
      expect(error).toBeInstanceOf(InvalidEnvironmentError);
      expect((error as Error).message).not.toContain(secret);
    }
  });

  it("validates the Soroban contract address format", () => {
    expect(() =>
      loadConfig({ ...BASE_ENV, BUSINESS_PAYMENTS_CONTRACT_ID: "GABC" }),
    ).toThrow(InvalidEnvironmentError);
  });
});
