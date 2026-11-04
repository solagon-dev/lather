import Image from "next/image";
import type { ReactNode } from "react";
import type { PriceGroup } from "@/lib/menu";
import { usd } from "@/lib/menu";

/**
 * The building blocks of every page, taken from the brochure: numbered
 * section heads, captioned photographs, and price menus with dotted leaders.
 */

/** 01 ─ LATHER SPA ··········· BOOKED ONLINE */
export function SectionHead({
  num,
  label,
  note,
  as: Tag = "p",
  id,
}: {
  num?: string;
  label: string;
  note?: string;
  as?: "p" | "h2";
  id?: string;
}) {
  return (
    <div className="grid grid-cols-[44px_minmax(0,1fr)] items-baseline border-t border-ink pt-3.5 lg:grid-cols-[88px_minmax(0,1fr)]">
      <span className="num" aria-hidden={!num}>
        {num}
      </span>
      <div className="flex items-baseline justify-between gap-4">
        <Tag id={id} className="cap">
          {label}
        </Tag>
        {note && <span className="cap-m">{note}</span>}
      </div>
    </div>
  );
}

/** A photograph set into the page with a small caption, the way print holds one. */
export function Figure({
  src,
  alt,
  caption,
  aside,
  ratio = "4/5",
  focal,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority = false,
  className = "",
  frame = false,
}: {
  src: string;
  alt: string;
  caption?: ReactNode;
  aside?: ReactNode;
  ratio?: string;
  focal?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
  /** A paper border, for a photograph that overlaps another. */
  frame?: boolean;
}) {
  return (
    <figure className={className}>
      <div
        className={`relative w-full overflow-hidden bg-sand ${frame ? "outline outline-[6px] outline-porcelain" : ""}`}
        style={{ aspectRatio: ratio }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
          style={focal ? { objectPosition: focal } : undefined}
        />
      </div>
      {(caption || aside) && (
        <figcaption className="note mt-2.5 flex items-baseline justify-between gap-4">
          <span>{caption}</span>
          {aside && <span>{aside}</span>}
        </figcaption>
      )}
    </figure>
  );
}

/** Name · · · · · · price */
export function Leader({
  name,
  price,
  className = "",
  nameClass = "font-display text-[1.3125rem] leading-snug text-ink",
  priceClass = "font-display text-[1.1875rem] text-ink",
}: {
  name: ReactNode;
  price: ReactNode;
  className?: string;
  nameClass?: string;
  priceClass?: string;
}) {
  return (
    <div className={`ld ${className}`}>
      <span className={nameClass}>{name}</span>
      <span className="dots" aria-hidden />
      <span className={`shrink-0 ${priceClass}`}>{price}</span>
    </div>
  );
}

/** A whole price group as a menu: leaders for single prices, a small table for packages. */
export function PriceMenu({ group, showHeading = true }: { group: PriceGroup; showHeading?: boolean }) {
  return (
    <div>
      {showHeading && <h3 className="font-display text-[1.5rem] leading-tight">{group.heading}</h3>}
      {group.intro && <p className="note mt-1.5">{group.intro}</p>}

      {group.columns ? (
        <table className="mt-5 w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-ink">
              <th scope="col" className="cap pb-2 font-medium">
                <span className="sr-only">Treatment</span>
              </th>
              {group.columns.map((c) => (
                <th key={c} scope="col" className="cap pb-2 pl-3 text-right font-medium">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {group.items.map((item) => (
              <tr key={item.name} className="border-b border-line">
                <th scope="row" className="py-3 pr-2 text-left font-display text-[1rem] font-normal leading-snug lg:text-[1.125rem]">
                  {item.name}
                </th>
                {item.prices.map((p, i) => (
                  <td key={i} className="whitespace-nowrap py-3 pl-3 text-right font-display text-[0.9375rem] lg:text-[1.0625rem]">
                    {usd(p)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <ul className="mt-5 flex flex-col gap-3.5">
          {group.items.map((item) => (
            <li key={`${item.name}-${item.detail ?? ""}`}>
              <Leader
                name={item.name}
                nameClass="font-display text-[1.125rem] leading-snug text-ink"
                priceClass="font-display text-[1.0625rem] text-ink"
                price={
                  item.prices.length ? (
                    <>
                      {usd(item.prices[0])}
                      {item.unit && <span className="note"> {item.unit}</span>}
                    </>
                  ) : (
                    <span className="note">At consult</span>
                  )
                }
              />
              {item.detail && <p className="note mt-0.5">{item.detail}</p>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/**
 * The top of an inner page: place line, title, a sentence, and (optionally)
 * the photograph beside it on a desktop.
 */
export function PageOpening({
  eyebrow,
  aside,
  title,
  children,
  figure,
}: {
  eyebrow: string;
  aside?: string;
  title: ReactNode;
  children?: ReactNode;
  figure?: ReactNode;
}) {
  return (
    <section className="shell pt-5 lg:pt-14">
      <div className="flex items-baseline justify-between gap-4">
        <p className="cap-m">{eyebrow}</p>
        {aside && <p className="cap-m">{aside}</p>}
      </div>
      <div className={figure ? "lg:mt-10 lg:grid lg:grid-cols-12 lg:items-end lg:gap-12" : ""}>
        {figure && <div className="mt-3.5 lg:order-2 lg:col-span-7 lg:mt-0">{figure}</div>}
        <div className={figure ? "lg:col-span-5 lg:pb-8" : ""}>
          <h1
            className={`mt-11 max-w-[20ch] font-display text-[2.375rem] leading-[1.1] lg:text-[3.5rem] ${figure ? "lg:mt-0" : "lg:mt-12"}`}
          >
            {title}
          </h1>
          {children && <div className="copy mt-4 max-w-[34rem] space-y-4">{children}</div>}
        </div>
      </div>
    </section>
  );
}
