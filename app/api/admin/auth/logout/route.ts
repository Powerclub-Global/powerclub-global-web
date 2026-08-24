import { NextResponse } from "next/server";

import { adminFetch, getAdminSession } from "@/lib/admin/backend";
import {
  ADMIN_COOKIE_OPTIONS,
  ADMIN_SESSION_COOKIE,
} from "@/lib/admin/session";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * POST /api/admin/auth/logout
 *
 * Clears the first-party admin cookie and best-effort revokes the underlying
 * dashboard session so the token cannot be replayed. Always returns 200 — a
 * logout must never leave the user stuck in a logged-in state.
 */
export async function POST() {
  const session = await getAdminSession();

  if (session) {
    try {
      await adminFetch("/api/auth/logout", { method: "POST" }, { session });
    } catch (err) {
      // Revocation is a courtesy; the cookie is dropped regardless.
      console.error("admin logout: backend revoke failed", err);
    }
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set({
    ...ADMIN_COOKIE_OPTIONS,
    name: ADMIN_SESSION_COOKIE,
    value: "",
    maxAge: 0,
  });
  return response;
}
