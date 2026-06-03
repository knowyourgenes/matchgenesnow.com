import Link from "next/link";
import SiteNav from "./SiteNav";
import SiteFooter from "./SiteFooter";
import type { HomepageContent, RoundupItemWithRelated } from "../sanity/fetch";
import { categoryLabel, formatLongDate, weekLabel } from "../lib/format";

export default function NewsItemView({
  item,
  homepage,
}: {
  item: RoundupItemWithRelated;
  homepage: HomepageContent;
}) {
  return (
    <>
      <SiteNav />

      <article className="mx-auto w-full max-w-page px-4 sm:px-7 pt-16 pb-24">
        <div className="mb-8 flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-3">
          <Link href="/" className="transition-colors hover:text-accent">
            ← Back to this week
          </Link>
          <span className="text-ink-4">·</span>
          <Link
            href={`/archive?section=${item.category}`}
            className="text-accent transition-colors hover:text-accent-deep"
          >
            {categoryLabel(item.category)}
          </Link>
          <span className="text-ink-4">·</span>
          <span>{weekLabel(item.week)}</span>
        </div>

        <h1 className="font-serif text-[clamp(28px,7vw,60px)] leading-[1.08] tracking-[-0.022em] text-ink wrap-break-word">
          {item.title}
        </h1>

        <div className="mt-6 flex flex-wrap items-center gap-4 border-b border-rule pb-6 text-[13px] text-ink-3">
          <span className="font-mono uppercase tracking-[0.14em]">
            Published · {formatLongDate(item.publishedAt)}
          </span>
        </div>

        <p className="mt-10 font-serif text-[22px] leading-[1.55] text-ink-2 italic">
          {item.summary}
        </p>

        <div className="mt-10 rounded-lg border-l-[3px] border-accent bg-paper-2/60 px-6 py-6">
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent-deep">
            Why it matters
          </div>
          <p className="mt-3 text-[17.5px] leading-8 text-ink">{item.whyItMatters}</p>
        </div>

        {item.sourceUrl || item.sourceNote ? (
          <div className="mt-10 rounded-lg border border-rule bg-paper-2/40 px-6 py-5">
            <div className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-3">
              Source
            </div>
            {item.sourceUrl ? (
              <a
                href={item.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-2 text-[15px] font-medium text-accent transition-colors hover:text-accent-deep"
              >
                Open the primary source
                <span aria-hidden>↗</span>
              </a>
            ) : null}
            {item.sourceNote ? (
              <p className="mt-3 text-[13.5px] leading-6 text-ink-3">
                <span className="font-mono uppercase tracking-[0.12em]">Editorial note:</span>{" "}
                {item.sourceNote}
              </p>
            ) : null}
          </div>
        ) : null}

        {item.related.length > 0 ? (
          <section className="mt-20">
            <div className="mb-6 flex items-center gap-3">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-3">
                More in {categoryLabel(item.category)}
              </span>
              <span className="h-px flex-1 bg-rule" />
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {item.related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/news/${r.slug}`}
                  className="group flex flex-col gap-3 rounded-lg border border-rule bg-paper p-5 transition-all hover:-translate-y-0.5 hover:border-accent-soft hover:shadow-md"
                >
                  <div className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-accent-deep">
                    {categoryLabel(r.category)} · {weekLabel(r.week)}
                  </div>
                  <div className="font-serif text-[18px] leading-tight text-ink transition-colors group-hover:text-accent">
                    {r.title}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ) : null}
      </article>

      <SiteFooter homepage={homepage} />
    </>
  );
}
