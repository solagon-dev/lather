import { DESCRIPTOR_PATHS, LOGO_VIEWBOX, MARK_PATHS, WORDMARK_PATHS } from "@/lib/logo-paths";

/**
 * The Lather identity, inlined so it can be tinted and animated.
 *
 * The artwork is one Illustrator file with three groups — the fountain mark,
 * the LATHER wordmark, and the SPA & WELLNESS descriptor — all sharing a single
 * 2400×1512.86 coordinate space. Rendering them from that shared space means
 * `stacked` and `mark` and `wordmark` are all guaranteed to be optically
 * consistent with each other and with the master file.
 *
 * The letterforms take `currentColor` so the logo works on porcelain and on
 * noir without a second asset. The fountain defaults to brass and can be told
 * to inherit instead (`markTone="current"`) for single-colour contexts like the
 * favicon or a reversed footer.
 */

type Variant = "stacked" | "wordmark" | "letters" | "mark" | "descriptor";

interface LogoProps {
  /**
   * stacked  fountain + LATHER + SPA & WELLNESS
   * wordmark LATHER + SPA & WELLNESS
   * letters  LATHER only — for small sizes where the descriptor would set
   *          below ~7px and turn to mud
   * mark     fountain only
   * descriptor SPA & WELLNESS only — for pairing beneath `letters` when the
   *          two need to animate independently
   */
  variant?: Variant;
  /** brass keeps the fountain in the brand metal; current makes the whole logo one colour */
  markTone?: "brass" | "current";
  className?: string;
  /** Rendered as the accessible name. Pass "" for decorative use beside a text label. */
  title?: string;
}

// Sub-boxes within the master artboard, taken from getBBox() on the real path
// data rather than eyeballed. Cropping the viewBox (rather than translating the
// paths) keeps every variant in register with the master file.
//   fountain      x 870.7  y    0    w  631.8  h 820.2
//   LATHER        x   0    y  982.2  w 2400    h 276.7
//   SPA & WELLNESS x 387.3 y 1423.8  w 1612.3  h  91.2
const VIEWBOX: Record<Variant, string> = {
  stacked: "0 0 2400 1515",
  wordmark: "0 982 2400 533",
  letters: "0 982 2400 277",
  mark: "870.7 0 631.8 820.2",
  descriptor: "387.3 1423.8 1612.3 91.2",
};

export default function Logo({
  variant = "stacked",
  markTone = "brass",
  className = "",
  title = "Lather Spa & Wellness",
}: LogoProps) {
  const showMark = variant === "stacked" || variant === "mark";
  const showLetters = variant === "stacked" || variant === "wordmark" || variant === "letters";
  const showDescriptor =
    variant === "stacked" || variant === "wordmark" || variant === "descriptor";
  const markFill = markTone === "brass" ? "#AC8D6B" : "currentColor";

  return (
    <svg
      viewBox={VIEWBOX[variant]}
      className={className}
      role={title ? "img" : "presentation"}
      aria-label={title || undefined}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      {title ? <title>{title}</title> : null}
      {showMark && (
        <g fill={markFill}>
          {MARK_PATHS.map((d, i) => (
            <path key={`m${i}`} d={d} />
          ))}
        </g>
      )}
      {/* The descriptor is its own decision, not a rider on the wordmark. It
          used to be nested inside the wordmark's group, which meant the one
          variant named after it — `descriptor`, the one the navbar uses —
          rendered an empty SVG: correctly sized by its viewBox, and containing
          nothing at all. */}
      {(showLetters || showDescriptor) && (
        <g fill="currentColor">
          {showLetters &&
            WORDMARK_PATHS.map((d, i) => <path key={`w${i}`} d={d} />)}
          {showDescriptor &&
            DESCRIPTOR_PATHS.map((d, i) => <path key={`d${i}`} d={d} />)}
        </g>
      )}
    </svg>
  );
}
