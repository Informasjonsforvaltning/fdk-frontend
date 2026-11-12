import type { LocaleCodes } from "@fdk-frontend/localization";

type DurationUnit = "year" | "month" | "week" | "day" | "hour" | "minute" | "second";

const number = String.raw`(\d+(?:[.,]\d+)?)`;

// ISO 8601 duration, e.g. "P1Y2M10DT2H30M", "P6M", "PT36H", "P2W".
// Requires at least one component, and at least one time component after "T".
const isoDurationPattern = new RegExp(
  `^P(?!$)(?:${number}Y)?(?:${number}M)?(?:${number}W)?(?:${number}D)?(?:T(?=\\d)(?:${number}H)?(?:${number}M)?(?:${number}S)?)?$`,
);

const units: DurationUnit[] = ["year", "month", "week", "day", "hour", "minute", "second"];

const conjunctions: Record<LocaleCodes, string> = { nb: "og", nn: "og", en: "and" };

export type IsoDuration = Partial<Record<DurationUnit, number>>;

export const parseIsoDuration = (value: string): IsoDuration | undefined => {
  const match = isoDurationPattern.exec(value.trim());
  if (!match) {
    return undefined;
  }

  const components = match.slice(1);
  // Only the smallest specified component may carry a fraction
  const lastIndex = components.reduce((last, component, index) => (component !== undefined ? index : last), -1);
  if (components.some((component, index) => index !== lastIndex && component !== undefined && /[.,]/.test(component))) {
    return undefined;
  }

  const duration: IsoDuration = {};
  components.forEach((component, index) => {
    if (component !== undefined) {
      duration[units[index]] = Number(component.replace(",", "."));
    }
  });
  return duration;
};

/**
 * Formats an ISO 8601 duration as human-readable text, e.g. "P1Y6M" -> "1 år og 6 måneder".
 * Returns the original value if it is not a valid ISO 8601 duration.
 */
export const formatIsoDuration = (value: string | undefined | null, locale: LocaleCodes): string => {
  if (!value) {
    return "";
  }

  const duration = parseIsoDuration(value);
  if (!duration) {
    return value;
  }

  const specified = units.filter((unit) => duration[unit] !== undefined);
  const nonZero = specified.filter((unit) => duration[unit] !== 0);

  const shown = nonZero.length ? nonZero : specified.slice(-1);

  const parts = shown.map((unit) =>
    new Intl.NumberFormat(locale, { style: "unit", unit, unitDisplay: "long" }).format(duration[unit] ?? 0),
  );


  if (parts.length === 1) {
    return parts[0];
  }
  return `${parts.slice(0, -1).join(", ")} ${conjunctions[locale]} ${parts[parts.length - 1]}`;
};
