"use client";

import { useCallback } from "react";

import { useSyncedSelection } from "../use-synced-selection";
import { dcatProfileKeysToQueryParam } from "./url";

/**
 * Syncs local dcat profile checkbox state with a controlled `value` from the URL.
 */
export const useSyncedDcatProfileSelection = function (
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
    dcatProfileKeysToQueryParam,
  );

  const handleChange = useCallback(
    (next: string[]) => {
      pendingSelectionKeyRef.current = dcatProfileKeysToQueryParam(next);
      onChange?.(next);
      setSelected(next);
    },
    [onChange, pendingSelectionKeyRef, setSelected],
  );

  return { selected, checkboxValue, checkboxKey, onChange: handleChange };
};
