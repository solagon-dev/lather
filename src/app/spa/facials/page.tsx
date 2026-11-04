import type { Metadata } from "next";
import ServicePage from "@/components/site/ServicePage";
import { priceGroup } from "@/lib/menu";

export const metadata: Metadata = {
  title: "Glo2Facial in Greenville, NC",
  description:
    "Glo2Facial Essential ($225) and Advanced ($275) at Lather Spa in Greenville, NC: exfoliation, oxygenation and ultrasound, with RF technology in the Advanced.",
  alternates: { canonical: "/spa/facials" },
};

export default function FacialsPage() {
  return (
    <ServicePage
      practice="spa"
      path="/spa/facials"
      name="Glo2Facial"
      title="Glo2Facial, Essential and Advanced."
      intro={[
        "The Glo2Facial combines exfoliation, oxygenation, and ultrasound to hydrate, smooth, and brighten the skin, personalized to what your skin needs that day.",
        "The Advanced is the Essential experience with added RF technology for firming.",
      ]}
      image={{
        src: "/media/editorial/secondary-treatment.webp",
        alt: "Skincare tools on marble at Lather Spa",
        caption: "The treatment room",
      }}
      facts={["Two levels: Essential and Advanced", "Personalized to your skin", "No downtime"]}
      group={priceGroup("facials")}
      related={[
        { href: "/spa/head-spa", label: "Head spa rituals", aside: "From $100" },
        { href: "/spa/massage", label: "Massage", aside: "From $85" },
      ]}
    />
  );
}
