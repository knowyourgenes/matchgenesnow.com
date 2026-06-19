import type { MetadataRoute } from "next";
import { siteConfig } from "../lib/siteConfig";
import { getArchive } from "../sanity/fetch";

const BASE = siteConfig.siteUrl;

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${BASE}/archive`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
  ];

  // CMS-driven routes. Wrapped so the static routes still emit if Sanity is down.
  let newsRoutes: MetadataRoute.Sitemap = [];
  let pickRoutes: MetadataRoute.Sitemap = [];
  try {
    const entries = await getArchive();

    newsRoutes = entries
      .filter((e) => e.kind === "roundup")
      .map((e) => ({
        url: `${BASE}/news/${e.slug}`,
        lastModified: e.publishedAt ? new Date(e.publishedAt) : now,
        changeFrequency: "weekly",
        priority: 0.7,
      }));

    pickRoutes = entries
      .filter((e) => e.kind === "pick")
      .map((e) => ({
        url: `${BASE}/picks/${e.slug}`,
        lastModified: e.publishedAt ? new Date(e.publishedAt) : now,
        changeFrequency: "weekly",
        priority: 0.7,
      }));
  } catch (err) {
    console.warn("[sitemap] CMS fetch failed, emitting static routes only:", err);
  }

  // Dedupe by URL.
  const seen = new Set<string>();
  return [...staticRoutes, ...newsRoutes, ...pickRoutes].filter((entry) => {
    if (seen.has(entry.url)) return false;
    seen.add(entry.url);
    return true;
  });
}
