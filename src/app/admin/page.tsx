import Link from "next/link";
import { prisma } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";

function formatTime(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: "America/New_York",
  }).format(new Date(date));
}

function formatPrice(cents: number | null) {
  if (!cents) return "";
  return `$${(cents / 100).toFixed(0)}`;
}

const statusColors: Record<string, { bg: string; text: string }> = {
  pending: { bg: "#FEF9E7", text: "#9A7D0A" },
  confirmed: { bg: "#EDF5EC", text: "#2D5A2A" },
  completed: { bg: "#EBF5FB", text: "#1A5276" },
  no_show: { bg: "#FDEDEC", text: "#922B21" },
  cancelled: { bg: "#F4F1EC", text: "#6B5C4E" },
};

export default async function AdminDashboard() {
  const session = await getAdminSession();
  const firstName = session?.name?.split(" ")[0] || "there";

  let dbError = false;
  type ApptRow = {
    id: string;
    startAt: Date;
    status: string;
    client: { firstName: string; lastName: string };
    service: { name: string; durationMinutes: number; price: number | null };
    staff: { name: string };
  };
  let todayAppointments: ApptRow[] = [];
  let stats = { today: 0, upcoming: 0, pending: 0, completed: 0, totalClients: 0, articles: 0 };

  try {
    const now = new Date();
    const todayStr = now.toLocaleDateString("en-CA", { timeZone: "America/New_York" });
    const dayStart = new Date(`${todayStr}T00:00:00`);
    const dayEnd = new Date(`${todayStr}T23:59:59`);

    todayAppointments = await prisma.appointment.findMany({
      where: { startAt: { gte: dayStart, lte: dayEnd }, status: { in: ["pending", "confirmed"] } },
      include: {
        client: { select: { firstName: true, lastName: true } },
        service: { select: { name: true, durationMinutes: true, price: true } },
        staff: { select: { name: true } },
      },
      orderBy: { startAt: "asc" },
    });

    const [todayCount, upcomingCount, pendingCount, completedCount, clientCount, articleCount] = await Promise.all([
      prisma.appointment.count({ where: { startAt: { gte: dayStart, lte: dayEnd }, status: { in: ["pending", "confirmed"] } } }),
      prisma.appointment.count({ where: { startAt: { gt: now }, status: { in: ["pending", "confirmed"] } } }),
      prisma.appointment.count({ where: { status: "pending" } }),
      prisma.appointment.count({ where: { status: "completed" } }),
      prisma.client.count(),
      prisma.article.count({ where: { status: "published" } }),
    ]);

    stats = { today: todayCount, upcoming: upcomingCount, pending: pendingCount, completed: completedCount, totalClients: clientCount, articles: articleCount };
  } catch {
    dbError = true;
  }

  return (
    <>
      <div className="admin-topbar">
        <h1 className="admin-topbar-title">Dashboard</h1>
        <div className="admin-topbar-actions">
          <Link href="/admin/bookings/new" className="admin-btn admin-btn-primary">+ New Booking</Link>
        </div>
      </div>

      <div className="admin-content">
        {dbError && <div className="admin-alert admin-alert-error">Database connection failed. Check your DATABASE_URL.</div>}

        <div className="admin-page-header">
          <div>
            <h2 className="admin-page-title">Welcome back, {firstName}.</h2>
            <p className="admin-page-sub">
              {new Intl.DateTimeFormat("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric", timeZone: "America/New_York" }).format(new Date())}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="admin-stats-grid">
          {[
            { label: "Today", value: stats.today, href: "/admin/bookings", accent: true },
            { label: "Upcoming", value: stats.upcoming, href: "/admin/bookings" },
            { label: "Pending", value: stats.pending, href: "/admin/bookings" },
            { label: "Completed", value: stats.completed },
            { label: "Clients", value: stats.totalClients },
            { label: "Articles", value: stats.articles, href: "/admin/articles" },
          ].map((s) => {
            const card = (
              <div
                className="admin-stat-card"
                key={s.label}
                style={s.accent ? { background: "#3D2E22", borderColor: "#3D2E22" } : undefined}
              >
                <p className="admin-stat-value" style={s.accent ? { color: "#EDE6DB" } : undefined}>{s.value}</p>
                <p className="admin-stat-label" style={s.accent ? { color: "rgba(237,230,219,0.6)" } : undefined}>{s.label}</p>
              </div>
            );
            return s.href
              ? <Link key={s.label} href={s.href} style={{ textDecoration: "none" }}>{card}</Link>
              : <div key={s.label}>{card}</div>;
          })}
        </div>

        {/* Today's schedule */}
        <div className="admin-card" style={{ marginBottom: "24px" }}>
          <div className="admin-card-header">
            <h3 className="admin-card-title">Today&apos;s Schedule</h3>
            <Link href="/admin/bookings" className="admin-btn admin-btn-ghost admin-btn-sm">View all →</Link>
          </div>

          {todayAppointments.length === 0 ? (
            <div className="admin-empty" style={{ padding: "48px 24px" }}>
              <p className="admin-empty-sub" style={{ marginBottom: "16px" }}>No appointments scheduled for today.</p>
              <Link href="/admin/bookings/new" className="admin-btn admin-btn-primary admin-btn-sm">+ New Booking</Link>
            </div>
          ) : (
            <div>
              {todayAppointments.map((appt, i) => {
                const colors = statusColors[appt.status] || statusColors.pending;
                return (
                  <Link
                    key={appt.id}
                    href={`/admin/bookings/${appt.id}`}
                    className="admin-schedule-row"
                    style={{ borderBottom: i < todayAppointments.length - 1 ? "1px solid #F0ECE6" : "none" }}
                  >
                    <span className="admin-schedule-time">{formatTime(appt.startAt)}</span>
                    <div className="admin-schedule-info">
                      <p className="admin-schedule-name">
                        {appt.client.firstName} {appt.client.lastName}
                      </p>
                      <p className="admin-schedule-meta">
                        {appt.service.name} · {appt.staff.name}{appt.service.price ? ` · ${formatPrice(appt.service.price)}` : ""}
                      </p>
                    </div>
                    <span className="admin-badge" style={{ background: colors.bg, color: colors.text }}>
                      {appt.status.replace("_", " ")}
                    </span>
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {/* Quick actions */}
        <div className="admin-quick-grid">
          <div className="admin-card">
            <div className="admin-card-header">
              <h3 className="admin-card-title">Bookings</h3>
            </div>
            <div className="admin-quick-links">
              <Link href="/admin/bookings/new" className="admin-quick-link">+ New Booking</Link>
              <Link href="/admin/bookings" className="admin-quick-link">All Appointments</Link>
              <Link href="/admin/availability" className="admin-quick-link">Availability</Link>
              <Link href="/admin/services" className="admin-quick-link">Services</Link>
              <Link href="/admin/staff" className="admin-quick-link">Staff</Link>
              <Link href="/admin/clients" className="admin-quick-link">Clients</Link>
            </div>
          </div>
          <div className="admin-card">
            <div className="admin-card-header">
              <h3 className="admin-card-title">Content</h3>
            </div>
            <div className="admin-quick-links">
              <Link href="/admin/articles/new" className="admin-quick-link">Write Article</Link>
              <Link href="/admin/articles" className="admin-quick-link">Manage Articles</Link>
              <Link href="/admin/testimonials" className="admin-quick-link">Testimonials</Link>
              <Link href="/admin/gallery" className="admin-quick-link">Gallery</Link>
              <Link href="/" className="admin-quick-link" style={{ color: "#8C7B6B" }}>View Website ↗</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
