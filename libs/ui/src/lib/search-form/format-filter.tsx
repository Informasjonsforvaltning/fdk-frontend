"use client";

import { useMemo } from "react";
import { Tabs } from "@digdir/designsystemet-react";
import { CheckboxGroup, VStack } from "@fellesdatakatalog/ui";

import Box from "../box";
import {
  buildFileTypeFilterOptions,
  buildMediaFormatFilterOptions,
  isFileTypeKey,
  isMediaTypeKey,
  shouldShowFormatFilter,
} from "./format";
import { type AggregationKeyCount } from "./types";
import { useSyncedFormatSelection } from "./format/use-synced-selection";
import styles from "./search-form.module.scss";

export type FormatFilterProps = {
  aggregation?: AggregationKeyCount[];
  value?: string[];
  onChange?: (value: string[]) => void;
};

const FormatFilter = ({ aggregation = [], value, onChange }: FormatFilterProps) => {
  const { checkboxValue, checkboxKey, onChange: handleChange } = useSyncedFormatSelection(value, onChange);
  const fileTypeOptions = useMemo(() => buildFileTypeFilterOptions(aggregation), [aggregation]);
  const mediaFormatOptions = useMemo(() => buildMediaFormatFilterOptions(aggregation), [aggregation]);

  const selectedFileTypes = useMemo(() => checkboxValue.filter(isFileTypeKey), [checkboxValue]);
  const selectedMediaFormats = useMemo(() => checkboxValue.filter(isMediaTypeKey), [checkboxValue]);

  const handleFileTypeChange = (nextFileTypes: string[]) => {
    handleChange([...nextFileTypes, ...selectedMediaFormats]);
  };

  const handleMediaFormatChange = (nextMediaFormats: string[]) => {
    handleChange([...selectedFileTypes, ...nextMediaFormats]);
  };

  if (!shouldShowFormatFilter(aggregation)) return null;

  return (
    <Tabs
      defaultValue="media-format"
      className={styles.filterTabs}
    >
      <Tabs.List>
        {/* TODO: localization remains to be implemented */}
        <Tabs.Tab value="media-format">Medieformat</Tabs.Tab>
        <Tabs.Tab value="file-type">Filtype</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel
        value="media-format"
        style={{ padding: 0, paddingTop: "0.5rem" }}
      >
        {mediaFormatOptions.length > 0 ? (
          <VStack>
            <Box className={styles.box}>
              <CheckboxGroup
                key={`${checkboxKey}-media`}
                options={mediaFormatOptions}
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
        {fileTypeOptions.length > 0 ? (
          <VStack>
            <Box className={styles.box}>
              <CheckboxGroup
                key={`${checkboxKey}-file`}
                options={fileTypeOptions}
                value={selectedFileTypes}
                onChange={handleFileTypeChange}
              />
            </Box>
          </VStack>
        ) : null}
      </Tabs.Panel>
    </Tabs>
  );
};

export default FormatFilter;
