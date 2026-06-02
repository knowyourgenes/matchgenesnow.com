import Link from "next/link";
import SiteNav from "./SiteNav";
import SiteFooter from "./SiteFooter";
import type { EditorsPickWithRelated, HomepageContent } from "../sanity/fetch";
import { formatLongDate, weekLabel } from "../lib/format";

const HEADING_PATTERN = /^[A-Z][^.!?:]{4,60}$/;

function isHeading(line: string, index: number): boolean {
  if (index === 0) return false;
  if (!HEADING_PATTERN.test(line.trim())) return false;
  if (line.endsWith(".") || line.endsWith(",") || line.endsWith(":")) return false;
  return line.length < 80;
}

export default function PickView({
  pick,
  homepage,
}: {
  pick: EditorsPickWithRelated;
  homepage: HomepageContent;
}) {
  return (
    <>
      <SiteNav />

      <article className="mx-auto w-full max-w-[1350px] px-4 sm:px-7 pt-16 pb-24">
        <div className="mb-8 flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-3">
          <Link href="/" className="transition-colors hover:text-accent">
            ← Back home
          </Link>
          <span className="text-ink-4">·</span>
          <span className="text-accent">Editor&apos;s pick</span>
          <span className="text-ink-4">·</span>
          <span>{weekLabel(pick.week)}</span>
        </div>

        <h1 className="font-serif text-[clamp(28px,7vw,64px)] leading-[1.08] tracking-[-0.022em] text-ink wrap-break-word">
          {pick.title}
        </h1>

        <div className="mt-6 flex flex-wrap items-center gap-4 border-b border-rule pb-6 text-[13px] text-ink-3">
          <span className="font-mono uppercase tracking-[0.14em]">
            Published · {formatLongDate(pick.publishedAt)}
          </span>
        </div>

        <p className="mt-10 font-serif text-[22px] leading-[1.55] text-ink-2 italic">{pick.deck}</p>

        <div className="mt-10 space-y-6 text-[17.5px] leading-[1.85] text-ink-2">
          {pick.body.map((p, i) =>
            isHeading(p, i) ? (
              <h2
                key={i}
                className="mt-12 font-serif text-[26px] leading-tight tracking-[-0.012em] text-ink"
              >
                {p}
              </h2>
            ) : (
              <p key={i}>{p}</p>
            ),
          )}
        </div>

        {pick.sources.length > 0 ? (
          <div className="mt-16 rounded-lg border border-rule bg-paper-2/50 px-6 py-5">
            <div className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-3">
              Sources
            </div>
            <ul className="mt-3 space-y-2 text-[14px] leading-7 text-ink-2">
              {pick.sources.map((s, i) => (
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

        {pick.related.length > 0 ? (
          <section className="mt-20">
            <div className="mb-6 flex items-center gap-3">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-3">
                More from the editor
              </span>
              <span className="h-px flex-1 bg-rule" />
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {pick.related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/picks/${r.slug}`}
                  className="group flex flex-col gap-3 rounded-lg border border-rule bg-paper p-5 transition-all hover:-translate-y-0.5 hover:border-accent-soft hover:shadow-md"
                >
                  <div className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-accent-deep">
                    {weekLabel(r.week)} · {formatLongDate(r.publishedAt)}
                  </div>
                  <div className="font-serif text-[18px] leading-[1.25] text-ink transition-colors group-hover:text-accent">
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
