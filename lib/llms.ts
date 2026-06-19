// Shared generators for /llms.txt and /llms-full.txt (see https://llmstxt.org).
//
// buildLlmsTxt()      -> concise markdown index of the whole site.
// buildLlmsFullTxt()  -> same structure but with full article bodies inlined.
//
// Both build absolute URLs from siteConfig.siteUrl and pull content from the
// existing Sanity-backed fetch layer (which falls back to seed data offline).

import { siteConfig } from "./siteConfig";
import { categoryLabel, formatLongDate } from "./format";
import {
  getAllRoundupItems,
  getEditorsPickBySlug,
  getEditorsPickSlugs,
  getHomepageData,
} from "../sanity/fetch";

// ---------- URL + text helpers ----------

/** Absolute URL from a site-root path. */
function abs(path: string): string {
  const base = siteConfig.siteUrl.replace(/\/$/, "");
  return path.startsWith("/") ? `${base}${path}` : `${base}/${path}`;
}

/** Strip a trailing " | Brand" / " - Brand" / " · Brand" suffix off meta titles. */
export function cleanTitle(title: string): string {
  return title.replace(/\s+[|·\-–—]\s+[^|·\-–—]*$/, "").trim() || title.trim();
}

// ---------- Portable Text -> markdown ----------
// Generic serializer for Sanity Portable Text. Handles headings, lists,
// blockquotes and paragraphs with bold/italic marks; images and embeds are
// skipped. `headingOffset` demotes body headings so they nest under the
// article title (pass 2 to push h1->h3, h2->h4, ...).

type PTSpan = { _type?: string; text?: string; marks?: string[] };
type PTBlock = {
  _type?: string;
  style?: string;
  listItem?: string;
  level?: number;
  children?: PTSpan[];
};

function serializeSpans(children: PTSpan[] | undefined): string {
  if (!Array.isArray(children)) return "";
  return children
    .map((span) => {
      let text = span?.text ?? "";
      if (!text) return "";
      const marks = span.marks ?? [];
      if (marks.includes("strong")) text = `**${text}**`;
      if (marks.includes("em")) text = `*${text}*`;
      return text;
    })
    .join("");
}

export function portableTextToMarkdown(blocks: unknown, headingOffset = 0): string {
  if (!Array.isArray(blocks)) return "";
  const out: string[] = [];

  for (const block of blocks as PTBlock[]) {
    if (!block || block._type !== "block") continue; // skip images/embeds/etc.
    const text = serializeSpans(block.children).trim();
    if (!text) continue;

    const style = block.style ?? "normal";

    if (/^h[1-6]$/.test(style)) {
      const level = Math.min(6, parseInt(style.slice(1), 10) + headingOffset);
      out.push(`${"#".repeat(level)} ${text}`);
    } else if (style === "blockquote") {
      out.push(`> ${text}`);
    } else if (block.listItem === "bullet") {
      out.push(`- ${text}`);
    } else if (block.listItem === "number") {
      out.push(`1. ${text}`);
    } else {
      out.push(text);
    }
  }

  return out.join("\n\n");
}

// ---------- llms.txt (concise index) ----------

