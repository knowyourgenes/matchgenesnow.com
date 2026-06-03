import Link from "next/link";

const NAV_LINKS: { label: string; href: string }[] = [
  { label: "This week", href: "/#this-week" },
  { label: "Editor's picks", href: "/#editors-pick" },
  { label: "Archive", href: "/archive" },
  { label: "Newsletter", href: "/#newsletter" },
];

export default function SiteNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-page items-center justify-between gap-3 px-4 py-4 sm:gap-6 sm:px-7">
        <Link href="/" aria-label="matchgenesnow.com" className="flex items-center gap-3">
          <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-md bg-ink">
            <span className="font-serif text-lg font-semibold text-paper">m</span>
            <span className="absolute -right-1 -top-1 inline-flex h-3 w-3 items-center justify-center rounded-full bg-accent" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-serif text-[18px] tracking-tight text-ink">matchgenesnow</span>
            <span className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
              .com
            </span>
          </span>
        </Link>
        <nav className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-[13.5px] font-medium text-ink-2 transition-colors hover:text-accent"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/#newsletter"
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-ink px-3.5 py-2 text-[13px] font-medium text-paper transition-colors hover:bg-accent-deep sm:px-4"
        >
          Subscribe
          <span aria-hidden className="hidden sm:inline">
            →
          </span>
        </Link>
      </div>
    </header>
  );
}
