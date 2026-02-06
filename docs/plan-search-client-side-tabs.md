# Plan: Client-side search + instant tab switching

## Goal

- **LLM and search API calls run on the client**, not in Server Components. No server-side `getSearchPageData` blocking the page.
- **Search tabs do not cause a new page load.** Clicking a tab updates the view immediately by switching which "set" is displayed from already-fetched data. The URL is still updated (path segment) so the state is shareable and back/forward works.
- **URL path segments** continue to define which set is shown: `/[lang]/search` = KI, `/[lang]/search/datasets` etc. Sharing a link preserves the selected tab and query.
- **No refetch on tab change.** Data is fetched once (when the user has a query); tab changes only change which slice of that data is displayed.
- **Loading state:** Simple "loading" text in the results area while data is fetched (to be improved later).

---

## Current state (before this plan)

- **`[lang]/search/[[...set]]/page.tsx`** is an async Server Component that awaits `getSearchPageData(props)` (LLM + search) then renders. Tab click → `router.replace(url)` → full server round-trip and both APIs run again; view updates only after they complete.
- **Data:** `getSearchPageData` in `search-page-handler.tsx` runs `llmSearch` and `searchAllEntities` on the server when `q` is set.
- **SearchForm** is URL-driven: tab value from `currentSet`, `handleTabChange` calls `router.replace(buildSearchUrl(...))`.

---

## Target behavior

| Action | Result |
|--------|--------|
| User opens `/[lang]/search?q=skatt` or submits search | Client fetches LLM + search (e.g. in a `useEffect` when `q` is present). Results area shows "loading" until both complete. Then show KI results (no set segment). |
| User clicks "Datasett" tab | URL becomes `/[lang]/search/datasets?q=skatt` **without** a full navigation. Same client component reads new path, derives `currentSet = 'datasets'`, re-renders and shows filtered results from **existing** `searchResults`. No API calls. |
| User shares `/[lang]/search/apis?q=skatt` | Recipient opens link; client fetches LLM + search once (because of `q`), shows "loading", then shows API results (currentSet from URL). |
| User changes query and submits | URL updates to new `q` (and current path for set). Client refetches LLM + search (because `q` changed). "Loading" then results. |

---

## URL design (unchanged)

- **`/[lang]/search`** or **`/[lang]/search?q=...`** → KI (no set segment).
- **`/[lang]/search/[set]?q=...`** → set = `datasets` | `apis` | `concepts` | `information-models` | `services-and-events` | `docs`.
- Invalid set segment → redirect to `/[lang]/search?q=...` (can stay server-side in the page or in a client redirect).

---

## High-level implementation

### 1. Server page: no data fetching

- **`[lang]/search/[[...set]]/page.tsx`** should **not** call `getSearchPageData`. It can:
  - Validate `params.set` (invalid → redirect) and pass `locale` if needed, then render a **client** search page component that owns all search state and fetching.
- Optionally keep **metadata** (e.g. `generateMetadata`) for title/canonical; it can read `params`/`searchParams` and build static metadata without fetching LLM/search.

### 2. Client search page: own URL, data, and view

- Introduce a **client component** (e.g. `SearchPageClient` in the app or a wrapper in `search-page-handler`) that:
  - Reads **URL** via `usePathname()` and `useSearchParams()` to get:
    - `currentSet` from the path (first segment after `/search`, or undefined for KI).
    - `query` from `searchParams.q`.
  - Holds **search result state**: e.g. `llmResults`, `searchResults`, `loading` (and optionally `error`). Initial state: no results, not loading.
  - **Fetches when `q` is present:** e.g. `useEffect` that runs when `query` (from URL) changes. If `query` is truthy, set loading true, call LLM + search (client-side), then set results and loading false. If `query` is empty, clear results and do not fetch.
  - **Does not refetch when only the path (set) changes.** Use a ref or dependency array so that only `query` (and maybe locale) trigger fetch; path changes only cause re-render and a different slice of the same data.
  - Renders:
    - **SearchForm** with `lang`, `currentSet` (from URL), `defaultQuery={query}`, `badgeCounts` from current results, and **same** `handleTabChange` that updates the **URL only** (see §3).
    - Results area: if `loading` → show simple **"loading"** text; else show the appropriate set (KI vs filtered by `currentSet`) from `llmResults` / `searchResults`, reusing existing `filterHitsBySet` and `getBadgeCounts` logic.

