"use client";

import { useRef, useState, type Dispatch, type MutableRefObject, type SetStateAction } from "react";

/**
 * Core hook for URL-synced checkbox selection.
 *
 * Syncs local selection with a controlled `value` from the URL. While a
 * dropdown change is in flight, keeps optimistic `selected` until the URL
 * catches up. External URL changes (chip removal, clear all, browser
 * navigation) sync immediately during render.
 */
export const useSyncedSelection = function (
  value: string[] | undefined,
  serialize: (keys: string[]) => string,
): {
  selected: string[];
  setSelected: Dispatch<SetStateAction<string[]>>;
  pendingSelectionKeyRef: MutableRefObject<string | null>;
  checkboxValue: string[];
  checkboxKey: string;
} {
  const [selected, setSelected] = useState<string[]>(value ?? []);
  const pendingSelectionKeyRef = useRef<string | null>(null);
  const valueKey = value === undefined ? undefined : serialize(value);
  const [prevValueKey, setPrevValueKey] = useState(valueKey);

  if (value !== undefined && valueKey !== undefined && valueKey !== prevValueKey) {
    setPrevValueKey(valueKey);

    const pending = pendingSelectionKeyRef.current;
    if (pending !== null && pending === valueKey) {
      pendingSelectionKeyRef.current = null;
    } else {
      if (pending !== null) {
        pendingSelectionKeyRef.current = null;
      }
      setSelected(value);
    }
  }

  const pending = pendingSelectionKeyRef.current;
  const isOptimistic = pending !== null && valueKey !== undefined && pending !== valueKey;
  const checkboxValue = value === undefined ? selected : isOptimistic ? selected : value;
  const checkboxKey = value === undefined ? serialize(selected) : valueKey;

  return { selected, setSelected, pendingSelectionKeyRef, checkboxValue, checkboxKey };
};
