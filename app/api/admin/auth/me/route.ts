import { NextResponse } from "next/server";

import { adminFetch, getAdminSession } from "@/lib/admin/backend";
import {
  ADMIN_COOKIE_OPTIONS,
  ADMIN_SESSION_COOKIE,
  type AdminUser,
} from "@/lib/admin/session";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * GET /api/admin/auth/me
 *
 * Re-validates the session against the backend rather than trusting the cookie
 * alone, so a revoked/expired dashboard session or a revoked admin flag takes
 * effect immediately. On rejection the stale cookie is cleared.
 */
export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  let res: Response;
  try {
    res = await adminFetch("/api/auth/me", {}, { session });
  } catch (err) {
    console.error("admin me: backend unreachable", err);
    return NextResponse.json(
      { error: "Authentication service unavailable." },
      { status: 502 }
    );
  }

  // The backend returns a bare `{ data: profile }` from /auth/me (unlike the
  // wrapped ApiResponse used by /auth/login), so accept either shape.
  const json = (await res.json().catch(() => null)) as {
    data?: (AdminUser & Record<string, unknown>) | null;
  } | null;
  const profile = json?.data;

  if (!res.ok || !profile || profile.is_admin !== true) {
    const response = NextResponse.json(
      { error: "Not authenticated" },
      { status: 401 }
    );
    response.cookies.set({
      ...ADMIN_COOKIE_OPTIONS,
      name: ADMIN_SESSION_COOKIE,
      value: "",
      maxAge: 0,
    });
    return response;
  }

  const user: AdminUser = {
    id: String(profile.id ?? session.user.id),
    username: String(profile.username ?? ""),
    email: String(profile.email ?? ""),
    full_name: String(profile.full_name ?? ""),
    is_admin: true,
  };

  return NextResponse.json({ user });
}
