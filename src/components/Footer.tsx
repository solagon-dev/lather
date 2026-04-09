"use client";

import Link from "next/link";

const navLinks = [
  { label: "Treatments", href: "/treatments" },
  { label: "What Is a Head Spa", href: "/what-is-a-head-spa" },
  { label: "Scalp Concerns", href: "/scalp-concerns" },
  { label: "About", href: "/about" },
  { label: "Team", href: "/team" },
  { label: "Journal", href: "/journal" },
  { label: "Contact", href: "/contact" },
];

const serviceLinks = [
  { label: "The Luxe Ritual", href: "/treatments/luxe-ritual" },
  { label: "The Classic Ritual", href: "/treatments/classic-ritual" },
  { label: "Gentleman's Recharge", href: "/treatments/gentlemans-recharge" },
  { label: "Blowout", href: "/treatments/blowout" },
  { label: "Memberships", href: "/memberships" },
  { label: "Spa Parties", href: "/spa-parties" },
  { label: "Gift Cards", href: "/gift-cards" },
  { label: "FAQ + Policies", href: "/faq" },
];

const locationLinks = [
  { label: "Greenville, NC", href: "/locations/greenville-head-spa" },
  { label: "Winterville, NC", href: "/locations/winterville-head-spa" },
  { label: "Ayden, NC", href: "/locations/ayden-head-spa" },
  { label: "Kinston, NC", href: "/locations/kinston-head-spa" },
  { label: "Washington, NC", href: "/locations/washington-nc-head-spa" },
  { label: "All Locations →", href: "/locations" },
];

const footerLinkStyle: React.CSSProperties = {
  display: "block",
  fontFamily: "var(--font-body)",
  fontSize: "0.82rem",
  color: "rgba(237,230,219,0.48)",
  textDecoration: "none",
  marginBottom: "0.9rem",
  letterSpacing: "0.02em",
  transition: "color 0.2s ease",
};

const footerHeadStyle: React.CSSProperties = {
  fontFamily: "var(--font-body)",
  fontSize: "0.55rem",
  letterSpacing: "0.28em",
  textTransform: "uppercase",
  color: "rgba(237,230,219,0.26)",
  marginBottom: "1.5rem",
};

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      style={footerLinkStyle}
      onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(237,230,219,0.88)")}
      onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(237,230,219,0.48)")}
    >
      {children}
    </Link>
  );
}

