import type { Metadata, Viewport } from "next";
import { Figtree, Fraunces } from "next/font/google";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import StickyBook from "@/components/StickyBook";
import { business } from "@/lib/business";
import { jsonLd, localBusinessSchema } from "@/lib/seo";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz", "SOFT", "WONK"],
});

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(business.siteUrl),
  title: {
    default: "Lather Head Spa | Luxury Head Spa in Greenville, NC",
    template: "%s | Lather Head Spa",
  },
  description:
    "Lather Head Spa is Greenville, NC's premier luxury head spa — Japanese-inspired scalp rituals, therapeutic massage, and hair wellness. A facial for your scalp. Book on Vagaro.",
  keywords: [
    "head spa Greenville NC",
    "Japanese head spa North Carolina",
    "scalp treatment Greenville",
    "scalp massage Greenville NC",
    "luxury spa Greenville",
    "hair wellness Greenville",
    "blowout Greenville NC",
    "head spa near me",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: business.siteUrl,
    siteName: business.name,
    title: "Lather Head Spa | Luxury Head Spa in Greenville, NC",
    description:
      "A facial for your scalp. Japanese-inspired scalp rituals, therapeutic massage, and hair wellness in Greenville, North Carolina.",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Lather Head Spa — Greenville, NC" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lather Head Spa | Luxury Head Spa in Greenville, NC",
    description:
      "A facial for your scalp. Japanese-inspired scalp rituals in Greenville, NC.",
    images: ["/og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#181310",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${figtree.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(localBusinessSchema())} />
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        <StickyBook />
      </body>
    </html>
  );
}
