"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import Logo from "@/components/ui/Logo";
import { BOOK_URL, business } from "@/lib/business";

// Pricing sits second: it is one of the first things a spa visitor looks for,
// and /book was previously reachable only from the footer and a few inline links.
const links = [
  { href: "/services", label: "Services" },
  { href: "/book", label: "Pricing" },
  { href: "/experience", label: "Head Spa" },
  { href: "/about", label: "About" },
  { href: "/gift-cards", label: "Gift Cards" },
  { href: "/journal", label: "Journal" },
  { href: "/contact", label: "Contact" },
];

/**
 * Floating chrome rather than a bar.
 *
 * The nav rides on top of the page as two translucent groups pinned to the
 * corners, so a full-bleed hero reads edge to edge with nothing cutting across
 * it. Backdrop blur — not a solid fill — keeps the controls legible over both
 * photography and porcelain, which is what lets the same treatment work on
 * every page without a light/dark variant.
 *
 * The keyboard behaviour (focus trap, scroll lock, Escape, skip link) is
 * unchanged from the previous bar and is the part worth protecting.
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Home opens on a dark full-bleed hero; interior pages open on porcelain.
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

  const close = useCallback(() => {
    setOpen(false);
    toggleRef.current?.focus();
  }, []);

  // While the panel is open it owns the keyboard: Escape closes it and Tab
  // cycles inside it, so focus can never land on the page underneath.
  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    panel?.querySelector<HTMLElement>("a, button")?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== "Tab" || !panel) return;
      const stops = [
        toggleRef.current,
        ...panel.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"),
      ].filter(Boolean) as HTMLElement[];
      if (stops.length === 0) return;
      const first = stops[0];
      const last = stops[stops.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, close]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const groupTone = overHero ? "bg-noir/35 text-ivory ring-ivory/20" : "bg-ivory/80 text-ink ring-ink/10";

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <a
        href="#main"
        className="pointer-events-auto absolute left-4 top-4 z-[60] -translate-y-24 bg-ink px-4 py-3 text-sm text-ivory transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>

      <nav
        className="wrap flex items-start justify-between gap-4 px-4 py-4 sm:px-8 sm:py-6 lg:px-12"
        aria-label="Main"
      >
        {/* ── brand ─────────────────────────────────────────── */}
        <Link
          href="/"
          aria-label={`${business.name} — home`}
          className={`pointer-events-auto relative z-[60] flex items-center gap-3 rounded-full px-4 py-2.5 ring-1 backdrop-blur-md transition-colors duration-500 ease-luxe sm:gap-3.5 sm:px-5 ${
            open ? "bg-noir/40 text-ivory ring-ivory/20" : groupTone
          }`}
        >
          <Logo variant="mark" className="h-7 w-auto sm:h-8" title="" />
          <span className="hidden leading-none sm:block">
            <Logo variant="letters" className="h-[0.72rem] w-auto" title="" />
          </span>
        </Link>

        {/* ── links + CTA ───────────────────────────────────── */}
        <div className="flex items-center gap-2 sm:gap-3">
          <ul
            // py-1.5 on the rail + py-2 on each link, rather than py-3 here and
            // none on the links: the anchor itself has to clear 24px to be a
            // valid target, and padding on the rail only pads the gaps between.
            className={`pointer-events-auto hidden items-center gap-6 rounded-full px-6 py-1.5 ring-1 backdrop-blur-md transition-colors duration-500 ease-luxe xl:flex ${groupTone}`}
          >
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={isActive(l.href) ? "page" : undefined}
                  className={`inline-block py-2 text-[0.68rem] font-medium uppercase tracking-[0.16em] transition-opacity duration-300 ${
                    isActive(l.href) ? "opacity-100" : "opacity-70 hover:opacity-100"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <a
            href={BOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`pointer-events-auto hidden rounded-full px-5 py-3 text-[0.68rem] font-medium uppercase tracking-[0.16em] ring-1 backdrop-blur-md transition-colors duration-500 ease-luxe sm:inline-flex ${
              overHero
                ? "bg-ivory/90 text-ink ring-transparent hover:bg-ivory"
                : "bg-ink text-ivory ring-transparent hover:bg-brass-dark"
            }`}
          >
            Book
          </a>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className={`pointer-events-auto relative z-[60] flex h-11 w-11 flex-col items-center justify-center gap-[6px] rounded-full ring-1 backdrop-blur-md transition-colors duration-500 ease-luxe xl:hidden ${
              open ? "bg-noir/40 text-ivory ring-ivory/20" : groupTone
            }`}
          >
            <span
              className={`block h-px w-5 bg-current transition-transform duration-300 ${
                open ? "translate-y-[3.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-px w-5 bg-current transition-transform duration-300 ${
                open ? "-translate-y-[3.5px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile / tablet menu — slides in from the right. Animated with
          transform, not opacity: an opacity transition on this overlay gets
          stuck at 0 in Chrome when it composites over the autoplaying hero
          video, leaving the menu invisible. translate-x is compositor-safe.

          visibility:hidden is what takes the closed panel out of the tab order —
          pointer-events-none alone still leaves its links keyboard-focusable, so
          a keyboard user could tab into an off-screen menu. It flips only after
          the slide-out finishes, hence the 500ms delay on the visibility half of
          the transition (transform still animates immediately). */}
      <div
        ref={panelRef}
        id="mobile-menu"
        style={{
          transitionProperty: "transform, visibility",
          transitionDuration: "500ms, 0s",
          transitionDelay: open ? "0s, 0s" : "0s, 500ms",
        }}
        className={`pointer-events-auto fixed inset-0 z-40 flex transform-gpu flex-col overflow-y-auto bg-noir px-6 pb-10 pt-28 ease-luxe sm:px-10 xl:hidden ${
          open ? "visible translate-x-0" : "invisible translate-x-full"
        }`}
      >
        <ul className="flex flex-col">
          {links.map((l) => (
            <li key={l.href} className="border-b border-ivory/10">
              <Link
                href={l.href}
                aria-current={isActive(l.href) ? "page" : undefined}
                className={`block py-4 font-display text-[2rem] leading-tight transition-colors duration-300 hover:text-brass-light sm:text-[2.5rem] ${
                  isActive(l.href) ? "text-brass-light" : "text-ivory/90"
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-auto flex flex-col gap-6 pt-10">
          <a href={BOOK_URL} target="_blank" rel="noopener noreferrer" className="btn-solid-light w-full">
            Book Appointment
          </a>
          <div className="text-center text-[0.7rem] uppercase tracking-kicker text-ivory/60">
            {business.address.city}, {business.address.state} ·{" "}
            <a href={business.phoneHref} className="inline-block py-2 text-ivory">
              {business.phone}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
