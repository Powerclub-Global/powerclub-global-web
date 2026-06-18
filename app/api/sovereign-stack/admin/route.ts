import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const key = searchParams.get("key");

  if (!key || key !== process.env.FOUNDER_CALL_ADMIN_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const backend = process.env.PCG_BACKEND_URL || "https://dashboard.powerclubglobal.com";
  const res = await fetch(
    `${backend}/api/public/events/sovereign-stack/admin?api_key=${process.env.FOUNDER_CALL_ADMIN_KEY}`,
    { next: { revalidate: 0 } }
  );

  if (!res.ok) {
    return NextResponse.json({ error: "Backend error" }, { status: res.status });
  }

  const data = await res.json();
  return NextResponse.json(data);
}
