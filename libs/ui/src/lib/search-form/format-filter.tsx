"use client";

import { useMemo, useState } from "react";
import { Paragraph, Tabs } from "@digdir/designsystemet-react";
import { CheckboxGroup, VStack } from "@fellesdatakatalog/ui";
import { getLocalization, type LocaleCodes } from "@fdk-frontend/localization";

import Box from "../box";
import { enrichAggregationWithSelection } from "./enrich-aggregation";
import { FilterSearchInput, matchesFilterSearch, mergeVisibleSelection } from "./filter-search";
import {
  buildFileTypeFilterOptions,
  buildMediaFormatFilterOptions,
  isFileTypeKey,
  isMediaTypeKey,
  shouldShowFormatFilter,
  type FormatFilterOption,
} from "./format";
import { formatLabel } from "./format/labels";
import { type AggregationKeyCount } from "./types";
import { useSyncedFormatSelection } from "./format/use-synced-selection";
import styles from "./search-form.module.scss";

export type FormatFilterProps = {
  locale?: LocaleCodes;
  aggregation?: AggregationKeyCount[];
  value?: string[];
  onChange?: (value: string[]) => void;
};

const filterOptions = (options: FormatFilterOption[], query: string): FormatFilterOption[] =>
  options.filter(({ value: key }) => matchesFilterSearch(formatLabel(key), query));

const FormatFilter = ({ locale = "nb", aggregation = [], value, onChange }: FormatFilterProps) => {
  const { checkboxValue, checkboxKey, onChange: handleChange } = useSyncedFormatSelection(value, onChange);
  const { formatFilter: dict, filterSearch } = getLocalization(locale).searchPage.searchForm;
  const [searchQuery, setSearchQuery] = useState("");
  const displayAggregation = useMemo(
    () => enrichAggregationWithSelection(aggregation, checkboxValue),
    [aggregation, checkboxValue],
  );
  const fileTypeOptions = useMemo(() => buildFileTypeFilterOptions(displayAggregation), [displayAggregation]);
  const mediaFormatOptions = useMemo(() => buildMediaFormatFilterOptions(displayAggregation), [displayAggregation]);
  const visibleFileTypeOptions = useMemo(
    () => filterOptions(fileTypeOptions, searchQuery),
    [fileTypeOptions, searchQuery],
  );
  const visibleMediaFormatOptions = useMemo(
    () => filterOptions(mediaFormatOptions, searchQuery),
    [mediaFormatOptions, searchQuery],
  );

  const selectedFileTypes = useMemo(() => checkboxValue.filter(isFileTypeKey), [checkboxValue]);
  const selectedMediaFormats = useMemo(() => checkboxValue.filter(isMediaTypeKey), [checkboxValue]);

  const handleFileTypeChange = (nextVisibleFileTypes: string[]) => {
    const nextFileTypes = mergeVisibleSelection(
      selectedFileTypes,
      visibleFileTypeOptions.map(({ value: key }) => key),
      nextVisibleFileTypes,
    );
    handleChange([...nextFileTypes, ...selectedMediaFormats]);
  };

  const handleMediaFormatChange = (nextVisibleMediaFormats: string[]) => {
    const nextMediaFormats = mergeVisibleSelection(
      selectedMediaFormats,
      visibleMediaFormatOptions.map(({ value: key }) => key),
      nextVisibleMediaFormats,
    );
    handleChange([...selectedFileTypes, ...nextMediaFormats]);
  };

  if (!shouldShowFormatFilter(displayAggregation)) return null;

  const noResults = <Paragraph data-size="sm">{filterSearch.noResults}</Paragraph>;

  return (
    <>
      <FilterSearchInput
        label={filterSearch.format}
        value={searchQuery}
        onChange={setSearchQuery}
      />
      <Tabs
        defaultValue="media-format"
        className={styles.filterTabs}
      >
        <Tabs.List>
          <Tabs.Tab value="media-format">{dict.mediaFormat}</Tabs.Tab>
          <Tabs.Tab value="file-type">{dict.fileType}</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel
          value="media-format"
          style={{ padding: 0, paddingTop: "0.5rem" }}
        >
          {mediaFormatOptions.length > 0 && visibleMediaFormatOptions.length === 0 ? noResults : null}
          {visibleMediaFormatOptions.length > 0 ? (
            <VStack>
              <Box className={styles.box}>
                <CheckboxGroup
                  key={`${checkboxKey}-media-${searchQuery}`}
                  options={visibleMediaFormatOptions}
                  value={selectedMediaFormats}
                  onChange={handleMediaFormatChange}
                />
              </Box>
            </VStack>
          ) : null}
        </Tabs.Panel>
        <Tabs.Panel
          value="file-type"
          style={{ padding: 0, paddingTop: "0.5rem" }}
        >
          {fileTypeOptions.length > 0 && visibleFileTypeOptions.length === 0 ? noResults : null}
          {visibleFileTypeOptions.length > 0 ? (
            <VStack>
              <Box className={styles.box}>
                <CheckboxGroup
                  key={`${checkboxKey}-file-${searchQuery}`}
                  options={visibleFileTypeOptions}
                  value={selectedFileTypes}
                  onChange={handleFileTypeChange}
                />
              </Box>
            </VStack>
          ) : null}
        </Tabs.Panel>
      </Tabs>
    </>
  );
};

export default FormatFilter;
