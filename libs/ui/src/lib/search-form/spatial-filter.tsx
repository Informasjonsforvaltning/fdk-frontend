"use client";

import { useMemo } from "react";
import { CheckboxGroup } from "@fellesdatakatalog/ui";

import { enrichAggregationWithSelection } from "./enrich-aggregation";
import { buildSpatialFilterOptions, shouldShowSpatialFilter, type SpatialLabelMap } from "./spatial";
import { type AggregationKeyCount } from "./types";
import { useSyncedSpatialSelection } from "./spatial/use-synced-selection";

export type SpatialFilterProps = {
  aggregation?: AggregationKeyCount[];
  labels?: SpatialLabelMap;
  value?: string[];
  onChange?: (value: string[]) => void;
};

const SpatialFilter = ({ aggregation = [], labels, value, onChange }: SpatialFilterProps) => {
  const { checkboxValue, checkboxKey, onChange: handleChange } = useSyncedSpatialSelection(value, onChange);
  const displayAggregation = useMemo(
    () => enrichAggregationWithSelection(aggregation, checkboxValue),
    [aggregation, checkboxValue],
  );
  const options = useMemo(() => buildSpatialFilterOptions(displayAggregation, labels), [displayAggregation, labels]);

  if (!shouldShowSpatialFilter(displayAggregation) || options.length === 0) return null;

  return (
    <CheckboxGroup
      key={checkboxKey}
      options={options}
      value={checkboxValue}
      onChange={handleChange}
    />
  );
};

export default SpatialFilter;
