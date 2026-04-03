import type { Metadata } from "next";
import ScrollReveal from "@/components/ScrollReveal";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CinematicMarquee from "@/components/CinematicMarquee";
import ValueProp from "@/components/ValueProp";
import TreatmentCards from "@/components/TreatmentCards";
import EditorialBreak from "@/components/EditorialBreak";
import Experience from "@/components/Experience";
import ConcernPaths from "@/components/ConcernPaths";
import Gallery from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";
import SecondaryConversions from "@/components/SecondaryConversions";
import About from "@/components/About";
import FAQ from "@/components/FAQ";
import Book from "@/components/Book";
import Footer from "@/components/Footer";
import StickyBooking from "@/components/StickyBooking";

export const metadata: Metadata = {
  title: "Luxury Head Spa in Greenville, NC",
  description:
    "Lather is a luxury head spa in Greenville, NC. Japanese-inspired scalp rituals, therapeutic massage, and hair restoration treatments. Book your ritual today.",
  alternates: { canonical: "https://www.latherheadspa.com" },
};

export default function Home() {
  return (
    <main>
      <ScrollReveal />
      <Navbar />

      {/* 1. Cinematic hero — immediate desire + booking CTA */}
      <Hero />

      {/* Content wrapper — solid background covers the fixed hero video */}
      <div style={{ position: "relative", zIndex: 1, background: "var(--cream)" }}>
        <CinematicMarquee />
        <ValueProp />
        <TreatmentCards />
        <EditorialBreak />
        <Experience />
        <ConcernPaths />
        <Gallery />
        <Testimonials />
        <SecondaryConversions />
        <About />
        <FAQ />
        <Book />
        <Footer />
      </div>
      <StickyBooking />
    </main>
  );
}
