"use client";

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

  function isActive(href: string, exact?: boolean) {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  }

  return (
    <aside className="admin-sidebar">
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
  );
}
