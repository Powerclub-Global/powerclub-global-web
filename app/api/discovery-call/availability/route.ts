import { NextResponse } from "next/server";

const BACKEND = process.env.PCG_BACKEND_URL || "https://dashboard.powerclubglobal.com";

// Server-side proxy to the PCG dashboard's discovery-call availability
// endpoint — keeps the browser from having to talk cross-origin to the
// dashboard directly (same pattern as /api/lead).
export async function GET() {
  try {
    const res = await fetch(`${BACKEND}/api/public/discovery-call/availability`, {
      method: "GET",
      signal: AbortSignal.timeout(10000),
      cache: "no-store",
    });

    if (!res.ok) {
      return NextResponse.json(
        {
          schedulingAvailable: false,
          timezone: "Asia/Hong_Kong",
          slots: [],
          message: "Scheduling is temporarily unavailable. Please submit your info and we'll follow up.",
        },
        { status: 200 },
      );
    }

    return NextResponse.json(await res.json());
  } catch (err) {
    console.error("discovery-call availability proxy error:", err);
    return NextResponse.json(
      {
        schedulingAvailable: false,
        timezone: "Asia/Hong_Kong",
        slots: [],
        message: "Scheduling is temporarily unavailable. Please submit your info and we'll follow up.",
      },
      { status: 200 },
    );
  }
}
