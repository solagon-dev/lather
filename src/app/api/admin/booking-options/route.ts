import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const [services, staff] = await Promise.all([
      prisma.bookingService.findMany({
        where: { isActive: true },
        orderBy: { sortOrder: "asc" },
        select: { id: true, name: true, durationMinutes: true, price: true },
      }),
      prisma.staff.findMany({
        where: { isActive: true },
        orderBy: { name: "asc" },
        select: { id: true, name: true },
      }),
    ]);

    return NextResponse.json({ services, staff });
  } catch {
    return NextResponse.json(
      { error: "Failed to load options", services: [], staff: [] },
      { status: 500 }
    );
  }
}
