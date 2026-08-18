"use client";

import { useEffect, useRef, useState } from "react";
import type * as ThreeNS from "three";
import { MARK_PATHS, WORDMARK_PATHS, LOGO_VIEWBOX } from "@/lib/logo-paths";

/**
 * The house mark struck into a brass coin, turning on scroll.
 *
 * The coin is built rather than modelled: a lathed disc gives it a rounded rim
 * and a slightly domed face, and the mark is the real logo artwork extruded and
 * sunk proud of that face — so the emblem on the coin is the same geometry as
 * the mark everywhere else on the site and cannot drift from it.
 *
 * The rim matters more than it sounds. A flat cylinder reads as a token from a
 * board game; a struck coin has a raised, rounded edge that catches a highlight
 * all the way around, and that highlight is most of what says "metal".
 *
 * Brass is metalness 1, which means the surface is *entirely* reflection — with
 * no environment to reflect it renders black. The generated room environment is
 * therefore not optional lighting polish, it is the only reason the coin has a
 * colour at all.
 *
 * Everything is conditional, as with the rest of the 3D: dynamic import, no
 * WebGL / reduced-motion / Data-Saver all fall back to flat artwork, and the
 * render loop only runs while the canvas is on screen and the tab is visible.
 */

export interface CoinSceneProps {
  /** 0–1 scroll position. Drives the turn. */
  progress?: number;
  /** Radians of Y rotation swept across the range. */
  turn?: number;
  /** Required: shown while loading, and permanently if 3D is unavailable. */
  fallback: React.ReactNode;
  className?: string;
}

