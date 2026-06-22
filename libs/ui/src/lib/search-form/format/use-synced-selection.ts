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
  onChange: (value: string[]) => void;
} {
  const { selected, setSelected, pendingSelectionKeyRef } = useSyncedSelection(value, formatKeysToQueryParam);

  const handleChange = useCallback(
    (next: string[]) => {
      setSelected(next);
      pendingSelectionKeyRef.current = formatKeysToQueryParam(next);
      onChange?.(next);
    },
    [onChange, pendingSelectionKeyRef, setSelected],
  );

  return { selected, onChange: handleChange };
};
