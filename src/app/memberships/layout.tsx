import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Memberships",
  description:
    "Join a Lather membership for recurring head spa treatments, priority booking, and exclusive savings in Greenville, NC. Three tiers starting at $110/month.",
};

export default function MembershipsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
