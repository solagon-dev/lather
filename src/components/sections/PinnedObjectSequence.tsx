"use client";

import { motion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import ModelScene from "@/components/three/ModelScene";
import CinematicHeading from "@/components/ui/CinematicHeading";

/**
 * The robe, shown whole and then pushed into, while the copy changes over it.
 *
 * Three decisions carry this section, and they depend on each other:
 *
 * The ground is light and the object is light, so the type can be dark and sit
 * *in front* of it. That single relationship is what lets display type cross a
 * garment and stay perfectly readable with no scrim, no veil and no blur. The
 * inverse — dark ground, white object, light type — cannot be made to work by
 * treatment, only compensated for, and every compensation costs clarity.
 *
 * The object is never touched by CSS. No filter, no mask, no overlay: what the
 * renderer produces is what you see. Softness comes from fog inside the scene,
 * which fades the object by *depth* into the same colour as the page. A
 * screen-space mask can only imitate that, and imitates it badly, because it
 * cuts in the same place no matter where the object actually is.
 *
 * It is cropped to the upper body from the first frame and pushes in from
 * there. Showing the garment whole first was the original intent, but this
 * robe cannot be shown whole: it has no body in it, so the neck opening ends
 * in a flat cut plane and the hem in another, and both give away the mesh the
 * moment they are in shot. A crop that sits between them is not a compromise
 * here — it is the only framing in which the thing reads as cloth.
 *
 * Every beat is in the DOM at all times, so the sequence stays readable in
 * document order for search engines and assistive tech at any scroll position.
 */

export interface MarkBeat {
  /** Lines for the display heading. Wrap connectives in <Soft>. */
  lines: ReactNode[];
  /** A short supporting line, set small beneath. */
  note?: ReactNode;
  /** Where this beat sits, and therefore how it meets the object. */
  place?: "under" | "over" | "left" | "right" | "centre";
  /** Sits directly beneath the statement — the close of the passage. */
  tail?: ReactNode;
}

const PLACE: Record<NonNullable<MarkBeat["place"]>, string> = {
  centre: "inset-x-0 top-1/2 -translate-y-1/2 items-center",
  under: "inset-x-0 bottom-[15svh] items-center",
  over: "inset-x-0 top-[15svh] items-center",
  left: "left-[5vw] top-[24svh] items-start max-w-[46vw]",
  right: "right-[5vw] bottom-[22svh] items-end max-w-[46vw]",
};

export default function PinnedObjectSequence({
  beats,
  modelSrc,
  className = "",
}: {
  beats: MarkBeat[];
  /** Path to the .glb. Undefined keeps the photographic fallback. */
  modelSrc?: string;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  // The object runs on its own clock, which starts *before* the section does.
  //
  // The copy is timed to the pinned stretch, because that is when it can be
  // read. The object should not be: if it waits for the pin, the section
  // begins with a screen of nothing and the garment arrives after you have
  // already got there. Starting it while the section is still climbing into
  // view means the garment is rising from the bottom of the frame at the same
  // moment the hero's tile is drifting off the top — the two are on screen
  // together, and one hands over to the other instead of cutting.
  const { scrollYProgress: objectProgress } = useScroll({
    target: ref,
    offset: ["start 82%", "end end"],
  });
  // 0 where the object's clock starts, 1 the moment the panel pins. Anything
  // that only makes sense once this box *is* the frame hangs off this.
  const { scrollYProgress: settling } = useScroll({
    target: ref,
    offset: ["start 82%", "start start"],
  });
  // Held at nothing until the panel is nearly home. A vignette easing in over
  // the whole approach is still a visible edge for most of it, just a fainter
  // one; arriving in the last stretch puts the edge near the top of the screen
  // where there is no room left for it to read as a band.
  const vignette = useTransform(settling, (p) => ramp(p, 0.72, 1));
  // The object follows a spring-smoothed copy of the scroll rather than the
  // scroll itself.
  //
  // Raw scroll is a step function — a wheel notch or a trackpad flick arrives
  // as a jump, and anything bound straight to it snaps by exactly that much.
  // Letting the object chase a spring means it keeps moving through the gaps
  // between events and eases into every change of pace, which is most of what
  // separates a scroll-driven object that feels filmed from one that feels
  // scrubbed. The copy stays on raw progress: its beats are timed to abut
  // exactly, and a lag there would let two statements overlap.
  const glide = useSpring(objectProgress, { stiffness: 58, damping: 26, mass: 1.1 });
  const markProgress = useMotionNumber(glide);

  // The canvas is never translated. The garment rises *inside* the scene.
  //
  // This section used to raise the garment by moving its canvas down the
  // panel, and a canvas moved down its own box is clipped at its own top
  // border — drawing a hard horizontal line straight across whatever it is
  // rendering. That line was being read as the model's cut-off shoulder for a
  // long time. It was never the model. Do not put a translate back on it.
  //
  // The garment comes up from below the bottom of the frame and keeps coming
  // for the whole section, growing and turning as it goes. One movement, one
  // rate, no arrival that finishes early and then waits.
  //
  // That entrance is only possible because of `topFade`. The topmost point of
  // this mesh is the flat plane where its neck opening ends — there is no body
  // in it — and anything rising from below frame carries that plane up the
  // whole screen ahead of itself. Framing cannot solve it: hold the plane
  // above the frame and the object can never rise into shot at all; rush it
  // past and the movement reads as a snap. `topFade` dissolves the cloth into
  // the ground colour before the geometry reaches its own edge, so the plane
  // is not there to be seen at any position, and the framing is free.
  //
  // `rise` is the climb from below; `drift` carries on after it so nothing
  // ever comes to rest. Climbing walks the frame down the garment while
  // growing crops it back up, and the growth is set to win by a little — which
  // is what lets the object travel this far and still finish on the collar.
  //
  // The numbers are measured from the render, not derived. `fill` scales the
  // model by its *largest* dimension, and this robe's sleeves are outstretched,
  // so width governs and the garment is far shorter than its fill implies.
  const driftOpacity = useTransform(
    glide,
    (p) => ramp(p, 0, 0.05) * (1 - ramp(p, 0.84, 0.95))
  );

  return (
    <section
      ref={ref}
      className={`relative bg-porcelain ${className}`}
      style={{ height: `${beats.length * 150}svh` }}
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* ── the room ─────────────────────────────────────────────
            Atmosphere sits *behind* the garment, never over it. Haze in front
            of the subject is just a filter degrading it — the same mistake as
            blurring it. Behind, the identical layers read as depth, and the
            object stays as crisp as the renderer drew it. */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <div className="ambient-bloom absolute left-1/2 top-1/2 h-[105svh] w-[105svh] -translate-x-1/2 -translate-y-1/2" />
          <div className="haze haze-a absolute inset-x-[-20%] bottom-[-8%] h-[68svh]" />
          <div className="haze haze-b absolute inset-x-[-24%] top-[-10%] h-[54svh]" />
          <div className="haze haze-c absolute inset-x-[-16%] top-[26%] h-[48svh]" />
        </div>

        {/* ── the garment: untouched by CSS ────────────────────── */}
        <motion.div
          style={{ opacity: driftOpacity }}
          className="pointer-events-none absolute inset-0 z-10"
        >
          <ModelScene
            src={modelSrc}
            progress={markProgress}
            turn={Math.PI * 0.48}
            yaw={-0.34}
            tilt={0.02}
            rise={7.4}
            riseIn={0.62}
            drift={1.35}
            headroom={0.18}
            topFade={0.14}
            fillFrom={2.15}
            fillTo={3.85}
            fogColor="#F4EFE7"
            exposure={1.0}
            decal="/brand/lather-mark.svg"
            className="h-full w-full"
            fallback={
              <div className="relative h-full w-full">
                <Image
                  src="/media/gallery/treatment-waterfall.webp"
                  alt=""
                  fill
                  sizes="100vw"
                  className="object-cover opacity-40"
                />
              </div>
            }
          />
        </motion.div>

        {/* Corners only — the centre stays clear so the subject is never
            veiled by the thing meant to be framing it.

            It fades in as the panel pins, because a vignette darkens the edges
            of its own box and this box only *is* the frame once it is pinned.
            Before that, its top edge sits somewhere in the middle of the
            screen and the darkening stops dead along it — a hard band edge
            straight across the viewport, at precisely the moment the hero is
            supposed to be handing over without a seam. */}
        <motion.div
          style={{ opacity: vignette }}
          className="pointer-events-none absolute inset-0 z-[15] frame-vignette"
        />

        {/* ── the copy ─────────────────────────────────────────── */}
        {beats.map((beat, i) => (
          <Beat key={i} beat={beat} index={i} total={beats.length} progress={scrollYProgress} />
        ))}

        {/* No grain here — it runs across the whole page from the layout, so
            this section's ground matches the one it hands over from. */}
      </div>
    </section>
  );
}

/**
 * One beat's slice of the scroll.
 *
 * Windows are laid out so a beat finishes fading out exactly where the next
 * starts fading in — overlapping them leaves two statements legible at once,
 * which reads as a double exposure. Ranges stay inside [0,1] and strictly
 * increasing: a range dipping below zero hands a negative keyframe offset to
 * the Web Animations API, which throws during ref attach and unmounts the tree.
 */
function Beat({
  beat,
  index,
  total,
  progress,
}: {
  beat: MarkBeat;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const slice = 1 / total;
  const start = index * slice;
  const isFirst = index === 0;
  const isLast = index === total - 1;

  // A generous arrival window: a short one reads as the words switching on.
  //
  // The first beat has no room *before* the section to arrive in, so it takes
  // its window from the front of its own slice instead. That is deliberate,
  // and it is what puts the garment on screen first: the object has been
  // climbing since before the section pinned, so by the time these words start
  // to rise there is already something for them to rise over. It also means
  // the opening statement gets the same reveal every other beat gets — it used
  // to snap on inside a thousandth of the section, which is to say not at all.
  const inA = isFirst ? 0.02 : start - slice * 0.34;
  const inB = isFirst ? slice * 0.3 : start - slice * 0.04;
  // A beat must be gone by the moment the next one starts arriving, or two
  // statements are legible at once and the section reads as a double exposure.
  // With the arrival window opening at `start - 0.34·slice`, the departure has
  // to close at `start + 0.66·slice` — the two then abut exactly.
  const outA = start + slice * 0.42;
  const outB = Math.min(1, start + slice * 0.66);

  const opacity = useTransform(progress, [inA, inB, outA, outB], [0, 1, 1, isLast ? 1 : 0]);
  // 0 → 1 across this beat's own arrival, handed to the heading so its lines
  // rise out of their masks in step with the scroll rather than appearing.
  const reveal = useTransform(progress, [inA, inA + Math.max(0.0001, inB - inA) * 3.2], [0, 1]);

  const place = beat.place ?? "under";
  const align = place === "left" ? "left" : place === "right" ? "left" : "center";

  return (
    <motion.div
      style={{ opacity }}
      className={`pointer-events-none absolute isolate flex flex-col px-5 sm:px-8 ${PLACE[place]} z-20 ${
        ""
      }`}
    >
      <CinematicHeading
        reveal={reveal}
        lines={beat.lines}
        width={place === "left" || place === "right" ? "contained" : "full"}
        align={align}
        tone="ink"
      />
      {beat.tail && <div className="mt-12 flex flex-col items-center">{beat.tail}</div>}
      {beat.note && (
        <p
          className={`mt-6 max-w-[44ch] font-body text-[0.95rem] leading-relaxed text-umber ${
            align === "center" ? "text-center" : "text-left"
          }`}
        >
          {beat.note}
        </p>
      )}
    </motion.div>
  );
}

/**
 * Mirrors a MotionValue into React state.
 *
 * The 3D canvas needs a plain number it can read inside its own render loop;
 * MotionValues deliberately bypass React so they can update without a
 * re-render. This is the one place the two systems have to meet.
 */
/** 0 before `a`, 1 after `b`, linear between — and flat at both ends. */
function ramp(v: number, a: number, b: number) {
  return Math.min(1, Math.max(0, (v - a) / (b - a)));
}

function useMotionNumber(value: MotionValue<number>) {
  const [n, setN] = useState(0);
  useEffect(() => value.on("change", setN), [value]);
  return n;
}
