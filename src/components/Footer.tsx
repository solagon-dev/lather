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

const legalLinks = [
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Accessibility" },
  { href: "/contact", label: "Privacy" },
];

/** The small letterspaced label that heads each column. */
function ColumnLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-body text-[0.62rem] font-medium tracking-[0.02em] text-brass-light/80">
      {children}
    </h2>
  );
}

function LinkColumn({ title, items }: { title: string; items: typeof visitLinks }) {
  return (
    <div>
      <ColumnLabel>{title}</ColumnLabel>
      <ul className="mt-7 flex flex-col gap-1">
        {items.map((l) => (
          <li key={l.label}>
            <Link
              href={l.href}
              className="footer-link inline-block py-1 text-[0.95rem] text-ivory/70"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * The last thing on the page is the name, at a size nothing else reaches.
 *
 * Structurally this is four bands with a lot of air between them: a wide
 * navigation row, the practical detail, the wordmark run edge to edge, and a
 * hairline bottom bar. The generosity is the polish — a footer that crowds its
 * columns together reads as a sitemap, while the same links given room read as
 * the close of a piece of print.
 *
 * The wordmark is decorative (the real link home is in the nav and the address
 * block), so it carries no accessible name and is hidden from the a11y tree.
 */
export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-noir text-ivory/80">
      {/* ── navigation and detail ────────────────────────────── */}
      <div className="wrap grid items-start gap-14 px-6 pb-16 pt-24 sm:px-10 sm:pt-28 md:grid-cols-2 lg:px-16 xl:grid-cols-[1.25fr_0.9fr_0.9fr_1.1fr] xl:gap-10">
        <div>
          <ColumnLabel>Lather Spa &amp; Wellness</ColumnLabel>
          <p className="mt-7 max-w-sm font-display text-[1.6rem] leading-[1.22] tracking-[-0.01em] text-ivory">
            Where modern wellness meets <em className="italic">elevated self-care.</em>
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href={BOOK_URL} target="_blank" rel="noopener noreferrer" className="btn-solid-light">
              Book Appointment
            </a>
            <a
              href={GIFT_CARD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-light"
            >
              Gift Cards
            </a>
          </div>
        </div>

        <LinkColumn title="Visit" items={visitLinks} />
        <LinkColumn title="Learn" items={learnLinks} />

        <div>
          <ColumnLabel>Find us</ColumnLabel>
          <address className="mt-7 not-italic text-[0.95rem] leading-relaxed text-ivory/70">
            <a
              href={business.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link inline-block py-1"
            >
              {business.address.street}
              <br />
              {business.address.city}, {business.address.state} {business.address.zip}
            </a>
            <br />
            <a href={business.phoneHref} className="footer-link mt-3 inline-block py-1">
              {business.phone}
            </a>
            <br />
            <a href={`mailto:${business.email}`} className="footer-link inline-block py-1">
              {business.email}
            </a>
          </address>

          <ul className="mt-8 space-y-1.5 text-[0.82rem] tabular-nums text-ivory/55">
            {hours.map((h) => (
              <li key={h.day} className="flex justify-between gap-4">
                <span className="whitespace-nowrap">{h.day}</span>
                <span className="whitespace-nowrap">
                  {h.open ? `${h.open} – ${h.close}` : "Closed"}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── social ───────────────────────────────────────────── */}
      <div className="wrap flex flex-wrap items-baseline justify-between gap-6 border-t border-ivory/10 px-6 py-8 sm:px-10 lg:px-16">
        <ColumnLabel>Stay in touch with the spa</ColumnLabel>
        <ul className="flex flex-wrap items-center gap-x-8 gap-y-2">
          {[
            { href: business.instagram, label: "Instagram" },
            { href: business.mapsUrl, label: "Directions" },
          ]
            .filter((l) => l.href)
            .map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link inline-block py-1 text-[0.95rem] text-ivory/70"
                >
                  {l.label}
                  <span aria-hidden className="ml-1 text-[0.75em] align-super">
                    ↗
                  </span>
                </a>
              </li>
            ))}
        </ul>
      </div>

      {/* The name, at full bleed. Slightly wider than the viewport and clipped
          by the footer's overflow-hidden so the outer letters run off both
          edges rather than sitting inside a margin. */}
      <div className="pointer-events-none select-none px-0 pb-4 pt-10" aria-hidden>
        <Logo variant="letters" className="w-[104%] -translate-x-[2%] text-ivory/[0.17]" title="" />
      </div>

      {/* Bottom bar — extra padding below xl clears the sticky booking bar */}
      <div className="border-t border-ivory/10">
        <div className="wrap flex flex-col items-center justify-between gap-4 px-6 pb-24 pt-7 text-[0.72rem] text-ivory/50 sm:flex-row sm:px-10 lg:px-16 xl:pb-7">
          <ul className="flex flex-wrap items-center justify-center gap-x-7 gap-y-1">
            {legalLinks.map((l) => (
              <li key={l.label}>
                <Link href={l.href} className="footer-link inline-block py-1">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <p className="flex flex-wrap items-center justify-center gap-x-2">
            <span>
              © {new Date().getFullYear()} {business.name}
            </span>
            <span aria-hidden>·</span>
            <a
              href="https://solagon.com"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link inline-block py-1"
            >
              Built by Solagon
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
