import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import type { services } from "@/lib/data";

interface ServiceCardProps {
  service: (typeof services)[number];
  index?: number;
}

/**
 * Menu card for a ritual. Horizontal (image beside details) on phones so the
 * menu scans like a menu; tall editorial card from `sm` upward.
 */
export default function ServiceCard({ service, index = 0 }: ServiceCardProps) {
  return (
    <Reveal delay={index * 90} className="group flex h-full flex-col">
      <Link href={`/services/${service.id}`} className="flex h-full gap-5 sm:flex-col sm:gap-0">
        <div className="relative w-[38%] shrink-0 self-stretch overflow-hidden sm:aspect-[3/4] sm:w-auto sm:self-auto">
          <Image
            src={service.image}
            alt={service.name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 38vw"
            className="object-cover transition-transform duration-[1.2s] ease-luxe group-hover:scale-105"
          />
          {service.tier === "premium" && (
            <span className="absolute left-2 top-2 bg-noir/80 px-2 py-1 text-[0.55rem] font-semibold uppercase tracking-kicker text-brass-light backdrop-blur-sm sm:left-4 sm:top-4 sm:px-3 sm:py-1.5 sm:text-[0.6rem]">
              Signature
            </span>
          )}
        </div>
        <div className="flex min-h-[9.5rem] flex-1 flex-col border-b hairline pb-4 sm:min-h-0 sm:pb-5 sm:pt-6">
          <div className="flex items-baseline justify-between gap-3 sm:gap-4">
            <h3 className="font-display text-xl transition-colors group-hover:text-brass-dark sm:text-2xl">
              {service.name}
            </h3>
            <span className="shrink-0 font-display text-lg text-brass-dark sm:text-xl">
              {service.id === "blowout" ? `$${service.price}+` : `$${service.price}`}
            </span>
          </div>
          <p className="mt-2 text-[0.9rem] leading-snug text-umber sm:text-[0.95rem]">{service.tagline}</p>
          <div className="mt-auto flex items-center justify-between pt-4 text-[0.65rem] font-medium uppercase tracking-kicker text-taupe sm:pt-5 sm:text-[0.7rem]">
            <span>{service.duration}</span>
            <span className="link-ul !py-0 text-ink group-hover:text-brass-dark">View Ritual →</span>
          </div>
        </div>
      </Link>
    </Reveal>
  );
}
