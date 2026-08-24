import { NextResponse } from "next/server";

import { PCG_BACKEND_URL } from "@/lib/admin/backend";
import {
  ADMIN_COOKIE_OPTIONS,
  ADMIN_SESSION_COOKIE,
  ADMIN_SESSION_MAX_AGE,
  sealSession,
  type AdminUser,
} from "@/lib/admin/session";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface BackendLoginResponse {
  success?: boolean;
  message?: string | null;
  data?: {
    session_id?: string;
    user?: AdminUser & Record<string, unknown>;
  } | null;
}

/**
 * POST /api/admin/auth/login
 *
 * Single sign-on against the dashboard's existing accounts — there is no second
 * user store on the marketing site. The credentials are relayed server-side,
 * the returned profile must carry `is_admin`, and the backend session token is
 * sealed into a first-party httpOnly cookie. The token is never returned to the
 * browser.
 */
export async function POST(req: Request) {
  if (!process.env.ADMIN_SESSION_SECRET) {
    console.error("ADMIN_SESSION_SECRET is not configured");
    return NextResponse.json(
      { error: "Admin sign-in is not configured." },
      { status: 500 }
    );
  }

  let body: { username?: string; password?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const username = (body.username || "").trim();
  const password = body.password || "";
  if (!username || !password) {
    return NextResponse.json(
      { error: "Email/username and password are required." },
      { status: 400 }
    );
  }

  let res: Response;
  try {
    res = await fetch(`${PCG_BACKEND_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // The backend accepts either a username or an email in this field.
      body: JSON.stringify({ username, password }),
      cache: "no-store",
      signal: AbortSignal.timeout(15000),
    });
  } catch (err) {
    console.error("admin login: backend unreachable", err);
    return NextResponse.json(
      { error: "Authentication service unavailable." },
      { status: 502 }
    );
  }

  const json = (await res.json().catch(() => null)) as BackendLoginResponse | null;

  // The backend answers bad credentials with 400 + success:false. Normalise
  // every credential failure to 401 for the site.
  if (!res.ok || !json?.success || !json.data?.session_id || !json.data.user) {
    const status = res.status === 400 || res.status === 401 ? 401 : 502;
    return NextResponse.json(
      {
        error:
          status === 401
            ? json?.message || "Invalid credentials."
            : "Authentication service error.",
      },
      { status }
    );
  }

  const profile = json.data.user;
  if (profile.is_admin !== true) {
    // Valid dashboard account, but not an administrator: no admin session is
    // minted at all, so nothing is left behind for them to reuse.
    return NextResponse.json(
      { error: "This account does not have admin access." },
      { status: 403 }
    );
  }

  const user: AdminUser = {
    id: String(profile.id ?? ""),
    username: String(profile.username ?? ""),
    email: String(profile.email ?? ""),
    full_name: String(profile.full_name ?? ""),
    is_admin: true,
  };

  const response = NextResponse.json({ user });
  response.cookies.set({
    ...ADMIN_COOKIE_OPTIONS,
    name: ADMIN_SESSION_COOKIE,
    value: await sealSession({ token: json.data.session_id, user }),
    maxAge: ADMIN_SESSION_MAX_AGE,
  });
  return response;
}
