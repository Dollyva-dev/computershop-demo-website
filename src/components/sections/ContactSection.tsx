export function ContactSection() {
  return (
    <section id="contact" className="w-full bg-white dark:bg-black">
      <div className="mx-auto w-full max-w-5xl px-6 py-16 sm:py-20">
        <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-white">Contact</h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-600 dark:text-zinc-400">
          Replace this block with your real contact details or a form.
        </p>
        <div className="mt-8 rounded-2xl border border-black/10 bg-zinc-50 p-6 dark:border-white/10 dark:bg-white/[0.04]">
          <dl className="grid gap-4 text-sm">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <dt className="font-medium text-black dark:text-white">Email</dt>
              <dd className="text-zinc-700 dark:text-zinc-300">hello@example.com</dd>
            </div>
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <dt className="font-medium text-black dark:text-white">Location</dt>
              <dd className="text-zinc-700 dark:text-zinc-300">Remote</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
