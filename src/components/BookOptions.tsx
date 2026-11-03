import { BOOK_URL, WELLNESS_BOOK_URL, business, hoursShort, wellnessHoursShort } from "@/lib/business";

/**
 * The two doors. The spa and Lather Wellness book on separate Vagaro profiles,
 * so "Book" always has to ask which one before it can send anyone anywhere.
 * Rendered by both the /book page and the dialog every Book button opens.
 */
const doors = [
  {
    label: "Lather Spa",
    title: "Book the Spa",
    body: "Head spa rituals, Glo2Facials, and massage. Booked instantly online.",
    hours: hoursShort,
    href: BOOK_URL,
  },
  {
    label: "Lather Wellness",
    title: "Request a Wellness Visit",
    body: "Foundations visits, laser hair removal, Secret RF & PRO, injectables, and body contouring. Requested online and confirmed by the practice.",
    hours: wellnessHoursShort,
    href: WELLNESS_BOOK_URL,
  },
];

export default function BookOptions({ tone = "light" }: { tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <div>
      <ul className="grid gap-4 sm:grid-cols-2">
        {doors.map((d) => (
          <li key={d.label}>
            <a
              href={d.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex h-full flex-col border p-6 transition-colors duration-300 sm:p-8 ${
                dark
                  ? "border-ivory/15 hover:border-ivory/40 hover:bg-ivory/[0.04]"
                  : "hairline bg-porcelain hover:border-ink/30 hover:bg-ivory"
              }`}
            >
              <span className={`text-[0.7rem] uppercase tracking-[0.18em] ${dark ? "text-brass-light" : "text-brass-dark"}`}>
                {d.label}
              </span>
              <span className="mt-3 font-display text-[1.75rem] leading-tight">{d.title}</span>
              <span className={`mt-3 text-[0.92rem] leading-relaxed ${dark ? "text-ivory/70" : "text-umber"}`}>
                {d.body}
              </span>
              <span className={`mt-auto pt-6 text-[0.75rem] ${dark ? "text-ivory/60" : "text-taupe"}`}>{d.hours}</span>
              <span className="mt-4 inline-flex items-center gap-2 text-[0.8rem] font-semibold tracking-[0.02em]">
                Continue to booking
                <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                  &rarr;
                </span>
              </span>
            </a>
          </li>
        ))}
      </ul>
      <p className={`mt-6 text-center text-[0.85rem] ${dark ? "text-ivory/60" : "text-taupe"}`}>
        Not sure which?{" "}
        <a href={business.phoneHref} className="link-ul">
          Call or text {business.phone}
        </a>{" "}
        ·{" "}
        <a href="/pricing" className="link-ul">
          See all pricing
        </a>
      </p>
    </div>
  );
}
