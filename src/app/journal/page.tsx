import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTABanner from "@/components/CTABanner";
import { prisma } from "@/lib/db";

export const metadata: Metadata = {
  title: "Head Spa Journal",
  description:
    "Expert insights on scalp health, head spa rituals, and hair wellness from Lather Head Spa in Greenville, NC. An editorial guide to the rituals that restore.",
};

type Article = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  featuredImage: string | null;
  featuredImageAlt: string | null;
  category: string | null;
  readingTime: number | null;
  publishedAt: Date | null;
  authorName: string;
};

async function getArticles(): Promise<Article[]> {
  try {
    return await prisma.article.findMany({
      where: { status: "published" },
      orderBy: { publishedAt: "desc" },
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        featuredImage: true,
        featuredImageAlt: true,
        category: true,
        readingTime: true,
        publishedAt: true,
        authorName: true,
      },
    });
  } catch {
    return [];
  }
}

function formatDate(date: Date | null) {
  if (!date) return "";
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

const categories = [
  "All",
  "Scalp Health",
  "Hair Wellness",
  "Education",
  "Experience",
  "Lifestyle",
  "Wellness",
];

export default async function JournalPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const activeCategory = typeof params.category === "string" ? params.category : null;

  const allArticles = await getArticles();

  // Filter by category if one is selected
  const filtered = activeCategory
    ? allArticles.filter((a) => a.category === activeCategory)
    : allArticles;

  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <main>
      <ScrollReveal />
      <Navbar />

      {/* ── HERO ──────────────────────────────────────────── */}
      <section
        className="grain-overlay section-pad"
        style={{
          minHeight: "52vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "0 clamp(20px, 4vw, 48px) clamp(56px, 8vw, 80px)",
          background: "var(--charcoal)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <img
          src="/media/pages/journal-hero.jpg"
          alt="Natulique products and wooden tools"
          loading="eager"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center 40%",
            opacity: 0.15,
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(15,10,6,0.8) 0%, transparent 60%)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: "1400px",
            margin: "0 auto",
            width: "100%",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.62rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "var(--blush)",
              marginBottom: "1.2rem",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              opacity: 0.85,
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
            The Journal
          </p>
          <h1
            className="journal-hero-title"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(3rem, 7vw, 6rem)",
              fontWeight: 300,
              color: "var(--linen)",
              lineHeight: 1.04,
              letterSpacing: "-0.015em",
              maxWidth: "700px",
            }}
          >
            Scalp wisdom.{" "}
            <em style={{ fontStyle: "italic" }}>Hair wellness.</em>
          </h1>
          <p
            className="journal-hero-sub"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(0.88rem, 1.4vw, 1rem)",
              lineHeight: 1.88,
              color: "rgba(237,230,219,0.6)",
              fontWeight: 300,
              maxWidth: "480px",
              marginTop: "1.75rem",
            }}
          >
            Insights on scalp health, treatment rituals, and the science of restoration — from the team at Lather Head Spa.
          </p>
        </div>
      </section>

      {/* ── CATEGORY NAV ──────────────────────────────────── */}
      <div
        style={{
          background: "var(--cream)",
          borderBottom: "1px solid rgba(140,123,107,0.1)",
          padding: "0 clamp(20px, 4vw, 48px)",
        }}
      >
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            display: "flex",
            gap: "clamp(1.5rem, 3vw, 2.5rem)",
            overflowX: "auto",
            WebkitOverflowScrolling: "touch",
            paddingTop: "1.25rem",
            paddingBottom: "1.25rem",
          }}
        >
          {categories.map((cat) => {
            const isActive = cat === "All" ? !activeCategory : activeCategory === cat;
            const href = cat === "All" ? "/journal" : `/journal?category=${encodeURIComponent(cat)}`;
            return (
              <Link
                key={cat}
                href={href}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.6rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: isActive ? "var(--bark)" : "var(--stone)",
                  borderBottom: isActive ? "1.5px solid var(--bark)" : "1.5px solid transparent",
                  paddingBottom: "0.5rem",
                  whiteSpace: "nowrap",
                  textDecoration: "none",
                  transition: "color 0.2s, border-color 0.2s",
                }}
              >
                {cat}
              </Link>
            );
          })}
        </div>
      </div>

      {/* ── EMPTY STATE ───────────────────────────────────── */}
      {filtered.length === 0 && (
        <section
          style={{
            background: "var(--cream)",
            padding: "clamp(100px, 14vw, 200px) clamp(20px, 4vw, 48px)",
            textAlign: "center",
          }}
        >
          <div style={{ maxWidth: "520px", margin: "0 auto" }}>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.4rem, 3vw, 2rem)",
                fontWeight: 300,
                fontStyle: "italic",
                color: "var(--stone)",
                marginBottom: "1.5rem",
                lineHeight: 1.3,
              }}
            >
              {activeCategory
                ? `No articles in ${activeCategory} yet.`
                : "Our journal is just beginning."}
            </p>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.92rem",
                color: "var(--mink)",
                lineHeight: 1.85,
                fontWeight: 300,
                marginBottom: "2.5rem",
              }}
            >
              {activeCategory
                ? "Explore other categories or check back soon for new articles."
                : "We're crafting thoughtful articles on scalp health, head spa rituals, and hair wellness. Check back soon."}
            </p>
            <Link
              href={activeCategory ? "/journal" : "/treatments"}
              style={{
                display: "inline-block",
                fontFamily: "var(--font-body)",
                fontSize: "0.62rem",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "var(--cream)",
                background: "var(--bark)",
                padding: "15px 36px",
                textDecoration: "none",
              }}
            >
              {activeCategory ? "View All Articles" : "View Our Treatments"}
            </Link>
          </div>
        </section>
      )}

      {/* ── FEATURED ARTICLE — full-bleed editorial hero ───── */}
      {featured && (
        <Link
          href={`/journal/${featured.slug}`}
          style={{ textDecoration: "none", display: "block" }}
        >
          <section
            className="reveal-section reveal-lift"
            style={{
              background: "var(--linen)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              className="about-grid journal-featured-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "1.3fr 1fr",
                minHeight: "clamp(400px, 50vw, 620px)",
              }}
            >
              {/* Full-height image */}
              <div className="journal-featured-image" style={{ overflow: "hidden", position: "relative" }}>
                {featured.featuredImage ? (
                  <img
                    src={featured.featuredImage}
                    alt={featured.featuredImageAlt || featured.title}
                    loading="eager"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "center 35%",
                      display: "block",
                      transition: "transform 1.4s var(--ease-luxury)",
                    }}
                  />
                ) : (
                  <div style={{ width: "100%", height: "100%", background: "var(--bark)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontFamily: "var(--font-display)", fontSize: "4rem", color: "var(--blush)", opacity: 0.15, fontStyle: "italic" }}>Journal</span>
                  </div>
                )}
              </div>

              {/* Content side */}
              <div
                className="journal-featured-text"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  padding: "clamp(2.5rem, 5vw, 5rem)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "1.5rem" }}>
                  <span style={{ fontFamily: "var(--font-body)", fontSize: "0.5rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--bark)", background: "var(--blush)", padding: "4px 10px" }}>
                    Featured
                  </span>
                  {featured.category && (
                    <span style={{ fontFamily: "var(--font-body)", fontSize: "0.52rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--stone)" }}>
                      {featured.category}
                    </span>
                  )}
                </div>

                <h2
                  className="journal-featured-title"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(2.2rem, 4vw, 3.4rem)",
                    fontWeight: 300,
                    color: "var(--bark)",
                    lineHeight: 1.08,
                    letterSpacing: "-0.015em",
                    marginBottom: "1.5rem",
                  }}
                >
                  {featured.title}
                </h2>

                {featured.excerpt && (
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.95rem",
                      lineHeight: 1.92,
                      color: "var(--mink)",
                      fontWeight: 300,
                      marginBottom: "1.5rem",
                      maxWidth: "440px",
                    }}
                  >
                    {featured.excerpt}
                  </p>
                )}

                <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", marginBottom: "2rem" }}>
                  {featured.readingTime && (
                    <span style={{ fontFamily: "var(--font-body)", fontSize: "0.55rem", letterSpacing: "0.15em", color: "var(--stone)" }}>
                      {featured.readingTime} min read
                    </span>
                  )}
                  {featured.publishedAt && (
                    <span style={{ fontFamily: "var(--font-body)", fontSize: "0.55rem", color: "var(--stone)", opacity: 0.6 }}>
                      {formatDate(featured.publishedAt)}
                    </span>
                  )}
                </div>

                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    fontFamily: "var(--font-body)",
                    fontSize: "0.62rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "var(--bark)",
                    borderBottom: "1px solid rgba(61,46,34,0.3)",
                    paddingBottom: "3px",
                    alignSelf: "flex-start",
                  }}
                >
                  Read article <span style={{ fontSize: "0.85rem" }}>→</span>
                </span>
              </div>
            </div>
          </section>
        </Link>
      )}

      {/* ── EDITORIAL INTERLUDE — brand breathing moment ──── */}
      <section
        className="reveal-section reveal-fade grain-overlay"
        style={{
          background: "var(--bark)",
          padding: "clamp(72px, 10vw, 120px) clamp(20px, 4vw, 48px)",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 50%, rgba(212,184,168,0.08), transparent 60%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: "640px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <p
            aria-hidden="true"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(6rem, 14vw, 10rem)",
              color: "var(--blush)",
              opacity: 0.06,
              lineHeight: 0.7,
              position: "absolute",
              top: "-0.3em",
              left: "50%",
              transform: "translateX(-50%)",
              pointerEvents: "none",
              userSelect: "none",
              fontStyle: "italic",
            }}
          >
            &ldquo;
          </p>
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.4rem, 3vw, 2.2rem)",
              fontWeight: 300,
              fontStyle: "italic",
              color: "var(--linen)",
              lineHeight: 1.5,
              letterSpacing: "-0.005em",
            }}
          >
            The scalp is where it all begins. When we care for the foundation, everything above it transforms.
          </p>
          <div style={{ width: "32px", height: "1px", background: "var(--blush)", opacity: 0.4, margin: "2rem auto 0" }} />
        </div>
      </section>

      {/* ── EDITORIAL DIVIDER ─────────────────────────────── */}
      {rest.length > 0 && (
        <div
          style={{
            background: "var(--cream)",
            padding: "clamp(48px, 6vw, 72px) clamp(20px, 4vw, 48px) 0",
          }}
        >
          <div
            style={{
              maxWidth: "1400px",
              margin: "0 auto",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.62rem",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "var(--stone)",
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <span style={{ display: "inline-block", width: "28px", height: "1px", background: "var(--blush)" }} />
              More from the Journal
            </p>
          </div>
        </div>
      )}

      {/* ── ARTICLE GRID — editorial layout ─────────────── */}
      {rest.length > 0 && (
        <section
          style={{
            background: "var(--cream)",
            padding: "clamp(48px, 7vw, 80px) clamp(20px, 4vw, 48px) clamp(64px, 9vw, 120px)",
          }}
        >
          <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
            <div
              className="stagger-children journal-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "clamp(16px, 2.5vw, 28px)",
              }}
            >
              {rest.map((article, i) => (
                <Link
                  key={article.id}
                  href={`/journal/${article.slug}`}
                  className="reveal-section reveal-fade journal-card"
                  style={{
                    textDecoration: "none",
                    display: "flex",
                    flexDirection: "column",
                    background: "var(--linen)",
                    transition: "box-shadow 0.5s ease",
                  }}
                >
                  {/* Image */}
                  <div
                    style={{
                      width: "100%",
                      aspectRatio: "16/10",
                      overflow: "hidden",
                      position: "relative",
                    }}
                  >
                    {article.featuredImage ? (
                      <img
                        src={article.featuredImage}
                        alt={article.featuredImageAlt || article.title}
                        loading="lazy"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          objectPosition: "center 35%",
                          display: "block",
                          transition: "transform 1s var(--ease-luxury)",
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          width: "100%",
                          height: "100%",
                          background: "rgba(140,123,107,0.08)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "var(--font-display)",
                            fontSize: "1.5rem",
                            color: "var(--blush)",
                            opacity: 0.25,
                            fontStyle: "italic",
                          }}
                        >
                          L
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div
                    style={{
                      padding: "clamp(1.25rem, 2.5vw, 1.75rem)",
                      display: "flex",
                      flexDirection: "column",
                      flex: 1,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                        marginBottom: "0.75rem",
                      }}
                    >
                      {article.category && (
                        <span
                          style={{
                            fontFamily: "var(--font-body)",
                            fontSize: "0.52rem",
                            letterSpacing: "0.18em",
                            textTransform: "uppercase",
                            color: "var(--stone)",
                          }}
                        >
                          {article.category}
                        </span>
                      )}
                      {article.readingTime && (
                        <span
                          style={{
                            fontFamily: "var(--font-body)",
                            fontSize: "0.52rem",
                            color: "var(--stone)",
                            opacity: 0.5,
                          }}
                        >
                          {article.readingTime} min
                        </span>
                      )}
                    </div>

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
                      {article.title}
                    </h3>

                    {article.excerpt && (
                      <p
                        style={{
                          fontFamily: "var(--font-body)",
                          fontSize: "0.82rem",
                          lineHeight: 1.7,
                          color: "var(--mink)",
                          fontWeight: 300,
                          marginBottom: "1.25rem",
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {article.excerpt}
                      </p>
                    )}

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

      {/* ── VISUAL INTERLUDE — image strip ──────────────── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "2px",
          background: "rgba(140,123,107,0.06)",
        }}
        className="journal-image-strip"
      >
        {[
          { src: "/media/treatments/treatments-hero.jpg", alt: "Brushes in wooden holder" },
          { src: "/media/pages/journal-detail-01.jpg", alt: "Ribbed wood credenza detail" },
          { src: "/media/pages/journal-detail-02.jpg", alt: "Treatment product in wooden bowl" },
        ].map((img) => (
          <div key={img.src} style={{ overflow: "hidden", height: "clamp(160px, 18vw, 260px)" }}>
            <img src={img.src} alt={img.alt} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          </div>
        ))}
      </div>

      {/* ── CTA ───────────────────────────────────────────── */}
      <CTABanner
        eyebrow="Ready to Experience It?"
        headline="Book your"
        headlineItalic="ritual."
        description="Sessions are by appointment only — each time slot is reserved exclusively for you."
        secondaryCTA={{ label: "View Treatments", href: "/treatments" }}
      />

      <Footer />
    </main>
  );
}
