const features = [
  {
    title: "Simple structure",
    description: "Header + sections + footer, all in predictable folders.",
  },
  {
    title: "Tailwind-ready",
    description: "Works out of the box with the default Tailwind setup.",
  },
  {
    title: "Template-friendly",
    description: "Duplicate the repo and swap content without touching routing.",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="w-full bg-zinc-50 dark:bg-black">
      <div className="mx-auto w-full max-w-5xl px-6 py-16 sm:py-20">
        <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-white">Features</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-black"
            >
              <h3 className="text-base font-semibold text-black dark:text-white">{feature.title}</h3>
              <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
