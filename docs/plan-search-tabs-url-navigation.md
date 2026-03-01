# Plan: Search tabs as URL-driven view toggles

## Goal

- Search tabs control **which part of the search results is displayed** (not just client state).
- **KI** = LLM/AI search results.
- **Other tabs** (except "Dokumentasjon") = filtered subset of the **regular search** by entity type (`searchType`).
- **Dokumentasjon** = separate behavior (out of scope for this plan or handled separately).
- Tab clicks **navigate** (like the language switcher): new URL, shareable, back/forward friendly.

---

## Current state

- **Routes:** Single search route: `[lang]/search` with `searchParams` (e.g. `query`).
- **Search page** (`apps/data-norge/src/app/[lang]/search/page.tsx`): Fetches both LLM results and `searchAllEntities()`; passes all to `SearchPage`.
- **SearchPage** (`apps/data-norge/src/app/components/search-page/index.tsx`): Renders `SearchForm` (which contains `SearchTabs`). Tabs are local state only; no URL, no filtering of displayed results by tab.
- **SearchForm** (`libs/ui/src/lib/search-form/index.tsx`): `SearchTabs` with `defaultValue` and `onChange`; `searchType` is in React state and passed to `onSearch`. No navigation on tab change.
- **Language switcher** (`libs/ui/src/lib/language-switcher/index.tsx`): Uses `useRouter()` + `usePathname()`, builds new URL by replacing the `[lang]` segment, then `router.replace(url.toString())` — full navigation, no query params for locale (locale is in path).
- **Search API** (`libs/data-access`): `searchAllEntities` accepts `query`, `pagination`, `filters`, `sort`. Backend has entity-specific endpoints (`/search/datasets`, `/search/data-services`, `/search/concepts`, etc.); type filtering on the generic `/search` (if supported) would be via `filters`.

---

## URL design: recommendation

**Recommended: path-based segment**

- **`/[lang]/search`** → default = **KI** (LLM search). Same as today.
- **`/[lang]/search/[set]`** → **`[set]`** = tab/set slug, e.g. `datasett`, `api`, `begrep`, `infomodels`, `tjenester`, `docs`.
- Query string for the actual query: **`?q=...`** (or keep `query=...` for consistency with current code).

**Examples**

- `/[lang]/search?q=skatt` → KI view (LLM + optional combined view).
- `/[lang]/search/datasett?q=skatt` → only "Datasett" results (regular search filtered by type).
- `/[lang]/search/api?q=skatt` → only API/data service results.

**Why path over query param**

1. **Clear and shareable:** `/nb/search/datasett?q=skatt` is self-explanatory and stable.
2. **Aligns with language switcher:** Locale is in the path; having "view/set" in the path is consistent (resource = search, sub-resource = result set).
3. **SEO and semantics:** Path expresses "this is the datasets search view" rather than an opaque `set=datasets`.
4. **Routing:** One dynamic segment `[set]` is easy to validate (allowlist of slugs); invalid segment → redirect to `/[lang]/search` or 404.
5. **Future-proof:** Easy to add `/[lang]/search/docs` or other special segments without overloading query params.

**Alternative (query param)**  
`/[lang]/search?set=datasett&q=...` is viable and keeps a single route. Trade-off: all views live under the same path; "current set" is in query. Slightly less clear in address bar and for sharing a specific "view."

**Recommendation:** Use **`/[lang]/search/[set]`** with **`?q=...`** (or keep `query=...` if you standardize on that name). Default when no `[set]` = KI.

---

## Tab → backend mapping

| Tab value (slug) | Display source | Backend / filter |
|------------------|----------------|------------------|
| `ki` (default when no segment) | LLM search results | Existing LLM endpoint; no change. |
| `datasett` | Regular search, type = datasets | `searchAllEntities` with type filter **or** backend `/search/datasets` with query (if API supports it). |
| `api` | Regular search, type = data services / API | Same idea; filter by DATA_SERVICE (or equivalent). |
| `begrep` | Regular search, type = concepts | Filter by CONCEPT. |
| `infomodels` | Regular search, type = information models | Filter by INFORMATION_MODEL. |
| `tjenester` | Regular search, type = services/events | Filter by SERVICE (or equivalent type). |
| `docs` | Dokumentasjon | Separate (different API or behavior); define later. |

**Implementation note:** Confirm backend contract: either `filters` on `/search` (e.g. `type` / `entityType`) or use of entity-specific search endpoints with a `query` parameter. If only generic `/search` exists with no type filter, filtering can be done client-side from `searchAllEntities` result by `searchType` until backend supports it.

---

## High-level implementation plan

### 1. Routing and URL shape

