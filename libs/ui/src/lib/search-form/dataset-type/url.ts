import { parseCommaSeparatedParam } from "../parse-comma-separated-param";

export const datasetTypeKeysToQueryParam = (keys: string[]): string => keys.join(",");

export const parseDatasetTypeQueryParam = (value: string | null): string[] => parseCommaSeparatedParam(value);

export type DatasetTypeSearchFilter = {
  datasetType: {
    value: string[];
  };
};

export const buildDatasetTypeSearchFilter = (datasetTypeParam: string | null): DatasetTypeSearchFilter | undefined => {
  const keys = parseDatasetTypeQueryParam(datasetTypeParam);
  if (keys.length === 0) return undefined;

  return {
    datasetType: {
      value: keys,
    },
  };
};
