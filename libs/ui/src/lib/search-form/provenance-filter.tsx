"use client";

import { useMemo } from "react";
import { CheckboxGroup } from "@fellesdatakatalog/ui";
import { getLocalization, type LocaleCodes } from "@fdk-frontend/localization";

import { buildProvenanceFilterOptions, shouldShowProvenanceFilter } from "./provenance";
import { getProvenanceLabels } from "./provenance/labels";
import { enrichAggregationWithSelection } from "./enrich-aggregation";
import { type AggregationKeyCount } from "./types";
import { useSyncedProvenanceSelection } from "./provenance/use-synced-selection";

export type ProvenanceFilterProps = {
  locale?: LocaleCodes;
  aggregation?: AggregationKeyCount[];
  value?: string[];
  onChange?: (value: string[]) => void;
};

const ProvenanceFilter = ({ locale = "nb", aggregation = [], value, onChange }: ProvenanceFilterProps) => {
  const { checkboxValue, checkboxKey, onChange: handleChange } = useSyncedProvenanceSelection(value, onChange);
  const labels = getProvenanceLabels(getLocalization(locale).searchPage.searchForm.provenanceFilter);
  const displayAggregation = useMemo(
    () => enrichAggregationWithSelection(aggregation, checkboxValue),
    [aggregation, checkboxValue],
  );
  const options = useMemo(
    () => buildProvenanceFilterOptions(displayAggregation, labels),
    [displayAggregation, labels],
  );

  if (!shouldShowProvenanceFilter(displayAggregation) || options.length === 0) return null;

  return (
    <CheckboxGroup
      key={checkboxKey}
      options={options}
      value={checkboxValue}
      onChange={handleChange}
    />
  );
};

export default ProvenanceFilter;
