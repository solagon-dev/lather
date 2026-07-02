import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import BookCTA from "@/components/BookCTA";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { blogArticles } from "@/lib/blog";

export const metadata: Metadata = {
  title: "The Journal — Scalp Health & Head Spa Education",
  description:
    "Essays and guides on scalp health, Japanese head spa tradition, and hair wellness from Lather Head Spa in Greenville, NC. Read before your first ritual.",
  alternates: { canonical: "/journal" },
};

function formatDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function excerpt(text: string, length = 140) {
  if (text.length <= length) return text;
  return `${text.slice(0, length).trimEnd().replace(/[,;:.]$/, "")}…`;
}

export default function JournalPage() {
  const articles = [...blogArticles].sort((a, b) => b.publishDate.localeCompare(a.publishDate));
  const [feature, ...rest] = articles;

  return (
    <>
      <PageHero
        kicker="The Journal"
        title={
          <>
            Notes on the art of <span className="italic">scalp care</span>
          </>
        }
        sub="Slow reading for a slow ritual — essays on head spa tradition, scalp science, and the quiet case for taking better care of yourself."
        image="/media/pages/journal-hero.webp"
        imageAlt="Editorial still life inside Lather Head Spa"
      />

      {/* ── FEATURE ──────────────────────────────────────────── */}
      <section className="section-pad bg-porcelain">
        <div className="wrap">
          <Reveal>
            <Link
              href={`/journal/${feature.slug}`}
              className="group grid gap-10 border hairline bg-ivory p-6 sm:p-10 lg:grid-cols-[1.1fr_1fr] lg:items-center"
            >
              <div className="relative aspect-[16/10] overflow-hidden lg:order-2 lg:aspect-[4/3]">
                <Image
                  src="/media/pages/journal-detail-01.webp"
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 45vw, 90vw"
                  className="object-cover transition-transform duration-[1.2s] ease-luxe group-hover:scale-105"
                />
              </div>
              <div>
                <p className="kicker-line">{feature.category}</p>
                <h2 className="h-display mt-6 text-balance text-3xl sm:text-4xl md:text-5xl transition-colors group-hover:text-brass-dark">
                  {feature.title}
                </h2>
                <p className="mt-6 max-w-xl text-umber">{excerpt(feature.intro)}</p>
                <p className="mt-8 text-[0.7rem] uppercase tracking-kicker text-taupe">
                  {feature.readTime} · {formatDate(feature.publishDate)}
                </p>
                <span className="link-ul mt-6 inline-block text-[0.75rem] font-semibold uppercase tracking-kicker text-ink">
                  Read the Essay →
                </span>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── ALL ARTICLES ─────────────────────────────────────── */}
      <section className="section-pad border-t hairline bg-ivory">
        <div className="wrap">
          <Reveal>
            <p className="kicker-line">The Archive</p>
            <h2 className="h-display mt-6 text-4xl sm:text-5xl">
              Every <span className="italic">essay</span>
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((a, i) => (
              <Reveal key={a.slug} delay={i * 80}>
                <Link href={`/journal/${a.slug}`} className="group flex h-full flex-col">
                  <p className="kicker-line">{a.category}</p>
                  <h3 className="h-display mt-5 text-balance text-2xl transition-colors group-hover:text-brass-dark sm:text-3xl">
                    {a.title}
                  </h3>
                  <p className="mt-4 flex-1 text-[0.95rem] text-umber">{excerpt(a.intro)}</p>
                  <p className="mt-6 border-t hairline pt-4 text-[0.7rem] uppercase tracking-kicker text-taupe">
                    {a.readTime} · {formatDate(a.publishDate)}
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <BookCTA
        title="Enough reading — come feel it."
        body="An hour in the chair explains the head spa better than any essay ever could. Sessions are by appointment only, and booking takes under a minute."
      />
    </>
  );
}
