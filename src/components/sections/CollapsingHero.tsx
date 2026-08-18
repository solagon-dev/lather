"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Logo from "@/components/ui/Logo";
import { NAV_WORDMARK_ATTR, handoffAt } from "@/lib/hero-handoff";

/**
 * The hero plays the preloader's move in reverse.
 *
 * It opens full-bleed with the wordmark centred, and scroll draws the media
 * back down into a small centred tile — the same tile the intro opened out of
 * — revealing porcelain around it. Preloader expands, scroll contracts: one
 * continuous zoom axis rather than two unrelated animations.
 *
 * Mechanically it is a tall spacer with a sticky viewport inside it. Nothing is
 * pinned by intercepting the wheel, so trackpads, keyboards, the scrollbar and
 * assistive tech all behave normally, and the page can be scrolled past at any
 * speed without the animation swallowing input.
 *
 * The wordmark scales with the frame rather than sitting at a fixed size,
 * which is what sells the two as one object.
 *
 * Reduced motion gets a plain full-bleed hero with no scrubbing at all — the
 * whole point of this section is a large sustained scale change, which is
 * exactly what that preference is asking us not to do.
 */

/**
 * The section's geometry, in viewport heights, and the two numbers derived
 * from it. These are load-bearing for each other, so they are declared
 * together rather than inlined:
 *
 * A sticky panel inside a taller section is pinned for exactly the difference
 * between the two, which is what `UNPIN` expresses as a fraction of the
 * section's own scroll. The wordmark handoff has to *finish* inside that
 * pinned stretch (see hero-handoff.ts), so `SECTION - PANEL` must stay
 * comfortably above `HERO_HANDOFF_VH`. Shortening the section is what breaks
 * that first.
 */
const SECTION = 190;
const PANEL = 100;
/** Fraction of the section's scroll at which the panel stops being pinned. */
const UNPIN = (SECTION - PANEL) / SECTION;
/** How far the collapsed tile is inset from the panel, per side. */
const INSET = 34;

/** 0 before `a`, 1 after `b`, linear between — and flat at both ends. */
const ramp = (v: number, a: number, b: number) => Math.min(1, Math.max(0, (v - a) / (b - a)));

interface CollapsingHeroProps {
  src: string;
  /** The clip itself. `src` is only its poster, for first paint. */
  video?: string;
  alt?: string;
  /** Sits under the wordmark inside the frame. */
  tagline?: React.ReactNode;
  children?: React.ReactNode;
}

