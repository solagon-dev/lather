"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

/** Fired by every BookButton; the one dialog in the layout listens for it. */
const OPEN_EVENT = "lather:book";

/**
 * The "Spa or Wellness?" choice, as a modal.
 *
 * A native <dialog> opened with showModal(): the browser supplies the focus
 * trap, Escape to close, inert page underneath and the backdrop, which is the
 * part custom modals usually get wrong. Clicking the backdrop closes it too.
 */
export default function BookDialog({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const open = () => ref.current?.showModal();
    document.addEventListener(OPEN_EVENT, open);
    return () => document.removeEventListener(OPEN_EVENT, open);
  }, []);

  return (
    <dialog
      ref={ref}
      aria-labelledby="book-dialog-title"
      onClick={(e) => {
        // A click on the <dialog> element itself, not its content, is the backdrop.
        if (e.target === ref.current) ref.current.close();
      }}
      className="w-[min(46rem,calc(100vw-2rem))] max-h-[calc(100svh-2rem)] overflow-y-auto bg-ivory p-0 text-ink backdrop:bg-noir/60 backdrop:backdrop-blur-sm"
    >
      <div className="p-6 sm:p-10">
        <div className="flex items-start justify-between gap-6">
          <h2 id="book-dialog-title" className="font-display text-[clamp(1.75rem,4vw,2.5rem)] leading-tight">
            What would you like to book?
          </h2>
          <button
            type="button"
            onClick={() => ref.current?.close()}
            className="-mr-2 -mt-1 shrink-0 p-2 text-[0.75rem] tracking-[0.02em] text-umber hover:text-ink"
          >
            Close<span className="sr-only"> booking options</span>
          </button>
        </div>
        <div className="mt-8">{children}</div>
      </div>
    </dialog>
  );
}

/**
 * A Book control. It is a real link to /book, so it works before hydration
 * and without JavaScript; once the page is live it opens the dialog instead.
 */
export function BookButton({
  className = "",
  children = "Book",
  tabIndex,
  "aria-hidden": ariaHidden,
}: {
  className?: string;
  children?: ReactNode;
  tabIndex?: number;
  "aria-hidden"?: boolean;
}) {
  return (
    <a
      href="/book"
      className={className}
      tabIndex={tabIndex}
      aria-hidden={ariaHidden}
      aria-haspopup="dialog"
      onClick={(e) => {
        // Let modified clicks (new tab, etc.) behave like the link they are.
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        e.preventDefault();
        document.dispatchEvent(new Event(OPEN_EVENT));
      }}
    >
      {children}
    </a>
  );
}
