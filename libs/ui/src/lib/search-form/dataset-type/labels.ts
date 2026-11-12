export const HIGH_VALUE_DATASET_TYPE_NAMESPACE = "https://data.norge.no/vocabulary/high-value-dataset-type#";

export const DATASET_TYPE_EU_HVD = `${HIGH_VALUE_DATASET_TYPE_NAMESPACE}eu-hvd`;

export const DATASET_TYPE_NATIONAL_HVD = `${HIGH_VALUE_DATASET_TYPE_NAMESPACE}national-hvd`;

export const DATASET_TYPE_NATIONAL_BASIC_DATA = `${HIGH_VALUE_DATASET_TYPE_NAMESPACE}national-basic-data`;

export type DatasetTypeFilterDictionary = {
  euHvd: string;
  nationalHvd: string;
  nationalBasicData: string;
};

export const isHighValueDatasetType = (uri: string | null | undefined): boolean =>
  uri?.startsWith(HIGH_VALUE_DATASET_TYPE_NAMESPACE) ?? false;

export const getDatasetTypeLabels = (dict: DatasetTypeFilterDictionary): Record<string, string> => ({
  [DATASET_TYPE_EU_HVD]: dict.euHvd,
  [DATASET_TYPE_NATIONAL_HVD]: dict.nationalHvd,
  [DATASET_TYPE_NATIONAL_BASIC_DATA]: dict.nationalBasicData,
});

export const formatDatasetTypeLabel = (key: string, labels: Record<string, string>): string => labels[key] ?? key;

export const formatDatasetTypeCheckboxLabel = (key: string, count: number, labels: Record<string, string>): string =>
  `${formatDatasetTypeLabel(key, labels)} (${count})`;
