"use client";

import { useMemo } from "react";
import { Checkbox } from "@digdir/designsystemet-react";
import { VStack } from "@fellesdatakatalog/ui";
import type { LocaleCodes } from "@fdk-frontend/localization";

import { type AggregationKeyCount } from "../../types";
import styles from "../../search-form.module.scss";
import { formatLosThemeCheckboxLabel, type LosThemeLabelMap } from "./labels";
import { isLosThemeSelected } from "./selection";
import { MAX_LOS_THEME_DEPTH } from "./types";
import { enrichLosThemeAggregationWithSelection, getLosThemeChildren } from "./tree";
import { useSyncedLosThemeSelection } from "./use-synced-selection";
import { useLosThemeLabels } from "./use-los-theme-labels";

type LosThemeTreeLevelProps = {
  aggregation: AggregationKeyCount[];
  parentKey: string;
  depth: number;
  selected: string[];
  labels: LosThemeLabelMap;
  onToggle: (key: string, checked: boolean) => void;
};

const LosThemeTreeLevel = ({ aggregation, parentKey, depth, selected, labels, onToggle }: LosThemeTreeLevelProps) => {
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
            label={formatLosThemeCheckboxLabel(key, count, selected, labels)}
            checked={isLosThemeSelected(key, selected)}
            onChange={(e) => onToggle(key, e.target.checked)}
          />
          {isLosThemeSelected(key, selected) && (
            <LosThemeTreeLevel
              aggregation={aggregation}
              parentKey={key}
              depth={depth + 1}
              selected={selected}
              labels={labels}
              onToggle={onToggle}
            />
          )}
        </div>
      ))}
    </VStack>
  );
};

export type LosThemeTreeFilterProps = {
  locale?: LocaleCodes;
  aggregation?: AggregationKeyCount[];
  value?: string[];
  onChange?: (value: string[]) => void;
};

const LosThemeTreeFilter = ({ locale = "nb", aggregation = [], value, onChange }: LosThemeTreeFilterProps) => {
  const { selected, onToggle } = useSyncedLosThemeSelection(value, onChange);
  const labels = useLosThemeLabels(locale);
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
      labels={labels}
      onToggle={onToggle}
    />
  );
};

export default LosThemeTreeFilter;
