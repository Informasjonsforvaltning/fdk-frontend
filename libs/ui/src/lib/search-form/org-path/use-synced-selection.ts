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
  onToggle: (key: string, checked: boolean) => void;
} {
  const { selected, setSelected, pendingSelectionKeyRef } = useSyncedSelection(value, orgPathKeysToQueryParam);

  const onToggle = useCallback(
    (key: string, checked: boolean) => {
      let next: string[] = [];
      setSelected((currentSelected) => {
        next = computeNextOrgPathSelection(currentSelected, key, checked);
        pendingSelectionKeyRef.current = orgPathKeysToQueryParam(next);
        return next;
      });
      onChange?.(next);
    },
    [onChange, pendingSelectionKeyRef, setSelected],
  );

  return { selected, onToggle };
};
