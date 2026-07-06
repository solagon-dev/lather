import { business, openingHoursSpec } from "@/lib/business";
import { services } from "@/lib/data";

/** Schema.org LocalBusiness (DaySpa) — rendered once in the root layout. */
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
    },
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

export function serviceSchema(service: (typeof services)[number]) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    url: `${business.siteUrl}/services/${service.id}`,
    serviceType: "Head spa treatment",
    provider: { "@id": `${business.siteUrl}/#business` },
    areaServed: "Greenville, NC and Eastern North Carolina",
    offers: {
      "@type": "Offer",
      price: service.price,
      priceCurrency: "USD",
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
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    description: a.metaDescription,
    datePublished: a.publishDate,
    url: `${business.siteUrl}/journal/${a.slug}`,
    author: { "@type": "Organization", name: business.name },
    publisher: { "@id": `${business.siteUrl}/#business` },
  };
}

/** Serialize a schema object for a <script type="application/ld+json"> tag. */
export function jsonLd(schema: object) {
  return { __html: JSON.stringify(schema).replace(/</g, "\\u003c") };
}
