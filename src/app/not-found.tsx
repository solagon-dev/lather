import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[100svh] items-center justify-center bg-porcelain px-6 py-32 text-center">
      <div className="wrap">
        <h1 className="h-display mx-auto max-w-3xl text-balance text-4xl sm:text-5xl md:text-6xl">
          This page has <span className="italic">drifted off.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-umber">Let&rsquo;s get you back to stillness.</p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link href="/" className="btn-solid">
            Return Home
          </Link>
          <Link href="/services" className="btn-outline">
            Explore the Rituals
          </Link>
        </div>
      </div>
    </section>
  );
}
