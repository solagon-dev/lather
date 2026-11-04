import type { Metadata, Viewport } from "next";
import { Gilda_Display, Jost, Marcellus } from "next/font/google";
import BookBar from "@/components/site/BookBar";
import BookSheet from "@/components/site/BookSheet";
import Footer from "@/components/site/Footer";
import Header from "@/components/site/Header";
import { business } from "@/lib/business";
import { jsonLd, localBusinessSchema, organizationSchema, wellnessSchema } from "@/lib/seo";
import "./globals.css";

// The brochure's type. Gilda Display carries headings, names and prices;
// Marcellus is kept for the LATHER logotype and the section numbers, where its
// flared capitals echo the wordmark; Jost is the working sans. Gilda ships one
// roman and no italic, so nothing on the site leans on italics.
const gilda = Gilda_Display({ subsets: ["latin"], weight: "400", variable: "--font-gilda", display: "swap" });
const marcellus = Marcellus({ subsets: ["latin"], weight: "400", variable: "--font-marcellus", display: "swap" });
const jost = Jost({ subsets: ["latin"], weight: ["300", "400", "500"], variable: "--font-jost", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(business.siteUrl),
  title: {
    default: "Lather Spa & Wellness | Head Spa & Wellness in Greenville, NC",
    template: "%s | Lather Spa & Wellness",
  },
  description:
    "A place to pause in Greenville, NC. Lather Spa offers head spa rituals, facials, and massage. Lather Wellness provides personalized medical and wellness care.",
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
  themeColor: "#F7F2EC",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${gilda.variable} ${marcellus.variable} ${jost.variable}`}>
      <body>
        {/* Without JS the scroll reveals would never fire — show everything. */}
        <noscript>
          <style>{`.reveal,.reveal-line{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(localBusinessSchema())} />
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(organizationSchema())} />
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(wellnessSchema())} />
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-ink focus:px-4 focus:py-3 focus:text-porcelain">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <BookBar />
        <BookSheet />
      </body>
    </html>
  );
}
