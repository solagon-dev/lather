// ── BUSINESS FACTS ───────────────────────────────────────────
// Single source of truth for name/address/phone/hours.
// Verified against Lather's live Vagaro profile and Instagram (July 2026).

export const business = {
  name: "Lather Head Spa",
  legalName: "Lather Head Spa",
  tagline: "A facial for your scalp",
  description:
    "Lather Head Spa is a premier beauty wellness establishment in Greenville, North Carolina. We combine ultimate relaxation with results-oriented scalp and hair treatments — a tranquil oasis for a truly luxurious head spa experience.",
  phone: "(252) 531-0987",
  phoneHref: "tel:+12525310987",
  email: "hello@latherspas.com",
  address: {
    street: "620 Lynndale Court, Unit B",
    city: "Greenville",
    state: "NC",
    zip: "27858",
    full: "620 Lynndale Court, Unit B, Greenville, NC 27858",
  },
  geo: {
    latitude: 35.578987,
    longitude: -77.369931,
  },
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Lather+Head+Spa+620+Lynndale+Court+Greenville+NC+27858",
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

// Order: Monday first for display. Verified on Vagaro July 2026.
export const hours = [
  { day: "Monday", short: "Mon", open: "10:00 AM", close: "8:00 PM" },
  { day: "Tuesday", short: "Tue", open: "10:00 AM", close: "8:00 PM" },
  { day: "Wednesday", short: "Wed", open: "10:00 AM", close: "5:00 PM" },
  { day: "Thursday", short: "Thu", open: "10:00 AM", close: "5:00 PM" },
  { day: "Friday", short: "Fri", open: "10:00 AM", close: "5:00 PM" },
  { day: "Saturday", short: "Sat", open: null, close: null },
  { day: "Sunday", short: "Sun", open: null, close: null },
] as const;

export const hoursShort = "Mon–Tue 10–8 · Wed–Fri 10–5";

// Schema.org OpeningHoursSpecification values
export const openingHoursSpec = [
  { dayOfWeek: ["Monday", "Tuesday"], opens: "10:00", closes: "20:00" },
  { dayOfWeek: ["Wednesday", "Thursday", "Friday"], opens: "10:00", closes: "17:00" },
];

export const BOOK_URL = business.vagaro.booking;
export const GIFT_CARD_URL = business.vagaro.giftCards;
