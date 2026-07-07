"use client";

import { getLocalization, interpolate, parseLocaleFromPathname, type LocaleCodes } from "@fdk-frontend/localization";
import { useCallback, useEffect, useMemo, useState, type FormEvent } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Chip, Dropdown } from "@digdir/designsystemet-react";
import { HStack, VStack } from "@fellesdatakatalog/ui";
import { SortDownIcon, CheckmarkIcon, ChevronDownIcon } from "@navikt/aksel-icons";

import Box from "../box";
import SearchTabs, { deriveSearchTabValueFromPathname } from "../search-tabs";
import { type SearchSetSegment, type SearchTabsValue } from "../search-tabs/search-tab-config";
import OrgFilter from "./org-filter";
import AccessFilter from "./access-filter";
import ProvenanceFilter from "./provenance-filter";
import SpatialFilter from "./spatial-filter";
import FormatFilter from "./format-filter";
import ThemeFilter from "./theme-filter";
import FilterDropdown from "./filter-dropdown";
import { parseAccessQueryParam, shouldShowAccessFilter } from "./access";
import { parseOrgPathQueryParam } from "./org-path";
import { type AggregationKeyCount } from "./types";
import { parseProvenanceQueryParam, shouldShowProvenanceFilter } from "./provenance";
import { parseSpatialQueryParam, shouldShowSpatialFilter } from "./spatial";
import { parseFormatQueryParam, shouldShowFormatFilter } from "./format";
import { parseLosThemeQueryParam, parseDataThemeQueryParam, shouldShowTemaFilter } from "./theme";
import { buildSearchPageUrl } from "./search-page-url";
import { parseSearchPageSizeParam, SEARCH_DEFAULT_PAGE, SEARCH_PAGE_SIZE_OPTIONS } from "./search-pagination";
import styles from "./search-form.module.scss";
import FilterChips from "./filter-chips";
import { useDataThemeLabels } from "./theme/data-theme/use-data-theme-labels";
import { useLosThemeLabels } from "./theme/los-theme/use-los-theme-labels";
import { getAccessRightsLabels } from "./access/labels";
import { formatLabel } from "./format/labels";
import { getProvenanceLabels } from "./provenance/labels";
import { useOrgPathLabels } from "./org-path/use-org-path-labels";
import { formatOrgPathLabel } from "./org-path/labels";
import {
  parseSortQueryParam,
  getSortLabel as getSortLabelFromDict,
  SEARCH_SORT_OPTION_LIST,
  type SearchSortOption,
} from "./sort";

export type { AggregationKeyCount } from "./types";
export { mergeOrgPathAggregations, buildOrgPathSearchFilter } from "./org-path";
export {
  mergeAccessAggregations,
  buildAccessFilterOptions,
  buildAccessSearchFilter,
  parseAccessQueryParam,
  shouldShowAccessFilter,
} from "./access";
export {
  mergeProvenanceAggregations,
  buildProvenanceFilterOptions,
  buildProvenanceSearchFilter,
  parseProvenanceQueryParam,
  shouldShowProvenanceFilter,
} from "./provenance";
export {
  mergeSpatialAggregations,
  buildSpatialFilterOptions,
  buildSpatialSearchFilter,
  parseSpatialQueryParam,
  shouldShowSpatialFilter,
} from "./spatial";
export {
  mergeFormatAggregations,
  buildFileTypeFilterOptions,
  buildMediaFormatFilterOptions,
  buildFormatSearchFilter,
  parseFormatQueryParam,
  shouldShowFormatFilter,
} from "./format";
export {
  mergeLosThemeAggregations,
  mergeDataThemeAggregations,
  buildLosThemeSearchFilter,
  buildDataThemeSearchFilter,
  buildDataThemeFilterOptions,
  parseLosThemeQueryParam,
  parseDataThemeQueryParam,
  shouldShowTemaFilter,
} from "./theme";
export { buildSearchPageQueryUrl, buildSearchPageUrl, buildSearchPageUrlFromSearchParams } from "./search-page-url";
export {
  parseSearchPageParam,
  parseSearchPageSizeParam,
  SEARCH_DEFAULT_PAGE,
  SEARCH_DEFAULT_PAGE_SIZE,
  SEARCH_PAGE_SIZE_OPTIONS,
  toApiPage,
  toDisplayPage,
  type SearchPageInfo,
} from "./search-pagination";
export {
  parseSortQueryParam,
  buildSearchSort,
  SEARCH_SORT_OPTION_LIST,
  SEARCH_SORT_OPTIONS,
  type SearchSortOption,
} from "./sort";

