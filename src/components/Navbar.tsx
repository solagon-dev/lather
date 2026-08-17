"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import Logo from "@/components/ui/Logo";
import { HERO_HANDOFF_VH, NAV_WORDMARK_ATTR } from "@/lib/hero-handoff";
import { motion } from "framer-motion";
import { BOOK_URL, business, hoursShort } from "@/lib/business";

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
 * One control, and the name arriving.
 *
 * At the top of the homepage the bar is only a Menu control: the hero carries
 * the wordmark at full size, so repeating it in the corner would be saying the
 * name twice on the same screen. Once the hero is scrolled past, the wordmark
 * hands itself off to the bar and stays there for the rest of the page — the
 * name is never absent and never doubled.
 *
 * Every interior page skips the handoff and shows the wordmark immediately,
 * because those pages have no hero holding it.
 *
 * Keyboard behaviour (focus trap, scroll lock, Escape, skip link) is unchanged
 * and is the part worth protecting.
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  // What the wordmark is currently sitting on. The page alternates porcelain
  // and noir sections, so a fixed colour is wrong for half the scroll.
  const [onDark, setOnDark] = useState(true);
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const overHero = pathname === "/" && !scrolled && !open;

  // `scrolled` drives the bar's tone; `pastHero` drives the wordmark handoff.
  // Both come from one passive listener and one rAF, so the nav costs a single
  // clamped read per frame rather than a layout thrash per scroll event.
  useEffect(() => {
    let raf = 0;
    const measure = () => {
      raf = 0;
      const y = window.scrollY;
      setScrolled(y > 24);
      // The hero owns roughly the first screen and a half; hand the name over
      // once the collapse has visibly finished.
      setPastHero(pathname !== "/" || y > window.innerHeight * HERO_HANDOFF_VH);

      // Sample whatever is directly behind the wordmark and pick the legible
      // ink. elementsFromPoint sees through the nav's own transparent layers,
      // so this reads the section underneath rather than the header itself.
      const probeX = window.innerWidth / 2;
      const probeY = 34;
      const stack = document.elementsFromPoint(probeX, probeY);
      const surface = stack.find(
        (el) => el instanceof HTMLElement && !el.closest("header") && isOpaque(el)
      ) as HTMLElement | undefined;
      // Falling back to "dark" was right when the hero was noir. With a light
      // hero it left the wordmark ivory on cream — invisible — for the whole
      // stretch where nothing opaque sits under the probe. The page's own
      // ground is the honest last resort.
      setOnDark(luminanceOf(surface ?? document.body) < 0.45);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [pathname]);

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
  const tone = overHero
    ? "bg-noir/30 text-ivory ring-ivory/20 hover:bg-noir/50"
    : "bg-ivory/80 text-ink ring-ink/10 hover:bg-ivory";

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <a
        href="#main"
        className="pointer-events-auto absolute left-4 top-4 z-[60] -translate-y-24 bg-ink px-4 py-3 text-sm text-ivory transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>

      <nav
        className="flex items-start justify-between gap-4 px-4 py-4 sm:px-7 sm:py-6"
        aria-label="Main"
      >
        {/* ── the only permanent control ─────────────────────── */}
        <button
          ref={toggleRef}
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="site-menu"
          className={`pointer-events-auto relative z-[60] flex items-center gap-2.5 px-5 py-3 font-body text-[0.66rem] font-medium tracking-[0.02em] ring-1 backdrop-blur-md transition-colors duration-500 ease-luxe ${
            open ? "bg-ivory text-ink ring-ink/10" : tone
          }`}
        >
          <span className="flex h-3 w-4 flex-col justify-between" aria-hidden>
            <span
              className={`block h-px w-full bg-current transition-transform duration-300 ${
                open ? "translate-y-[5.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-px w-full bg-current transition-opacity duration-200 ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-px w-full bg-current transition-transform duration-300 ${
                open ? "-translate-y-[5.5px] -rotate-45" : ""
              }`}
            />
          </span>
          {open ? "Close" : "Menu"}
        </button>

        {/* ── booking, always reachable ──────────────────────── */}
        {/* Matches the menu control's weight rather than shouting: the bar has
            exactly two things in it, and making one of them a loud filled
            button would unbalance a header whose whole point is restraint.
            Hidden while the menu is open, which carries its own booking link. */}
        <a
          href={BOOK_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={`pointer-events-auto relative z-[60] hidden items-center px-5 py-3 font-body text-[0.66rem] font-medium tracking-[0.02em] ring-1 backdrop-blur-md transition-colors duration-500 ease-luxe sm:inline-flex ${
            open ? "pointer-events-none opacity-0" : tone
          }`}
          tabIndex={open ? -1 : 0}
          aria-hidden={open}
        >
          Book appointment
        </a>

        {/* ── the name, arriving from the hero ───────────────── */}
        <motion.div
          className="pointer-events-none absolute inset-x-0 top-4 flex justify-center sm:top-6"
          initial={false}
          animate={{ opacity: pastHero && !open ? 1 : 0 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden={!pastHero || open}
        >
          <Link
            href="/"
            aria-label={`${business.name} — home`}
            className={`pointer-events-auto flex flex-col items-center px-4 py-3 transition-colors duration-500 ease-luxe ${
              onDark ? "text-ivory" : "text-ink"
            }`}
            tabIndex={pastHero && !open ? 0 : -1}
          >
            {/* The wrapper shrink-wraps the artwork, so the hero measures the
                mark's true box rather than the padded link around it. The
                descriptor is deliberately a *sibling*, not part of this box —
                the hero flies the letters alone and lands on this exact
                rectangle, and folding the descriptor in would change the
                target the flight was measured against. */}
            <span className="block" {...{ [NAV_WORDMARK_ATTR]: "" }}>
              <Logo variant="letters" className="h-[0.8rem] w-auto" title="" />
            </span>

            {/* Settles in after the name has landed: the wordmark arrives
                first and the descriptor follows it, so the bar assembles in
                the order you would read it. */}
            <motion.span
              className="mt-[0.42rem] block overflow-hidden"
              initial={false}
              animate={{ height: pastHero && !open ? "auto" : 0, opacity: pastHero && !open ? 1 : 0 }}
              transition={{ duration: 0.62, delay: pastHero ? 0.24 : 0, ease: [0.22, 1, 0.36, 1] }}
            >
              <Logo variant="descriptor" className="h-[0.46rem] w-auto opacity-90" title="" />
            </motion.span>
          </Link>
        </motion.div>
      </nav>

      {/* ── full-screen menu ─────────────────────────────────
          Animated with transform, not opacity: an opacity transition on this
          overlay gets stuck at 0 in Chrome when it composites over the
          autoplaying hero video, leaving the menu invisible.

          visibility:hidden is what takes the closed panel out of the tab order —
          pointer-events-none alone still leaves its links keyboard-focusable, so
          a keyboard user could tab into an off-screen menu. It flips only after
          the slide-out finishes, hence the 500ms delay on the visibility half of
          the transition. */}
      <div
        ref={panelRef}
        id="site-menu"
        style={{
          transitionProperty: "transform, visibility",
          transitionDuration: "600ms, 0s",
          transitionDelay: open ? "0s, 0s" : "0s, 600ms",
        }}
        className={`pointer-events-auto fixed inset-0 z-40 flex transform-gpu flex-col justify-between overflow-y-auto bg-porcelain px-6 pb-10 pt-28 ease-luxe sm:px-10 sm:pt-32 lg:px-16 ${
          open ? "visible translate-y-0" : "invisible -translate-y-full"
        }`}
      >
        <nav aria-label="All pages">
          <ul className="mx-auto flex w-full max-w-5xl flex-col">
            {links.map((l, i) => (
              <li key={l.href} className="border-b hairline">
                <Link
                  href={l.href}
                  aria-current={isActive(l.href) ? "page" : undefined}
                  className="group flex items-baseline justify-between gap-6 py-4 sm:py-5"
                >
                  <span
                    className={`font-display text-[clamp(2rem,5.5vw,3.75rem)] leading-tight transition-colors duration-300 group-hover:text-brass-dark ${
                      isActive(l.href) ? "text-brass-dark" : "text-ink"
                    }`}
                  >
                    {l.label}
                  </span>
                  <span className="font-body text-[0.62rem] tracking-[0.02em] text-taupe">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mx-auto mt-12 flex w-full max-w-5xl flex-col gap-6 border-t hairline pt-8 sm:flex-row sm:items-end sm:justify-between">
          <div className="text-[0.8rem] leading-relaxed text-umber">
            <p className="font-display text-lg text-ink">{business.address.street}</p>
            <p>
              {business.address.city}, {business.address.state} {business.address.zip}
            </p>
            <p className="mt-2">
              <a href={business.phoneHref} className="link-ul">
                {business.phone}
              </a>
            </p>
            <p className="mt-2 text-taupe">{hoursShort} · By appointment</p>
          </div>
          <a
            href={business.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="link-ul text-[0.7rem] tracking-[0.02em] text-brass-dark"
          >
            {business.instagramHandle}
          </a>
        </div>
      </div>
    </header>
  );
}

/** True when the element paints a background we can measure. */
function isOpaque(el: HTMLElement) {
  const bg = getComputedStyle(el).backgroundColor;
  const m = bg.match(/rgba?\(([^)]+)\)/);
  if (!m) return false;
  const parts = m[1].split(/[,\s/]+/).filter(Boolean).map(Number);
  return (parts[3] ?? 1) > 0.5;
}

/** Relative luminance of an element's background, 0 (black) to 1 (white). */
function luminanceOf(el: HTMLElement) {
  const m = getComputedStyle(el).backgroundColor.match(/rgba?\(([^)]+)\)/);
  if (!m) return 1;
  const [r, g, b] = m[1].split(/[,\s/]+/).filter(Boolean).map(Number);
  const lin = (c: number) => {
    const v = c / 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}
