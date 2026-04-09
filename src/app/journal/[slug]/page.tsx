import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/db";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type Props = { params: Promise<{ slug: string }> };

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function formatDate(date: Date | null) {
  if (!date) return "";
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

/* ------------------------------------------------------------------ */
/*  SSG                                                                */
/* ------------------------------------------------------------------ */

export async function generateStaticParams() {
  try {
    const articles = await prisma.article.findMany({
      where: { status: "published" },
      select: { slug: true },
    });
    return articles.map((a) => ({ slug: a.slug }));
  } catch {
    return [];
  }
}

/* ------------------------------------------------------------------ */
/*  SEO Metadata                                                       */
/* ------------------------------------------------------------------ */

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const article = await prisma.article.findUnique({
      where: { slug, status: "published" },
      select: {
        seoTitle: true,
        seoDescription: true,
        title: true,
        excerpt: true,
        featuredImage: true,
        canonicalUrl: true,
        publishedAt: true,
        authorName: true,
      },
    });
    if (!article) return {};

    return {
      title: article.seoTitle || article.title,
      description: article.seoDescription || article.excerpt || "",
      openGraph: {
        title: article.seoTitle || article.title,
        description: article.seoDescription || article.excerpt || undefined,
        type: "article",
        publishedTime: article.publishedAt?.toISOString(),
        authors: [article.authorName || "Lather Head Spa"],
        images: article.featuredImage ? [{ url: article.featuredImage }] : [],
      },
      alternates: article.canonicalUrl
        ? { canonical: article.canonicalUrl }
        : undefined,
    };
  } catch {
    return {};
  }
}

/* ------------------------------------------------------------------ */
/*  Data fetching                                                      */
/* ------------------------------------------------------------------ */

async function getArticle(slug: string) {
  try {
    return await prisma.article.findUnique({
      where: { slug, status: "published" },
    });
  } catch {
    return null;
  }
}

