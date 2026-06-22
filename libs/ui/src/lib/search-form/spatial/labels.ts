export const formatSpatialLabel = (key: string): string => key;

export const formatSpatialCheckboxLabel = (key: string, count: number): string =>
  `${formatSpatialLabel(key)} (${count})`;
