"use client";

import { useCallback } from "react";

import { useSyncedSelection } from "../use-synced-selection";
import { provenanceKeysToQueryParam } from "./url";

/**
 * Syncs local provenance checkbox state with a controlled `value` from the URL.
 */
export const useSyncedProvenanceSelection = function (
  value: string[] | undefined,
  onChange?: (value: string[]) => void,
): {
  selected: string[];
  onChange: (value: string[]) => void;
} {
  const { selected, setSelected, pendingSelectionKeyRef } = useSyncedSelection(value, provenanceKeysToQueryParam);

  const handleChange = useCallback(
    (next: string[]) => {
      setSelected(next);
      pendingSelectionKeyRef.current = provenanceKeysToQueryParam(next);
      onChange?.(next);
    },
    [onChange, pendingSelectionKeyRef, setSelected],
  );

  return { selected, onChange: handleChange };
};
