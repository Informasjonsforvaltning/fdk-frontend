import { type AggregationKeyCount } from "../types";

export const shouldShowFormatFilter = (aggregation: AggregationKeyCount[]): boolean => aggregation.length > 0;
