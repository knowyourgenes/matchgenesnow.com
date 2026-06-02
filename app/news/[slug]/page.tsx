import type { Metadata } from "next";
import { notFound } from "next/navigation";
import NewsItemView from "../../../components/NewsItemView";
import { getHomepageData, getRoundupItemBySlug, getRoundupItemSlugs } from "../../../sanity/fetch";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getRoundupItemSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata(props: PageProps<"/news/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const item = await getRoundupItemBySlug(slug);
  if (!item) return { title: "Not found · matchgenesnow.com" };
  return {
    title: `${item.title} · matchgenesnow.com`,
    description: item.summary,
    openGraph: { title: item.title, description: item.summary, type: "article" },
  };
}

export default async function NewsItemPage(props: PageProps<"/news/[slug]">) {
  const { slug } = await props.params;
  const [item, homepageData] = await Promise.all([getRoundupItemBySlug(slug), getHomepageData()]);
  if (!item) notFound();
  return <NewsItemView item={item} homepage={homepageData.homepage} />;
}
