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
        className="h-full min-h-[420px] w-full border-0"
        allowFullScreen
      />
    );
  }

  return (
    <div className="relative flex h-full min-h-[420px] w-full flex-col items-center justify-center gap-6 overflow-hidden bg-bone px-6 py-12 text-center">
      {/* Suggestion of a street grid — decorative, drawn in CSS, no requests. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #241C12 1px, transparent 1px), linear-gradient(to bottom, #241C12 1px, transparent 1px)",
          backgroundSize: "58px 58px",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage:
            "linear-gradient(115deg, transparent 47.6%, #241C12 47.6%, #241C12 48.6%, transparent 48.6%)",
        }}
      />

      <div className="relative">
        <span aria-hidden className="mx-auto block h-3 w-3 rounded-full bg-brass-dark ring-4 ring-brass/25" />
        <address className="mt-5 not-italic leading-relaxed text-umber">
          <span className="font-display text-xl text-ink">{business.address.street}</span>
          <br />
          {business.address.city}, {business.address.state} {business.address.zip}
        </address>
      </div>

      <div className="relative flex flex-col gap-3 sm:flex-row sm:gap-4">
        <button type="button" onClick={() => setLoaded(true)} className="btn-solid">
          Show map
        </button>
        <a href={business.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn-outline">
          Get directions
        </a>
      </div>

      <p className="relative text-[0.75rem] text-taupe">
        The map loads from Google only when you ask for it.
      </p>
    </div>
  );
}
