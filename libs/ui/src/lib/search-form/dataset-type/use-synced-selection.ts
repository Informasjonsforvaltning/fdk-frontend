"use client";

import { useCallback } from "react";

import { useSyncedSelection } from "../use-synced-selection";
import { datasetTypeKeysToQueryParam } from "./url";

/**
 * Syncs local dataset type checkbox state with a controlled `value` from the URL.
 */
export const useSyncedDatasetTypeSelection = function (
  value: string[] | undefined,
  onChange?: (value: string[]) => void,
): {
  selected: string[];
  checkboxValue: string[];
  checkboxKey: string;
  onChange: (value: string[]) => void;
} {
  const { selected, setSelected, pendingSelectionKeyRef, checkboxValue, checkboxKey } = useSyncedSelection(
    value,
    datasetTypeKeysToQueryParam,
  );

  const handleChange = useCallback(
    (next: string[]) => {
      pendingSelectionKeyRef.current = datasetTypeKeysToQueryParam(next);
      onChange?.(next);
      setSelected(next);
    },
    [onChange, pendingSelectionKeyRef, setSelected],
  );

  return { selected, checkboxValue, checkboxKey, onChange: handleChange };
};
