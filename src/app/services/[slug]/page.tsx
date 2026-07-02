import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import BookCTA from "@/components/BookCTA";
import FaqAccordion from "@/components/FaqAccordion";
import Reveal from "@/components/Reveal";
import { BOOK_URL } from "@/lib/business";
import { addOns, services, treatmentDetails, treatmentFAQs } from "@/lib/data";
import { breadcrumbSchema, faqSchema, jsonLd, serviceSchema } from "@/lib/seo";

interface Params {
  slug: string;
}

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.id }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.id === slug);
  if (!service) return {};
  const price = service.id === "blowout" ? `from $${service.price}` : `$${service.price}`;
  return {
    title: `${service.name} — ${service.duration}, ${price}`,
    description: `${service.tagline}. ${service.description.slice(0, 140)}… Book at Lather Head Spa in Greenville, NC.`,
    alternates: { canonical: `/services/${service.id}` },
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const service = services.find((s) => s.id === slug);
  if (!service) notFound();

  const details = treatmentDetails[service.id];
  const serviceFaqs = treatmentFAQs[service.id] ?? [];
  const recommended = addOns.filter((a) => service.recommendedAddOns.includes(a.id));
  const upgrade = services.find((s) => s.id === service.suggestedUpgrade);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(serviceSchema(service))} />
      {serviceFaqs.length > 0 && (
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqSchema(serviceFaqs))} />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: service.name, path: `/services/${service.id}` },
          ])
        )}
      />

      {/* ── HEADER ───────────────────────────────────────────── */}
      <section className="border-b hairline bg-porcelain px-6 pt-32 sm:px-10 md:pt-40 lg:px-16">
        <div className="wrap grid gap-12 pb-16 md:grid-cols-[1.15fr_1fr] md:pb-24">
          <Reveal>
            <nav aria-label="Breadcrumb" className="text-[0.7rem] uppercase tracking-kicker text-taupe">
              <Link href="/services" className="link-ul">
                Services
              </Link>{" "}
              / {service.name}
            </nav>
            <h1 className="h-display mt-6 text-balance text-4xl sm:text-5xl md:text-6xl">{service.name}</h1>
            <p className="mt-4 font-display text-xl italic text-brass-dark">{service.tagline}</p>
            <div className="mt-8 flex flex-wrap gap-8 border-y hairline py-5 text-[0.75rem] uppercase tracking-kicker text-umber">
              <span>
                {service.id === "blowout" ? `From $${service.price}` : `$${service.price}`}
              </span>
              <span>{service.duration}</span>
              <span>{service.bestFor}</span>
            </div>
            <p className="mt-8 max-w-xl text-umber">{service.description}</p>
            {service.note && <p className="mt-4 text-[0.85rem] italic text-taupe">{service.note}</p>}
            <div className="mt-10 flex flex-wrap gap-4">
              <a href={BOOK_URL} target="_blank" rel="noopener" className="btn-solid">
                Book This Ritual
              </a>
              <Link href="/services" className="btn-outline">
                Compare Rituals
              </Link>
            </div>
          </Reveal>
          <Reveal delay={150} className="relative">
            <div className="arch relative mx-auto aspect-[3/4] w-full max-w-md md:max-w-none">
              <Image
                src={service.image}
                alt={service.name}
                fill
                sizes="(min-width: 768px) 45vw, 90vw"
                priority
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── HIGHLIGHTS + WHO IT'S FOR ────────────────────────── */}
      <section className="section-pad bg-ivory">
        <div className="wrap grid gap-14 lg:grid-cols-2">
          <Reveal>
            <p className="kicker-line">Included in Your Session</p>
            <ul className="mt-8 space-y-4">
              {service.highlights.map((h) => (
                <li key={h} className="flex items-start gap-4 border-b hairline pb-4">
                  <span aria-hidden className="mt-1 text-xs text-brass">◆</span>
                  <span className="font-display text-xl">{h}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          {details && (
            <Reveal delay={120}>
              <p className="kicker-line">Who It&rsquo;s For</p>
              <p className="mt-8 font-display text-2xl font-light leading-relaxed">{details.whoItsFor}</p>
              <div className="mt-8 flex flex-wrap gap-2">
                {service.bestForTags.map((t) => (
                  <span key={t} className="border hairline px-3 py-1.5 text-[0.7rem] uppercase tracking-wideish text-umber">
                    {t}
                  </span>
                ))}
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* ── WHAT TO EXPECT / PREP / AFTERCARE ────────────────── */}
      {details && (
        <section className="grain relative section-pad bg-noir text-ivory">
          <div className="wrap relative">
            <Reveal>
              <p className="kicker-line text-brass-light">The Session</p>
              <h2 className="h-display mt-6 text-4xl sm:text-5xl">
                What to <span className="italic text-brass-light">expect</span>
              </h2>
            </Reveal>
            <ol className="mt-14 grid gap-8 border-t border-ivory/10 pt-10 md:grid-cols-2">
              {details.whatToExpect.map((step, i) => (
                <Reveal key={step} as="li" delay={i * 60} className="flex gap-5">
                  <span className="font-display text-2xl font-light text-brass-light/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-ivory/75">{step}</p>
                </Reveal>
              ))}
            </ol>
            <div className="mt-16 grid gap-10 border-t border-ivory/10 pt-10 md:grid-cols-2">
              <Reveal>
                <h3 className="kicker text-brass-light">Before Your Visit</h3>
                <ul className="mt-5 space-y-3 text-[0.95rem] text-ivory/70">
                  {details.beforeVisit.map((b) => (
                    <li key={b} className="flex gap-3">
                      <span aria-hidden className="text-brass-light">—</span> {b}
                    </li>
                  ))}
                </ul>
              </Reveal>
              <Reveal delay={100}>
                <h3 className="kicker text-brass-light">Aftercare</h3>
                <ul className="mt-5 space-y-3 text-[0.95rem] text-ivory/70">
                  {details.afterCare.map((a) => (
                    <li key={a} className="flex gap-3">
                      <span aria-hidden className="text-brass-light">—</span> {a}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </section>
      )}

      {/* ── ADD-ONS + UPGRADE ────────────────────────────────── */}
      {(recommended.length > 0 || upgrade) && (
        <section className="section-pad bg-porcelain">
          <div className="wrap grid gap-14 lg:grid-cols-[1.2fr_1fr]">
            {recommended.length > 0 && (
              <Reveal>
                <p className="kicker-line">Recommended Enhancements</p>
                <div className="mt-8 grid gap-px overflow-hidden border hairline bg-ink/10 sm:grid-cols-2">
                  {recommended.map((a) => (
                    <div key={a.id} className="bg-ivory p-7">
                      <div className="flex items-baseline justify-between gap-3">
                        <h3 className="font-display text-xl">{a.name}</h3>
                        <span className="font-display text-lg text-brass-dark">${a.price}</span>
                      </div>
                      <p className="mt-3 text-[0.9rem] text-umber">{a.description}</p>
                    </div>
                  ))}
                </div>
              </Reveal>
            )}
            {upgrade && (
              <Reveal delay={120} className="flex flex-col justify-between bg-noir p-10 text-ivory">
                <div>
                  <p className="kicker text-brass-light">Or Go Further</p>
                  <h3 className="h-display mt-5 text-3xl">{upgrade.name}</h3>
                  <p className="mt-4 text-[0.95rem] text-ivory/70">{service.suggestedUpgradeReason}</p>
                </div>
                <Link
                  href={`/services/${upgrade.id}`}
                  className="link-ul mt-8 inline-block text-[0.75rem] font-semibold uppercase tracking-kicker text-brass-light"
                >
                  View {upgrade.name} — ${upgrade.price} →
                </Link>
              </Reveal>
            )}
          </div>
        </section>
      )}

      {/* ── FAQS ─────────────────────────────────────────────── */}
      {serviceFaqs.length > 0 && (
        <section className="section-pad border-t hairline bg-ivory">
          <div className="wrap grid gap-14 lg:grid-cols-[1fr_1.5fr]">
            <Reveal>
              <p className="kicker-line">Questions</p>
              <h2 className="h-display mt-6 text-4xl">
                About this <span className="italic">ritual</span>
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <FaqAccordion faqs={serviceFaqs} />
            </Reveal>
          </div>
        </section>
      )}

      <BookCTA title={`Ready for ${service.name}?`} />
    </>
  );
}
