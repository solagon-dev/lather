"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";

const images = [
  {
    src: "/Photos/RAW/02.10.2026_LHS_RAWS/IMG_4086.jpg",
    alt: "Lather Head Spa waiting room — credenza, leather chair, crystal lamps, and vintage rug",
    focal: "center 40%",
  },
  {
    src: "/Photos/Finalized/2.10.26_LHS-4.jpg",
    alt: "Ornate gold mirror reflecting the spa interior with lamps and greenery",
    focal: "center 25%",
  },
  {
    src: "/Photos/RAW/02.10.2026_LHS_RAWS/IMG_4071.jpg",
    alt: "Reception detail — marble counter with ceramic dish and warm lamplight",
    focal: "center 45%",
  },
  {
    src: "/Photos/RAW/02.10.2026_LHS_RAWS/IMG_4174.jpg",
    alt: "The Lather team posed in the studio with brass wall sconce",
    focal: "center 25%",
  },
  {
    src: "/Photos/Finalized/2.10.26_LHS-3.jpg",
    alt: "Aromatherapy diffuser creating a calm sensory atmosphere",
    focal: "center center",
  },
  {
    src: "/Photos/RAW/02.10.2026_LHS_RAWS/IMG_4101.jpg",
    alt: "Crystal lamp base — faceted glass and brass on marble surface",
    focal: "center 40%",
  },
  {
    src: "/Photos/Finalized/2.10.26_LHS-12.jpg",
    alt: "Crystal and brass lamp base on marble — luxury interior detail",
    focal: "center center",
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

        // Translate the track horizontally
        const trackWidth = track.scrollWidth - window.innerWidth;
        track.style.transform = `translateX(${-progress * trackWidth}px)`;

        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isMobile]);

  // Mobile: static grid, Desktop: horizontal scroll
  if (isMobile) {
    return (
      <section
        className="reveal-section reveal-lift section-pad"
        style={{
          background: "var(--cream)",
          padding: "clamp(56px, 8.5vw, 100px) clamp(20px, 4vw, 48px)",
        }}
      >
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <GalleryHeader />
          <div
            className="gallery-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "8px",
            }}
          >
            {images.slice(0, 4).map((image, i) => (
              <div key={i} style={{ overflow: "hidden", background: "var(--linen)", aspectRatio: "3 / 4" }}>
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      style={{
        height: "180vh",
        position: "relative",
        background: "var(--cream)",
      }}
    >
      {/* Sticky viewport container — offset for navbar */}
      <div
        style={{
          position: "sticky",
          top: "70px",
          height: "calc(100vh - 70px)",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "clamp(32px, 4vw, 48px) clamp(20px, 4vw, 48px) clamp(20px, 2.5vw, 32px)",
            maxWidth: "1400px",
            width: "100%",
            margin: "0 auto",
          }}
        >
          <GalleryHeader />
        </div>

        {/* Horizontal image track */}
        <div style={{ flex: 1, position: "relative" }}>
          <div
            ref={trackRef}
            style={{
              display: "flex",
              gap: "clamp(10px, 1.2vw, 16px)",
              alignItems: "stretch",
              height: "100%",
              paddingLeft: "clamp(20px, 4vw, 48px)",
              paddingRight: "15vw",
              willChange: "transform",
            }}
          >
            {images.map((image, i) => (
              <div
                key={i}
                style={{
                  flex: "0 0 auto",
                  height: "100%",
                  aspectRatio: "3 / 4",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: image.focal,
                    display: "block",
                    transition: "transform 1.2s var(--ease-luxury)",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.04)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                />
              </div>
            ))}
          </div>

          {/* Fade edges */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              right: 0,
              width: "120px",
              background: "linear-gradient(to left, var(--cream), transparent)",
              pointerEvents: "none",
              zIndex: 1,
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
