# Plan: Return All Results When Search Page `q` Is Undefined or Not Set

## Goal

When the user lands on the search page **without** a `q` query parameter, the page should **return and show all results** instead of showing no results. For **set-specific routes** (`/search/datasets`, `/search/apis`, `/search/concepts`, etc.), “all results” means all results **of that entity type** from the search service.

## Current Behavior

- **URL:** `/[lang]/search` or `/[lang]/search/[[...set]]` with optional `?q=...`
- **Client:** When `!q.trim()`, clears results and does not fetch → empty UI.
- **With `q`:** Fetches LLM + generic entity search (`/search` with query), then filters by set in the UI.

## Desired Behavior

- **No `q`, no set (KI view):** Call generic search with `query: ''` → show all entity types (paginated).
- **No `q`, set segment present (e.g. `/search/datasets`):** Call the **entity-type-specific** search endpoint for that set (e.g. `POST /search/datasets` with `{ pagination }`) → show all results of that type.
- **With `q`:** Unchanged (LLM + generic entity search, filter by set in UI).

## Search service contract (fdk-search-service)

Cross-reference: **[fdk-search-service](https://github.com/Informasjonsforvaltning/fdk-search-service)** (and [OpenAPI/Swagger](https://search.api.fellesdatakatalog.digdir.no/swagger-ui/index.html)). See also **fdk-portal**, which already implements “all results” per entity type.

- **Generic “all”:** `POST /search` with body `{ "query": "", "pagination": { "size": 10, "page": 0 } }` returns mixed entity types.
- **All of one entity type:** Use the **resource-type-specific endpoint** with **only pagination** in the body (no query):
  - **Datasets:** `POST /search/datasets` with body `{ "pagination": { "size": 10, "page": 0 } }` (or `{}` for defaults).
  - Example response: `{ "hits": [...], "page": { "currentPage": 0, "size": 10, "totalElements": 9472, "totalPages": 948 } }`.

From the [search API docs](apps/data-norge/public/content/technical/api/search/search.en.mdx):

| Resource type       | Endpoint             |
| ------------------- | -------------------- |
| Datasets            | `/search/datasets`   |
| APIs (data-services)| `/search/data-services` |
| Concepts            | `/search/concepts`   |
| Information models  | `/search/information-models` |
| Services            | `/search/services`   |
| Events              | `/search/events`     |

**Alias in this repo:** The frontend exposes “APIs” in the URL as the segment **`apis`**, but the search service endpoint is **`/search/data-services`**. So route `/[lang]/search/apis` (no `q`) must call the API at **`/search/data-services`** with `{ pagination }`.

## Segment → search-service path mapping

| URL segment (`currentSet`) | Search-service path   |
|----------------------------|------------------------|
| `datasets`                 | `datasets`             |
| `apis`                     | `data-services`       |
| `concepts`                 | `concepts`             |
| `information-models`       | `information-models`   |
| `services-and-events`      | `services`            |
| `docs`                     | (no entity search; placeholder UI) |

Note: `services-and-events` maps to `/search/services` for now; `/search/events` can be added later if the tab should include both.

## Implementation Plan

### 1. data-access (search-service API)

- Add a function that calls the search service by **path suffix** with only pagination (no query), e.g. `searchEntitiesByPath(path, { pagination })` → `POST /search/{path}` with body `{ pagination }`. This matches fdk-search-service usage: body `{"pagination": {}}` or `{"pagination": { "size": 20, "page": 0 }}` to return all results for that type.
- Export from server. Existing `getAllDatasets` / `getAllServices` already use this pattern; the new helper generalizes it for any valid path (datasets, data-services, concepts, information-models, services).

### 2. Entities API route

- **Request body:** Accept optional `set` (string). Valid values: `datasets`, `apis`, `concepts`, `information-models`, `services-and-events`, `docs`.
- **When `set` is present and `query` is empty/absent:** Map `set` to search-service path (apis → data-services), then call the new search-by-path function with `pagination` (e.g. `{ size: 20, page: 0 }`). Return the JSON response (hits + page).
- **When `set` is `docs`:** Return empty result or skip call (no entity search for docs).
- **Otherwise:** Keep current behavior: `searchAllEntities` with `query: typeof body?.query === 'string' ? body.query : ''` and existing pagination/filters.

### 3. Client

- When **`q` is empty**:
  - If **`currentSet`** is set and not `docs`: call entities API with `body: { set: currentSet, pagination: { size: 20, page: 0 } }` (no `query`).
  - If **`currentSet`** is undefined (KI view): call entities API with `body: { query: '', pagination: { size: 20, page: 0 } }`.
  - If **`currentSet`** is `docs`: do not call entity search (show docs placeholder).
- When **`q`** is set: keep current dual fetch (LLM + entities with query).

### 4. UI

- No change beyond existing empty-query headings: when `query` is empty, show “X resultater” (or “Laster…” when loading) without a quoted query.

## Summary of code touches

| Area           | File(s) | Action |
|----------------|---------|--------|
| Plan           | `docs/plan-search-empty-q-return-all.md` | Document set-specific endpoints, fdk-search-service / fdk-portal refs, apis → data-services alias. |
| data-access    | `libs/data-access/src/lib/search-service/api/index.ts` | Add `searchEntitiesByPath(path, { pagination })` for `POST /search/{path}` with body `{ pagination }`. |
| Entities API   | `apps/data-norge/src/app/api/search/entities/route.ts` | Accept `body.set`; when set and no query, map set→path and call searchEntitiesByPath; map `apis` → `data-services`. |
| Client         | `search-page-client.tsx` | When no `q`: if `currentSet` and not docs → fetch with `set`; if no set → fetch with `query: ''`; if docs → no entity fetch. |

## Verification

- `/[lang]/search` (no `q`): Generic “all” results (query `''`).
- `/[lang]/search/datasets` (no `q`): All datasets via `POST /search/datasets` with `{ pagination }`.
- `/[lang]/search/apis` (no `q`): All APIs via `POST /search/data-services` with `{ pagination }`.
- `/[lang]/search?q=test` and `/[lang]/search/datasets?q=test`: Unchanged (LLM + entity search, then filter by set).

## References

- **fdk-search-service:** [GitHub](https://github.com/Informasjonsforvaltning/fdk-search-service); [OpenAPI](https://search.api.fellesdatakatalog.digdir.no/swagger-ui/index.html).
- **fdk-portal:** Same functionality (all results per entity type) already implemented; cross-reference for consistency.
- **This repo:** Search API docs under `apps/data-norge/public/content/technical/api/search/`.
