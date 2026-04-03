"use client";

import { updateBookingStatusAction } from "../../../_actions/bookings";

const allStatuses = ["pending", "confirmed", "completed", "no_show", "cancelled"];

export default function StatusButtons({
  appointmentId,
  currentStatus,
}: {
  appointmentId: string;
  currentStatus: string;
}) {
  return (
    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
      {allStatuses
        .filter((s) => s !== currentStatus)
        .map((status) => (
          <button
            key={status}
            className="admin-btn admin-btn-ghost admin-btn-sm"
            style={{ textTransform: "capitalize", fontSize: "0.72rem" }}
            onClick={async () => {
              await updateBookingStatusAction(appointmentId, status);
            }}
          >
            Mark {status.replace("_", " ")}
          </button>
        ))}
    </div>
  );
}
