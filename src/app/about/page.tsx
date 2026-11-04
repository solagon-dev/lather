import type { Metadata } from "next";
import { Figure, PageOpening, SectionHead } from "@/components/site/Editorial";
import { BookButton } from "@/components/site/BookSheet";
import { breadcrumbSchema, jsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Lather began with sisters Hannah DeMotts and Abigail Baldwin and their longtime friend, Stacia Friend, CNM. A spa and a wellness practice under one roof in Greenville, NC.",
  alternates: { canonical: "/about" },
};

const founders = [
  { name: "Hannah DeMotts", role: "Co-founder" },
  { name: "Abigail Baldwin", role: "Co-founder" },
  { name: "Stacia Friend, CNM", role: "Co-founder · Certified Nurse Midwife · leads Lather Wellness" },
];

const space = [
  { src: "/media/gallery/interior-waiting-room.webp", alt: "The lounge at Lather", caption: "The lounge" },
  { src: "/media/gallery/interior-lamp-brass.webp", alt: "A brass lamp in the treatment room", caption: "A brass lamp" },
  { src: "/media/gallery/interior-reception-detail.webp", alt: "Reception at Lather", caption: "Reception" },
  { src: "/media/gallery/interior-crystal-lamp.webp", alt: "A crystal lamp in the treatment room", caption: "The treatment room" },
];

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Our Story", path: "/about" },
          ]),
        )}
      />
      <PageOpening
        eyebrow="Our story"
        title="Two sisters and a longtime friend."
        figure={
          <Figure
            src="/media/founders/founders-hero.webp"
            alt="Hannah DeMotts, Abigail Baldwin and Stacia Friend, CNM, on the staircase at Lather"
            caption="Hannah DeMotts, Abigail Baldwin and Stacia Friend, CNM"
            focal="50% 20%"
            ratio="4/5"
            priority
            sizes="(min-width: 1024px) 55vw, 100vw"
          />
        }
      >
        <p>
          Lather began with sisters Hannah DeMotts and Abigail Baldwin and their longtime friend, Stacia Friend, CNM
          &mdash; built on shared experience, trust, and a love of caring for others.
        </p>
      </PageOpening>

      <section aria-labelledby="story" className="shell pt-20 lg:pt-32">
        <SectionHead num="01" label="How Lather began" as="h2" id="story" />
        <div className="mt-8 lg:ml-[88px] lg:grid lg:grid-cols-12 lg:gap-12">
          <div className="copy space-y-5 lg:col-span-6">
            <p>
              They kept seeing the same gap: you could find a spa, or you could find wellness care, but rarely both, and
              almost never somewhere that felt calm and personal. So they made one place for both.
            </p>
            <p>
              Lather Spa offers head spa rituals, facials, and massage. Lather Wellness, led by Stacia, provides
              personalized medical and wellness care. Two practices, one quiet house on Fox Haven Drive.
            </p>
          </div>
          <Figure
            src="/media/founders/founders-story.webp"
            alt="The three founders of Lather together"
            ratio="3/4"
            sizes="(min-width: 1024px) 30vw, 100vw"
            className="mt-10 lg:col-span-4 lg:col-start-9 lg:mt-0"
          />
        </div>
      </section>

      <section aria-labelledby="founders" className="shell pt-20 lg:pt-32">
        <SectionHead num="02" label="The founders" as="h2" id="founders" />
        <ul className="mt-4 lg:ml-[88px]">
          {founders.map((f) => (
            <li key={f.name} className="border-b border-line py-5 lg:flex lg:items-baseline lg:justify-between">
              <p className="font-display text-[1.5rem] leading-snug lg:text-[1.875rem]">{f.name}</p>
              <p className="cap-m mt-1 lg:mt-0">{f.role}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="house" className="shell pb-20 pt-20 lg:pb-32 lg:pt-32">
        <SectionHead num="03" label="The house" as="h2" id="house" note="101 Fox Haven Drive" />
        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 lg:ml-[88px] lg:grid-cols-4 lg:gap-x-8">
          {space.map((s, i) => (
            <Figure
              key={s.src}
              src={s.src}
              alt={s.alt}
              caption={s.caption}
              ratio="3/4"
              sizes="(min-width: 1024px) 22vw, 50vw"
              className={i % 2 ? "mt-10" : ""}
            />
          ))}
        </div>
        <div className="mt-14 lg:ml-[88px]">
          <BookButton className="lnk">Book an appointment</BookButton>
        </div>
      </section>
    </>
  );
}
