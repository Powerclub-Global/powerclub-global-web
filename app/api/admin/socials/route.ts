import { NextResponse } from "next/server";

import { handleRouteError, unwrap } from "@/lib/admin/api-route";
import { adminFetch, requireAdminSession } from "@/lib/admin/backend";
import {
  PCG_ORG_ID,
  type PlatformStatus,
  type SocialAccount,
  type SocialsPayload,
} from "@/lib/admin/social";

export const dynamic = "force-dynamic";

/**
 * GET /api/admin/socials
 *
 * Connected social accounts for the Powerclub Global org, plus which platforms
 * have OAuth credentials configured on the backend.
 *
 * Backend endpoints (pcg-cc-mcp):
 *   GET /api/social/accounts?organization_id=…
 *     crates/server/src/routes/social_accounts.rs:949
 *   GET /api/social/platforms/status
 *     crates/server/src/routes/social_oauth.rs:479
 */
export async function GET() {
  try {
    const session = await requireAdminSession();
    const warnings: string[] = [];

    const [accountsRes, platformsRes] = await Promise.all([
      adminFetch(
        `/api/social/accounts?organization_id=${encodeURIComponent(PCG_ORG_ID)}`,
        {},
        { session }
      ),
      adminFetch("/api/social/platforms/status", {}, { session }).catch(
        () => null
      ),
    ]);

    const accounts = (await unwrap<SocialAccount[]>(
      accountsRes,
      "social accounts"
    )) ?? [];

    let platforms: PlatformStatus[] = [];
    if (platformsRes) {
      try {
        platforms =
          (await unwrap<PlatformStatus[]>(platformsRes, "platform status")) ??
          [];
      } catch {
        warnings.push(
          "Could not read which platforms have OAuth credentials configured."
        );
      }
    } else {
      warnings.push(
        "Could not read which platforms have OAuth credentials configured."
      );
    }

    const payload: SocialsPayload = { accounts, platforms, warnings };
    return NextResponse.json(payload);
  } catch (err) {
    return handleRouteError(err);
  }
}
