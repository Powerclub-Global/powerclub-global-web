import { NextResponse } from "next/server";

import { adminFetch, getAdminSession } from "@/lib/admin/backend";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * GET /api/sovereign-stack/admin
 *
 * Founder-call bookings for the admin area. Access is gated by the admin
 * session (middleware plus the explicit check below) — the old shared
 * `?key=` prompt is gone.
 *
 * Note: the backend endpoint itself is still `api_key`-gated rather than
 * session-gated, so the server-side `FOUNDER_CALL_ADMIN_KEY` is attached here
 * as a backend-to-backend credential. It is never sent to the browser. When the
 * backend grows a session-authenticated equivalent, drop the query parameter —
 * `adminFetch` already carries the caller's dashboard session.
 */
export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const apiKey = process.env.FOUNDER_CALL_ADMIN_KEY;
  if (!apiKey) {
    console.error("FOUNDER_CALL_ADMIN_KEY is not configured");
    return NextResponse.json(
      { error: "Founder-call data source is not configured." },
      { status: 500 }
    );
  }

  const res = await adminFetch(
    `/api/public/events/sovereign-stack/admin?api_key=${encodeURIComponent(apiKey)}`,
    {},
    { session }
  );

  if (!res.ok) {
    return NextResponse.json({ error: "Backend error" }, { status: res.status });
  }

  return NextResponse.json(await res.json());
}