export default function CollapsingHero({ src, video, alt = "", tagline, children }: CollapsingHeroProps) {
  const ref = useRef<HTMLElement>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const set = () => setReduced(mq.matches);
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const { scrollY } = useScroll();

  // Every value below is a *function* of progress, never a keyframe list.
  //
  // Handed a `[stops] → [values]` pair, framer-motion may hoist the whole thing
  // onto the Web Animations API as a scroll-linked timeline, and a range that
  // covers less than the full [0,1] does not hold at its endpoint there — it
  // drifts back, so a fade-out silently becomes a fade-out-and-in. The tagline
  // and buttons were doing exactly that: gone by the time the frame had
  // collapsed, then quietly back at full strength as it left. Clamped
  // functions run in JS on every change and cannot be reinterpreted.
  //
  // The collapse finishes exactly where the panel unpins. All the scrubbing
  // belongs in the pinned stretch: a frame still shrinking while it scrolls
  // away is two movements fighting, and the eye reads neither.
  const collapse = useTransform(scrollYProgress, (p) => ramp(p, 0, UNPIN));
  const sideInset = useTransform(collapse, (t) => `${INSET * t}%`);
  const radius = useTransform(collapse, (t) => `${4 * t}px`);
  // Faster than the frame itself: supporting copy at full size inside a
  // shrinking tile reads as cramped long before the collapse finishes. Not
  // *much* faster, though — these are the page's first two calls to action,
  // and they want to be readable for a good half-viewport of scroll. Gone by
  // the time the frame is down to half its travel is the balance.
  const chromeOpacity = useTransform(scrollYProgress, (p) => 1 - ramp(p, 0, UNPIN * 0.6));

  // ── the exit ─────────────────────────────────────────────────────────
  // Past the unpin the panel races upward with the page, and a tile sitting
  // centred inside it clears the top of frame a full `INSET` of viewport
  // before the section ends. That left a blank screen between the hero
  // leaving and the section below arriving — a third of a viewport of
  // scrolling with nothing on it at all.
  //
  // So the tile lags. Its insets keep moving after the collapse, sliding it
  // down inside the panel at exactly the rate that carries its bottom edge
  // to the top of the frame as the section ends. Height never changes — the
  // two insets move by equal and opposite amounts — so this is a drift, not
  // a second collapse, and the frame below picks up the moment it clears.
  const leave = useTransform(scrollYProgress, (p) => ramp(p, UNPIN, 1));
  const exitTop = useTransform([collapse, leave], ([t, e]: number[]) => `${INSET * (t + e)}%`);
  const exitBottom = useTransform([collapse, leave], ([t, e]: number[]) => `${INSET * (t - e)}%`);

  // The wordmark's flight is measured, not tuned. Landing scale and offset come
  // from the navbar's own wordmark, so the hero mark comes to rest exactly on
  // top of it — which is what makes the bar look like it caught the name rather
  // than like a second copy faded in. Held in a ref so a resize re-measures
  // without rebuilding the transforms.
  const letters = useRef<HTMLSpanElement>(null);
  const flight = useRef({ scale: 0.12, dx: 0, dy: -320, at: 800 });

  useEffect(() => {
    const measure = () => {
      const from = letters.current;
      const to = document.querySelector<HTMLElement>(`[${NAV_WORDMARK_ATTR}]`);
      flight.current.at = handoffAt();
      if (!from || !to || !from.offsetWidth) return;

      // `offsetWidth`/`offsetTop` are layout values, so they describe the mark
      // untransformed however far through the flight we currently are — which
      // getBoundingClientRect could not do. The offset parent is the panel
      // filling the sticky viewport, so these are viewport coordinates.
      const target = to.getBoundingClientRect();
      flight.current.scale = target.width / from.offsetWidth;
      flight.current.dx =
        target.left + target.width / 2 - (from.offsetLeft + from.offsetWidth / 2);
      flight.current.dy =
        target.top + target.height / 2 - (from.offsetTop + from.offsetHeight / 2);
    };

    measure();
    // Fonts settle after first paint and change the mark's box.
    const t = setTimeout(measure, 400);
    window.addEventListener("resize", measure);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", measure);
    };
  }, []);

  // Ease into the bar rather than arriving at constant speed — the deceleration
  // is most of what reads as "coming to rest" instead of "stopping".
  const glide = (v: number) => {
    const t = Math.min(1, Math.max(0, v / flight.current.at));
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  };
  const markScale = useTransform(scrollY, (v) => 1 + (flight.current.scale - 1) * glide(v));
  const markX = useTransform(scrollY, (v) => flight.current.dx * glide(v));
  const markY = useTransform(scrollY, (v) => flight.current.dy * glide(v));
  // Holds at full opacity until the bar has taken over, then fades across the
  // next 90px. The two marks are pixel-identical by then, so overlapping them
  // is invisible — whereas cutting early leaves a window with no wordmark at
  // all, which reads as a flicker precisely where the eye is looking.
  const markOpacity = useTransform(scrollY, (v) =>
    Math.min(1, Math.max(0, 1 - (v - flight.current.at) / 90))
  );

  if (reduced) {
    return (
      <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-noir">
        <Image src={src} alt={alt} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-noir/45" />
        <div className="relative z-10 flex flex-col items-center px-6 text-center text-ivory">
          <Logo variant="wordmark" className="h-20 w-auto max-w-[80vw] sm:h-28" title="Lather Spa & Wellness" />
          {tagline && <div className="mt-8 max-w-xl">{tagline}</div>}
          {children && <div className="mt-10">{children}</div>}
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} className="relative bg-porcelain" style={{ height: `${SECTION}svh` }}>
      {/* The section below opens with a warm ambient bloom, and starting that
          glow at its own top edge put a visible step across the full width —
          both grounds are the same near-black, so the seam was the *light*,
          not the colour. This ramps the hero up to the same level before the
          boundary, so the two rooms share one atmosphere. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[85svh] hero-tail" />

      <div className="sticky top-0 overflow-hidden" style={{ height: `${PANEL}svh` }}>
        <motion.div
          className="hero-tile absolute overflow-hidden bg-noir"
          style={{ top: exitTop, bottom: exitBottom, left: sideInset, right: sideInset, borderRadius: radius }}
        >
          {/* The poster carries first paint and the clip takes over the moment
              it can play; they are the same frame, so the swap is invisible. */}
          <Image src={src} alt={alt} fill priority sizes="100vw" className="object-cover" />
          {video && <HeroVideo src={video} />}
          <div className="absolute inset-0 bg-noir/40" />
        </motion.div>

        {/* The copy sits in its own full-viewport layer rather than inside the
            tile. If it rode along with the inset, the wordmark's offset parent
            would shrink underneath it and the measured flight would be wrong
            at every scroll position except the very top. */}
        {/* `data-over-image` tells scripts/audit.mjs not to judge the contrast
            here from computed colours: what is behind this copy is a scrimmed
            film frame, not the porcelain the DOM would report. */}
        <div data-over-image className="pointer-events-none absolute inset-0 z-10">
          <div className="pointer-events-auto flex h-full flex-col items-center justify-center px-6 text-center text-ivory">
            {/* Only the letters fly. Scaling the whole stack would put the
                block's centre — somewhere down in the tagline — on the nav
                slot instead of the name itself, so the mark could never land
                where the bar actually holds it. `letters` rather than the full
                wordmark because that is the variant the bar shows: same
                artwork, same box, so matching width matches exactly. */}
            <motion.span
              ref={letters}
              style={{ scale: markScale, x: markX, y: markY, opacity: markOpacity }}
              className="block"
            >
              <Logo
                variant="letters"
                className="h-12 w-auto max-w-[80vw] sm:h-16"
                title="Lather Spa & Wellness"
              />
            </motion.span>

            {tagline && (
              <motion.div style={{ opacity: chromeOpacity }} className="mt-8 max-w-xl">
                {tagline}
              </motion.div>
            )}
            {children && (
              <motion.div style={{ opacity: chromeOpacity }} className="mt-10">
                {children}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * The clip rides on top of the still rather than replacing it.
 *
 * The source is 404×720 — corrected phone footage — so at 1440px wide it is a
 * 3.5× upscale and soft on its own. Layering it over the sharp 1920px still at
 * partial opacity keeps the frame's detail while the motion still reads, which
 * is the only way this footage belongs in a full-bleed hero at all. Replace
 * both the moment there is landscape video shot for the purpose.
 */
function HeroVideo({ src }: { src: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [play, setPlay] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // @ts-expect-error saveData is non-standard but widely supported on mobile
    if (navigator.connection?.saveData === true) return;
    setPlay(true);
  }, []);

  useEffect(() => {
    if (play) ref.current?.play().catch(() => {});
  }, [play]);

  if (!play) return null;
  return (
    <video
      ref={ref}
      className="absolute inset-0 h-full w-full object-cover"
      autoPlay
      muted
      loop
      playsInline
      aria-hidden
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
