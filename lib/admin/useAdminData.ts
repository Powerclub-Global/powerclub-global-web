"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * Fetch JSON from an `/api/admin/*` route with the three states every admin
 * module needs: loading, error, data — plus the one behaviour they all share,
 * bouncing to the login page when the session has expired mid-session.
 */
export function useAdminData<T>(path: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  const reload = useCallback(() => setReloadKey((k) => k + 1), []);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    (async () => {
      try {
        const res = await fetch(path);
        if (cancelled) return;

        if (res.status === 401) {
          window.location.href = `/admin/login?next=${encodeURIComponent(
            window.location.pathname
          )}`;
          return;
        }

        const body: unknown = await res.json().catch(() => null);
        if (cancelled) return;

        if (!res.ok) {
          const message =
            body && typeof body === "object" && "error" in body
              ? String((body as { error: unknown }).error)
              : "Could not load data — is the PCG dashboard backend up?";
          setError(message);
          return;
        }

        setData(body as T);
      } catch {
        if (!cancelled) setError("Network error — could not reach the server.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [path, reloadKey]);

  return { data, loading, error, reload };
}
