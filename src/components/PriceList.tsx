import Reveal from "@/components/Reveal";
import type { PriceGroup, PriceItem } from "@/lib/menu";

const fmt = (n: number) => `$${n.toLocaleString("en-US")}`;

/**
 * One group of the menu as a price list — /pricing renders every group, and
 * each service page renders its own. Groups priced more than one way (single
 * session and packs) get column headings; on a phone those are hidden and
 * each price carries its own label instead.
 */
export default function PriceList({
  group,
  items = group.items,
  heading = group.heading,
  headingLevel: H = "h2",
  showBook = true,
}: {
  group: PriceGroup;
  /** A subset of the group's items, for pages that show only part of it. */
  items?: PriceItem[];
  heading?: string;
  headingLevel?: "h2" | "h3";
  showBook?: boolean;
}) {
  const columns = group.columns ?? [];
  const long = !columns.length && items.length > 8;

  return (
    <div>
      <Reveal>
        <H className="h-display text-3xl sm:text-4xl">{heading}</H>
        {group.intro && <p className="mt-3 text-[0.9rem] text-taupe">{group.intro}</p>}
      </Reveal>

      {columns.length > 0 && (
        <div
          aria-hidden
          className="mt-8 hidden gap-8 text-[0.7rem] tracking-[0.02em] text-taupe sm:grid sm:grid-cols-[1.6fr_repeat(3,7rem)]"
        >
          <span />
          {columns.map((c) => (
            <span key={c} className="text-right">
              {c}
            </span>
          ))}
        </div>
      )}

      <div
        className={`border-t hairline ${columns.length ? "mt-3" : "mt-8"} ${
          long ? "md:grid md:grid-cols-2 md:gap-x-12" : ""
        }`}
      >
        {items.map((item, i) => (
          <Reveal
            key={`${item.name}-${item.detail ?? ""}`}
            delay={Math.min(i, 8) * 40}
            className={`grid items-baseline gap-2 border-b hairline py-5 ${
              columns.length ? "sm:grid-cols-[1.6fr_repeat(3,7rem)] sm:gap-8" : "grid-cols-[1fr_auto] gap-6"
            }`}
          >
            <div>
              <h3 className="font-display text-xl">{item.name}</h3>
              {item.detail && <p className="mt-1 text-[0.85rem] text-taupe">{item.detail}</p>}
            </div>
            {columns.length ? (
              item.prices.map((p, j) => (
                <p
                  key={columns[j]}
                  className={`flex justify-between font-display text-xl sm:block sm:text-right ${
                    j === columns.length - 1 ? "text-brass-dark" : "text-umber"
                  }`}
                >
                  <span className="font-body text-[0.75rem] text-taupe sm:hidden">{columns[j]}</span>
                  {fmt(p)}
                </p>
              ))
            ) : (
              <p className="font-display text-xl text-brass-dark">{fmt(item.prices[0])}</p>
            )}
          </Reveal>
        ))}
      </div>

      {showBook && group.book && (
        <Reveal className="mt-8">
          <a href={group.book.url} target="_blank" rel="noopener noreferrer" className="btn-solid">
            {group.book.label}
          </a>
        </Reveal>
      )}
    </div>
  );
}
