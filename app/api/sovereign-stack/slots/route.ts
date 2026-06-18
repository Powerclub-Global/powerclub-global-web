import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch(
      "https://dashboard.powerclubglobal.com/api/public/events/sovereign-stack",
      { next: { revalidate: 30 } }
    );
    if (!res.ok) throw new Error(`upstream ${res.status}`);
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Failed to load slots" }, { status: 502 });
  }
}
