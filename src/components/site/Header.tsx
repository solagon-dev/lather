"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { BookButton } from "@/components/site/BookSheet";
import { business, hoursShort, wellnessHoursShort } from "@/lib/business";

/**
 * The header, in words rather than icons: Menu · LATHER · Call on a phone,
 * the main sections spelled out either side of the logotype on a desktop.
 * The logotype is set in Marcellus, whose capitals are cut like the wordmark's.
 */

const primary = [
  {
    href: "/spa",
    label: "The Spa",
    sub: [
      { href: "/spa/head-spa", label: "Head spa rituals" },
      { href: "/spa/facials", label: "Glo2Facial" },
      { href: "/spa/massage", label: "Massage" },
    ],
  },
  {
    href: "/wellness",
    label: "Wellness",
    sub: [
      { href: "/wellness/foundations", label: "Foundations Visit" },
      { href: "/wellness/laser-hair-removal", label: "Laser" },
      { href: "/wellness/secret-rf-pro", label: "Secret RF & PRO" },
      { href: "/wellness/injectables", label: "Injectables" },
      { href: "/wellness/body-contouring", label: "Body contouring" },
    ],
  },
  { href: "/menu", label: "Menu & Pricing" },
  { href: "/about", label: "Our Story" },
  { href: "/visit", label: "Visit" },
  { href: "/gift-cards", label: "Gift Cards" },
];

function Logotype({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Lather Spa & Wellness, home"
      className={`py-3 font-mark text-[1.1875rem] leading-none tracking-[0.4em] text-ink [padding-left:0.4em] hover:text-ink lg:text-[1.375rem] ${className}`}
    >
      LATHER
    </Link>
  );
}

export default function Header() {
  const drawer = useRef<HTMLDialogElement>(null);
  const pathname = usePathname();

  // Close the drawer whenever the route changes.
  useEffect(() => {
    drawer.current?.close();
  }, [pathname]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-line-soft bg-porcelain">
        {/* Phone and tablet */}
        <div className="grid h-[60px] grid-cols-3 items-center px-5 sm:px-8 lg:hidden">
          <button
            type="button"
            className="cap justify-self-start py-3.5"
            aria-haspopup="dialog"
            onClick={() => drawer.current?.showModal()}
          >
            Menu
          </button>
          <Logotype className="justify-self-center" />
          <a href={business.phoneHref} className="cap justify-self-end py-3.5">
            Call
          </a>
        </div>

        {/* Desktop */}
        <div className="shell hidden h-[76px] grid-cols-[1fr_auto_1fr] items-center lg:grid">
          <nav aria-label="Main" className="flex gap-9">
            {primary.slice(0, 3).map((l) => (
              <Link
                key={l.href}
                href={l.href}
                aria-current={isActive(l.href) ? "page" : undefined}
                className={`cap py-2 hover:text-brass-dark ${isActive(l.href) ? "border-b border-ink" : ""}`}
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <Logotype />
          <div className="flex items-center justify-end gap-9">
            {primary.slice(3, 5).map((l) => (
              <Link
                key={l.href}
                href={l.href}
                aria-current={isActive(l.href) ? "page" : undefined}
                className={`cap py-2 hover:text-brass-dark ${isActive(l.href) ? "border-b border-ink" : ""}`}
              >
                {l.label}
              </Link>
            ))}
            <BookButton className="btn-book min-h-[42px] px-6">Book</BookButton>
          </div>
        </div>
      </header>

      <dialog
        ref={drawer}
        aria-label="Menu"
        className="m-0 h-[100dvh] max-h-none w-full max-w-none overflow-y-auto bg-porcelain p-0 text-ink backdrop:bg-ink/40"
        onClick={(e) => {
          if ((e.target as HTMLElement).closest("a")) drawer.current?.close();
        }}
      >
        <div className="grid h-[60px] grid-cols-3 items-center border-b border-line-soft px-5 sm:px-8">
          <button type="button" className="cap justify-self-start py-3.5" onClick={() => drawer.current?.close()}>
            Close
          </button>
          <Logotype className="justify-self-center" />
          <a href={business.phoneHref} className="cap justify-self-end py-3.5">
            Call
          </a>
        </div>

        <nav aria-label="Main" className="px-5 pb-32 pt-6 sm:px-8">
          <ul className="border-t border-ink">
            {primary.map((l) => (
              <li key={l.href} className="border-b border-line py-4">
                <Link
                  href={l.href}
                  aria-current={isActive(l.href) ? "page" : undefined}
                  className="block font-display text-[1.75rem] leading-tight"
                >
                  {l.label}
                </Link>
                {l.sub && (
                  <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
                    {l.sub.map((s) => (
                      <li key={s.href}>
                        <Link href={s.href} className="note text-umber hover:text-ink">
                          {s.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>

          <div className="mt-10 grid grid-cols-2 gap-6">
            <div>
              <p className="cap">Spa</p>
              <p className="note mt-2">{hoursShort}</p>
            </div>
            <div>
              <p className="cap">Wellness</p>
              <p className="note mt-2">{wellnessHoursShort}</p>
            </div>
          </div>
          <p className="note mt-8">
            {business.address.street}, {business.address.city}, {business.address.state}
            <br />
            <a href={business.phoneHref} className="text-ink">
              {business.phone}
            </a>{" "}
            ·{" "}
            <a href={business.instagram} target="_blank" rel="noopener noreferrer" className="text-ink">
              {business.instagramHandle}
            </a>
          </p>
        </nav>
      </dialog>
    </>
  );
}