### 3. Tab click: update URL only (no full navigation)

- **SearchForm** `handleTabChange`: still build the new URL with `buildSearchUrl(value, q)` and call **`router.replace(url)`**.
- To avoid a full server round-trip and keep the same client tree, use **Next.js shallow/client-only update**. In App Router, `router.replace` will still trigger a soft navigation; the **page** must be structured so that the **same client component** is the one that renders for all `/[lang]/search/[[...set]]` URLs. Then:
  - The server **page** for `[[...set]]` should be a thin shell that only renders the client component (no `await getSearchPageData`). So when the URL changes from `/nb/search` to `/nb/search/datasets`, Next.js may re-run the server page, but the page only returns `<SearchPageClient />` (or similar) with no async data. The client component stays mounted (or remounts with the new URL); in either case it should **preserve** the last fetched `llmResults` and `searchResults` so that when it reads the new `currentSet` from the URL it can show the right slice without refetching.
- **Preserving data across URL-only changes:** Keep `llmResults` and `searchResults` in React state (or a store) in the client component. The fetch effect depends only on `query` (from URL). When the user clicks a tab, the URL updates; the client component re-renders (or remounts). If it **remounts**, state would be lost unless we lift state (e.g. to a parent that doesn’t remount) or use a store. So prefer: **single client component that stays mounted** for the whole `/[lang]/search` segment. That usually means the server page is minimal and the client component is the default export or the only child, so Next.js can keep the same client subtree when only the dynamic segment changes. If in practice the client component remounts on `router.replace`, then lift search results state to a React context or external store keyed by `query` so that tab changes (new path, same `q`) don’t clear it.

### 4. Client-side API calls (proxied via Next.js Route Handlers)

Use **Next.js Route Handlers** to proxy both LLM and search. The client only calls relative URLs (e.g. `/api/search/llm`, `/api/search/entities`); all backend base URLs stay in server-only env vars (`FDK_LLM_SEARCH_BASE_URI`, `FDK_SEARCH_SERVICE_BASE_URI`). No `NEXT_PUBLIC_` env vars required.

#### 4.1 LLM search proxy

- **Route:** `apps/data-norge/src/app/api/search/llm/route.ts`
- **Method:** `POST`
- **Request body:** `{ query: string }` (JSON)
- **Behavior:** Read `FDK_LLM_SEARCH_BASE_URI` from `process.env`; if missing, return 503 or empty result. Otherwise call the LLM backend (e.g. `POST ${FDK_LLM_SEARCH_BASE_URI}/llm` with `{ query }`), or reuse `llmSearch(endpoint, query)` from `@fdk-frontend/data-access` by building `endpoint` from the env on the server. Return the JSON response with `Content-Type: application/json`.
- **Client:** `fetch('/api/search/llm', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ query }) })` then `response.json()`.

#### 4.2 Search (entities) proxy

- **Route:** `apps/data-norge/src/app/api/search/entities/route.ts`
- **Method:** `POST`
- **Request body:** Same shape as `searchAllEntities`: `{ query?: string; pagination?: { size?: number; page?: number }; filters?: Record<string, unknown>; sort?: { field?: string; direction?: 'ASC' | 'DESC' }; ... }` (JSON)
- **Behavior:** Import `searchAllEntities` from `@fdk-frontend/data-access/server`. Parse `request.json()`, call `searchAllEntities(body)`, return the result as JSON. Server-only `FDK_SEARCH_SERVICE_BASE_URI` is already used inside that module.
- **Client:** `fetch('/api/search/entities', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ query, pagination: { size: 20, page: 0 } }) })` then `response.json()`.

