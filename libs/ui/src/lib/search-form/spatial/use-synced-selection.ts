"use client";

import { useCallback } from "react";

import { useSyncedSelection } from "../use-synced-selection";
import { spatialKeysToQueryParam } from "./url";

/**
 * Syncs local spatial checkbox state with a controlled `value` from the URL.
 */
export const useSyncedSpatialSelection = function (
  value: string[] | undefined,
  onChange?: (value: string[]) => void,
): {
  selected: string[];
  onChange: (value: string[]) => void;
} {
  const { selected, setSelected, pendingSelectionKeyRef } = useSyncedSelection(value, spatialKeysToQueryParam);

  const handleChange = useCallback(
    (next: string[]) => {
      setSelected(next);
      pendingSelectionKeyRef.current = spatialKeysToQueryParam(next);
      onChange?.(next);
    },
    [onChange, pendingSelectionKeyRef, setSelected],
  );

  return { selected, onChange: handleChange };
};
