import { type AggregationKeyCount } from "../types";

export const shouldShowDatasetTypeFilter = (aggregation: AggregationKeyCount[]): boolean => aggregation.length > 0;
