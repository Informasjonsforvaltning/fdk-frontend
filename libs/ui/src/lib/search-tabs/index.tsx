"use client";

import { ToggleGroup, Badge } from "@digdir/designsystemet-react";
import { SparklesFillIcon } from "@navikt/aksel-icons";
import { useRef, type ReactNode } from "react";
import styles from "./styles.module.scss";

import { KI_TOGGLE_VALUE, SEARCH_TAB_DEFINITIONS, type SearchTabsValue } from "./search-tab-config";

export type SearchTabsProps = {
  /** Controlled value (current set from URL). Use 'ki' when no segment. */
  value?: SearchTabsValue;
  defaultValue?: SearchTabsValue;
  onChange?: (value: SearchTabsValue) => void;
  /** Badge counts per tab value. `undefined` renders a loading placeholder. */
  badgeCounts?: Record<string, number | undefined>;
};

export type SearchTabItem = {
  value: SearchTabsValue;
  label: string;
  icon?: ReactNode;
  badgeCount?: number;
};

// TODO: localization remains to be implemented
export const searchTabItems: SearchTabItem[] = SEARCH_TAB_DEFINITIONS.map((tab) => ({
  value: tab.tab,
  label: tab.label,
  ...(tab.tab === KI_TOGGLE_VALUE ? { icon: <SparklesFillIcon /> } : {}),
  badgeCount: 0,
}));

export { deriveSearchTabValueFromPathname } from "./search-tab-route";

const SearchTabBadge = ({ count }: { count: number | undefined }) => {
  if (count === undefined) {
    return (
      <span
        className={styles.badgeLoading}
        aria-busy="true"
        aria-label="Laster antall treff"
      />
    );
  }

  return (
    <Badge
      count={count}
      variant="tinted"
      className={styles.badge}
    />
  );
};

const SearchTabs = ({ value, defaultValue = "ki", onChange, badgeCounts = {} }: SearchTabsProps) => {
  const isControlled = value !== undefined;
  const toggleValue = isControlled ? value : defaultValue;
  const userInitiatedChangeRef = useRef(false);

  return (
    <ToggleGroup
      value={toggleValue}
      {...(isControlled ? {} : { defaultValue })}
      onPointerDown={() => {
        userInitiatedChangeRef.current = true;
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          userInitiatedChangeRef.current = true;
        }
      }}
      onChange={(v) => {
        if (!userInitiatedChangeRef.current) return;
        userInitiatedChangeRef.current = false;
        onChange?.(v as SearchTabsValue);
      }}
      className={styles.tabs}
      variant="secondary"
    >
      {searchTabItems.map((item) => {
        const count = badgeCounts[item.value];
        return (
          <ToggleGroup.Item
            key={item.value}
            value={item.value}
            className={styles.tab}
          >
            <SearchTabBadge count={count} />
            <div>
              {item.icon}
              {item.label}
            </div>
          </ToggleGroup.Item>
        );
      })}
    </ToggleGroup>
  );
};

export default SearchTabs;
export { SearchTabs };
