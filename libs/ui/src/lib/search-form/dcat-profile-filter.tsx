"use client";

import { useMemo } from "react";
import { CheckboxGroup } from "@fellesdatakatalog/ui";
import { getLocalization, type LocaleCodes } from "@fdk-frontend/localization";

import { buildDcatProfileFilterOptions, shouldShowDcatProfileFilter } from "./dcat-profile";
import { getDcatProfileLabels } from "./dcat-profile/labels";
import { enrichAggregationWithSelection } from "./enrich-aggregation";
import { type AggregationKeyCount } from "./types";
import { useSyncedDcatProfileSelection } from "./dcat-profile/use-synced-selection";

export type DcatProfileFilterProps = {
  locale?: LocaleCodes;
  aggregation?: AggregationKeyCount[];
  value?: string[];
  onChange?: (value: string[]) => void;
};

const DcatProfileFilter = ({ locale = "nb", aggregation = [], value, onChange }: DcatProfileFilterProps) => {
  const { checkboxValue, checkboxKey, onChange: handleChange } = useSyncedDcatProfileSelection(value, onChange);
  const labels = getDcatProfileLabels(getLocalization(locale).searchPage.searchForm.dcatProfileFilter);
  const displayAggregation = useMemo(
    () => enrichAggregationWithSelection(aggregation, checkboxValue),
    [aggregation, checkboxValue],
  );
  const options = useMemo(
    () => buildDcatProfileFilterOptions(displayAggregation, labels),
    [displayAggregation, labels],
  );

  if (!shouldShowDcatProfileFilter(displayAggregation) || options.length === 0) return null;

  return (
    <CheckboxGroup
      key={checkboxKey}
      options={options}
      value={checkboxValue}
      onChange={handleChange}
    />
  );
};

export default DcatProfileFilter;
