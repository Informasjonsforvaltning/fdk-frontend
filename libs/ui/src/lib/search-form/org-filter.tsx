"use client";

import { useMemo } from "react";
import { Checkbox } from "@digdir/designsystemet-react";
import { VStack } from "@fellesdatakatalog/ui";
import { getLocalization, type LocaleCodes } from "@fdk-frontend/localization";

import {
  enrichAggregationWithSelection,
  formatOrgPathCheckboxLabel,
  getOrgPathChildren,
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
};

const OrgPathLevel = ({ aggregation, parentKey, depth, selected, labels, orgTypes, onToggle }: OrgPathLevelProps) => {
  if (depth > MAX_ORG_PATH_DEPTH) return null;
  if (depth > 1 && !isOrgPathSelected(parentKey, selected)) return null;

  const children = getOrgPathChildren(aggregation, parentKey, depth);
  if (children.length === 0) return null;

  return (
    <VStack className={depth > 1 ? styles.orgPathNested : styles.orgPathLevel}>
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
          {isOrgPathSelected(key, selected) && (
            <OrgPathLevel
              aggregation={aggregation}
              parentKey={key}
              depth={depth + 1}
              selected={selected}
              labels={labels}
              orgTypes={orgTypes}
              onToggle={onToggle}
            />
          )}
        </div>
      ))}
    </VStack>
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
  const orgTypes = getLocalization(locale).searchPage.searchForm.orgTypeFilter;
  const displayAggregation = useMemo(
    () => enrichAggregationWithSelection(aggregation, checkboxValue),
    [aggregation, checkboxValue],
  );

  if (displayAggregation.length === 0) return null;

  return (
    <OrgPathLevel
      aggregation={displayAggregation}
      parentKey=""
      depth={1}
      selected={checkboxValue}
      labels={labels}
      orgTypes={orgTypes}
      onToggle={onToggle}
    />
  );
};

export default OrgFilter;
