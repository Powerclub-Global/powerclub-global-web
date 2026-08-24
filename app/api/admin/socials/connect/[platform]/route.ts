import { NextResponse } from "next/server";

import { handleRouteError } from "@/lib/admin/api-route";
import { adminFetch } from "@/lib/admin/backend";
import { PCG_ORG_ID, PLATFORM_LABELS } from "@/lib/admin/social";

export const dynamic = "force-dynamic";

/**
 * GET /api/admin/socials/connect/:platform
 *
 * Starts (or restarts) the OAuth flow for one platform and bounces the admin
 * to the provider's consent screen.
 *
 * The backend's connect endpoint is itself authenticated and answers with a
 * 307 to the provider:
 *   GET /api/social/oauth/{platform}/connect
 *     crates/server/src/routes/social_oauth.rs:478 (handler at :164)
 *
 * Because it needs the dashboard session, the browser cannot call it directly
 * from this origin — so this handler makes the call server-side with the admin
 * session and forwards only the resulting provider URL. No token is exposed.
 *
 * The provider redirects back to the *dashboard's* public callback
 * (social_oauth.rs:486), which finishes on the dashboard's own /social-command
 * page. That is the backend's hard-coded destination; this site cannot change
 * where the flow lands.
 */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ platform: string }> }
) {
  try {
    const { platform } = await params;
    const key = platform.toLowerCase();

    // Only ever forward a platform the backend actually knows about.
    if (!Object.prototype.hasOwnProperty.call(PLATFORM_LABELS, key)) {
      return NextResponse.json(
        { error: `Unknown platform "${platform}".` },
        { status: 400 }
      );
    }

    const res = await adminFetch(
      `/api/social/oauth/${key}/connect?organization_id=${encodeURIComponent(PCG_ORG_ID)}`,
      { redirect: "manual" }
    );

    const location = res.headers.get("location");

    if (res.status >= 300 && res.status < 400 && location) {
      // Refuse anything that is not an absolute https provider URL.
      let target: URL;
      try {
        target = new URL(location);
      } catch {
        return NextResponse.json(
          { error: "Backend returned an unusable OAuth redirect." },
          { status: 502 }
        );
      }
      if (target.protocol !== "https:") {
        return NextResponse.json(
          { error: "Backend returned a non-HTTPS OAuth redirect." },
          { status: 502 }
        );
      }
      return NextResponse.redirect(target.toString(), 302);
    }

    if (res.status === 501) {
      return NextResponse.json(
        {
          error: `${PLATFORM_LABELS[key]} OAuth is not configured on the dashboard backend (missing client id/secret).`,
        },
        { status: 501 }
      );
    }

    return NextResponse.json(
      { error: `Backend returned ${res.status} when starting OAuth.` },
      { status: 502 }
    );
  } catch (err) {
    return handleRouteError(err);
  }
}
