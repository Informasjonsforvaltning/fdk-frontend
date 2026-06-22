import { type AggregationKeyCount } from "../types";

export const shouldShowProvenanceFilter = (aggregation: AggregationKeyCount[]): boolean => aggregation.length > 0;
