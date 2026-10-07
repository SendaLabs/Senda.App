import { PasswordHasher } from "./password-hasher";

describe("PasswordHasher", () => {
  // Low cost keeps the suite fast; production uses the default parameters.
  const hasher = new PasswordHasher({ N: 2 ** 10, r: 8, p: 1 });

  it("verifies the original password", async () => {
    const hash = await hasher.hash("correct horse battery staple");
    await expect(
      hasher.verify("correct horse battery staple", hash),
    ).resolves.toBe(true);
  });

  it("rejects a different password", async () => {
    const hash = await hasher.hash("correct horse battery staple");
    await expect(hasher.verify("wrong password", hash)).resolves.toBe(false);
  });

  it("salts every hash", async () => {
    const [first, second] = await Promise.all([
      hasher.hash("same password"),
      hasher.hash("same password"),
    ]);
    expect(first).not.toBe(second);
  });

  it("never embeds the plain password", async () => {
    const hash = await hasher.hash("visible-secret");
    expect(hash).not.toContain("visible-secret");
    expect(hash.startsWith("scrypt$1024$8$1$")).toBe(true);
  });

  it("rejects malformed hashes without throwing", async () => {
    await expect(hasher.verify("x", "not-a-hash")).resolves.toBe(false);
    await expect(hasher.verify("x", "scrypt$0$8$1$a$b")).resolves.toBe(false);
  });

  it("flags hashes created with weaker parameters", async () => {
    const weak = await hasher.hash("password");
    const stronger = new PasswordHasher({ N: 2 ** 11, r: 8, p: 1 });
    expect(stronger.needsRehash(weak)).toBe(true);
    expect(hasher.needsRehash(weak)).toBe(false);
  });
});
