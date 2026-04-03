import type { Metadata, Viewport } from "next";
import "./globals.css";

const SITE_URL = "https://www.latherheadspa.com";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#3D2E22",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Lather | Luxury Head Spa — Greenville, NC",
    template: "%s | Lather Head Spa",
  },
  description:
    "Lather is a luxury head spa in Greenville, NC offering Japanese-inspired scalp rituals, hair restoration treatments, and therapeutic massage. Book your ritual today.",
  keywords: [
    "head spa Greenville NC",
    "scalp treatment Greenville",
    "Japanese head spa North Carolina",
    "luxury spa Greenville NC",
    "scalp massage near me",
    "hair restoration Greenville",
    "scalp ritual",
    "hair wellness",
    "head spa near me",
    "best head spa eastern NC",
  ],
  authors: [{ name: "Lather Head Spa" }],
  creator: "Lather Head Spa",
  publisher: "Lather Head Spa",
  formatDetection: { telephone: true, email: true, address: true },
  openGraph: {
    title: "Lather | Luxury Head Spa — Greenville, NC",
    description:
      "Where the scalp breathes again. Japanese-inspired scalp rituals and hair restoration in Greenville, NC.",
    url: SITE_URL,
    siteName: "Lather Head Spa",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lather | Luxury Head Spa — Greenville, NC",
    description:
      "Japanese-inspired scalp rituals and hair restoration in Greenville, NC. Book your ritual today.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  alternates: { canonical: SITE_URL },
  category: "beauty",
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "DaySpa",
  "@id": `${SITE_URL}/#business`,
  name: "Lather Head Spa",
  description:
    "Luxury head spa in Greenville, NC offering Japanese-inspired scalp rituals, hair restoration treatments, and therapeutic massage.",
  url: SITE_URL,
  telephone: "(252) 558-4344",
  email: "hello@latherspa.com",
  priceRange: "$$",
  image: `${SITE_URL}/Photos/Finalized/2.10.26_LHS-5.jpg`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Greenville",
    addressRegion: "NC",
    postalCode: "27858",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "35.6127",
    longitude: "-77.3664",
  },
  areaServed: [
    { "@type": "City", name: "Greenville", containedInPlace: { "@type": "State", name: "North Carolina" } },
    { "@type": "City", name: "Winterville" },
    { "@type": "City", name: "Ayden" },
    { "@type": "City", name: "Washington" },
    { "@type": "City", name: "New Bern" },
    { "@type": "City", name: "Kinston" },
  ],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "10:00",
      closes: "19:00",
    },
  ],
  hasMap: "https://www.google.com/maps/search/Lather+Head+Spa+Greenville+NC",
  sameAs: [
    "https://www.instagram.com/latherheadspa",
    "https://www.facebook.com/latherheadspa",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Scalp Rituals",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "The Classic Ritual",
          description: "A 75-minute complete scalp reset — purifying cleanse, exfoliation, massage, hair mask, and steam infusion.",
          provider: { "@id": `${SITE_URL}/#business` },
        },
        price: "125",
        priceCurrency: "USD",
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Revitalize & Restore",
          description: "A 90-minute therapeutic ritual with high-frequency combing and anti-hair loss serum protocol.",
          provider: { "@id": `${SITE_URL}/#business` },
        },
        price: "165",
        priceCurrency: "USD",
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Nourish & Fortify",
          description: "A 90-minute bond-rebuilding treatment for dry, damaged, or chemically treated hair.",
          provider: { "@id": `${SITE_URL}/#business` },
        },
        price: "175",
        priceCurrency: "USD",
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Gentleman's Recharge",
          description: "A 60-minute restorative scalp experience designed specifically for men.",
          provider: { "@id": `${SITE_URL}/#business` },
        },
        price: "95",
        priceCurrency: "USD",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
      </head>
      <body>
        <a href="#main-content" className="skip-to-content">
          Skip to content
        </a>
        <div id="main-content">{children}</div>
      </body>
    </html>
  );
}
