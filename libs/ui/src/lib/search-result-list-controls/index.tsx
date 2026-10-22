"use client";

import { getLocalization, interpolate, parseLocaleFromPathname, type LocaleCodes } from "@fdk-frontend/localization";
import { Dropdown } from "@digdir/designsystemet-react";
import { CheckmarkIcon, ChevronDownIcon, SortDownIcon } from "@navikt/aksel-icons";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import {
  buildSearchPageUrlFromSearchParams,
  isCatalogSet,
  parseSearchPageSizeParam,
  parseSortQueryParam,
  SEARCH_DEFAULT_PAGE,
  SEARCH_PAGE_SIZE_OPTIONS,
  SEARCH_SORT_OPTION_LIST,
  getSortLabel as getSortLabelFromDict,
  type SearchSetId,
  type SearchSortOption,
} from "@fdk-frontend/utils";

import styles from "./search-result-list-controls.module.scss";

export type SearchResultListControlsProps = {
  lang?: LocaleCodes;
  activeSet: SearchSetId;
};

const SearchResultListControls = ({ lang, activeSet }: SearchResultListControlsProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const showControls = isCatalogSet(activeSet);
  const locale: LocaleCodes = lang ?? parseLocaleFromPathname(pathname);
  const dict = getLocalization(locale).searchPage;
  const selectedSort = parseSortQueryParam(searchParams.get("sort"));
  const selectedSize = parseSearchPageSizeParam(searchParams.get("size"));

  const replaceListSettings = (overrides: { size?: number; sort?: SearchSortOption }) => {
    const nextUrl = buildSearchPageUrlFromSearchParams(pathname, new URLSearchParams(searchParams.toString()), {
      ...overrides,
      page: SEARCH_DEFAULT_PAGE,
    });
    const currentQueryString = searchParams.toString();
    const currentUrl = currentQueryString ? `${pathname}?${currentQueryString}` : pathname;
    if (nextUrl === currentUrl) return;
    router.replace(nextUrl);
  };

  if (!showControls) return null;

  const getSortLabel = (option: SearchSortOption): string => getSortLabelFromDict(option, dict.searchForm.sort);

  return (
    <div className={styles.controls}>
      <Dropdown.TriggerContext>
        <Dropdown.Trigger
          data-size="sm"
          variant="tertiary"
        >
          {interpolate(dict.searchForm.resultsPerPage, { count: selectedSize })} <ChevronDownIcon aria-hidden />
        </Dropdown.Trigger>
        <Dropdown
          className={styles.orderbyDropdown}
          placement="bottom-end"
          data-size="sm"
        >
          <Dropdown.List>
            {SEARCH_PAGE_SIZE_OPTIONS.map((option) => (
              <Dropdown.Item key={option}>
                <Dropdown.Button
                  aria-pressed={selectedSize === option}
                  onClick={() => replaceListSettings({ size: option })}
                >
                  {selectedSize === option && <CheckmarkIcon aria-hidden />}
                  {interpolate(dict.searchForm.resultsPerPage, { count: option })}
                </Dropdown.Button>
              </Dropdown.Item>
            ))}
          </Dropdown.List>
        </Dropdown>
      </Dropdown.TriggerContext>
      <Dropdown.TriggerContext>
        <Dropdown.Trigger
          data-size="sm"
          variant="tertiary"
        >
          <SortDownIcon aria-hidden />
          {getSortLabel(selectedSort)}
        </Dropdown.Trigger>
        <Dropdown
          className={styles.orderbyDropdown}
          placement="bottom-end"
          data-size="sm"
        >
          <Dropdown.List>
            {SEARCH_SORT_OPTION_LIST.map((option) => (
              <Dropdown.Item key={option}>
                <Dropdown.Button
                  aria-pressed={selectedSort === option}
                  onClick={() => {
                    if (option === selectedSort) return;
                    replaceListSettings({ sort: option });
                  }}
                >
                  {selectedSort === option && <CheckmarkIcon aria-hidden />}
                  {getSortLabel(option)}
                </Dropdown.Button>
              </Dropdown.Item>
            ))}
          </Dropdown.List>
        </Dropdown>
      </Dropdown.TriggerContext>
    </div>
  );
};

export default SearchResultListControls;
