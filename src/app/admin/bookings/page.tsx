import Link from "next/link";
import { prisma } from "@/lib/db";

const STATUS_STYLES: Record<string, { bg: string; color: string }> = {
  pending: { bg: "#FEF9E7", color: "#9A7D0A" },
  confirmed: { bg: "#EDF5EC", color: "#3A6B37" },
  completed: { bg: "#EBF5FB", color: "#2471A3" },
  no_show: { bg: "#FDEDEC", color: "#C0392B" },
  cancelled: { bg: "#F4F1EC", color: "#8C7B6B" },
};

function formatDateTime(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "America/New_York",
  }).format(new Date(date));
}

function formatPrice(cents: number | null) {
  if (!cents) return "";
  return `$${(cents / 100).toFixed(0)}`;
}

export default async function BookingsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const statusFilter = typeof params.status === "string" ? params.status : null;
  const staffFilter = typeof params.staff === "string" ? params.staff : null;
  const search = typeof params.q === "string" ? params.q : null;

  let dbError = false;
  let appointments: {
    id: string;
    confirmationCode: string;
    startAt: Date;
    endAt: Date;
    status: string;
    source: string;
    client: { firstName: string; lastName: string; email: string; phone: string | null };
    service: { name: string; durationMinutes: number; price: number | null };
    staff: { name: string };
  }[] = [];
  let stats = { total: 0, today: 0, upcoming: 0, pending: 0 };
  let staffList: { id: string; name: string }[] = [];

  try {
    const now = new Date();
    const todayStr = now.toLocaleDateString("en-CA", { timeZone: "America/New_York" });
    const dayStart = new Date(`${todayStr}T00:00:00`);
    const dayEnd = new Date(`${todayStr}T23:59:59`);

    // Build filter
    const where: Record<string, unknown> = {};
    if (statusFilter) where.status = statusFilter;
    if (staffFilter) where.staffId = staffFilter;
    if (search) {
      where.client = {
        OR: [
          { firstName: { contains: search, mode: "insensitive" } },
          { lastName: { contains: search, mode: "insensitive" } },
          { email: { contains: search, mode: "insensitive" } },
          { phone: { contains: search } },
        ],
      };
    }

    appointments = await prisma.appointment.findMany({
      where,
      include: {
        client: { select: { firstName: true, lastName: true, email: true, phone: true } },
        service: { select: { name: true, durationMinutes: true, price: true } },
        staff: { select: { name: true } },
      },
      orderBy: { startAt: "desc" },
      take: 100,
    });

    const [total, today, upcoming, pending] = await Promise.all([
      prisma.appointment.count(),
      prisma.appointment.count({ where: { startAt: { gte: dayStart, lte: dayEnd }, status: { in: ["pending", "confirmed"] } } }),
      prisma.appointment.count({ where: { startAt: { gt: now }, status: { in: ["pending", "confirmed"] } } }),
      prisma.appointment.count({ where: { status: "pending" } }),
    ]);
    stats = { total, today, upcoming, pending };

    staffList = await prisma.staff.findMany({ where: { isActive: true }, select: { id: true, name: true }, orderBy: { name: "asc" } });
  } catch {
    dbError = true;
  }

  const hasFilters = statusFilter || staffFilter || search;

  return (
    <>
      <div className="admin-topbar">
        <h1 className="admin-topbar-title">Bookings</h1>
        <div className="admin-topbar-actions">
          <Link href="/admin/bookings/new" className="admin-btn admin-btn-primary">+ New Booking</Link>
        </div>
      </div>

      <div className="admin-content">
        {dbError && <div className="admin-alert admin-alert-error">Database connection failed.</div>}

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px", marginBottom: "24px" }}>
          {[
            { label: "Total", value: stats.total },
            { label: "Today", value: stats.today },
            { label: "Upcoming", value: stats.upcoming },
            { label: "Pending", value: stats.pending },
          ].map((s) => (
            <div key={s.label} className="admin-stat-card">
              <p className="admin-stat-value">{s.value}</p>
              <p className="admin-stat-label">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="admin-card" style={{ marginBottom: "20px" }}>
          <form method="GET" style={{ display: "flex", gap: "12px", padding: "16px 20px", flexWrap: "wrap", alignItems: "flex-end" }}>
            <div style={{ flex: "1 1 200px" }}>
              <label style={{ fontSize: "0.68rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "#999", display: "block", marginBottom: "6px" }}>Search</label>
              <input name="q" defaultValue={search || ""} placeholder="Client name, email, or phone..." className="admin-input" style={{ width: "100%", padding: "8px 12px", fontSize: "0.85rem" }} />
            </div>
            <div>
              <label style={{ fontSize: "0.68rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "#999", display: "block", marginBottom: "6px" }}>Status</label>
              <select name="status" defaultValue={statusFilter || ""} className="admin-select" style={{ padding: "8px 12px", fontSize: "0.85rem" }}>
                <option value="">All</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="no_show">No Show</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: "0.68rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "#999", display: "block", marginBottom: "6px" }}>Staff</label>
              <select name="staff" defaultValue={staffFilter || ""} className="admin-select" style={{ padding: "8px 12px", fontSize: "0.85rem" }}>
                <option value="">All</option>
                {staffList.map((s) => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>
            <button type="submit" className="admin-btn admin-btn-primary admin-btn-sm">Filter</button>
            {hasFilters && (
              <Link href="/admin/bookings" className="admin-btn admin-btn-ghost admin-btn-sm">Clear</Link>
            )}
          </form>
        </div>

        {/* Appointments list */}
        <div className="admin-card">
          <div className="admin-card-header">
            <h3 className="admin-card-title">
              Appointments
              {hasFilters && <span style={{ fontWeight: 400, color: "#999" }}> (filtered)</span>}
            </h3>
            <span style={{ fontSize: "0.78rem", color: "#999" }}>{appointments.length} result{appointments.length !== 1 ? "s" : ""}</span>
          </div>

          {appointments.length === 0 ? (
            <div style={{ padding: "48px 24px", textAlign: "center" }}>
              <p style={{ fontSize: "0.92rem", color: "#999", marginBottom: "16px" }}>
                {hasFilters ? "No appointments match your filters." : "No appointments yet."}
              </p>
              {hasFilters ? (
                <Link href="/admin/bookings" className="admin-btn admin-btn-ghost admin-btn-sm">Clear Filters</Link>
              ) : (
                <Link href="/admin/bookings/new" className="admin-btn admin-btn-primary admin-btn-sm">+ New Booking</Link>
              )}
            </div>
          ) : (
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Date / Time</th>
                    <th>Client</th>
                    <th>Service</th>
                    <th>Staff</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((apt) => {
                    const s = STATUS_STYLES[apt.status] || STATUS_STYLES.pending;
                    return (
                      <tr key={apt.id}>
                        <td style={{ whiteSpace: "nowrap", fontWeight: 500 }}>
                          {formatDateTime(apt.startAt)}
                        </td>
                        <td>
                          <span style={{ fontWeight: 500 }}>{apt.client.firstName} {apt.client.lastName}</span>
                          <br />
                          <span style={{ fontSize: "0.75rem", color: "#999" }}>{apt.client.email}</span>
                        </td>
                        <td>
                          {apt.service.name}
                          {apt.service.price ? <span style={{ color: "#999", marginLeft: "4px" }}>{formatPrice(apt.service.price)}</span> : ""}
                        </td>
                        <td>{apt.staff.name}</td>
                        <td>
                          <span style={{ display: "inline-block", padding: "3px 10px", borderRadius: "9999px", fontSize: "0.7rem", fontWeight: 500, background: s.bg, color: s.color, textTransform: "capitalize" }}>
                            {apt.status.replace("_", " ")}
                          </span>
                        </td>
                        <td>
                          <Link href={`/admin/bookings/${apt.id}`} className="admin-btn admin-btn-ghost admin-btn-sm">
                            View
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
