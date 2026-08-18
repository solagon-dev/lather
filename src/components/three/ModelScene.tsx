"use client";

import { useEffect, useRef, useState } from "react";
// Type-only: erased at build, so three still arrives via the dynamic import
// below rather than being pulled into the page bundle.
import type * as ThreeNS from "three";

/**
 * Renders a real GLB model, turned by scroll.
 *
 * This exists because procedural geometry has a ceiling. A robe modelled from
 * lathes and cylinders can be the right *shape*, but it cannot have cloth
 * folds, drape or weight — those come from a scan or from a modeller, not from
 * primitives. So the object is an asset now, and this component is the rig
 * around it: framing, lighting, scroll, and the same degradation rules as the
 * rest of the 3D.
 *
 * The model is framed automatically from its own bounding box, so a downloaded
 * asset drops in without hand-tuning scale or position — whatever units it was
 * exported in, it arrives centred and filling the frame.
 *
 * If the file is missing the component simply stays on its fallback. That
 * matters here: the asset is licensed separately and may not be in the repo,
 * and a 404 on a decoration must never take a page down.
 */

export interface ModelSceneProps {
  /**
   * Path to a .glb under /public. Leave undefined until the asset is in the
   * repo — probing for a file that is not there logs a 404 on every page load.
   */
  src?: string;
  /** 0–1 scroll position. */
  progress?: number;
  /** Required: shown while loading, and permanently if 3D is unavailable. */
  fallback: React.ReactNode;
  className?: string;
  /** Radians of Y rotation swept across the range. */
  turn?: number;
  /**
   * World units to hold the *top* of the model above the top of frame.
   *
   * The model hangs from the top of its own bounding box rather than from its
   * centre, so this is the one number that decides how much of the object gets
   * cut off the top — and it means the same thing at every scale, which a
   * centre offset cannot. Positive carries the top edge out of shot; 0 sits it
   * exactly on the frame line.
   */
  headroom?: number;
  /**
   * Share of the frame the model's largest dimension fills, 0–1. Left short of
   * 1 so the scroll-driven rise cannot push the model out of frame.
   */
  fill?: number;
  /** SVG or image to lay on the garment's chest, e.g. the house mark. */
  decal?: string;
  /**
   * World units the model climbs into place from below at the start of the
   * range. A static mesh has no skeleton to re-pose, so presentation comes
   * from how it is carried into the frame rather than from the mesh itself.
   *
   * This happens in world space, inside the scene. Doing it by translating the
   * canvas — which is what this section used to do — clips the render at the
   * canvas's own edge and draws a hard line straight across the object.
   */
  rise?: number;
  /** Share of the range the rise takes. Small: it should arrive, not travel. */
  riseIn?: number;
  /**
   * Share of the model's own height, measured from its top, across which it
   * dissolves into `fogColor`.
   *
   * For a garment with no body in it this is what makes the top usable at all:
   * the cloth fades out before the geometry reaches the flat plane where its
   * neck opening ends, so that plane is never on screen wherever the object
   * happens to be. Needs `fogColor` — there is nothing to dissolve into
   * otherwise. 0 disables it.
   */
  topFade?: number;
  /**
   * World units the model keeps climbing across the whole range, on top of the
   * rise. The rise is an arrival; this is the drift underneath it that never
   * stops, so the object is never quite still while the section is on screen.
   *
   * It works against `fillFrom`/`fillTo`: climbing walks the frame *down* the
   * object while growing crops it back *up*. Let the growth win and the shot
   * tightens toward the top while the object still visibly moves.
   */
  drift?: number;
  /** Base yaw, in radians. Off-axis reads as a considered three-quarter view. */
  yaw?: number;
  /** Slight lean, in radians, so the garment is not standing to attention. */
  tilt?: number;
  /**
   * Tone-mapping exposure. White cloth against a dark ground clips to flat
   * white at the default, losing every fold and washing out any type crossing
   * it, so dark sections want this pulled well down.
   */
  exposure?: number;
  /**
   * The push-in. `fillFrom` is the share of the frame the object occupies at
   * the start of the range — set it well under 1 so the whole object is in
   * view with air around it — and `fillTo` is where it ends up, above 1 to
   * crop in on detail. Seeing the object entire before being taken into it is
   * what stops the close-up reading as an accident of framing.
   */
  fillFrom?: number;
  fillTo?: number;
  /**
   * Fog colour. Matched to the section's ground, the object dissolves into it
   * by depth — which is what a screen-space mask can only imitate, because a
   * mask cuts in the same place regardless of where the object actually is.
   */
  fogColor?: string;
}

