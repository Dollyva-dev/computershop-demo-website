export function Header() {
  return (
    <header className="sticky top-0 z-10 w-full border-b border-black/10 bg-white/80 backdrop-blur dark:border-white/10 dark:bg-black/60">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-4">
        <a href="#top" className="text-base font-semibold text-black dark:text-white">
          YourSite
        </a>
        <nav className="flex items-center gap-6 text-sm text-zinc-700 dark:text-zinc-200">
          <a className="hover:underline" href="#about">
            About
          </a>
          <a className="hover:underline" href="#features">
            Features
          </a>
          <a className="hover:underline" href="#contact">
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
}
