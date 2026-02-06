# Plan: Preload Per-Entity Search Results on Search Page Load

## Goal

- On search page load, support **two behaviours**:
  - When **`q` is empty or missing**: fetch **one search-service request per entity type** (datasets, APIs, concepts, information models, services, events) so that:
    - We can use **`page.totalElements`** from fdk-search-service for **badges** in the search tabs.
    - **Tab switches never refetch**; they only switch which already-loaded result set is displayed.
    - LLM search is **skipped entirely**.
  - When **`q` has a value**: keep today’s behaviour:
    - **Single generic search** (`/search`) across all entities via `searchAllEntities`.
    - **Single LLM search**.
    - Badges computed by counting hits per `searchType` (current `getBadgeCounts` logic).

## Search-service contract (fdk-search-service)

Cross-reference: public docs at `apps/data-norge/public/content/technical/api/search/search.en.mdx`, which point to **fdk-search-service** and Swagger (`https://search.api.fellesdatakatalog.digdir.no/swagger-ui/index.html`).

- **Base URL (prod)**: `https://search.api.fellesdatakatalog.digdir.no/search`
- **Entity-type endpoints** (path suffix after `/search`):

  | Resource type        | Endpoint suffix       |
  |----------------------|-----------------------|
  | Datasets             | `datasets`            |
  | APIs (data-services) | `data-services`       |
  | Concepts             | `concepts`            |
  | Information models   | `information-models`  |
  | Services             | `services`            |
  | Events               | `events`              |

- **Body when query is empty/missing**:

  ```json
  { "pagination": {} }
  ```

  or explicitly:

  ```json
  { "pagination": { "size": 10, "page": 0 } }
  ```

- **Response shape (per endpoint)**:

  ```json
  {
    "hits": [ ... ],
    "page": {
      "currentPage": 0,
      "size": 10,
      "totalElements": 9472,
      "totalPages": 948
    }
  }
  ```

- **Alias in this repo**:

  - URL segment **`apis`** (search tab + path) corresponds to search-service path **`data-services`**.

## URL behaviour (unchanged)

- `/[lang]/search` or `/[lang]/search?q=...` → KI (LLM) tab (no set segment).
- `/[lang]/search/[set]?q=...` → set = `datasets` | `apis` | `concepts` | `information-models` | `services-and-events` | `docs`.
- Tab changes update the path segment and keep `?q=...` as today.

## Data model in the client

We keep the existing **`SearchPage`** API for the "query present" case, and introduce a **summary model** only for the "no query" case.

### Existing (query present)

- `SearchPageClient` state today:

  ```ts
  const [llmResults, setLlmResults] = useState<LlmSearchResponse | undefined>();
  const [searchResults, setSearchResults] = useState<SearchResultsProp | undefined>();
  const [loading, setLoading] = useState(false);
  ```

- `SearchPage` receives:

  ```ts
  type SearchResultsProp = { hits?: SearchObject[]; [key: string]: unknown };

  type SearchPageProps = {
    lang: LocaleCodes;
    query?: string;
    currentSet?: SearchSetSegment;
    llmResults?: LlmSearchResponse;
    searchResults?: SearchResultsProp;
    loading?: boolean;
  };
  ```

- Badges are computed via:

  ```ts
  const allSearchHits = searchResults?.hits ?? [];
  const badgeCounts = getBadgeCounts(allSearchHits, llmHitsCount);
  ```

### New (no query: per-entity summary)

For the **`q` empty** case we introduce an internal summary type used inside `SearchPageClient` and then flattened back into `searchResults` + an optional **badge override** for `SearchPage`.

```ts
// Per-entity-type paged result
export type PagedSearchResult = {
  hits?: SearchObject[];
  page?: {
    currentPage: number;
    size: number;
    totalElements: number;
    totalPages: number;
  };
  [key: string]: unknown;
};

// Summary of all entity types loaded on page load
export type SearchSummary = {
  datasets?: PagedSearchResult;
  apis?: PagedSearchResult;                // from /search/data-services
  concepts?: PagedSearchResult;
  informationModels?: PagedSearchResult;   // from /search/information-models
  services?: PagedSearchResult;            // from /search/services
  events?: PagedSearchResult;              // from /search/events
};
```

We then:

- **Flatten** all `summary.*.hits` into a single `SearchObject[]` and pass it as `searchResults.hits` to `SearchPage`.
- Compute **badge counts** for the tabs from `summary.*.page.totalElements` and pass them via a new optional prop, e.g. `badgeCountsOverride?: Record<string, number>`.