export default function CoinScene({
  progress = 0,
  turn = Math.PI * 3.6,
  fallback,
  className = "",
}: CoinSceneProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
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
      const { RoomEnvironment } = await import("three/examples/jsm/environments/RoomEnvironment.js");
      if (disposed) return;

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(host.clientWidth, host.clientHeight);
      renderer.setClearColor(0x000000, 0);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.15;

      const scene = new THREE.Scene();
      const pmrem = new THREE.PMREMGenerator(renderer);
      const envRT = pmrem.fromScene(new RoomEnvironment(), 0.03);
      scene.environment = envRT.texture;

      const camera = new THREE.PerspectiveCamera(30, host.clientWidth / host.clientHeight, 0.1, 100);
      camera.position.set(0, 0, 8);

      const brass = new THREE.MeshStandardMaterial({
        color: new THREE.Color("#B08E5E"),
        metalness: 1,
        roughness: 0.28,
        envMapIntensity: 1.5,
        side: THREE.DoubleSide,
      });

      const coin = new THREE.Group();

      // ── the blank ─────────────────────────────────────────────
      // A lathed profile rather than a cylinder: the rim rolls over instead of
      // meeting the face at a hard corner, which is what catches the ring of
      // highlight that reads as struck metal.
      const R = 2.0;
      const HALF = 0.19;
      const profile: ThreeNS.Vector2[] = [];
      profile.push(new THREE.Vector2(0, HALF));
      profile.push(new THREE.Vector2(R * 0.82, HALF));
      // Rounded shoulder into the rim.
      for (let i = 0; i <= 8; i++) {
        const a = (i / 8) * Math.PI * 0.5;
        profile.push(new THREE.Vector2(R * 0.82 + Math.sin(a) * R * 0.18, HALF * Math.cos(a)));
      }
      for (let i = 8; i >= 0; i--) {
        const a = (i / 8) * Math.PI * 0.5;
        profile.push(new THREE.Vector2(R * 0.82 + Math.sin(a) * R * 0.18, -HALF * Math.cos(a)));
      }
      profile.push(new THREE.Vector2(R * 0.82, -HALF));
      profile.push(new THREE.Vector2(0, -HALF));
      const blank = new THREE.Mesh(new THREE.LatheGeometry(profile, 128), brass);
      // Lathes spin about Y; stand the disc up to face the camera.
      blank.rotation.x = Math.PI * 0.5;
      coin.add(blank);

      // A slightly proud ring just inside the edge, as on a milled coin.
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(R * 0.79, 0.018, 12, 160),
        brass
      );
      ring.position.z = HALF - 0.005;
      coin.add(ring);
      const ringBack = ring.clone();
      ringBack.position.z = -HALF + 0.005;
      coin.add(ringBack);

      // ── the two faces ────────────────────────────────────────
      // Obverse carries the fountain, reverse the wordmark — struck from the
      // same artwork the rest of the site uses, so the coin can never drift
      // from the identity it is standing in for.
      const strike = (paths: string[], widthFrac: number, heightFrac: number) => {
        const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${LOGO_VIEWBOX}">${paths
          .map((d) => `<path d="${d}"/>`)
          .join("")}</svg>`;
        const art = new THREE.Group();
        for (const path of new SVGLoader().parse(svg).paths) {
          for (const shape of SVGLoader.createShapes(path)) {
            const geo = new THREE.ExtrudeGeometry(shape, {
              depth: 14,
              bevelEnabled: true,
              bevelThickness: 4,
              bevelSize: 3,
              bevelSegments: 3,
              curveSegments: 12,
            });
            geo.computeVertexNormals();
            art.add(new THREE.Mesh(geo, brass));
          }
        }
        // SVG's Y points down and its origin is the artboard corner: flip and
        // re-centre so the artwork sits in the middle of the coin.
        art.scale.set(1, -1, 1);
        const box = new THREE.Box3().setFromObject(art);
        const size = box.getSize(new THREE.Vector3());
        art.position.sub(box.getCenter(new THREE.Vector3()));

        const face = new THREE.Group();
        face.add(art);
        // Fitted against both axes, because the mark is tall and the wordmark
        // is very wide — one shared rule would overflow the rim on one of them.
        face.scale.setScalar(
          Math.min((R * widthFrac) / size.x, (R * heightFrac) / size.y)
        );
        return face;
      };

      // Proud of the face, not sunk into it: the blank is double-sided, so
      // anything behind z = HALF is inside the coin and hidden by its own
      // front surface.
      const obverse = strike(MARK_PATHS, 0.62, 0.62);
      obverse.position.z = HALF + 0.012;
      coin.add(obverse);

      const reverse = strike(WORDMARK_PATHS, 1.34, 0.34);
      reverse.position.z = -HALF - 0.012;
      reverse.rotation.y = Math.PI;
      coin.add(reverse);

      scene.add(coin);

      // Fill the frame: visible height at the origin for this lens.
      const frame = 2 * camera.position.z * Math.tan((30 * Math.PI) / 360);
      coin.scale.setScalar((frame * 0.92) / (R * 2));

      scene.add(new THREE.HemisphereLight(0xfff6ea, 0x2a221a, 0.7));
      const key = new THREE.DirectionalLight(0xfff2df, 2.4);
      key.position.set(3, 4, 6);
      scene.add(key);
      const kick = new THREE.DirectionalLight(0xc9ae7e, 1.6);
      kick.position.set(-4, -2, 3);
      scene.add(kick);

      host.appendChild(renderer.domElement);
      renderer.domElement.setAttribute("role", "presentation");

      let raf = 0;
      let onScreen = false;
      const render = () => {
        const t = Math.min(1, Math.max(0, progressRef.current));
        coin.rotation.y = -turn * 0.5 + t * turn;
        // A little off-axis wobble, so it reads as a struck object being turned
        // rather than a texture on a spinning plane.
        coin.rotation.x = Math.sin(t * Math.PI * 2) * 0.12;
        coin.rotation.z = -0.06 + t * 0.12;
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
          const m = o as ThreeNS.Mesh;
          m.geometry?.dispose();
        });
        brass.dispose();
        envRT.texture.dispose();
        pmrem.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
    })().catch(() => {
      // Any failure leaves the flat fallback in place.
    });

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, [turn]);

  return (
    <div ref={hostRef} className={`relative ${className}`} aria-hidden>
      {!active && <div className="absolute inset-0">{fallback}</div>}
    </div>
  );
}
