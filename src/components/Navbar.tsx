"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const treatmentSubLinks = [
  { label: "All Treatments", href: "/treatments" },
  { label: "What Is a Head Spa", href: "/what-is-a-head-spa" },
  { label: "Scalp Concerns", href: "/scalp-concerns" },
  { label: "Memberships", href: "/memberships" },
  { label: "Spa Parties", href: "/spa-parties" },
  { label: "Gift Cards", href: "/gift-cards" },
];

const darkHeroRoutes = [
  "/",
  "/about",
  "/contact",
  "/what-is-a-head-spa",
  "/team",
  "/spa-parties",
  "/memberships",
  "/locations",
  "/scalp-concerns",
  "/journal",
  "/faq",
  "/book",
];

function hasDarkHero(pathname: string): boolean {
  if (darkHeroRoutes.includes(pathname)) return true;
  if (pathname.startsWith("/treatments/") && pathname.split("/").length > 2) return true;
  if (pathname.startsWith("/locations/")) return true;
  if (pathname.startsWith("/head-spa-near/")) return true;
  if (pathname.startsWith("/scalp-treatment/")) return true;
  if (pathname.startsWith("/japanese-head-spa/")) return true;
  if (pathname.startsWith("/scalp-massage/")) return true;
  if (pathname.startsWith("/journal/") && pathname.split("/").length > 2) return true;
  return false;
}

const mobileNavLinks = [
  { label: "Treatments", href: "/treatments" },
  { label: "About", href: "/about" },
  { label: "Journal", href: "/journal" },
  { label: "Contact", href: "/contact" },
  { label: "Team", href: "/team" },
];

