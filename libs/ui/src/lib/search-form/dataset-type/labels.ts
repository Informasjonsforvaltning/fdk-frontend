export const HIGH_VALUE_DATASET_TYPE_NAMESPACE = "https://data.norge.no/vocabulary/high-value-dataset-type#";

export const isHighValueDatasetType = (uri: string | null | undefined): boolean =>
  uri?.startsWith(HIGH_VALUE_DATASET_TYPE_NAMESPACE) ?? false;

export const formatDatasetTypeLabel = (key: string, labels: Record<string, string>): string => labels[key] ?? key;

export const formatDatasetTypeCheckboxLabel = (key: string, count: number, labels: Record<string, string>): string =>
  `${formatDatasetTypeLabel(key, labels)} (${count})`;
