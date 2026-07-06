import Image from "next/image";
import Reveal from "@/components/Reveal";
import { BOOK_URL, business, hoursShort } from "@/lib/business";

interface BookCTAProps {
  title?: string;
  body?: string;
}

export default function BookCTA({
  title = "Ready when you are.",
  body = "Book your appointment online in a minute, or call and we'll help you find the right treatment. New guests always welcome.",
}: BookCTAProps) {
  return (
    <section className="grain relative overflow-hidden bg-noir text-ivory">
      <Image
        src="/media/editorial/ambiance-wide.webp"
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-25"
      />
      <div className="wrap relative section-pad text-center">
        <Reveal>
          <h2 className="h-display mx-auto max-w-3xl text-balance text-4xl sm:text-5xl md:text-6xl">
            {title}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-ivory/70">{body}</p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a href={BOOK_URL} target="_blank" rel="noopener" className="btn-solid-light">
              Book on Vagaro
            </a>
            <a href={business.phoneHref} className="btn-outline-light">
              Call {business.phone}
            </a>
          </div>
          <p className="mt-8 text-[0.85rem] text-ivory/45">{hoursShort} · By appointment only</p>
        </Reveal>
      </div>
    </section>
  );
}
