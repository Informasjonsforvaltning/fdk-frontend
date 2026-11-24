"use client";

import { useMemo, useState } from "react";
import { Checkbox, Paragraph } from "@digdir/designsystemet-react";
import { getLocalization, type LocaleCodes } from "@fdk-frontend/localization";

import Box from "../box";
import { FilterSearchInput, getTreeSearchState, type TreeSearchState } from "./filter-search";
import {
  enrichAggregationWithSelection,
  formatOrgPathCheckboxLabel,
  formatOrgPathLabel,
  getOrgPathChildren,
  getOrgPathParent,
  isOrgPathSelected,
  MAX_ORG_PATH_DEPTH,
  useOrgPathLabels,
  useSyncedOrgPathSelection,
  type OrgPathLabelMap,
  type OrgTypeDictionary,
} from "./org-path";
import { type AggregationKeyCount } from "./types";
import styles from "./search-form.module.scss";

type OrgPathLevelProps = {
  aggregation: AggregationKeyCount[];
  parentKey: string;
  depth: number;
  selected: string[];
  labels: OrgPathLabelMap;
  orgTypes: OrgTypeDictionary;
  onToggle: (key: string, checked: boolean) => void;
  searchState?: TreeSearchState;
};

const OrgPathLevel = ({
  aggregation,
  parentKey,
  depth,
  selected,
  labels,
  orgTypes,
  onToggle,
  searchState,
}: OrgPathLevelProps) => {
  if (depth > MAX_ORG_PATH_DEPTH) return null;

  const isExpanded = (key: string): boolean =>
    isOrgPathSelected(key, selected) || (searchState?.expanded.has(key) ?? false);
  if (depth > 1 && !isExpanded(parentKey)) return null;

  const children = getOrgPathChildren(aggregation, parentKey, depth).filter(
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
            label={formatOrgPathCheckboxLabel(key, count, selected, labels, orgTypes)}
            checked={isOrgPathSelected(key, selected)}
            onChange={(e) => onToggle(key, e.target.checked)}
          />
          {isExpanded(key) && (
            <OrgPathLevel
              aggregation={aggregation}
              parentKey={key}
              depth={depth + 1}
              selected={selected}
              labels={labels}
              orgTypes={orgTypes}
              onToggle={onToggle}
              searchState={searchState}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export type OrgFilterProps = {
  locale?: LocaleCodes;
  aggregation?: AggregationKeyCount[];
  value?: string[];
  onChange?: (value: string[]) => void;
};

const OrgFilter = ({ locale = "nb", aggregation = [], value, onChange }: OrgFilterProps) => {
  const { checkboxValue, onToggle } = useSyncedOrgPathSelection(value, onChange);
  const labels = useOrgPathLabels(locale);
  const { orgTypeFilter: orgTypes, filterSearch } = getLocalization(locale).searchPage.searchForm;
  const [searchQuery, setSearchQuery] = useState("");
  const displayAggregation = useMemo(
    () => enrichAggregationWithSelection(aggregation, checkboxValue),
    [aggregation, checkboxValue],
  );
  const searchState = useMemo(
    () =>
      getTreeSearchState(
        displayAggregation.map(({ key }) => key),
        searchQuery,
        (key) => formatOrgPathLabel(key, labels, orgTypes),
        getOrgPathParent,
      ),
    [displayAggregation, searchQuery, labels, orgTypes],
  );

  if (displayAggregation.length === 0) return null;

  return (
    <>
      <FilterSearchInput
        label={filterSearch.organisation}
        value={searchQuery}
        onChange={setSearchQuery}
      />
      {searchState?.visible.size === 0 ? (
        <Paragraph data-size="sm">{filterSearch.noResults}</Paragraph>
      ) : (
        <Box className={styles.box}>
          <OrgPathLevel
            aggregation={displayAggregation}
            parentKey=""
            depth={1}
            selected={checkboxValue}
            labels={labels}
            orgTypes={orgTypes}
            onToggle={onToggle}
            searchState={searchState}
          />
        </Box>
      )}
    </>
  );
};

export default OrgFilter;
