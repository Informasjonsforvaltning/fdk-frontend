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

const SearchSetBadge = ({ count, loadingAriaLabel }: { count: number | undefined; loadingAriaLabel: string }) => {
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

const SearchMenu = ({ badgeCounts = {}, locale = "nb", hideAiSet = false }: SearchMenuProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeSet = deriveSearchSetIdFromPathname(pathname);
  const dict = getLocalization(locale).searchPage.searchSets;
  const sets = SEARCH_SETS.filter((set) => (hideAiSet ? isTransportportalMenuSet(set.id) : true));

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

  return (
    <nav
      className={styles.menu}
      aria-label={dict.navAriaLabel}
    >
      <ul className={styles.list}>
        {sets.map((set) => {
          const label = dict[set.id] ?? set.id;
          const count = badgeCounts[set.id];
          const isActive = set.id === activeSet;
          const content = (
            <>
              <span className={styles.label}>
                {set.id === "ai" && <SparklesFillIcon aria-hidden />}
                {label}
              </span>
              <SearchSetBadge
                count={count}
                loadingAriaLabel={dict.loadingBadgeAriaLabel}
              />
            </>
          );

          if (isActive) {
            return (
              <li key={set.id}>
                <strong
                  className={cn(styles.item, styles.current)}
                  aria-current="page"
                >
                  {content}
                </strong>
              </li>
            );
          }

          const href = hrefForSet(set.id);
          return (
            <li key={set.id}>
              <Link
                className={styles.item}
                href={href}
                onClick={(event) => handleNavigate(event, href)}
              >
                {content}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default SearchMenu;
