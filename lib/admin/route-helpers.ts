/**
 * Shared response mapping for the `app/api/admin/*` route handlers.
 *
 * The client components behind the admin modules only ever talk to these
 * same-origin routes, so the backend session token stays on the server. Each
 * route is a thin proxy; this maps `BackendResult` onto the HTTP semantics the
 * browser side expects (notably 401 for an expired session, which the client
 * turns into a redirect to the login page).
 */

import { NextResponse } from "next/server";

import type { BackendResult } from "./api";

export function respond<T>(result: BackendResult<T>): NextResponse {
  switch (result.kind) {
    case "ok":
      return NextResponse.json({ data: result.data });
    case "auth":
      return NextResponse.json({ error: "Session expired" }, { status: 401 });
    case "unavailable":
      return NextResponse.json(
        {
          error:
            "This endpoint is not available on the connected PCG backend — it needs a rebuild and redeploy.",
          path: result.path,
        },
        { status: 503 }
      );
    case "error":
      return NextResponse.json(
        { error: result.message },
        { status: result.status && result.status >= 400 ? result.status : 502 }
      );
  }
}
