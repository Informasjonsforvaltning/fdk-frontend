"use client";

import { useCallback, useEffect, useMemo, useState, type FormEvent } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Input, Dropdown, Tabs } from "@digdir/designsystemet-react";
import { HStack, VStack, CheckboxGroup } from "@fellesdatakatalog/ui";
import { SortDownIcon, ChevronDownIcon, CheckmarkIcon } from "@navikt/aksel-icons";

import Box from "../box";
import SearchTabs, { deriveSearchTabValueFromPathname } from "../search-tabs";
import { type SearchSetSegment, type SearchTabsValue } from "../search-tabs/search-tab-config";
import OrgFilter from "./org-filter";
import { type AggregationKeyCount, parseOrgPathQueryParam } from "./org-path";
import { buildSearchPageUrl } from "./search-page-url";
import {
  MOCK_ACCESS_LEVEL_OPTIONS,
  MOCK_FILETYPE_OPTIONS,
  MOCK_GEOGRAPHY_OPTIONS,
  MOCK_MEDIA_FORMAT_OPTIONS,
  MOCK_PROVENANCE_OPTIONS,
  MOCK_TEMA_FILTER_OPTIONS,
} from "./search-form-mock-filters";
import styles from "./search-form.module.scss";

export type { AggregationKeyCount } from "./org-path";
export { mergeOrgPathAggregations, buildOrgPathSearchFilter } from "./org-path";
export { buildSearchPageQueryUrl, buildSearchPageUrl } from "./search-page-url";

export type SearchFormProps = {
  lang?: string;
  activeEntityTab?: SearchSetSegment;
  defaultQuery?: string;
  badgeCounts?: Record<string, number | undefined>;
  orgAggregation?: AggregationKeyCount[];
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
  const selectedOrgPaths = useMemo(() => parseOrgPathQueryParam(orgPathParam), [orgPathParam]);

  const activeTab = (isUrlDriven ? deriveSearchTabValueFromPathname(pathname) : searchType) as SearchTabsValue;
  const showFilters = activeEntityTab !== undefined && activeEntityTab !== "docs";

  const getQueryForUrl = useCallback(
    () => query.trim() || (searchParams.get("q") ?? defaultQuery ?? ""),
    [query, searchParams, defaultQuery],
  );

  const locale = lang ?? pathname.split("/")[1] ?? "nb";

  const navigateToSearch = useCallback(
    (orgPaths: string[], tab: SearchTabsValue = activeTab) => {
      router.replace(
        buildSearchPageUrl({
          locale,
          tab,
          query: getQueryForUrl(),
          orgPaths,
        }),
      );
    },
    [locale, activeTab, getQueryForUrl, router],
  );

  const handleTabChange = useCallback(
    (value: SearchTabsValue) => {
      if (isUrlDriven) {
        if (value === activeTab) return;
        navigateToSearch(selectedOrgPaths, value);
      } else {
        setSearchType(value);
      }
    },
    [isUrlDriven, activeTab, selectedOrgPaths, navigateToSearch],
  );

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isUrlDriven) {
      navigateToSearch(selectedOrgPaths);
    } else {
      onSearch?.(query, searchType);
    }
  };

  const handleOrgPathsChange = useCallback(
    (nextSelected: string[]) => {
      if (!isUrlDriven) return;
      navigateToSearch(nextSelected);
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
                <Dropdown.TriggerContext>
                  <Dropdown.Trigger
                    data-size="sm"
                    variant="secondary"
                  >
                    Virksomhet
                    <ChevronDownIcon />
                  </Dropdown.Trigger>
                  <Dropdown
                    className={styles.filterDropdown}
                    placement="bottom-start"
                    data-size="sm"
                  >
                    <VStack>
                      <Box className={styles.box}>
                        <OrgFilter
                          aggregation={orgAggregation}
                          value={isUrlDriven ? selectedOrgPaths : undefined}
                          onChange={isUrlDriven ? handleOrgPathsChange : undefined}
                        />
                      </Box>
                    </VStack>
                  </Dropdown>
                </Dropdown.TriggerContext>
                <Dropdown.TriggerContext>
                  <Dropdown.Trigger
                    data-size="sm"
                    variant="secondary"
                  >
                    Tema
                    <ChevronDownIcon />
                  </Dropdown.Trigger>
                  <Dropdown
                    className={styles.filterDropdown}
                    placement="bottom-start"
                    data-size="sm"
                  >
                    <VStack>
                      {/* TODO: localization remains to be implemented */}
                      <Input placeholder="Søk etter tema" />
                      <Box className={styles.box}>
                        <CheckboxGroup options={MOCK_TEMA_FILTER_OPTIONS} />
                      </Box>
                    </VStack>
                  </Dropdown>
                </Dropdown.TriggerContext>
                <Dropdown.TriggerContext>
                  <Dropdown.Trigger
                    data-size="sm"
                    variant="secondary"
                  >
                    Tilgangsnivå
                    <ChevronDownIcon />
                  </Dropdown.Trigger>
                  <Dropdown
                    className={styles.filterDropdown}
                    placement="bottom-start"
                    data-size="sm"
                  >
                    <Box className={styles.box}>
                      <CheckboxGroup options={MOCK_ACCESS_LEVEL_OPTIONS} />
                    </Box>
                  </Dropdown>
                </Dropdown.TriggerContext>
                <Dropdown.TriggerContext>
                  <Dropdown.Trigger
                    data-size="sm"
                    variant="secondary"
                  >
                    {/* TODO: localization remains to be implemented */}
                    Data-format
                    <ChevronDownIcon />
                  </Dropdown.Trigger>
                  <Dropdown
                    className={styles.filterDropdown}
                    placement="bottom-start"
                    data-size="sm"
                  >
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
                  </Dropdown>
                </Dropdown.TriggerContext>
                <Dropdown.TriggerContext>
                  <Dropdown.Trigger
                    data-size="sm"
                    variant="secondary"
                  >
                    {/* TODO: localization remains to be implemented */}
                    Geografi
                    <ChevronDownIcon />
                  </Dropdown.Trigger>
                  <Dropdown
                    className={styles.filterDropdown}
                    placement="bottom-start"
                    data-size="sm"
                  >
                    <VStack>
                      {/* TODO: localization remains to be implemented */}
                      <Input placeholder="Søk etter geografi" />
                      <Box className={styles.box}>
                        <CheckboxGroup options={MOCK_GEOGRAPHY_OPTIONS} />
                      </Box>
                    </VStack>
                  </Dropdown>
                </Dropdown.TriggerContext>
                <Dropdown.TriggerContext>
                  <Dropdown.Trigger
                    data-size="sm"
                    variant="secondary"
                  >
                    {/* TODO: localization remains to be implemented */}
                    Opphav
                    <ChevronDownIcon />
                  </Dropdown.Trigger>
                  <Dropdown
                    className={styles.filterDropdown}
                    placement="bottom-start"
                    data-size="sm"
                  >
                    <Box className={styles.box}>
                      <CheckboxGroup options={MOCK_PROVENANCE_OPTIONS} />
                    </Box>
                  </Dropdown>
                </Dropdown.TriggerContext>
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
