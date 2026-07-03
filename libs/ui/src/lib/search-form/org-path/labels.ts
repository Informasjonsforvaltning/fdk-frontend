import { hasSelectedOrgPathDescendant } from "./selection";
import { getOrgPathParts } from "./tree";
import { UNKNOWN_ORG_PATH_KEY } from "./types";

export type OrgPathLabelMap = Readonly<Record<string, string>>;

export type OrgTypeDictionary = {
  kommune: string;
  stat: string;
  privat: string;
  annet: string;
  fylke: string;
  unknown: string;
};

const getOrgTypeLabelBySegment = (segment: string, orgTypes: OrgTypeDictionary): string | undefined => {
  const orgTypeLabels: Record<string, string> = {
    KOMMUNE: orgTypes.kommune,
    STAT: orgTypes.stat,
    PRIVAT: orgTypes.privat,
    ANNET: orgTypes.annet,
    FYLKE: orgTypes.fylke,
  };
  return orgTypeLabels[segment];
};

const formatSegmentLabel = (segment: string, orgTypes: OrgTypeDictionary): string => {
  const orgTypeLabel = getOrgTypeLabelBySegment(segment, orgTypes);
  if (orgTypeLabel) return orgTypeLabel;
  if (/^\d+$/.test(segment)) return segment;
  return segment.charAt(0) + segment.slice(1).toLowerCase();
};

const getFallbackOrgPathLabel = (key: string, orgTypes: OrgTypeDictionary): string => {
  if (key === UNKNOWN_ORG_PATH_KEY) return orgTypes.unknown;
  const parts = getOrgPathParts(key);
  const segment = parts[parts.length - 1] ?? key;
  return formatSegmentLabel(segment, orgTypes);
};

export const formatOrgPathLabel = (key: string, labels: OrgPathLabelMap, orgTypes: OrgTypeDictionary): string => {
  const labelByPath = labels[key];
  if (labelByPath) return labelByPath;

  const parts = getOrgPathParts(key);
  const segment = parts[parts.length - 1];
  if (segment && /^\d+$/.test(segment)) {
    const labelByOrganizationId = labels[segment];
    if (labelByOrganizationId) return labelByOrganizationId;
  }

  return getFallbackOrgPathLabel(key, orgTypes);
};

export const formatOrgPathCheckboxLabel = (
  key: string,
  count: number,
  selected: string[],
  labels: OrgPathLabelMap,
  orgTypes: OrgTypeDictionary,
): string => {
  const label = formatOrgPathLabel(key, labels, orgTypes);
  if (hasSelectedOrgPathDescendant(key, selected)) return label;
  return `${label} (${count})`;
};
