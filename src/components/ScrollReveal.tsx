"use client";

import { useEffect } from "react";

export default function ScrollReveal() {
  useEffect(() => {
    const revealEls = Array.from(
      document.querySelectorAll<HTMLElement>(".reveal-section")
    );
    const staggerEls = Array.from(
      document.querySelectorAll<HTMLElement>(".stagger-children")
    );

    if (!revealEls.length && !staggerEls.length) return;

    document.body.classList.add("reveal-active");

    // Standard section entrance observer
    const revealObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );

    // Stagger children observer — lower threshold so cascade begins earlier
    const staggerObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            staggerObserver.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.06, rootMargin: "0px 0px -4% 0px" }
    );

    for (const el of revealEls) revealObserver.observe(el);
    for (const el of staggerEls) staggerObserver.observe(el);

    return () => {
      revealObserver.disconnect();
      staggerObserver.disconnect();
      document.body.classList.remove("reveal-active");
    };
  }, []);

  return null;
}
