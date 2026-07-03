"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Homepage hero media, tuned per viewport:
 *
 * - Desktop (≥768px): the montage plays full-bleed behind the headline, dimmed
 *   under a gradient so the text stays legible — the immersive treatment.
 * - Mobile (<768px): a landscape montage cover-cropped to a tall phone loses
 *   ~75% of every frame, so instead the same footage plays in a 4:5, arch-topped
 *   panel (echoing the site's arch motif and the gold basin faucet in the shot).
 *   The full cinematography stays visible and the headline sits on solid noir
 *   below it for maximum readability.
 *
 * Only the matching viewport's <video> is mounted, so phones never fetch the
 * 2MB desktop encode and desktops never fetch the mobile one. Posters are CSS
 * background images (loaded only for the displayed panel — display:none skips
 * the fetch) and the mobile panel reserves its aspect ratio in markup, so
 * swapping in the video causes no layout shift. Reduced-motion and Data-Saver
 * users keep the still poster.
 */
export default function HeroMedia() {
  const [mode, setMode] = useState<"desktop" | "mobile" | null>(null);
  const [playVideo, setPlayVideo] = useState(false);
  const desktopRef = useRef<HTMLVideoElement>(null);
  const mobileRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    setMode(isDesktop ? "desktop" : "mobile");

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // @ts-expect-error saveData is non-standard but widely supported on mobile
    const saveData = navigator.connection?.saveData === true;
    if (!reducedMotion && !saveData) setPlayVideo(true);
  }, []);

  useEffect(() => {
    if (!playVideo) return;
    const ref = mode === "desktop" ? desktopRef : mobileRef;
    ref.current?.play().catch(() => {});
  }, [playVideo, mode]);

  return (
    <>
      {/* DESKTOP — full-bleed background */}
      <div
        className="absolute inset-0 hidden bg-cover bg-center md:block"
        style={{ backgroundImage: "url(/media/hero/hero-poster.webp)" }}
      >
        <div className="absolute inset-0 bg-noir/45" />
        {mode === "desktop" && playVideo && (
          <video
            ref={desktopRef}
            className="kenburns relative h-full w-full object-cover opacity-70"
            autoPlay
            muted
            loop
            playsInline
            poster="/media/hero/hero-poster.webp"
            aria-hidden
          >
            <source src="/media/video/hero-welcome.mp4" type="video/mp4" />
          </video>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-noir via-noir/40 to-noir/50" />
      </div>

      {/* MOBILE — framed cinematic still/loop in normal flow. The landscape
          montage keeps its full composition here (a tall crop would reduce it
          to abstract closeups), framed as an editorial film still. */}
      <figure
        className="relative mx-5 aspect-[4/3] overflow-hidden rounded-[10px] bg-cover bg-center shadow-[0_26px_55px_-26px_rgba(0,0,0,0.8)] ring-1 ring-brass/25 md:hidden"
        style={{ backgroundImage: "url(/media/hero/hero-poster-mobile.webp)" }}
      >
        {mode === "mobile" && playVideo && (
          <video
            ref={mobileRef}
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster="/media/hero/hero-poster-mobile.webp"
            aria-hidden
          >
            <source src="/media/video/hero-welcome-mobile.mp4" type="video/mp4" />
          </video>
        )}
        {/* inner hairline for a crisp framed edge */}
        <div className="pointer-events-none absolute inset-0 rounded-[10px] ring-1 ring-inset ring-white/5" />
      </figure>
    </>
  );
}
