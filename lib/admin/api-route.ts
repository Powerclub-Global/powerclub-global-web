/**
 * Small helpers shared by the `/api/admin/*` route handlers.
 *
 * Server-only: pulls in `lib/admin/backend`, which reads `next/headers`.
 */

import { NextResponse } from "next/server";

import { AdminAuthError } from "./backend";

/** Shape of the dashboard backend's `ApiResponse<T>` envelope. */
interface BackendEnvelope<T> {
  success?: boolean;
  data?: T | null;
  message?: string | null;
}

/**
 * Unwrap the backend's `{ success, data, message }` envelope.
 *
 * Throws `BackendError` on a non-2xx response or a `success: false` body, so
 * callers can let `handleRouteError` turn it into a clean JSON error.
 */
export async function unwrap<T>(res: Response, what: string): Promise<T> {
  if (!res.ok) {
    throw new BackendError(
      `Backend returned ${res.status} for ${what}`,
      res.status === 401 || res.status === 403 ? 502 : 502
    );
  }
  let body: BackendEnvelope<T>;
  try {
    body = (await res.json()) as BackendEnvelope<T>;
  } catch {
    throw new BackendError(`Backend sent a non-JSON response for ${what}`, 502);
  }
  if (body.success === false) {
    throw new BackendError(body.message || `Backend rejected ${what}`, 502);
  }
  return (body.data ?? null) as T;
}

/** A failure that came from the dashboard backend rather than from the client. */
export class BackendError extends Error {
  readonly status: number;
  constructor(message: string, status = 502) {
    super(message);
    this.name = "BackendError";
    this.status = status;
  }
}

/**
 * Turn any thrown value into a JSON response.
 *
 * `AdminAuthError` becomes a 401 with an `expired` marker so client components
 * can bounce the user to the login page instead of rendering a crash.
 */
export function handleRouteError(err: unknown): NextResponse {
  if (err instanceof AdminAuthError) {
    return NextResponse.json(
      { error: "Session expired — sign in again.", expired: true },
      { status: 401 }
    );
  }
  if (err instanceof BackendError) {
    return NextResponse.json({ error: err.message }, { status: err.status });
  }
  const message =
    err instanceof Error ? err.message : "Unexpected server error.";
  return NextResponse.json(
    { error: `Could not reach the PCG dashboard backend (${message}).` },
    { status: 502 }
  );
}
