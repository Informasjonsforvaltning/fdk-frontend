"use client";

import { useMemo } from "react";
import { Tabs } from "@digdir/designsystemet-react";
import { CheckboxGroup, VStack } from "@fellesdatakatalog/ui";
import type { LocaleCodes } from "@fdk-frontend/localization";

import Box from "../box";
import { LosThemeTreeFilter } from "./theme/los-theme";
import { buildDataThemeFilterOptions, shouldShowTemaFilter } from "./theme";
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
  const { selected, onChange: handleDataThemeChange } = useSyncedDataThemeSelection(dataThemeValue, onDataThemeChange);
  const dataThemeLabels = useDataThemeLabels(locale);
  const dataThemeOptions = useMemo(
    () => buildDataThemeFilterOptions(dataThemeAggregation, dataThemeLabels),
    [dataThemeAggregation, dataThemeLabels],
  );

  if (!shouldShowTemaFilter(losThemeAggregation, dataThemeAggregation)) return null;

  return (
    <Tabs
      defaultValue="tema"
      className={styles.filterTabs}
    >
      <Tabs.List>
        {/* TODO: localization remains to be implemented */}
        <Tabs.Tab value="tema">Tema</Tabs.Tab>
        <Tabs.Tab value="eu-tema">EU-tema</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel
        value="tema"
        style={{ padding: 0, paddingTop: "0.5rem" }}
      >
        {losThemeAggregation.length > 0 ? (
          <VStack>
            <Box className={styles.box}>
              <LosThemeTreeFilter
                locale={locale}
                aggregation={losThemeAggregation}
                value={losThemeValue}
                onChange={onLosThemeChange}
              />
            </Box>
          </VStack>
        ) : null}
      </Tabs.Panel>
      <Tabs.Panel
        value="eu-tema"
        style={{ padding: 0, paddingTop: "0.5rem" }}
      >
        {dataThemeOptions.length > 0 ? (
          <VStack>
            <Box className={styles.box}>
              <CheckboxGroup
                options={dataThemeOptions}
                value={selected}
                onChange={handleDataThemeChange}
              />
            </Box>
          </VStack>
        ) : null}
      </Tabs.Panel>
    </Tabs>
  );
};

export default ThemeFilter;
