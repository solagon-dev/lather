import { NextRequest, NextResponse } from "next/server";
import { getAvailableSlots } from "@/lib/availability";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const date = searchParams.get("date");
  const serviceId = searchParams.get("serviceId");
  const staffId = searchParams.get("staffId");

  if (!date || !serviceId) {
    return NextResponse.json(
      { error: "date and serviceId are required" },
      { status: 400 },
    );
  }

  // Validate date format
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json(
      { error: "Invalid date format. Use YYYY-MM-DD." },
      { status: 400 },
    );
  }

  // Don't allow booking in the past
  const today = new Date().toISOString().split("T")[0];
  if (date < today) {
    return NextResponse.json({ slots: [] });
  }

  try {
    const slots = await getAvailableSlots(
      date,
      serviceId,
      staffId || null,
    );
    return NextResponse.json({ slots });
  } catch {
    return NextResponse.json({ slots: [], error: "Failed to fetch slots" }, { status: 500 });
  }
}
