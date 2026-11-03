import type { Metadata } from "next";
import TreatmentLayout from "@/components/TreatmentLayout";
import { BOOK_URL } from "@/lib/business";
import { priceGroup } from "@/lib/menu";

export const metadata: Metadata = {
  title: "Glo2Facial in Greenville, NC",
  description:
    "Glo2Facial Essential ($225) and Advanced ($275) at Lather Spa in Greenville, NC — exfoliation, oxygenation and ultrasound, with RF in the Advanced. No downtime.",
  alternates: { canonical: "/spa/facials" },
};

export default function FacialsPage() {
  return (
    <TreatmentLayout
      pillar={{ label: "Lather Spa", href: "/spa" }}
      path="/spa/facials"
      name="Glo2Facial"
      tagline="A customized facial that exfoliates, oxygenates, and hydrates — with RF technology in the Advanced for firming."
      image={{ src: "/media/editorial/secondary-treatment.webp", alt: "Skincare tools on marble at Lather Spa" }}
      intro={[
        "The Glo2Facial combines exfoliation, oxygenation, and ultrasound technology to hydrate, smooth, and brighten the skin. Each one is personalized to your skin's needs, for a refreshed, healthy glow with no downtime.",
        "The Advanced adds RF Pro technology — radio frequency for firming and rejuvenation — to work on tone, texture, hydration, and firmness in the same visit.",
      ]}
      facts={["Two levels: Essential and Advanced", "Personalized to your skin", "No downtime"]}
      prices={{ group: priceGroup("facials") }}
      book={{ url: BOOK_URL, label: "Book a Facial" }}
      related={[
        { href: "/spa/head-spa", label: "Head Spa" },
        { href: "/spa/massage", label: "Massage" },
      ]}
    />
  );
}
