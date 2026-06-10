import { NextRequest, NextResponse } from "next/server";

const DASHBOARD_API = "https://dashboard.powerclubglobal.com/api";

// POST /api/data-deletion — proxy manual deletion request to dashboard
export async function POST(req: NextRequest) {
  try {
    const body = await req.formData();
    const email = (body.get("email") as string | null)?.trim() ?? "";

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const params = new URLSearchParams({ email });
    const res = await fetch(`${DASHBOARD_API}/meta/data-deletion/request`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Request failed" },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
