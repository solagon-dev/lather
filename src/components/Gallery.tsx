"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";

const images = [
  {
    src: "/media/gallery/interior-waiting-room.jpg",
    alt: "Lather Head Spa waiting room — credenza, leather chair, crystal lamps, and vintage rug",
    focal: "center 40%",
    caption: "The Waiting Room",
  },
  {
    src: "/media/gallery/interior-gold-mirror.jpg",
    alt: "Ornate gold mirror reflecting the spa interior with lamps and greenery",
    focal: "center 25%",
    caption: "Gold Mirror Detail",
  },
  {
    src: "/media/gallery/interior-reception-detail.jpg",
    alt: "Reception detail — marble counter with ceramic dish and warm lamplight",
    focal: "center 45%",
    caption: "Reception",
  },
  {
    src: "/media/gallery/interior-team-portrait.jpg",
    alt: "The Lather team posed in the studio with brass wall sconce",
    focal: "center 25%",
    caption: "The Team",
  },
  {
    src: "/media/gallery/interior-diffuser.jpg",
    alt: "Aromatherapy diffuser creating a calm sensory atmosphere",
    focal: "center center",
    caption: "Aromatherapy",
  },
  {
    src: "/media/gallery/interior-crystal-lamp.jpg",
    alt: "Crystal lamp base — faceted glass and brass on marble surface",
    focal: "center 40%",
    caption: "Crystal Detail",
  },
  {
    src: "/media/gallery/treatment-waterfall.jpg",
    alt: "Water cascading through gold arch onto hair with flower — luxury head spa treatment",
    focal: "center 40%",
    caption: "The Waterfall",
  },
  {
    src: "/media/gallery/interior-lamp-brass.jpg",
    alt: "Crystal and brass lamp base on marble — luxury interior detail",
    focal: "center center",
    caption: "Brass & Marble",
  },
];

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 769);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  /* ── Scroll-linked horizontal translation (desktop) ── */
  useEffect(() => {
    if (isMobile) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();
        const scrollable = section.offsetHeight - window.innerHeight;
        if (scrollable <= 0) { ticking = false; return; }

        const scrolled = Math.max(0, -rect.top);
        const progress = Math.min(scrolled / scrollable, 1);

        // Translate the track horizontally based on scroll progress
        const trackWidth = track.scrollWidth - track.parentElement!.offsetWidth;
        track.style.transform = `translateX(${-progress * trackWidth}px)`;

        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // initial position
    return () => window.removeEventListener("scroll", onScroll);
  }, [isMobile]);

  /* ── Mobile: editorial swipe gallery ── */
  if (isMobile) {
    return (
      <section
        className="reveal-section reveal-lift"
        style={{
          background: "var(--cream)",
          paddingTop: "clamp(56px, 8.5vw, 100px)",
          paddingBottom: "clamp(56px, 8.5vw, 100px)",
        }}
      >
        <div style={{ padding: "0 24px", marginBottom: "clamp(28px, 5vw, 40px)" }}>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.6rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "var(--stone)",
              marginBottom: "1rem",
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <span style={{ display: "inline-block", width: "24px", height: "1px", background: "var(--blush)" }} />
            The Space
          </p>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 8vw, 2.8rem)",
              fontWeight: 300,
              color: "var(--bark)",
              lineHeight: 1.08,
              letterSpacing: "-0.01em",
            }}
          >
            Inside <em style={{ fontStyle: "italic" }}>Lather.</em>
          </h2>
        </div>

        <div
          style={{
            overflowX: "auto",
            overflowY: "hidden",
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "none",
            display: "flex",
            gap: "12px",
            paddingLeft: "24px",
            paddingRight: "24px",
            paddingBottom: "4px",
          }}
        >
          {images.slice(0, 5).map((image, i) => (
            <div
              key={i}
              style={{
                flex: "0 0 auto",
                width: "72vw",
                maxWidth: "340px",
                scrollSnapAlign: "start",
                position: "relative",
              }}
            >
              <div style={{ overflow: "hidden", aspectRatio: "3 / 4", background: "var(--linen)" }}>
                <img
                  src={image.src}
                  alt={image.alt}
                  loading={i < 2 ? "eager" : "lazy"}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: image.focal,
                    display: "block",
                  }}
                />
              </div>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.56rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--stone)",
                  marginTop: "12px",
                  opacity: 0.6,
                }}
              >
                {image.caption}
              </p>
            </div>
          ))}
        </div>

        <div style={{ padding: "0 24px", marginTop: "clamp(28px, 5vw, 40px)" }}>
          <Link
            href="/contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              fontFamily: "var(--font-body)",
              fontSize: "0.6rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--bark)",
              textDecoration: "none",
              borderBottom: "1px solid rgba(61,46,34,0.3)",
              paddingBottom: "3px",
            }}
          >
            Book Your Visit <span style={{ fontSize: "0.85rem" }}>→</span>
          </Link>
        </div>

        <style>{`section ::-webkit-scrollbar { display: none; }`}</style>
      </section>
    );
  }

  /* ── Desktop: scroll-linked horizontal gallery ── */
  return (
    <section
      ref={sectionRef}
      style={{
        height: "200vh",
        position: "relative",
        background: "var(--cream)",
      }}
    >
      {/* Sticky viewport — pins while the page scrolls */}
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "clamp(80px, 10vw, 120px) clamp(20px, 4vw, 48px) clamp(24px, 3vw, 40px)",
            maxWidth: "1400px",
            width: "100%",
            margin: "0 auto",
          }}
        >
          <GalleryHeader />
        </div>

        {/* Image track — translated by scroll */}
        <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
          <div
            ref={trackRef}
            style={{
              display: "flex",
              gap: "clamp(14px, 1.5vw, 24px)",
              alignItems: "stretch",
              height: "100%",
              paddingLeft: "clamp(20px, 4vw, 48px)",
              paddingRight: "15vw",
              willChange: "transform",
            }}
          >
            {images.map((image, i) => {
              const heights = ["100%", "75%", "92%", "80%", "100%", "70%", "88%"];

              return (
                <div
                  key={i}
                  style={{
                    flex: "0 0 auto",
                    width: "clamp(280px, 26vw, 420px)",
                    height: heights[i],
                    overflow: "hidden",
                    position: "relative",
                    alignSelf: i % 2 === 1 ? "flex-end" : "flex-start",
                  }}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    loading={i < 3 ? "eager" : "lazy"}
                    draggable={false}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: image.focal,
                      display: "block",
                      transition: "transform 1.2s var(--ease-luxury)",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                  />
                  {/* Subtle vignette */}
                  <div
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(to top, rgba(61,46,34,0.15) 0%, transparent 40%)",
                      pointerEvents: "none",
                    }}
                  />
                </div>
              );
            })}
          </div>

          {/* Fade edges */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              right: 0,
              width: "clamp(80px, 10vw, 160px)",
              background: "linear-gradient(to left, var(--cream), transparent)",
              pointerEvents: "none",
              zIndex: 2,
            }}
          />
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              width: "clamp(20px, 3vw, 48px)",
              background: "linear-gradient(to right, var(--cream), transparent)",
              pointerEvents: "none",
              zIndex: 2,
            }}
          />
        </div>
      </div>
    </section>
  );
}

function GalleryHeader() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "1.5rem",
      }}
    >
      <div>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.62rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "var(--stone)",
            marginBottom: "1.2rem",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <span style={{ display: "inline-block", width: "28px", height: "1px", background: "var(--blush)" }} />
          The Space
        </p>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.4rem, 5vw, 3.8rem)",
            fontWeight: 300,
            color: "var(--bark)",
            lineHeight: 1.08,
            letterSpacing: "-0.01em",
          }}
        >
          Inside <em style={{ fontStyle: "italic" }}>Lather.</em>
        </h2>
      </div>
      <Link
        href="/contact"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "10px",
          fontFamily: "var(--font-body)",
          fontSize: "0.62rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "var(--bark)",
          textDecoration: "none",
          borderBottom: "1px solid rgba(61,46,34,0.35)",
          paddingBottom: "3px",
          transition: "opacity 0.25s, gap 0.3s var(--ease-luxury)",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.5"; e.currentTarget.style.gap = "16px"; }}
        onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.gap = "10px"; }}
      >
        Book Your Visit
        <span style={{ fontSize: "0.85rem" }}>→</span>
      </Link>
    </div>
  );
}
