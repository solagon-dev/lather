// Enough phrases that the loop does not visibly repeat inside one screen —
// four ran out well before the right edge at 1440px and wider, so the track
// read as a stutter rather than a drift.
const phrases = [
  "Modern Wellness",
  "Elevated Self-Care",
  "Greenville, North Carolina",
  "Spa & Wellness Destination",
  "Restorative Spa Experiences",
  "Licensed Providers",
  "Personalized Wellness Care",
  "By Appointment Only",
];

export default function Marquee({ dark = false }: { dark?: boolean }) {
  const row = (ariaHidden: boolean) => (
    <div aria-hidden={ariaHidden} className="flex shrink-0 items-center">
      {phrases.map((p) => (
        <span key={p} className="flex items-center">
          <span className="px-8 font-display text-lg italic tracking-wide sm:text-xl">{p}</span>
          <span className={`text-base ${dark ? "text-brass-light" : "text-brass"}`}>·</span>
        </span>
      ))}
    </div>
  );

  return (
    <div
      className={`overflow-hidden border-y py-5 ${
        dark ? "border-ivory/10 bg-noir text-ivory/70" : "border-ink/10 bg-bone text-umber"
      }`}
    >
      <div className="marquee-track">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
