# Assessment: Removing dictionary props from components

## Summary

**Conclusion: Yes — most or all dictionary-related props can be removed.** Components that need localized strings can import `getLocalization(locale)` (or `getSafeSection(locale, section)`) and load the required localization themselves, as long as they receive a `locale` prop (or get it from a future locale context). This is feasible for both server and client components and simplifies the component API and call sites.

---

## Current state

- **Pages/layouts** (e.g. `[lang]/page.tsx`, details page, docs page) call `getLocalization(params.lang)` or `getSafeSection(params.lang, 'common')` and pass the result down as:
  - `dictionary` (single section or full localization)
  - `commonDictionary` / `frontpageDictionary` / `docsDictionary`
  - `dictionaries: { common, detailsPage }`
- **Shared components** (in `libs/ui` and app components) declare props such as `dictionary: Localization` and use `dictionary.*` for labels and copy.
- Many components already receive **both** `locale` and `dictionary` (e.g. Header, Footer, MainMenu, DatasetHeader, AccessRequestButton). A smaller set receive only `dictionary` (e.g. OpenDataTag, UnavailableTag, Breadcrumbs, AlertSubmitStatus).

---

## Can components load localization themselves?

**Yes.** The localization API is synchronous and does not depend on server-only APIs:

- `getLocalization(localeCode: LocaleCodes): Localization` — returns the full localization object for the locale.
- `getSafeSection(localeCode, section: string)` — returns a clone of a section when multiple consumers might mutate it.

So:

- **Server components** can call `getLocalization(locale)` (or `getSafeSection`) during render.
- **Client components** can do the same; there is no async or server-only requirement.

Any component that has (or can receive) a `locale` value can therefore:

1. Call `getLocalization(locale)` once and use the section(s) it needs (e.g. `loc.common`, `loc.detailsPage`).
2. Where a “safe” clone is needed (e.g. passing to several children that might mutate), call `getSafeSection(locale, 'common')` inside the component instead of receiving a pre-cloned dictionary from the parent.

So **dictionary props can be removed** and replaced by “component has `locale` and loads its own localization.”

---

## Where it works

| Context | Feasible? | Notes |
|--------|-----------|--------|
| Layout components (Header, Footer, MainMenu) | Yes | Already have `locale`; can call `getLocalization(locale)` or `getSafeSection(locale, 'common')` and use the needed section. |
| Page-level app components (FrontpageBanner, ShareDataBanner, DatasetHeader, etc.) | Yes | Already receive `locale` from page/layout; can load their own section(s). |
| Leaf UI components (OpenDataTag, Breadcrumbs, AccessLevelTag, etc.) | Yes | Need to receive `locale` if they don’t already; then load the section they need (e.g. `getLocalization(locale).common`). |
| Client components (`'use client'`) | Yes | `getLocalization` is sync and safe to call in the client. |
| Server components | Yes | No change from current pattern; just move the `getLocalization` call into the component. |
| Components that need multiple sections (e.g. common + detailsPage) | Yes | One call: `const loc = getLocalization(locale)` then use `loc.common`, `loc.detailsPage`. |

---

## Trade-offs

### Benefits

- **Less prop drilling** — Parents no longer need to fetch and pass `dictionary` / `commonDictionary` / `dictionaries` through multiple layers.
- **Simpler parent components** — Pages/layouts stop composing and passing large localization objects; they only pass `locale`.
- **Clearer component contract** — Components that need strings declare “I need a locale” instead of “I need a dictionary,” which better matches how they’re used.
- **Simpler stories** — Stories can pass `locale={'nb'}` (or `en`/`nn`) and the component loads its own strings; no need to construct and pass a `dictionary` in each story.
- **Easier to add new consumers** — New components that need copy only need `locale` (or context) and one import.

### Considerations

- **Locale must be available** — Components that today only get `dictionary` must start receiving `locale` (or get it from a future React context). In the current app, `locale` is almost always in the tree (from `params.lang`); call sites would pass `locale` instead of (or in addition to) dictionary.
- **Multiple `getLocalization` calls** — Several components might each call `getLocalization(locale)` in the same tree. The implementation is a simple object lookup with no I/O; cost is negligible. If desired, a small wrapper or context could cache by locale for a given tree, but it’s not required for correctness or performance.
- **Testing** — Today tests sometimes pass a mock `dictionary`. After the change, tests would either pass a real `locale` and rely on real localization, or mock `getLocalization` / the localization module. Both are workable; the latter keeps tests isolated from locale content.
- **E2E / page objects** — Some page objects (e.g. in `libs/data-norge-e2e`) hold a `dictionary` for assertions. They can be updated to use `getLocalization(locale)` when they need expected copy, or to stop storing dictionary if they only interact with the DOM.

---

## Exceptions and edge cases

- **Components with no locale in the tree** — If a component is rendered in a context where `locale` is not passed (e.g. a shared modal used outside the app router), then either: (a) add a `locale` prop and require callers to pass it, or (b) introduce a React context (e.g. `LocaleProvider`) and have the component read `locale` from context. For the current app, passing `locale` from the page is enough.
- **getSafeSection usage** — Today, some parents call `getSafeSection(lang, 'common')` before passing to Header/MainMenu so that multiple children don’t mutate the same object. If those components load localization themselves, they can call `getSafeSection(locale, 'common')` internally when they need to pass the same section to multiple children. So the “safe” semantics can be preserved inside the component.

---

## Suggested migration path

1. **Ensure `locale` is always passed where needed**  
   For any component that currently only has `dictionary`, add a `locale` prop (or get locale from context if you introduce it). Update call sites so that `locale` is passed from the page/layout (which already has `params.lang`).

2. **Migrate in layers (bottom-up or top-down)**  
   - **Option A (bottom-up):** Start with leaf components (OpenDataTag, UnavailableTag, Breadcrumbs, etc.): add `locale`, call `getLocalization(locale)` and use the relevant section; remove `dictionary` from props and from parent call sites. Then do the same for components that use those leaves, and so on.  
   - **Option B (top-down):** Start with layout (Header, Footer, MainMenu): have them call `getLocalization(locale)` / `getSafeSection(locale, 'common')` and drop `dictionary` from their props and from the root layout. Then do page-level components, then leaves.  
   Either order is valid; bottom-up reduces the number of intermediate props in one go, top-down gives quick wins at the root.

3. **Replace `dictionaries` (multi-section) with `locale`**  
   Where a component currently receives `dictionaries: { common, detailsPage }`, change it to receive only `locale` and do:
   - `const loc = getLocalization(locale);`
   - Use `loc.common` and `loc.detailsPage` as needed.

4. **Stories and tests**  
   - Stories: pass `locale` only; remove `dictionary={...}`.  
   - Unit tests: pass `locale` and either use real localization or mock `getLocalization` / the localization module.

5. **E2E / page objects**  
   Update any page object that used `dictionary` for expectations to use `getLocalization(locale)` when it needs localized strings, or remove dictionary from the page object if it’s unused.

---

## Recommendation

Proceed with removing dictionary props and having components that need localized strings depend only on `locale` (or locale from context) and load their own localization via `getLocalization(locale)` or `getSafeSection(locale, section)`. This is feasible for the vast majority of components, keeps the API simple, and aligns with the existing sync localization API. The main prerequisite is that every such component has access to `locale`; in the current app structure that is already the case or can be achieved by passing `locale` from the route segment (e.g. `params.lang`).
