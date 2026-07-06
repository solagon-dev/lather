import Link from "next/link";
import { BOOK_URL, GIFT_CARD_URL, business, hours } from "@/lib/business";

const explore = [
  { href: "/services", label: "Services" },
  { href: "/about", label: "About Lather" },
  { href: "/experience", label: "The Head Spa" },
  { href: "/gift-cards", label: "Gift Cards" },
  { href: "/journal", label: "Journal" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Visit & Contact" },
];

export default function Footer() {
  return (
    <footer className="relative bg-noir text-ivory/80">
      <div className="wrap grid gap-14 px-6 py-20 sm:px-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr] lg:px-16">
        <div>
          <p className="font-display text-2xl font-light tracking-[0.32em] text-ivory">LATHER</p>
          <p className="mt-1 text-[0.55rem] font-medium uppercase tracking-[0.5em] text-ivory/50">
            Spa &amp; Wellness
          </p>
          <p className="mt-6 max-w-sm text-[0.95rem] leading-relaxed text-ivory/60">
            Where modern wellness meets elevated self-care. Restorative spa experiences and advanced,
            personalized wellness care — Greenville, North Carolina.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href={BOOK_URL} target="_blank" rel="noopener" className="btn-solid-light">
              Book Now
            </a>
            <a href={GIFT_CARD_URL} target="_blank" rel="noopener" className="btn-outline-light">
              Gift Cards
            </a>
          </div>
        </div>

        <nav aria-label="Footer">
          <p className="font-display text-xl italic text-brass-light">Explore</p>
          <ul className="mt-6 grid gap-3 text-[0.95rem]">
            {explore.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="link-ul text-ivory/70 hover:text-ivory">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="font-display text-xl italic text-brass-light">Visit</p>
          <address className="mt-6 not-italic leading-relaxed text-ivory/70">
            <a href={business.mapsUrl} target="_blank" rel="noopener" className="link-ul hover:text-ivory">
              {business.address.street}
              <br />
              {business.address.city}, {business.address.state} {business.address.zip}
            </a>
            <br />
            <a href={business.phoneHref} className="link-ul mt-3 inline-block hover:text-ivory">
              {business.phone}
            </a>
            <br />
            <a href={`mailto:${business.email}`} className="link-ul inline-block hover:text-ivory">
              {business.email}
            </a>
          </address>
          <ul className="mt-6 space-y-1 text-[0.85rem] text-ivory/55">
            {hours.map((h) => (
              <li key={h.day} className="flex justify-between gap-6 border-b border-ivory/10 pb-1">
                <span>{h.day}</span>
                <span>{h.open ? `${h.open} – ${h.close}` : "Closed"}</span>
              </li>
            ))}
          </ul>
          <a
            href={business.instagram}
            target="_blank"
            rel="noopener"
            className="link-ul mt-6 inline-block text-[0.85rem] uppercase tracking-wideish text-brass-light"
          >
            Instagram {business.instagramHandle}
          </a>
        </div>
      </div>

      {/* Bottom bar — extra padding below lg clears the sticky booking bar */}
      <div className="border-t border-ivory/10">
        <div className="wrap flex flex-col items-center justify-between gap-3 px-6 pb-24 pt-6 text-[0.75rem] text-ivory/40 sm:flex-row sm:px-10 lg:px-16 lg:pb-6">
          <p>
            © {new Date().getFullYear()} {business.name}. All rights reserved.
          </p>
          <p>
            By appointment · {business.parking} ·{" "}
            <Link href="/contact" className="link-ul hover:text-ivory/70">
              Directions
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