export async function buildLlmsTxt(): Promise<string> {
  const [homepageData, news, pickSlugs] = await Promise.all([
    getHomepageData(),
    getAllRoundupItems(),
    getEditorsPickSlugs(),
  ]);

  const summary =
    homepageData.homepage?.footerMission?.trim() ||
    homepageData.homepage?.heroSubhead?.trim() ||
    siteConfig.description;

  const lines: string[] = [];
  lines.push(`# ${siteConfig.siteName}`);
  lines.push("");
  lines.push(`> ${summary}`);
  lines.push("");

  lines.push("## Key Pages");
  lines.push(`- [Home](${abs("/")}): The weekly genetics newsroom, with the India angle.`);
  lines.push(
    `- [Archive](${abs("/archive")}): Every roundup and editor's pick, dated and individually linkable.`,
  );
  lines.push("");

  if (news.length) {
    lines.push("## News");
    for (const item of news) {
      lines.push(`- [${cleanTitle(item.title)}](${abs(`/news/${item.slug}`)}): ${item.summary}`);
    }
    lines.push("");
  }

  // Editor's picks. The list query returns summaries only; the deck is the
  // excerpt, so no extra fetch is needed for the concise index.
  const picks = (await Promise.all(pickSlugs.map((slug) => getEditorsPickBySlug(slug)))).filter(
    (p): p is NonNullable<typeof p> => Boolean(p),
  );

  if (picks.length) {
    lines.push("## Picks");
    for (const pick of picks) {
      lines.push(`- [${cleanTitle(pick.title)}](${abs(`/picks/${pick.slug}`)}): ${pick.deck}`);
    }
    lines.push("");
  }

  return lines.join("\n").trim() + "\n";
}

// ---------- llms-full.txt (full content inlined) ----------

export async function buildLlmsFullTxt(): Promise<string> {
  const [homepageData, news, pickSlugs] = await Promise.all([
    getHomepageData(),
    getAllRoundupItems(),
    getEditorsPickSlugs(),
  ]);

  const summary =
    homepageData.homepage?.footerMission?.trim() ||
    homepageData.homepage?.heroSubhead?.trim() ||
    siteConfig.description;

  const lines: string[] = [];
  lines.push(`# ${siteConfig.siteName}`);
  lines.push("");
  lines.push(`> ${summary}`);
  lines.push("");

  lines.push("## Key Pages");
  lines.push(`- [Home](${abs("/")})`);
  lines.push(`- [Archive](${abs("/archive")})`);
  lines.push("");

  // Full news bodies. Roundup items carry the lift-ready summary plus a
  // "why it matters" paragraph; both are plain prose already.
  if (news.length) {
    lines.push("## News");
    lines.push("");
    for (const item of news) {
      lines.push(`### ${cleanTitle(item.title)}`);
      lines.push(`URL: ${abs(`/news/${item.slug}`)}`);
      lines.push(`Category: ${categoryLabel(item.category)}`);
      const published = formatLongDate(item.publishedAt);
      if (published) lines.push(`Published: ${published}`);
      lines.push("");
      if (item.summary) {
        lines.push(item.summary);
        lines.push("");
      }
      if (item.whyItMatters) {
        lines.push("#### Why it matters");
        lines.push("");
        lines.push(item.whyItMatters);
        lines.push("");
      }
      if (item.sourceUrl) {
        lines.push(`Source: ${item.sourceUrl}`);
        lines.push("");
      }
    }
  }

  // Full editor's pick bodies. getEditorsPickBySlug returns the body already
  // flattened into paragraphs; fetched in parallel and kept in list order.
  const picks = (await Promise.all(pickSlugs.map((slug) => getEditorsPickBySlug(slug)))).filter(
    (p): p is NonNullable<typeof p> => Boolean(p),
  );

  if (picks.length) {
    lines.push("## Picks");
    lines.push("");
    for (const pick of picks) {
      lines.push(`### ${cleanTitle(pick.title)}`);
      lines.push(`URL: ${abs(`/picks/${pick.slug}`)}`);
      const published = formatLongDate(pick.publishedAt);
      if (published) lines.push(`Published: ${published}`);
      lines.push("");
      if (pick.deck) {
        lines.push(pick.deck);
        lines.push("");
      }
      if (pick.body.length) {
        lines.push(pick.body.join("\n\n"));
        lines.push("");
      }
      if (pick.sources?.length) {
        lines.push("#### Sources");
        lines.push("");
        for (const src of pick.sources) {
          lines.push(`- ${src}`);
        }
        lines.push("");
      }
    }
  }

  return lines.join("\n").trim() + "\n";
}
