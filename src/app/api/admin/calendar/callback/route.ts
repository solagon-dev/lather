import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { handleOAuthCallback } from "@/lib/google-calendar";

export async function GET(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  const code = request.nextUrl.searchParams.get("code");
  const staffId = request.nextUrl.searchParams.get("state");

  if (!code || !staffId) {
    return NextResponse.redirect(new URL("/admin/staff?error=missing_params", request.url));
  }

  try {
    await handleOAuthCallback(code, staffId);
    return NextResponse.redirect(new URL(`/admin/staff?success=calendar_connected`, request.url));
  } catch (e) {
    console.error("[Calendar] OAuth callback error:", e);
    return NextResponse.redirect(new URL(`/admin/staff?error=calendar_failed`, request.url));
  }
}
