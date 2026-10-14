"use client";

import { useMemo } from "react";
import { CheckboxGroup } from "@fellesdatakatalog/ui";
import { getLocalization, type LocaleCodes } from "@fdk-frontend/localization";

import { buildAccessFilterOptions, shouldShowAccessFilter } from "./access";
import { getAccessRightsLabels } from "./access/labels";
import { enrichAggregationWithSelection } from "./enrich-aggregation";
import { type AggregationKeyCount } from "./types";
import { useSyncedAccessSelection } from "./access/use-synced-selection";

export type AccessFilterProps = {
  locale?: LocaleCodes;
  aggregation?: AggregationKeyCount[];
  value?: string[];
  onChange?: (value: string[]) => void;
};

const AccessFilter = ({ locale = "nb", aggregation = [], value, onChange }: AccessFilterProps) => {
  const { checkboxValue, checkboxKey, onChange: handleChange } = useSyncedAccessSelection(value, onChange);
  const labels = getAccessRightsLabels(getLocalization(locale).searchPage.searchForm.accessFilter);
  const displayAggregation = useMemo(
    () => enrichAggregationWithSelection(aggregation, checkboxValue),
    [aggregation, checkboxValue],
  );
  const options = useMemo(
    () => buildAccessFilterOptions(displayAggregation, labels),
    [displayAggregation, labels],
  );

  if (options.length === 0) return null;
  if (!shouldShowAccessFilter(displayAggregation) && checkboxValue.length === 0) return null;

  return (
    <CheckboxGroup
      key={checkboxKey}
      options={options}
      value={checkboxValue}
      onChange={handleChange}
    />
  );
};

export default AccessFilter;
