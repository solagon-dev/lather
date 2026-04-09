import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding booking system data...");

  // ── SERVICES (from existing site data) ─────────────────────

  const classicRitual = await prisma.bookingService.upsert({
    where: { slug: "classic-ritual" },
    update: {},
    create: {
      name: "The Classic Ritual",
      slug: "classic-ritual",
      description:
        "A complete scalp reset — purifying cleanse, gentle exfoliation, tension-relieving massage, nourishing hair mask, and therapeutic steam infusion. Ideal for first-time guests or anyone seeking a full reset.",
      durationMinutes: 75,
      price: 12500, // $125.00 in cents
      bufferBeforeMinutes: 0,
      bufferAfterMinutes: 15,
      tier: "foundation",
      sortOrder: 1,
      isActive: true,
    },
  });

  const revitalizeRestore = await prisma.bookingService.upsert({
    where: { slug: "revitalize-restore" },
    update: {},
    create: {
      name: "Revitalize & Restore",
      slug: "revitalize-restore",
      description:
        "A rejuvenating scalp ritual with purifying cleanse, restorative massage, high-frequency combing, and anti-hair loss serum protocol. For thinning, postpartum shedding, or stress-related hair loss.",
      durationMinutes: 90,
      price: 16500, // $165.00
      bufferBeforeMinutes: 0,
      bufferAfterMinutes: 15,
      tier: "specialized",
      sortOrder: 2,
      isActive: true,
    },
  });

  const nourishFortify = await prisma.bookingService.upsert({
    where: { slug: "nourish-fortify" },
    update: {},
    create: {
      name: "Nourish & Fortify",
      slug: "nourish-fortify",
      description:
        "A bond-rebuilding treatment combining scalp care with advanced hair restoration. Professional-grade bond treatment restores strength, softness, and shine. For dry, damaged, or chemically treated hair.",
      durationMinutes: 90,
      price: 17500, // $175.00
      bufferBeforeMinutes: 0,
      bufferAfterMinutes: 15,
      tier: "premium",
      sortOrder: 3,
      isActive: true,
    },
  });

  const gentlemansRecharge = await prisma.bookingService.upsert({
    where: { slug: "gentlemans-recharge" },
    update: {},
    create: {
      name: "Gentleman's Recharge",
      slug: "gentlemans-recharge",
      description:
        "A restorative 60-minute experience designed specifically for men. Deep cleanse, scalp massage, and revitalizing treatment. No fuss, no pretense — just focused, effective care.",
      durationMinutes: 60,
      price: 9500, // $95.00
      bufferBeforeMinutes: 0,
      bufferAfterMinutes: 15,
      tier: "foundation",
      sortOrder: 4,
      isActive: true,
    },
  });

  console.log(
    `  ✓ Services: ${classicRitual.name}, ${revitalizeRestore.name}, ${nourishFortify.name}, ${gentlemansRecharge.name}`
  );

  // ── STAFF ──────────────────────────────────────────────────

  const staff1 = await prisma.staff.upsert({
    where: { email: "madison@latherspas.com" },
    update: { name: "Madison Hoffschneider", slug: "madison-hoffschneider" },
    create: {
      name: "Madison Hoffschneider",
      slug: "madison-hoffschneider",
      email: "madison@latherspas.com",
      image: "/media/team/madison-hoffschneider.jpg",
      isActive: true,
      timezone: "America/New_York",
    },
  });

  const staff2 = await prisma.staff.upsert({
    where: { email: "heidi@latherspas.com" },
    update: { name: "Heidi Griggs", slug: "heidi-griggs" },
    create: {
      name: "Heidi Griggs",
      slug: "heidi-griggs",
      email: "heidi@latherspas.com",
      image: "/media/team/heidi-griggs.jpg",
      isActive: true,
      timezone: "America/New_York",
    },
  });

  const staff3 = await prisma.staff.upsert({
    where: { email: "hannah@latherspas.com" },
    update: { name: "Hannah Justice", slug: "hannah-justice" },
    create: {
      name: "Hannah Justice",
      slug: "hannah-justice",
      email: "hannah@latherspas.com",
      isActive: true,
      timezone: "America/New_York",
    },
  });

  console.log(`  ✓ Staff: ${staff1.name}, ${staff2.name}, ${staff3.name}`);

  // ── STAFF-SERVICE RELATIONS (all can do all services) ─────

  const allServices = [
    classicRitual,
    revitalizeRestore,
    nourishFortify,
    gentlemansRecharge,
  ];
  const allStaff = [staff1, staff2, staff3];

  for (const staff of allStaff) {
    for (const service of allServices) {
      await prisma.staffService.upsert({
        where: {
          staffId_serviceId: {
            staffId: staff.id,
            serviceId: service.id,
          },
        },
        update: {},
        create: {
          staffId: staff.id,
          serviceId: service.id,
        },
      });
    }
  }

  console.log("  ✓ Staff-Service relations: all staff assigned to all services");

  // ── AVAILABILITY RULES (Tue–Sat 10am–7pm) ─────────────────

  // Location-wide defaults (staffId = null)
  const businessDays = [2, 3, 4, 5, 6]; // Tue, Wed, Thu, Fri, Sat
  const closedDays = [0, 1]; // Sun, Mon

  for (const day of businessDays) {
    await prisma.availabilityRule.upsert({
      where: { id: `default-day-${day}` },
      update: {},
      create: {
        id: `default-day-${day}`,
        staffId: null,
        dayOfWeek: day,
        startTime: "10:00",
        endTime: "19:00",
        isActive: true,
      },
    });
  }

  for (const day of closedDays) {
    await prisma.availabilityRule.upsert({
      where: { id: `default-day-${day}` },
      update: {},
      create: {
        id: `default-day-${day}`,
        staffId: null,
        dayOfWeek: day,
        startTime: "00:00",
        endTime: "00:00",
        isActive: false,
      },
    });
  }

  console.log("  ✓ Availability rules: Tue–Sat 10:00–19:00, Sun–Mon closed");

  console.log("\nBooking system seeded successfully.");
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
