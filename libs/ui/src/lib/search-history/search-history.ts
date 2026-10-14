const SEARCH_HISTORY_STORAGE_KEY = "fdk-search-history";
const SEARCH_HISTORY_LIMIT = 5;

const sameQuery = (left: string, right: string): boolean =>
  left.toLocaleLowerCase("nb") === right.toLocaleLowerCase("nb");

const queryFromEntry = (entry: string): string => {
  const question = entry.indexOf("?");
  if (question === -1) return "";
  return new URLSearchParams(entry.slice(question + 1)).get("q")?.trim() ?? "";
};

/**
 * The part of a search URL after `/{lang}/search`.
 * `/nb/search/datasets?q=kart&page=2` becomes `/datasets?q=kart&page=2`.
 * A bare `/search` with no query string is not a history entry.
 */
export const searchHistorySuffix = (pathname: string, search: string): string | undefined => {
  const segments = pathname.split("/").filter(Boolean);
  const searchIndex = segments.lastIndexOf("search");
  if (searchIndex === -1) return undefined;

  const path = segments.slice(searchIndex + 1).join("/");
  const query = search.replace(/^\?/, "").trim();
  const suffix = `${path ? `/${path}` : ""}${query ? `?${query}` : ""}`;
  return suffix === "" ? undefined : suffix;
};

/** Newest first. An entry with no query is ignored. The same query replaces its older url. */
export const rememberSearchUrl = (history: readonly string[], suffix: string): readonly string[] => {
  const trimmed = suffix.trim();
  const query = queryFromEntry(trimmed);
  if (!query) return history;

  const existingIndex = history.findIndex((entry) => sameQuery(queryFromEntry(entry), query));
  if (existingIndex === 0 && history[0] === trimmed) return history;

  const withoutMatch = history.filter((entry) => !sameQuery(queryFromEntry(entry), query));
  return [trimmed, ...withoutMatch].slice(0, SEARCH_HISTORY_LIMIT);
};

const isQueryList = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every((entry) => typeof entry === "string");

export const readSearchHistory = (): string[] => {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(SEARCH_HISTORY_STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!isQueryList(parsed)) return [];
    return parsed
      .map((entry) => entry.trim())
      .filter((entry) => entry !== "")
      .slice(0, SEARCH_HISTORY_LIMIT);
  } catch {
    return [];
  }
};

export const writeSearchHistory = (history: readonly string[]): void => {
  if (typeof window === "undefined") return;

  try {
    if (history.length === 0) {
      window.localStorage.removeItem(SEARCH_HISTORY_STORAGE_KEY);
      return;
    }
    window.localStorage.setItem(SEARCH_HISTORY_STORAGE_KEY, JSON.stringify(history));
  } catch {
    // Storage can be disabled or full. The list then stays as it was rendered.
  }
};
