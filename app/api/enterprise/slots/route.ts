import { NextResponse } from "next/server";

/**
 * Proxies enterprise-briefing slots from the ORCHA dashboard.
 * ⚠️ Requires a public bookable event with slug "enterprise" on
 * dashboard.powerclubglobal.com. Until then this 502s and the calendar
 * shows demo availability.
 */
const EVENT_SLUG = "enterprise";

export async function GET() {
  try {
    const res = await fetch(
      `https://dashboard.powerclubglobal.com/api/public/events/${EVENT_SLUG}`,
      { next: { revalidate: 30 } }
    );
    if (!res.ok) throw new Error(`upstream ${res.status}`);
    return NextResponse.json(await res.json());
  } catch {
    return NextResponse.json({ error: "Failed to load slots" }, { status: 502 });
  }
}
