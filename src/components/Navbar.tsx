"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BOOK_URL, business } from "@/lib/business";

const links = [
  { href: "/services", label: "Services" },
  { href: "/experience", label: "The Experience" },
  { href: "/about", label: "About" },
  { href: "/gift-cards", label: "Gift Cards" },
  { href: "/journal", label: "Journal" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Home has a full-bleed dark hero behind the nav; everywhere else the nav sits on porcelain.
  const overHero = pathname === "/" && !scrolled && !open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const tone = overHero ? "text-ivory" : "text-ink";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-luxe ${
        scrolled && !open ? "bg-porcelain/90 shadow-[0_1px_0_rgba(36,28,18,0.08)] backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <a
        href="#main"
        className="absolute left-4 top-4 z-[60] -translate-y-24 bg-ink px-4 py-2 text-sm text-ivory transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>

      <nav className={`wrap flex items-center justify-between px-6 py-5 sm:px-10 lg:px-16 ${tone}`} aria-label="Main">
        <Link href="/" className="group relative z-[60] flex flex-col leading-none" aria-label={`${business.name} — home`}>
          <span className={`font-display text-[1.55rem] font-light tracking-[0.32em] ${open ? "text-ivory" : ""}`}>
            LATHER
          </span>
          <span className={`mt-1 text-[0.55rem] font-medium uppercase tracking-[0.5em] opacity-70 ${open ? "text-ivory" : ""}`}>
            Head Spa
          </span>
        </Link>

        <ul className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={`link-ul text-[0.72rem] font-medium uppercase tracking-wideish ${
                  pathname.startsWith(l.href) ? "opacity-100" : "opacity-80 hover:opacity-100"
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li>
            <a
              href={BOOK_URL}
              target="_blank"
              rel="noopener"
              className={overHero ? "btn-outline-light !px-6 !py-3" : "btn-solid !px-6 !py-3"}
            >
              Book Now
            </a>
          </li>
        </ul>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className={`relative z-[60] flex h-10 w-10 flex-col items-center justify-center gap-[7px] lg:hidden ${open ? "text-ivory" : ""}`}
        >
          <span
            className={`block h-px w-7 bg-current transition-transform duration-300 ${open ? "translate-y-[4px] rotate-45" : ""}`}
          />
          <span
            className={`block h-px w-7 bg-current transition-transform duration-300 ${open ? "-translate-y-[4px] -rotate-45" : ""}`}
          />
        </button>
      </nav>

      {/* Mobile overlay menu */}
      <div
        className={`fixed inset-0 z-40 flex flex-col bg-noir px-8 pb-10 pt-32 transition-opacity duration-500 ease-luxe lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <ul className="flex flex-col gap-1">
          {links.map((l, i) => (
            <li key={l.href} style={{ transitionDelay: `${i * 40}ms` }}>
              <Link
                href={l.href}
                className="block py-3 font-display text-3xl font-light text-ivory/90 hover:text-brass-light"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-auto flex flex-col gap-6">
          <a href={BOOK_URL} target="_blank" rel="noopener" className="btn-solid-light w-full">
            Book Your Ritual
          </a>
          <div className="text-center text-xs uppercase tracking-kicker text-ivory/50">
            {business.address.city}, {business.address.state} ·{" "}
            <a href={business.phoneHref} className="text-ivory/70">
              {business.phone}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
