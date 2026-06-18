import { NextResponse } from "next/server";

/**
 * Proxies available strategy-call slots from the ORCHA dashboard.
 * Mirrors /api/sovereign-stack/slots.
 *
 * ⚠️ Requires a public bookable event with slug "agency" on
 * dashboard.powerclubglobal.com (same shape as the "sovereign-stack" event).
 * If it doesn't exist yet, this returns a 502 and the page falls back to
 * static placeholder slots.
 */
const EVENT_SLUG = "agency";

export async function GET() {
  try {
    const res = await fetch(
      `https://dashboard.powerclubglobal.com/api/public/events/${EVENT_SLUG}`,
      { next: { revalidate: 30 } }
    );
    if (!res.ok) throw new Error(`upstream ${res.status}`);
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Failed to load slots" }, { status: 502 });
  }
}
