import { NextResponse } from "next/server";

import { handleRouteError, unwrap } from "@/lib/admin/api-route";
import { adminFetch, requireAdminSession } from "@/lib/admin/backend";
import { allowedTransitions, type SocialPost } from "@/lib/admin/social";

export const dynamic = "force-dynamic";

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

interface PatchBody {
  /** ISO-8601 instant. Reschedules the post. */
  scheduled_for?: string;
  /** Target status. Must be a legal transition from the post's current status. */
  status?: string;
  /** Current status, so the FSM can be checked before the call goes out. */
  current_status?: string;
}

/**
 * PATCH /api/admin/social-posts/:id
 *
 * Reschedule a post and/or move it along its status FSM.
 *
 * Backend endpoints (pcg-cc-mcp):
 *   PATCH /api/social/posts/{id}          — field update (scheduled_for)
 *     crates/server/src/routes/social_posts.rs:603
 *   PATCH /api/social/posts/{id}/status   — FSM transition + approval event
 *     crates/server/src/routes/social_posts.rs:606
 *
 * Status changes deliberately go through the dedicated `/status` endpoint
 * rather than the generic field update: the generic one serialises the enum
 * with `format!("{s:?}").to_lowercase()`, which mangles multi-word variants
 * (`PendingReview` -> `pendingreview`), and it skips the FSM guard and the
 * `social_approval_events` audit row.
 *
 * Note: the backend's field update is `COALESCE(?, column)`, so a schedule can
 * be moved but never cleared back to NULL through this endpoint.
 */
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!UUID_RE.test(id)) {
      return NextResponse.json({ error: "Invalid post id." }, { status: 400 });
    }

    const session = await requireAdminSession();

    let body: PatchBody;
    try {
      body = (await req.json()) as PatchBody;
    } catch {
      return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
    }

    if (!body.scheduled_for && !body.status) {
      return NextResponse.json(
        { error: "Nothing to update." },
        { status: 400 }
      );
    }

    let post: SocialPost | null = null;

    if (body.scheduled_for) {
      const when = new Date(body.scheduled_for);
      if (Number.isNaN(when.getTime())) {
        return NextResponse.json(
          { error: "Invalid scheduled_for timestamp." },
          { status: 400 }
        );
      }
      const res = await adminFetch(
        `/api/social/posts/${id}`,
        {
          method: "PATCH",
          body: JSON.stringify({ scheduled_for: when.toISOString() }),
        },
        { session }
      );
      post = await unwrap<SocialPost>(res, "the schedule change");
    }

    if (body.status) {
      const from = body.current_status ?? post?.status;
      if (from && !allowedTransitions(from).includes(body.status)) {
        return NextResponse.json(
          {
            error: `The backend does not allow "${from}" → "${body.status}".`,
          },
          { status: 400 }
        );
      }
      const actor =
        session.user.full_name || session.user.username || session.user.email;
      const res = await adminFetch(
        `/api/social/posts/${id}/status`,
        {
          method: "PATCH",
          body: JSON.stringify({ status: body.status, by: actor }),
        },
        { session }
      );
      post = await unwrap<SocialPost>(res, "the status change");
    }

    return NextResponse.json({ post });
  } catch (err) {
    return handleRouteError(err);
  }
}
