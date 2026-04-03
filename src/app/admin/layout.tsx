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
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  return (
    <div className="admin-layout">
      <Sidebar email={session.email} />
      <div className="admin-main">
        {children}
      </div>
    </div>
  );
}
