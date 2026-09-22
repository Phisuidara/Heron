/** Formats an ISO "YYYY-MM" string as "Mon YYYY". Shared across designs. */
export function formatMonthYear(isoMonth: string): string {
  const [year, month] = isoMonth.split("-").map(Number);
  if (!year || !month) return isoMonth;
  const date = new Date(Date.UTC(year, month - 1, 1));
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

/** Formats a start/end ISO "YYYY-MM" pair, using "Present" when `end` is omitted. */
export function formatDateRange(start: string, end?: string): string {
  return `${formatMonthYear(start)} – ${end ? formatMonthYear(end) : "Present"}`;
}
