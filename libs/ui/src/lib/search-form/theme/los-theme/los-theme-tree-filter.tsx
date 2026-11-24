"use client";

import { useMemo } from "react";
import { Checkbox, Paragraph } from "@digdir/designsystemet-react";
import { getLocalization, type LocaleCodes } from "@fdk-frontend/localization";

import Box from "../../../box";
import { getTreeSearchState, type TreeSearchState } from "../../filter-search";
import { type AggregationKeyCount } from "../../types";
import styles from "../../search-form.module.scss";
import { formatLosThemeCheckboxLabel, formatLosThemeLabel, type LosThemeLabelMap } from "./labels";
import { isLosThemeSelected } from "./selection";
import { MAX_LOS_THEME_DEPTH } from "./types";
import { enrichLosThemeAggregationWithSelection, getLosThemeChildren, getLosThemeParent } from "./tree";
import { useSyncedLosThemeSelection } from "./use-synced-selection";
import { useLosThemeLabels } from "./use-los-theme-labels";

type LosThemeTreeLevelProps = {
  aggregation: AggregationKeyCount[];
  parentKey: string;
  depth: number;
  selected: string[];
  labels: LosThemeLabelMap;
  onToggle: (key: string, checked: boolean) => void;
  searchState?: TreeSearchState;
};

const LosThemeTreeLevel = ({
  aggregation,
  parentKey,
  depth,
  selected,
  labels,
  onToggle,
  searchState,
}: LosThemeTreeLevelProps) => {
  if (depth > MAX_LOS_THEME_DEPTH) return null;

  const isExpanded = (key: string): boolean =>
    isLosThemeSelected(key, selected) || (searchState?.expanded.has(key) ?? false);
  if (depth > 1 && !isExpanded(parentKey)) return null;

  const children = getLosThemeChildren(aggregation, parentKey, depth).filter(
    ({ key }) => !searchState || searchState.visible.has(key),
  );
  if (children.length === 0) return null;

  return (
    <div className={depth > 1 ? styles.orgPathNested : styles.orgPathLevel}>
      {children.map(({ key, count }) => (
        <div
          key={key}
          className={styles.orgPathItem}
        >
          <Checkbox
            label={formatLosThemeCheckboxLabel(key, count, selected, labels)}
            checked={isLosThemeSelected(key, selected)}
            onChange={(e) => onToggle(key, e.target.checked)}
          />
          {isExpanded(key) && (
            <LosThemeTreeLevel
              aggregation={aggregation}
              parentKey={key}
              depth={depth + 1}
              selected={selected}
              labels={labels}
              onToggle={onToggle}
              searchState={searchState}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export type LosThemeTreeFilterProps = {
  locale?: LocaleCodes;
  aggregation?: AggregationKeyCount[];
  value?: string[];
  onChange?: (value: string[]) => void;
  searchQuery?: string;
};

const LosThemeTreeFilter = ({
  locale = "nb",
  aggregation = [],
  value,
  onChange,
  searchQuery = "",
}: LosThemeTreeFilterProps) => {
  const { checkboxValue, onToggle } = useSyncedLosThemeSelection(value, onChange);
  const labels = useLosThemeLabels(locale);
  const displayAggregation = useMemo(
    () => enrichLosThemeAggregationWithSelection(aggregation, checkboxValue),
    [aggregation, checkboxValue],
  );
  const searchState = useMemo(
    () =>
      getTreeSearchState(
        displayAggregation.map(({ key }) => key),
        searchQuery,
        (key) => formatLosThemeLabel(key, labels),
        getLosThemeParent,
      ),
    [displayAggregation, searchQuery, labels],
  );

  if (displayAggregation.length === 0) return null;

  if (searchState?.visible.size === 0) {
    return <Paragraph data-size="sm">{getLocalization(locale).searchPage.searchForm.filterSearch.noResults}</Paragraph>;
  }

  return (
    <Box className={styles.box}>
      <LosThemeTreeLevel
        aggregation={displayAggregation}
        parentKey=""
        depth={1}
        selected={checkboxValue}
        labels={labels}
        onToggle={onToggle}
        searchState={searchState}
      />
    </Box>
  );
};

export default LosThemeTreeFilter;
