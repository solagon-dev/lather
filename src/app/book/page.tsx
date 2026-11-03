import type { Metadata } from "next";
import BookOptions from "@/components/BookOptions";
import { Em, Statement } from "@/components/ui/Type";

export const metadata: Metadata = {
  title: "Book an Appointment",
  description:
    "Book Lather Spa (head spa, Glo2Facials, massage) or request a visit with Lather Wellness in Greenville, NC.",
  alternates: { canonical: "/book" },
};

/**
 * The page behind every Book button. With JavaScript the buttons open this
 * same choice as a dialog; this page is what they fall back to, and what an
 * old /book link lands on.
 */
export default function BookPage() {
  return (
    <section className="bg-porcelain px-6 pb-24 pt-32 sm:px-10 md:pt-40 lg:px-16">
      <div className="wrap max-w-4xl">
        <Statement as="h1" size="md">
          What would you <Em>like to book?</Em>
        </Statement>
        <div className="mt-12">
          <BookOptions />
        </div>
      </div>
    </section>
  );
}
