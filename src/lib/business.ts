// ── BUSINESS FACTS ───────────────────────────────────────────
// Single source of truth for name/address/phone/hours.
// Updated per the "Lather Spa & Wellness" brand blueprint (rebrand from
// Lather Head Spa). Email is a placeholder pending confirmation.
//
// One brand, two businesses under one roof: the spa (`business`) and Lather
// Wellness Center PLLC (`wellness`), the medical practice. They book on
// separate Vagaro profiles and keep separate hours, so anything that books,
// lists hours or describes the practice must pick the right one. Vagaro is
// the source of truth for both — verified against it on 2026-11-02, and
// `npm run check:links` fails if either profile URL stops resolving.

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
  // The profile moved from /latherheadspa with the rebrand; the old slug
  // now 404s on Vagaro.
  vagaro: {
    profile: "https://www.vagaro.com/latherspa",
    booking: "https://www.vagaro.com/latherspa/services",
    giftCards: "https://www.vagaro.com/latherspa/gift-certificates",
  },
  paymentAccepted: "Visa, Mastercard, Discover",
  rating: {
    value: "5.0",
    count: 3,
  },
  parking: "Free parking on site",
};

// The medical practice. Same address and phone as the spa; its own legal
// entity, booking profile and hours. Vagaro takes wellness bookings as
// requests that the practice confirms.
export const wellness = {
  name: "Lather Wellness",
  legalName: "Lather Wellness Center PLLC",
  vagaro: {
    profile: "https://www.vagaro.com/latherwellness",
    booking: "https://www.vagaro.com/latherwellness/services",
  },
};

type DayHours = { day: string; short: string; open: string | null; close: string | null };

// Order: Monday first for display. Spa hours vary by day — copied from the
// spa's Vagaro profile, which is what clients actually book against.
export const hours: readonly DayHours[] = [
  { day: "Monday", short: "Mon", open: "10:00 AM", close: "2:00 PM" },
  { day: "Tuesday", short: "Tue", open: "10:00 AM", close: "8:00 PM" },
  { day: "Wednesday", short: "Wed", open: "4:00 PM", close: "7:00 PM" },
  { day: "Thursday", short: "Thu", open: "10:00 AM", close: "8:00 PM" },
  { day: "Friday", short: "Fri", open: "10:00 AM", close: "7:00 PM" },
  { day: "Saturday", short: "Sat", open: "9:00 AM", close: "3:00 PM" },
  { day: "Sunday", short: "Sun", open: null, close: null },
];

export const wellnessHours: readonly DayHours[] = [
  { day: "Monday", short: "Mon", open: "9:00 AM", close: "4:00 PM" },
  { day: "Tuesday", short: "Tue", open: "9:00 AM", close: "4:00 PM" },
  { day: "Wednesday", short: "Wed", open: "9:00 AM", close: "4:00 PM" },
  { day: "Thursday", short: "Thu", open: "9:00 AM", close: "4:00 PM" },
  { day: "Friday", short: "Fri", open: "9:00 AM", close: "4:00 PM" },
  { day: "Saturday", short: "Sat", open: null, close: null },
  { day: "Sunday", short: "Sun", open: null, close: null },
];

// Too irregular to compress into a range, so the short form names the days
// and leaves the times to the full table.
export const hoursShort = "Open Monday–Saturday";
export const wellnessHoursShort = "Mon–Fri 9–4";

/** Schema.org OpeningHoursSpecification values, derived from a table above. */
export function openingHoursSpecFor(table: readonly DayHours[]) {
  return table
    .filter((h) => h.open && h.close)
    .map((h) => ({ dayOfWeek: [h.day], opens: to24h(h.open!), closes: to24h(h.close!) }));
}

function to24h(t: string) {
  const [, hh, mm, ap] = t.match(/^(\d{1,2}):(\d{2}) (AM|PM)$/)!;
  const h = (Number(hh) % 12) + (ap === "PM" ? 12 : 0);
  return `${String(h).padStart(2, "0")}:${mm}`;
}

export const openingHoursSpec = openingHoursSpecFor(hours);

export const BOOK_URL = business.vagaro.booking;
export const GIFT_CARD_URL = business.vagaro.giftCards;
export const WELLNESS_BOOK_URL = wellness.vagaro.booking;
