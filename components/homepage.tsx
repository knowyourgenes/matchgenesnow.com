import Link from "next/link";
import type {
  EditorsPick,
  EditorsPickSummary,
  HomepageContent,
  RoundupItem,
  SectionChip,
} from "../sanity/fetch";
import { categoryLabel, formatLongDate, formatShortDate, weekLabel } from "../lib/format";
import SiteNav from "./SiteNav";
import SiteFooter from "./SiteFooter";

export type HomepageProps = {
  homepage: HomepageContent;
  chips: SectionChip[];
  thisWeek: RoundupItem[];
  featuredPick: EditorsPick | null;
  recentPicks: EditorsPickSummary[];
  issueDate: string;
};

export default function Homepage({
  homepage,
  chips,
  thisWeek,
  featuredPick,
  recentPicks,
  issueDate,
}: HomepageProps) {
  return (
    <>
      <SiteNav />

      {/* HERO */}
      <section className="border-b border-rule bg-paper">
        <div className="mx-auto w-full max-w-[1350px] px-4 sm:px-7 pt-20 pb-14">
          <div className="flex flex-col items-start gap-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-rule bg-paper-2 px-3 py-1 font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-3">
              <span className="inline-block h-2 w-2 rounded-full bg-accent" />
              {homepage.heroEyebrow}
            </div>
            <h1 className="font-serif text-[clamp(30px,8vw,80px)] leading-[1.05] tracking-[-0.025em] text-ink wrap-break-word">
              {homepage.heroHeadline}
            </h1>
            <p className="max-w-3xl text-[18px] leading-8 text-ink-3">{homepage.heroSubhead}</p>

            <div className="mt-2 flex flex-wrap items-center gap-3">
              <a
                href="#this-week"
                className="inline-flex items-center gap-2 rounded-full bg-ink px-3 py-3 sm:px-5 text-[14.5px] font-medium text-paper transition-all hover:-translate-y-0.5 hover:bg-accent-deep"
              >
                {homepage.heroPrimaryCta}
                <span aria-hidden>→</span>
              </a>
              <a
                href="#newsletter"
                className="inline-flex items-center gap-2 rounded-full border border-paper-3 bg-paper px-3 py-3 sm:px-5 text-[14.5px] font-medium text-ink transition-colors hover:border-ink"
              >
                {homepage.heroSecondaryCta}
              </a>
            </div>

            <div className="mt-10 flex w-full flex-wrap items-center gap-x-8 gap-y-3 border-t border-rule pt-6 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-3">
              {homepage.trustStrip.map((t, i) => (
                <span key={i} className="inline-flex items-center gap-2">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-marker" />
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION CHIPS */}
      <section className="border-b border-rule bg-paper-2/40">
        <div className="mx-auto w-full max-w-[1350px] px-4 sm:px-7 py-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-2 font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-4">
              Sections ·
            </span>
            {chips.map((c) => (
              <Link
                key={c.slug}
                href={`/archive?section=${c.slug}`}
                className="inline-flex items-center rounded-full border border-rule bg-paper px-3.5 py-1.5 text-[12.5px] text-ink-2 transition-colors hover:border-accent hover:bg-accent-soft hover:text-accent-deep"
              >
                {c.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* THIS WEEK'S ROUNDUP */}
      <section id="this-week" className="border-b border-rule bg-paper">
        <div className="mx-auto w-full max-w-[1350px] px-4 sm:px-7 py-20">
          <div className="mb-10 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-accent">
                This week&apos;s roundup
              </div>
              <h2 className="mt-2 font-serif text-[clamp(26px,6vw,44px)] leading-tight tracking-[-0.018em] text-ink">
                The week in genetics
              </h2>
            </div>
            <div className="text-right font-mono text-[11px] uppercase tracking-[0.18em] text-ink-3">
              <div>Issue · {issueDate}</div>
              <div className="mt-1 text-ink-4">
                {thisWeek.length} {thisWeek.length === 1 ? "item" : "items"}
              </div>
            </div>
          </div>

          <ol className="grid gap-x-12 gap-y-12 md:grid-cols-2">
            {thisWeek.map((r, i) => (
              <li key={r.slug} className="flex flex-col gap-3">
                <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.15em] text-ink-4">
                  <span className="inline-flex items-center justify-center rounded-md border border-rule bg-paper-2 px-2 py-0.5 text-ink-2">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-accent">{categoryLabel(r.category)}</span>
                  <span className="text-ink-4">·</span>
                  <span>{formatShortDate(r.publishedAt)}</span>
                </div>
                <Link
                  href={`/news/${r.slug}`}
                  className="font-serif text-[22px] leading-[1.25] tracking-[-0.01em] text-ink transition-colors hover:text-accent sm:text-[24px]"
                >
                  {r.title}
                </Link>
                <p className="text-[15px] leading-7 text-ink-2">{r.summary}</p>
                <div className="rounded-md border-l-2 border-accent bg-paper-2/60 px-4 py-3 text-[14px] leading-6 text-ink-3">
                  <div className="mb-1 font-mono text-[10px] uppercase tracking-[0.16em] text-accent-deep">
                    Why it matters
                  </div>
                  {r.whyItMatters}
                </div>
                <div className="flex items-center justify-between gap-3 pt-1 text-[12.5px]">
                  <Link
                    href={`/news/${r.slug}`}
                    className="inline-flex items-center gap-1.5 font-medium text-accent transition-all hover:gap-2.5"
                  >
                    Read full item
                    <span aria-hidden>→</span>
                  </Link>
                  {r.sourceUrl ? (
                    <a
                      href={r.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink-3 transition-colors hover:text-ink"
                    >
                      Open source ↗
                    </a>
                  ) : null}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* HOW THIS WORKS */}
      <section id="how-this-works" className="border-b border-rule bg-paper-2/50">
        <div className="mx-auto grid w-full max-w-[1350px] gap-10 px-4 sm:px-7 py-16 md:grid-cols-[1fr_2fr]">
          <div>
            <div className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-accent">
              How this works
            </div>
            <h2 className="mt-2 font-serif text-[34px] leading-tight tracking-[-0.018em] text-ink">
              {homepage.howThisWorksTitle}
            </h2>
          </div>
          <p className="max-w-3xl text-[16.5px] leading-8 text-ink-2">
            {homepage.howThisWorksBody}
          </p>
        </div>
      </section>

      {/* EDITOR'S PICK */}
      {featuredPick ? (
        <section id="editors-pick" className="border-b border-rule bg-paper">
          <div className="mx-auto w-full max-w-[1350px] px-4 sm:px-7 py-20">
            <div className="mb-10 flex items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 font-mono text-[10.5px] uppercase tracking-[0.18em] text-paper">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-marker" />
                Editor&apos;s pick
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-3">
                {weekLabel(featuredPick.week)} · {formatLongDate(featuredPick.publishedAt)}
              </span>
            </div>

            <div className="grid gap-12 lg:grid-cols-[2fr_1fr]">
              <article className="flex flex-col gap-6">
                <h2 className="font-serif text-[clamp(26px,6vw,52px)] leading-[1.1] tracking-[-0.02em] text-ink wrap-break-word">
                  {featuredPick.title}
                </h2>
                <p className="font-serif text-[20px] leading-8 text-ink-2 italic">
                  {featuredPick.deck}
                </p>
                <div className="space-y-5 text-[16.5px] leading-8 text-ink-2">
                  {featuredPick.body.slice(0, 4).map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
                <div className="pt-3">
                  <Link
                    href={`/picks/${featuredPick.slug}`}
                    className="inline-flex items-center gap-2 rounded-full bg-ink px-3 py-3 sm:px-5 text-[14px] font-medium text-paper transition-all hover:-translate-y-0.5 hover:bg-accent-deep"
                  >
                    Read the full pick
                    <span aria-hidden>→</span>
                  </Link>
                </div>
              </article>

              <aside className="flex flex-col gap-5">
                {featuredPick.sources.length > 0 ? (
                  <div className="rounded-lg border border-rule bg-paper-2/60 p-5">
                    <div className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-3">
                      Sources to verify
                    </div>
                    <ul className="mt-3 space-y-2 text-[13.5px] leading-6 text-ink-2">
                      {featuredPick.sources.map((s, i) => (
                        <li key={i} className="flex gap-2">
                          <span className="text-accent" aria-hidden>
                            ·
                          </span>
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
                {recentPicks.length > 1 ? (
                  <div className="rounded-lg border border-rule bg-paper-2/60 p-5">
                    <div className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-3">
                      Recent picks
                    </div>
                    <ul className="mt-3 space-y-3 text-[14px] leading-6">
                      {recentPicks
                        .filter((p) => p.slug !== featuredPick.slug)
                        .map((p) => (
                          <li key={p.slug}>
                            <Link
                              href={`/picks/${p.slug}`}
                              className="block text-ink-2 transition-colors hover:text-accent"
                            >
                              {p.title}
                              <span className="mt-1 block font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink-4">
                                {weekLabel(p.week)} · {formatShortDate(p.publishedAt)}
                              </span>
                            </Link>
                          </li>
                        ))}
                    </ul>
                  </div>
                ) : null}
              </aside>
            </div>
          </div>
        </section>
      ) : null}

      {/* ARCHIVE PREVIEW */}
      <section className="border-b border-rule bg-paper">
        <div className="mx-auto w-full max-w-[1350px] px-4 sm:px-7 py-20">
          <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-accent">
                Archive
              </div>
              <h2 className="mt-2 font-serif text-[clamp(28px,4vw,40px)] leading-tight tracking-[-0.018em] text-ink">
                Recent picks - every claim sourced
              </h2>
              <p className="mt-2 max-w-2xl text-[15px] leading-7 text-ink-3">
                Every roundup and editor&apos;s pick lives here permanently, dated and individually
                linkable. Each entry compounds search authority and becomes part of a readable
                record of the field.
              </p>
            </div>
            <Link
              href="/archive"
              className="inline-flex items-center gap-2 self-start text-[13.5px] font-medium text-accent transition-all hover:gap-3"
            >
              See the full archive
              <span aria-hidden>→</span>
            </Link>
          </div>

          <div className="overflow-x-auto rounded-lg border border-rule">
            <table className="w-full divide-y divide-rule">
              <thead className="bg-paper-2/60 font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-3">
                <tr>
                  <th className="px-3 py-3 sm:px-5 text-left font-medium">When</th>
                  <th className="px-3 py-3 sm:px-5 text-left font-medium">Title</th>
                  <th className="hidden px-3 py-3 sm:px-5 text-left font-medium sm:table-cell">
                    Type
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-rule text-[14.5px]">
                {recentPicks.map((p) => (
                  <tr
                    key={`pick-${p.slug}`}
                    className="bg-paper transition-colors hover:bg-paper-2/40"
                  >
                    <td className="whitespace-nowrap px-3 py-4 sm:px-5 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-3">
                      {weekLabel(p.week)}
                    </td>
                    <td className="px-3 py-4 sm:px-5">
                      <Link
                        href={`/picks/${p.slug}`}
                        className="font-serif text-[17px] text-ink transition-colors hover:text-accent"
                      >
                        {p.title}
                      </Link>
                    </td>
                    <td className="hidden whitespace-nowrap px-3 py-4 sm:px-5 text-ink-3 sm:table-cell">
                      Editor&apos;s pick
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section id="newsletter" className="bg-paper-2/60">
        <div className="mx-auto w-full max-w-[760px] px-4 sm:px-7 py-24 text-center">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-ink text-paper">
            <span aria-hidden>✉</span>
          </div>
          <h2 className="mt-6 font-serif text-[clamp(28px,4vw,42px)] leading-tight tracking-[-0.018em] text-ink">
            {homepage.newsletterTitle}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[16px] leading-7 text-ink-3">
            {homepage.newsletterBody}
          </p>
          <form
            className="mx-auto mt-8 flex max-w-md flex-col gap-2 sm:flex-row"
            aria-label="Subscribe to the weekly briefing"
          >
            <input
              type="email"
              required
              placeholder="your@email.com"
              aria-label="Email address"
              className="flex-1 rounded-full border border-paper-3 bg-paper px-3 py-3 sm:px-5 text-[14.5px] text-ink outline-none transition-all focus:border-accent focus:shadow-[0_0_0_4px_rgba(180,53,28,0.12)]"
            />
            <button
              type="submit"
              className="rounded-full bg-ink px-6 py-3 text-[14px] font-medium text-paper transition-colors hover:bg-accent-deep"
            >
              Subscribe
            </button>
          </form>
          <div className="mt-4 text-[12.5px] text-ink-4">{homepage.newsletterSmallprint}</div>
        </div>
      </section>

      <SiteFooter homepage={homepage} />
    </>
  );
}
