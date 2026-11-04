"use client";

import Link from "next/link";
import { useState } from "react";
import { finder } from "@/lib/menu";

/** "I'm looking for [deep relaxation ▾]" — start from the feeling, get one suggestion. */
export default function Finder() {
  const [i, setI] = useState(0);
  const pick = finder[i];

  return (
    <section aria-labelledby="finder-label" className="bg-sand px-5 pb-6 pt-[22px] sm:px-8 lg:px-12 lg:py-10">
      <label id="finder-label" htmlFor="finder-want" className="cap-m block">
        Not sure where to begin?
      </label>
      <div className="lg:flex lg:items-end lg:justify-between lg:gap-10">
        <div className="mt-3 flex flex-wrap items-baseline gap-x-2.5 gap-y-1 font-display text-[1.375rem] leading-snug lg:text-[2rem]">
          <span>I&rsquo;m looking for</span>
          <span className="relative inline-flex items-center border-b border-ink">
            <select
              id="finder-want"
              value={i}
              onChange={(e) => setI(Number(e.target.value))}
              className="cursor-pointer appearance-none bg-transparent pb-0.5 pr-6 font-display text-brass-dark focus:outline-none focus-visible:outline-1"
            >
              {finder.map((f, n) => (
                <option key={f.want} value={n}>
                  {f.want}
                </option>
              ))}
            </select>
            <svg width="10" height="6" viewBox="0 0 10 6" aria-hidden className="pointer-events-none absolute right-1">
              <path d="M1 1l4 4 4-4" stroke="#785E3A" strokeWidth="1" fill="none" />
            </svg>
          </span>
        </div>
        <div className="lg:max-w-[22rem] lg:text-right">
          <p className="note mt-3.5 lg:mt-0" aria-live="polite">
            We&rsquo;d suggest <span className="text-ink">{pick.suggest}</span> &mdash; {pick.detail}
          </p>
          <Link href={pick.href} className="lnk mt-4">
            Show me
          </Link>
        </div>
      </div>
    </section>
  );
}
