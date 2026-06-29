"use client";

import { useCallback } from "react";

import { accessKeysToQueryParam } from "./url";
import { useSyncedSelection } from "../use-synced-selection";

/**
 * Syncs local access checkbox state with a controlled `value` from the URL.
 */
export const useSyncedAccessSelection = function (
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
    accessKeysToQueryParam,
  );

  const handleChange = useCallback(
    (next: string[]) => {
      setSelected(next);
      pendingSelectionKeyRef.current = accessKeysToQueryParam(next);
      onChange?.(next);
    },
    [onChange, pendingSelectionKeyRef, setSelected],
  );

  return { selected, checkboxValue, checkboxKey, onChange: handleChange };
};
