import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function GET() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    let settings = await prisma.companySettings.findUnique({
      where: { id: "default" },
    });

    if (!settings) {
      settings = await prisma.companySettings.create({
        data: { id: "default" },
      });
    }

    return NextResponse.json({
      settings: {
        ...settings,
        businessHours: JSON.parse(settings.businessHours),
      },
    });
  } catch (e) {
    console.error("[Settings API] GET error:", e);
    return NextResponse.json({ error: "Failed to load settings" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json();
    const {
      businessName,
      tagline,
      businessDescription,
      phone,
      phoneSecondary,
      email,
      emailSupport,
      contactFormEmail,
      addressLine1,
      addressLine2,
      city,
      state,
      zip,
      country,
      googleMapsUrl,
      businessHours,
      hoursNote,
      instagramUrl,
      facebookUrl,
      tiktokUrl,
      bookingUrl,
      bookingCtaLabel,
      giftCardUrl,
      announcementText,
      announcementActive,
      copyrightText,
    } = body;

    // Basic validation
    const errors: string[] = [];
    if (!businessName?.trim()) errors.push("Business name is required");
    if (!phone?.trim()) errors.push("Phone number is required");
    if (!email?.trim()) errors.push("Email is required");
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push("Invalid email format");
    if (!addressLine1?.trim()) errors.push("Address is required");
    if (!city?.trim()) errors.push("City is required");
    if (!state?.trim()) errors.push("State is required");

    if (errors.length > 0) {
      return NextResponse.json({ error: errors.join(". ") }, { status: 400 });
    }

    const updated = await prisma.companySettings.upsert({
      where: { id: "default" },
      update: {
        businessName: businessName?.trim(),
        tagline: tagline?.trim() || "",
        businessDescription: businessDescription?.trim() || null,
        phone: phone?.trim(),
        phoneSecondary: phoneSecondary?.trim() || null,
        email: email?.trim(),
        emailSupport: emailSupport?.trim() || null,
        contactFormEmail: contactFormEmail?.trim() || null,
        addressLine1: addressLine1?.trim(),
        addressLine2: addressLine2?.trim() || null,
        city: city?.trim(),
        state: state?.trim(),
        zip: zip?.trim() || "",
        country: country?.trim() || "US",
        googleMapsUrl: googleMapsUrl?.trim() || null,
        businessHours: JSON.stringify(businessHours || []),
        hoursNote: hoursNote?.trim() || null,
        instagramUrl: instagramUrl?.trim() || null,
        facebookUrl: facebookUrl?.trim() || null,
        tiktokUrl: tiktokUrl?.trim() || null,
        bookingUrl: bookingUrl?.trim() || "/book",
        bookingCtaLabel: bookingCtaLabel?.trim() || "Book Your Ritual",
        giftCardUrl: giftCardUrl?.trim() || "/gift-cards",
        announcementText: announcementText?.trim() || null,
        announcementActive: Boolean(announcementActive),
        copyrightText: copyrightText?.trim() || null,
      },
      create: {
        id: "default",
        businessName: businessName?.trim(),
        phone: phone?.trim(),
        email: email?.trim(),
        addressLine1: addressLine1?.trim(),
        city: city?.trim(),
        state: state?.trim(),
        businessHours: JSON.stringify(businessHours || []),
      },
    });

    // Revalidate all pages that use company settings
    revalidatePath("/", "layout");

    return NextResponse.json({
      settings: {
        ...updated,
        businessHours: JSON.parse(updated.businessHours),
      },
    });
  } catch (e) {
    console.error("[Settings API] PUT error:", e);
    return NextResponse.json({ error: "Failed to save settings" }, { status: 500 });
  }
}
