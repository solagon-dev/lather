"use client";

import { createContext, useContext } from "react";
import type { CompanySettings } from "@/lib/settings";

const SettingsContext = createContext<CompanySettings | null>(null);

export function SettingsProvider({
  settings,
  children,
}: {
  settings: CompanySettings;
  children: React.ReactNode;
}) {
  return (
    <SettingsContext.Provider value={settings}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings(): CompanySettings {
  const ctx = useContext(SettingsContext);
  if (!ctx) {
    // Return safe defaults if context is missing (e.g., admin pages)
    return {
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
      businessHours: [],
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
  }
  return ctx;
}
