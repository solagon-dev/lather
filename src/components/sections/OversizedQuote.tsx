import type { ReactNode } from "react";
import Reveal from "@/components/Reveal";
import Logo from "@/components/ui/Logo";

/**
 * A quotation set larger than the page can hold.
 *
 * The type is sized to overflow its container horizontally and is clipped by
 * the section, so the outer words run off both edges. That deliberate
 * overflow is the effect — it makes the quote feel like signage rather than a
 * testimonial card.
 *
 * `overflow-hidden` on the section is load-bearing: without it the oversized
 * line would widen the document and give the whole page a horizontal scrollbar.
 * The lines are centred so the clipping is symmetrical.
 */
interface OversizedQuoteProps {
  /** One array entry per visual line. Keep lines short — they are meant to be huge. */
  lines: ReactNode[];
  attribution?: ReactNode;
  tone?: "porcelain" | "bone" | "noir";
  /** Places the fountain mark behind the middle of the quote. */
  withMark?: boolean;
  className?: string;
}

const TONE = {
  porcelain: "bg-porcelain text-ink",
  bone: "bg-bone text-ink",
  noir: "bg-noir text-ivory",
};

export default function OversizedQuote({
  lines,
  attribution,
  tone = "bone",
  withMark = true,
  className = "",
}: OversizedQuoteProps) {
  const dark = tone === "noir";
  return (
    <section className={`relative overflow-hidden py-28 sm:py-36 md:py-44 ${TONE[tone]} ${className}`}>
      {withMark && (
        <Logo
          variant="mark"
          markTone="current"
          title=""
          className={`pointer-events-none absolute left-1/2 top-1/2 h-[42vw] max-h-[26rem] w-auto -translate-x-1/2 -translate-y-1/2 ${
            dark ? "text-ivory/[0.06]" : "text-ink/[0.05]"
          }`}
        />
      )}

      <Reveal className="relative">
        <blockquote>
          <p className="whitespace-nowrap text-center font-display text-[clamp(2.75rem,8.5vw,7.5rem)] leading-[1.02] tracking-[-0.012em]">
            {lines.map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </p>
          {attribution && (
            <footer
              className={`mt-12 text-center font-body text-[0.7rem] uppercase tracking-[0.28em] ${
                dark ? "text-ivory/60" : "text-taupe"
              }`}
            >
              {attribution}
            </footer>
          )}
        </blockquote>
      </Reveal>
    </section>
  );
}
