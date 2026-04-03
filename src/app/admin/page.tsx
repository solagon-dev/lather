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
  confirmed: { bg: "#EDF5EC", text: "#3A6B37" },
  completed: { bg: "#EBF5FB", text: "#2471A3" },
  no_show: { bg: "#FDEDEC", text: "#C0392B" },
  cancelled: { bg: "#F4F1EC", text: "#8C7B6B" },
};

export default async function AdminDashboard() {
  const session = await getAdminSession();
  const firstName = session?.name?.split(" ")[0] || "there";

  let dbError = false;
  type ApptRow = { id: string; startAt: Date; status: string; client: { firstName: string; lastName: string }; service: { name: string; durationMinutes: number; price: number | null }; staff: { name: string } };
  let todayAppointments: ApptRow[] = [];
  let stats = { today: 0, upcoming: 0, pending: 0, completed: 0, noShows: 0, totalClients: 0, articles: 0 };

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

    const [todayCount, upcomingCount, pendingCount, completedCount, noShowCount, clientCount, articleCount] = await Promise.all([
      prisma.appointment.count({ where: { startAt: { gte: dayStart, lte: dayEnd }, status: { in: ["pending", "confirmed"] } } }),
      prisma.appointment.count({ where: { startAt: { gt: now }, status: { in: ["pending", "confirmed"] } } }),
      prisma.appointment.count({ where: { status: "pending" } }),
      prisma.appointment.count({ where: { status: "completed" } }),
      prisma.appointment.count({ where: { status: "no_show" } }),
      prisma.client.count(),
      prisma.article.count({ where: { status: "published" } }),
    ]);

    stats = { today: todayCount, upcoming: upcomingCount, pending: pendingCount, completed: completedCount, noShows: noShowCount, totalClients: clientCount, articles: articleCount };
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
          <h2 className="admin-page-title">Welcome back, {firstName}.</h2>
          <p className="admin-page-sub">
            {new Intl.DateTimeFormat("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric", timeZone: "America/New_York" }).format(new Date())}
          </p>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "12px", marginBottom: "28px" }}>
          {[
            { label: "Today", value: stats.today, href: "/admin/bookings", accent: true },
            { label: "Upcoming", value: stats.upcoming, href: "/admin/bookings" },
            { label: "Pending", value: stats.pending, href: "/admin/bookings" },
            { label: "Completed", value: stats.completed },
            { label: "Clients", value: stats.totalClients },
            { label: "Articles", value: stats.articles, href: "/admin/articles" },
          ].map((s) => {
            const inner = (
              <div className="admin-stat-card" key={s.label} style={s.accent ? { background: "#3D2E22", borderColor: "#3D2E22" } : undefined}>
                <p className="admin-stat-value" style={s.accent ? { color: "#EDE6DB" } : undefined}>{s.value}</p>
                <p className="admin-stat-label" style={s.accent ? { color: "rgba(237,230,219,0.6)" } : undefined}>{s.label}</p>
              </div>
            );
            return s.href ? <Link key={s.label} href={s.href} style={{ textDecoration: "none" }}>{inner}</Link> : <div key={s.label}>{inner}</div>;
          })}
        </div>

        {/* Today's schedule */}
        <div className="admin-card" style={{ marginBottom: "24px" }}>
          <div className="admin-card-header">
            <h3 className="admin-card-title">Today&apos;s Schedule</h3>
            <Link href="/admin/bookings" className="admin-btn admin-btn-ghost admin-btn-sm">View all →</Link>
          </div>

          {todayAppointments.length === 0 ? (
            <div style={{ padding: "40px 24px", textAlign: "center" }}>
              <p style={{ fontSize: "0.92rem", color: "#999", marginBottom: "16px" }}>No appointments scheduled for today.</p>
              <Link href="/admin/bookings/new" className="admin-btn admin-btn-primary admin-btn-sm">+ New Booking</Link>
            </div>
          ) : (
            <div>
              {todayAppointments.map((appt) => {
                const colors = statusColors[appt.status] || statusColors.pending;
                return (
                  <Link
                    key={appt.id}
                    href={`/admin/bookings/${appt.id}`}
                    style={{ display: "grid", gridTemplateColumns: "80px 1fr auto", gap: "16px", padding: "14px 24px", borderBottom: "1px solid #f0f0f0", textDecoration: "none", color: "inherit", alignItems: "center" }}
                  >
                    <span style={{ fontSize: "0.95rem", fontWeight: 500, color: "#1a1a1a" }}>{formatTime(appt.startAt)}</span>
                    <div>
                      <p style={{ fontSize: "0.88rem", fontWeight: 500, color: "#1a1a1a", marginBottom: "2px" }}>
                        {appt.client.firstName} {appt.client.lastName}
                      </p>
                      <p style={{ fontSize: "0.76rem", color: "#888" }}>
                        {appt.service.name} · {appt.staff.name}{appt.service.price ? ` · ${formatPrice(appt.service.price)}` : ""}
                      </p>
                    </div>
                    <span style={{ display: "inline-block", padding: "3px 10px", borderRadius: "9999px", fontSize: "0.68rem", fontWeight: 500, background: colors.bg, color: colors.text, textTransform: "capitalize" }}>
                      {appt.status.replace("_", " ")}
                    </span>
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {/* Quick actions */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          <div className="admin-card" style={{ padding: "20px 24px" }}>
            <h3 style={{ fontSize: "0.88rem", fontWeight: 600, marginBottom: "12px", color: "#1a1a1a" }}>Bookings</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <Link href="/admin/bookings/new" style={{ fontSize: "0.82rem", color: "#3D2E22", textDecoration: "none", padding: "6px 0" }}>+ New Booking</Link>
              <Link href="/admin/bookings" style={{ fontSize: "0.82rem", color: "#3D2E22", textDecoration: "none", padding: "6px 0" }}>All Appointments</Link>
              <Link href="/admin/availability" style={{ fontSize: "0.82rem", color: "#3D2E22", textDecoration: "none", padding: "6px 0" }}>Availability</Link>
              <Link href="/admin/services" style={{ fontSize: "0.82rem", color: "#3D2E22", textDecoration: "none", padding: "6px 0" }}>Services</Link>
              <Link href="/admin/staff" style={{ fontSize: "0.82rem", color: "#3D2E22", textDecoration: "none", padding: "6px 0" }}>Staff</Link>
            </div>
          </div>
          <div className="admin-card" style={{ padding: "20px 24px" }}>
            <h3 style={{ fontSize: "0.88rem", fontWeight: 600, marginBottom: "12px", color: "#1a1a1a" }}>Content</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <Link href="/admin/articles/new" style={{ fontSize: "0.82rem", color: "#3D2E22", textDecoration: "none", padding: "6px 0" }}>Write Article</Link>
              <Link href="/admin/articles" style={{ fontSize: "0.82rem", color: "#3D2E22", textDecoration: "none", padding: "6px 0" }}>Manage Articles</Link>
              <Link href="/admin/testimonials" style={{ fontSize: "0.82rem", color: "#3D2E22", textDecoration: "none", padding: "6px 0" }}>Testimonials</Link>
              <Link href="/admin/gallery" style={{ fontSize: "0.82rem", color: "#3D2E22", textDecoration: "none", padding: "6px 0" }}>Gallery</Link>
              <Link href="/" style={{ fontSize: "0.82rem", color: "#8C7B6B", textDecoration: "none", padding: "6px 0" }}>View Website ↗</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
