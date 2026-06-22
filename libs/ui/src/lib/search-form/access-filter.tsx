"use client";

import { useMemo } from "react";
import { CheckboxGroup } from "@fellesdatakatalog/ui";

import { buildAccessFilterOptions, shouldShowAccessFilter } from "./access";
import { type AggregationKeyCount } from "./org-path";
import { useSyncedAccessSelection } from "./access/use-synced-selection";

export type AccessFilterProps = {
  aggregation?: AggregationKeyCount[];
  value?: string[];
  onChange?: (value: string[]) => void;
};

const AccessFilter = ({ aggregation = [], value, onChange }: AccessFilterProps) => {
  const { selected, onChange: handleChange } = useSyncedAccessSelection(value, onChange);
  const options = useMemo(() => buildAccessFilterOptions(aggregation), [aggregation]);

  if (!shouldShowAccessFilter(aggregation) || options.length === 0) return null;

  return (
    <CheckboxGroup
      options={options}
      value={selected}
      onChange={handleChange}
    />
  );
};

export default AccessFilter;
