export function Footer() {
  return (
    <footer className="w-full border-t border-black/10 bg-white dark:border-white/10 dark:bg-black">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-2 px-6 py-10 text-sm text-zinc-600 dark:text-zinc-400 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} YourSite. All rights reserved.</p>
        <p className="text-zinc-500 dark:text-zinc-500">Built with Next.js + Tailwind</p>
      </div>
    </footer>
  );
}