export type SearchFormProps = {
  lang?: LocaleCodes;
  activeEntityTab?: SearchSetSegment;
  defaultQuery?: string;
  badgeCounts?: Record<string, number | undefined>;
  orgAggregation?: AggregationKeyCount[];
  accessAggregation?: AggregationKeyCount[];
  provenanceAggregation?: AggregationKeyCount[];
  spatialAggregation?: AggregationKeyCount[];
  formatAggregation?: AggregationKeyCount[];
  losThemeAggregation?: AggregationKeyCount[];
  dataThemeAggregation?: AggregationKeyCount[];
  defaultValue?: SearchTabsValue;
  onSearch?: (query: string, type: SearchTabsValue) => void;
  className?: string;
};

const SearchForm = ({
  lang,
  activeEntityTab,
  defaultQuery = "",
  badgeCounts,
  orgAggregation,
  accessAggregation,
  provenanceAggregation,
  spatialAggregation,
  formatAggregation,
  losThemeAggregation,
  dataThemeAggregation,
  defaultValue = "ki",
  onSearch,
  className,
}: SearchFormProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchType, setSearchType] = useState<SearchTabsValue>(defaultValue);
  const [query, setQuery] = useState(defaultQuery);

  const isUrlDriven = lang !== undefined;
  const orgPathParam = searchParams.get("orgPath");
  const accessParam = searchParams.get("access");
  const provenanceParam = searchParams.get("provenance");
  const spatialParam = searchParams.get("spatial");
  const formatParam = searchParams.get("format");
  const losThemeParam = searchParams.get("losTheme");
  const dataThemeParam = searchParams.get("dataTheme");
  const sortParam = searchParams.get("sort");
  const selectedOrgPaths = useMemo(() => parseOrgPathQueryParam(orgPathParam), [orgPathParam]);
  const selectedAccess = useMemo(() => parseAccessQueryParam(accessParam), [accessParam]);
  const selectedProvenance = useMemo(() => parseProvenanceQueryParam(provenanceParam), [provenanceParam]);
  const selectedSpatial = useMemo(() => parseSpatialQueryParam(spatialParam), [spatialParam]);
  const selectedFormats = useMemo(() => parseFormatQueryParam(formatParam), [formatParam]);
  const selectedLosThemes = useMemo(() => parseLosThemeQueryParam(losThemeParam), [losThemeParam]);
  const selectedDataThemes = useMemo(() => parseDataThemeQueryParam(dataThemeParam), [dataThemeParam]);
  const selectedSort = useMemo(() => parseSortQueryParam(sortParam), [sortParam]);
  const selectedSize = parseSearchPageSizeParam(searchParams.get("size"));

  const activeTab = (isUrlDriven ? deriveSearchTabValueFromPathname(pathname) : searchType) as SearchTabsValue;
  const showEntityToolbar = activeEntityTab !== undefined && activeEntityTab !== "docs";
  const showAccessFilter = shouldShowAccessFilter(accessAggregation ?? []);
  const showProvenanceFilter = shouldShowProvenanceFilter(provenanceAggregation ?? []);
  const showSpatialFilter = shouldShowSpatialFilter(spatialAggregation ?? []);
  const showFormatFilter = shouldShowFormatFilter(formatAggregation ?? []);
  const showTemaFilter = shouldShowTemaFilter(losThemeAggregation ?? [], dataThemeAggregation ?? []);

  const locale: LocaleCodes = lang ?? parseLocaleFromPathname(pathname);
  const dict = getLocalization(locale).searchPage;
  const accessLabels = getAccessRightsLabels(dict.searchForm.accessFilter);
  const provenanceLabels = getProvenanceLabels(dict.searchForm.provenanceFilter);

  const getSortLabel = (option: SearchSortOption): string => getSortLabelFromDict(option, dict.searchForm.sort);

  const orgKey = !selectedOrgPaths.length ? "" : selectedOrgPaths[selectedOrgPaths.length - 1];
  const orgPathLabels: Record<string, string> = {
    [orgKey]: formatOrgPathLabel(orgKey, useOrgPathLabels(locale), dict.searchForm.orgTypeFilter),
  };
  // TODO: handle useOrgPathLabels. Called more than once on each render when used like this (also called within org-filter component)
  const losThemeLabels = useLosThemeLabels(locale);
  const dataThemeLabels = useDataThemeLabels(locale);
  const formatLabels: Record<string, string> = Object.fromEntries(
    selectedFormats.map((key) => [key, formatLabel(key)]),
  );
  const spatialLabels: Record<string, string> = Object.fromEntries(selectedSpatial.map((key) => [key, key]));

  const getQueryForUrl = useCallback(
    () => query.trim() || (searchParams.get("q") ?? defaultQuery ?? ""),
    [query, searchParams, defaultQuery],
  );

  const navigateToSearch = useCallback(
    ({
      orgPaths,
      access,
      provenance,
      spatial,
      formats,
      losThemes,
      dataThemes,
      tab = activeTab,
      sort,
      size,
    }: {
      orgPaths?: string[];
      access?: string[];
      provenance?: string[];
      spatial?: string[];
      formats?: string[];
      losThemes?: string[];
      dataThemes?: string[];
      tab?: SearchTabsValue;
      sort?: SearchSortOption;
      size?: number;
    } = {}) => {
      const resolvedOrgPaths = orgPaths ?? parseOrgPathQueryParam(searchParams.get("orgPath"));
      const resolvedAccess = access ?? parseAccessQueryParam(searchParams.get("access"));
      const resolvedProvenance = provenance ?? parseProvenanceQueryParam(searchParams.get("provenance"));
      const resolvedSpatial = spatial ?? parseSpatialQueryParam(searchParams.get("spatial"));
      const resolvedFormats = formats ?? parseFormatQueryParam(searchParams.get("format"));
      const resolvedLosThemes = losThemes ?? parseLosThemeQueryParam(searchParams.get("losTheme"));
      const resolvedDataThemes = dataThemes ?? parseDataThemeQueryParam(searchParams.get("dataTheme"));
      const resolvedSort = sort ?? parseSortQueryParam(searchParams.get("sort"));
      const resolvedSize = size ?? parseSearchPageSizeParam(searchParams.get("size"));

      const nextUrl = buildSearchPageUrl({
        locale,
        tab,
        query: getQueryForUrl(),
        orgPaths: resolvedOrgPaths,
        access: resolvedAccess,
        provenance: resolvedProvenance,
        spatial: resolvedSpatial,
        formats: resolvedFormats,
        losThemes: resolvedLosThemes,
        dataThemes: resolvedDataThemes,
        sort: resolvedSort,
        size: resolvedSize,
        page: SEARCH_DEFAULT_PAGE,
      });

      const currentQueryString = searchParams.toString();
      const currentUrl = currentQueryString ? `${pathname}?${currentQueryString}` : pathname;
      if (nextUrl === currentUrl) return;

      router.replace(nextUrl);
    },
    [locale, activeTab, getQueryForUrl, router, searchParams, pathname],
  );

  const handleTabChange = useCallback(
    (value: SearchTabsValue) => {
      if (isUrlDriven) {
        if (value === activeTab) return;
        navigateToSearch({ tab: value });
      } else {
        setSearchType(value);
      }
    },
    [isUrlDriven, activeTab, navigateToSearch],
  );

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isUrlDriven) {
      navigateToSearch();
    } else {
      onSearch?.(query, searchType);
    }
  };

  const handleOrgPathsChange = useCallback(
    (nextSelected: string[]) => {
      if (!isUrlDriven) return;
      navigateToSearch({ orgPaths: nextSelected });
    },
    [isUrlDriven, navigateToSearch],
  );

  const handleAccessChange = useCallback(
    (nextSelected: string[]) => {
      if (!isUrlDriven) return;
      navigateToSearch({ access: nextSelected });
    },
    [isUrlDriven, navigateToSearch],
  );

  const handleProvenanceChange = useCallback(
    (nextSelected: string[]) => {
      if (!isUrlDriven) return;
      navigateToSearch({ provenance: nextSelected });
    },
    [isUrlDriven, navigateToSearch],
  );

  const handleSpatialChange = useCallback(
    (nextSelected: string[]) => {
      if (!isUrlDriven) return;
      navigateToSearch({ spatial: nextSelected });
    },
    [isUrlDriven, navigateToSearch],
  );

  const handleFormatChange = useCallback(
    (nextSelected: string[]) => {
      if (!isUrlDriven) return;
      navigateToSearch({ formats: nextSelected });
    },
    [isUrlDriven, navigateToSearch],
  );

  const handleLosThemeChange = useCallback(
    (nextSelected: string[]) => {
      if (!isUrlDriven) return;
      navigateToSearch({ losThemes: nextSelected });
    },
    [isUrlDriven, navigateToSearch],
  );

  const handleDataThemeChange = useCallback(
    (nextSelected: string[]) => {
      if (!isUrlDriven) return;
      navigateToSearch({ dataThemes: nextSelected });
    },
    [isUrlDriven, navigateToSearch],
  );

  const handleSortChange = useCallback(
    (nextSort: SearchSortOption) => {
      if (!isUrlDriven) return;
      if (nextSort === selectedSort) return;
      navigateToSearch({ sort: nextSort });
    },
    [isUrlDriven, navigateToSearch, selectedSort],
  );

  useEffect(() => {
    if (isUrlDriven && defaultQuery !== undefined) {
      setQuery(defaultQuery);
    }
  }, [isUrlDriven, defaultQuery]);

  const hasFilter: boolean =
    selectedOrgPaths.length +
      selectedAccess.length +
      selectedSpatial.length +
      selectedFormats.length +
      selectedLosThemes.length +
      selectedDataThemes.length +
      selectedProvenance.length >
    0;

  const clearFilters = useCallback(() => {
    if (!isUrlDriven) return;
    const emptyStrings: string[] = [];
    navigateToSearch({
      orgPaths: emptyStrings,
      access: emptyStrings,
      provenance: emptyStrings,
      spatial: emptyStrings,
      formats: emptyStrings,
      losThemes: emptyStrings,
      dataThemes: emptyStrings,
    });
  }, [isUrlDriven, navigateToSearch]);

  return (
    <form
      onSubmit={handleSubmit}
      className={className}
    >
      <VStack className={styles.searchForm}>
        <VStack className={styles.searchControls}>
          <SearchTabs
            value={activeTab}
            defaultValue={defaultValue}
            onChange={handleTabChange}
            badgeCounts={badgeCounts}
            locale={locale}
          />
          <>
            {showEntityToolbar && (
              <HStack className={styles.filterToolbar}>
                <FilterDropdown
                  label={dict.searchForm.filters.organisation}
                  filterCount={selectedOrgPaths.length}
                >
                  <VStack>
                    <Box className={styles.box}>
                      <OrgFilter
                        locale={locale}
                        aggregation={orgAggregation}
                        value={isUrlDriven ? selectedOrgPaths : undefined}
                        onChange={isUrlDriven ? handleOrgPathsChange : undefined}
                      />
                    </Box>
                  </VStack>
                </FilterDropdown>
                {showTemaFilter && (
                  <FilterDropdown
                    label={dict.searchForm.filters.theme}
                    filterCount={selectedDataThemes.length + selectedLosThemes.length}
                  >
                    <ThemeFilter
                      locale={locale}
                      losThemeAggregation={losThemeAggregation}
                      dataThemeAggregation={dataThemeAggregation}
                      losThemeValue={isUrlDriven ? selectedLosThemes : undefined}
                      dataThemeValue={isUrlDriven ? selectedDataThemes : undefined}
                      onLosThemeChange={isUrlDriven ? handleLosThemeChange : undefined}
                      onDataThemeChange={isUrlDriven ? handleDataThemeChange : undefined}
                    />
                  </FilterDropdown>
                )}
                {showAccessFilter && (
                  <FilterDropdown
                    label={dict.searchForm.filters.accessLevel}
                    filterCount={selectedAccess.length}
                  >
                    <Box className={styles.box}>
                      <AccessFilter
                        locale={locale}
                        aggregation={accessAggregation}
                        value={isUrlDriven ? selectedAccess : undefined}
                        onChange={isUrlDriven ? handleAccessChange : undefined}
                      />
                    </Box>
                  </FilterDropdown>
                )}
                {showFormatFilter && (
                  <FilterDropdown
                    label={dict.searchForm.filters.format}
                    filterCount={selectedFormats.length}
                  >
                    <FormatFilter
                      locale={locale}
                      aggregation={formatAggregation}
                      value={isUrlDriven ? selectedFormats : undefined}
                      onChange={isUrlDriven ? handleFormatChange : undefined}
                    />
                  </FilterDropdown>
                )}
                {showSpatialFilter && (
                  <FilterDropdown
                    label={dict.searchForm.filters.geography}
                    filterCount={selectedSpatial.length}
                  >
                    <Box className={styles.box}>
                      <SpatialFilter
                        aggregation={spatialAggregation}
                        value={isUrlDriven ? selectedSpatial : undefined}
                        onChange={isUrlDriven ? handleSpatialChange : undefined}
                      />
                    </Box>
                  </FilterDropdown>
                )}
                {showProvenanceFilter && (
                  <FilterDropdown
                    label={dict.searchForm.filters.provenance}
                    filterCount={selectedProvenance.length}
                  >
                    <Box className={styles.box}>
                      <ProvenanceFilter
                        locale={locale}
                        aggregation={provenanceAggregation}
                        value={isUrlDriven ? selectedProvenance : undefined}
                        onChange={isUrlDriven ? handleProvenanceChange : undefined}
                      />
                    </Box>
                  </FilterDropdown>
                )}
              </HStack>
            )}
            <HStack className={styles.chipsToolbar}>
              {showEntityToolbar && (
                <>
                  <FilterChips
                    selectedFilters={selectedOrgPaths}
                    onChipRemove={handleOrgPathsChange}
                    chipLabels={orgPathLabels}
                  />
                  <FilterChips
                    selectedFilters={selectedLosThemes}
                    onChipRemove={handleLosThemeChange}
                    chipLabels={losThemeLabels}
                  />
                  <FilterChips
                    selectedFilters={selectedDataThemes}
                    onChipRemove={handleDataThemeChange}
                    chipLabels={dataThemeLabels}
                  />
                  <FilterChips
                    selectedFilters={selectedAccess}
                    onChipRemove={handleAccessChange}
                    chipLabels={accessLabels}
                  />
                  <FilterChips
                    selectedFilters={selectedFormats}
                    onChipRemove={handleFormatChange}
                    chipLabels={formatLabels}
                  />
                  <FilterChips
                    selectedFilters={selectedSpatial}
                    onChipRemove={handleSpatialChange}
                    chipLabels={spatialLabels}
                  />
                  <FilterChips
                    selectedFilters={selectedProvenance}
                    onChipRemove={handleProvenanceChange}
                    chipLabels={provenanceLabels}
                  />
                  {hasFilter && (
                    <Chip.Button
                      onClick={() => clearFilters()}
                      data-size="sm"
                    >
                      {dict.searchForm.clearAllFilters}
                    </Chip.Button>
                  )}
                  <HStack className={styles.rightToolbar}>
                    <Dropdown.TriggerContext>
                      <Dropdown.Trigger
                        data-size="sm"
                        variant="tertiary"
                      >
                        {interpolate(dict.searchForm.resultsCount, { count: selectedSize })} <ChevronDownIcon />
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
                                onClick={() => navigateToSearch({ size: option })}
                              >
                                {selectedSize === option && <CheckmarkIcon />}
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
                        <SortDownIcon />
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
                                onClick={() => handleSortChange(option)}
                              >
                                {selectedSort === option && <CheckmarkIcon />}
                                {getSortLabel(option)}
                              </Dropdown.Button>
                            </Dropdown.Item>
                          ))}
                        </Dropdown.List>
                      </Dropdown>
                    </Dropdown.TriggerContext>
                  </HStack>
                </>
              )}
            </HStack>
          </>
        </VStack>
      </VStack>
    </form>
  );
};

export default SearchForm;
