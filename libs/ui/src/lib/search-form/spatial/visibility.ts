import { type AggregationKeyCount } from "../types";

export const shouldShowSpatialFilter = (aggregation: AggregationKeyCount[]): boolean => aggregation.length > 0;
