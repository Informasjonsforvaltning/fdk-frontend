"use client";

import { useMemo } from "react";
import { CheckboxGroup } from "@fellesdatakatalog/ui";

import { buildProvenanceFilterOptions, shouldShowProvenanceFilter } from "./provenance";
import { type AggregationKeyCount } from "./types";
import { useSyncedProvenanceSelection } from "./provenance/use-synced-selection";

export type ProvenanceFilterProps = {
  aggregation?: AggregationKeyCount[];
  value?: string[];
  onChange?: (value: string[]) => void;
};

const ProvenanceFilter = ({ aggregation = [], value, onChange }: ProvenanceFilterProps) => {
  const { selected, onChange: handleChange } = useSyncedProvenanceSelection(value, onChange);
  const options = useMemo(() => buildProvenanceFilterOptions(aggregation), [aggregation]);

  if (!shouldShowProvenanceFilter(aggregation) || options.length === 0) return null;

  return (
    <CheckboxGroup
      options={options}
      value={selected}
      onChange={handleChange}
    />
  );
};

export default ProvenanceFilter;
