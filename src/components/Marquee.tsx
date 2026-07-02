const phrases = [
  "A Facial for Your Scalp",
  "Greenville, North Carolina",
  "Japanese-Inspired Rituals",
  "By Appointment Only",
];

export default function Marquee({ dark = false }: { dark?: boolean }) {
  const row = (ariaHidden: boolean) => (
    <div aria-hidden={ariaHidden} className="flex shrink-0 items-center">
      {phrases.map((p) => (
        <span key={p} className="flex items-center">
          <span className="px-8 font-display text-lg font-light italic tracking-wide sm:text-xl">{p}</span>
          <span className={`text-xs ${dark ? "text-brass-light" : "text-brass"}`}>◆</span>
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
