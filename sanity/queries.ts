import { groq } from "next-sanity";

export const homepageQuery = groq`*[_type == "homepage"] | order(_updatedAt desc)[0] {
  heroEyebrow,
  heroHeadline,
  heroSubhead,
  heroPrimaryCta,
  heroSecondaryCta,
  trustStrip,
  howThisWorksTitle,
  howThisWorksBody,
  newsletterTitle,
  newsletterBody,
  newsletterSmallprint,
  footerMission
}`;

export const sectionChipsQuery = groq`*[_type == "sectionChip"] | order(order asc) {
  "slug": slug.current,
  label,
  category,
  order
}`;

export const roundupItemsQuery = groq`*[_type == "roundupItem"] | order(week desc, order asc) {
  "slug": slug.current,
  title,
  summary,
  whyItMatters,
  sourceNote,
  sourceUrl,
  category,
  week,
  publishedAt
}`;

export const roundupItemBySlugQuery = groq`*[_type == "roundupItem" && slug.current == $slug][0] {
  "slug": slug.current,
  title,
  summary,
  whyItMatters,
  sourceNote,
  sourceUrl,
  category,
  week,
  publishedAt,
  "related": *[_type == "roundupItem" && slug.current != ^.slug.current && category == ^.category] | order(publishedAt desc)[0...3] {
    "slug": slug.current,
    title,
    summary,
    category,
    week,
    publishedAt
  }
}`;

export const roundupItemSlugsQuery = groq`*[_type == "roundupItem" && defined(slug.current)][].slug.current`;

export const thisWeekRoundupQuery = groq`*[_type == "roundupItem" && week == "this-week"] | order(order asc) {
  "slug": slug.current,
  title,
  summary,
  whyItMatters,
  sourceNote,
  sourceUrl,
  category,
  week,
  publishedAt
}`;

export const editorsPicksQuery = groq`*[_type == "editorsPick"] | order(publishedAt desc) {
  "slug": slug.current,
  title,
  deck,
  body,
  sources,
  week,
  publishedAt
}`;

export const featuredEditorsPickQuery = groq`*[_type == "editorsPick"] | order(publishedAt desc)[0] {
  "slug": slug.current,
  title,
  deck,
  body,
  sources,
  week,
  publishedAt
}`;

export const editorsPickBySlugQuery = groq`*[_type == "editorsPick" && slug.current == $slug][0] {
  "slug": slug.current,
  title,
  deck,
  body,
  sources,
  week,
  publishedAt,
  "related": *[_type == "editorsPick" && slug.current != ^.slug.current] | order(publishedAt desc)[0...3] {
    "slug": slug.current,
    title,
    deck,
    week,
    publishedAt
  }
}`;

export const editorsPickSlugsQuery = groq`*[_type == "editorsPick" && defined(slug.current)][].slug.current`;

export const archiveQuery = groq`{
  "roundupItems": *[_type == "roundupItem"] | order(publishedAt desc) {
    "slug": slug.current,
    title,
    summary,
    category,
    week,
    publishedAt,
    "kind": "roundup"
  },
  "picks": *[_type == "editorsPick"] | order(publishedAt desc) {
    "slug": slug.current,
    title,
    deck,
    week,
    publishedAt,
    "kind": "pick"
  }
}`;
