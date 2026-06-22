"use client";

import { useMemo } from "react";
import { CheckboxGroup } from "@fellesdatakatalog/ui";

import { buildSpatialFilterOptions, shouldShowSpatialFilter } from "./spatial";
import { type AggregationKeyCount } from "./types";
import { useSyncedSpatialSelection } from "./spatial/use-synced-selection";

export type SpatialFilterProps = {
  aggregation?: AggregationKeyCount[];
  value?: string[];
  onChange?: (value: string[]) => void;
};

const SpatialFilter = ({ aggregation = [], value, onChange }: SpatialFilterProps) => {
  const { selected, onChange: handleChange } = useSyncedSpatialSelection(value, onChange);
  const options = useMemo(() => buildSpatialFilterOptions(aggregation), [aggregation]);

  if (!shouldShowSpatialFilter(aggregation) || options.length === 0) return null;

  return (
    <CheckboxGroup
      options={options}
      value={selected}
      onChange={handleChange}
    />
  );
};

export default SpatialFilter;
