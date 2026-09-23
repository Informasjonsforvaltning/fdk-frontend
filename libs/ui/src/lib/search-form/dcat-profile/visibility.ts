import { type AggregationKeyCount } from "../types";
import { DCAT_PROFILE_DEFAULT } from "./labels";

export const shouldShowDcatProfileFilter = (aggregation: AggregationKeyCount[]): boolean =>
  aggregation.some(({ key }) => key !== DCAT_PROFILE_DEFAULT);
