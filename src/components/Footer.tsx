import Link from "next/link";
import Logo from "@/components/ui/Logo";
import { BOOK_URL, GIFT_CARD_URL, business, hours } from "@/lib/business";

const visitLinks = [
  { href: "/services", label: "Services" },
  { href: "/book", label: "Book & Pricing" },
  { href: "/experience", label: "The Head Spa Experience" },
  { href: "/gift-cards", label: "Gift Cards" },
  { href: "/contact", label: "Visit & Contact" },
];

const learnLinks = [
  { href: "/about", label: "About Lather" },
  { href: "/what-is-a-head-spa", label: "What Is a Head Spa?" },
  { href: "/scalp-concerns", label: "Scalp Concerns" },
  { href: "/journal", label: "Journal" },
  { href: "/faq", label: "FAQ" },
  { href: "/locations", label: "Areas We Serve" },
];

function LinkColumn({ title, items }: { title: string; items: typeof visitLinks }) {
  return (
    <>
      <h2 className="font-body text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-brass-light">
        {title}
      </h2>
      <ul className="mt-6 grid gap-2 text-[0.95rem]">
        {items.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="link-ul inline-block py-1 text-ivory/80 hover:text-ivory">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

/**
 * The footer is anchored by the wordmark run edge to edge — the last thing on
 * the page is the name, at a size nothing else on the site reaches. It is
 * decorative (the real link home is in the nav and in the address block), so it
 * carries no accessible name and is hidden from the a11y tree.
 */
export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-noir text-ivory/80">
      <div className="wrap grid gap-14 px-6 py-20 sm:px-10 md:grid-cols-2 lg:px-16 xl:grid-cols-[1.1fr_0.95fr_0.85fr_1.15fr]">
        <div>
          <Logo variant="stacked" className="h-20 w-auto text-ivory" title={business.name} />
          <p className="mt-8 max-w-sm text-[0.95rem] leading-relaxed text-ivory/70">
            Where modern wellness meets elevated self-care. Restorative spa experiences and advanced,
            personalized wellness care — Greenville, North Carolina.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href={BOOK_URL} target="_blank" rel="noopener noreferrer" className="btn-solid-light">
              Book Now
            </a>
            <a href={GIFT_CARD_URL} target="_blank" rel="noopener noreferrer" className="btn-outline-light">
              Buy a Gift Card
            </a>
          </div>
        </div>

        <nav aria-label="Footer — visit">
          <LinkColumn title="Visit" items={visitLinks} />
        </nav>

        <nav aria-label="Footer — learn">
          <LinkColumn title="Learn" items={learnLinks} />
        </nav>

        <div>
          <h2 className="font-body text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-brass-light">
            Find us
          </h2>
          <address className="mt-6 not-italic leading-relaxed text-ivory/80">
            <a
              href={business.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="link-ul inline-block py-1 hover:text-ivory"
            >
              {business.address.street}
              <br />
              {business.address.city}, {business.address.state} {business.address.zip}
            </a>
            <br />
            <a href={business.phoneHref} className="link-ul mt-2 inline-block py-1 hover:text-ivory">
              {business.phone}
            </a>
            <br />
            <a href={`mailto:${business.email}`} className="link-ul inline-block py-1 hover:text-ivory">
              {business.email}
            </a>
          </address>
          <ul className="mt-6 space-y-1 text-[0.85rem] text-ivory/70">
            {hours.map((h) => (
              <li key={h.day} className="flex justify-between gap-3 border-b border-ivory/15 pb-1">
                <span className="whitespace-nowrap">{h.day}</span>
                <span className="whitespace-nowrap">{h.open ? `${h.open} – ${h.close}` : "Closed"}</span>
              </li>
            ))}
          </ul>
          <a
            href={business.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="link-ul mt-6 inline-block py-1 text-[0.85rem] uppercase tracking-wideish text-brass-light"
          >
            Instagram {business.instagramHandle}
          </a>
        </div>
      </div>

      {/* The name, at full bleed. Slightly wider than the viewport and clipped
          by the footer's overflow-hidden so the outer letters run off both
          edges rather than sitting inside a margin. */}
      <div className="pointer-events-none select-none px-0 pb-2 pt-6" aria-hidden>
        <Logo variant="wordmark" className="w-[104%] -translate-x-[2%] text-ivory/[0.13]" title="" />
      </div>

      {/* Bottom bar — extra padding below xl clears the sticky booking bar */}
      <div className="border-t border-ivory/15">
        <div className="wrap flex flex-col items-center justify-between gap-3 px-6 pb-24 pt-6 text-[0.75rem] text-ivory/65 sm:flex-row sm:px-10 lg:px-16 xl:pb-6">
          <p>
            © {new Date().getFullYear()} {business.name}. All rights reserved.
          </p>
          <p className="flex flex-wrap items-center justify-center gap-x-2">
            <span>By appointment</span>
            <span aria-hidden>·</span>
            <span>{business.parking}</span>
            <span aria-hidden>·</span>
            <a
              href={business.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="link-ul inline-block py-1 hover:text-ivory"
            >
              Directions
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
