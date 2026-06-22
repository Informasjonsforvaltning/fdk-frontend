"use client";

import { useCallback, useEffect, useMemo, useState, type FormEvent } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Input, Dropdown, Tabs } from "@digdir/designsystemet-react";
import { HStack, VStack, CheckboxGroup } from "@fellesdatakatalog/ui";
import { SortDownIcon, CheckmarkIcon } from "@navikt/aksel-icons";

import Box from "../box";
import SearchTabs, { deriveSearchTabValueFromPathname } from "../search-tabs";
import { type SearchSetSegment, type SearchTabsValue } from "../search-tabs/search-tab-config";
import OrgFilter from "./org-filter";
import AccessFilter from "./access-filter";
import FilterDropdown from "./filter-dropdown";
import { parseAccessQueryParam, shouldShowAccessFilter } from "./access";
import { type AggregationKeyCount, parseOrgPathQueryParam } from "./org-path";
import { buildSearchPageUrl } from "./search-page-url";
import {
  MOCK_FILETYPE_OPTIONS,
  MOCK_GEOGRAPHY_OPTIONS,
  MOCK_MEDIA_FORMAT_OPTIONS,
  MOCK_PROVENANCE_OPTIONS,
  MOCK_TEMA_FILTER_OPTIONS,
} from "./search-form-mock-filters";
import styles from "./search-form.module.scss";

export type { AggregationKeyCount } from "./org-path";
export { mergeOrgPathAggregations, buildOrgPathSearchFilter } from "./org-path";
export {
  mergeAccessAggregations,
  buildAccessFilterOptions,
  buildAccessSearchFilter,
  parseAccessQueryParam,
  shouldShowAccessFilter,
} from "./access";
export { buildSearchPageQueryUrl, buildSearchPageUrl } from "./search-page-url";

export type SearchFormProps = {
  lang?: string;
  activeEntityTab?: SearchSetSegment;
  defaultQuery?: string;
  badgeCounts?: Record<string, number | undefined>;
  orgAggregation?: AggregationKeyCount[];
  accessAggregation?: AggregationKeyCount[];
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
  const selectedOrgPaths = useMemo(() => parseOrgPathQueryParam(orgPathParam), [orgPathParam]);
  const selectedAccess = useMemo(() => parseAccessQueryParam(accessParam), [accessParam]);

  const activeTab = (isUrlDriven ? deriveSearchTabValueFromPathname(pathname) : searchType) as SearchTabsValue;
  const showFilters = activeEntityTab !== undefined && activeEntityTab !== "docs";
  const showAccessFilter = shouldShowAccessFilter(accessAggregation ?? []);

  const getQueryForUrl = useCallback(
    () => query.trim() || (searchParams.get("q") ?? defaultQuery ?? ""),
    [query, searchParams, defaultQuery],
  );

  const locale = lang ?? pathname.split("/")[1] ?? "nb";

  const navigateToSearch = useCallback(
    ({
      orgPaths = selectedOrgPaths,
      access = selectedAccess,
      tab = activeTab,
    }: {
      orgPaths?: string[];
      access?: string[];
      tab?: SearchTabsValue;
    } = {}) => {
      router.replace(
        buildSearchPageUrl({
          locale,
          tab,
          query: getQueryForUrl(),
          orgPaths,
          access,
        }),
      );
    },
    [locale, activeTab, getQueryForUrl, router, selectedOrgPaths, selectedAccess],
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
                <FilterDropdown label="Virksomhet">
                  <VStack>
                    <Box className={styles.box}>
                      <OrgFilter
                        aggregation={orgAggregation}
                        value={isUrlDriven ? selectedOrgPaths : undefined}
                        onChange={isUrlDriven ? handleOrgPathsChange : undefined}
                      />
                    </Box>
                  </VStack>
                </FilterDropdown>
                <FilterDropdown label="Tema">
                  <VStack>
                    {/* TODO: localization remains to be implemented */}
                    <Input placeholder="Søk etter tema" />
                    <Box className={styles.box}>
                      <CheckboxGroup options={MOCK_TEMA_FILTER_OPTIONS} />
                    </Box>
                  </VStack>
                </FilterDropdown>
                {showAccessFilter && (
                  <FilterDropdown label="Tilgangsnivå">
                    <Box className={styles.box}>
                      <AccessFilter
                        aggregation={accessAggregation}
                        value={isUrlDriven ? selectedAccess : undefined}
                        onChange={isUrlDriven ? handleAccessChange : undefined}
                      />
                    </Box>
                  </FilterDropdown>
                )}
                <FilterDropdown label="Data-format">
                  <Tabs
                    defaultValue="value1"
                    className={styles.filterTabs}
                  >
                    <Tabs.List>
                      {/* TODO: localization remains to be implemented */}
                      <Tabs.Tab value="value1">Medieformat</Tabs.Tab>
                      <Tabs.Tab value="value2">Filtype</Tabs.Tab>
                    </Tabs.List>
                    <Tabs.Panel
                      value="value1"
                      style={{ padding: 0, paddingTop: "0.5rem" }}
                    >
                      <VStack>
                        {/* TODO: localization remains to be implemented */}
                        <Input placeholder="Søk etter medieformat" />
                        <Box className={styles.box}>
                          <CheckboxGroup options={MOCK_MEDIA_FORMAT_OPTIONS} />
                        </Box>
                      </VStack>
                    </Tabs.Panel>
                    <Tabs.Panel
                      value="value2"
                      style={{ padding: 0, paddingTop: "0.5rem" }}
                    >
                      <VStack>
                        {/* TODO: localization remains to be implemented */}
                        <Input placeholder="Søk etter filtype" />
                        <Box className={styles.box}>
                          <CheckboxGroup options={MOCK_FILETYPE_OPTIONS} />
                        </Box>
                      </VStack>
                    </Tabs.Panel>
                  </Tabs>
                </FilterDropdown>
                <FilterDropdown label="Geografi">
                  <VStack>
                    {/* TODO: localization remains to be implemented */}
                    <Input placeholder="Søk etter geografi" />
                    <Box className={styles.box}>
                      <CheckboxGroup options={MOCK_GEOGRAPHY_OPTIONS} />
                    </Box>
                  </VStack>
                </FilterDropdown>
                <FilterDropdown label="Opphav">
                  <Box className={styles.box}>
                    <CheckboxGroup options={MOCK_PROVENANCE_OPTIONS} />
                  </Box>
                </FilterDropdown>
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
