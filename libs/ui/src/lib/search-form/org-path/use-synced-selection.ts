"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { computeNextOrgPathSelection } from "./selection";
import { orgPathKeysToQueryParam } from "./url";

/**
 * Syncs local org-path checkbox state with a controlled `value` from the URL.
 * Ignores URL updates until they match the selection we just emitted, avoiding
 * a feedback loop between optimistic local state and router-driven value.
 */
export const useSyncedOrgPathSelection = function (
  value: string[] | undefined,
  onChange?: (value: string[]) => void,
): {
  selected: string[];
  onToggle: (key: string, checked: boolean) => void;
} {
  const [selected, setSelected] = useState<string[]>(value ?? []);
  const pendingSelectionKeyRef = useRef<string | null>(null);
  const valueKey = value === undefined ? undefined : orgPathKeysToQueryParam(value);

  useEffect(() => {
    if (value === undefined || valueKey === undefined) return;

    if (pendingSelectionKeyRef.current !== null) {
      if (pendingSelectionKeyRef.current === valueKey) {
        pendingSelectionKeyRef.current = null;
      }
      return;
    }

    setSelected((current) => (orgPathKeysToQueryParam(current) === valueKey ? current : value));
  }, [value, valueKey]);

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
    [onChange],
  );

  return { selected, onToggle };
};
