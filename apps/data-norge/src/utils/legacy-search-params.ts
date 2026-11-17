import { i18n } from "@fdk-frontend/localization";
import { SEARCH_SORT_OPTIONS, type SearchSetId } from "@fdk-frontend/utils";

const LEGACY_SEARCH_PARAMS = ["theme", "accessrights", "opendata", "sortfield"] as const;

const SEARCH_PATH_PATTERN = /^\/(nb|nn|en)\/search(\/[^/]+)?\/?$/;

/** fdk-portal search tabs, with or without a locale prefix, and the search set each one became. */
const LEGACY_SEARCH_PATHS: Record<string, SearchSetId> = {
  "search-all": "all-catalogs",
  datasets: "datasets",
  "data-services": "data-services",
  concepts: "concepts",
  "information-models": "information-models",
  "public-services-and-events": "services-and-events",
};

const LEGACY_SEARCH_PATH_PATTERN = new RegExp(
  `^(?:/(nb|nn|en))?/(${Object.keys(LEGACY_SEARCH_PATHS).join("|")})/?$`,
);

const searchPathname = (pathname: string): { pathname: string; changed: boolean } | null => {
  if (SEARCH_PATH_PATTERN.test(pathname)) return { pathname, changed: false };

  const match = LEGACY_SEARCH_PATH_PATTERN.exec(pathname);
  if (!match) return null;

  const [, lang = i18n.defaultLocale, legacyPath] = match;
  const setId = LEGACY_SEARCH_PATHS[legacyPath];
  const segment = setId === "all-catalogs" ? "" : `/${setId}`;
  return { pathname: `/${lang}/search${segment}`, changed: true };
};

const splitList = (value: string | null): string[] =>
  (value ?? "")
    .split(",")
    .map((part) => part.trim())
    .filter((part) => part.length > 0);

const mergeListParam = (params: URLSearchParams, key: string, additions: string[]): void => {
  const merged = Array.from(new Set([...splitList(params.get(key)), ...additions]));
  if (merged.length > 0) params.set(key, merged.join(","));
};

const findParam = (params: URLSearchParams, name: string): string | null => {
  for (const [key, value] of params) {
    if (key.toLowerCase() === name) return value;
  }
  return null;
};

/**
 * Returns the new search URL for an fdk-portal search URL: portal search paths move to
 * `/{lang}/search/{set}` and legacy params get their new names. Null when nothing needs to change.
 */
export const legacySearchRedirectUrl = (url: URL): URL | null => {
  const target = searchPathname(url.pathname);
  if (!target) return null;

  const hasLegacyParam = Array.from(url.searchParams.keys()).some((key) =>
    (LEGACY_SEARCH_PARAMS as readonly string[]).includes(key.toLowerCase()),
  );
  if (!target.changed && !hasLegacyParam) return null;

  const theme = findParam(url.searchParams, "theme");
  const accessRights = findParam(url.searchParams, "accessrights");
  const openData = findParam(url.searchParams, "opendata");
  const sortField = findParam(url.searchParams, "sortfield");

  const params = new URLSearchParams();
  for (const [key, value] of url.searchParams) {
    if (!(LEGACY_SEARCH_PARAMS as readonly string[]).includes(key.toLowerCase())) params.append(key, value);
  }

  mergeListParam(params, "dataTheme", splitList(theme));
  mergeListParam(params, "access", [
    ...(openData?.trim().toLowerCase() === "true" ? ["true"] : []),
    ...splitList(accessRights).map((key) => (key.toLowerCase() === "null" ? "null" : key.toUpperCase())),
  ]);
  if (!params.has("sort") && sortField?.trim().toUpperCase() === "FIRST_HARVESTED") {
    params.set("sort", SEARCH_SORT_OPTIONS.firstHarvestedDesc);
  }

  const destination = new URL(url.toString());
  destination.pathname = target.pathname;
  destination.search = params.toString();
  return destination;
};
