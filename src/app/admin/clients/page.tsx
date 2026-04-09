import Link from "next/link";
import { prisma } from "@/lib/db";

export default async function ClientsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const search = typeof params.q === "string" ? params.q : null;

  let clients: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string | null;
    _count: { appointments: number };
    appointments: { startAt: Date; status: string }[];
  }[] = [];

  try {
    clients = await prisma.client.findMany({
      where: search ? {
        OR: [
          { firstName: { contains: search, mode: "insensitive" } },
          { lastName: { contains: search, mode: "insensitive" } },
          { email: { contains: search, mode: "insensitive" } },
          { phone: { contains: search } },
        ],
      } : undefined,
      include: {
        _count: { select: { appointments: true } },
        appointments: { select: { startAt: true, status: true }, orderBy: { startAt: "desc" }, take: 1 },
      },
      orderBy: { createdAt: "desc" },
      take: 100,
    });
  } catch { /* ignore */ }

  return (
    <>
      <div className="admin-topbar">
        <h1 className="admin-topbar-title">Clients</h1>
      </div>

      <div className="admin-content">
        {/* Search */}
        <div className="admin-card" style={{ marginBottom: "20px" }}>
          <form method="GET" className="admin-card-body" style={{ display: "flex", gap: "12px", alignItems: "flex-end" }}>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: "0.68rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "#999", display: "block", marginBottom: "6px" }}>Search</label>
              <input name="q" defaultValue={search || ""} placeholder="Name, email, or phone..." className="admin-input" style={{ width: "100%", padding: "8px 12px", fontSize: "0.85rem" }} />
            </div>
            <button type="submit" className="admin-btn admin-btn-primary admin-btn-sm">Search</button>
            {search && <Link href="/admin/clients" className="admin-btn admin-btn-ghost admin-btn-sm">Clear</Link>}
          </form>
        </div>

        {/* Client list */}
        <div className="admin-card">
          <div className="admin-card-header">
            <h3 className="admin-card-title">All Clients</h3>
            <span style={{ fontSize: "0.78rem", color: "#999" }}>{clients.length} client{clients.length !== 1 ? "s" : ""}</span>
          </div>

          {clients.length === 0 ? (
            <div style={{ padding: "48px 24px", textAlign: "center", color: "#999" }}>No clients found.</div>
          ) : (
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Appointments</th>
                    <th>Last Visit</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {clients.map((client) => {
                    const lastAppt = client.appointments[0];
                    return (
                      <tr key={client.id}>
                        <td style={{ fontWeight: 500 }}>{client.firstName} {client.lastName}</td>
                        <td style={{ fontSize: "0.82rem" }}>{client.email}</td>
                        <td style={{ fontSize: "0.82rem", color: "#666" }}>{client.phone || "—"}</td>
                        <td>{client._count.appointments}</td>
                        <td style={{ fontSize: "0.82rem", color: "#888" }}>
                          {lastAppt ? new Date(lastAppt.startAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "—"}
                        </td>
                        <td>
                          <Link href={`/admin/clients/${client.id}`} className="admin-btn admin-btn-ghost admin-btn-sm">View</Link>
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
