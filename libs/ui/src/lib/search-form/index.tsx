"use client";

import { parseLocaleFromPathname, type LocaleCodes } from "@fdk-frontend/localization";
import { useCallback, useEffect, useMemo, useState, type FormEvent } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Dropdown } from "@digdir/designsystemet-react";
import { HStack, VStack } from "@fellesdatakatalog/ui";
import { SortDownIcon, CheckmarkIcon } from "@navikt/aksel-icons";

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
import styles from "./search-form.module.scss";

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
export { buildSearchPageQueryUrl, buildSearchPageUrl } from "./search-page-url";

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
  searchLabel?: string;
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
  searchLabel = "Søk",
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
  const selectedOrgPaths = useMemo(() => parseOrgPathQueryParam(orgPathParam), [orgPathParam]);
  const selectedAccess = useMemo(() => parseAccessQueryParam(accessParam), [accessParam]);
  const selectedProvenance = useMemo(() => parseProvenanceQueryParam(provenanceParam), [provenanceParam]);
  const selectedSpatial = useMemo(() => parseSpatialQueryParam(spatialParam), [spatialParam]);
  const selectedFormats = useMemo(() => parseFormatQueryParam(formatParam), [formatParam]);
  const selectedLosThemes = useMemo(() => parseLosThemeQueryParam(losThemeParam), [losThemeParam]);
  const selectedDataThemes = useMemo(() => parseDataThemeQueryParam(dataThemeParam), [dataThemeParam]);

  const activeTab = (isUrlDriven ? deriveSearchTabValueFromPathname(pathname) : searchType) as SearchTabsValue;
  const showFilters = activeEntityTab !== undefined && activeEntityTab !== "docs";
  const showAccessFilter = shouldShowAccessFilter(accessAggregation ?? []);
  const showProvenanceFilter = shouldShowProvenanceFilter(provenanceAggregation ?? []);
  const showSpatialFilter = shouldShowSpatialFilter(spatialAggregation ?? []);
  const showFormatFilter = shouldShowFormatFilter(formatAggregation ?? []);
  const showTemaFilter = shouldShowTemaFilter(losThemeAggregation ?? [], dataThemeAggregation ?? []);

  const getQueryForUrl = useCallback(
    () => query.trim() || (searchParams.get("q") ?? defaultQuery ?? ""),
    [query, searchParams, defaultQuery],
  );

  const locale: LocaleCodes = lang ?? parseLocaleFromPathname(pathname);

  const navigateToSearch = useCallback(
    ({
      orgPaths = selectedOrgPaths,
      access = selectedAccess,
      provenance = selectedProvenance,
      spatial = selectedSpatial,
      formats = selectedFormats,
      losThemes = selectedLosThemes,
      dataThemes = selectedDataThemes,
      tab = activeTab,
    }: {
      orgPaths?: string[];
      access?: string[];
      provenance?: string[];
      spatial?: string[];
      formats?: string[];
      losThemes?: string[];
      dataThemes?: string[];
      tab?: SearchTabsValue;
    } = {}) => {
      router.replace(
        buildSearchPageUrl({
          locale,
          tab,
          query: getQueryForUrl(),
          orgPaths,
          access,
          provenance,
          spatial,
          formats,
          losThemes,
          dataThemes,
        }),
      );
    },
    [
      locale,
      activeTab,
      getQueryForUrl,
      router,
      selectedOrgPaths,
      selectedAccess,
      selectedProvenance,
      selectedSpatial,
      selectedFormats,
      selectedLosThemes,
      selectedDataThemes,
    ],
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

  useEffect(() => {
    if (isUrlDriven && defaultQuery !== undefined) {
      setQuery(defaultQuery);
    }
  }, [isUrlDriven, defaultQuery]);

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
          />
          <HStack className={styles.searchToolbar}>
            {showFilters && (
              <HStack className={styles.filterToolbar}>
                <FilterDropdown
                  label="Virksomhet"
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
                    label="Tema"
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
                    label="Tilgangsnivå"
                    filterCount={selectedAccess.length}
                  >
                    <Box className={styles.box}>
                      <AccessFilter
                        aggregation={accessAggregation}
                        value={isUrlDriven ? selectedAccess : undefined}
                        onChange={isUrlDriven ? handleAccessChange : undefined}
                      />
                    </Box>
                  </FilterDropdown>
                )}
                {showFormatFilter && (
                  <FilterDropdown
                    label="Data-format"
                    filterCount={selectedFormats.length}
                  >
                    <FormatFilter
                      aggregation={formatAggregation}
                      value={isUrlDriven ? selectedFormats : undefined}
                      onChange={isUrlDriven ? handleFormatChange : undefined}
                    />
                  </FilterDropdown>
                )}
                {showSpatialFilter && (
                  <FilterDropdown
                    label="Geografi"
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
                    label="Opphav"
                    filterCount={selectedProvenance.length}
                  >
                    <Box className={styles.box}>
                      <ProvenanceFilter
                        aggregation={provenanceAggregation}
                        value={isUrlDriven ? selectedProvenance : undefined}
                        onChange={isUrlDriven ? handleProvenanceChange : undefined}
                      />
                    </Box>
                  </FilterDropdown>
                )}
              </HStack>
            )}
            <div className={styles.sortToolbar}>
              <Dropdown.TriggerContext>
                <Dropdown.Trigger
                  data-size="sm"
                  variant="tertiary"
                >
                  <SortDownIcon />
                  {/* TODO: localization remains to be implemented */}
                  Relevans
                </Dropdown.Trigger>
                <Dropdown
                  className={styles.orderbyDropdown}
                  placement="bottom-end"
                  data-size="sm"
                >
                  <Dropdown.List>
                    <Dropdown.Item>
                      <Dropdown.Button aria-pressed>
                        <CheckmarkIcon />
                        Relevans
                      </Dropdown.Button>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <Dropdown.Button>Sist publisert</Dropdown.Button>
                    </Dropdown.Item>
                  </Dropdown.List>
                </Dropdown>
              </Dropdown.TriggerContext>
            </div>
          </HStack>
        </VStack>
      </VStack>
    </form>
  );
};

export default SearchForm;
