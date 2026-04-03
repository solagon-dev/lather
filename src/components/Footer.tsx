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
  { label: "The Classic Ritual", href: "/treatments/classic-ritual" },
  { label: "Revitalize & Restore", href: "/treatments/revitalize-restore" },
  { label: "Nourish & Fortify", href: "/treatments/nourish-fortify" },
  { label: "Gentleman's Recharge", href: "/treatments/gentlemans-recharge" },
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
        {/* Top grid */}
        <div
          className="footer-top-grid"
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
            <Link
              href="/"
              style={{
                textDecoration: "none",
                display: "inline-block",
                marginBottom: "1.5rem",
              }}
            >
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
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "var(--cream)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "var(--linen)")
              }
            >
              Book Now
            </Link>
          </div>

          {/* Navigate */}
          <div>
            <p style={footerHeadStyle}>Navigate</p>
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                style={footerLinkStyle}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "rgba(237,230,219,0.88)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "rgba(237,230,219,0.48)")
                }
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Services */}
          <div>
            <p style={footerHeadStyle}>Services</p>
            {serviceLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                style={footerLinkStyle}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "rgba(237,230,219,0.88)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "rgba(237,230,219,0.48)")
                }
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Locations */}
          <div>
            <p style={footerHeadStyle}>Locations</p>
            {locationLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                style={footerLinkStyle}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "rgba(237,230,219,0.88)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "rgba(237,230,219,0.48)")
                }
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Contact info */}
          <div>
            <p style={footerHeadStyle}>Find Us</p>

            {[
              { label: "Greenville, NC", href: null },
              { label: "Tue–Sat, 10am–7pm", href: null },
              {
                label: "hello@latherspa.com",
                href: "mailto:hello@latherspa.com",
              },
              { label: "(252) 558-4344", href: "tel:+12525584344" },
            ].map((item) =>
              item.href ? (
                <a
                  key={item.label}
                  href={item.href}
                  style={footerLinkStyle}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "rgba(237,230,219,0.88)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "rgba(237,230,219,0.48)")
                  }
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

        {/* Bottom bar */}
        <div
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
            © {new Date().getFullYear()} Lather Head Spa · Greenville, NC · All rights reserved.
          </p>

          <div style={{ display: "flex", gap: "2rem" }}>
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
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "rgba(237,230,219,0.62)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "rgba(237,230,219,0.28)")
                }
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
