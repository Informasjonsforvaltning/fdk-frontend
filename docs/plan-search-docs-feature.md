## Docs search feature – high-level plan

### 1. Goals and scope

- **Primary goal**: Add a dedicated documentation search that:
  - Works alongside existing **LLM search** and **search service** results.
  - Has its **own API route** and fetch flow (no coupling to existing search backends).
  - Surfaces results on the search page using the shared **`docs-teaser`** UI component.
- **Non-goals (for now)**:
  - No complex faceting/filtering for docs (basic keyword search only).
  - No cross-ranking with dataset/APIs search results (separate group on page).

---

### 2. Data model and types

- **New result type**
  - Introduce a `DocsSearchResult` type in shared `@fdk-frontend/types`:
    - **Fields** (initial suggestion):
      - `id`: stable identifier (slug or URL)
      - `title`: document title
      - `summary`: short snippet / description
      - `url`: absolute or relative link to the doc page
      - `source`: e.g. `"docs"` or specific collection name
      - `updated`: last updated date (optional)
  - Add **`docsResults: DocsSearchResult[]`** to the `SearchPage` / `SearchPageClient` props so it can be handled together with other result sets.

- **Client-side state**
  - In `search-page-client`, extend search state to include:
    - `docsResults`
    - Optional loading/error flags: `isLoadingDocs`, `docsError`.

---

### 3. API design

- **New Next.js route**
  - Create `apps/data-norge/src/app/api/docs-search/route.ts`:
    - **Method**: `GET` (or `POST` if the query body gets more complex).
    - **Input** (query params):
      - `q`: search query string (required)
      - `lang`: locale (`nb`, `nn`, `en`) to query correct docs index.
      - Optional paging: `page`, `size` (for later).
    - **Output**:
      - JSON: `{ results: DocsSearchResult[] }`.

- **Backend integration and indexing**
  - There is **no existing docs search/indexing service**; the implementation must:
    - **Scan MDX files** under `apps/data-norge/public` (and subdirectories) and build an in-memory index on first request or at build/startup. This includes docs, about texts, contact, technical pages, etc.
    - Use the **current locale** (`lang`) to only include MDX files for the active language (`*.nb.mdx`, `*.nn.mdx`, `*.en.mdx`).
    - Derive `title` from MDX frontmatter or a top-level heading.
    - Derive `summary` preferably from the **first occurrence of an `<Ingress>` component** in the MDX body; only fall back to frontmatter description if no `<Ingress>` is present.
    - Store the MDX route as `url` (based on the file path and locale).
  - Implement this logic in a small server-side helper under `@fdk-frontend/data-access/server`:
    - `searchDocs({ query, lang, page, size }): Promise<DocsSearchResult[]>` that:
      - Builds or reuses an in-memory index of docs metadata and searchable text.
      - Filters by `lang`, performs a simple full-text match on title + ingress + body.
      - Returns ranked and paginated `DocsSearchResult[]`.

- **Error handling & limits**
  - Enforce reasonable **max results** per request (e.g. 10–20) to keep UI fast.
  - Normalize error responses so the client can show a friendly message.

---

### 4. Search page integration

- **Server-side handler**
  - In `search-page-handler` / route page:
    - When building initial props, **also call docs search**:
      - Use the same `q` and `lang` as other searches.
      - Attach `docsResults` to the props passed to `SearchPage` / `SearchPageClient`.
    - Optionally, only trigger docs search when:
      - There is a non-empty `q`, and
      - The query length > N characters (e.g. 2–3) to avoid noise.

- **Client-side updates**
  - In `search-page-client`:
    - When the query changes via filters or new keyword search:
      - Fire a **parallel request** to `/api/docs-search?q=...&lang=...`.
      - Update `docsResults` and loading/error state without blocking other results.
    - Consider debouncing docs search in the same way as other searches.

---

### 5. UI: docs section and `docs-teaser` usage

- **Docs section placement**
  - Replace the placeholder text **"Dokumentasjonssøk kommer snart."** with:
    - A heading like **"Dokumentasjon"**.
    - A list of `docs-teaser` components, one per item in `docsResults`.
  - Place this section:
    - In the relevant search tab or result column, consistent with existing layout.

- **`docs-teaser` component**
  - Use the new `docs-teaser` from `libs/ui`:
    - Map `DocsSearchResult` fields to its props:
      - `title` → `title`
      - `summary` → `description` / `ingress`
      - `url` → link target
      - `updated` → optional meta line.
  - Handle **empty state**:
    - If `docsResults.length === 0` and query exists:
      - Show “Ingen treff i dokumentasjon” message instead of the old “kommer snart” text.

- **Loading and error states**
  - While docs search is running:
    - Show a small skeleton/loader or “Søker i dokumentasjon …”.
  - On error:
    - Show a non-blocking message (“Kunne ikke hente dokumentasjon akkurat nå.”) but keep other result groups visible.

---

### 6. Behavior alongside LLM search and search service

- **Parallel execution**
  - Ensure docs search runs **in parallel** with:
    - LLM search (if enabled).
    - Existing search service (datasets, APIs, etc.).
  - No strict dependency between them; failure in one should not break others.

- **UI consistency**
  - Keep the docs section visually distinct but aligned with:
    - Titles, spacing, and typography used by `entity-teaser` and other teasers.
  - Optionally add a **“see all docs”** link if there is or will be a dedicated docs search page.

---

### 7. Telemetry and feature flagging (optional but recommended)

- **Metrics**
  - Add logging/analytics events for:
    - Docs search performed (query length, lang).
    - Docs result clicked (doc id/url).
  - Helps evaluate usefulness and tune ranking later.

- **Feature flag**
  - Wrap docs search in a **feature flag**:
    - Toggleable per environment (dev/stage/prod).
    - Allows gradual rollout and quick disable if backend has issues.

---

### 8. Implementation steps checklist

1. **Types**
   - Add `DocsSearchResult` and `docsResults` prop/field definitions.
2. **API**
   - Implement `/api/docs-search` route and server-side `searchDocs` helper.
3. **Server integration**
   - Wire docs search into `search-page-handler` initial props.
4. **Client integration**
   - Extend `search-page-client` to fetch docs via the new API and manage `docsResults`.
5. **UI**
   - Replace “Dokumentasjonssøk kommer snart.” with docs results rendered through `docs-teaser`.
6. **Polish**
   - Add loading/error states, basic analytics, and optional feature flag.

