"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { accessKeysToQueryParam } from "./url";

/**
 * Syncs local access checkbox state with a controlled `value` from the URL.
 * Ignores URL updates until they match the selection we just emitted, avoiding
 * a feedback loop between optimistic local state and router-driven value.
 */
export const useSyncedAccessSelection = function (
  value: string[] | undefined,
  onChange?: (value: string[]) => void,
): {
  selected: string[];
  onChange: (value: string[]) => void;
} {
  const [selected, setSelected] = useState<string[]>(value ?? []);
  const pendingSelectionKeyRef = useRef<string | null>(null);
  const valueKey = value === undefined ? undefined : accessKeysToQueryParam(value);

  useEffect(() => {
    if (value === undefined || valueKey === undefined) return;

    if (pendingSelectionKeyRef.current !== null) {
      if (pendingSelectionKeyRef.current === valueKey) {
        pendingSelectionKeyRef.current = null;
      }
      return;
    }

    setSelected((current) => (accessKeysToQueryParam(current) === valueKey ? current : value));
  }, [value, valueKey]);

  const handleChange = useCallback(
    (next: string[]) => {
      setSelected(next);
      pendingSelectionKeyRef.current = accessKeysToQueryParam(next);
      onChange?.(next);
    },
    [onChange],
  );

  return { selected, onChange: handleChange };
};
