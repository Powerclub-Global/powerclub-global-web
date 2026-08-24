import { NextResponse } from "next/server";

import { handleRouteError, unwrap } from "@/lib/admin/api-route";
import { adminFetch, requireAdminSession } from "@/lib/admin/backend";
import {
  PCG_ORG_ID,
  type PostsPayload,
  type SocialAccount,
  type SocialPost,
} from "@/lib/admin/social";

export const dynamic = "force-dynamic";

/** The backend caps at 500; keep the calendar's request bounded too. */
const DEFAULT_LIMIT = 500;

/**
 * GET /api/admin/social-posts
 *
 * Social posts for the Powerclub Global org, plus the connected accounts so the
 * client can resolve `social_account_id` to a handle without a second round
 * trip.
 *
 * Backend endpoints (pcg-cc-mcp):
 *   GET /api/social/posts?organization_id=…&limit=…
 *     crates/server/src/routes/social_posts.rs:599
 *   GET /api/social/accounts?organization_id=…
 *     crates/server/src/routes/social_accounts.rs:949
 */
export async function GET(req: Request) {
  try {
    const session = await requireAdminSession();
    const url = new URL(req.url);

    const search = new URLSearchParams({ organization_id: PCG_ORG_ID });
    const limitRaw = Number(url.searchParams.get("limit"));
    const limit =
      Number.isFinite(limitRaw) && limitRaw > 0
        ? Math.min(Math.floor(limitRaw), DEFAULT_LIMIT)
        : DEFAULT_LIMIT;
    search.set("limit", String(limit));

    const status = url.searchParams.get("status");
    if (status) search.set("status", status);

    const [postsRes, accountsRes] = await Promise.all([
      adminFetch(`/api/social/posts?${search.toString()}`, {}, { session }),
      adminFetch(
        `/api/social/accounts?organization_id=${encodeURIComponent(PCG_ORG_ID)}`,
        {},
        { session }
      ),
    ]);

    const posts = (await unwrap<SocialPost[]>(postsRes, "social posts")) ?? [];
    const accounts =
      (await unwrap<SocialAccount[]>(accountsRes, "social accounts")) ?? [];

    const payload: PostsPayload = { posts, accounts };
    return NextResponse.json(payload);
  } catch (err) {
    return handleRouteError(err);
  }
}
