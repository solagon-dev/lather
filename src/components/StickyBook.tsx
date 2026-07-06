"use client";

import { useEffect, useState } from "react";
import { BOOK_URL, business } from "@/lib/business";

/** Mobile-only booking bar that slides in after the visitor scrolls past the hero. */
export default function StickyBook() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 640);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 flex items-stretch border-t border-ivory/10 bg-noir transition-transform duration-500 ease-luxe lg:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <a
        href={business.phoneHref}
        className="flex flex-1 items-center justify-center py-4 text-[0.7rem] font-semibold uppercase tracking-kicker text-ivory/80"
      >
        Call Us
      </a>
      <a
        href={BOOK_URL}
        target="_blank"
        rel="noopener"
        className="flex flex-[2] items-center justify-center bg-ivory py-4 text-[0.7rem] font-semibold uppercase tracking-kicker text-ink"
      >
        Book Appointment
      </a>
    </div>
  );
}
