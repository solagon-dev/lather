import Link from "next/link";
import type { ReactNode } from "react";
import { Figure, PageOpening, PriceMenu, SectionHead } from "@/components/site/Editorial";
import { business } from "@/lib/business";
import type { PriceGroup } from "@/lib/menu";
import { breadcrumbSchema, jsonLd } from "@/lib/seo";

/**
 * One service page: what it is, what it costs, how to book. Used for the
 * facials, massage and every wellness treatment.
 */
export default function ServicePage({
  practice,
  path,
  name,
  title,
  intro,
  image,
  facts,
  group,
  related,
  children,
}: {
  practice: "spa" | "wellness";
  path: string;
  name: string;
  title: ReactNode;
  intro: string[];
  image: { src: string; alt: string; focal?: string; caption: string };
  facts: string[];
  group: PriceGroup;
  related: { href: string; label: string; aside?: string }[];
  children?: ReactNode;
}) {
  const spa = practice === "spa";
  const hub = spa ? { name: "Lather Spa", path: "/spa" } : { name: "Lather Wellness", path: "/wellness" };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            hub,
            { name, path },
          ]),
        )}
      />
      <PageOpening
        eyebrow={hub.name}
        aside={spa ? "Booked online" : "By request"}
        title={title}
        figure={
          <Figure
            src={image.src}
            alt={image.alt}
            caption={image.caption}
            focal={image.focal}
            ratio="4/5"
            priority
            sizes="(min-width: 1024px) 55vw, 100vw"
          />
        }
      >
        {intro.map((p) => (
          <p key={p.slice(0, 24)}>{p}</p>
        ))}
      </PageOpening>

      <section aria-labelledby="prices" className="shell pt-20 lg:pt-32">
        <SectionHead num="01" label="Prices" as="h2" id="prices" note={spa ? "Booked online" : "By request"} />
        <div className="mt-8 lg:ml-[88px] lg:mt-12 lg:grid lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <PriceMenu group={group} />
            <div className="mt-8 flex flex-wrap items-baseline gap-x-7 gap-y-4">
              <a href={group.book.url} target="_blank" rel="noopener noreferrer" className="lnk">
                {group.book.label}
              </a>
              <a href={business.phoneHref} className="note text-ink hover:text-brass-dark">
                Questions? {business.phone}
              </a>
            </div>
            {!spa && (
              <p className="note mt-6 max-w-[34rem]">
                Lather Wellness confirms every request with you, and every treatment begins with a conversation about
                your health and goals. Prices are subject to change.
              </p>
            )}
          </div>
          <div className="mt-12 lg:col-span-4 lg:col-start-9 lg:mt-0">
            <p className="cap">Good to know</p>
            <ul className="mt-3 border-t border-line">
              {facts.map((f) => (
                <li key={f} className="note border-b border-line py-3 text-ink">
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {children}

      <section aria-labelledby="related" className="shell pb-20 pt-20 lg:pb-32 lg:pt-32">
        <SectionHead num="02" label={`Also at ${hub.name}`} as="h2" id="related" />
        <ul className="mt-6 lg:ml-[88px]">
          {related.map((r) => (
            <li key={r.href}>
              <Link href={r.href} className="group flex items-baseline justify-between gap-4 border-b border-line py-4">
                <span className="font-display text-[1.375rem] leading-snug group-hover:text-brass-dark">{r.label}</span>
                {r.aside && <span className="note">{r.aside}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
