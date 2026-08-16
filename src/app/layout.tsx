import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Manrope } from "next/font/google";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import StickyBook from "@/components/StickyBook";
import Preloader from "@/components/ui/Preloader";
import { business } from "@/lib/business";
import { jsonLd, localBusinessSchema, organizationSchema } from "@/lib/seo";
import "./globals.css";

// Instrument Serif ships a single weight plus a true italic — no light, no
// bold. That is a feature here: the display voice is one roman and one italic,
// and the italic does real work as the second half of every headline. Any
// `font-light` on display type would only produce a faux weight, so there is
// none left in the codebase.
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

// Manrope is variable, so the sans covers 200–800 from one file.
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(business.siteUrl),
  title: {
    default: "Lather Spa & Wellness | Modern Wellness in Greenville, NC",
    template: "%s | Lather Spa & Wellness",
  },
  description:
    "A luxury spa and wellness destination in Greenville, NC — restorative spa experiences and advanced, personalized wellness care, in one considered space.",
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
  // No `title`/`description` here on purpose. Setting them pinned every page's
  // share card to the homepage copy — a link to /book or a journal essay showed
  // the homepage title everywhere it was pasted. Left unset, Next derives
  // og:title / og:description from each page's own metadata and falls back to
  // the defaults above for the homepage.
  openGraph: {
    type: "website",
    locale: "en_US",
    url: business.siteUrl,
    siteName: business.name,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Lather Spa & Wellness — Greenville, NC" }],
  },
  twitter: {
    card: "summary_large_image",
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
    <html lang="en" className={`${instrumentSerif.variable} ${manrope.variable}`}>
      <body>
        {/* Without JS the scroll reveals would never fire — show everything. */}
        <noscript>
          <style>{`.reveal,.reveal-line{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(localBusinessSchema())} />
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(organizationSchema())} />
        <Preloader />
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        <StickyBook />
      </body>
    </html>
  );
}
