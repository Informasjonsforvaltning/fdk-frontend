"use client";

import { useCallback } from "react";

import { computeNextOrgPathSelection } from "./selection";
import { orgPathKeysToQueryParam } from "./url";
import { useSyncedSelection } from "../use-synced-selection";

/**
 * Syncs local org-path checkbox state with a controlled `value` from the URL.
 */
export const useSyncedOrgPathSelection = function (
  value: string[] | undefined,
  onChange?: (value: string[]) => void,
): {
  selected: string[];
  checkboxValue: string[];
  onToggle: (key: string, checked: boolean) => void;
} {
  const { selected, setSelected, pendingSelectionKeyRef, checkboxValue } = useSyncedSelection(
    value,
    orgPathKeysToQueryParam,
  );

  const onToggle = useCallback(
    (key: string, checked: boolean) => {
      let next: string[] = [];
      setSelected((currentSelected) => {
        next = computeNextOrgPathSelection(currentSelected, key, checked);
        return next;
      });
      pendingSelectionKeyRef.current = orgPathKeysToQueryParam(next);
      onChange?.(next);
    },
    [onChange, pendingSelectionKeyRef, setSelected],
  );

  return { selected, checkboxValue, onToggle };
};
