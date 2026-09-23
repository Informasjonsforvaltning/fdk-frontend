"use client";

import { useMemo } from "react";
import { CheckboxGroup } from "@fellesdatakatalog/ui";
import { getLocalization, type LocaleCodes } from "@fdk-frontend/localization";

import { buildDcatProfileFilterOptions, shouldShowDcatProfileFilter } from "./dcat-profile";
import { getDcatProfileLabels } from "./dcat-profile/labels";
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
  const options = useMemo(() => buildDcatProfileFilterOptions(aggregation, labels), [aggregation, labels]);

  if (!shouldShowDcatProfileFilter(aggregation) || options.length === 0) return null;

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
