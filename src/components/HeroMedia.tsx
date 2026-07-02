"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/**
 * Home hero background. Phones get the still poster (saves ~2MB and wins LCP);
 * the ambient video only mounts on desktop viewports that haven't asked for
 * reduced motion or data savings.
 */
export default function HeroMedia() {
  const [showVideo, setShowVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const wide = window.matchMedia("(min-width: 768px)");
    const stillMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    // @ts-expect-error saveData is non-standard but widely supported on mobile
    const saveData = navigator.connection?.saveData === true;
    if (wide.matches && !stillMotion.matches && !saveData) setShowVideo(true);
  }, []);

  // Videos mounted after hydration don't reliably honor the autoplay
  // attribute — kick playback explicitly once the element exists.
  useEffect(() => {
    if (showVideo) videoRef.current?.play().catch(() => {});
  }, [showVideo]);

  return (
    <>
      <Image
        src="/media/hero/hero-poster.webp"
        alt=""
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        className={`kenburns object-cover transition-opacity duration-700 ${showVideo ? "opacity-0" : "opacity-60"}`}
      />
      {showVideo && (
        <video
          ref={videoRef}
          className="kenburns absolute inset-0 h-full w-full object-cover opacity-60"
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
    </>
  );
}
