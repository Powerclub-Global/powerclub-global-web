import { NextResponse } from "next/server";

const BACKEND = process.env.PCG_BACKEND_URL || "https://dashboard.powerclubglobal.com";

// Server-side relay to the PCG dashboard's discovery-call booking endpoint —
// same pattern as /api/lead. Books the real Calendar event (when connected),
// matches/upserts the CRM record, and always saves the lead even if
// Calendar sync isn't ready yet.
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const res = await fetch(`${BACKEND}/api/public/discovery-call/book`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(15000),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      return NextResponse.json(
        { success: false, message: data.message || "Something went wrong. Please try again." },
        { status: res.status },
      );
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error("discovery-call book relay error:", err);
    return NextResponse.json(
      { success: false, message: "Network error. Please try again." },
      { status: 502 },
    );
  }
}
