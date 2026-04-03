import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";

export async function GET() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const [rules, blackouts, staff] = await Promise.all([
      prisma.availabilityRule.findMany({
        include: { staff: { select: { name: true } } },
        orderBy: { dayOfWeek: "asc" },
      }),
      prisma.blackout.findMany({
        include: { staff: { select: { name: true } } },
        orderBy: { startAt: "desc" },
      }),
      prisma.staff.findMany({
        where: { isActive: true },
        select: { id: true, name: true },
        orderBy: { name: "asc" },
      }),
    ]);

    return NextResponse.json({ rules, blackouts, staff });
  } catch {
    return NextResponse.json({ rules: [], blackouts: [], staff: [] }, { status: 500 });
  }
}