const mobileSecondaryLinks = [
  { label: "Memberships", href: "/memberships" },
  { label: "Gift Cards", href: "/gift-cards" },
  { label: "Spa Parties", href: "/spa-parties" },
  { label: "FAQ + Policies", href: "/faq" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const darkHero = hasDarkHero(pathname);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const openDropdown = () => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setDropdownOpen(true);
  };
  const closeDropdown = () => {
    dropdownTimeout.current = setTimeout(() => setDropdownOpen(false), 120);
  };

  const navLinks = [
    { label: "About", href: isHome ? "#about" : "/about" },
    { label: "Journal", href: "/journal" },
    { label: "Contact", href: "/contact" },
  ];

  const useLightText = !scrolled && darkHero;
  const textColor = useLightText ? "rgba(255,255,255,0.82)" : "var(--mink)";
  const textHover = useLightText ? "#FFFFFF" : "var(--bark)";
  const logoColor = useLightText ? "rgba(255,255,255,0.96)" : "var(--bark)";
  const hamburgerColor = menuOpen ? "var(--linen)" : (useLightText ? "#FFFFFF" : "var(--bark)");

  const navLinkStyle: React.CSSProperties = {
    fontFamily: "var(--font-body)",
    fontSize: "0.67rem",
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    color: textColor,
    textDecoration: "none",
    transition: "color 0.25s ease",
  };

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          padding: scrolled ? "14px clamp(20px, 4vw, 48px)" : "clamp(16px, 3vw, 28px) clamp(20px, 4vw, 48px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: scrolled && !menuOpen ? "rgba(247,243,238,0.95)" : "transparent",
          backdropFilter: scrolled && !menuOpen ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled && !menuOpen ? "blur(20px)" : "none",
          borderBottom: scrolled && !menuOpen ? "1px solid rgba(140,123,107,0.1)" : "none",
          transition: "padding 0.5s var(--ease-luxury), background 0.5s var(--ease-luxury), border-color 0.5s ease",
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none", zIndex: 60, position: "relative" }} onClick={() => menuOpen && setMenuOpen(false)}>
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.5rem",
              fontWeight: 300,
              letterSpacing: "0.18em",
              color: menuOpen ? "var(--linen)" : (scrolled ? "var(--bark)" : logoColor),
              textTransform: "uppercase",
              display: "block",
              transition: "color 0.4s var(--ease-luxury)",
              lineHeight: 1,
            }}
          >
            Lather
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex" style={{ alignItems: "center", gap: "2.5rem" }}>
          <div
            style={{ position: "relative" }}
            onMouseEnter={openDropdown}
            onMouseLeave={closeDropdown}
          >
            {isHome ? (
              <a
                href="#services"
                style={{ ...navLinkStyle, position: "relative", cursor: "pointer" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = textHover)}
                onMouseLeave={(e) => (e.currentTarget.style.color = textColor)}
              >
                Treatments
              </a>
            ) : (
              <Link
                href="/treatments"
                style={navLinkStyle}
                onMouseEnter={(e) => (e.currentTarget.style.color = textHover)}
                onMouseLeave={(e) => (e.currentTarget.style.color = textColor)}
              >
                Treatments
              </Link>
            )}

            <div
              style={{
                position: "absolute",
                top: "100%",
                left: "-16px",
                paddingTop: "14px",
                opacity: dropdownOpen ? 1 : 0,
                pointerEvents: dropdownOpen ? "auto" : "none",
                transform: dropdownOpen ? "translateY(0)" : "translateY(-6px)",
                transition: "opacity 0.25s ease, transform 0.3s var(--ease-luxury)",
              }}
            >
              <div
                style={{
                  background: scrolled || !darkHero ? "rgba(247,243,238,0.98)" : "rgba(30,22,16,0.92)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  border: scrolled || !darkHero
                    ? "1px solid rgba(140,123,107,0.12)"
                    : "1px solid rgba(255,255,255,0.1)",
                  padding: "16px 8px",
                  minWidth: "200px",
                }}
              >
                {treatmentSubLinks.map((sub) => (
                  <Link
                    key={sub.href}
                    href={sub.href}
                    style={{
                      display: "block",
                      fontFamily: "var(--font-body)",
                      fontSize: "0.62rem",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: scrolled || !darkHero ? "var(--mink)" : "rgba(237,230,219,0.7)",
                      textDecoration: "none",
                      padding: "9px 16px",
                      transition: "color 0.2s ease, background 0.2s ease",
                      whiteSpace: "nowrap",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = scrolled || !darkHero ? "var(--bark)" : "var(--linen)";
                      e.currentTarget.style.background = scrolled || !darkHero
                        ? "rgba(140,123,107,0.06)"
                        : "rgba(255,255,255,0.06)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = scrolled || !darkHero ? "var(--mink)" : "rgba(237,230,219,0.7)";
                      e.currentTarget.style.background = "transparent";
                    }}
                  >
                    {sub.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {navLinks.map((link) =>
            link.href.startsWith("#") ? (
              <a
                key={link.label}
                href={link.href}
                style={navLinkStyle}
                onMouseEnter={(e) => (e.currentTarget.style.color = textHover)}
                onMouseLeave={(e) => (e.currentTarget.style.color = textColor)}
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                style={navLinkStyle}
                onMouseEnter={(e) => (e.currentTarget.style.color = textHover)}
                onMouseLeave={(e) => (e.currentTarget.style.color = textColor)}
              >
                {link.label}
              </Link>
            )
          )}

          <Link
            href="/book"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.62rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: scrolled ? "var(--cream)" : (useLightText ? "rgba(255,255,255,0.92)" : "var(--cream)"),
              background: scrolled ? "var(--bark)" : (useLightText ? "rgba(255,255,255,0.13)" : "var(--bark)"),
              border: scrolled ? "1px solid transparent" : (useLightText ? "1px solid rgba(255,255,255,0.45)" : "1px solid transparent"),
              padding: "11px 26px",
              textDecoration: "none",
              transition: "all 0.3s var(--ease-luxury)",
              display: "inline-block",
            }}
            onMouseEnter={(e) => {
              if (scrolled || !useLightText) {
                e.currentTarget.style.background = "var(--mink)";
              } else {
                e.currentTarget.style.background = "rgba(255,255,255,0.24)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.85)";
              }
            }}
            onMouseLeave={(e) => {
              if (scrolled || !useLightText) {
                e.currentTarget.style.background = "var(--bark)";
              } else {
                e.currentTarget.style.background = "rgba(255,255,255,0.13)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.45)";
              }
            }}
          >
            Book Now
          </Link>
        </nav>

        {/* Hamburger */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "12px 8px 12px 16px",
            zIndex: 60,
            position: "relative",
          }}
        >
          <div style={{ width: "26px", height: "18px", position: "relative" }}>
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  position: "absolute",
                  left: 0,
                  width: "100%",
                  height: "1px",
                  background: hamburgerColor,
                  top: i === 0 ? 0 : i === 1 ? "50%" : "100%",
                  transform:
                    menuOpen
                      ? i === 0 ? "translateY(9px) rotate(45deg)"
                      : i === 2 ? "translateY(-9px) rotate(-45deg)"
                      : "scaleX(0)"
                    : i === 1 ? "translateY(-50%)" : "none",
                  transition: "transform 0.35s var(--ease-luxury), opacity 0.2s ease, background 0.3s ease",
                  opacity: menuOpen && i === 1 ? 0 : 1,
                  transformOrigin: "center",
                }}
              />
            ))}
          </div>
        </button>
      </header>

      {/* ── Mobile Full-Screen Menu ── */}
      <div
        aria-hidden={!menuOpen}
        style={{
          position: "fixed",
          inset: 0,
          background: "var(--charcoal)",
          zIndex: 49,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
          transition: "opacity 0.45s var(--ease-luxury)",
          overflow: "hidden",
        }}
      >
        {/* Ambient glow */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse at 20% 40%, rgba(212,184,168,0.1), transparent 60%), radial-gradient(ellipse at 80% 80%, rgba(163,172,148,0.06), transparent 50%)",
            pointerEvents: "none",
          }}
        />

        {/* Main content */}
        <nav
          style={{
            position: "relative",
            zIndex: 1,
            paddingTop: "clamp(100px, 16vh, 140px)",
            paddingLeft: "clamp(28px, 6vw, 48px)",
            paddingRight: "clamp(28px, 6vw, 48px)",
            flex: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Primary links — large editorial type, left-aligned */}
          <div style={{ marginBottom: "2.5rem" }}>
            {mobileNavLinks.map((link, i) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  display: "block",
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2rem, 8vw, 2.8rem)",
                  fontWeight: 300,
                  color: "var(--linen)",
                  textDecoration: "none",
                  letterSpacing: "0.04em",
                  lineHeight: 1.15,
                  padding: "0.55rem 0",
                  opacity: menuOpen ? 1 : 0,
                  transform: menuOpen ? "translateY(0)" : "translateY(12px)",
                  transitionDelay: menuOpen ? `${0.1 + i * 0.05}s` : "0s",
                  transitionProperty: "opacity, transform",
                  transitionDuration: "0.5s",
                  transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Divider */}
          <div style={{ width: "32px", height: "1px", background: "var(--blush)", opacity: 0.3, marginBottom: "1.5rem" }} />

          {/* Secondary links — compact 2-column grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.6rem 2rem", marginBottom: "2.5rem" }}>
            {mobileSecondaryLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.72rem",
                  letterSpacing: "0.08em",
                  color: "rgba(237,230,219,0.45)",
                  textDecoration: "none",
                  lineHeight: 1.5,
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Book CTA */}
          <Link
            href="/book"
            onClick={() => setMenuOpen(false)}
            style={{
              display: "block",
              fontFamily: "var(--font-body)",
              fontSize: "0.58rem",
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              textAlign: "center",
              color: "var(--bark)",
              background: "var(--linen)",
              padding: "16px 32px",
              textDecoration: "none",
              alignSelf: "stretch",
            }}
          >
            Reserve Your Ritual
          </Link>
        </nav>

        {/* Footer bar */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            padding: "0 clamp(28px, 6vw, 48px) clamp(28px, 4vh, 40px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.54rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(237,230,219,0.22)",
            }}
          >
            Greenville, NC
          </p>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.54rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(237,230,219,0.22)",
            }}
          >
            Tue – Sat &nbsp;·&nbsp; 10am – 7pm
          </p>
        </div>
      </div>
    </>
  );
}
