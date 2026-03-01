# Plan: Search tabs as URL-driven view toggles

## Goal

- Search tabs control **which part of the search results is displayed** (not just client state).
- **KI** = LLM/AI search results.
- **Other tabs** (except "Dokumentasjon") = filtered subset of the **regular search** by entity type (`searchType`).
- **Dokumentasjon** = separate behavior (out of scope for this plan or handled separately).
- Tab clicks **navigate** (like the language switcher): new URL, shareable, back/forward friendly.

---

## Current state

- **Routes:** Single search route: `[lang]/search` with `searchParams`. Query param is **`q`** (already shortened from `query`).
- **Search page** (`apps/data-norge/src/app/[lang]/search/page.tsx`): Fetches both LLM results and `searchAllEntities()`; passes all to `SearchPage`.
- **SearchPage** (`apps/data-norge/src/app/components/search-page/index.tsx`): Renders `SearchForm` (which contains `SearchTabs`). Tabs are local state only; no URL, no filtering of displayed results by tab.
- **SearchForm** (`libs/ui/src/lib/search-form/index.tsx`): `SearchTabs` with `defaultValue` and `onChange`; `searchType` is in React state and passed to `onSearch`. No navigation on tab change.
- **Language switcher** (`libs/ui/src/lib/language-switcher/index.tsx`): Uses `useRouter()` + `usePathname()`, builds new URL by replacing the `[lang]` segment, then `router.replace(url.toString())` — full navigation, no query params for locale (locale is in path).
- **Search API** (`libs/data-access`): `searchAllEntities` accepts `query`, `pagination`, `filters`, `sort`. Backend has entity-specific endpoints (`/search/datasets`, `/search/data-services`, `/search/concepts`, etc.); type filtering on the generic `/search` (if supported) would be via `filters`.

---

## URL design: recommendation

**Recommended: path-based segment**

- **`/[lang]/search`** (no segment) → **KI** (LLM search). KI has no segment; these results are shown in the absence of a segment.
- **`/[lang]/search/[set]`** → **`[set]`** = tab/set slug: `datasets`, `apis`, `concepts`, `information-models`, `services-and-events`, or `docs`.
- Query string for the actual query: **`?q=...`** (already in use).

**Examples**

- `/[lang]/search?q=skatt` → KI view (LLM + optional combined view).
- `/[lang]/search/datasets?q=skatt` → only dataset results (regular search filtered by type).
- `/[lang]/search/apis?q=skatt` → only API/data service results.

**Why path over query param**

1. **Clear and shareable:** `/nb/search/datasets?q=skatt` is self-explanatory and stable.
2. **Aligns with language switcher:** Locale is in the path; having "view/set" in the path is consistent (resource = search, sub-resource = result set).
3. **SEO and semantics:** Path expresses "this is the datasets search view" rather than an opaque `set=datasets`.
4. **Routing:** One dynamic segment `[set]` is easy to validate (allowlist of slugs); invalid segment → redirect to `/[lang]/search` or 404.
5. **Future-proof:** Easy to add `/[lang]/search/docs` or other special segments without overloading query params.

**Alternative (query param)**  
`/[lang]/search?set=datasets&q=...` is viable and keeps a single route. Trade-off: all views live under the same path; "current set" is in query. Slightly less clear in address bar and for sharing a specific "view."

**Recommendation:** Use **`/[lang]/search/[set]`** with **`?q=...`**. When there is no `[set]` segment, show KI (LLM) results.

---

## Tab → backend mapping (set segment → searchType)

| Set segment (URL) | searchType value(s) | Display source |
|-------------------|---------------------|----------------|
| (none) | — | LLM search results (existing LLM endpoint). No segment in URL. |
| `datasets` | `DATASET` | Regular search; filter by searchType. |
| `apis` | `DATA_SERVICE` | Regular search; filter by searchType. |
| `concepts` | `CONCEPT` | Regular search; filter by searchType. |
| `information-models` | `INFORMATION_MODEL` | Regular search; filter by searchType. |
| `services-and-events` | `PUBLIC_SERVICE`, `EVENT` | Regular search; filter by searchType (both types in one tab). |
| `docs` | — | Dokumentasjon; separate (different API or behavior); define later. |

**Implementation note:** Always run `searchAllEntities` (full search); filter results client-side by the `searchType`(s) above for the current set. Badge counts come from the full result.

---

## High-level implementation plan

### 1. Routing and URL shape

- Add optional dynamic segment: **`[lang]/search/[[...set]]`** or **`[lang]/search/[set]`**.
  - Option A: **`[lang]/search/[set]/page.tsx`** so that `/[lang]/search` stays the current `page.tsx` and `/[lang]/search/datasets` is a new page. Then two pages (or a shared component) need to stay in sync.
  - Option B: **`[lang]/search/[[...set]]/page.tsx`** (optional catch-all): one page; `params.set` is `undefined` | `['datasets']` | `['apis']` etc. When `set` is undefined, show KI (no segment).
- Prefer **single page** with optional segment: e.g. **`apps/data-norge/src/app/[lang]/search/[[...set]]/page.tsx`** (Next.js optional catch-all: `[[...set]]`). Then:
  - `/[lang]/search` → `set` undefined → KI view (LLM results).
  - `/[lang]/search/datasets` → `set = ['datasets']` → datasets view.
