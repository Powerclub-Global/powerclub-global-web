import { NextRequest, NextResponse } from "next/server";

/**
 * Proxies the Theodore concierge chat to the ORCHA dashboard.
 * Backend: pcg-cc-mcp → POST /api/theodore/chat (public, rate-limited, no auth).
 * Response shape: ApiResponse<{ reply }> = { success, data: { reply }, message }.
 */
const DASHBOARD_THEODORE = "https://dashboard.powerclubglobal.com/api/theodore/chat";

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid request." },
      { status: 400 }
    );
  }

  try {
    const res = await fetch(DASHBOARD_THEODORE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      // concierge replies should be quick; don't hang the page
      signal: AbortSignal.timeout(30000),
    });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Theodore is offline at the moment — please book a call and we'll reach out.",
      },
      { status: 502 }
    );
  }
}
