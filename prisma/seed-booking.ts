import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding booking system data...");

  // ── SERVICES ────────────────────────────────────────────────

  const luxeRitual = await prisma.bookingService.upsert({
    where: { slug: "luxe-ritual" },
    update: {
      name: "The Luxe Ritual",
      description: "Our most indulgent experience — detoxifying scalp cleanse, exfoliation, extended massage, nourishing hair mask, steam infusion, rose petal jelly facial, and professional blowout.",
      durationMinutes: 90,
      price: 20000,
      tier: "premium",
      sortOrder: 1,
      isActive: true,
    },
    create: {
      name: "The Luxe Ritual",
      slug: "luxe-ritual",
      description: "Our most indulgent experience — detoxifying scalp cleanse, exfoliation, extended massage, nourishing hair mask, steam infusion, rose petal jelly facial, and professional blowout.",
      durationMinutes: 90,
      price: 20000, // $200.00 in cents
      bufferBeforeMinutes: 0,
      bufferAfterMinutes: 15,
      tier: "premium",
      sortOrder: 1,
      isActive: true,
    },
  });

  const classicRitual = await prisma.bookingService.upsert({
    where: { slug: "classic-ritual" },
    update: {
      name: "The Classic Ritual",
      description: "Detoxifying scalp cleanse, gentle exfoliation, tension-relieving massage, nourishing hair mask, steam infusion, and professional blowdry. Suitable for all hair types.",
      durationMinutes: 75,
      price: 12500,
      tier: "foundation",
      sortOrder: 2,
      isActive: true,
    },
    create: {
      name: "The Classic Ritual",
      slug: "classic-ritual",
      description: "Detoxifying scalp cleanse, gentle exfoliation, tension-relieving massage, nourishing hair mask, steam infusion, and professional blowdry. Suitable for all hair types.",
      durationMinutes: 75,
      price: 12500, // $125.00 in cents
      bufferBeforeMinutes: 0,
      bufferAfterMinutes: 15,
      tier: "foundation",
      sortOrder: 2,
      isActive: true,
    },
  });

  const gentlemansRecharge = await prisma.bookingService.upsert({
    where: { slug: "gentlemans-recharge" },
    update: {
      name: "Gentleman's Recharge",
      description: "A restorative experience designed for men — deep cleanse, scalp massage, and revitalizing treatment. Focused, effective care in a quiet space.",
      durationMinutes: 60,
      price: 10000,
      tier: "foundation",
      sortOrder: 3,
      isActive: true,
    },
    create: {
      name: "Gentleman's Recharge",
      slug: "gentlemans-recharge",
      description: "A restorative experience designed for men — deep cleanse, scalp massage, and revitalizing treatment. Focused, effective care in a quiet space.",
      durationMinutes: 60,
      price: 10000, // $100.00 in cents
      bufferBeforeMinutes: 0,
      bufferAfterMinutes: 15,
      tier: "foundation",
      sortOrder: 3,
      isActive: true,
    },
  });

  const blowout = await prisma.bookingService.upsert({
    where: { slug: "blowout" },
    update: {
      name: "Blowout",
      description: "Professional wash and blowdry styled to your desired look. Perfect for any occasion.",
      durationMinutes: 45,
      price: 5000,
      tier: "express",
      sortOrder: 4,
      isActive: true,
    },
    create: {
      name: "Blowout",
      slug: "blowout",
      description: "Professional wash and blowdry styled to your desired look. Perfect for any occasion.",
      durationMinutes: 45,
      price: 5000, // $50.00 in cents (starting at)
      bufferBeforeMinutes: 0,
      bufferAfterMinutes: 10,
      tier: "express",
      sortOrder: 4,
      isActive: true,
    },
  });

  // Deactivate retired services
  await prisma.bookingService.updateMany({
    where: { slug: { in: ["revitalize-restore", "nourish-fortify"] } },
    data: { isActive: false },
  });

  console.log(
    `  ✓ Services: ${luxeRitual.name}, ${classicRitual.name}, ${gentlemansRecharge.name}, ${blowout.name}`
  );
  console.log("  ✓ Deactivated: Revitalize & Restore, Nourish & Fortify");

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
    luxeRitual,
    classicRitual,
    gentlemansRecharge,
    blowout,
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
