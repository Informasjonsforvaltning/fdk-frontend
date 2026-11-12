import { type AggregationKeyCount } from "../types";
import { isHighValueDatasetType } from "./labels";

export const shouldShowDatasetTypeFilter = (aggregation: AggregationKeyCount[]): boolean =>
  aggregation.some(({ key }) => isHighValueDatasetType(key));
