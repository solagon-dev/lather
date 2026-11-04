import { BookButton } from "@/components/site/BookSheet";

/**
 * One booking bar, pinned to the bottom of every phone screen. Desktop has
 * the Book button in the header instead.
 */
export default function BookBar() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-30 border-t border-line-soft bg-porcelain px-3 pt-2.5 lg:hidden"
      style={{ paddingBottom: "calc(0.875rem + env(safe-area-inset-bottom))" }}
    >
      <BookButton className="btn-book w-full">Book an appointment</BookButton>
    </div>
  );
}
