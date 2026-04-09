"use client";

import { useState, useTransition } from "react";
import { loginAction } from "../_actions/auth";

export default function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(formData: FormData) {
    setError(null);
    startTransition(async () => {
      const result = await loginAction(null, formData);
      if (result?.error) {
        setError(result.error);
      }
    });
  }

  return (
    <form action={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
      {error && (
        <div className="admin-alert admin-alert-error">
          <span>⚠</span>
          <span>{error}</span>
        </div>
      )}

      <div className="admin-form-group">
        <label htmlFor="email" className="admin-label">
          Email Address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="admin@latherspas.com"
          className="admin-input"
        />
      </div>

      <div className="admin-form-group">
        <label htmlFor="password" className="admin-label">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          placeholder="••••••••"
          className="admin-input"
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="admin-btn admin-btn-primary"
        style={{ justifyContent: "center", marginTop: "8px", padding: "14px 24px" }}
      >
        {isPending ? "Signing in…" : "Sign In"}
      </button>
    </form>
  );
}
