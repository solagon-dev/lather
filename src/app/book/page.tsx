import type { Metadata } from "next";
import BookChoices from "@/components/site/BookChoices";

export const metadata: Metadata = {
  title: "Book an Appointment",
  description:
    "Book Lather Spa (head spa rituals, Glo2Facials, massage) or request a visit with Lather Wellness in Greenville, NC.",
  alternates: { canonical: "/book" },
};

/**
 * The page behind every Book button. With JavaScript the buttons open this
 * same choice as a sheet; this page is what they fall back to.
 */
export default function BookPage() {
  return (
    <section className="shell pb-24 pt-5 lg:pb-36 lg:pt-14">
      <p className="cap-m">Book</p>
      <div className="max-w-[34rem]">
        <h1 className="mt-11 font-display text-[2.375rem] leading-[1.1] lg:mt-12 lg:text-[3.5rem]">
          What would you like to book?
        </h1>
        <p className="copy mt-4">Lather is two practices under one roof, each with its own calendar.</p>
        <div className="mt-10">
          <BookChoices />
        </div>
      </div>
    </section>
  );
}
