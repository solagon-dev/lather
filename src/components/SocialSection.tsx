import Image from "next/image";
import Reveal from "@/components/Reveal";
import { business } from "@/lib/business";

// Lather's own photography. Deliberately drawn from shots that appear nowhere
// else on the homepage — seven of these previously repeated the "Step inside"
// gallery and the intro image a few hundred pixels further up, so the same
// photos passed the visitor twice in one scroll.
const rowOne = [
  { src: "/media/founders/founders-social.webp", alt: "Lather's founders" },
  { src: "/media/hero/hero-poster.webp", alt: "A guest at the basin under the brass arch" },
  { src: "/media/gallery/interior-crystal-lamp.webp", alt: "Crystal lamp detail" },
  { src: "/media/editorial/value-prop.webp", alt: "A quiet moment at Lather" },
  { src: "/media/treatments/blowout-card.webp", alt: "A finished blowout" },
  { src: "/media/experience/step-05-renewal.webp", alt: "The finishing touches" },
  { src: "/media/gallery/interior-diffuser.webp", alt: "Diffuser detail in the treatment room" },
];

const rowTwo = [
  { src: "/media/gallery/interior-team-portrait.webp", alt: "The Lather team" },
  { src: "/media/experience/step-02-cleanse.webp", alt: "The cleanse" },
  { src: "/media/editorial/secondary-treatment.webp", alt: "A treatment detail" },
  { src: "/media/experience/step-04-treatment.webp", alt: "Targeted scalp treatment" },
  { src: "/media/treatments/classic-ritual.webp", alt: "The Classic Ritual" },
  { src: "/media/editorial/gift-card-detail.webp", alt: "A Lather gift card" },
  { src: "/media/founders/founders-steps.webp", alt: "The founders on the steps" },
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
        {/* No "new looks every week" and no follower count: this strip is a
            hard-coded set of stills, not a live feed, and a number written into
            the source goes stale the day after it ships. */}
        <p className="mx-auto mt-5 max-w-md text-ivory/80">
          Inside the space, the treatments, and the quiet moments in between.
        </p>
        <a
          href={business.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-solid-light mx-auto mt-8 w-full sm:w-auto"
        >
          Follow {business.instagramHandle}
        </a>
      </Reveal>
    </section>
  );
}
