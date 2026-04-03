import "@/app/admin/admin.css";
import type { Metadata } from "next";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Admin Login | Lather Head Spa",
  robots: "noindex,nofollow",
};

export default function AdminLoginPage() {
  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <div className="admin-login-brand">
          <span className="admin-login-logo">Lather</span>
          <span className="admin-login-sub">Admin Dashboard</span>
        </div>

        <LoginForm />

        <p
          style={{
            textAlign: "center",
            marginTop: "28px",
            fontSize: "0.72rem",
            color: "rgba(140,123,107,0.6)",
          }}
        >
          Lather Head Spa · Greenville, NC
        </p>
      </div>
    </div>
  );
}
