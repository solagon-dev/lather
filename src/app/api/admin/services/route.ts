import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";

export async function GET() {
  const session = await getAdminSession();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const services = await prisma.bookingService.findMany({
    orderBy: { sortOrder: "asc" },
    include: {
      staffServices: {
        include: { staff: { select: { id: true, name: true } } },
      },
    },
  });
  return NextResponse.json({ services });
}
