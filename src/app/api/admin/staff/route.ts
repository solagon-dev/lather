import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";

export async function GET() {
  const session = await getAdminSession();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const [staff, services] = await Promise.all([
    prisma.staff.findMany({
      orderBy: { name: "asc" },
      include: {
        staffServices: {
          include: { service: { select: { id: true, name: true } } },
        },
      },
    }),
    prisma.bookingService.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
      select: { id: true, name: true },
    }),
  ]);
  return NextResponse.json({ staff, services });
}
