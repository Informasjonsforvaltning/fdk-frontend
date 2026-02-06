# Plan: Merge LLM search hits into regular search results

## Problem

- **LLM search** accepts natural-language queries and can return datasets, concepts, etc.
- **Regular (entity) search** uses the same query and may return **zero hits** when the query is too complex or natural-language.
- Today: when the user switches to a tab (e.g. "Datasets" or "Concepts"), only **regular search results** are shown. So if the entity search returned 0 hits but LLM found e.g. 3 datasets and 2 concepts, the Datasets tab shows "Ingen resultater" and the Concepts tab also shows "Ingen resultater".
- **Goal**: Whenever we have LLM hits, those entities should also appear in the corresponding tab (datasets, concepts, etc.). So the Datasets tab should show both regular search hits for datasets **and** LLM dataset hits (without duplicates).

## Current architecture (brief)

- **Client** (`search-page-client.tsx`): Fetches in parallel `POST /api/search/llm` and `POST /api/search/entities`. State: `llmResults: LlmSearchResponse | undefined`, `searchResults: SearchResultsProp | undefined`.
- **Types**:
  - `SearchResultsProp = { hits?: SearchObject[]; [key: string]: unknown }`
  - `LlmSearchResponse = { hits: LlmSearchResult[] }` with `LlmSearchResult`: `id`, `title`, `description`, `type` (e.g. `'dataset' | 'concept'`), `publisher`, `publisherId`
- **SearchPage** (`index.tsx`):
  - When no set is selected (KI view): shows only `llmResults.hits` via `llmHitToEntity(item)` → `EntityTeaser`.
  - When a set is selected (e.g. `datasets`, `concepts`): shows `filterHitsBySet(searchResults.hits, currentSet)` — i.e. only regular search hits.
- **Mapping**: `LLM_TYPE_TO_SEARCH_TYPE` and `llmHitToEntity()` already convert an LLM hit to `SearchObject` for display.

## Recommendation

### 1. Do **not** union the types

- **Do not** type `searchResults` as `SearchResultsProp | LlmSearchResponse | undefined`.
- **Reason**: The two shapes are different (`hits` are `SearchObject[]` vs `LlmSearchResult[]`). The rest of the UI (e.g. `filterHitsBySet`, `EntityTeaser`, badge counts) expects `SearchObject[]`. Keeping separate state keeps responsibilities clear and avoids branching on type everywhere.

### 2. Keep two sources of truth; derive a **merged** list for display

- Keep state as today: `llmResults` and `searchResults` stay separate.
- **New derived value**: compute **merged hits** = regular search hits + LLM hits converted to `SearchObject`, then **deduplicated by id** (or uri).
- Use this merged list **only** when rendering the **tabbed** view (datasets, concepts, etc.). The KI view can continue to show only `llmResults.hits` (no change there).

### 3. Deduplication

- **Yes**: compare by `id` (or `uri`). If an entity appears in both regular search and LLM results, it should appear only once.
- Suggested rule: start from `searchResults.hits`, then append each `llmHitToEntity(llmHit)` whose `id` (or `uri`) is **not** already in the existing list. That way regular search “wins” (order: search first, then LLM-only).

### 4. Where to implement the merge

**Option A – In `SearchPage` (presentation)**  
- Inputs: `searchResults`, `llmResults`, `currentSet`.  
- Compute merged hits (search + llm converted, deduped by id).  
- Use merged hits for:
  - `filterHitsBySet(mergedHits, currentSet)` for the tab content.
  - Badge counts for entity sets: derive from merged hits (e.g. reuse `getBadgeCounts(mergedHits, llmHitsCount)` so that “datasets” count = number of dataset hits in merged list; KI count still `llmHitsCount`).

**Option B – In `SearchPageClient` (container)**  
- After `fetchSearchData`, compute merged hits and pass a single “effective” `searchResults` (e.g. `{ hits: mergedHits }`) to `SearchPage`.  
- Con: `SearchPage` would no longer receive “raw” search results; if we ever need to show “only regular” vs “only LLM” we’d need to pass both again.  
- Pro: `SearchPage` stays dumb and only sees one list.

**Recommendation**: **Option A** — merge inside `SearchPage`. It already has both `searchResults` and `llmResults` and the logic is “how we display results,” so keeping merge and dedupe there keeps the client thin and leaves room to show raw vs merged later if needed.

### 5. Badge counts

- **KI tab**: keep using `llmHitsCount` (number of LLM hits).
- **Entity tabs (datasets, concepts, …)**: use counts from the **merged** hits per set (so “Datasets (5)” = 5 dataset hits in the merged list). That implies:
  - Either extend/use `getBadgeCounts(mergedHits, llmHitsCount)` so entity-set counts are based on `mergedHits`, or
  - Compute badge counts from the same merged list we use for the list (no new source of truth).

### 6. Summary of code changes (high level)

1. **SearchPage** (`index.tsx`):
   - Add a helper e.g. `mergeSearchAndLlmHits(searchResults, llmResults): SearchObject[]` that:
     - Starts from `searchResults?.hits ?? []`.
     - Converts each `llmResults.hits` with `llmHitToEntity`, appending only if `id` (or `uri`) is not already in the list.
   - Compute `mergedHits = mergeSearchAndLlmHits(searchResults, llmResults)`.
   - Use `mergedHits` instead of `allSearchHits` for:
     - `filterHitsBySet(mergedHits, currentSet)` (tab content).
     - Badge counts: `getBadgeCounts(mergedHits, llmHitsCount)` (and keep `badgeCountsOverride` behavior for the no-query/summary case).
   - Adjust `totalResults` if desired (e.g. based on merged list + KI so we don’t double-count).

2. **SearchPageClient**: no type or state change; keep passing `searchResults` and `llmResults` as today.

3. **Types**: no change to `SearchResultsProp` or `LlmSearchResponse`; no union.

### 7. Edge cases

- **Empty LLM results**: merged list = search results only (current behavior).
- **Empty search results**: merged list = only LLM hits (converted); tabs show them.
- **Both empty**: unchanged; “Ingen resultater” etc.
- **Duplicate id in both**: only one entry (search first, then LLM; dedupe by id).

---

## Answers to your questions

| Question | Answer |
|----------|--------|
| Is there an easy way to copy hits from LLM results to search results? | Yes: use the existing `llmHitToEntity()` to convert each LLM hit to `SearchObject`, then append to the list of search hits, with deduplication by `id`/`uri`. |
| Does search results need to be typed as `SearchResultsProp \| LlmSearchResponse \| undefined`? | No. Keep `searchResults` as `SearchResultsProp` and `llmResults` as `LlmSearchResponse`. Derive a merged `SearchObject[]` only for display (and badge counts). |
| If we compare LLM result items and search result items, do we avoid duplicates? | Yes. By building the list from search hits first and only adding an LLM-converted hit when its `id` (or `uri`) is not already in the list, we avoid duplicates. |