export default function Footer() {
  return (
    <footer
      className="section-pad"
      style={{
        background: "var(--charcoal)",
        padding: "80px 48px 40px",
        position: "relative",
        borderTop: "1px solid rgba(237,230,219,0.06)",
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        {/* ── Desktop: full 5-column grid ── */}
        <div
          className="footer-top-grid footer-desktop"
          style={{
            display: "grid",
            gridTemplateColumns: "1.5fr 1fr 1fr 1fr 1fr",
            gap: "3rem",
            paddingBottom: "56px",
            borderBottom: "1px solid rgba(237,230,219,0.07)",
            marginBottom: "36px",
          }}
        >
          {/* Brand column */}
          <div>
            <Link href="/" style={{ textDecoration: "none", display: "inline-block", marginBottom: "1.5rem" }}>
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.8rem",
                  fontWeight: 300,
                  letterSpacing: "0.18em",
                  color: "var(--linen)",
                  textTransform: "uppercase",
                  display: "block",
                }}
              >
                Lather
              </span>
            </Link>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.82rem",
                lineHeight: 1.85,
                color: "rgba(237,230,219,0.4)",
                fontWeight: 300,
                maxWidth: "240px",
                marginBottom: "2.25rem",
              }}
            >
              A luxury head spa in Greenville, NC. Where the scalp breathes again.
            </p>
            <Link
              href="/book"
              style={{
                display: "inline-block",
                fontFamily: "var(--font-body)",
                fontSize: "0.6rem",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "var(--bark)",
                background: "var(--linen)",
                padding: "12px 22px",
                textDecoration: "none",
                transition: "background 0.25s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "var(--cream)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "var(--linen)")}
            >
              Book Now
            </Link>
          </div>

          {/* Navigate */}
          <div>
            <p style={footerHeadStyle}>Navigate</p>
            {navLinks.map((link) => <FooterLink key={link.label} href={link.href}>{link.label}</FooterLink>)}
          </div>

          {/* Services */}
          <div>
            <p style={footerHeadStyle}>Services</p>
            {serviceLinks.map((link) => <FooterLink key={link.label} href={link.href}>{link.label}</FooterLink>)}
          </div>

          {/* Locations */}
          <div>
            <p style={footerHeadStyle}>Locations</p>
            {locationLinks.map((link) => <FooterLink key={link.label} href={link.href}>{link.label}</FooterLink>)}
          </div>

          {/* Contact info */}
          <div>
            <p style={footerHeadStyle}>Find Us</p>
            {[
              { label: "620 Lynndale Court", href: null },
              { label: "Greenville, NC 27858", href: null },
              { label: "Tue–Sat, 10am–7pm", href: null },
              { label: "hello@latherspas.com", href: "mailto:hello@latherspas.com" },
              { label: "(252) 531-0987", href: "tel:+12525310987" },
            ].map((item) =>
              item.href ? (
                <a
                  key={item.label}
                  href={item.href}
                  style={footerLinkStyle}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(237,230,219,0.88)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(237,230,219,0.48)")}
                >
                  {item.label}
                </a>
              ) : (
                <p
                  key={item.label}
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.82rem",
                    color: "rgba(237,230,219,0.36)",
                    marginBottom: "0.9rem",
                    letterSpacing: "0.02em",
                  }}
                >
                  {item.label}
                </p>
              )
            )}
          </div>
        </div>

        {/* ── Mobile: compact editorial footer ── */}
        <div className="footer-mobile" style={{ display: "none" }}>
          {/* Brand + CTA */}
          <div style={{ marginBottom: "2.5rem" }}>
            <Link href="/" style={{ textDecoration: "none", display: "inline-block", marginBottom: "1rem" }}>
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.5rem",
                  fontWeight: 300,
                  letterSpacing: "0.18em",
                  color: "var(--linen)",
                  textTransform: "uppercase",
                }}
              >
                Lather
              </span>
            </Link>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.82rem",
                lineHeight: 1.75,
                color: "rgba(237,230,219,0.38)",
                fontWeight: 300,
                marginBottom: "1.5rem",
              }}
            >
              A luxury head spa in Greenville, NC.
              <br />
              Where the scalp breathes again.
            </p>
            <Link
              href="/book"
              style={{
                display: "block",
                fontFamily: "var(--font-body)",
                fontSize: "0.58rem",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                textAlign: "center",
                color: "var(--bark)",
                background: "var(--linen)",
                padding: "15px 24px",
                textDecoration: "none",
              }}
            >
              Book Your Ritual
            </Link>
          </div>

          {/* Contact info — clean horizontal block */}
          <div
            style={{
              borderTop: "1px solid rgba(237,230,219,0.07)",
              borderBottom: "1px solid rgba(237,230,219,0.07)",
              padding: "1.5rem 0",
              marginBottom: "2rem",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1.25rem 2rem",
            }}
          >
            <div>
              <p style={{ ...footerHeadStyle, marginBottom: "0.6rem", fontSize: "0.48rem" }}>Location</p>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "rgba(237,230,219,0.55)", lineHeight: 1.6, fontWeight: 300 }}>
                620 Lynndale Court
                <br />
                Greenville, NC 27858
              </p>
            </div>
            <div>
              <p style={{ ...footerHeadStyle, marginBottom: "0.6rem", fontSize: "0.48rem" }}>Hours</p>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "rgba(237,230,219,0.55)", lineHeight: 1.6, fontWeight: 300 }}>
                Tue – Sat
                <br />
                10am – 7pm
              </p>
            </div>
            <div>
              <p style={{ ...footerHeadStyle, marginBottom: "0.6rem", fontSize: "0.48rem" }}>Email</p>
              <a href="mailto:hello@latherspas.com" style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "rgba(237,230,219,0.55)", textDecoration: "none" }}>
                hello@latherspas.com
              </a>
            </div>
            <div>
              <p style={{ ...footerHeadStyle, marginBottom: "0.6rem", fontSize: "0.48rem" }}>Phone</p>
              <a href="tel:+12525310987" style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "rgba(237,230,219,0.55)", textDecoration: "none" }}>
                (252) 531-0987
              </a>
            </div>
          </div>

          {/* Navigation — two compact columns */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "0 2rem",
              marginBottom: "2rem",
            }}
          >
            <div>
              <p style={{ ...footerHeadStyle, marginBottom: "1rem", fontSize: "0.48rem" }}>Navigate</p>
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  style={{ ...footerLinkStyle, fontSize: "0.78rem", marginBottom: "0.75rem" }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div>
              <p style={{ ...footerHeadStyle, marginBottom: "1rem", fontSize: "0.48rem" }}>Services</p>
              {serviceLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  style={{ ...footerLinkStyle, fontSize: "0.78rem", marginBottom: "0.75rem" }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* ── Bottom bar (shared) ── */}
        <div
          className="footer-bottom"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.58rem",
              letterSpacing: "0.1em",
              color: "rgba(237,230,219,0.2)",
            }}
          >
            © {new Date().getFullYear()} Lather Head Spa · Greenville, NC
          </p>

          <div className="footer-socials" style={{ display: "flex", gap: "2rem" }}>
            {[
              { label: "Instagram", href: "https://www.instagram.com/latherheadspa" },
              { label: "Facebook", href: "https://www.facebook.com/latherheadspa" },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.58rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "rgba(237,230,219,0.28)",
                  textDecoration: "none",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(237,230,219,0.62)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(237,230,219,0.28)")}
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>

        {/* Site credit */}
        <div
          style={{
            marginTop: "clamp(24px, 3vw, 36px)",
            paddingTop: "clamp(20px, 2.5vw, 28px)",
            borderTop: "1px solid rgba(237,230,219,0.04)",
            textAlign: "center",
          }}
        >
          <a
            href="https://solagon.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.5rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(237,230,219,0.18)",
              textDecoration: "none",
              transition: "color 0.3s ease",
            }}
          >
            Designed by Solagon
          </a>
        </div>
      </div>
    </footer>
  );
}
