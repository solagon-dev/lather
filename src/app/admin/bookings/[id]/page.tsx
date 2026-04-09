import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import StatusButtons from "./_components/StatusButtons";
import DeleteButton from "./_components/DeleteButton";
import ResendButtons from "./_components/ResendButtons";

function formatDateTime(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "America/New_York",
  }).format(new Date(date));
}

function formatPrice(cents: number | null) {
  if (!cents) return "Inquire";
  return `$${(cents / 100).toFixed(0)}`;
}

const statusColors: Record<string, { bg: string; text: string }> = {
  pending: { bg: "#FEF9E7", text: "#9A7D0A" },
  confirmed: { bg: "#EDF5EC", text: "#3A6B37" },
  completed: { bg: "#EBF5FB", text: "#2471A3" },
  no_show: { bg: "#FDEDEC", text: "#C0392B" },
  cancelled: { bg: "#F4F1EC", text: "#8C7B6B" },
};

export default async function AppointmentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  let appointment;
  try {
    appointment = await prisma.appointment.findUnique({
      where: { id },
      include: {
        client: true,
        service: true,
        staff: true,
        notifications: { orderBy: { createdAt: "desc" } },
      },
    });
  } catch {
    notFound();
  }

  if (!appointment) notFound();

  const colors = statusColors[appointment.status] || statusColors.pending;

  return (
    <>
      <div className="admin-topbar">
        <h1 className="admin-topbar-title">
          <Link href="/admin/bookings" style={{ color: "#8C7B6B", textDecoration: "none", fontWeight: 400 }}>
            Bookings
          </Link>
          {" / "}
          {appointment.confirmationCode}
        </h1>
      </div>

      <div className="admin-content">
        {/* Status + actions bar */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px", marginBottom: "28px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ display: "inline-block", padding: "5px 14px", borderRadius: "9999px", fontSize: "0.78rem", fontWeight: 500, background: colors.bg, color: colors.text, textTransform: "capitalize" }}>
              {appointment.status.replace("_", " ")}
            </span>
            <span style={{ fontSize: "0.78rem", color: "#999" }}>
              Booked via {appointment.source} · {appointment.confirmationCode}
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
            <Link href={`/admin/bookings/${appointment.id}/edit`} className="admin-btn admin-btn-secondary admin-btn-sm">Edit</Link>
            <StatusButtons appointmentId={appointment.id} currentStatus={appointment.status} />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
          {/* Left column: appointment details */}
          <div>
            <div className="admin-card" style={{ marginBottom: "20px" }}>
              <div className="admin-card-header">
                <h3 className="admin-card-title">Appointment</h3>
              </div>
              <div className="admin-card-body">
                <DetailRow label="Service" value={appointment.service.name} />
                <DetailRow label="Duration" value={`${appointment.service.durationMinutes} min`} />
                <DetailRow label="Price" value={formatPrice(appointment.service.price)} />
                <DetailRow label="Therapist" value={appointment.staff.name} />
                <DetailRow label="Date & Time" value={formatDateTime(appointment.startAt)} />
                <DetailRow label="End Time" value={formatDateTime(appointment.endAt)} />
                <DetailRow label="Timezone" value={appointment.timezone} />
              </div>
            </div>

            {/* Notes */}
            <div className="admin-card">
              <div className="admin-card-header">
                <h3 className="admin-card-title">Notes</h3>
              </div>
              <div className="admin-card-body">
                <div style={{ marginBottom: "16px" }}>
                  <p style={{ fontSize: "0.7rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "#999", marginBottom: "6px" }}>Client Notes</p>
                  <p style={{ fontSize: "0.88rem", color: appointment.notes ? "#333" : "#ccc", lineHeight: 1.6 }}>
                    {appointment.notes || "No client notes."}
                  </p>
                </div>
                <div>
                  <p style={{ fontSize: "0.7rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "#999", marginBottom: "6px" }}>Internal Notes</p>
                  <p style={{ fontSize: "0.88rem", color: appointment.internalNotes ? "#333" : "#ccc", lineHeight: 1.6 }}>
                    {appointment.internalNotes || "No internal notes."}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right column: client + meta */}
          <div>
            <div className="admin-card" style={{ marginBottom: "20px" }}>
              <div className="admin-card-header">
                <h3 className="admin-card-title">Client</h3>
              </div>
              <div className="admin-card-body">
                <DetailRow label="Name" value={`${appointment.client.firstName} ${appointment.client.lastName}`} />
                <DetailRow label="Email" value={appointment.client.email} />
                <DetailRow label="Phone" value={appointment.client.phone || "Not provided"} />
                {appointment.client.notes && (
                  <DetailRow label="Client Notes" value={appointment.client.notes} />
                )}
              </div>
            </div>

            {/* Notification history */}
            <div className="admin-card" style={{ marginBottom: "20px" }}>
              <div className="admin-card-header">
                <h3 className="admin-card-title">Notifications</h3>
              </div>
              <div className="admin-card-body">
                <DetailRow label="Email Confirmation" value={appointment.emailConfirmationSent ? "Sent ✓" : "Not sent"} />
                <DetailRow label="SMS Confirmation" value={appointment.smsConfirmationSent ? "Sent ✓" : "Not sent"} />
                <DetailRow label="24h Reminder" value={appointment.reminder24hSent ? "Sent ✓" : "Not sent"} />
                <DetailRow label="2h Reminder" value={appointment.reminder2hSent ? "Sent ✓" : "Not sent"} />

                {appointment.notifications.length > 0 && (
                  <div style={{ marginTop: "16px", borderTop: "1px solid #f0f0f0", paddingTop: "16px" }}>
                    <p style={{ fontSize: "0.7rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "#999", marginBottom: "8px" }}>Log</p>
                    {appointment.notifications.map((n) => (
                      <div key={n.id} style={{ fontSize: "0.78rem", color: "#666", marginBottom: "6px" }}>
                        <span style={{ fontWeight: 500 }}>{n.type.replace(/_/g, " ")}</span>
                        {" — "}
                        <span style={{ color: n.status === "sent" ? "#3A6B37" : n.status === "failed" ? "#C0392B" : "#999" }}>
                          {n.status}
                        </span>
                        {n.sentAt && ` · ${new Date(n.sentAt).toLocaleString()}`}
                      </div>
                    ))}
                  </div>
                )}

                <ResendButtons appointmentId={appointment.id} />
              </div>
            </div>

            {/* Meta */}
            <div className="admin-card" style={{ marginBottom: "20px" }}>
              <div className="admin-card-header">
                <h3 className="admin-card-title">Metadata</h3>
              </div>
              <div className="admin-card-body">
                <DetailRow label="Confirmation Code" value={appointment.confirmationCode} />
                <DetailRow label="Source" value={appointment.source} />
                <DetailRow label="Created" value={new Date(appointment.createdAt).toLocaleString()} />
                <DetailRow label="Updated" value={new Date(appointment.updatedAt).toLocaleString()} />
                {appointment.calendarEventId && (
                  <DetailRow label="Calendar Event" value={appointment.calendarEventId} />
                )}
              </div>
            </div>

            {/* Danger zone */}
            <div className="admin-card" style={{ borderColor: "#FDEDEC" }}>
              <div className="admin-card-body">
                <p style={{ fontSize: "0.78rem", fontWeight: 600, color: "#C0392B", marginBottom: "12px" }}>Danger Zone</p>
                <DeleteButton appointmentId={appointment.id} />
              </div>
            </div>
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
      <span style={{ fontSize: "0.88rem", color: "#333", textAlign: "right", fontWeight: 400 }}>{value}</span>
    </div>
  );
}
