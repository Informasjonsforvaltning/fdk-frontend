"use client";

import { useMemo } from "react";
import { CheckboxGroup } from "@fellesdatakatalog/ui";
import { getLocalization, type LocaleCodes } from "@fdk-frontend/localization";

import { buildProvenanceFilterOptions, shouldShowProvenanceFilter } from "./provenance";
import { getProvenanceLabels } from "./provenance/labels";
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
  const options = useMemo(() => buildProvenanceFilterOptions(aggregation, labels), [aggregation, labels]);

  if (!shouldShowProvenanceFilter(aggregation) || options.length === 0) return null;

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
