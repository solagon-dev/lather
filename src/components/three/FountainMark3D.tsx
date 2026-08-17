"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The Lather fountain, extruded into a real 3D object and driven by scroll.
 *
 * The geometry is built from the same SVG the flat logo uses, so the 3D mark
 * and the 2D mark can never drift apart — there is no separately-authored
 * model to keep in sync. SVGLoader turns the fountain's paths into shapes and
 * ExtrudeGeometry gives them depth; the result is lit like a small brass object
 * on a porcelain sweep.
 *
 * Everything here is deliberately conditional:
 *
 * - three.js is imported dynamically, so ~150KB of renderer never enters the
 *   bundle for a visitor who will not see it.
 * - It refuses to run without WebGL, on prefers-reduced-motion, and under
 *   Data-Saver — each of those falls back to the flat SVG the rest of the site
 *   already uses, which is why `fallback` is required rather than optional.
 * - The render loop only runs while the canvas is on screen (IntersectionObserver)
 *   and while the tab is visible, so it costs nothing once scrolled past.
 *
 * `progress` is a 0–1 scroll position supplied by the parent. Keeping the
 * scroll maths outside this component means the same object can be pinned
 * across a long sequence or dropped into a quote block without knowing which.
 */

export interface FountainMark3DProps {
  /** 0–1. Drives rise and rotation. */
  progress?: number;
  /** How far the mark travels vertically across the full progress range, in world units. */
  rise?: number;
  /**
   * Total yaw swept across the progress range, in radians, centred on
   * front-on. Kept well under a half-turn on purpose — a full spin swings the
   * fountain edge-on, where an extruded flat mark all but disappears.
   */
  yaw?: number;
  /**
   * Radians of X rotation swept across the range. Set this well past a half
   * turn to make the mark tip from face-on to edge-on and back — the motion
   * that makes an extruded flat shape read as genuinely solid.
   */
  pitch?: number;
  /** Rendered whenever 3D is unavailable or unwanted. Required, not optional. */
  fallback: React.ReactNode;
  className?: string;
  /** Brass. Matches the mark in the logo artwork. */
  color?: string;
  /**
   * Share of the frame the mark's largest dimension fills, 0–1. The default
   * leaves generous air, which is right when the mark floats in a section of
   * its own; push it near 1 when the surrounding layout has already reserved
   * an exact hole for it and the empty margin would read as the mark being
   * too small.
   */
  fill?: number;
}

