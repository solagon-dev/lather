import { business, openingHoursSpec } from "@/lib/business";
import { services, testimonials } from "@/lib/data";

/**
 * Schema.org LocalBusiness (DaySpa) — rendered once in the root layout.
 *
 * `aggregateRating` is backed by the individual `review` entries below, which
 * are the same Vagaro reviews rendered on the homepage. Google expects a
 * published aggregate rating to correspond to reviews the site actually shows;
 * emitting the aggregate alone risks the rich result being dropped.
 */
export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["DaySpa", "HealthAndBeautyBusiness"],
    "@id": `${business.siteUrl}/#business`,
    name: business.name,
    description: business.description,
    slogan: business.tagline,
    url: business.siteUrl,
    telephone: business.phone,
    email: business.email,
    image: `${business.siteUrl}/og.jpg`,
    logo: `${business.siteUrl}/icon.svg`,
    priceRange: "$$$",
    currenciesAccepted: "USD",
    paymentAccepted: "Cash, Credit Card, Debit Card",
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address.street,
      addressLocality: business.address.city,
      addressRegion: business.address.state,
      postalCode: business.address.zip,
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: business.geo.latitude,
      longitude: business.geo.longitude,
    },
    hasMap: business.mapsUrl,
    openingHoursSpecification: openingHoursSpec.map((s) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: s.dayOfWeek,
      opens: s.opens,
      closes: s.closes,
    })),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: business.rating.value,
      reviewCount: business.rating.count,
      bestRating: "5",
      worstRating: "1",
    },
    review: testimonials.map((t) => ({
      "@type": "Review",
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      author: { "@type": "Person", name: t.name },
      reviewBody: t.quote,
      itemReviewed: { "@id": `${business.siteUrl}/#business` },
    })),
    sameAs: [business.instagram, business.vagaro.profile],
    areaServed: [
      "Greenville NC",
      "Winterville NC",
      "Ayden NC",
      "Farmville NC",
      "Washington NC",
      "New Bern NC",
      "Pitt County NC",
      "Eastern North Carolina",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Spa & Wellness Services",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        price: s.price,
        priceCurrency: "USD",
        itemOffered: {
          "@type": "Service",
          name: s.name,
          description: s.description,
          url: `${business.siteUrl}/services/${s.id}`,
        },
      })),
    },
  };
}

/**
 * Organization + WebSite, emitted alongside the LocalBusiness node. The
 * LocalBusiness covers the storefront; these give search engines a stable
 * brand entity and a site-level node to attach the name and logo to.
 */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${business.siteUrl}/#organization`,
        name: business.name,
        legalName: business.legalName,
        url: business.siteUrl,
        logo: {
          "@type": "ImageObject",
          url: `${business.siteUrl}/icon.svg`,
        },
        image: `${business.siteUrl}/og.jpg`,
        email: business.email,
        telephone: business.phone,
        sameAs: [business.instagram, business.vagaro.profile],
      },
      {
        "@type": "WebSite",
        "@id": `${business.siteUrl}/#website`,
        url: business.siteUrl,
        name: business.name,
        description: business.description,
        publisher: { "@id": `${business.siteUrl}/#organization` },
        inLanguage: "en-US",
      },
    ],
  };
}

export function serviceSchema(service: (typeof services)[number]) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    url: `${business.siteUrl}/services/${service.id}`,
    image: `${business.siteUrl}${service.image}`,
    serviceType: "Head spa treatment",
    category: "Spa Experiences",
    provider: { "@id": `${business.siteUrl}/#business` },
    areaServed: "Greenville, NC and Eastern North Carolina",
    offers: {
      "@type": "Offer",
      price: service.price,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: business.vagaro.booking,
    },
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${business.siteUrl}${item.path}`,
    })),
  };
}

export function articleSchema(a: {
  slug: string;
  title: string;
  metaDescription: string;
  publishDate: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    description: a.metaDescription,
    datePublished: a.publishDate,
    dateModified: a.publishDate,
    image: `${business.siteUrl}${a.image ?? "/media/pages/journal-detail-01.webp"}`,
    url: `${business.siteUrl}/journal/${a.slug}`,
    mainEntityOfPage: { "@type": "WebPage", "@id": `${business.siteUrl}/journal/${a.slug}` },
    author: { "@id": `${business.siteUrl}/#organization` },
    publisher: { "@id": `${business.siteUrl}/#organization` },
  };
}

/**
 * Trim a meta description to what a SERP actually renders (~160 chars).
 *
 * Content in `blog.ts` and `locations.ts` is hand-written per
 * page, so this is a backstop rather than the primary control: it cuts at the
 * last sentence boundary that fits, falling back to the last whole word. Copy
 * that already fits is returned untouched.
 */
export function clampDescription(text: string, max = 160) {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;

  const window = clean.slice(0, max);
  const lastSentence = Math.max(window.lastIndexOf(". "), window.lastIndexOf("? "), window.lastIndexOf("! "));
  if (lastSentence > max * 0.6) return window.slice(0, lastSentence + 1);

  const lastSpace = window.lastIndexOf(" ");
  return `${window.slice(0, lastSpace > 0 ? lastSpace : max).replace(/[,;:.—–-]$/, "")}…`;
}

/** Serialize a schema object for a <script type="application/ld+json"> tag. */
export function jsonLd(schema: object) {
  return { __html: JSON.stringify(schema).replace(/</g, "\\u003c") };
}
