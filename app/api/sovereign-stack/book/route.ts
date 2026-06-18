import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { slot_id, name, email, phone, track, message } = await req.json();

  const fullMessage = phone
    ? `Phone: ${phone}${message ? "\n\n" + message : ""}`
    : message || null;

  const res = await fetch(
    "https://dashboard.powerclubglobal.com/api/public/events/sovereign-stack/book",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slot_id, name, email, track, message: fullMessage }),
    }
  );

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
