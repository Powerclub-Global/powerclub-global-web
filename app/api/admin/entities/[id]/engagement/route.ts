import { NextResponse } from "next/server";

import { backendJson } from "@/lib/admin/api";
import { respond } from "@/lib/admin/route-helpers";
import { ENGAGEMENT_STATUSES, type EntityEngagement } from "@/lib/admin/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** GET /api/admin/entities/:id/engagement */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  return respond(
    await backendJson<EntityEngagement>(
      `/api/entities/${encodeURIComponent(id)}/engagement`
    )
  );
}

/**
 * PATCH /api/admin/entities/:id/engagement
 *
 * Only `status` is writable from the admin UI today. The status is validated
 * here rather than passed through, so a typo surfaces as a 400 instead of the
 * backend rejecting the whole payload with a deserialisation error.
 */
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const status = (body as { status?: unknown } | null)?.status;
  if (typeof status !== "string") {
    return NextResponse.json({ error: "`status` is required." }, { status: 400 });
  }
  if (!(ENGAGEMENT_STATUSES as readonly string[]).includes(status)) {
    return NextResponse.json(
      { error: `Unknown engagement status: ${status}` },
      { status: 400 }
    );
  }

  return respond(
    await backendJson<EntityEngagement>(
      `/api/entities/${encodeURIComponent(id)}/engagement`,
      { method: "PATCH", body: JSON.stringify({ status }) }
    )
  );
}
