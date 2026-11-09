"use client";

import cn from "classnames";
import { Badge, Link } from "@digdir/designsystemet-react";
import { SparklesFillIcon } from "@navikt/aksel-icons";
import { getLocalization, type LocaleCodes } from "@fdk-frontend/localization";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { type MouseEvent } from "react";
import {
  buildSearchPageUrlFromSearchParams,
  deriveSearchSetIdFromPathname,
  SEARCH_DEFAULT_PAGE,
  SEARCH_SETS,
  type SearchSetId,
} from "@fdk-frontend/utils";

import styles from "./search-menu.module.scss";

export type SearchMenuProps = {
  /** Badge counts per set id. `undefined` renders a loading placeholder. */
  badgeCounts?: Record<string, number | undefined>;
  locale?: LocaleCodes;
  /**
   * Transportportal menu: all-catalogs, datasets, and docs.
   * The other catalog sets and AI are omitted.
   */
  hideAiSet?: boolean;
};

/** Sets listed in the search menu on the transportportal profile. */
export const isTransportportalMenuSet = (setId: SearchSetId): boolean =>
  setId === "all-catalogs" || setId === "datasets" || setId === "docs";

type SearchMenuSet = (typeof SEARCH_SETS)[number];

/** Catalog sets that are included in all-catalogs. Docs and AI are separate. */
const isCatalogSubset = (set: SearchMenuSet): boolean => "summary" in set;

const SearchSetBadge = ({ count, loadingAriaLabel }: { count: number | undefined; loadingAriaLabel: string }) => {
  if (count === undefined) {
    return (
      <span
        className={styles.badgeLoading}
        role="img"
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

const SearchMenuEntry = ({
  set,
  label,
  count,
  isActive,
  loadingAriaLabel,
  href,
  onNavigate,
}: {
  set: SearchMenuSet;
  label: string;
  count: number | undefined;
  isActive: boolean;
  loadingAriaLabel: string;
  href: string;
  onNavigate: (event: MouseEvent<HTMLAnchorElement>, href: string) => void;
}) => {
  const content = (
    <>
      <span className={styles.label}>
        {set.id === "ai" && <SparklesFillIcon aria-hidden />}
        {label}
      </span>
      <SearchSetBadge
        count={count}
        loadingAriaLabel={loadingAriaLabel}
      />
    </>
  );

  if (isActive) {
    return (
      <strong
        className={cn(styles.item, styles.current)}
        aria-current="page"
      >
        {content}
      </strong>
    );
  }

  return (
    <Link
      className={styles.item}
      href={href}
      onClick={(event) => onNavigate(event, href)}
    >
      {content}
    </Link>
  );
};

const SearchMenu = ({ badgeCounts = {}, locale = "nb", hideAiSet = false }: SearchMenuProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeSet = deriveSearchSetIdFromPathname(pathname);
  const dict = getLocalization(locale).searchPage.searchSets;
  const visibleSets = SEARCH_SETS.filter((set) => (hideAiSet ? isTransportportalMenuSet(set.id) : true));
  const catalogSubsets = visibleSets.filter(isCatalogSubset);
  const topLevelSets = visibleSets.filter((set) => !isCatalogSubset(set));

  const hrefForSet = (setId: SearchSetId): string =>
    buildSearchPageUrlFromSearchParams(pathname, new URLSearchParams(searchParams.toString()), {
      setId,
      page: SEARCH_DEFAULT_PAGE,
    });

  const handleNavigate = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button) return;
    event.preventDefault();
    const currentQueryString = searchParams.toString();
    const currentUrl = currentQueryString ? `${pathname}?${currentQueryString}` : pathname;
    if (href === currentUrl) return;
    router.replace(href);
  };

  const renderEntry = (set: SearchMenuSet) => (
    <SearchMenuEntry
      set={set}
      label={dict[set.id] ?? set.id}
      count={badgeCounts[set.id]}
      isActive={set.id === activeSet}
      loadingAriaLabel={dict.loadingBadgeAriaLabel}
      href={hrefForSet(set.id)}
      onNavigate={handleNavigate}
    />
  );

  return (
    <nav
      className={styles.menu}
      aria-label={dict.navAriaLabel}
    >
      <ul className={styles.list}>
        {topLevelSets.map((set) => (
          <li key={set.id}>
            {renderEntry(set)}
            {set.id === "all-catalogs" && catalogSubsets.length > 0 ? (
              <ul className={cn(styles.list, styles.sublist)}>
                {catalogSubsets.map((subset) => (
                  <li key={subset.id}>{renderEntry(subset)}</li>
                ))}
              </ul>
            ) : null}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SearchMenu;
