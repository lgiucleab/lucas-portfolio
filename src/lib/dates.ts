// Date formatting for the timeline.
import type { Locale } from "@/i18n/config";

// Turns a date into "September 2026". The months are named by the browser-standard Intl API,
// so they are translated automatically. UTC stops the month shifting with the time zone.
function formatMonth(date: Date, locale: Locale): string {
  const formatted = new Intl.DateTimeFormat(locale, {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);

  // Spanish months are lowercase, so the first letter is capitalized for display.
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}

// Builds a range such as "September 2021 - May 2026". With no end date it ends in presentLabel.
export function formatDateRange(
  start: Date,
  end: Date | undefined,
  locale: Locale,
  presentLabel: string,
): string {
  const endText = end ? formatMonth(end, locale) : presentLabel;
  return `${formatMonth(start, locale)} - ${endText}`;
}
