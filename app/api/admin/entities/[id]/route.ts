import { backendJson } from "@/lib/admin/api";
import { respond } from "@/lib/admin/route-helpers";
import type { EntityDetail } from "@/lib/admin/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** GET /api/admin/entities/:id — entity detail for the conference-lead drawer. */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  return respond(
    await backendJson<EntityDetail>(`/api/entities/${encodeURIComponent(id)}`)
  );
}
