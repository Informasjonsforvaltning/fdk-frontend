import { hasSelectedLosThemeDescendant } from "./selection";
import { getLosThemeParts } from "./tree";

export const formatLosThemeLabel = (key: string): string => {
  const parts = getLosThemeParts(key);
  return parts[parts.length - 1] ?? key;
};

export const formatLosThemeCheckboxLabel = (key: string, count: number, selected: string[]): string => {
  const label = formatLosThemeLabel(key);
  if (hasSelectedLosThemeDescendant(key, selected)) return label;
  return `${label} (${count})`;
};
