"use client";

import { useMemo } from "react";
import { CheckboxGroup } from "@fellesdatakatalog/ui";
import { type LocaleCodes } from "@fdk-frontend/localization";

import { buildDatasetTypeFilterOptions, shouldShowDatasetTypeFilter } from "./dataset-type";
import { useDatasetTypeLabels } from "./dataset-type/use-dataset-type-labels";
import { enrichAggregationWithSelection } from "./enrich-aggregation";
import { type AggregationKeyCount } from "./types";
import { useSyncedDatasetTypeSelection } from "./dataset-type/use-synced-selection";

export type DatasetTypeFilterProps = {
  locale?: LocaleCodes;
  aggregation?: AggregationKeyCount[];
  value?: string[];
  onChange?: (value: string[]) => void;
};

const DatasetTypeFilter = ({ locale = "nb", aggregation = [], value, onChange }: DatasetTypeFilterProps) => {
  const { checkboxValue, checkboxKey, onChange: handleChange } = useSyncedDatasetTypeSelection(value, onChange);
  const labels = useDatasetTypeLabels(locale);
  const displayAggregation = useMemo(
    () => enrichAggregationWithSelection(aggregation, checkboxValue),
    [aggregation, checkboxValue],
  );
  const options = useMemo(
    () => buildDatasetTypeFilterOptions(displayAggregation, labels),
    [displayAggregation, labels],
  );

  if (!shouldShowDatasetTypeFilter(displayAggregation) || options.length === 0) return null;

  return (
    <CheckboxGroup
      key={checkboxKey}
      options={options}
      value={checkboxValue}
      onChange={handleChange}
    />
  );
};

export default DatasetTypeFilter;
