/**
 * Server-side helpers for talking to the PCG dashboard backend from the admin
 * modules.
 *
 * `adminFetch` deliberately returns a raw `Response` and throws `AdminAuthError`
 * when there is no session. Every admin module needs the same three things on
 * top of that:
 *
 *  1. Unwrapping the backend's `ApiResponse` envelope
 *     (`{ success, data, error_data, message }`).
 *  2. Distinguishing "the backend rejected this" from "this endpoint does not
 *     exist on the deployed binary".
 *  3. Never throwing, so a backend hiccup renders an honest error panel instead
 *     of blanking the page.
 *
 * On (2): the dashboard backend serves its SPA as a catch-all fallback, so an
 * unregistered API path returns **200 with `text/html`** rather than a 404.
 * Blindly calling `res.json()` on that throws a confusing syntax error. Several
 * of the endpoints these modules depend on were added to the repo but are not
 * present in the currently-deployed backend binary, so this case is real and is
 * surfaced to the operator verbatim rather than silently swallowed.
 */

import { adminFetch, AdminAuthError } from "./backend";

/** Powerclub Global's organization id (`organizations.slug = 'powerclub-global'`). */
export const PCG_ORG_ID = "01010101-0101-0101-0101-010101010101";

export type BackendResult<T> =
  | { kind: "ok"; data: T }
  | { kind: "auth" }
  | { kind: "unavailable"; path: string }
  | { kind: "error"; message: string; status: number | null };

/** The backend's uniform response envelope. */
interface ApiEnvelope<T> {
  success: boolean;
  data: T | null;
  error_data: unknown;
  message: string | null;
}

function isEnvelope<T>(value: unknown): value is ApiEnvelope<T> {
  return (
    typeof value === "object" && value !== null && "success" in value && "data" in value
  );
}

/**
 * Call the backend and unwrap its envelope. Never throws.
 *
 * @param path Backend path beginning with `/`, e.g. `/api/conference-boards`.
 */
export async function backendJson<T>(
  path: string,
  init?: RequestInit
): Promise<BackendResult<T>> {
  let res: Response;
  try {
    res = await adminFetch(path, init);
  } catch (err) {
    if (err instanceof AdminAuthError) return { kind: "auth" };
    return {
      kind: "error",
      message: err instanceof Error ? err.message : "Could not reach the PCG backend.",
      status: null,
    };
  }

  if (res.status === 401 || res.status === 403) return { kind: "auth" };

  // SPA catch-all fallback => the route is not registered on this backend build.
  //
  // The signature is the *content type*, not the status: the fallback answers
  // 200 with `text/html`. A JSON 404 is a genuine "this record does not exist"
  // and must stay a normal error, or a missing entity would be reported as a
  // missing deployment.
  const contentType = res.headers.get("content-type") ?? "";
  if (contentType.includes("text/html")) {
    return { kind: "unavailable", path };
  }

  let body: unknown;
  try {
    body = await res.json();
  } catch {
    // Non-JSON body from a route we expected to be JSON — treat as missing
    // rather than as a hard error, since that is overwhelmingly the cause.
    return { kind: "unavailable", path };
  }

  if (!res.ok) {
    const message =
      isEnvelope(body) && body.message
        ? body.message
        : `Backend returned ${res.status}.`;
    return { kind: "error", message, status: res.status };
  }

  if (isEnvelope<T>(body)) {
    if (!body.success) {
      return {
        kind: "error",
        message: body.message ?? "The backend reported a failure.",
        status: res.status,
      };
    }
    return { kind: "ok", data: body.data as T };
  }

  // Some endpoints return a bare payload rather than the envelope.
  return { kind: "ok", data: body as T };
}

/** Convenience for the common "list endpoint, empty list on trouble" shape. */
export function dataOr<T>(result: BackendResult<T>, fallback: T): T {
  return result.kind === "ok" ? result.data : fallback;
}
