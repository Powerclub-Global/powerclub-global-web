import { NextRequest, NextResponse } from "next/server";

/**
 * Books a strategy-call slot via the ORCHA dashboard.
 * Mirrors /api/sovereign-stack/book. Folds phone + business + needs into the
 * message so the dashboard's existing booking contract is unchanged.
 */
const EVENT_SLUG = "agency";

export async function POST(req: NextRequest) {
  const { slot_id, name, email, phone, business, needs, message, sms_consent } =
    await req.json();

  const extras = [
    business ? `Business: ${business}` : null,
    needs ? `Looking for: ${needs}` : null,
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
      body: JSON.stringify({
        slot_id,
        name,
        email,
        phone: phone || undefined,
        track: needs || "general",
        message: extras || null,
        sms_consent: !!sms_consent,
      }),
    }
  );

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
