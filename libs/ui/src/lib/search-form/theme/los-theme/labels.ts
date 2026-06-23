import { hasSelectedLosThemeDescendant } from "./selection";
import { getLosThemeParts } from "./tree";

export type LosThemeLabelMap = Readonly<Record<string, string>>;

const getFallbackLosThemeLabel = (key: string): string => {
  const parts = getLosThemeParts(key);
  return parts[parts.length - 1] ?? key;
};

export const formatLosThemeLabel = (key: string, labels: LosThemeLabelMap): string =>
  labels[key] ?? getFallbackLosThemeLabel(key);

export const formatLosThemeCheckboxLabel = (
  key: string,
  count: number,
  selected: string[],
  labels: LosThemeLabelMap,
): string => {
  const label = formatLosThemeLabel(key, labels);
  if (hasSelectedLosThemeDescendant(key, selected)) return label;
  return `${label} (${count})`;
};
