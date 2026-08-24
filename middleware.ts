import { NextResponse, type NextRequest } from "next/server";

import { ADMIN_SESSION_COOKIE, openSession } from "@/lib/admin/session";

/**
 * Gate for the /admin area only. The public marketing site is untouched — the
 * matcher below never runs on marketing pages, static assets, or the public
 * lead/booking API routes.
 *
 * Pages  -> 302 to /admin/login?next=<original path>
 * APIs   -> 401 JSON
 */

/** Paths that must stay reachable without a session. */
const PUBLIC_PATHS = new Set([
  "/admin/login",
  "/api/admin/auth/login",
  "/api/admin/auth/logout",
  "/api/admin/auth/me",
]);

export async function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  if (PUBLIC_PATHS.has(pathname)) return NextResponse.next();

  const session = await openSession(
    req.cookies.get(ADMIN_SESSION_COOKIE)?.value
  );
  if (session) return NextResponse.next();

  if (pathname.startsWith("/api/")) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const loginUrl = new URL("/admin/login", req.url);
  loginUrl.searchParams.set("next", `${pathname}${search}`);
  return NextResponse.redirect(loginUrl, 302);
}

export const config = {
  matcher: [
    "/admin",
    "/admin/:path*",
    "/api/admin/:path*",
    // The founder-call viewer's data endpoint is admin-only now that the
    // shared `?key=` prompt is gone.
    "/api/sovereign-stack/admin",
  ],
};
