"use client";

import { useMemo } from "react";
import { Checkbox } from "@digdir/designsystemet-react";
import { VStack } from "@fellesdatakatalog/ui";

import {
  enrichAggregationWithSelection,
  formatOrgPathCheckboxLabel,
  getOrgPathChildren,
  isOrgPathSelected,
  MAX_ORG_PATH_DEPTH,
  type AggregationKeyCount,
  useSyncedOrgPathSelection,
} from "./org-path";
import styles from "./search-form.module.scss";

type OrgPathLevelProps = {
  aggregation: AggregationKeyCount[];
  parentKey: string;
  depth: number;
  selected: string[];
  onToggle: (key: string, checked: boolean) => void;
};

const OrgPathLevel = ({ aggregation, parentKey, depth, selected, onToggle }: OrgPathLevelProps) => {
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
            label={formatOrgPathCheckboxLabel(key, count, selected)}
            checked={isOrgPathSelected(key, selected)}
            onChange={(e) => onToggle(key, e.target.checked)}
          />
          {isOrgPathSelected(key, selected) && (
            <OrgPathLevel
              aggregation={aggregation}
              parentKey={key}
              depth={depth + 1}
              selected={selected}
              onToggle={onToggle}
            />
          )}
        </div>
      ))}
    </VStack>
  );
};

export type OrgFilterProps = {
  aggregation?: AggregationKeyCount[];
  value?: string[];
  onChange?: (value: string[]) => void;
};

const OrgFilter = ({ aggregation = [], value, onChange }: OrgFilterProps) => {
  const { selected, onToggle } = useSyncedOrgPathSelection(value, onChange);
  const displayAggregation = useMemo(
    () => enrichAggregationWithSelection(aggregation, selected),
    [aggregation, selected],
  );

  if (displayAggregation.length === 0) return null;

  return (
    <OrgPathLevel
      aggregation={displayAggregation}
      parentKey=""
      depth={1}
      selected={selected}
      onToggle={onToggle}
    />
  );
};

export default OrgFilter;