`SearchPage` will be updated to:

```ts
const badgeCounts = badgeCountsOverride
  ? badgeCountsOverride
  : getBadgeCounts(allSearchHits, llmHitsCount);
```

So:

- **With query:** `badgeCountsOverride` is **not** provided → we keep today’s behaviour (counts from hits).
- **Without query:** `badgeCountsOverride` is provided → we use `totalElements` per entity type.

## Server-side aggregation route (no-query only)

Introduce a **single API route** that aggregates per-entity calls **only when `q` is empty/missing**.

- **Location (example)**: `apps/data-norge/src/app/api/search/summary/route.ts`
- **Method**: `POST`
- **Request body**:

  ```ts
  type SearchSummaryRequest = {
    pagination?: { size?: number; page?: number };
  };
  ```

- **Behaviour** (no-query only):

  1. Parse `body` and derive:

     ```ts
     const pagination = body.pagination ?? { size: 10, page: 0 };
     ```

  2. Use `searchApi` from `@fdk-frontend/data-access/server` (`libs/data-access/src/lib/search-service/api/index.ts`) to call per-entity endpoints:

     ```ts
     // Example pseudocode
     const [datasets, apis, concepts, informationModels, services, events] = await Promise.all([
       searchApi('/search/datasets',           { pagination: {} }),
       searchApi('/search/data-services',      { pagination: {} }),
       searchApi('/search/concepts',           { pagination: {} }),
       searchApi('/search/information-models', { pagination: {} }),
       searchApi('/search/services',           { pagination: {} }),
       searchApi('/search/events',             { pagination: {} }),
     ]);
     ```

     - Body contains only `pagination` (no `query` key) for the no-query case.
     - If any call fails, return a safe fallback for that type and log a warning.

  3. Shape the response as:

     ```ts
     type SearchSummaryResponse = {
       summary: SearchSummary;
     };
     ```

  4. **LLM search is not part of this route**; for `q` empty we skip LLM entirely.

  5. If this route is accidentally called with a `query` field, it MAY respond with `400` or ignore `query`. The client will **never** send `query` here.

## Client fetching strategy (`SearchPageClient`)

We branch behaviour based on `q`.

### When `q` has a value (current behaviour, kept)

- Effect (simplified):

  ```ts
  useEffect(() => {
    const q = query?.trim() ?? '';
    if (!q) {
      setLlmResults(undefined);
      setSearchResults(undefined);
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);

    fetchSearchData(q) // Promise.all([/api/search/llm, /api/search/entities])
      .then(({ llmResults: llm, searchResults: entities }) => { ... })
      .catch(() => { ... })
      .finally(() => { ... });

    return () => { cancelled = true; };
  }, [query]);
  ```

- **No changes** here, except possibly sharing constants for pagination.
- Badges continue to use `getBadgeCounts(allSearchHits, llmHitsCount)` (hit counts by `searchType`).

### When `q` is empty or missing (new behaviour)

- Replace the early-return (`if (!q) { ... return; }`) with a call to the **summary route**:

  ```ts
  useEffect(() => {
    const q = query?.trim() ?? '';

    let cancelled = false;

    if (!q) {
      setLoading(true);
      setLlmResults(undefined);

      fetch('/api/search/summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pagination: { size: 10, page: 0 } }),
      })
        .then(async (res) => {
          if (!res.ok) throw new Error('Search summary failed');
          const json = (await res.json()) as SearchSummaryResponse;
          if (cancelled) return;

          // Flatten all summary hits into a single array
          const combinedHits: SearchObject[] = [];
          combinedHits.push(...(json.summary.datasets?.hits ?? []));
          combinedHits.push(...(json.summary.apis?.hits ?? []));
          combinedHits.push(...(json.summary.concepts?.hits ?? []));
          combinedHits.push(...(json.summary.informationModels?.hits ?? []));
          combinedHits.push(...(json.summary.services?.hits ?? []));
          combinedHits.push(...(json.summary.events?.hits ?? []));

          setSearchResults({ hits: combinedHits });

          // Compute badgeCountsOverride from totalElements (see next section)
          setBadgeCountsOverride(computeBadgeCountsFromSummary(json.summary));
        })
        .catch(() => {
          if (!cancelled) {
            setSearchResults(undefined);
            setBadgeCountsOverride(undefined);
          }
        })
        .finally(() => {
          if (!cancelled) setLoading(false);
        });
    } else {
      // existing query-present behaviour (see above)
    }

    return () => {
      cancelled = true;
    };
  }, [query]);
  ```

