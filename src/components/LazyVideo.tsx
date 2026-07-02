"use client";

import { useEffect, useRef, useState } from "react";

interface LazyVideoProps {
  src: string;
  poster: string;
  className?: string;
  ariaLabel?: string;
}

/**
 * Ambient looping video that only starts downloading when it approaches the
 * viewport — the poster shows until then. Falls back to the poster entirely
 * under prefers-reduced-motion.
 */
export default function LazyVideo({ src, poster, className = "", ariaLabel }: LazyVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setActive(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!active || !el) return;
    // Assign src directly — appending a <source> child to an already-mounted
    // video does not re-run resource selection.
    el.src = src;
    el.play().catch(() => {});
  }, [active, src]);

  return (
    <video
      ref={ref}
      className={className}
      muted
      loop
      playsInline
      preload="none"
      poster={poster}
      aria-label={ariaLabel}
    />
  );
}