export default function ModelScene({
  src,
  progress = 0,
  fallback,
  className = "",
  turn = Math.PI * 1.2,
  headroom = 0,
  fill = 0.88,
  decal,
  rise = 0,
  riseIn = 0.12,
  topFade = 0,
  drift = 0,
  yaw = 0,
  tilt = 0,
  exposure = 1.12,
  fillFrom,
  fillTo,
  fogColor,
}: ModelSceneProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const progressRef = useRef(progress);
  progressRef.current = progress;

  useEffect(() => {
    const host = hostRef.current;
    if (!host || !src) return;

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
      const { GLTFLoader } = await import("three/examples/jsm/loaders/GLTFLoader.js");
      // The asset is meshopt-compressed (that is most of how it got from
      // 11MB to under 1MB); without the decoder registered it simply fails
      // to parse.
      const { MeshoptDecoder } = await import("three/examples/jsm/libs/meshopt_decoder.module.js");
      const { RoomEnvironment } = await import("three/examples/jsm/environments/RoomEnvironment.js");
      if (disposed) return;

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(host.clientWidth, host.clientHeight);
      renderer.setClearColor(0x000000, 0);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = exposure;
      // Soft shadows are the single biggest realism win on cloth: without them
      // the folds are only shading from the normal map and the garment reads
      // flat. Self-shadowing is what gives the drape actual depth.
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;

      const scene = new THREE.Scene();
      if (fogColor) scene.fog = new THREE.Fog(new THREE.Color(fogColor), 5.4, 12.6);
      const pmrem = new THREE.PMREMGenerator(renderer);
      const envRT = pmrem.fromScene(new RoomEnvironment(), 0.04);
      scene.environment = envRT.texture;

      const camera = new THREE.PerspectiveCamera(32, host.clientWidth / host.clientHeight, 0.1, 200);

      const loader = new GLTFLoader().setMeshoptDecoder(MeshoptDecoder);
      const gltf = await loader.loadAsync(src).catch(() => null);
      if (!gltf || disposed) {
        renderer.dispose();
        return;
      }

      const pivot = new THREE.Group();
      pivot.rotation.z = tilt;
      const model = gltf.scene;
      pivot.add(model);
      scene.add(pivot);

      // Frame from the model's own bounds so any export drops in correctly.
      const box = new THREE.Box3().setFromObject(model);
      const size = box.getSize(new THREE.Vector3());
      const centre = box.getCenter(new THREE.Vector3());
      model.position.sub(centre);
      // Derived from the lens rather than a tuned constant, so `fill` means
      // the same fraction of the frame if the camera ever changes.
      const frame = 2 * 9.2 * Math.tan((32 * Math.PI) / 360);
      const span0 = Math.max(size.x, size.y, size.z);
      const fitAt = (share: number) => (frame * share) / span0;
      const fit = fitAt(fill);
      pivot.scale.setScalar(fit);
      camera.position.set(0, 0.35, 9.2);
      camera.lookAt(0, 0, 0);
      // World Y of the frame's top edge at z = 0, which is what `headroom`
      // measures from. Derived from the lens and the camera height rather than
      // tuned, so it stays true if either changes.
      const frameTopY = camera.position.y + frame / 2;

      // Terry cloth is matte and non-metallic whatever the exporter guessed,
      // and a robe is an open garment — single-sided faces let you see straight
      // through the sleeves and the front opening.
      const span = Math.max(size.x, size.y, size.z) * fit;

      // ── the vanishing top ────────────────────────────────────────────────
      // The garment dissolves into the page across its own topmost stretch.
      //
      // There is no body in it, so the neck opening ends in a flat plane, and
      // that plane is the one thing that gives away that this is a mesh. Every
      // way of hiding it by *framing* costs something: keep it above the frame
      // and the object can never rise into shot from below; rush it past and
      // the movement reads as a snap. So it is dissolved in the shader
      // instead — the cloth fades to the page colour before the geometry ever
      // reaches its own edge, at every position and every scale, which means
      // the framing is free to do whatever the section wants.
      //
      // It fades to the ground colour rather than to alpha on purpose.
      // Transparency would put a self-overlapping garment into the depth-sort
      // and cost far more than it buys; against a ground this exact, mixing to
      // the colour is indistinguishable and completely safe.
      //
      // The band is driven by a uniform in world space, updated per frame, so
      // it tracks the model as it climbs instead of being baked into geometry.
      const fadeTop = { value: 0 };
      const fadeBand = { value: size.y * fit * topFade };
      const fadeColor = { value: new THREE.Color(fogColor ?? "#ffffff") };
      const dissolveTop = (m: ThreeNS.Material) => {
        m.onBeforeCompile = (shader) => {
          shader.uniforms.uFadeTop = fadeTop;
          shader.uniforms.uFadeBand = fadeBand;
          shader.uniforms.uFadeColor = fadeColor;
          shader.vertexShader = shader.vertexShader
            .replace("void main() {", "varying float vFadeY;\nvoid main() {")
            .replace(
              "#include <fog_vertex>",
              "#include <fog_vertex>\n  vFadeY = (modelMatrix * vec4(transformed, 1.0)).y;"
            );
          shader.fragmentShader = shader.fragmentShader
            .replace(
              "void main() {",
              "uniform float uFadeTop;\nuniform float uFadeBand;\nuniform vec3 uFadeColor;\nvarying float vFadeY;\nvoid main() {"
            )
            .replace(
              "#include <dithering_fragment>",
              "#include <dithering_fragment>\n  gl_FragColor.rgb = mix(gl_FragColor.rgb, uFadeColor, smoothstep(uFadeTop - uFadeBand, uFadeTop, vFadeY));"
            );
        };
        m.needsUpdate = true;
      };

      model.traverse((o) => {
        const mesh = o as ThreeNS.Mesh;
        if (!mesh.isMesh) return;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        for (const mat of Array.isArray(mesh.material) ? mesh.material : [mesh.material]) {
          const m = mat as ThreeNS.MeshStandardMaterial;
          if (!m) continue;
          if (topFade > 0 && fogColor) dissolveTop(m);
          m.side = THREE.DoubleSide;
          m.metalness = 0;
          m.roughness = 0.95;
          m.envMapIntensity = 0.85;
          // Bleach-white cloth clips the moment any key touches it; pulling the
          // base colour off white keeps the weave in the highlights.
          m.color.multiplyScalar(0.82);
          // The 2048 normal map carries the weave; the default scale barely
          // shows it at this distance.
          if (m.normalMap) m.normalScale = new THREE.Vector2(1.6, 1.6);
          m.needsUpdate = true;
        }
      });

      scene.add(new THREE.HemisphereLight(0xfff4e4, 0x3a2f24, 0.62));
      const key = new THREE.DirectionalLight(0xffeed8, 1.05);
      key.position.set(3.2, 5.5, 4.5);
      key.castShadow = true;
      key.shadow.mapSize.set(1024, 1024);
      key.shadow.radius = 4;
      key.shadow.bias = -0.0015;
      // Fit the shadow frustum to the model, so the map's resolution is spent
      // on the garment instead of empty space.
      const sc = key.shadow.camera as ThreeNS.OrthographicCamera;
      sc.left = -span; sc.right = span; sc.top = span; sc.bottom = -span;
      sc.near = 0.1; sc.far = span * 8;
      sc.updateProjectionMatrix();
      scene.add(key);
      const rim = new THREE.DirectionalLight(0xc9ae7e, 1.8);
      rim.position.set(-5, 2.5, -4);
      scene.add(rim);

      // ── house-branded chest mark ──────────────────────────────────────────
      // Placed by raycast rather than by hand-tuned coordinates: fire a ray at
      // the chest, take the first cloth hit, and sit the mark on that point
      // along the surface normal. That lands it on the actual fold the garment
      // has there instead of floating at a guessed offset, and it keeps working
      // if the model is ever swapped.
      if (decal) {
        const texture = await loadArtwork(decal, THREE).catch(() => null);
        scene.updateMatrixWorld(true);
        if (texture && !disposed) {
          const ray = new THREE.Raycaster();
          // Viewer's left, upper chest. Aimed from well in front, straight back.
          const aim = new THREE.Vector3(-span * 0.085, span * 0.29, span);
          ray.set(aim, new THREE.Vector3(0, 0, -1));
          const hit = ray.intersectObject(model, true)[0];
          if (hit) {
            const badge = new THREE.Mesh(
              new THREE.PlaneGeometry(span * 0.042, span * 0.042),
              new THREE.MeshStandardMaterial({
                map: texture,
                transparent: true,
                // Engraved, not applied. A mark *brighter* than the cloth reads
                // as something laid on top; a real impression is a depression,
                // and a depression is darker than the surface around it because
                // it catches less light. Matte and non-metallic for the same
                // reason — thread and pressed pile, not a brass plate.
                roughness: 0.95,
                metalness: 0,
                color: new THREE.Color(0x9a8259),
                // Embroidery sits in the weave, so it must not z-fight the
                // cloth it is lying on.
                polygonOffset: true,
                polygonOffsetFactor: -4,
                side: THREE.DoubleSide,
              })
            );
            const normal = hit.face
              ? hit.face.normal.clone().transformDirection(hit.object.matrixWorld)
              : new THREE.Vector3(0, 0, 1);
            badge.position.copy(hit.point).addScaledVector(normal, span * 0.0002);
            badge.lookAt(badge.position.clone().add(normal));
            // Reparent to the garment so it turns with it — and is hidden by
            // the cloth once the robe rotates away.
            model.attach(badge);
          }
        }
      }
      // Bounce from below, so the underside of the folds is not dead black.
      const bounce = new THREE.DirectionalLight(0xffffff, 0.4);
      bounce.position.set(0, -4, 2);
      scene.add(bounce);

      host.appendChild(renderer.domElement);
      renderer.domElement.setAttribute("role", "presentation");

      let raf = 0;
      let onScreen = false;
      const render = () => {
        const t = Math.min(1, Math.max(0, progressRef.current));
        pivot.rotation.y = yaw - turn * 0.5 + t * turn;
        if (fillFrom !== undefined && fillTo !== undefined) {
          pivot.scale.setScalar(fitAt(fillFrom + (fillTo - fillFrom) * t));
        }
        // ── framing ───────────────────────────────────────────────────
        // The model hangs from the *top of its own bounding box*, not from its
        // centre.
        //
        // Centre-anchored framing cannot survive a push-in: growing the model
        // about its middle drives its top and bottom apart, so a crop tuned to
        // sit just under the neckline at one scale sits well below it at the
        // next, and the flat plane where the garment's neck opening ends walks
        // back into shot partway through. Hanging it from the top instead
        // pins that plane `headroom` units above the frame at every scale, and
        // the push-in can only ever crop further *down* the garment — which is
        // the whole intent: stay on the top of the robe.
        const s = pivot.scale.x;
        pivot.position.y =
          frameTopY +
          headroom +
          drift * t -
          (size.y / 2) * s -
          rise * (1 - ramp(t, 0, riseIn));
        // The dissolve band rides the model. Its width scales with the model
        // too, so the garment fades across the same share of itself however
        // far the push-in has gone.
        fadeTop.value = pivot.position.y + (size.y / 2) * s;
        fadeBand.value = size.y * s * topFade;
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
          const m = o as {
            geometry?: { dispose(): void };
            material?: { dispose(): void } | { dispose(): void }[];
          };
          m.geometry?.dispose();
          if (Array.isArray(m.material)) m.material.forEach((x) => x.dispose());
          else m.material?.dispose();
        });
        envRT.texture.dispose();
        pmrem.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
    })().catch(() => {
      // A missing or broken asset leaves the fallback in place.
    });

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, [src, turn, headroom, fill, decal, rise, riseIn, topFade, drift, yaw, tilt, exposure, fillFrom, fillTo, fogColor]);

  return (
    <div ref={hostRef} className={`relative ${className}`} aria-hidden>
      {!active && <div className="absolute inset-0">{fallback}</div>}
    </div>
  );
}

/**
 * Paints artwork into a canvas and hands back a texture.
 *
 * Goes via a canvas rather than straight to TextureLoader because an SVG
 * without intrinsic dimensions rasterises at whatever size the browser feels
 * like — which on a decal shows up as a blurry mark. Painting it at a fixed
 * size makes the result predictable.
 */
async function loadArtwork(url: string, THREE: typeof import("three")) {
  const img = await new Promise<HTMLImageElement>((resolve, reject) => {
    const el = new window.Image();
    el.crossOrigin = "anonymous";
    el.onload = () => resolve(el);
    el.onerror = reject;
    el.src = url;
  });
  const SIZE = 512;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = SIZE;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("no 2d context");
  // Fit the artwork inside the square without distorting it.
  const ratio = (img.width || 1) / (img.height || 1);
  const w = ratio >= 1 ? SIZE : SIZE * ratio;
  const h = ratio >= 1 ? SIZE / ratio : SIZE;
  ctx.drawImage(img, (SIZE - w) / 2, (SIZE - h) / 2, w, h);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}

/** 0 before `a`, 1 after `b`, linear between — and flat at both ends. */
function ramp(v: number, a: number, b: number) {
  return Math.min(1, Math.max(0, (v - a) / (b - a)));
}
