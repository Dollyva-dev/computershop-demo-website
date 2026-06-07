export function AboutSection() {
  return (
    <section id="about" className="w-full bg-white dark:bg-black">
      <div className="mx-auto w-full max-w-5xl px-6 py-16 sm:py-20">
        <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-white">About</h2>
        <p className="mt-4 max-w-3xl text-base leading-7 text-zinc-600 dark:text-zinc-400">
          Each section of this page lives in its own file under <span className="font-medium">src/components/sections</span>,
          so you can copy, delete, or rearrange sections when starting a new project.
        </p>
      </div>
    </section>
  );
}