async function getRelated(slug: string, category: string | null) {
  try {
    return await prisma.article.findMany({
      where: {
        status: "published",
        slug: { not: slug },
        ...(category ? { category } : {}),
      },
      orderBy: { publishedAt: "desc" },
      take: 3,
      select: {
        title: true,
        slug: true,
        excerpt: true,
        featuredImage: true,
        featuredImageAlt: true,
        category: true,
        readingTime: true,
        publishedAt: true,
      },
    });
  } catch {
    return [];
  }
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();

  const related = await getRelated(slug, article.category);

  /* JSON-LD structured data */
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.seoDescription || article.excerpt || "",
    image: article.featuredImage || undefined,
    datePublished: article.publishedAt?.toISOString(),
    dateModified: article.updatedAt.toISOString(),
    author: {
      "@type": "Person",
      name: article.authorName || "Lather Head Spa",
    },
    publisher: {
      "@type": "Organization",
      name: "Lather Head Spa",
      url: "https://www.latherspas.com",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.latherspas.com/journal/${slug}`,
    },
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <ScrollReveal />
      <Navbar />

      {/* ============================================================
          1. ARTICLE HERO
          ============================================================ */}
      {article.featuredImage ? (
        <section
          className="grain-overlay"
          style={{
            position: "relative",
            width: "100%",
            height: "clamp(360px, 50vh, 600px)",
            overflow: "hidden",
            background: "var(--charcoal)",
          }}
        >
          <img
            src={article.featuredImage}
            alt={article.featuredImageAlt || article.title}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: 0.35,
            }}
            loading="eager"
          />
          {/* Bottom gradient */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "60%",
              background:
                "linear-gradient(to top, var(--charcoal), transparent)",
              pointerEvents: "none",
            }}
          />
          {/* Overlay content */}
          <div
            style={{
              position: "relative",
              zIndex: 1,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              padding:
                "0 clamp(20px, 4vw, 48px) clamp(40px, 6vw, 72px)",
            }}
          >
            <div style={{ maxWidth: "900px", margin: "0 auto", width: "100%" }}>
              {/* Category badge + meta */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  marginBottom: "1.25rem",
                  flexWrap: "wrap",
                }}
              >
                {article.category && (
                  <span
                    style={{
                      background: "var(--blush)",
                      color: "var(--bark)",
                      padding: "5px 14px",
                      fontFamily: "var(--font-body)",
                      fontSize: "0.52rem",
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      fontWeight: 400,
                    }}
                  >
                    {article.category}
                  </span>
                )}
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.56rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "rgba(237,230,219,0.5)",
                    fontWeight: 300,
                  }}
                >
                  {article.readingTime && `${article.readingTime} min read`}
                  {article.readingTime && article.publishedAt && " · "}
                  {formatDate(article.publishedAt)}
                </span>
              </div>
              {/* Title */}
              <h1
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2.4rem, 5.5vw, 4.2rem)",
                  fontWeight: 300,
                  color: "var(--linen)",
                  lineHeight: 1.06,
                  letterSpacing: "-0.015em",
                  maxWidth: "820px",
                }}
              >
                {article.title}
              </h1>
            </div>
          </div>
        </section>
      ) : (
        <section
          className="grain-overlay"
          style={{
            position: "relative",
            width: "100%",
            minHeight: "clamp(360px, 50vh, 600px)",
            overflow: "hidden",
            background: "var(--charcoal)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            padding:
              "0 clamp(20px, 4vw, 48px) clamp(40px, 6vw, 72px)",
          }}
        >
          {/* Ambient radial */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(ellipse at 50% 30%, rgba(212,184,168,0.08), transparent 60%)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              maxWidth: "900px",
              margin: "0 auto",
              width: "100%",
              position: "relative",
              zIndex: 1,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                marginBottom: "1.25rem",
                flexWrap: "wrap",
              }}
            >
              {article.category && (
                <span
                  style={{
                    background: "var(--blush)",
                    color: "var(--bark)",
                    padding: "5px 14px",
                    fontFamily: "var(--font-body)",
                    fontSize: "0.52rem",
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    fontWeight: 400,
                  }}
                >
                  {article.category}
                </span>
              )}
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.56rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "rgba(237,230,219,0.5)",
                  fontWeight: 300,
                }}
              >
                {article.readingTime && `${article.readingTime} min read`}
                {article.readingTime && article.publishedAt && " · "}
                {formatDate(article.publishedAt)}
              </span>
            </div>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.4rem, 5.5vw, 4.2rem)",
                fontWeight: 300,
                color: "var(--linen)",
                lineHeight: 1.06,
                letterSpacing: "-0.015em",
                maxWidth: "820px",
              }}
            >
              {article.title}
            </h1>
          </div>
        </section>
      )}

      {/* ============================================================
          2. ARTICLE META BAR
          ============================================================ */}
      <section
        style={{
          background: "var(--cream)",
          padding: "clamp(48px, 7vw, 80px) clamp(20px, 4vw, 48px) 0",
        }}
      >
        <div style={{ maxWidth: "760px", margin: "0 auto" }}>
          {/* Breadcrumb */}
          <nav
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.55rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--stone)",
              marginBottom: "2rem",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              flexWrap: "wrap",
            }}
          >
            <Link
              href="/journal"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              Journal
            </Link>
            {article.category && (
              <>
                <span style={{ opacity: 0.4 }}>/</span>
                <span style={{ color: "var(--blush)" }}>
                  {article.category}
                </span>
              </>
            )}
          </nav>

          {/* Author + date — refined with vertical separator */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "clamp(12px, 2vw, 18px)",
              fontFamily: "var(--font-body)",
              fontSize: "0.72rem",
              color: "var(--mink)",
              fontWeight: 300,
              letterSpacing: "0.04em",
              marginBottom: article.excerpt ? "2.5rem" : "3rem",
              flexWrap: "wrap",
            }}
          >
            {article.authorName && (
              <span style={{ fontWeight: 400 }}>By {article.authorName}</span>
            )}
            {article.authorName && article.publishedAt && (
              <span style={{ width: "1px", height: "14px", background: "var(--blush)", opacity: 0.4 }} />
            )}
            {article.publishedAt && (
              <span style={{ color: "var(--stone)" }}>{formatDate(article.publishedAt)}</span>
            )}
            {article.readingTime && (
              <>
                <span style={{ width: "1px", height: "14px", background: "var(--blush)", opacity: 0.4 }} />
                <span style={{ color: "var(--stone)" }}>{article.readingTime} min read</span>
              </>
            )}
          </div>

          {/* Excerpt / lede — larger, more editorial */}
          {article.excerpt && (
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.2rem, 2.4vw, 1.55rem)",
                lineHeight: 1.6,
                color: "var(--bark)",
                fontWeight: 300,
                fontStyle: "italic",
                marginBottom: "3rem",
                maxWidth: "680px",
                opacity: 0.8,
              }}
            >
              {article.excerpt}
            </p>
          )}

          {/* Decorative divider — centered blush accent */}
          <div style={{ display: "flex", alignItems: "center", gap: "clamp(12px, 2vw, 20px)" }}>
            <div style={{ flex: 1, height: "1px", background: "linear-gradient(to right, var(--blush), transparent 80%)", opacity: 0.35 }} />
            <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--blush)", opacity: 0.25 }} />
            <div style={{ flex: 1, height: "1px", background: "linear-gradient(to left, var(--blush), transparent 80%)", opacity: 0.35 }} />
          </div>
        </div>
      </section>

      {/* ============================================================
          3. ARTICLE BODY
          ============================================================ */}
      <section
        style={{
          background: "var(--cream)",
          padding:
            "clamp(48px, 6vw, 72px) clamp(20px, 4vw, 48px) 0",
        }}
      >
        <div
          className="reveal-section reveal-fade"
          style={{ maxWidth: "760px", margin: "0 auto" }}
        >
          <div
            className="article-content"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </div>
      </section>

      {/* ============================================================
          3.5 EDITORIAL INTERLUDE — visual breathing moment
          ============================================================ */}
      <div
        style={{
          background: "var(--cream)",
          padding: "0 clamp(20px, 4vw, 48px)",
        }}
      >
        <div
          style={{
            maxWidth: "760px",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            gap: "clamp(1rem, 2vw, 2rem)",
            padding: "clamp(40px, 5vw, 56px) 0",
          }}
        >
          <div style={{ flex: 1, height: "1px", background: "rgba(140,123,107,0.15)" }} />
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1rem, 1.8vw, 1.2rem)",
              fontStyle: "italic",
              color: "var(--stone)",
              opacity: 0.5,
              whiteSpace: "nowrap",
            }}
          >
            ·&nbsp;&nbsp;·&nbsp;&nbsp;·
          </span>
          <div style={{ flex: 1, height: "1px", background: "rgba(140,123,107,0.15)" }} />
        </div>
      </div>

      {/* ============================================================
          4. MID-ARTICLE CTA
          ============================================================ */}
      <section
        className="grain-overlay"
        style={{
          background: "var(--bark)",
          padding: "clamp(64px, 9vw, 100px) clamp(20px, 4vw, 48px)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(212,184,168,0.1), transparent 55%)",
            pointerEvents: "none",
          }}
        />
        <div
          className="article-mid-cta about-grid"
          style={{
            maxWidth: "760px",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "2rem",
            flexWrap: "wrap",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.4rem, 3vw, 2rem)",
                fontWeight: 300,
                fontStyle: "italic",
                color: "var(--linen)",
                lineHeight: 1.3,
                marginBottom: "0.5rem",
              }}
            >
              Experience it firsthand.
            </p>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.78rem",
                color: "rgba(237,230,219,0.5)",
                fontWeight: 300,
                letterSpacing: "0.06em",
              }}
            >
              Lather Head Spa &middot; Greenville, NC
            </p>
          </div>
          <a
            href="/book"
            className="btn-light article-mid-cta-btn"
            style={{
              display: "inline-block",
              fontFamily: "var(--font-body)",
              fontSize: "0.62rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--bark)",
              background: "var(--linen)",
              padding: "16px 40px",
              textDecoration: "none",
              flexShrink: 0,
            }}
          >
            Book a Ritual
          </a>
        </div>
      </section>

      {/* ============================================================
          5. RELATED ARTICLES
          ============================================================ */}
      {related.length > 0 && (
        <section
          className="reveal-section reveal-fade"
          style={{
            background: "var(--linen)",
            padding:
              "clamp(72px, 10vw, 104px) clamp(20px, 4vw, 48px)",
          }}
        >
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            {/* Eyebrow */}
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.6rem",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "var(--stone)",
                marginBottom: "3rem",
                display: "flex",
                alignItems: "center",
                gap: "14px",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: "28px",
                  height: "1px",
                  background: "var(--blush)",
                }}
              />
              Continue Reading
            </p>

            {/* Card grid */}
            <div
              className="stagger-children values-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "clamp(16px, 2.5vw, 28px)",
              }}
            >
              {related.map((a) => (
                <Link
                  key={a.slug}
                  href={`/journal/${a.slug}`}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    textDecoration: "none",
                    background: "var(--cream)",
                    transition: "box-shadow 0.5s ease",
                  }}
                >
                  {/* Thumbnail */}
                  <div
                    style={{
                      width: "100%",
                      aspectRatio: "16 / 10",
                      overflow: "hidden",
                      background: "var(--linen)",
                    }}
                  >
                    {a.featuredImage ? (
                      <img
                        src={a.featuredImage}
                        alt={a.featuredImageAlt || a.title}
                        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 1s var(--ease-luxury)" }}
                        loading="lazy"
                      />
                    ) : (
                      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", color: "var(--blush)", opacity: 0.2, fontStyle: "italic" }}>L</span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div style={{ padding: "clamp(1.25rem, 2.5vw, 1.75rem)", flex: 1, display: "flex", flexDirection: "column" }}>
                    <p
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.52rem",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: "var(--stone)",
                        marginBottom: "0.75rem",
                      }}
                    >
                      {a.category}
                      {a.readingTime ? ` · ${a.readingTime} min` : ""}
                    </p>

                    <h3
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(1.2rem, 2vw, 1.5rem)",
                        fontWeight: 300,
                        color: "var(--bark)",
                        lineHeight: 1.2,
                        marginBottom: "0.75rem",
                        flex: 1,
                      }}
                    >
                      {a.title}
                    </h3>

                    <span
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.55rem",
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        color: "var(--bark)",
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                        marginTop: "auto",
                      }}
                    >
                      Read <span style={{ fontSize: "0.75rem" }}>→</span>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============================================================
          6. FINAL CTA
          ============================================================ */}
      <section
        style={{
          background: "var(--charcoal)",
          padding: "clamp(64px, 9vw, 96px) clamp(20px, 4vw, 48px)",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "480px", margin: "0 auto" }}>
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.3rem, 2.8vw, 1.8rem)",
              fontWeight: 300,
              fontStyle: "italic",
              color: "var(--linen)",
              lineHeight: 1.35,
              marginBottom: "2.5rem",
            }}
          >
            Explore more from the journal
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "2rem",
              flexWrap: "wrap",
            }}
          >
            <Link
              href="/journal"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.62rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--linen)",
                textDecoration: "none",
                borderBottom: "1px solid rgba(237,230,219,0.3)",
                paddingBottom: "3px",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              Back to Journal &rarr;
            </Link>
            <Link
              href="/treatments"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.62rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--linen)",
                textDecoration: "none",
                borderBottom: "1px solid rgba(237,230,219,0.3)",
                paddingBottom: "3px",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              View Our Treatments &rarr;
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
