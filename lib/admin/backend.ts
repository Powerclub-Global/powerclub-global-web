/**
 * Server-side gateway from the marketing site's /admin area to the PCG
 * dashboard backend.
 *
 * Every admin API route should go through `adminFetch` rather than calling the
 * backend directly. It centralises three things:
 *
 *  1. Reading the encrypted first-party admin session cookie.
 *  2. Turning the backend token inside it into the credential the dashboard
 *     expects (a `session_id` cookie — the backend is cookie-session based,
 *     not bearer/JWT).
 *  3. Base-URL resolution + sane defaults (no cache, JSON content type).
 *
 * The backend token never leaves the server: it lives only inside the encrypted
 * cookie and inside the outbound `Cookie` header built here.
 *
 * This module is server-only (it uses `next/headers`).
 */

import { cookies } from "next/headers";

import {
  ADMIN_SESSION_COOKIE,
  openSession,
  type AdminSession,
} from "./session";

export const PCG_BACKEND_URL =
  process.env.PCG_BACKEND_URL || "https://dashboard.powerclubglobal.com";

/** Thrown when there is no valid admin session to authenticate the call with. */
export class AdminAuthError extends Error {
  readonly status: number;
  constructor(message = "Not authenticated", status = 401) {
    super(message);
    this.name = "AdminAuthError";
    this.status = status;
  }
}

/**
 * Read and decrypt the current admin session from the request cookies.
 * Returns null when absent, expired, tampered with, or non-admin.
 */
export async function getAdminSession(): Promise<AdminSession | null> {
  const store = await cookies();
  return openSession(store.get(ADMIN_SESSION_COOKIE)?.value);
}

/** Same as `getAdminSession` but throws `AdminAuthError` instead of returning null. */
export async function requireAdminSession(): Promise<AdminSession> {
  const session = await getAdminSession();
  if (!session) throw new AdminAuthError();
  return session;
}

/**
 * Call the dashboard backend as the currently logged-in admin.
 *
 * @param path   Backend path beginning with `/`, e.g. `/api/crm/contacts`.
 *               It is appended verbatim to `PCG_BACKEND_URL`.
 * @param init   Standard `fetch` init. Headers are merged over the defaults, so
 *               callers can override Content-Type or add their own; the auth
 *               `Cookie` header is always applied and cannot be dropped.
 * @param opts.session  Pre-resolved session, to avoid re-reading cookies when
 *               the caller already has one in hand.
 *
 * @throws AdminAuthError when there is no valid admin session.
 * @returns The raw `Response` — callers decide how to parse and what status to
 *          propagate.
 *
 * ```ts
 * const res = await adminFetch("/api/crm/contacts?limit=50");
 * if (!res.ok) return NextResponse.json({ error: "Backend error" }, { status: res.status });
 * return NextResponse.json(await res.json());
 * ```
 */
export async function adminFetch(
  path: string,
  init: RequestInit = {},
  opts: { session?: AdminSession } = {}
): Promise<Response> {
  const session = opts.session ?? (await requireAdminSession());

  const headers = new Headers(init.headers);
  if (!headers.has("Content-Type") && init.body) {
    headers.set("Content-Type", "application/json");
  }
  // The dashboard authenticates via its own `session_id` cookie.
  headers.set("Cookie", `session_id=${session.token}`);

  return fetch(`${PCG_BACKEND_URL}${path}`, {
    ...init,
    headers,
    cache: "no-store",
  });
}
