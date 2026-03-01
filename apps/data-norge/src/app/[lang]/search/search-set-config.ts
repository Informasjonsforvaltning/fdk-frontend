/**
 * Search URL set segments and their mapping to backend searchType.
 * KI (LLM) has no segment — it is shown when no set segment is present.
 */

export const VALID_SET_SEGMENTS = [
  'datasets',
  'apis',
  'concepts',
  'information-models',
  'services-and-events',
  'docs',
] as const;

export type SearchSetSegment = (typeof VALID_SET_SEGMENTS)[number];

/** Toggle value for KI tab (UI only; no segment in URL). */
export const KI_TOGGLE_VALUE = 'ki' as const;

/** Segment → searchType(s) for filtering hits. KI and docs have no searchTypes. */
export const SET_TO_SEARCH_TYPES: Record<
  SearchSetSegment,
  readonly string[] | null
> = {
  datasets: ['DATASET'],
  apis: ['DATA_SERVICE'],
  concepts: ['CONCEPT'],
  'information-models': ['INFORMATION_MODEL'],
  'services-and-events': ['PUBLIC_SERVICE', 'EVENT'],
  docs: null,
};

export function isValidSetSegment(
  segment: string | undefined
): segment is SearchSetSegment {
  if (segment == null) return false;
  return (VALID_SET_SEGMENTS as readonly string[]).includes(segment);
}

export function getSearchTypesForSet(
  set: SearchSetSegment
): readonly string[] | null {
  return SET_TO_SEARCH_TYPES[set];
}

/** Hit with optional searchType (from SearchObject). */
type HitWithType = { searchType?: string };

/**
 * Returns count of hits that belong to the given set (by searchType).
 */
export function countHitsForSet(
  hits: HitWithType[] | undefined,
  set: SearchSetSegment
): number {
  if (!hits?.length) return 0;
  const types = getSearchTypesForSet(set);
  if (!types) return 0;
  const setTypes = new Set(types);
  return hits.filter((h) => h.searchType && setTypes.has(h.searchType)).length;
}

/**
 * Returns badge counts for each set (and KI) from search results.
 * KI count is from llmHitsCount; entity sets from searchResults.hits by searchType.
 */
export function getBadgeCounts(
  searchHits: HitWithType[] | undefined,
  llmHitsCount: number
): Record<string, number> {
  const counts: Record<string, number> = {
    [KI_TOGGLE_VALUE]: llmHitsCount,
  };
  for (const set of VALID_SET_SEGMENTS) {
    counts[set] = countHitsForSet(searchHits, set);
  }
  return counts;
}
