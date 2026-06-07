export function HeroSection() {
  return (
    <section className="w-full bg-zinc-50 dark:bg-black">
      <div className="mx-auto w-full max-w-5xl px-6 py-20 sm:py-28">
        <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Static one-page template</p>
        <h1 className="mt-4 max-w-2xl text-balance text-4xl font-semibold tracking-tight text-black dark:text-white sm:text-5xl">
          Launch your next project faster.
        </h1>
        <p className="mt-5 max-w-2xl text-pretty text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          A clean, minimal Next.js + Tailwind starter with a header, footer, and section-based structure.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href="#features"
            className="inline-flex h-11 items-center justify-center rounded-full bg-black px-6 text-sm font-medium text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90"
          >
            See features
          </a>
          <a
            href="#contact"
            className="inline-flex h-11 items-center justify-center rounded-full border border-black/15 bg-white px-6 text-sm font-medium text-black hover:bg-black/[0.04] dark:border-white/15 dark:bg-black dark:text-white dark:hover:bg-white/[0.06]"
          >
            Contact
          </a>
        </div>
      </div>
    </section>
  );
}
