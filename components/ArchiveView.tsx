import Link from "next/link";
import SiteNav from "./SiteNav";
import SiteFooter from "./SiteFooter";
import type { ArchiveEntry, HomepageContent, SectionChip } from "../sanity/fetch";
import { categoryLabel, formatLongDate, weekLabel } from "../lib/format";

export default function ArchiveView({
  entries,
  chips,
  homepage,
  activeSection,
}: {
  entries: ArchiveEntry[];
  chips: SectionChip[];
  homepage: HomepageContent;
  activeSection: string | null;
}) {
  const activeChip = activeSection
    ? chips.find((c) => c.slug === activeSection || c.category === activeSection)
    : null;

  return (
    <>
      <SiteNav />

      <section className="border-b border-rule bg-paper">
        <div className="mx-auto w-full max-w-[1350px] px-4 sm:px-7 pt-16 pb-10 text-center">
          <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
            Archive
          </div>
          <h1 className="mx-auto mt-3 max-w-3xl font-serif text-[clamp(28px,7vw,56px)] leading-[1.1] tracking-[-0.022em] text-ink wrap-break-word">
            {activeChip
              ? `${activeChip.label} - every entry, dated`
              : "Every claim sourced. Every entry dated."}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-[16px] leading-7 text-ink-3">
            This archive compounds. Each dated entry has its own page, builds its own search
            authority, and together they become a readable record of the field as it moves.
          </p>
        </div>
      </section>

      <section className="border-b border-rule bg-paper-2/40">
        <div className="mx-auto w-full max-w-[1350px] px-4 sm:px-7 py-6">
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="/archive"
              className={`inline-flex items-center rounded-full border px-3.5 py-1.5 text-[12.5px] transition-colors ${
                activeSection
                  ? "border-rule bg-paper text-ink-2 hover:border-accent hover:bg-accent-soft hover:text-accent-deep"
                  : "border-ink bg-ink text-paper"
              }`}
            >
              All entries
            </Link>
            {chips.map((c) => (
              <Link
                key={c.slug}
                href={`/archive?section=${c.slug}`}
                className={`inline-flex items-center rounded-full border px-3.5 py-1.5 text-[12.5px] transition-colors ${
                  activeSection === c.slug
                    ? "border-ink bg-ink text-paper"
                    : "border-rule bg-paper text-ink-2 hover:border-accent hover:bg-accent-soft hover:text-accent-deep"
                }`}
              >
                {c.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto w-full max-w-[1350px] px-4 sm:px-7 py-16">
          <div className="mb-6 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.18em] text-ink-3">
            <span>
              {entries.length} {entries.length === 1 ? "entry" : "entries"}
            </span>
            <span>Newest first</span>
          </div>

          {entries.length === 0 ? (
            <div className="rounded-lg border border-rule bg-paper-2/40 px-6 py-12 text-center font-serif text-[20px] text-ink-3">
              Nothing in this section yet.
            </div>
          ) : (
            <div className="overflow-x-auto rounded-lg border border-rule">
              <table className="w-full divide-y divide-rule">
                <thead className="bg-paper-2/60 font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-3">
                  <tr>
                    <th className="px-3 py-3 sm:px-5 text-left font-medium">When</th>
                    <th className="px-3 py-3 sm:px-5 text-left font-medium">Title</th>
                    <th className="hidden px-3 py-3 sm:px-5 text-left font-medium md:table-cell">
                      Section
                    </th>
                    <th className="hidden px-3 py-3 sm:px-5 text-left font-medium sm:table-cell">
                      Type
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-rule text-[14.5px]">
                  {entries.map((e) => {
                    const href = e.kind === "roundup" ? `/news/${e.slug}` : `/picks/${e.slug}`;
                    const section =
                      e.kind === "roundup" ? categoryLabel(e.category) : "Editor's pick";
                    return (
                      <tr
                        key={`${e.kind}-${e.slug}`}
                        className="bg-paper transition-colors hover:bg-paper-2/40"
                      >
                        <td className="whitespace-nowrap px-3 py-4 sm:px-5 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-3">
                          <div>{weekLabel(e.week)}</div>
                          <div className="mt-1 text-ink-4">{formatLongDate(e.publishedAt)}</div>
                        </td>
                        <td className="px-3 py-4 sm:px-5">
                          <Link
                            href={href}
                            className="font-serif text-[17px] text-ink transition-colors hover:text-accent"
                          >
                            {e.kind === "roundup" ? e.title : e.title}
                          </Link>
                          {e.kind === "roundup" ? (
                            <p className="mt-1 text-[13.5px] leading-6 text-ink-3">{e.summary}</p>
                          ) : (
                            <p className="mt-1 text-[13.5px] leading-6 text-ink-3 italic">
                              {e.deck}
                            </p>
                          )}
                        </td>
                        <td className="hidden whitespace-nowrap px-3 py-4 sm:px-5 text-ink-3 md:table-cell">
                          {section}
                        </td>
                        <td className="hidden whitespace-nowrap px-3 py-4 sm:px-5 font-mono text-[11px] uppercase tracking-[0.14em] sm:table-cell">
                          <span
                            className={
                              e.kind === "pick"
                                ? "rounded-md bg-accent-soft px-2 py-1 text-accent-deep"
                                : "rounded-md bg-paper-2 px-2 py-1 text-ink-3"
                            }
                          >
                            {e.kind === "pick" ? "Pick" : "Roundup"}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>

      <SiteFooter homepage={homepage} />
    </>
  );
}
