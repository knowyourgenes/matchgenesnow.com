// Canonical site identity. Reused by sitemap, robots, and the llms.txt routes
// so the production URL/name live in exactly one place.
export const siteConfig = {
  siteUrl: "https://matchgenesnow.com",
  siteName: "matchgenesnow.com",
  description:
    "Plain-language summaries of the latest genetics research, with the India angle " +
    "global coverage usually misses. New roundup every Friday. One deeper read every week.",
} as const;
