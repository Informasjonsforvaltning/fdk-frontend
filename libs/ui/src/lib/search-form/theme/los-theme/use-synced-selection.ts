"use client";

import { useCallback } from "react";

import { useSyncedSelection } from "../../use-synced-selection";
import { computeNextLosThemeSelection } from "./selection";
import { losThemeKeysToQueryParam } from "./url";

/**
 * Syncs local los theme checkbox state with a controlled `value` from the URL.
 */
export const useSyncedLosThemeSelection = function (
  value: string[] | undefined,
  onChange?: (value: string[]) => void,
): {
  selected: string[];
  checkboxValue: string[];
  onToggle: (key: string, checked: boolean) => void;
} {
  const { selected, setSelected, pendingSelectionKeyRef, checkboxValue } = useSyncedSelection(
    value,
    losThemeKeysToQueryParam,
  );

  const onToggle = useCallback(
    (key: string, checked: boolean) => {
      let next: string[] = [];
      setSelected((currentSelected) => {
        next = computeNextLosThemeSelection(currentSelected, key, checked);
        pendingSelectionKeyRef.current = losThemeKeysToQueryParam(next);
        return next;
      });
      onChange?.(next);
    },
    [onChange, pendingSelectionKeyRef, setSelected],
  );

  return { selected, checkboxValue, onToggle };
};