- `badgeCountsOverride` is a new piece of state in `SearchPageClient` that is passed down to `SearchPage`.

## Tab behaviour and badge counts

### Badge counts when `q` is empty

From `SearchSummary`:

```ts
const computeBadgeCountsFromSummary = (summary: SearchSummary): Record<string, number> => ({
  datasets: summary.datasets?.page?.totalElements ?? 0,
  apis: summary.apis?.page?.totalElements ?? 0,
  concepts: summary.concepts?.page?.totalElements ?? 0,
  'information-models': summary.informationModels?.page?.totalElements ?? 0,
  // services-and-events = services + events (combined in UI)
  'services-and-events':
    (summary.services?.page?.totalElements ?? 0) + (summary.events?.page?.totalElements ?? 0),
  docs: 0,
  // KI tab: no LLM for empty query
  ki: 0,
});
```

This object is passed as `badgeCountsOverride` to `SearchPage`.

### Badge counts when `q` has value

- We **do not** use `SearchSummary`.
- Badges are computed exactly as today using `getBadgeCounts(allSearchHits, llmHitsCount)` from a single mixed `searchResults.hits` array.

### Displayed results per tab

- **`currentSet` is `undefined` (KI tab)**:
  - When `query` is non-empty: show LLM hits (`llmResults.hits`) as today.
  - When `query` is empty: show an informative empty state; no LLM and no entity lists (optional improvement: show some featured data, but not part of this plan).

- **`currentSet === 'datasets'`**:
  - With query: filter `searchResults.hits` by `DATASET` (current behaviour).
  - Without query: `searchResults.hits` contains the union of all entity hits; `filterHitsBySet` + `searchType` will show the dataset slice.

- **`currentSet === 'apis'`**:
  - With query: filter by `DATA_SERVICE`.
  - Without query: show the slice from combined hits where `searchType` maps to APIs.

- **`currentSet === 'concepts'`**:
  - Same pattern; filter by `CONCEPT`.

- **`currentSet === 'information-models'`**:
  - Filter by `INFORMATION_MODEL`.

- **`currentSet === 'services-and-events'`**:
  - UI presents **services + events together**.
  - With query: filter the mixed hits where `searchType` is `PUBLIC_SERVICE` or `EVENT` (current behaviour).
  - Without query: combined hits already include both `/search/services` and `/search/events` hits; `filterHitsBySet('services-and-events')` (configured in `search-set-config`) will pick both.

- **`currentSet === 'docs'`**:
  - Leave as "Documentation search coming soon" for now.

### Tab switching

- Tab clicks still call `router.replace(buildSearchUrl(set, query))` in `SearchForm`.
- `SearchPageClient` effect depends only on `query`, so changing tabs **never refetches** (both in query-present and no-query cases).

## Behaviour matrix

- **`/[lang]/search` (no `q`)**:
  - Client posts to `/api/search/summary` with `{ pagination: { size: 10, page: 0 } }`.
  - Server calls per-entity endpoints with `{ pagination: {} }`, **skips LLM**.
  - Tabs show `totalElements` per type (datasets, apis, concepts, information-models, services+events); KI tab has 0 LLM hits.

- **`/[lang]/search/datasets` (no `q`)**:
  - Same summary fetch as above.
  - `currentSet = 'datasets'` → UI shows the dataset slice of combined hits; badge from `summary.datasets.page.totalElements`.

- **`/[lang]/search?q=skatt`**:
  - Client keeps using **single generic search + LLM**:
    - `fetch('/api/search/llm', { body: { query: 'skatt' } })`.
    - `fetch('/api/search/entities', { body: { query: 'skatt', pagination: { size: 20, page: 0 } } })`.
  - No calls to `/api/search/summary`.
  - KI tab shows LLM hits; other tabs filter the mixed `searchResults.hits` by `searchType`; badges from `getBadgeCounts` as today.

- **`/[lang]/search/apis?q=skatt`**:
  - Same generic search + LLM as above.
  - `currentSet = 'apis'` → UI filters `searchResults.hits` to APIs and badge from `getBadgeCounts`.

## Notes / future work

- **Docs search**: Later, add a docs search backend and integrate a `docs` section into the summary response and tab.
- **Pagination UX**: For the no-query case, this plan preloads **page 0** for each entity type. Additional pages per tab can use dedicated per-type APIs based on fdk-search-service endpoints.
- **Performance**: Per-entity fdk-search-service calls only happen when `q` is empty. When `q` is present, we keep a single generic search + LLM, preserving today’s performance characteristics.
