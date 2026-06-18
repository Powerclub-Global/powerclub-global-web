import { NextRequest, NextResponse } from "next/server";

/** Books an enterprise briefing via the ORCHA dashboard. Mirrors /api/agency/book. */
const EVENT_SLUG = "enterprise";

export async function POST(req: NextRequest) {
  const { slot_id, name, email, phone, business, needs, message, sms_consent } = await req.json();

  const extras = [
    business ? `Company: ${business}` : null,
    needs ? `Interested in: ${needs}` : null,
    phone ? `Phone: ${phone}` : null,
    `SMS consent: ${sms_consent ? "yes" : "no"}`,
    message ? `\n${message}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  const res = await fetch(
    `https://dashboard.powerclubglobal.com/api/public/events/${EVENT_SLUG}/book`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slot_id, name, email, phone: phone || undefined, track: needs || "enterprise", message: extras || null, sms_consent: !!sms_consent }),
    }
  );

  return NextResponse.json(await res.json(), { status: res.status });
}
