import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { disconnectCalendar } from "@/lib/google-calendar";

export async function POST(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { staffId } = await request.json();
    if (!staffId) return NextResponse.json({ error: "staffId required" }, { status: 400 });

    await disconnectCalendar(staffId);
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("[Calendar] Disconnect error:", e);
    return NextResponse.json({ error: "Failed to disconnect" }, { status: 500 });
  }
}