- Add optional dynamic segment: **`[lang]/search/[[...set]]`** or **`[lang]/search/[set]`**.
  - Option A: **`[lang]/search/[set]/page.tsx`** so that `/[lang]/search` stays the current `page.tsx` and `/[lang]/search/datasett` is a new page. Then two pages (or a shared component) need to stay in sync.
  - Option B: **`[lang]/search/[[...set]]/page.tsx`** (optional catch-all): one page; `params.set` is `undefined` | `['ki']` | `['datasett']` etc. Resolve "current set" from `params.set?.[0]` (default `'ki'`).
- Prefer **single page** with optional segment: e.g. **`apps/data-norge/src/app/[lang]/search/[[...set]]/page.tsx`** (Next.js optional catch-all: `[[...set]]`). Then:
  - `/[lang]/search` → `set` undefined → treat as KI.
  - `/[lang]/search/datasett` → `set = ['datasett']` → datasett view.
- Validate `set`: allowlist `['ki','datasett','api','begrep','infomodels','tjenester','docs']`. Invalid → redirect to `/[lang]/search?q=...` (preserve `q`).

### 2. Read URL in the search page (server)

- In the search page, read:
  - `params.set` (from optional catch-all) or `params.set` from `[set]` if using a single dynamic segment.
  - `searchParams.q` or `searchParams.query` for the query string.
- Derive **currentSet** = first segment or default `'ki'`.
- Pass **currentSet** (and **query**) into `SearchPage` so it can:
  - Fetch the right data (LLM for `ki`; for others, call search with type filter or use existing `searchAllEntities` and filter by `searchType`).
  - Only render the section that matches the current set (KI section vs filtered regular-search section).

### 3. Data fetching

- **When currentSet === 'ki':**  
  Keep current behavior: run LLM search (if configured) and optionally still run `searchAllEntities` if you want to show combined or fallback results.
- **When currentSet is one of datasett/api/begrep/infomodels/tjenester:**  
  - Either: call `searchAllEntities` with a type filter (once backend supports it), **or**
  - Use existing entity-specific APIs with a text query (if they support it), **or**
  - Call `searchAllEntities` without type filter and filter hits client-side by `searchType` (quick win, same data as today).
- **When currentSet === 'docs':**  
  Placeholder or separate logic (no change in this plan).

### 4. Search tabs: navigate on click (language-switcher style)

- **SearchTabs** (or a wrapper used only on the search page) should:
  - Receive **currentSet** from URL (from server or from client read of pathname/params).
  - On tab change: build the new path:
    - **KI:** `/[lang]/search?q=...`
    - **Other:** `/[lang]/search/[set]?q=...`
  - Use **`router.replace(newUrl)`** (or `router.push`) so the browser navigates. No local state for "selected tab" — it comes from the URL.
- Reuse the same pattern as language-switcher: `useRouter()`, `usePathname()`, split path, replace the segment after `/search`, then `router.replace(url.toString())`. Preserve `q` (or `query`) when building the URL.

### 5. SearchForm and form submit

- On **submit**, the form should navigate to the URL that matches the **current** tab (which is now from the URL). So:
  - If user is on `/[lang]/search` (KI), submit → `/[lang]/search?q=...`
  - If user is on `/[lang]/search/datasett`, submit → `/[lang]/search/datasett?q=...`
- The input can stay uncontrolled or controlled; on submit, read query and current path, then navigate to same path with `?q=...` updated.

### 6. Badge counts (optional for later)

- Tab badge counts today are static. If desired later, they can be driven by the same search response (e.g. total per type from `searchAllEntities` or from aggregations). Not required for the URL/tab navigation behavior.

### 7. Summary of files to touch (when implementing)

- **Routing:** Add optional segment under `[lang]/search` (e.g. `[[...set]]/page.tsx` or move/duplicate page into `[set]`).
- **Search page (server):** Read `set` and `q`/`query`; compute currentSet; fetch LLM and/or filtered search accordingly; pass currentSet and data to `SearchPage`.
- **SearchPage component:** Accept `currentSet`; render only the result section that matches currentSet (KI vs filtered list).
- **SearchTabs (or search-page-specific wrapper):** Controlled by URL; on change, build path + query and call `router.replace(...)`.
- **SearchForm:** Sync with URL (currentSet and q from URL); on submit, navigate to current path with new `q`.
- **Canonical / metadata:** Consider canonical URL for the current set (e.g. `/[lang]/search/datasett?q=...`) in `generateMetadata`.

---

## Recommendation (short)

- Use **path-based sets:** **`/[lang]/search`** (KI) and **`/[lang]/search/[set]`** (e.g. `datasett`, `api`, …) with **`?q=...`**.
- One **optional dynamic segment** under `search` (e.g. `[[...set]]`) and a single page that reads `set` and `q`, fetches accordingly, and renders one result view.
- Make **SearchTabs** drive and reflect the URL: on tab click, **navigate** (like the language switcher) to the corresponding path, preserving `q`.
- Map tabs (except KI and docs) to **searchType** (or backend type filter) and show only that subset of regular search results.

No code changes are made in this repo yet; this document is the plan only.
