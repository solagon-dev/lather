"use client";

import { deleteBookingAction } from "../../../_actions/bookings";

export default function DeleteButton({ appointmentId }: { appointmentId: string }) {
  return (
    <button
      className="admin-btn admin-btn-sm"
      style={{ background: "#FDEDEC", color: "#C0392B", border: "1px solid #F5C6CB" }}
      onClick={async () => {
        if (confirm("Delete this appointment? This cannot be undone.")) {
          await deleteBookingAction(appointmentId);
        }
      }}
    >
      Delete Appointment
    </button>
  );
}
