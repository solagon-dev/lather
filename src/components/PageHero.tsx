import Image from "next/image";
import Reveal from "@/components/Reveal";

interface PageHeroProps {
  kicker: string;
  title: React.ReactNode;
  sub?: string;
  image?: string;
  imageAlt?: string;
}

/**
 * Standard interior-page header. With an image it renders a split editorial
 * layout; without, a centered porcelain masthead.
 */
export default function PageHero({ kicker, title, sub, image, imageAlt = "" }: PageHeroProps) {
  if (!image) {
    return (
      <section className="border-b hairline bg-porcelain px-6 pb-16 pt-40 text-center sm:px-10 md:pb-24 md:pt-48">
        <Reveal className="wrap">
          <p className="kicker">{kicker}</p>
          <h1 className="h-display mx-auto mt-6 max-w-4xl text-balance text-4xl sm:text-5xl md:text-6xl">
            {title}
          </h1>
          {sub && <p className="mx-auto mt-6 max-w-2xl text-umber">{sub}</p>}
        </Reveal>
      </section>
    );
  }

  return (
    <section className="border-b hairline bg-porcelain px-6 pt-32 sm:px-10 md:pt-40 lg:px-16">
      <div className="wrap grid items-end gap-10 pb-16 md:grid-cols-[1.2fr_1fr] md:pb-0">
        <Reveal className="pb-4 md:pb-24">
          <p className="kicker-line">{kicker}</p>
          <h1 className="h-display mt-6 max-w-2xl text-balance text-4xl sm:text-5xl md:text-6xl">{title}</h1>
          {sub && <p className="mt-6 max-w-xl text-umber">{sub}</p>}
        </Reveal>
        <Reveal delay={150} className="relative hidden aspect-[4/5] max-h-[440px] w-full self-end md:block">
          <div className="arch absolute inset-0">
            <Image src={image} alt={imageAlt} fill priority sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
