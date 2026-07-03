import Image from "next/image";
import Reveal from "@/components/Reveal";
import { business } from "@/lib/business";

// Lather's own photography — the same shoots that fill their Instagram feed.
const rowOne = [
  { src: "/media/gallery/interior-team-portrait.webp", alt: "The Lather team" },
  { src: "/media/experience/step-03-massage.webp", alt: "A scalp massage in progress" },
  { src: "/media/gallery/interior-gold-mirror.webp", alt: "Gold mirror detail in the treatment room" },
  { src: "/media/editorial/value-prop.webp", alt: "A quiet moment at Lather" },
  { src: "/media/treatments/blowout-card.webp", alt: "A finished blowout" },
  { src: "/media/gallery/treatment-waterfall.webp", alt: "Warm water over the scalp" },
  { src: "/media/experience/step-01-consultation.webp", alt: "The consultation" },
];

const rowTwo = [
  { src: "/media/gallery/interior-waiting-room.webp", alt: "The Lather lounge" },
  { src: "/media/experience/step-05-renewal.webp", alt: "The finishing touches" },
  { src: "/media/editorial/secondary-treatment.webp", alt: "A treatment detail" },
  { src: "/media/gallery/interior-crystal-lamp.webp", alt: "Crystal lamp detail" },
  { src: "/media/team/team-atmosphere.webp", alt: "Inside the spa" },
  { src: "/media/gallery/interior-reception-detail.webp", alt: "Reception details" },
  { src: "/media/experience/step-02-cleanse.webp", alt: "The cleanse" },
];

function PhotoRow({ images, duration }: { images: typeof rowOne; duration: string }) {
  const set = (dup: boolean) => (
    <div aria-hidden={dup} className="flex shrink-0">
      {images.map((img, i) => (
        <div
          key={`${img.src}-${i}`}
          className="relative mx-2 h-44 w-32 shrink-0 overflow-hidden rounded-xl sm:mx-2.5 sm:h-52 sm:w-40 md:h-60 md:w-48"
        >
          <Image
            src={img.src}
            alt={dup ? "" : img.alt}
            fill
            sizes="(min-width: 768px) 12rem, 7.5rem"
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );

  return (
    <div className="marquee-track" style={{ animationDuration: duration }}>
      {set(false)}
      {set(true)}
    </div>
  );
}

export default function SocialSection() {
  return (
    <section className="relative flex min-h-[36rem] items-center overflow-hidden bg-noir py-24 text-ivory sm:py-28">
      {/* Floating photo rows drifting right to left */}
      <div className="absolute inset-0 flex flex-col justify-center gap-4 sm:gap-5">
        <PhotoRow images={rowOne} duration="64s" />
        <PhotoRow images={rowTwo} duration="49s" />
      </div>

      {/* Dim the photos so they read as a soft background */}
      <div className="pointer-events-none absolute inset-0 bg-noir/30" />
      {/* Vanish the rows into the noir at both edges */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-noir via-transparent to-noir" />
      {/* A pool of shade behind the headline for legibility */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_55%_at_50%_50%,rgba(24,19,16,0.62),transparent_75%)]" />

      <Reveal className="wrap relative z-10 text-center [text-shadow:0_2px_18px_rgba(0,0,0,0.9)]">
        <h2 className="h-display text-4xl sm:text-5xl md:text-6xl">Follow the ritual</h2>
        <p className="mx-auto mt-5 max-w-md text-ivory/80">
          Inside the space, the treatments, and the quiet moments in between — new looks every week.
        </p>
        <a
          href={business.instagram}
          target="_blank"
          rel="noopener"
          className="btn-solid-light mx-auto mt-8 w-full sm:w-auto"
        >
          Follow {business.instagramHandle}
        </a>
        <p className="mt-6 text-[0.8rem] text-ivory/45">Join 1,900+ following along on Instagram</p>
      </Reveal>
    </section>
  );
}
