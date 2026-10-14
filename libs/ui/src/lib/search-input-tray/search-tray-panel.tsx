"use client";
import { type MouseEvent, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { Button, Link, Spinner } from "@digdir/designsystemet-react";
import { getLocalization, type LocaleCodes } from "@fdk-frontend/localization";
import { buildSearchSetPath, type SearchSetId } from "@fdk-frontend/utils";

import styles from "./search-input-tray.module.scss";

export const buildTraySetHref = (locale: string, setId: SearchSetId, query: string): string => {
  const params = new URLSearchParams();
  if (query) params.set("q", query);
  const path = buildSearchSetPath(locale, setId);
  const queryString = params.toString();
  return queryString ? `${path}?${queryString}` : path;
};

export const readEntityLabel = (labels: object, searchType: string): string | undefined => {
  if (!(searchType in labels)) return undefined;
  const value = Reflect.get(labels, searchType);
  return typeof value === "string" ? value : undefined;
};

type TrayPanelStatusProps = {
  locale: LocaleCodes;
  ready: boolean;
  empty: boolean;
  children: ReactNode;
};

export const TrayPanelStatus = ({ locale, ready, empty, children }: TrayPanelStatusProps) => {
  if (!ready) {
    return (
      <div className={styles.spinnerContainer}>
        <Spinner
          data-size="sm"
          aria-hidden="true"
        />
      </div>
    );
  }
  if (empty) {
    return <p className={styles.noResults}>{getLocalization(locale).searchPage.entitySearch.noResults}</p>;
  }
  return children;
};

type SearchTraySeeAllProps = {
  href: string;
  locale: LocaleCodes;
  onSelect?: () => void;
};

export const SearchTraySeeAll = ({ href, locale, onSelect }: SearchTraySeeAllProps) => {
  const router = useRouter();

  const openResults = (event: MouseEvent<HTMLAnchorElement>) => {
    onSelect?.();
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    event.preventDefault();
    router.push(href);
  };

  return (
    <Button
      asChild
      data-size="sm"
      variant="secondary"
      className={styles.seeAll}
    >
      <Link
        href={href}
        onClick={openResults}
      >
        {getLocalization(locale).searchPage.searchInput.seeAllResults}
      </Link>
    </Button>
  );
};
