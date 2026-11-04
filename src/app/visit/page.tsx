import type { Metadata } from "next";
import MapEmbed from "@/components/MapEmbed";
import { Figure, PageOpening, SectionHead } from "@/components/site/Editorial";
import { business, spaHoursCompact, wellnessHoursCompact } from "@/lib/business";
import { faqs } from "@/lib/data";
import { breadcrumbSchema, faqSchema, jsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Visit: Hours, Directions & FAQ",
  description:
    "Lather Spa & Wellness, 101 Fox Haven Drive, Greenville, NC 27858. Spa and wellness hours, directions, free parking, and answers to common questions.",
  alternates: { canonical: "/visit" },
};

function Hours({ title, rows, note }: { title: string; rows: [string, string][]; note?: string }) {
  return (
    <div>
      <p className="cap">{title}</p>
      <dl className="mt-3 border-t border-line">
        {rows.map(([d, h]) => (
          <div key={d} className={`copy flex justify-between border-b border-line py-2.5 ${h === "Closed" ? "" : "text-ink"}`}>
            <dt>{d}</dt>
            <dd>{h}</dd>
          </div>
        ))}
      </dl>
      {note && <p className="note mt-2">{note}</p>}
    </div>
  );
}

export default function VisitPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Visit", path: "/visit" },
          ]),
        )}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqSchema(faqs))} />

      <PageOpening
        eyebrow="Visit"
        aside="Greenville, North Carolina"
        title={
          <>
            {business.address.street}
            <br />
            {business.address.city}, {business.address.state} {business.address.zip}
          </>
        }
        figure={
          <Figure
            src="/media/gallery/interior-gold-mirror.webp"
            alt="The gold mirror in the treatment room"
            caption="The gold mirror"
            ratio="4/5"
            priority
            sizes="(min-width: 1024px) 55vw, 100vw"
          />
        }
      >
        <p>Free parking at the door. Everything is by appointment, so arrive a few minutes early to settle in.</p>
        <div className="flex flex-wrap gap-x-7 gap-y-4 pt-2">
          <a href={business.mapsUrl} target="_blank" rel="noopener noreferrer" className="lnk">
            Directions
          </a>
          <a href={business.phoneHref} className="lnk">
            {business.phone}
          </a>
        </div>
      </PageOpening>

      <section aria-labelledby="hours" className="shell pt-20 lg:pt-32">
        <SectionHead num="01" label="Hours" as="h2" id="hours" />
        <div className="mt-8 grid gap-10 sm:grid-cols-2 lg:ml-[88px] lg:max-w-[44rem] lg:gap-16">
          <Hours title="Lather Spa" rows={spaHoursCompact} />
          <Hours title="Lather Wellness" rows={wellnessHoursCompact} note="Visits by appointment." />
        </div>
      </section>

      <section aria-labelledby="map" className="shell pt-20 lg:pt-32">
        <SectionHead num="02" label="Finding us" as="h2" id="map" />
        <div className="mt-8 lg:ml-[88px]">
          <MapEmbed />
        </div>
      </section>

      <section id="faq" aria-labelledby="faq-title" className="shell scroll-mt-24 pb-20 pt-20 lg:pb-32 lg:pt-32">
        <SectionHead num="03" label="Questions" as="h2" id="faq-title" />
        <div className="mt-4 lg:ml-[88px] lg:max-w-[48rem]">
          {faqs.map((f) => (
            <details key={f.question} className="group border-b border-line">
              <summary className="flex cursor-pointer list-none items-baseline justify-between gap-6 py-5 [&::-webkit-details-marker]:hidden">
                <span className="font-display text-[1.25rem] leading-snug lg:text-[1.5rem]">{f.question}</span>
                <span aria-hidden className="cap-m shrink-0 group-open:hidden">
                  Open
                </span>
                <span aria-hidden className="cap-m hidden shrink-0 group-open:inline">
                  Close
                </span>
              </summary>
              <p className="copy pb-6 pr-10">{f.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
