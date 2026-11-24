"use client";

import { useMemo, useState } from "react";
import { Paragraph, Tabs } from "@digdir/designsystemet-react";
import { CheckboxGroup } from "@fellesdatakatalog/ui";
import { getLocalization, type LocaleCodes } from "@fdk-frontend/localization";

import Box from "../box";
import { enrichAggregationWithSelection } from "./enrich-aggregation";
import { FilterSearchInput, matchesFilterSearch, mergeVisibleSelection } from "./filter-search";
import { LosThemeTreeFilter } from "./theme/los-theme";
import { buildDataThemeFilterOptions } from "./theme";
import { formatDataThemeLabel } from "./theme/data-theme/labels";
import { useSyncedDataThemeSelection } from "./theme/data-theme/use-synced-selection";
import { useDataThemeLabels } from "./theme/data-theme/use-data-theme-labels";
import { type AggregationKeyCount } from "./types";
import styles from "./search-form.module.scss";

export type ThemeFilterProps = {
  locale?: LocaleCodes;
  losThemeAggregation?: AggregationKeyCount[];
  dataThemeAggregation?: AggregationKeyCount[];
  losThemeValue?: string[];
  dataThemeValue?: string[];
  onLosThemeChange?: (value: string[]) => void;
  onDataThemeChange?: (value: string[]) => void;
};

const ThemeFilter = ({
  locale = "nb",
  losThemeAggregation = [],
  dataThemeAggregation = [],
  losThemeValue,
  dataThemeValue,
  onLosThemeChange,
  onDataThemeChange,
}: ThemeFilterProps) => {
  const {
    checkboxValue,
    checkboxKey,
    onChange: handleDataThemeChange,
  } = useSyncedDataThemeSelection(dataThemeValue, onDataThemeChange);
  const { themeFilter: dict, filterSearch } = getLocalization(locale).searchPage.searchForm;
  const [searchQuery, setSearchQuery] = useState("");
  const dataThemeLabels = useDataThemeLabels(locale);
  const displayDataThemeAggregation = useMemo(
    () => enrichAggregationWithSelection(dataThemeAggregation, checkboxValue),
    [dataThemeAggregation, checkboxValue],
  );
  const dataThemeOptions = useMemo(
    () => buildDataThemeFilterOptions(displayDataThemeAggregation, dataThemeLabels),
    [displayDataThemeAggregation, dataThemeLabels],
  );
  const visibleDataThemeOptions = useMemo(
    () =>
      dataThemeOptions.filter(({ value }) =>
        matchesFilterSearch(formatDataThemeLabel(value, dataThemeLabels), searchQuery),
      ),
    [dataThemeOptions, dataThemeLabels, searchQuery],
  );
  const showLosTheme = losThemeAggregation.length > 0 || (losThemeValue?.length ?? 0) > 0;

  const handleVisibleDataThemeChange = (nextVisible: string[]) => {
    handleDataThemeChange(
      mergeVisibleSelection(
        checkboxValue,
        visibleDataThemeOptions.map(({ value }) => value),
        nextVisible,
      ),
    );
  };

  if (!showLosTheme && dataThemeOptions.length === 0) {
    return null;
  }

  return (
    <>
      <FilterSearchInput
        label={filterSearch.theme}
        value={searchQuery}
        onChange={setSearchQuery}
      />
      <Tabs
        defaultValue="tema"
        className={styles.filterTabs}
      >
        <Tabs.List>
          <Tabs.Tab value="tema">{dict.tema}</Tabs.Tab>
          <Tabs.Tab value="eu-tema">{dict.euTema}</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel
          value="tema"
          style={{ padding: 0, paddingTop: "0.5rem" }}
        >
          {showLosTheme ? (
            <LosThemeTreeFilter
              locale={locale}
              aggregation={losThemeAggregation}
              value={losThemeValue}
              onChange={onLosThemeChange}
              searchQuery={searchQuery}
            />
          ) : null}
        </Tabs.Panel>
        <Tabs.Panel
          value="eu-tema"
          style={{ padding: 0, paddingTop: "0.5rem" }}
        >
          {dataThemeOptions.length > 0 && visibleDataThemeOptions.length === 0 ? (
            <Paragraph data-size="sm">{filterSearch.noResults}</Paragraph>
          ) : null}
          {visibleDataThemeOptions.length > 0 ? (
            <Box className={styles.box}>
              <CheckboxGroup
                key={`${checkboxKey}-${searchQuery}`}
                options={visibleDataThemeOptions}
                value={checkboxValue}
                onChange={handleVisibleDataThemeChange}
              />
            </Box>
          ) : null}
        </Tabs.Panel>
      </Tabs>
    </>
  );
};

export default ThemeFilter;
