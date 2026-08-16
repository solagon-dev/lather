"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/**
 * Homepage hero media, tuned per viewport.
 *
 * Desktop (≥768px): a full-bleed landscape still with a slow ken-burns push,
 * dimmed under a gradient so the headline stays legible.
 *
 * Why a still and not the montage: every source clip is stored 1280×720 with
 * SAR 81:256, i.e. horizontally squeezed 9:16 phone footage. Corrected to
 * square pixels its true resolution is only 404×720 — fine inside a ~350px
 * phone panel, nowhere near enough for a 1440px-wide background, and cropping
 * a 9:16 frame to a wide hero threw away ~61% of it (the subject included).
 * A 1920×1281 still is sharp at any desktop width. Restore a moving desktop
 * hero when there is footage actually shot landscape.
 *
 * Mobile (<768px): the corrected clip runs edge to edge in a 5:4 frame — a
 * inset rounded card reads as generic UI rather than as cinema. The video
 * is encoded pre-cropped to exactly that frame, so object-cover has nothing
 * left to discard and the poster and first frame line up precisely. The ratio
 * is set by the fold, not by taste: at 4:5 and even at 1:1 the hero's Book
 * button fell below 844px of viewport, and the primary CTA on the busiest
 * page should not need a scroll.
 *
 * The phone clip is only mounted on phones, so desktops never fetch it.
 * Reduced-motion and Data-Saver users keep the still poster.
 */
export default function HeroMedia() {
  const [isMobile, setIsMobile] = useState(false);
  const [playVideo, setPlayVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setIsMobile(!window.matchMedia("(min-width: 768px)").matches);

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // @ts-expect-error saveData is non-standard but widely supported on mobile
    const saveData = navigator.connection?.saveData === true;
    if (!reducedMotion && !saveData) setPlayVideo(true);
  }, []);

  useEffect(() => {
    if (playVideo && isMobile) videoRef.current?.play().catch(() => {});
  }, [playVideo, isMobile]);

  return (
    <>
      {/* DESKTOP — full-bleed still */}
      <div className="absolute inset-0 hidden overflow-hidden md:block">
        <Image
          src="/media/about/spa-detail.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="kenburns object-cover object-[60%_50%]"
        />
        <div className="absolute inset-0 bg-noir/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-noir via-noir/40 to-noir/50" />
      </div>

      {/* MOBILE — framed cinematic panel in normal flow */}
      <figure
        className="relative aspect-[404/322] w-full overflow-hidden bg-cover bg-center md:hidden"
        style={{ backgroundImage: "url(/media/hero/hero-poster-mobile.webp)" }}
      >
        {isMobile && playVideo && (
          <video
            ref={videoRef}
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
        {/* Feathered bottom edge so the frame dissolves into the noir the
            headline sits on, rather than ending on a hard line. */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-noir to-transparent" />
      </figure>
    </>
  );
}
