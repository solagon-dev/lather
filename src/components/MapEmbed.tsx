"use client";

import { useState } from "react";
import { business } from "@/lib/business";

/**
 * Click-to-load map.
 *
 * The Google Maps iframe used to load on page view, which contacted Google —
 * and set its cookies — before the visitor asked for a map, and dragged in
 * Google's own chrome ("Keyboard shortcuts", "Terms", "Report a map error")
 * plus pins for every neighbouring business. Nothing is requested from Google
 * until someone presses Show map; until then this is a styled placeholder
 * carrying the address and a direct route to directions, which is what most
 * people actually want from this block.
 */
export default function MapEmbed() {
  const [loaded, setLoaded] = useState(false);

  const src =
    "https://www.google.com/maps?q=" +
    encodeURIComponent(`${business.name}, ${business.address.full}`) +
    "&output=embed";

  if (loaded) {
    return (
      <iframe
        src={src}
        title={`Map to ${business.name}`}
        loading="lazy"
        className="h-[360px] w-full border-0 lg:h-[480px]"
        allowFullScreen
      />
    );
  }

  return (
    <div className="flex min-h-[260px] w-full flex-col justify-between gap-8 bg-sand px-5 py-6 sm:px-8 sm:py-8 lg:min-h-[360px]">
      <address className="font-display text-[1.375rem] not-italic leading-snug">
        {business.address.street}
        <br />
        {business.address.city}, {business.address.state} {business.address.zip}
      </address>
      <div>
        <div className="flex flex-wrap gap-x-7 gap-y-4">
          <button type="button" onClick={() => setLoaded(true)} className="lnk">
            Show the map
          </button>
          <a href={business.mapsUrl} target="_blank" rel="noopener noreferrer" className="lnk">
            Get directions
          </a>
        </div>
        <p className="note mt-4">The map loads from Google only when you ask for it.</p>
      </div>
    </div>
  );
}
