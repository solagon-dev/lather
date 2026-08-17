import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import Reveal from "@/components/Reveal";
import { Statement } from "@/components/ui/Type";

/**
 * Masthead for long-form reading: breadcrumb, category, date and read time,
 * title, dek, then an optional image.
 *
 * The metadata sits above the title rather than below it because on an article
 * the first question is "what is this and is it current", and the answer should
 * not require reading the headline first. The measure is deliberately narrower
 * than the other heroes — this hero is the top of a column of prose, and the
 * title should share that column's width so the page reads as one object.
 */
interface ArticleHeroProps {
  title: ReactNode;
  /** e.g. "Scalp Science" */
  category?: ReactNode;
  /** e.g. "January 15, 2025 · 5 min read" */
  meta?: ReactNode;
  /** Standfirst. Set larger and italic — it is the bridge into the body. */
  dek?: ReactNode;
  breadcrumb?: { href: string; label: string };
  image?: { src: string; alt: string; focal?: string };
  children?: ReactNode;
}

export default function ArticleHero({
  title,
  category,
  meta,
  dek,
  breadcrumb,
  image,
  children,
}: ArticleHeroProps) {
  return (
    <section className="bg-porcelain px-6 pt-32 sm:px-10 md:pt-40 lg:px-16">
      <div className="mx-auto max-w-[52rem]">
        {breadcrumb && (
          <Reveal>
            <nav aria-label="Breadcrumb" className="text-[0.7rem] tracking-[0.02em] text-taupe">
              <Link href={breadcrumb.href} className="link-ul">
                {breadcrumb.label}
              </Link>
              {category ? <> / {category}</> : null}
            </nav>
          </Reveal>
        )}

        {meta && (
          <Reveal delay={80}>
            <p className="mt-8 text-[0.7rem] tracking-[0.02em] text-brass-dark">{meta}</p>
          </Reveal>
        )}

        <Reveal delay={140}>
          <Statement as="h1" size="md" className="mt-6">
            {title}
          </Statement>
        </Reveal>

        {dek && (
          <Reveal delay={220}>
            <p className="mt-8 font-display text-xl italic leading-relaxed text-umber sm:text-2xl">
              {dek}
            </p>
          </Reveal>
        )}

        {children && (
          <Reveal delay={280} className="mt-9">
            {children}
          </Reveal>
        )}
      </div>

      {image && (
        <Reveal delay={200} className="mx-auto mt-14 max-w-[68rem] md:mt-20">
          <div className="relative aspect-[16/9] w-full overflow-hidden">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority
              sizes="(min-width: 768px) 80vw, 100vw"
              style={image.focal ? { objectPosition: image.focal } : undefined}
              className="object-cover"
            />
          </div>
        </Reveal>
      )}
    </section>
  );
}
