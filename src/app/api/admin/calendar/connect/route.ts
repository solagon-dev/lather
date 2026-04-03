import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { getAuthUrl } from "@/lib/google-calendar";

export async function GET(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const staffId = request.nextUrl.searchParams.get("staffId");
  if (!staffId) return NextResponse.json({ error: "staffId is required" }, { status: 400 });

  if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
    return NextResponse.json({ error: "Google Calendar is not configured." }, { status: 503 });
  }

  const url = getAuthUrl(staffId);
  return NextResponse.redirect(url);
}
