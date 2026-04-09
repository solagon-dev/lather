import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact & Visit Us",
  description:
    "Book your head spa appointment at Lather in Greenville, NC. Find directions, parking info, hours (Tue\u2013Sat 10am\u20137pm), and contact details. (252) 531-0987.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
