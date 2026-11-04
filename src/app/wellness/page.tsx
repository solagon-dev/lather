import type { Metadata } from "next";
import Link from "next/link";
import { Figure, Leader, PageOpening, SectionHead } from "@/components/site/Editorial";
import { WELLNESS_BOOK_URL, wellness, wellnessHoursShort } from "@/lib/business";
import { foundations, hormoneSupport, provider, usd, wellnessSummary } from "@/lib/menu";
import { breadcrumbSchema, jsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Women's Wellness in Greenville, NC",
  description:
    "Lather Wellness, led by Stacia Friend, CNM: Foundations Visits, hormone support, laser hair removal, Secret RF & PRO, Xeomin and vitamin injections, and body contouring.",
  alternates: { canonical: "/wellness" },
};

// The practice books by request, so the first step is a request rather than
// an instant booking. Saying so up front sets the right expectation.
const steps = [
  { title: "Request a visit", body: "Pick a time online. The practice confirms it with you." },
  {
    title: "Your Foundations Visit",
    body: "Time to talk about symptoms, health, lifestyle and goals.",
  },
  { title: "A plan that’s yours", body: "An individualized plan for what comes next." },
];

export default function WellnessPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Lather Wellness", path: "/wellness" },
          ]),
        )}
      />
      <PageOpening
        eyebrow="Lather Wellness"
        aside="By request"
        title="Medical & aesthetic care, in the same quiet house."
        figure={
          <Figure
            src="/media/experience/step-01-consultation.webp"
            alt="A Foundations Visit consultation"
            caption="A Foundations Visit"
            focal="50% 30%"
            ratio="4/5"
            priority
            sizes="(min-width: 1024px) 55vw, 100vw"
          />
        }
      >
        <p>{provider.line}</p>
        <div className="flex flex-wrap gap-x-7 gap-y-4 pt-2">
          <a href={WELLNESS_BOOK_URL} target="_blank" rel="noopener noreferrer" className="lnk">
            Request a wellness visit
          </a>
        </div>
      </PageOpening>

      {/* ── FOUNDATIONS ─────────────────────────────────────── */}
      <section aria-labelledby="foundations" className="mt-20 bg-sand py-16 lg:mt-32 lg:py-28">
        <div className="shell">
          <SectionHead num="01" label="Where to begin" as="h2" id="foundations" note={foundations.lead} />
          <div className="mt-8 lg:ml-[88px] lg:mt-12 lg:grid lg:grid-cols-2 lg:gap-16">
            <div>
              <Leader
                name={foundations.name}
                price={usd(foundations.price)}
                nameClass="font-display text-[1.5rem] leading-snug text-ink lg:text-[2rem]"
                priceClass="font-display text-[1.375rem] text-ink lg:text-[1.75rem]"
              />
              <p className="copy mt-3">{foundations.description}</p>
              <Link href="/wellness/foundations" className="lnk mt-6">
                About the visit
              </Link>
            </div>
            <div className="mt-10 lg:mt-0">
              <p className="cap">Hormone support</p>
              <ul className="mt-3 border-t border-line-sand">
                {hormoneSupport.map((h) => (
                  <li key={h} className="copy border-b border-line-sand py-2.5 text-ink">
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── TREATMENTS ──────────────────────────────────────── */}
      <section aria-labelledby="treatments" className="shell pt-20 lg:pt-32">
        <SectionHead num="02" label="Treatments" as="h2" id="treatments" />
        <ul className="mt-4 lg:ml-[88px]">
          {wellnessSummary.map((t) => (
            <li key={t.slug}>
              <Link href={`/wellness/${t.slug}`} className="group block border-b border-line py-5 lg:py-7">
                <Leader
                  name={<span className="group-hover:text-brass-dark">{t.name}</span>}
                  price={t.range}
                  nameClass="font-display text-[1.375rem] leading-snug text-ink lg:text-[1.875rem]"
                  priceClass="font-display text-[1.0625rem] text-ink lg:text-[1.375rem]"
                />
                <p className="note mt-1">{t.note}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* ── HOW IT WORKS ────────────────────────────────────── */}
      <section aria-labelledby="how" className="shell pb-20 pt-20 lg:pb-32 lg:pt-32">
        <SectionHead num="03" label="How it works" as="h2" id="how" note={wellnessHoursShort} />
        <ol className="mt-4 lg:ml-[88px] lg:grid lg:grid-cols-3 lg:gap-12">
          {steps.map((s, i) => (
            <li key={s.title} className="grid grid-cols-[44px_minmax(0,1fr)] border-b border-line py-5 lg:block lg:border-b-0 lg:border-t lg:pt-6">
              <span className="num">{String(i + 1).padStart(2, "0")}</span>
              <div className="lg:mt-4">
                <h3 className="font-display text-[1.375rem] leading-snug">{s.title}</h3>
                <p className="copy mt-1">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="mt-10 lg:ml-[88px]">
          <a href={WELLNESS_BOOK_URL} target="_blank" rel="noopener noreferrer" className="lnk">
            Request a wellness visit
          </a>
          <p className="note mt-6 max-w-[36rem]">
            {wellness.legalName}. The information on this site is general and is not medical advice; your provider will
            discuss what is right for you.
          </p>
        </div>
      </section>
    </>
  );
}
