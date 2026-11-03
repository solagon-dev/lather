import type { Metadata } from "next";
import TreatmentLayout from "@/components/TreatmentLayout";
import { BOOK_URL } from "@/lib/business";
import { priceGroup } from "@/lib/menu";

export const metadata: Metadata = {
  title: "Massage in Greenville, NC",
  description:
    "Therapeutic massage in 45, 60 or 90 minutes ($85–$150) and prenatal massage at Lather Spa in Greenville, NC. Private rooms, free parking.",
  alternates: { canonical: "/spa/massage" },
};

export default function MassagePage() {
  return (
    <TreatmentLayout
      pillar={{ label: "Lather Spa", href: "/spa" }}
      path="/spa/massage"
      name="Massage"
      tagline="Therapeutic massage in 45, 60, or 90 minutes, and prenatal massage for expecting mothers."
      image={{ src: "/media/experience/step-03-massage.webp", alt: "Slow, intentional massage at Lather Spa" }}
      intro={[
        "Therapeutic massage to release held tension and restore the body, in a private room that is yours for the whole session. Choose the length that fits your day — a focused 45 minutes, a full hour, or ninety unhurried minutes.",
        "Prenatal massage is offered in 60 and 90 minutes, positioned and paced for comfort through pregnancy.",
      ]}
      facts={["45, 60, or 90 minutes", "Prenatal massage in 60 or 90 minutes", "Private room, free parking at the door"]}
      prices={{ group: priceGroup("massage") }}
      book={{ url: BOOK_URL, label: "Book a Massage" }}
      related={[
        { href: "/spa/head-spa", label: "Head Spa" },
        { href: "/spa/facials", label: "Glo2Facial" },
      ]}
    />
  );
}
