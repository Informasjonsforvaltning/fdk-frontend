"use client";

import { ToggleGroup, Badge } from "@digdir/designsystemet-react";
import { SparklesFillIcon } from "@navikt/aksel-icons";
import { useRef, type ReactNode } from "react";
import { getLocalization, type LocaleCodes } from "@fdk-frontend/localization";
import styles from "./styles.module.scss";

import { KI_TOGGLE_VALUE, SEARCH_TAB_DEFINITIONS, type SearchTabsValue } from "./search-tab-config";

export type SearchTabsProps = {
  /** Controlled value (current set from URL). Use 'ki' when no segment. */
  value?: SearchTabsValue;
  defaultValue?: SearchTabsValue;
  onChange?: (value: SearchTabsValue) => void;
  /** Badge counts per tab value. `undefined` renders a loading placeholder. */
  badgeCounts?: Record<string, number | undefined>;
  locale?: LocaleCodes;
};

export type SearchTabItem = {
  value: SearchTabsValue;
  label: string;
  icon?: ReactNode;
  badgeCount?: number;
};

export const getLocalizedSearchTabItems = (locale: LocaleCodes): SearchTabItem[] => {
  const dict = getLocalization(locale).searchPage.searchTabs;
  const labelMap: Record<string, string> = {
    ki: dict.ki,
    datasets: dict.datasets,
    "data-services": dict.dataServices,
    concepts: dict.concepts,
    "information-models": dict.informationModels,
    "services-and-events": dict.servicesAndEvents,
    docs: dict.docs,
  };
  return SEARCH_TAB_DEFINITIONS.map((tab) => ({
    value: tab.tab,
    label: labelMap[tab.tab] ?? tab.label,
    ...(tab.tab === KI_TOGGLE_VALUE ? { icon: <SparklesFillIcon /> } : {}),
    badgeCount: 0,
  }));
};

export { deriveSearchTabValueFromPathname } from "./search-tab-route";

const SearchTabBadge = ({ count, loadingAriaLabel }: { count: number | undefined; loadingAriaLabel: string }) => {
  if (count === undefined) {
    return (
      <span
        className={styles.badgeLoading}
        aria-busy="true"
        aria-label={loadingAriaLabel}
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

const SearchTabs = ({ value, defaultValue = "ki", onChange, badgeCounts = {}, locale = "nb" }: SearchTabsProps) => {
  const isControlled = value !== undefined;
  const toggleValue = isControlled ? value : defaultValue;
  const userInitiatedChangeRef = useRef(false);
  const dict = getLocalization(locale).searchPage.searchTabs;
  const localizedItems = getLocalizedSearchTabItems(locale);

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
      data-toggle-group={dict.searchTabsAriaLabel}
    >
      {localizedItems.map((item) => {
        const count = badgeCounts[item.value];
        return (
          <ToggleGroup.Item
            key={item.value}
            value={item.value}
            className={styles.tab}
          >
            <div>
              {item.icon}
              {item.label}
            </div>
            <SearchTabBadge
              count={count}
              loadingAriaLabel={dict.loadingBadgeAriaLabel}
            />
          </ToggleGroup.Item>
        );
      })}
    </ToggleGroup>
  );
};

export default SearchTabs;
export { SearchTabs };
