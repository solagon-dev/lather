import type { Metadata } from "next";
import "./admin.css";
import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import Sidebar from "./_components/Sidebar";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Skip auth check for login page — middleware handles the redirect
  const isLoginPage = typeof window === "undefined" && children !== null;

  let session;
  try {
    session = await getAdminSession();
  } catch {
    session = null;
  }

  // If no session and this is not being caught by middleware,
  // render children directly (login page handles its own layout)
  if (!session) {
    return <>{children}</>;
  }

  return (
    <div className="admin-layout">
      <Sidebar email={session.email} />
      <div className="admin-main">
        {children}
      </div>
    </div>
  );
}
