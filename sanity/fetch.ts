import { getClient } from "./client";
import { isSanityConfigured } from "./env";
import {
  archiveQuery,
  editorsPickBySlugQuery,
  editorsPickSlugsQuery,
  editorsPicksQuery,
  featuredEditorsPickQuery,
  homepageQuery,
  roundupItemBySlugQuery,
  roundupItemSlugsQuery,
  roundupItemsQuery,
  sectionChipsQuery,
  thisWeekRoundupQuery,
} from "./queries";
import {
  editorsPicks as fallbackPicks,
  homepageContent as fallbackHomepage,
  roundupItems as fallbackRoundupItems,
  sectionChips as fallbackChips,
} from "./seed-data";

export type HomepageContent = {
  heroEyebrow: string;
  heroHeadline: string;
  heroSubhead: string;
  heroPrimaryCta: string;
  heroSecondaryCta: string;
  trustStrip: string[];
  howThisWorksTitle: string;
  howThisWorksBody: string;
  newsletterTitle: string;
  newsletterBody: string;
  newsletterSmallprint: string;
  footerMission: string;
};

export type SectionChip = {
  slug: string;
  label: string;
  category: string;
  order: number;
};

export type RoundupItem = {
  slug: string;
  title: string;
  summary: string;
  whyItMatters: string;
  sourceNote: string | null;
  sourceUrl: string | null;
  category: string;
  week: string;
  publishedAt: string;
};

export type RoundupItemWithRelated = RoundupItem & {
  related: Array<
    Pick<RoundupItem, "slug" | "title" | "summary" | "category" | "week" | "publishedAt">
  >;
};

export type EditorsPickSummary = {
  slug: string;
  title: string;
  deck: string;
  week: string;
  publishedAt: string;
};

export type EditorsPick = EditorsPickSummary & {
  body: string[];
  sources: string[];
};

export type EditorsPickWithRelated = EditorsPick & {
  related: EditorsPickSummary[];
};

export type ArchiveEntry =
  | (RoundupItem & { kind: "roundup" })
  | (EditorsPickSummary & { kind: "pick" });

type SanityBlock = { _type?: string; style?: string; children?: { text?: string }[] };
function flattenBlocks(blocks: unknown): string[] {
  if (!Array.isArray(blocks)) return [];
  return blocks
    .filter(
      (b): b is SanityBlock => !!b && typeof b === "object" && (b as SanityBlock)._type === "block",
    )
    .map((b) => (b.children ?? []).map((c) => c.text ?? "").join(""))
    .filter((t) => t.trim().length > 0);
}

function fallbackRoundupBySlug(slug: string): RoundupItemWithRelated | null {
  const r = fallbackRoundupItems.find((x) => x.slug === slug);
  if (!r) return null;
  const related = fallbackRoundupItems
    .filter((x) => x.category === r.category && x.slug !== r.slug)
    .slice(0, 3)
    .map(({ slug, title, summary, category, week, publishedAt }) => ({
      slug,
      title,
      summary,
      category,
      week,
      publishedAt,
    }));
  return {
    ...r,
    sourceUrl: r.sourceUrl ?? null,
    sourceNote: r.sourceNote ?? null,
    related,
  };
}

function fallbackPickBySlug(slug: string): EditorsPickWithRelated | null {
  const p = fallbackPicks.find((x) => x.slug === slug);
  if (!p) return null;
  const related: EditorsPickSummary[] = fallbackPicks
    .filter((x) => x.slug !== p.slug)
    .slice(0, 3)
    .map(({ slug, title, deck, week, publishedAt }) => ({ slug, title, deck, week, publishedAt }));
  return { ...p, related };
}

function fallbackArchive(): ArchiveEntry[] {
  const items: ArchiveEntry[] = [
    ...fallbackRoundupItems.map(
      (r): ArchiveEntry => ({
        ...r,
        sourceUrl: r.sourceUrl ?? null,
        sourceNote: r.sourceNote ?? null,
        kind: "roundup",
      }),
    ),
    ...fallbackPicks.map(
      (p): ArchiveEntry => ({
        slug: p.slug,
        title: p.title,
        deck: p.deck,
        week: p.week,
        publishedAt: p.publishedAt,
        kind: "pick",
      }),
    ),
  ];
  items.sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt));
  return items;
}

function fallbackHomepageData() {
  return {
    homepage: fallbackHomepage,
    chips: fallbackChips,
    thisWeek: fallbackRoundupItems
      .filter((r) => r.week === "this-week")
      .map((r) => ({ ...r, sourceUrl: r.sourceUrl ?? null, sourceNote: r.sourceNote ?? null })),
    featuredPick: fallbackPicks[0] ? { ...fallbackPicks[0] } : null,
    recentPicks: fallbackPicks.slice(0, 4).map(({ slug, title, deck, week, publishedAt }) => ({
      slug,
      title,
      deck,
      week,
      publishedAt,
    })),
  };
}

