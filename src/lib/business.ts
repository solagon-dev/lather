// ── BUSINESS FACTS ───────────────────────────────────────────
// Single source of truth for name/address/phone/hours.
// Updated per the "Lather Spa & Wellness" brand blueprint (rebrand from
// Lather Head Spa). Booking remains on the existing Vagaro profile.
// Email is a placeholder pending confirmation.

export const business = {
  name: "Lather Spa & Wellness",
  legalName: "Lather Spa & Wellness",
  tagline: "Where modern wellness meets elevated self-care",
  description:
    "Lather Spa & Wellness is a modern wellness destination in Greenville, North Carolina, blending restorative spa experiences with advanced, personalized wellness care. Results-driven treatments in a luxury environment designed for relaxation, restoration, and long-term well-being.",
  phone: "(252) 531-0987",
  phoneHref: "tel:+12525310987",
  email: "hello@latherspas.com",
  address: {
    street: "101 Fox Haven Drive",
    city: "Greenville",
    state: "NC",
    zip: "27858",
    full: "101 Fox Haven Drive, Greenville, NC 27858",
  },
  geo: {
    latitude: 35.592213,
    longitude: -77.318938,
  },
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Lather+Spa+and+Wellness+101+Fox+Haven+Drive+Greenville+NC+27858",
  siteUrl: "https://www.latherspas.com",
  instagram: "https://www.instagram.com/lather_greenvillenc/",
  instagramHandle: "@lather_greenvillenc",
  vagaro: {
    profile: "https://www.vagaro.com/latherheadspa",
    booking: "https://www.vagaro.com/latherheadspa/services",
    giftCards: "https://www.vagaro.com/latherheadspa/gift-certificates",
  },
  rating: {
    value: "5.0",
    count: 3,
  },
  parking: "Free parking on site",
};

// Order: Monday first for display.
export const hours = [
  { day: "Monday", short: "Mon", open: "10:00 AM", close: "6:00 PM" },
  { day: "Tuesday", short: "Tue", open: "10:00 AM", close: "6:00 PM" },
  { day: "Wednesday", short: "Wed", open: "10:00 AM", close: "6:00 PM" },
  { day: "Thursday", short: "Thu", open: "10:00 AM", close: "6:00 PM" },
  { day: "Friday", short: "Fri", open: "10:00 AM", close: "6:00 PM" },
  { day: "Saturday", short: "Sat", open: "9:00 AM", close: "3:00 PM" },
  { day: "Sunday", short: "Sun", open: null, close: null },
] as const;

export const hoursShort = "Mon–Fri 10–6 · Sat 9–3";

// Schema.org OpeningHoursSpecification values
export const openingHoursSpec = [
  { dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "10:00", closes: "18:00" },
  { dayOfWeek: ["Saturday"], opens: "09:00", closes: "15:00" },
];

export const BOOK_URL = business.vagaro.booking;
export const GIFT_CARD_URL = business.vagaro.giftCards;
