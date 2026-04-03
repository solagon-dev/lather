import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;

  try {
    const appointment = await prisma.appointment.findUnique({
      where: { id },
      include: {
        client: { select: { firstName: true, lastName: true, email: true, phone: true } },
        service: { select: { name: true, durationMinutes: true } },
        staff: { select: { name: true } },
      },
    });

    if (!appointment) return NextResponse.json({ error: "Not found" }, { status: 404 });

    return NextResponse.json({ appointment });
  } catch {
    return NextResponse.json({ error: "Failed to load appointment" }, { status: 500 });
  }
}
