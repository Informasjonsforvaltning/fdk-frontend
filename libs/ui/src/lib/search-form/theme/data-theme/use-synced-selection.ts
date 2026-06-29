"use client";

import { useCallback } from "react";

import { useSyncedSelection } from "../../use-synced-selection";
import { dataThemeKeysToQueryParam } from "./url";

/**
 * Syncs local data theme checkbox state with a controlled `value` from the URL.
 */
export const useSyncedDataThemeSelection = function (
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
    dataThemeKeysToQueryParam,
  );

  const handleChange = useCallback(
    (next: string[]) => {
      setSelected(next);
      pendingSelectionKeyRef.current = dataThemeKeysToQueryParam(next);
      onChange?.(next);
    },
    [onChange, pendingSelectionKeyRef, setSelected],
  );

  return { selected, checkboxValue, checkboxKey, onChange: handleChange };
};
