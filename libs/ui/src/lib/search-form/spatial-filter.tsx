"use client";

import { useMemo } from "react";
import { CheckboxGroup } from "@fellesdatakatalog/ui";

import { enrichAggregationWithSelection } from "./enrich-aggregation";
import { buildSpatialFilterOptions, shouldShowSpatialFilter } from "./spatial";
import { type AggregationKeyCount } from "./types";
import { useSyncedSpatialSelection } from "./spatial/use-synced-selection";

export type SpatialFilterProps = {
  aggregation?: AggregationKeyCount[];
  value?: string[];
  onChange?: (value: string[]) => void;
};

const SpatialFilter = ({ aggregation = [], value, onChange }: SpatialFilterProps) => {
  const { checkboxValue, checkboxKey, onChange: handleChange } = useSyncedSpatialSelection(value, onChange);
  const displayAggregation = useMemo(
    () => enrichAggregationWithSelection(aggregation, checkboxValue),
    [aggregation, checkboxValue],
  );
  const options = useMemo(() => buildSpatialFilterOptions(displayAggregation), [displayAggregation]);

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
