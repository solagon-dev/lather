"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import BookChoices from "@/components/site/BookChoices";

/** Fired by every BookButton; the one sheet in the layout listens for it. */
const OPEN_EVENT = "lather:book";

/**
 * "What would you like to book?" A bottom sheet on a phone, a panel on a
 * desktop. A native <dialog> opened with showModal(), so the browser supplies
 * the focus trap, Escape to close and the inert page underneath.
 */
export default function BookSheet() {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const open = () => ref.current?.showModal();
    document.addEventListener(OPEN_EVENT, open);
    return () => document.removeEventListener(OPEN_EVENT, open);
  }, []);

  return (
    <dialog
      ref={ref}
      aria-labelledby="book-title"
      onClick={(e) => {
        if (e.target === ref.current) ref.current.close();
      }}
      className="book-sheet m-0 mt-auto max-h-[92dvh] w-full max-w-none overflow-y-auto bg-porcelain p-0 text-ink backdrop:bg-ink/55 sm:m-auto sm:w-[30rem]"
    >
      <div className="px-5 pb-[calc(1.5rem+env(safe-area-inset-bottom))] pt-3.5 sm:px-8 sm:pb-8 sm:pt-8">
        <div aria-hidden className="mx-auto mb-5 h-[3px] w-9 bg-line-sand sm:hidden" />
        <h2 id="book-title" className="font-display text-[1.625rem] leading-tight">
          What would you like to book?
        </h2>
        <p className="note mt-1.5 text-umber">Lather is two practices under one roof, each with its own calendar.</p>
        <div className="mt-6">
          <BookChoices />
        </div>
        <button
          type="button"
          onClick={() => ref.current?.close()}
          className="cap mt-5 block min-h-[48px] w-full border border-line-sand hover:border-ink"
        >
          Close
        </button>
      </div>
    </dialog>
  );
}

/**
 * A Book control. It is a real link to /book, so it works before hydration
 * and without JavaScript; once the page is live it opens the sheet instead.
 */
export function BookButton({ className = "", children = "Book" }: { className?: string; children?: ReactNode }) {
  return (
    <a
      href="/book"
      className={className}
      aria-haspopup="dialog"
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        e.preventDefault();
        document.dispatchEvent(new Event(OPEN_EVENT));
      }}
    >
      {children}
    </a>
  );
}
