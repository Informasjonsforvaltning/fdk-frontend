import { hasSelectedOrgPathDescendant } from "./selection";
import { getOrgPathParts } from "./tree";
import { UNKNOWN_ORG_PATH_KEY } from "./types";

export type OrgPathLabelMap = Readonly<Record<string, string>>;

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

const getFallbackOrgPathLabel = (key: string): string => {
  if (key === UNKNOWN_ORG_PATH_KEY) return "Ukjent";
  const parts = getOrgPathParts(key);
  const segment = parts[parts.length - 1] ?? key;
  return formatSegmentLabel(segment);
};

export const formatOrgPathLabel = (key: string, labels: OrgPathLabelMap): string => {
  const labelByPath = labels[key];
  if (labelByPath) return labelByPath;

  const parts = getOrgPathParts(key);
  const segment = parts[parts.length - 1];
  if (segment && /^\d+$/.test(segment)) {
    const labelByOrganizationId = labels[segment];
    if (labelByOrganizationId) return labelByOrganizationId;
  }

  return getFallbackOrgPathLabel(key);
};

export const formatOrgPathCheckboxLabel = (
  key: string,
  count: number,
  selected: string[],
  labels: OrgPathLabelMap,
): string => {
  const label = formatOrgPathLabel(key, labels);
  if (hasSelectedOrgPathDescendant(key, selected)) return label;
  return `${label} (${count})`;
};
