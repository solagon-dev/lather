import type { ReactNode } from "react";
import Reveal from "@/components/Reveal";

/**
 * The reading beat: a small label, a large centred statement, a short
 * paragraph, and at most one action.
 *
 * Centred rather than left-aligned on purpose — it is what separates a
 * "statement" from a normal content section, and it lets the surrounding
 * whitespace do the work instead of a rule or a card. Keep the paragraph
 * genuinely short; a centred measure over about 46 characters stops being
 * comfortable to read.
 */
interface StatementSectionProps {
  children: ReactNode;
  /** Optional short paragraph beneath the statement. */
  body?: ReactNode;
  /** Buttons or links. */
  actions?: ReactNode;
  tone?: "porcelain" | "ivory" | "bone" | "noir";
  /** Adds the hairline that separates two same-coloured sections. */
  divided?: boolean;
  className?: string;
  id?: string;
}

const TONE = {
  porcelain: "bg-porcelain text-ink",
  ivory: "bg-ivory text-ink",
  bone: "bg-bone text-ink",
  noir: "bg-noir text-ivory",
};

export default function StatementSection({
  children,
  body,
  actions,
  tone = "porcelain",
  divided = false,
  className = "",
  id,
}: StatementSectionProps) {
  const dark = tone === "noir";
  return (
    <section
      id={id}
      className={`section-pad ${TONE[tone]} ${divided ? (dark ? "border-t border-ivory/10" : "border-t hairline") : ""} ${className}`}
    >
      <div className="wrap-narrow flex flex-col items-center text-center">
        <Reveal className="w-full">
          {children}
        </Reveal>
        {body && (
          <Reveal delay={180} className="mt-8 w-full">
            <div className={dark ? "text-ivory/70" : "text-umber"}>{body}</div>
          </Reveal>
        )}
        {actions && (
          <Reveal delay={260} className="mt-11">
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-4">{actions}</div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
