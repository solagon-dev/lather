import { prisma } from "@/lib/db";
import { cache } from "react";

export interface BusinessHoursDay {
  day: string;
  open?: string;
  close?: string;
  closed?: boolean;
}

export interface CompanySettings {
  businessName: string;
  tagline: string;
  businessDescription: string | null;
  phone: string;
  phoneSecondary: string | null;
  email: string;
  emailSupport: string | null;
  contactFormEmail: string | null;
  addressLine1: string;
  addressLine2: string | null;
  city: string;
  state: string;
  zip: string;
  country: string;
  googleMapsUrl: string | null;
  businessHours: BusinessHoursDay[];
  hoursNote: string | null;
  instagramUrl: string | null;
  facebookUrl: string | null;
  tiktokUrl: string | null;
  bookingUrl: string;
  bookingCtaLabel: string;
  giftCardUrl: string;
  announcementText: string | null;
  announcementActive: boolean;
  copyrightText: string | null;
}

// Hardcoded defaults — used if DB is unreachable or settings row doesn't exist
const DEFAULTS: CompanySettings = {
  businessName: "Lather Head Spa",
  tagline: "Where the scalp breathes again.",
  businessDescription: null,
  phone: "(252) 531-0987",
  phoneSecondary: null,
  email: "hello@latherspas.com",
  emailSupport: null,
  contactFormEmail: null,
  addressLine1: "620 Lynndale Court",
  addressLine2: null,
  city: "Greenville",
  state: "NC",
  zip: "27858",
  country: "US",
  googleMapsUrl: null,
  businessHours: [
    { day: "Monday", closed: true },
    { day: "Tuesday", open: "10:00", close: "19:00" },
    { day: "Wednesday", open: "10:00", close: "19:00" },
    { day: "Thursday", open: "10:00", close: "19:00" },
    { day: "Friday", open: "10:00", close: "19:00" },
    { day: "Saturday", open: "10:00", close: "19:00" },
    { day: "Sunday", closed: true },
  ],
  hoursNote: null,
  instagramUrl: "https://www.instagram.com/latherheadspa",
  facebookUrl: "https://www.facebook.com/latherheadspa",
  tiktokUrl: null,
  bookingUrl: "/book",
  bookingCtaLabel: "Book Your Ritual",
  giftCardUrl: "/gift-cards",
  announcementText: null,
  announcementActive: false,
  copyrightText: null,
};

/**
 * Fetches company settings from the database.
 * Uses React cache() to deduplicate within a single request.
 * Falls back to hardcoded defaults if DB is unreachable.
 */
export const getCompanySettings = cache(async (): Promise<CompanySettings> => {
  try {
    let row = await prisma.companySettings.findUnique({
      where: { id: "default" },
    });

    // Auto-create the singleton row if it doesn't exist
    if (!row) {
      row = await prisma.companySettings.create({
        data: { id: "default" },
      });
    }

    return {
      businessName: row.businessName,
      tagline: row.tagline,
      businessDescription: row.businessDescription,
      phone: row.phone,
      phoneSecondary: row.phoneSecondary,
      email: row.email,
      emailSupport: row.emailSupport,
      contactFormEmail: row.contactFormEmail,
      addressLine1: row.addressLine1,
      addressLine2: row.addressLine2,
      city: row.city,
      state: row.state,
      zip: row.zip,
      country: row.country,
      googleMapsUrl: row.googleMapsUrl,
      businessHours: JSON.parse(row.businessHours) as BusinessHoursDay[],
      hoursNote: row.hoursNote,
      instagramUrl: row.instagramUrl,
      facebookUrl: row.facebookUrl,
      tiktokUrl: row.tiktokUrl,
      bookingUrl: row.bookingUrl,
      bookingCtaLabel: row.bookingCtaLabel,
      giftCardUrl: row.giftCardUrl,
      announcementText: row.announcementText,
      announcementActive: row.announcementActive,
      copyrightText: row.copyrightText,
    };
  } catch (e) {
    console.error("[Settings] Failed to load company settings:", e);
    return DEFAULTS;
  }
});

/** Format hours for display: "Tue – Sat · 10am – 7pm" */
export function formatHoursShort(hours: BusinessHoursDay[]): string {
  const openDays = hours.filter((d) => !d.closed && d.open && d.close);
  if (openDays.length === 0) return "Hours vary";

  const first = openDays[0];
  const last = openDays[openDays.length - 1];
  const dayShort = (d: string) => d.substring(0, 3);

  const formatTime = (t: string) => {
    const [h, m] = t.split(":").map(Number);
    const ampm = h >= 12 ? "pm" : "am";
    const h12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
    return m === 0 ? `${h12}${ampm}` : `${h12}:${String(m).padStart(2, "0")}${ampm}`;
  };

  return `${dayShort(first.day)} – ${dayShort(last.day)} · ${formatTime(first.open!)} – ${formatTime(first.close!)}`;
}

/** Format phone as tel: link */
export function phoneTel(phone: string): string {
  return `tel:+1${phone.replace(/\D/g, "")}`;
}

/** Full address string */
export function fullAddress(s: CompanySettings): string {
  const parts = [s.addressLine1, s.addressLine2, `${s.city}, ${s.state} ${s.zip}`];
  return parts.filter(Boolean).join("\n");
}
