import type { Metadata } from "next";
import ArchiveView from "../../components/ArchiveView";
import { getArchive, getHomepageData, type ArchiveEntry } from "../../sanity/fetch";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Archive · matchgenesnow.com",
  description:
    "Every roundup and editor's pick we've published, dated and individually linkable. India-aware. Sourced. Free.",
};

export default async function ArchivePage(props: PageProps<"/archive">) {
  const sp = await props.searchParams;
  const sectionRaw = sp.section;
  const activeSection = Array.isArray(sectionRaw) ? sectionRaw[0] : sectionRaw || null;

  const [entries, homepageData] = await Promise.all([getArchive(), getHomepageData()]);

  const filtered: ArchiveEntry[] = activeSection
    ? entries.filter((e) => {
        if (e.kind === "roundup") {
          return e.category === activeSection;
        }
        // Editor's picks don't have a category; bucket them under "explainers"
        // by convention so they still appear in that filter view.
        return activeSection === "explainers" || activeSection === "archive";
      })
    : entries;

  return (
    <ArchiveView
      entries={filtered}
      chips={homepageData.chips}
      homepage={homepageData.homepage}
      activeSection={activeSection}
    />
  );
}
