import Homepage from "../components/homepage";
import { getHomepageData } from "../sanity/fetch";
import { formatLongDate } from "../lib/format";

export const revalidate = 60;

export default async function Page() {
  const data = await getHomepageData();
  const issueDate = formatLongDate(data.thisWeek[0]?.publishedAt ?? new Date().toISOString());

  return (
    <Homepage
      homepage={data.homepage}
      chips={data.chips}
      thisWeek={data.thisWeek}
      featuredPick={data.featuredPick}
      recentPicks={data.recentPicks}
      issueDate={issueDate}
    />
  );
}
