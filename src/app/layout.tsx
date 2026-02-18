import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lather | Head Spa — Greenville, NC",
  description:
    "Lather is a luxury head spa in Greenville, NC offering scalp rituals, hair restoration treatments, and therapeutic massage experiences.",
  keywords: "head spa, scalp treatment, hair restoration, Greenville NC, luxury spa",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
