import { NextResponse } from "next/server";

const BACKEND = process.env.PCG_BACKEND_URL || "https://dashboard.powerclubglobal.com";

// Server-side relay to the PCG dashboard CRM so leads land in the
// relationship database (contact + funnel tag + timeline note).
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const res = await fetch(`${BACKEND}/api/public/leads`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: body.name,
        email: body.email,
        phone: body.phone || undefined,
        company: body.company || undefined,
        subject: body.subject || undefined,
        message: body.message || undefined,
        funnel: body.funnel || "pcg",
        sourcePage: body.sourcePage || "/contact",
        smsConsent: body.sms_consent ?? undefined,
        orgSlug: "powerclub-global",
      }),
      // Lead capture must not hang the user's submit.
      signal: AbortSignal.timeout(8000),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      console.error(`CRM lead relay failed: ${res.status} ${text}`);
      return NextResponse.json({ success: false }, { status: 502 });
    }

    return NextResponse.json(await res.json());
  } catch (err) {
    console.error("CRM lead relay error:", err);
    return NextResponse.json({ success: false }, { status: 502 });
  }
}
