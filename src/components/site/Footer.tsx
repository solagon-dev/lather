import Link from "next/link";
import Logo from "@/components/ui/Logo";
import { business, wellness } from "@/lib/business";

const main = [
  { href: "/spa", label: "The Spa" },
  { href: "/wellness", label: "Wellness" },
  { href: "/menu", label: "Menu" },
  { href: "/gift-cards", label: "Gift cards" },
  { href: "/about", label: "Our story" },
  { href: "/visit", label: "Visit" },
];

// Pages for search, not navigation.
const more = [
  { href: "/what-is-a-head-spa", label: "What is a head spa?" },
  { href: "/journal", label: "Journal" },
  { href: "/locations", label: "Areas we serve" },
];

/** The wordmark across the full measure, on cocoa. */
export default function Footer() {
  return (
    <footer className="bg-ink pb-[112px] text-[#E9DFD1] lg:pb-0">
      <div className="shell pb-14 pt-14 lg:pb-16 lg:pt-20">
        <div className="lg:grid lg:grid-cols-[1fr_auto] lg:items-end lg:gap-16">
          <div>
            <Logo variant="mark" className="h-10 w-auto text-brass-light" title="" />
            <p className="mt-6 font-mark text-[3.125rem] leading-none tracking-[0.24em] text-porcelain lg:text-[5.5rem]">
              LATHER
            </p>
            <p className="mt-2.5 font-body text-[0.65625rem] tracking-[0.5em] text-brass-light">SPA &amp; WELLNESS</p>
          </div>
          <address className="mt-10 not-italic lg:mt-0 lg:text-right">
            <a
              href={business.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block font-display text-[1.125rem] leading-snug text-porcelain hover:text-brass-light"
            >
              {business.address.street}
              <br />
              {business.address.city}, {business.address.state} {business.address.zip}
            </a>
            <a href={business.phoneHref} className="mt-2 block font-display text-[1.125rem] text-porcelain hover:text-brass-light">
              {business.phone}
            </a>
          </address>
        </div>

        <nav
          aria-label="Footer"
          className="mt-11 grid grid-cols-2 gap-x-5 gap-y-3.5 border-t border-porcelain/15 pt-6 sm:grid-cols-3 lg:grid-cols-6"
        >
          {main.map((l) => (
            <Link key={l.href} href={l.href} className="cap text-[#E9DFD1] hover:text-brass-light">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-baseline lg:justify-between">
          <a
            href={business.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="font-display text-[1.125rem] text-porcelain hover:text-brass-light"
          >
            {business.instagramHandle}
          </a>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {more.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="note text-[#BFAF9B] hover:text-porcelain">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <p className="note mt-7 text-[#BFAF9B]">
          {wellness.legalName}. Prices are subject to change. &copy; {new Date().getFullYear()} {business.name}.{" "}
          <a href="https://solagon.com" target="_blank" rel="noopener noreferrer" className="hover:text-porcelain">
            Site by Solagon
          </a>
        </p>
      </div>
    </footer>
  );
}
