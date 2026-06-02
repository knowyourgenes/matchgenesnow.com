import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PickView from "../../../components/PickView";
import { getEditorsPickBySlug, getEditorsPickSlugs, getHomepageData } from "../../../sanity/fetch";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getEditorsPickSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata(props: PageProps<"/picks/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const pick = await getEditorsPickBySlug(slug);
  if (!pick) return { title: "Not found · matchgenesnow.com" };
  return {
    title: `${pick.title} · matchgenesnow.com`,
    description: pick.deck,
    openGraph: { title: pick.title, description: pick.deck, type: "article" },
  };
}

export default async function PickPage(props: PageProps<"/picks/[slug]">) {
  const { slug } = await props.params;
  const [pick, homepageData] = await Promise.all([getEditorsPickBySlug(slug), getHomepageData()]);
  if (!pick) notFound();
  return <PickView pick={pick} homepage={homepageData.homepage} />;
}
