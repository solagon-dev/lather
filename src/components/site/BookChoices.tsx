import { BOOK_URL, GIFT_CARD_URL, WELLNESS_BOOK_URL, business, hoursShort, wellnessHoursShort } from "@/lib/business";

/**
 * The two doors. Lather Spa and Lather Wellness keep separate Vagaro
 * calendars, so "Book" always asks which one first. Rendered in the booking
 * sheet and on /book.
 */
const doors = [
  {
    name: "Lather Spa",
    action: "Book now",
    body: "Head spa rituals, Glo2Facials and massage. Choose a time and it’s confirmed.",
    hours: hoursShort,
    href: BOOK_URL,
  },
  {
    name: "Lather Wellness",
    action: "Request",
    body: "Foundations Visits, laser, Secret RF & PRO, injectables and body contouring. Request a time; the practice confirms it with you.",
    hours: wellnessHoursShort,
    href: WELLNESS_BOOK_URL,
  },
];

export default function BookChoices() {
  return (
    <div>
      <ul className="border-b border-line">
        {doors.map((d, i) => (
          <li key={d.name} className={i === 0 ? "border-t border-ink" : "border-t border-line"}>
            <a href={d.href} target="_blank" rel="noopener noreferrer" className="group block py-5">
              <span className="flex items-baseline justify-between gap-4">
                <span className="font-display text-[1.5rem] leading-tight">{d.name}</span>
                <span className="cap group-hover:text-brass-dark">
                  {d.action}
                  <span className="sr-only"> (opens Vagaro)</span>
                </span>
              </span>
              <span className="note mt-1.5 block text-umber">{d.body}</span>
              <span className="cap-m mt-2.5 block">{d.hours}</span>
            </a>
          </li>
        ))}
      </ul>
      <p className="note mt-5 flex items-baseline justify-between gap-4">
        <a href={business.phoneHref} className="text-ink hover:text-brass-dark">
          Not sure? Call {business.phone}
        </a>
        <a href={GIFT_CARD_URL} target="_blank" rel="noopener noreferrer" className="text-ink hover:text-brass-dark">
          Gift cards
        </a>
      </p>
    </div>
  );
}
