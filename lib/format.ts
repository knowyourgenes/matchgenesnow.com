const monthLongFmt = new Intl.DateTimeFormat("en-GB", { month: "long" });
const monthShortFmt = new Intl.DateTimeFormat("en-GB", { month: "short" });

export function formatLongDate(iso: string | null | undefined): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return `${d.getDate()} ${monthLongFmt.format(d)} ${d.getFullYear()}`;
}

export function formatShortDate(iso: string | null | undefined): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return `${d.getDate()} ${monthShortFmt.format(d)} ${d.getFullYear()}`;
}

export function weekLabel(week: string): string {
  // Normalise "this-week", "last-week", "2-weeks-ago" to friendly labels.
  if (week === "this-week") return "This week";
  if (week === "last-week") return "Last week";
  const m = week.match(/^(\d+)-weeks?-ago$/);
  if (m) {
    const n = parseInt(m[1], 10);
    return `${n} weeks ago`;
  }
  return week;
}

export function categoryLabel(category: string): string {
  switch (category) {
    case "this-week":
      return "This week";
    case "research":
      return "Research";
    case "india-focus":
      return "India focus";
    case "explainers":
      return "Explainers";
    case "policy-ethics":
      return "Policy & ethics";
    case "tools-tests":
      return "Tools & tests";
    case "archive":
      return "Archive";
    default:
      return category;
  }
}
