import { NextRequest, NextResponse } from "next/server";

const DASHBOARD_API = "https://dashboard.powerclubglobal.com/api";

// GET /api/data-deletion/status?id=<code>
export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id") ?? "";

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  try {
    const res = await fetch(
      `${DASHBOARD_API}/meta/data-deletion/status?id=${encodeURIComponent(id)}`
    );

    if (res.status === 404) {
      return NextResponse.json(
        { error: "No request found with that confirmation code." },
        { status: 404 }
      );
    }

    if (!res.ok) {
      return NextResponse.json({ error: "Server error" }, { status: 500 });
    }

    return NextResponse.json(await res.json());
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
