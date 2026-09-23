/**
 * Every dataset is described in accordance with DCAT-AP-NO, either explicitly or because a missing
 * value is read as such, so it is left out of the filter options where it would narrow nothing.
 */
export const DCAT_PROFILE_DEFAULT = "DCAT_AP_NO";

export const DCAT_PROFILE_MOBILITY = "MOBILITY_DCAT_AP";

export type DcatProfileFilterDictionary = {
  mobilityDcatAp: string;
  hvdDcatApNo: string;
  dcatApNo: string;
};

export const getDcatProfileLabels = (dict: DcatProfileFilterDictionary): Record<string, string> => ({
  MOBILITY_DCAT_AP: dict.mobilityDcatAp,
  HVD_DCAT_AP_NO: dict.hvdDcatApNo,
  DCAT_AP_NO: dict.dcatApNo,
});

export const formatDcatProfileLabel = (key: string, labels: Record<string, string>): string => labels[key] ?? key;

export const formatDcatProfileCheckboxLabel = (key: string, count: number, labels: Record<string, string>): string =>
  `${formatDcatProfileLabel(key, labels)} (${count})`;
