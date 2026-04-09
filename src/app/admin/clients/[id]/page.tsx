import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";

const statusColors: Record<string, { bg: string; text: string }> = {
  pending: { bg: "#FEF9E7", text: "#9A7D0A" },
  confirmed: { bg: "#EDF5EC", text: "#3A6B37" },
  completed: { bg: "#EBF5FB", text: "#2471A3" },
  no_show: { bg: "#FDEDEC", text: "#C0392B" },
  cancelled: { bg: "#F4F1EC", text: "#8C7B6B" },
};

export default async function ClientDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  let client;
  try {
    client = await prisma.client.findUnique({
      where: { id },
      include: {
        appointments: {
          include: {
            service: { select: { name: true, price: true } },
            staff: { select: { name: true } },
          },
          orderBy: { startAt: "desc" },
        },
      },
    });
  } catch { notFound(); }

  if (!client) notFound();

  const totalSpent = client.appointments
    .filter((a) => a.status === "completed")
    .reduce((sum, a) => sum + (a.service.price || 0), 0);

  return (
    <>
      <div className="admin-topbar">
        <h1 className="admin-topbar-title">
          <Link href="/admin/clients" style={{ color: "#8C7B6B", textDecoration: "none", fontWeight: 400 }}>Clients</Link>
          {" / "}{client.firstName} {client.lastName}
        </h1>
      </div>

      <div className="admin-content">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "20px" }}>
          {/* Client info */}
          <div>
            <div className="admin-card" style={{ marginBottom: "20px" }}>
              <div className="admin-card-header"><h3 className="admin-card-title">Client Info</h3></div>
              <div className="admin-card-body">
                <DetailRow label="Name" value={`${client.firstName} ${client.lastName}`} />
                <DetailRow label="Email" value={client.email} />
                <DetailRow label="Phone" value={client.phone || "Not provided"} />
                <DetailRow label="Member Since" value={new Date(client.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })} />
                {client.notes && <DetailRow label="Notes" value={client.notes} />}
              </div>
            </div>

            <div className="admin-card">
              <div className="admin-card-header"><h3 className="admin-card-title">Stats</h3></div>
              <div className="admin-card-body">
                <DetailRow label="Total Visits" value={String(client.appointments.filter((a) => a.status === "completed").length)} />
                <DetailRow label="Total Spent" value={totalSpent ? `$${(totalSpent / 100).toFixed(0)}` : "$0"} />
                <DetailRow label="All Bookings" value={String(client.appointments.length)} />
              </div>
            </div>
          </div>

          {/* Appointment history */}
          <div className="admin-card">
            <div className="admin-card-header"><h3 className="admin-card-title">Appointment History</h3></div>
            {client.appointments.length === 0 ? (
              <div style={{ padding: "32px 24px", textAlign: "center", color: "#999" }}>No appointments yet.</div>
            ) : (
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead><tr><th>Date</th><th>Service</th><th>Staff</th><th>Status</th><th></th></tr></thead>
                  <tbody>
                    {client.appointments.map((appt) => {
                      const colors = statusColors[appt.status] || statusColors.pending;
                      return (
                        <tr key={appt.id}>
                          <td style={{ whiteSpace: "nowrap" }}>
                            {new Date(appt.startAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "America/New_York" })}
                            <br />
                            <span style={{ fontSize: "0.75rem", color: "#888" }}>
                              {new Date(appt.startAt).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", timeZone: "America/New_York" })}
                            </span>
                          </td>
                          <td>{appt.service.name}</td>
                          <td>{appt.staff.name}</td>
                          <td>
                            <span style={{ display: "inline-block", padding: "3px 10px", borderRadius: "9999px", fontSize: "0.68rem", fontWeight: 500, background: colors.bg, color: colors.text, textTransform: "capitalize" }}>
                              {appt.status.replace("_", " ")}
                            </span>
                          </td>
                          <td>
                            <Link href={`/admin/bookings/${appt.id}`} className="admin-btn admin-btn-ghost admin-btn-sm">View</Link>
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
      </div>
    </>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "8px 0", borderBottom: "1px solid #f8f6f4", gap: "16px" }}>
      <span style={{ fontSize: "0.78rem", color: "#999", flexShrink: 0 }}>{label}</span>
      <span style={{ fontSize: "0.88rem", color: "#333", textAlign: "right" }}>{value}</span>
    </div>
  );
}
