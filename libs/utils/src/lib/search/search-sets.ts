/**
 * Search set catalog. The id is the URL segment under `/search`, except `all-catalogs`,
 * whose URL is `/search` with no segment. That set is every data catalog combined,
 * and does not include documentation or AI hits.
 */

export const SEARCH_SETS = [
  { id: "all-catalogs" },
  {
    id: "datasets",
    hitSearchTypes: ["DATASET"],
    summary: { summaryKey: "datasets", searchType: "DATASET" },
  },
  {
    id: "data-services",
    hitSearchTypes: ["DATA_SERVICE"],
    summary: { summaryKey: "apis", searchType: "DATA_SERVICE" },
  },
  {
    id: "concepts",
    hitSearchTypes: ["CONCEPT"],
    summary: { summaryKey: "concepts", searchType: "CONCEPT" },
  },
  {
    id: "information-models",
    hitSearchTypes: ["INFORMATION_MODEL"],
    summary: { summaryKey: "informationModels", searchType: "INFORMATION_MODEL" },
  },
  {
    id: "services-and-events",
    hitSearchTypes: ["PUBLIC_SERVICE", "SERVICE", "EVENT"],
    summary: { summaryKey: "servicesAndEvents", searchType: "SERVICE" },
  },
  { id: "docs" },
  { id: "ai" },
] as const;

export type SearchSet = (typeof SEARCH_SETS)[number];
export type SearchSetId = SearchSet["id"];

type SearchSetWithSummary = Extract<SearchSet, { summary: unknown }>;

export type SearchSummaryKey = SearchSetWithSummary["summary"]["summaryKey"];

export type SearchSummarySliceConfig = {
  setId: SearchSetWithSummary["id"];
  summaryKey: SearchSummaryKey;
  searchType: string;
};

export const SEARCH_SUMMARY_SLICES: readonly SearchSummarySliceConfig[] = SEARCH_SETS.flatMap((set) =>
  "summary" in set ? [{ setId: set.id, summaryKey: set.summary.summaryKey, searchType: set.summary.searchType }] : [],
);

/** Catalog set ids, in the same order the summary API is called. */
export const SEARCH_SUMMARY_PATHS: readonly SearchSetWithSummary["id"][] = SEARCH_SUMMARY_SLICES.map(
  (slice) => slice.setId,
);

const SEARCH_SET_IDS: readonly string[] = SEARCH_SETS.map((set) => set.id);

export const isSearchSetId = (value: string | undefined): value is SearchSetId =>
  value !== undefined && SEARCH_SET_IDS.includes(value);

/** A path segment under `/search`. `all-catalogs` has no segment. */
export const isSearchSetPathSegment = (segment: string | undefined): segment is Exclude<SearchSetId, "all-catalogs"> =>
  isSearchSetId(segment) && segment !== "all-catalogs";

/** True for all-catalogs and the sets that have a summary slice. Docs and AI are not catalog sets. */
export const isCatalogSet = (setId: SearchSetId): boolean =>
  setId === "all-catalogs" || SEARCH_SETS.some((set) => set.id === setId && "summary" in set);

export const deriveSearchSetIdFromPathname = (pathname: string): SearchSetId => {
  const segment = pathname.split("/").filter(Boolean)[2];
  if (isSearchSetPathSegment(segment)) return segment;
  return "all-catalogs";
};

export const buildSearchSetPath = (locale: string, setId: SearchSetId): string =>
  setId === "all-catalogs" ? `/${locale}/search` : `/${locale}/search/${setId}`;

export const getSetIdForHitSearchType = (searchType: string): SearchSetId | undefined => {
  for (const set of SEARCH_SETS) {
    if ("hitSearchTypes" in set && set.hitSearchTypes.some((type) => type === searchType)) {
      return set.id;
    }
  }
  return undefined;
};

/** Details-page path for a catalog hit. Services and events live under `/services/{id}`. */
export const buildResourcePath = (locale: string, searchType: string, resourceId: string): string | undefined => {
  const setId = getSetIdForHitSearchType(searchType);
  if (!setId || setId === "all-catalogs") return undefined;
  if (setId === "services-and-events") return `/${locale}/services/${resourceId}`;
  return `/${locale}/${setId}/${resourceId}`;
};
