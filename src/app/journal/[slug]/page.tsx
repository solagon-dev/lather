import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import BookCTA from "@/components/BookCTA";
import Reveal from "@/components/Reveal";
import { blogArticles } from "@/lib/blog";
import { articleSchema, breadcrumbSchema, clampDescription, jsonLd } from "@/lib/seo";

interface Params {
  slug: string;
}

export function generateStaticParams() {
  return blogArticles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const article = blogArticles.find((a) => a.slug === slug);
  if (!article) return {};
  return {
    title: { absolute: article.metaTitle },
    description: clampDescription(article.metaDescription),
    alternates: { canonical: `/journal/${article.slug}` },
  };
}

function formatDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default async function JournalArticlePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const article = blogArticles.find((a) => a.slug === slug);
  if (!article) notFound();

  const sorted = [...blogArticles].sort((a, b) => b.publishDate.localeCompare(a.publishDate));
  const index = sorted.findIndex((a) => a.slug === article.slug);
  const continueReading = [sorted[(index + 1) % sorted.length], sorted[(index + 2) % sorted.length]];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(articleSchema(article))} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "The Journal", path: "/journal" },
            { name: article.title, path: `/journal/${article.slug}` },
          ])
        )}
      />

      {/* ── ARTICLE HEADER ───────────────────────────────────── */}
      <section className="border-b hairline bg-porcelain px-6 pb-16 pt-40 sm:px-10 md:pb-20 md:pt-48">
        <Reveal className="mx-auto max-w-prose2">
          <nav aria-label="Breadcrumb" className="text-[0.7rem] tracking-[0.02em] text-taupe">
            <Link href="/journal" className="link-ul">
              The Journal
            </Link>{" "}
            / {article.category}
          </nav>
          <p className="mt-8 text-[0.7rem] tracking-[0.02em] text-brass-dark">
            {formatDate(article.publishDate)} · {article.readTime}
          </p>
          <h1 className="h-display mt-6 text-balance text-4xl sm:text-5xl md:text-6xl">{article.title}</h1>
        </Reveal>
      </section>

      {/* ── BODY ─────────────────────────────────────────────── */}
      <article className="section-pad bg-ivory">
        <div className="mx-auto max-w-prose2">
          <Reveal>
            <p className="font-display text-xl italic leading-relaxed text-ink sm:text-2xl">
              {article.intro}
            </p>
          </Reveal>

          {article.sections.map((section, i) => (
            <Reveal key={section.heading} as="section" delay={80}>
              <h2 className="h-display mt-14 text-balance text-2xl sm:text-3xl">{section.heading}</h2>
              {section.paragraphs.map((p) => (
                <p key={p.slice(0, 40)} className="mt-6 leading-relaxed text-umber">
                  {p}
                </p>
              ))}
              {i === 0 && (
                <div className="relative mt-14 aspect-[16/10] overflow-hidden">
                  <Image
                    src="/media/pages/journal-detail-02.webp"
                    alt=""
                    fill
                    sizes="(min-width: 768px) 42rem, 90vw"
                    className="object-cover"
                  />
                </div>
              )}
            </Reveal>
          ))}

          <Reveal delay={80}>
            <p className="mt-14 border-t hairline pt-10 leading-relaxed text-umber">{article.conclusion}</p>
          </Reveal>
        </div>
      </article>

      {/* ── CONTINUE READING ─────────────────────────────────── */}
      <section className="section-pad border-t hairline bg-porcelain">
        <div className="wrap">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <h2 className="h-display text-3xl sm:text-4xl">
                More from the <span className="italic">Journal</span>
              </h2>
            </div>
            <Link href="/journal" className="link-ul mb-2 text-[0.75rem] font-semibold tracking-[0.02em]">
              All Essays →
            </Link>
          </Reveal>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {continueReading.map((a, i) => (
              <Reveal key={a.slug} delay={i * 100}>
                <Link href={`/journal/${a.slug}`} className="group flex h-full flex-col border hairline bg-ivory p-8">
                  <h3 className="h-display flex-1 text-balance text-2xl transition-colors group-hover:text-brass-dark sm:text-3xl">
                    {a.title}
                  </h3>
                  <p className="mt-6 border-t hairline pt-4 text-[0.7rem] tracking-[0.02em] text-taupe">
                    {a.category} · {a.readTime} · {formatDate(a.publishDate)}
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <BookCTA />
    </>
  );
}