export async function getHomepageData(): Promise<{
  homepage: HomepageContent;
  chips: SectionChip[];
  thisWeek: RoundupItem[];
  featuredPick: EditorsPick | null;
  recentPicks: EditorsPickSummary[];
}> {
  const client = getClient();
  if (!isSanityConfigured || !client) return fallbackHomepageData();

  try {
    const [rawHomepage, chips, thisWeek, featured, picks] = await Promise.all([
      client.fetch<HomepageContent | null>(homepageQuery),
      client.fetch<SectionChip[]>(sectionChipsQuery),
      client.fetch<RoundupItem[]>(thisWeekRoundupQuery),
      client.fetch<(EditorsPick & { body: unknown }) | null>(featuredEditorsPickQuery),
      client.fetch<EditorsPickSummary[]>(editorsPicksQuery),
    ]);

    if (!rawHomepage || !thisWeek || thisWeek.length === 0) {
      return fallbackHomepageData();
    }

    return {
      homepage: rawHomepage,
      chips: chips ?? [],
      thisWeek,
      featuredPick: featured
        ? { ...featured, body: flattenBlocks((featured as { body: unknown }).body) }
        : null,
      recentPicks: (picks ?? []).slice(0, 4),
    };
  } catch (err) {
    console.warn("[sanity] getHomepageData fell back to seed data:", err);
    return fallbackHomepageData();
  }
}

export async function getRoundupItemSlugs(): Promise<string[]> {
  const client = getClient();
  if (!isSanityConfigured || !client) return fallbackRoundupItems.map((r) => r.slug);
  try {
    const slugs = (await client.fetch<string[]>(roundupItemSlugsQuery)) ?? [];
    return slugs.length ? slugs : fallbackRoundupItems.map((r) => r.slug);
  } catch {
    return fallbackRoundupItems.map((r) => r.slug);
  }
}

export async function getRoundupItemBySlug(slug: string): Promise<RoundupItemWithRelated | null> {
  const client = getClient();
  if (!isSanityConfigured || !client) return fallbackRoundupBySlug(slug);
  try {
    const raw = await client.fetch<RoundupItemWithRelated | null>(roundupItemBySlugQuery, {
      slug,
    });
    if (!raw) return fallbackRoundupBySlug(slug);
    return { ...raw, related: raw.related ?? [] };
  } catch {
    return fallbackRoundupBySlug(slug);
  }
}

export async function getEditorsPickSlugs(): Promise<string[]> {
  const client = getClient();
  if (!isSanityConfigured || !client) return fallbackPicks.map((p) => p.slug);
  try {
    const slugs = (await client.fetch<string[]>(editorsPickSlugsQuery)) ?? [];
    return slugs.length ? slugs : fallbackPicks.map((p) => p.slug);
  } catch {
    return fallbackPicks.map((p) => p.slug);
  }
}

export async function getEditorsPickBySlug(slug: string): Promise<EditorsPickWithRelated | null> {
  const client = getClient();
  if (!isSanityConfigured || !client) return fallbackPickBySlug(slug);
  try {
    const raw = await client.fetch<
      (Omit<EditorsPickWithRelated, "body"> & { body?: unknown }) | null
    >(editorsPickBySlugQuery, { slug });
    if (!raw) return fallbackPickBySlug(slug);
    return {
      ...raw,
      body: flattenBlocks(raw.body),
      related: raw.related ?? [],
    };
  } catch {
    return fallbackPickBySlug(slug);
  }
}

export async function getAllRoundupItems(): Promise<RoundupItem[]> {
  const client = getClient();
  if (!isSanityConfigured || !client) {
    return fallbackRoundupItems.map((r) => ({
      ...r,
      sourceUrl: r.sourceUrl ?? null,
      sourceNote: r.sourceNote ?? null,
    }));
  }
  try {
    const rows = (await client.fetch<RoundupItem[]>(roundupItemsQuery)) ?? [];
    if (rows.length === 0) {
      return fallbackRoundupItems.map((r) => ({
        ...r,
        sourceUrl: r.sourceUrl ?? null,
        sourceNote: r.sourceNote ?? null,
      }));
    }
    return rows;
  } catch {
    return fallbackRoundupItems.map((r) => ({
      ...r,
      sourceUrl: r.sourceUrl ?? null,
      sourceNote: r.sourceNote ?? null,
    }));
  }
}

export async function getArchive(): Promise<ArchiveEntry[]> {
  const client = getClient();
  if (!isSanityConfigured || !client) return fallbackArchive();
  try {
    const raw = await client.fetch<{
      roundupItems: Array<RoundupItem & { kind: "roundup" }>;
      picks: Array<EditorsPickSummary & { kind: "pick" }>;
    }>(archiveQuery);
    const merged: ArchiveEntry[] = [...(raw.roundupItems ?? []), ...(raw.picks ?? [])];
    if (merged.length === 0) return fallbackArchive();
    merged.sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt));
    return merged;
  } catch {
    return fallbackArchive();
  }
}
