"use client";

import { useEffect, useRef, useState, type Dispatch, type MutableRefObject, type SetStateAction } from "react";

/**
 * Core hook for URL-synced checkbox selection.
 *
 * Syncs local selection with a controlled `value` from the URL. While a
 * dropdown change is in flight, keeps optimistic `selected` until the URL
 * catches up. External URL changes (chip removal, clear all, browser
 * navigation) sync from `value` via effect.
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
  const checkboxKeyRef = useRef(valueKey ?? serialize(value ?? []));

  useEffect(() => {
    if (value === undefined || valueKey === undefined) return;

    const pending = pendingSelectionKeyRef.current;
    if (pending !== null) {
      if (pending === valueKey) {
        pendingSelectionKeyRef.current = null;
        return;
      }
      pendingSelectionKeyRef.current = null;
    }

    setSelected((current) => (serialize(current) === valueKey ? current : value));
  }, [value, valueKey, serialize]);

  const pending = pendingSelectionKeyRef.current;
  const isOptimistic = pending !== null && valueKey !== undefined && pending !== valueKey;
  const checkboxValue = value === undefined ? selected : isOptimistic ? selected : value;

  if (value === undefined) {
    checkboxKeyRef.current = serialize(selected);
  } else if (!isOptimistic && valueKey !== undefined) {
    checkboxKeyRef.current = valueKey;
  }

  return {
    selected,
    setSelected,
    pendingSelectionKeyRef,
    checkboxValue,
    checkboxKey: checkboxKeyRef.current,
  };
};
