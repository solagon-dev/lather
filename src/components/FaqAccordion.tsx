interface Faq {
  question: string;
  answer: string;
}

export default function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  return (
    <div className="divide-y hairline border-y hairline">
      {faqs.map((f) => (
        <details key={f.question} className="group">
          <summary className="flex cursor-pointer list-none items-baseline justify-between gap-6 py-6 font-display text-xl font-normal transition-colors hover:text-brass-dark sm:text-2xl [&::-webkit-details-marker]:hidden">
            <span>{f.question}</span>
            <span
              aria-hidden
              className="shrink-0 font-body text-lg text-brass transition-transform duration-300 group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="max-w-prose2 pb-8 text-umber">{f.answer}</p>
        </details>
      ))}
    </div>
  );
}
