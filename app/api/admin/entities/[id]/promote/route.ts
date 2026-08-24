import { backendJson } from "@/lib/admin/api";
import { respond } from "@/lib/admin/route-helpers";
import type { PromoteResponse } from "@/lib/admin/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * POST /api/admin/entities/:id/promote
 *
 * Creates a real `crm_contacts` row from the entity and marks the engagement
 * converted. The backend is idempotent — promoting an already-promoted entity
 * returns the existing contact rather than duplicating it — so no guard is
 * needed here.
 */
export async function POST(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  return respond(
    await backendJson<PromoteResponse>(
      `/api/entities/${encodeURIComponent(id)}/promote`,
      { method: "POST" }
    )
  );
}
