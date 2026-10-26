export type SpatialLabelMap = Readonly<Record<string, string>>;

export const formatSpatialLabel = (key: string, labels: SpatialLabelMap = {}): string => labels[key] ?? key;

export const formatSpatialCheckboxLabel = (key: string, count: number, labels: SpatialLabelMap = {}): string =>
  `${formatSpatialLabel(key, labels)} (${count})`;
