"use client";

import { useState, useTransition } from "react";
import {
  resendConfirmationEmailAction,
  resendConfirmationSMSAction,
} from "../../../_actions/notifications";

export default function ResendButtons({ appointmentId }: { appointmentId: string }) {
  const [isPending, startTransition] = useTransition();
  const [msg, setMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  function handleResendEmail() {
    startTransition(async () => {
      setMsg(null);
      const result = await resendConfirmationEmailAction(appointmentId);
      if (result.success) setMsg({ type: "success", text: "Confirmation email sent." });
      else setMsg({ type: "error", text: result.error || "Failed to send." });
    });
  }

  function handleResendSMS() {
    startTransition(async () => {
      setMsg(null);
      const result = await resendConfirmationSMSAction(appointmentId);
      if (result.success) setMsg({ type: "success", text: "Confirmation SMS sent." });
      else setMsg({ type: "error", text: result.error || "Failed to send." });
    });
  }

  return (
    <div style={{ marginTop: "16px", borderTop: "1px solid #f0f0f0", paddingTop: "16px" }}>
      <p style={{ fontSize: "0.7rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "#999", marginBottom: "8px" }}>
        Resend
      </p>
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
        <button
          onClick={handleResendEmail}
          disabled={isPending}
          className="admin-btn admin-btn-ghost admin-btn-sm"
        >
          {isPending ? "Sending..." : "Resend Email"}
        </button>
        <button
          onClick={handleResendSMS}
          disabled={isPending}
          className="admin-btn admin-btn-ghost admin-btn-sm"
        >
          {isPending ? "Sending..." : "Resend SMS"}
        </button>
      </div>
      {msg && (
        <p style={{ fontSize: "0.78rem", marginTop: "8px", color: msg.type === "success" ? "#3A6B37" : "#C0392B" }}>
          {msg.text}
        </p>
      )}
    </div>
  );
}
