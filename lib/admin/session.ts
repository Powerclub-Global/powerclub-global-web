/**
 * Admin session cookie: encrypted, httpOnly, first-party.
 *
 * The PCG dashboard backend issues an opaque session token (it sets a
 * `session_id` cookie on its own domain and also returns the raw token in the
 * login response body). The marketing site cannot rely on that cookie — it is
 * scoped to `dashboard.powerclubglobal.com` — so we mint our *own* cookie on
 * `powerclubglobal.com` that carries the backend token as an encrypted payload.
 *
 * The payload is sealed with AES-256-GCM using a key derived (SHA-256) from
 * `ADMIN_SESSION_SECRET`. Encryption rather than plain signing is deliberate:
 * the cookie body holds a live backend credential, so it must never be readable
 * even if the cookie leaks out of transit. GCM also authenticates, so a tampered
 * cookie fails to open rather than decoding to attacker-chosen data.
 *
 * Everything here is Web Crypto only, so it runs unchanged in both the Node
 * runtime (route handlers) and the Edge runtime (middleware).
 */

export const ADMIN_SESSION_COOKIE = "pcg_admin_session";

/** Session lifetime. Kept at/below the backend's own 7-day session expiry. */
export const ADMIN_SESSION_MAX_AGE = 7 * 24 * 60 * 60; // seconds

/** The subset of the dashboard user profile the admin UI needs. */
export interface AdminUser {
  id: string;
  username: string;
  email: string;
  full_name: string;
  is_admin: boolean;
}

export interface AdminSession {
  /** Opaque dashboard-backend session token. Never sent to the browser. */
  token: string;
  user: AdminUser;
  /** Absolute expiry, seconds since epoch. */
  exp: number;
}

function secret(): string {
  const s = process.env.ADMIN_SESSION_SECRET;
  if (!s || s.length < 16) {
    throw new Error(
      "ADMIN_SESSION_SECRET is missing or too short (need >= 16 chars)"
    );
  }
  return s;
}

let keyPromise: Promise<CryptoKey> | null = null;

function getKey(): Promise<CryptoKey> {
  // Derived once per runtime instance; the secret cannot change mid-process.
  if (!keyPromise) {
    keyPromise = (async () => {
      const raw = await crypto.subtle.digest(
        "SHA-256",
        new TextEncoder().encode(secret())
      );
      return crypto.subtle.importKey("raw", raw, { name: "AES-GCM" }, false, [
        "encrypt",
        "decrypt",
      ]);
    })();
  }
  return keyPromise;
}

function toBase64Url(bytes: Uint8Array): string {
  let bin = "";
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(value: string): Uint8Array {
  const b64 = value.replace(/-/g, "+").replace(/_/g, "/");
  const bin = atob(b64.padEnd(Math.ceil(b64.length / 4) * 4, "="));
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

/** Seal a session into an opaque cookie value. */
export async function sealSession(
  session: Omit<AdminSession, "exp"> & { exp?: number }
): Promise<string> {
  const payload: AdminSession = {
    token: session.token,
    user: session.user,
    exp: session.exp ?? Math.floor(Date.now() / 1000) + ADMIN_SESSION_MAX_AGE,
  };
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const ciphertext = new Uint8Array(
    await crypto.subtle.encrypt(
      { name: "AES-GCM", iv },
      await getKey(),
      new TextEncoder().encode(JSON.stringify(payload))
    )
  );
  const packed = new Uint8Array(iv.length + ciphertext.length);
  packed.set(iv, 0);
  packed.set(ciphertext, iv.length);
  return toBase64Url(packed);
}

/**
 * Open a cookie value. Returns null for anything that is not a currently valid,
 * admin-bearing session — bad secret, tampering, expiry, or a demoted user.
 * Callers can treat null as "not authenticated" with no further checks.
 */
export async function openSession(
  value: string | undefined | null
): Promise<AdminSession | null> {
  if (!value) return null;
  try {
    const packed = fromBase64Url(value);
    if (packed.length < 13) return null;
    const iv = packed.subarray(0, 12);
    const ciphertext = packed.subarray(12);
    const plain = await crypto.subtle.decrypt(
      { name: "AES-GCM", iv },
      await getKey(),
      ciphertext
    );
    const session = JSON.parse(new TextDecoder().decode(plain)) as AdminSession;
    if (!session?.token || !session.user?.is_admin) return null;
    if (!session.exp || session.exp * 1000 < Date.now()) return null;
    return session;
  } catch {
    return null;
  }
}

/** Cookie attributes shared by the set and clear paths. */
export const ADMIN_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: true,
  sameSite: "lax" as const,
  path: "/",
};