#### 4.3 Client usage

- The client search page (e.g. `SearchPageClient`) calls **both** routes when `q` is set—e.g. `Promise.all([fetch('/api/search/llm', ...), fetch('/api/search/entities', ...)])`—so the two requests run in parallel. Map responses to the same shapes as today (`LlmSearchResponse`, `SearchApiResponse`) for existing UI/display logic.
- Optional: add a small client helper (e.g. in data-access or in the app) that wraps these `fetch` calls and returns typed results, so the rest of the code stays unchanged from current types.

#### 4.4 Error and edge cases

- **LLM base URI missing:** Return 503 or `{ hits: [] }` so the client can still show search results from the entities API.
- **Non-2xx from backend:** Route handler should return an appropriate status and optionally JSON error; client can show "loading" → error or fallback.
- **Timeouts:** LLM proxy can enforce a timeout (e.g. 30s) and return 504 if the backend is slow; client can mirror existing `llmSearch` timeout behavior.

### 5. Loading and error UI

- While `loading === true`, show simple **"loading"** text in the search results area (no new components for now; to be improved later).
- Optional: on fetch error, show a short error message and leave previous results or empty state.

### 6. Form submit (new query)

- When the user submits the search form with a new query, update the URL (path + `?q=...`) via `router.replace`. The client component’s effect will see the new `q`, run the fetch, show "loading", then results. Same as today’s submit behavior from the user’s perspective, but the fetch happens on the client.

### 7. Files to touch

| Area | Change |
|------|--------|
| **`[lang]/search/[[...set]]/page.tsx`** | Remove `getSearchPageData`; validate set (optional redirect); render client search component only. Optionally keep `generateMetadata` from handler. |
| **`search-page-handler.tsx`** | Stop exporting/using `getSearchPageData` for the page. Either add a new client wrapper component here that uses `usePathname`/`useSearchParams` and holds fetch state, or move that logic into a new file under the app (e.g. `SearchPageClient.tsx`). Keep `getSearchPageMetadata` if metadata is still desired. |
| **Search page UI** | The component that renders the form + results (currently `SearchPage`) becomes the client component, or is wrapped by one. It receives `lang` (from server or from URL), reads `currentSet` and `query` from URL, owns `llmResults`, `searchResults`, `loading`, runs fetch in `useEffect` when `query` changes, and renders "loading" or the set-specific results. Reuse `filterHitsBySet`, `getBadgeCounts`, existing result list and SearchForm. |
| **SearchForm** | No change to URL behavior: `handleTabChange` still does `router.replace(buildSearchUrl(value, q))`. Ensure it receives `currentSet` and `defaultQuery` from the client parent (which reads URL). |
| **API proxies** | Add Route Handlers: `app/api/search/llm/route.ts` (POST, body `{ query }`, proxy to LLM using `FDK_LLM_SEARCH_BASE_URI`); `app/api/search/entities/route.ts` (POST, body as `searchAllEntities`, use `@fdk-frontend/data-access/server`). Client calls these with `fetch`; no `NEXT_PUBLIC_` env vars. |

### 8. Summary

- **Server:** Search page no longer awaits LLM/search; it only renders a client component (and optionally metadata).
- **Client:** One component reads URL (path + `q`), keeps `llmResults` and `searchResults` in state, fetches when `q` is set (LLM + search via client or API route), shows "loading" then results; tab changes only update the URL and which set is shown from existing data.
- **Tabs:** `router.replace(url)` with new path; same client tree; no refetch; view updates immediately from current state.
- **Sharing:** URL still encodes set and query; opening the link runs client fetch once for `q`, then shows the correct set.
