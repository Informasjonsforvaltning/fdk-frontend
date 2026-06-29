"use client";

import { useCallback } from "react";

import { useSyncedSelection } from "../use-synced-selection";
import { formatKeysToQueryParam } from "./url";

/**
 * Syncs local format checkbox state with a controlled `value` from the URL.
 */
export const useSyncedFormatSelection = function (
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
    formatKeysToQueryParam,
  );

  const handleChange = useCallback(
    (next: string[]) => {
      pendingSelectionKeyRef.current = formatKeysToQueryParam(next);
      onChange?.(next);
      setSelected(next);
    },
    [onChange, pendingSelectionKeyRef, setSelected],
  );

  return { selected, checkboxValue, checkboxKey, onChange: handleChange };
};
