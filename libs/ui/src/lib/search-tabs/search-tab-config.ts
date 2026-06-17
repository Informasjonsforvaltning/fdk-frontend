/**
 * Canonical search tab configuration.
 * Tab id, URL path segment, labels, search types, and summary API slices are defined once here.
 */

export const KI_TOGGLE_VALUE = "ki" as const;

export const SEARCH_TAB_DEFINITIONS = [
  {
    tab: KI_TOGGLE_VALUE,
    pathSegment: null,
    label: "KI",
    searchTypes: null,
    summarySlices: [],
  },
  {
    tab: "datasets",
    pathSegment: "datasets",
    label: "Datasett",
    searchTypes: ["DATASET"],
    summarySlices: [{ summaryKey: "datasets", entityPath: "datasets", searchType: "DATASET" }],
  },
  {
    tab: "data-services",
    pathSegment: "data-services",
    label: "API",
    searchTypes: ["DATA_SERVICE"],
    summarySlices: [{ summaryKey: "apis", entityPath: "data-services", searchType: "DATA_SERVICE" }],
  },
  {
    tab: "concepts",
    pathSegment: "concepts",
    label: "Begrep",
    searchTypes: ["CONCEPT"],
    summarySlices: [{ summaryKey: "concepts", entityPath: "concepts", searchType: "CONCEPT" }],
  },
  {
    tab: "information-models",
    pathSegment: "information-models",
    label: "Informasjons\u00admodeller",
    searchTypes: ["INFORMATION_MODEL"],
    summarySlices: [
      { summaryKey: "informationModels", entityPath: "information-models", searchType: "INFORMATION_MODEL" },
    ],
  },
  {
    tab: "services-and-events",
    pathSegment: "services-and-events",
    label: "Tjenester og hendelser",
    searchTypes: ["SERVICE", "EVENT"],
    summarySlices: [
      { summaryKey: "services", entityPath: "services", searchType: "SERVICE" },
      { summaryKey: "events", entityPath: "events", searchType: "EVENT" },
    ],
  },
  {
    tab: "docs",
    pathSegment: "docs",
    label: "Dokumentasjon",
    searchTypes: null,
    summarySlices: [],
  },
] as const;

export type SearchTabDefinition = (typeof SEARCH_TAB_DEFINITIONS)[number];
export type SearchTabsValue = SearchTabDefinition["tab"];
export type SearchSetSegment = Exclude<SearchTabsValue, typeof KI_TOGGLE_VALUE>;

/** Active entity tab from the URL (`undefined` = KI / no path segment). */
export type ActiveEntityTab = SearchSetSegment | undefined;

type SummarySliceDefinition = SearchTabDefinition["summarySlices"][number];

export type SummarySliceKey = SummarySliceDefinition extends { summaryKey: infer K } ? K : never;

export type SummarySliceConfig = SummarySliceDefinition & {
  tabKey: SearchSetSegment;
};

export const ENTITY_TABS = SEARCH_TAB_DEFINITIONS.filter(
  (tab): tab is SearchTabDefinition & { tab: SearchSetSegment } => tab.tab !== KI_TOGGLE_VALUE,
).map((tab) => tab.tab);

export const SEARCH_TAB_PATH_SEGMENTS = SEARCH_TAB_DEFINITIONS.filter(
  (tab): tab is SearchTabDefinition & { pathSegment: string } => tab.pathSegment !== null,
).map((tab) => tab.pathSegment);

export const TAB_TO_SEARCH_TYPES = Object.fromEntries(
  SEARCH_TAB_DEFINITIONS.filter(
    (tab): tab is SearchTabDefinition & { tab: SearchSetSegment } => tab.tab !== KI_TOGGLE_VALUE,
  ).map((tab) => [tab.tab, tab.searchTypes]),
) as Record<SearchSetSegment, readonly string[] | null>;

export const SUMMARY_SLICES: readonly SummarySliceConfig[] = SEARCH_TAB_DEFINITIONS.flatMap((tab) => {
  if (tab.tab === KI_TOGGLE_VALUE) return [];
  return tab.summarySlices.map((slice) => ({
    ...slice,
    tabKey: tab.tab,
  }));
});

export const SUMMARY_ENTITY_PATHS = SUMMARY_SLICES.map((slice) => slice.entityPath);

export const isValidEntityTab = function (segment: string | undefined): segment is SearchSetSegment {
  if (segment === null || segment === undefined) return false;
  return (ENTITY_TABS as readonly string[]).includes(segment);
};

export const getSearchTypesForTab = function (entityTab: SearchSetSegment): readonly string[] | null {
  return TAB_TO_SEARCH_TYPES[entityTab];
};

/** Primary `searchType` for a tab, used for entity labels and LLM mapping. */
export const getPrimarySearchTypeForTab = function (entityTab: Exclude<SearchSetSegment, "docs">): string | undefined {
  return getSearchTypesForTab(entityTab)?.[0];
};
