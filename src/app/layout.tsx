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
    default: "Lather Spa & Wellness | Modern Wellness in Greenville, NC",
    template: "%s | Lather Spa & Wellness",
  },
  description:
    "Lather Spa & Wellness is a luxury wellness destination in Greenville, NC — restorative spa experiences and advanced, personalized wellness care. Where modern wellness meets elevated self-care.",
  keywords: [
    "spa Greenville NC",
    "wellness Greenville NC",
    "medical spa Greenville NC",
    "facials Greenville NC",
    "head spa Greenville NC",
    "massage Greenville NC",
    "hormone therapy Greenville NC",
    "injectables Greenville NC",
    "luxury spa Greenville",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: business.siteUrl,
    siteName: business.name,
    title: "Lather Spa & Wellness | Modern Wellness in Greenville, NC",
    description:
      "Where modern wellness meets elevated self-care. Restorative spa experiences and advanced wellness care in Greenville, North Carolina.",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Lather Spa & Wellness — Greenville, NC" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lather Spa & Wellness | Modern Wellness in Greenville, NC",
    description:
      "Where modern wellness meets elevated self-care — Greenville, NC.",
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
        {/* Without JS the scroll reveals would never fire — show everything. */}
        <noscript>
          <style>{`.reveal{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(localBusinessSchema())} />
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        <StickyBook />
      </body>
    </html>
  );
}
