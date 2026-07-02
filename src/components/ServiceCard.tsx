import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import type { services } from "@/lib/data";

interface ServiceCardProps {
  service: (typeof services)[number];
  index?: number;
}

export default function ServiceCard({ service, index = 0 }: ServiceCardProps) {
  return (
    <Reveal delay={index * 90} className="group flex h-full flex-col">
      <Link href={`/services/${service.id}`} className="flex h-full flex-col">
        <div className="relative aspect-[3/4] overflow-hidden">
          <Image
            src={service.image}
            alt={service.name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-[1.2s] ease-luxe group-hover:scale-105"
          />
          {service.tier === "premium" && (
            <span className="absolute left-4 top-4 bg-noir/80 px-3 py-1.5 text-[0.6rem] font-semibold uppercase tracking-kicker text-brass-light backdrop-blur-sm">
              Signature
            </span>
          )}
        </div>
        <div className="flex flex-1 flex-col border-b hairline pb-5 pt-6">
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="font-display text-2xl font-normal transition-colors group-hover:text-brass-dark">
              {service.name}
            </h3>
            <span className="shrink-0 font-display text-xl text-brass-dark">
              {service.id === "blowout" ? `$${service.price}+` : `$${service.price}`}
            </span>
          </div>
          <p className="mt-2 text-[0.95rem] text-umber">{service.tagline}</p>
          <div className="mt-auto flex items-center justify-between pt-5 text-[0.7rem] font-medium uppercase tracking-kicker text-taupe">
            <span>{service.duration}</span>
            <span className="link-ul text-ink group-hover:text-brass-dark">View Ritual →</span>
          </div>
        </div>
      </Link>
    </Reveal>
  );
}
