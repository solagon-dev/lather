import Image from "next/image";
import Reveal from "@/components/Reveal";

/**
 * An edge-to-edge row of photographs with no gutters.
 *
 * The images butt directly against one another and against both screen edges,
 * so the row reads as one continuous band rather than as cards. That is the
 * whole effect — adding gap or rounding turns it back into a gallery.
 *
 * On phones the row becomes a horizontal scroller rather than stacking: three
 * portrait crops stacked vertically is a very long, very boring scroll, whereas
 * a swipeable band keeps the composition intact. Snap points make it feel
 * deliberate.
 */
interface ImageRowProps {
  images: { src: string; alt: string; focal?: string }[];
  /** Portrait suits people and garments; landscape suits interiors. */
  ratio?: "portrait" | "square" | "landscape";
  className?: string;
}

const RATIO = {
  portrait: "aspect-[3/4]",
  square: "aspect-square",
  landscape: "aspect-[4/3]",
};

export default function ImageRow({ images, ratio = "portrait", className = "" }: ImageRowProps) {
  return (
    <section className={`bg-porcelain ${className}`}>
      <div
        className="flex snap-x snap-mandatory overflow-x-auto md:grid md:overflow-visible"
        style={{ gridTemplateColumns: `repeat(${images.length}, minmax(0, 1fr))` }}
      >
        {images.map((img, i) => (
          <Reveal
            key={img.src}
            delay={i * 110}
            className="relative w-[78vw] shrink-0 snap-center md:w-auto"
          >
            <div className={`relative ${RATIO[ratio]} overflow-hidden`}>
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes={`(min-width: 768px) ${Math.round(100 / images.length)}vw, 78vw`}
                style={img.focal ? { objectPosition: img.focal } : undefined}
                className="object-cover transition-transform duration-[1.4s] ease-luxe hover:scale-[1.04]"
              />
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