- Validate `set`: allowlist **only** `['datasets', 'apis', 'concepts', 'information-models', 'services-and-events', 'docs']`. No `ki`/`ai` segment — KI is the default when there is no segment. Invalid segment → redirect to `/[lang]/search?q=...` (preserve `q`).

### 2. Read URL in the search page (server)

- In the search page, read:
  - `params.set` (from optional catch-all) or `params.set` from `[set]` if using a single dynamic segment.
  - `searchParams.q` for the query string.
- Derive **currentSet** = first segment when present, otherwise **undefined** (meaning KI view). KI has no URL segment.
- Pass **currentSet** (and **query**) into `SearchPage` so it can:
  - Fetch the right data (LLM when currentSet is undefined; for others, use existing `searchAllEntities` and filter by `searchType`).
  - Only render the section that matches the current set (KI section when no segment vs filtered regular-search section).

### 3. Data fetching

- **Always perform both:** Regardless of which **set** is selected (or undefined), always run **LLM search** and **searchAllEntities** (full search, no type filter). This gives:
  - Result counts per entity type for the **toggle group options** (badges).
  - A single source of truth; we only **display** a subset of results based on the selected set.
- **Display logic:** Use **currentSet** to decide which slice to show:
  - **currentSet undefined** (no segment in URL): show LLM results (and optionally combined/fallback from regular search).
  - **currentSet** in `datasets` / `apis` / `concepts` / `information-models` / `services-and-events`: show only the filtered subset from `searchAllEntities` by `searchType` (client-side filter: DATASET, DATA_SERVICE, CONCEPT, INFORMATION_MODEL, or PUBLIC_SERVICE+EVENT for services-and-events).
  - **currentSet === 'docs':** placeholder or separate logic (no change in this plan).
- So: **one full search (LLM + searchAllEntities), multiple views** — no conditional fetching by tab.

### 4. Search tabs: navigate on click (language-switcher style)

- **SearchTabs** (or a wrapper used only on the search page) should:
  - Receive **currentSet** from URL (from server or from client read of pathname/params).
  - On tab change: build the new path:
    - **KI (LLM):** `/[lang]/search?q=...` (no segment — do not use `/search/ki` or `/search/ai`).
    - **Other:** `/[lang]/search/[set]?q=...`
  - Use **`router.replace(newUrl)`** (or `router.push`) so the browser navigates. No local state for "selected tab" — it comes from the URL.
- Reuse the same pattern as language-switcher: `useRouter()`, `usePathname()`, split path, replace the segment after `/search`, then `router.replace(url.toString())`. Preserve `q` when building the URL.

### 5. SearchForm and form submit

- On **submit**, the form should navigate to the URL that matches the **current** tab (which is now from the URL). So:
  - If user is on `/[lang]/search` (KI), submit → `/[lang]/search?q=...`
  - If user is on `/[lang]/search/datasets`, submit → `/[lang]/search/datasets?q=...`
- The input can stay uncontrolled or controlled; on submit, read query and current path, then navigate to same path with `?q=...` updated.

### 6. Badge counts

- Because we always run both LLM search and `searchAllEntities` (see §3), we have full result counts per type. Use these to drive the **toggle group option badges** (e.g. count for datasets, apis, concepts, etc.) so users see how many results each tab has before switching.

### 7. Summary of files to touch (when implementing)

- **Routing:** Add optional segment under `[lang]/search` (e.g. `[[...set]]/page.tsx` or move/duplicate page into `[set]`).
- **Search page (server):** Read `set` and `q`; compute currentSet; always fetch both LLM search and searchAllEntities; pass currentSet and data to `SearchPage`.
- **SearchPage component:** Accept `currentSet`; render only the result section that matches currentSet (KI vs filtered list).
- **SearchTabs (or search-page-specific wrapper):** Controlled by URL; on change, build path + query and call `router.replace(...)`.
- **SearchForm:** Sync with URL (currentSet and q from URL); on submit, navigate to current path with new `q`.
- **Canonical / metadata:** Consider canonical URL for the current set (e.g. `/[lang]/search/datasets?q=...`) in `generateMetadata`.

---

## Recommendation (short)

- Use **path-based sets:** **`/[lang]/search`** with no segment = KI (LLM); **`/[lang]/search/[set]`** with segments: `datasets`, `apis`, `concepts`, `information-models`, `services-and-events`, `docs` — with **`?q=...`**. KI has no segment in the URL.
- One **optional dynamic segment** under `search` (e.g. `[[...set]]`) and a single page that reads `set` and `q`, fetches accordingly, and renders one result view.
- Make **SearchTabs** drive and reflect the URL: on tab click, **navigate** (like the language switcher) to the corresponding path, preserving `q`.
- Map set segments to **searchType**: `datasets`→DATASET, `apis`→DATA_SERVICE, `concepts`→CONCEPT, `information-models`→INFORMATION_MODEL, `services-and-events`→PUBLIC_SERVICE+EVENT; show only that subset of regular search results.

No code changes are made in this repo yet; this document is the plan only.
