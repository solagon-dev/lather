"use client";

import { useRef, useEffect, useState, useCallback } from "react";
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
  const [isDragging, setIsDragging] = useState(false);
  const dragState = useRef({ startX: 0, scrollLeft: 0 });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 769);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  /* ── Drag-to-scroll for desktop track ── */
  const onPointerDown = useCallback((e: React.PointerEvent) => {
    const track = trackRef.current;
    if (!track) return;
    setIsDragging(true);
    dragState.current = { startX: e.clientX, scrollLeft: track.scrollLeft };
    track.setPointerCapture(e.pointerId);
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging) return;
    const track = trackRef.current;
    if (!track) return;
    const dx = e.clientX - dragState.current.startX;
    track.scrollLeft = dragState.current.scrollLeft - dx;
  }, [isDragging]);

  const onPointerUp = useCallback(() => setIsDragging(false), []);

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
        {/* Header */}
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

        {/* Horizontal swipe strip — full-bleed, snaps to each image */}
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
              <div
                style={{
                  overflow: "hidden",
                  aspectRatio: "3 / 4",
                  background: "var(--linen)",
                }}
              >
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
              {/* Caption */}
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

        {/* Footer link */}
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

        <style>{`
          section ::-webkit-scrollbar { display: none; }
        `}</style>
      </section>
    );
  }

  /* ── Desktop: elegant horizontal film-strip gallery ── */
  return (
    <section
      ref={sectionRef}
      className="reveal-section reveal-lift"
      style={{
        background: "var(--cream)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "clamp(80px, 10vw, 140px) clamp(20px, 4vw, 48px) clamp(32px, 4vw, 56px)",
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        <GalleryHeader />
      </div>

      {/* Horizontal scrolling track */}
      <div
        ref={trackRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        style={{
          display: "flex",
          gap: "clamp(14px, 1.5vw, 24px)",
          overflowX: "auto",
          overflowY: "hidden",
          paddingLeft: "clamp(20px, 4vw, 48px)",
          paddingRight: "clamp(20px, 4vw, 48px)",
          paddingBottom: "clamp(80px, 10vw, 140px)",
          cursor: isDragging ? "grabbing" : "grab",
          scrollbarWidth: "none",
          WebkitOverflowScrolling: "touch",
          userSelect: "none",
        }}
      >
        {images.map((image, i) => {
          const heights = ["72vh", "56vh", "68vh", "60vh", "72vh", "54vh", "64vh"];
          const widths = ["28vw", "22vw", "26vw", "30vw", "24vw", "20vw", "26vw"];

          return (
            <div
              key={i}
              style={{
                flex: "0 0 auto",
                width: `clamp(260px, ${widths[i]}, 440px)`,
                height: `clamp(320px, ${heights[i]}, 620px)`,
                overflow: "hidden",
                position: "relative",
                marginTop: i % 2 === 1 ? "clamp(40px, 5vw, 80px)" : "0",
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
                  pointerEvents: "none",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              />
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
          width: "clamp(60px, 8vw, 140px)",
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

      <style>{`
        section ::-webkit-scrollbar { display: none; }
      `}</style>
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
