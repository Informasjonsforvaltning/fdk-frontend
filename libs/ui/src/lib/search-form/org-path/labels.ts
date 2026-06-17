import { hasSelectedOrgPathDescendant } from "./selection";
import { getOrgPathParts } from "./tree";
import { UNKNOWN_ORG_PATH_KEY } from "./types";

const ORG_TYPE_LABELS: Record<string, string> = {
  KOMMUNE: "Kommune",
  STAT: "Stat",
  PRIVAT: "Privat",
  ANNET: "Annet",
  FYLKE: "Fylke",
};

const formatSegmentLabel = (segment: string): string => {
  if (ORG_TYPE_LABELS[segment]) return ORG_TYPE_LABELS[segment];
  if (/^\d+$/.test(segment)) return segment;
  return segment.charAt(0) + segment.slice(1).toLowerCase();
};

export const formatOrgPathLabel = (key: string): string => {
  if (key === UNKNOWN_ORG_PATH_KEY) return "Ukjent";
  const parts = getOrgPathParts(key);
  const segment = parts[parts.length - 1] ?? key;
  return formatSegmentLabel(segment);
};

export const formatOrgPathCheckboxLabel = (key: string, count: number, selected: string[]): string => {
  const label = formatOrgPathLabel(key);
  if (hasSelectedOrgPathDescendant(key, selected)) return label;
  return `${label} (${count})`;
};
