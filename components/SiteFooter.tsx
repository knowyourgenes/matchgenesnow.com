import Link from "next/link";
import type { HomepageContent } from "../sanity/fetch";

export default function SiteFooter({ homepage }: { homepage: HomepageContent }) {
  return (
    <footer className="border-t border-rule bg-paper-2/60">
      <div className="mx-auto w-full max-w-page px-4 sm:px-7 pb-10 pt-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3">
              <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-md bg-ink">
                <span className="font-serif text-lg font-semibold text-paper">m</span>
                <span className="absolute -right-1 -top-1 inline-flex h-3 w-3 items-center justify-center rounded-full bg-accent" />
              </span>
              <span className="font-serif text-[20px] text-ink">matchgenesnow.com</span>
            </div>
            <p className="mt-4 max-w-md text-[14.5px] leading-7 text-ink-3">
              {homepage.footerMission}
            </p>
          </div>

          <div>
            <div className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-ink-4">
              Browse
            </div>
            <ul className="mt-4 space-y-2.5 text-[14px] text-ink-2">
              <li>
                <Link href="/#this-week" className="transition-colors hover:text-accent">
                  This week
                </Link>
              </li>
              <li>
                <Link href="/#editors-pick" className="transition-colors hover:text-accent">
                  Editor&apos;s picks
                </Link>
              </li>
              <li>
                <Link href="/archive" className="transition-colors hover:text-accent">
                  Archive
                </Link>
              </li>
              <li>
                <Link href="/#newsletter" className="transition-colors hover:text-accent">
                  Newsletter
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <div className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-ink-4">
              About
            </div>
            <ul className="mt-4 space-y-2.5 text-[14px] text-ink-2">
              <li>
                <Link href="/studio" className="transition-colors hover:text-accent">
                  Studio
                </Link>
              </li>
              <li>
                <Link href="/#how-this-works" className="transition-colors hover:text-accent">
                  How this works
                </Link>
              </li>
              <li>
                <Link href="/#editorial-standard" className="transition-colors hover:text-accent">
                  Editorial standard
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-rule pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-[12px] text-ink-4">
            © {new Date().getFullYear()} matchgenesnow.com · Free, ad-free, sourced.
          </div>
          <div className="text-[12px] text-ink-4">
            Every claim is linked to its source. We name hype as hype.
          </div>
        </div>
      </div>
    </footer>
  );
}
