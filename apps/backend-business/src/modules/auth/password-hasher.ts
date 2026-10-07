import {
  randomBytes,
  scrypt as scryptCallback,
  type ScryptOptions,
  timingSafeEqual,
} from "node:crypto";

const KEY_LENGTH = 64;
const SALT_LENGTH = 16;
const PREFIX = "scrypt";

/** OWASP-equivalent scrypt cost: 64 MiB per hash (N=2^16, r=8, p=2). */
const DEFAULT_PARAMS = { N: 2 ** 16, r: 8, p: 2 } as const;

type ScryptParams = { N: number; r: number; p: number };

function scrypt(
  password: string,
  salt: Buffer,
  params: ScryptParams,
): Promise<Buffer> {
  const options: ScryptOptions = {
    ...params,
    maxmem: 256 * params.N * params.r,
  };
  return new Promise((resolve, reject) => {
    scryptCallback(password, salt, KEY_LENGTH, options, (error, key) => {
      if (error) reject(error);
      else resolve(key);
    });
  });
}

/**
 * Self-describing hashes: `scrypt$N$r$p$salt$hash` (base64url), so cost
 * parameters can be raised later without invalidating stored hashes.
 */
export class PasswordHasher {
  constructor(private readonly params: ScryptParams = DEFAULT_PARAMS) {}

  async hash(password: string): Promise<string> {
    const salt = randomBytes(SALT_LENGTH);
    const key = await scrypt(password, salt, this.params);
    const { N, r, p } = this.params;
    return [
      PREFIX,
      N,
      r,
      p,
      salt.toString("base64url"),
      key.toString("base64url"),
    ].join("$");
  }

  async verify(password: string, stored: string): Promise<boolean> {
    const parsed = parseHash(stored);
    if (!parsed) return false;

    const key = await scrypt(password, parsed.salt, parsed.params);
    return (
      key.length === parsed.key.length && timingSafeEqual(key, parsed.key)
    );
  }

  needsRehash(stored: string): boolean {
    const parsed = parseHash(stored);
    if (!parsed) return true;
    const { N, r, p } = parsed.params;
    return N < this.params.N || r !== this.params.r || p !== this.params.p;
  }
}

function parseHash(
  stored: string,
): { params: ScryptParams; salt: Buffer; key: Buffer } | null {
  const parts = stored.split("$");
  if (parts.length !== 6 || parts[0] !== PREFIX) return null;

  const [, n, r, p, salt, key] = parts;
  const params = { N: Number(n), r: Number(r), p: Number(p) };
  if (!Object.values(params).every((value) => Number.isSafeInteger(value) && value > 0)) {
    return null;
  }
  if (!salt || !key) return null;

  return {
    params,
    salt: Buffer.from(salt, "base64url"),
    key: Buffer.from(key, "base64url"),
  };
}
