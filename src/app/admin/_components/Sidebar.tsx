"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutAction } from "../_actions/auth";

const nav = [
  {
    section: "Overview",
    items: [
      { label: "Dashboard", href: "/admin", icon: "◈", exact: true },
    ],
  },
  {
    section: "Bookings",
    items: [
      { label: "Appointments", href: "/admin/bookings", icon: "📅", exact: false },
      { label: "Services", href: "/admin/services", icon: "✦", exact: false },
      { label: "Staff", href: "/admin/staff", icon: "👤", exact: false },
      { label: "Availability", href: "/admin/availability", icon: "🕐", exact: false },
      { label: "Clients", href: "/admin/clients", icon: "📋", exact: false },
    ],
  },
  {
    section: "Content",
    items: [
      { label: "Articles", href: "/admin/articles", icon: "📝", exact: false },
      { label: "Testimonials", href: "/admin/testimonials", icon: "❝", exact: false },
      { label: "Gallery", href: "/admin/gallery", icon: "◻", exact: false },
    ],
  },
  {
    section: "Site",
    items: [
      { label: "View Website", href: "/", icon: "↗", exact: true },
      { label: "View Journal", href: "/journal", icon: "→", exact: false },
    ],
  },
];

export default function Sidebar({ email }: { email: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close sidebar on navigation
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  function isActive(href: string, exact?: boolean) {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  }

  return (
    <>
      {/* Mobile hamburger button — visible only on small screens */}
      <button
        className="admin-mobile-menu-btn"
        onClick={() => setOpen(!open)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
      >
        <div style={{ width: "20px", height: "14px", position: "relative" }}>
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                position: "absolute",
                left: 0,
                width: "100%",
                height: "1.5px",
                background: open ? "#F4F1EC" : "#3D2E22",
                borderRadius: "1px",
                top: i === 0 ? 0 : i === 1 ? "50%" : "100%",
                transform: open
                  ? i === 0 ? "translateY(7px) rotate(45deg)"
                  : i === 2 ? "translateY(-7px) rotate(-45deg)"
                  : "scaleX(0)"
                : i === 1 ? "translateY(-50%)" : "none",
                transition: "transform 0.3s ease, opacity 0.2s ease, background 0.2s ease",
                opacity: open && i === 1 ? 0 : 1,
                transformOrigin: "center",
              }}
            />
          ))}
        </div>
      </button>

      {/* Backdrop overlay */}
      {open && (
        <div
          className="admin-mobile-backdrop"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar — always rendered, slides in on mobile */}
      <aside className={`admin-sidebar ${open ? "admin-sidebar-open" : ""}`}>
        <div className="admin-sidebar-brand">
          <Link href="/admin" className="admin-sidebar-brand-name">
            Lather
          </Link>
          <span className="admin-sidebar-brand-sub">Admin Dashboard</span>
        </div>

        <nav className="admin-sidebar-nav">
          {nav.map((group) => (
            <div key={group.section} className="admin-sidebar-section">
              <span className="admin-sidebar-section-label">{group.section}</span>
              {group.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`admin-nav-link ${isActive(item.href, item.exact) ? "active" : ""}`}
                >
                  <span className="admin-nav-icon">{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </div>
          ))}
        </nav>

        <div className="admin-sidebar-footer">
          <p className="admin-sidebar-user">{email}</p>
          <form action={logoutAction}>
            <button type="submit" className="admin-nav-link" style={{ width: "100%", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
              <span className="admin-nav-icon">⏻</span>
              Sign Out
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}