export default function FountainMark3D({
  progress = 0,
  rise = 1.1,
  yaw = 1.0,
  pitch = 0,
  fallback,
  className = "",
  color = "#AC8D6B",
  fill = 0.63,
}: FountainMark3DProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  // Kept in a ref so scroll updates never re-render React — the loop reads it.
  const progressRef = useRef(progress);
  progressRef.current = progress;

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // @ts-expect-error saveData is non-standard but widely supported on mobile
    if (navigator.connection?.saveData === true) return;
    try {
      const probe = document.createElement("canvas");
      if (!probe.getContext("webgl2") && !probe.getContext("webgl")) return;
    } catch {
      return;
    }

    let disposed = false;
    let cleanup: (() => void) | undefined;

    (async () => {
      const THREE = await import("three");
      const { SVGLoader } = await import("three/examples/jsm/loaders/SVGLoader.js");
      if (disposed) return;

      const svgText = await fetch("/brand/lather-mark.svg").then((r) => r.text());
      if (disposed) return;

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(host.clientWidth, host.clientHeight);
      renderer.setClearColor(0x000000, 0);
      host.appendChild(renderer.domElement);
      renderer.domElement.setAttribute("role", "presentation");

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(32, host.clientWidth / host.clientHeight, 0.1, 100);
      camera.position.set(0, 0, 7.2);

      // ── geometry from the master SVG ──────────────────────────
      const paths = new SVGLoader().parse(svgText).paths;
      const group = new THREE.Group();
      const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color(color),
        metalness: 0.62,
        roughness: 0.26,
      });

      for (const path of paths) {
        for (const shape of SVGLoader.createShapes(path)) {
          const geo = new THREE.ExtrudeGeometry(shape, {
            depth: 26,
            bevelEnabled: true,
            bevelThickness: 5,
            bevelSize: 3.5,
            bevelSegments: 4,
            curveSegments: 14,
          });
          geo.computeVertexNormals();
          group.add(new THREE.Mesh(geo, material));
        }
      }

      // SVG's Y axis points down and its origin is the top-left of the
      // viewBox; flip it and re-centre on the geometry's own bounds so the
      // object spins about itself rather than about the artboard corner.
      group.scale.set(1, -1, 1);
      const box = new THREE.Box3().setFromObject(group);
      const size = box.getSize(new THREE.Vector3());
      const centre = box.getCenter(new THREE.Vector3());
      group.position.sub(centre);

      const pivot = new THREE.Group();
      pivot.add(group);
      // Visible height at the origin for this camera, so `fill` means the
      // same thing regardless of the lens.
      const frame = 2 * camera.position.z * Math.tan((32 * Math.PI) / 360);
      const fit = (frame * fill) / Math.max(size.x, size.y);
      pivot.scale.setScalar(fit);
      scene.add(pivot);

      // ── light it like a small metal object on porcelain ───────
      scene.add(new THREE.HemisphereLight(0xfff6e8, 0x6b5a44, 1.5));
      const key = new THREE.DirectionalLight(0xfff3e2, 2.9);
      key.position.set(3, 5, 6);
      scene.add(key);
      const rim = new THREE.DirectionalLight(0xc9ae7e, 1.5);
      rim.position.set(-5, 2, -4);
      scene.add(rim);
      const fillLight = new THREE.DirectionalLight(0xffffff, 0.55);
      fillLight.position.set(-2, -3, 4);
      scene.add(fillLight);

      // ── loop, only while visible ──────────────────────────────
      let raf = 0;
      let onScreen = false;
      const render = () => {
        const t = Math.min(1, Math.max(0, progressRef.current));
        // centred on 0 so the mark faces the reader at mid-scroll and turns
        // symmetrically either side of that
        pivot.rotation.y = (t - 0.5) * yaw;
        // With a pitch set, X is the primary axis and sweeps the full range;
        // without one, a touch of fixed tilt keeps the mark from reading as a
        // flat spinning decal.
        pivot.rotation.x = pitch
          ? (t - 0.5) * pitch
          : -0.16 + Math.sin(t * Math.PI) * 0.12;
        pivot.position.y = (0.5 - t) * rise;
        renderer.render(scene, camera);
        raf = requestAnimationFrame(render);
      };
      const start = () => {
        if (!raf && onScreen && !document.hidden) raf = requestAnimationFrame(render);
      };
      const stop = () => {
        if (raf) cancelAnimationFrame(raf);
        raf = 0;
      };

      const io = new IntersectionObserver(
        ([e]) => {
          onScreen = e.isIntersecting;
          onScreen ? start() : stop();
        },
        { rootMargin: "10% 0px" }
      );
      io.observe(host);

      const onVisibility = () => (document.hidden ? stop() : start());
      document.addEventListener("visibilitychange", onVisibility);

      const onResize = () => {
        if (!host.clientWidth || !host.clientHeight) return;
        camera.aspect = host.clientWidth / host.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(host.clientWidth, host.clientHeight);
      };
      const ro = new ResizeObserver(onResize);
      ro.observe(host);

      setActive(true);

      cleanup = () => {
        stop();
        io.disconnect();
        ro.disconnect();
        document.removeEventListener("visibilitychange", onVisibility);
        scene.traverse((o) => {
          const m = o as { geometry?: { dispose(): void } };
          m.geometry?.dispose();
        });
        material.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
    })().catch(() => {
      // Any failure — no WebGL context, a blocked fetch, a parse error — simply
      // leaves the flat fallback in place. A missing flourish is not an outage.
    });

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, [color, rise, yaw, pitch, fill]);

  return (
    <div ref={hostRef} className={`relative ${className}`} aria-hidden>
      {!active && <div className="absolute inset-0 flex items-center justify-center">{fallback}</div>}
    </div>
  );
}
