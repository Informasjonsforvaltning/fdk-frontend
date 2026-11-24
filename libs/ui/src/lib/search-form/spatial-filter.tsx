"use client";

import { useMemo, useState } from "react";
import { Paragraph } from "@digdir/designsystemet-react";
import { CheckboxGroup } from "@fellesdatakatalog/ui";
import { getLocalization, type LocaleCodes } from "@fdk-frontend/localization";

import Box from "../box";
import { enrichAggregationWithSelection } from "./enrich-aggregation";
import { FilterSearchInput, matchesFilterSearch, mergeVisibleSelection } from "./filter-search";
import {
  buildSpatialFilterOptions,
  formatSpatialLabel,
  shouldShowSpatialFilter,
  type SpatialLabelMap,
} from "./spatial";
import { type AggregationKeyCount } from "./types";
import { useSyncedSpatialSelection } from "./spatial/use-synced-selection";
import styles from "./search-form.module.scss";

export type SpatialFilterProps = {
  locale?: LocaleCodes;
  aggregation?: AggregationKeyCount[];
  labels?: SpatialLabelMap;
  value?: string[];
  onChange?: (value: string[]) => void;
};

const SpatialFilter = ({ locale = "nb", aggregation = [], labels, value, onChange }: SpatialFilterProps) => {
  const { checkboxValue, checkboxKey, onChange: handleChange } = useSyncedSpatialSelection(value, onChange);
  const { filterSearch } = getLocalization(locale).searchPage.searchForm;
  const [searchQuery, setSearchQuery] = useState("");
  const displayAggregation = useMemo(
    () => enrichAggregationWithSelection(aggregation, checkboxValue),
    [aggregation, checkboxValue],
  );
  const options = useMemo(() => buildSpatialFilterOptions(displayAggregation, labels), [displayAggregation, labels]);
  const visibleOptions = useMemo(
    () => options.filter(({ value: key }) => matchesFilterSearch(formatSpatialLabel(key, labels), searchQuery)),
    [options, labels, searchQuery],
  );

  if (!shouldShowSpatialFilter(displayAggregation) || options.length === 0) return null;

  const handleVisibleChange = (nextVisible: string[]) => {
    handleChange(
      mergeVisibleSelection(
        checkboxValue,
        visibleOptions.map(({ value: key }) => key),
        nextVisible,
      ),
    );
  };

  return (
    <>
      <FilterSearchInput
        label={filterSearch.geography}
        value={searchQuery}
        onChange={setSearchQuery}
      />
      {visibleOptions.length === 0 ? (
        <Paragraph data-size="sm">{filterSearch.noResults}</Paragraph>
      ) : (
        <Box className={styles.box}>
          <CheckboxGroup
            key={`${checkboxKey}-${searchQuery}`}
            options={visibleOptions}
            value={checkboxValue}
            onChange={handleVisibleChange}
          />
        </Box>
      )}
    </>
  );
};

export default SpatialFilter;
