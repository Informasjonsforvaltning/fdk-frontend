"use client";

import { useMemo } from "react";
import { Checkbox } from "@digdir/designsystemet-react";
import { VStack } from "@fellesdatakatalog/ui";

import { type AggregationKeyCount } from "../../types";
import styles from "../../search-form.module.scss";
import { formatLosThemeCheckboxLabel } from "./labels";
import { isLosThemeSelected } from "./selection";
import { MAX_LOS_THEME_DEPTH } from "./types";
import { enrichLosThemeAggregationWithSelection, getLosThemeChildren } from "./tree";
import { useSyncedLosThemeSelection } from "./use-synced-selection";

type LosThemeTreeLevelProps = {
  aggregation: AggregationKeyCount[];
  parentKey: string;
  depth: number;
  selected: string[];
  onToggle: (key: string, checked: boolean) => void;
};

const LosThemeTreeLevel = ({ aggregation, parentKey, depth, selected, onToggle }: LosThemeTreeLevelProps) => {
  if (depth > MAX_LOS_THEME_DEPTH) return null;
  if (depth > 1 && !isLosThemeSelected(parentKey, selected)) return null;

  const children = getLosThemeChildren(aggregation, parentKey, depth);
  if (children.length === 0) return null;

  return (
    <VStack className={depth > 1 ? styles.orgPathNested : styles.orgPathLevel}>
      {children.map(({ key, count }) => (
        <div
          key={key}
          className={styles.orgPathItem}
        >
          <Checkbox
            label={formatLosThemeCheckboxLabel(key, count, selected)}
            checked={isLosThemeSelected(key, selected)}
            onChange={(e) => onToggle(key, e.target.checked)}
          />
          {isLosThemeSelected(key, selected) && (
            <LosThemeTreeLevel
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

export type LosThemeTreeFilterProps = {
  aggregation?: AggregationKeyCount[];
  value?: string[];
  onChange?: (value: string[]) => void;
};

const LosThemeTreeFilter = ({ aggregation = [], value, onChange }: LosThemeTreeFilterProps) => {
  const { selected, onToggle } = useSyncedLosThemeSelection(value, onChange);
  const displayAggregation = useMemo(
    () => enrichLosThemeAggregationWithSelection(aggregation, selected),
    [aggregation, selected],
  );

  if (displayAggregation.length === 0) return null;

  return (
    <LosThemeTreeLevel
      aggregation={displayAggregation}
      parentKey=""
      depth={1}
      selected={selected}
      onToggle={onToggle}
    />
  );
};

export default LosThemeTreeFilter;
