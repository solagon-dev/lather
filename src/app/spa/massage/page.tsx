import type { Metadata } from "next";
import ServicePage from "@/components/site/ServicePage";
import { priceGroup } from "@/lib/menu";

export const metadata: Metadata = {
  title: "Massage in Greenville, NC",
  description:
    "Therapeutic massage in 45, 60 or 90 minutes ($85–$150) and prenatal massage in 60 or 90 minutes at Lather Spa in Greenville, NC.",
  alternates: { canonical: "/spa/massage" },
};

export default function MassagePage() {
  return (
    <ServicePage
      practice="spa"
      path="/spa/massage"
      name="Massage"
      title="Therapeutic and prenatal massage."
      intro={[
        "Therapeutic massage to release held tension, in a private room that is yours for the whole session. A focused 45 minutes, a full hour, or ninety unhurried minutes.",
        "Prenatal massage is offered in 60 and 90 minutes, positioned and paced for comfort through pregnancy.",
      ]}
      image={{
        src: "/media/experience/step-03-massage.webp",
        alt: "Massage at Lather Spa",
        caption: "A private treatment room",
      }}
      facts={["Therapeutic: 45, 60 or 90 minutes", "Prenatal: 60 or 90 minutes", "Free parking at the door"]}
      group={priceGroup("massage")}
      related={[
        { href: "/spa/head-spa", label: "Head spa rituals", aside: "From $100" },
        { href: "/spa/facials", label: "Glo2Facial", aside: "From $225" },
      ]}
    />
  );
}
