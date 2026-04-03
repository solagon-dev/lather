import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const services = await prisma.bookingService.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        durationMinutes: true,
        price: true,
        tier: true,
      },
    });

    const staff = await prisma.staff.findMany({
      where: { isActive: true },
      select: {
        id: true,
        name: true,
        image: true,
        staffServices: { select: { serviceId: true } },
      },
    });

    return NextResponse.json({ services, staff });
  } catch {
    return NextResponse.json({ services: [], staff: [] }, { status: 500 });
  }
}
