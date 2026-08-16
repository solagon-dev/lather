import Image from "next/image";
import type { ReactNode } from "react";
import Reveal from "@/components/Reveal";
import Logo from "@/components/ui/Logo";
import { Statement } from "@/components/ui/Type";
import { BOOK_URL, business, hoursShort } from "@/lib/business";

interface BookCTAProps {
  title?: ReactNode;
  body?: string;
}

/**
 * The closing invitation, on every page.
 *
 * The photograph sits far back (low opacity over noir) so the type carries the
 * section — the earlier version put a busy, out-of-focus shelf shot at a
 * brightness that fought both the heading and the small print beneath it. The
 * fountain mark ghosted behind the type gives the block a centre without
 * needing a rule or a border.
 */
export default function BookCTA({
  title = (
    <>
      Ready <em className="italic">when</em> you are.
    </>
  ),
  body = "Book your appointment online in a minute, or call and we'll help you find the right treatment. New guests always welcome.",
}: BookCTAProps) {
  return (
    <section className="grain relative overflow-hidden bg-noir text-ivory">
      <Image
        src="/media/editorial/ambiance-wide.webp"
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-[0.18]"
      />
      <Logo
        variant="mark"
        markTone="current"
        title=""
        className="pointer-events-none absolute left-1/2 top-1/2 h-[34vw] max-h-[22rem] w-auto -translate-x-1/2 -translate-y-1/2 text-ivory/[0.05]"
      />

      <div className="wrap relative section-pad text-center">
        <Reveal>
          <Statement as="h2" size="lg" className="mx-auto max-w-4xl">
            {title}
          </Statement>
        </Reveal>
        <Reveal delay={140}>
          <p className="mx-auto mt-8 max-w-[46ch] text-ivory/70">{body}</p>
        </Reveal>
        <Reveal delay={240}>
          <div className="mt-11 flex flex-wrap items-center justify-center gap-4">
            <a href={BOOK_URL} target="_blank" rel="noopener noreferrer" className="btn-solid-light">
              Book Appointment
            </a>
            <a href={business.phoneHref} className="btn-outline-light">
              Call {business.phone}
            </a>
          </div>
          <p className="mt-8 text-[0.85rem] text-ivory/70">{hoursShort} · By appointment only</p>
        </Reveal>
      </div>
    </section>
  );
}
