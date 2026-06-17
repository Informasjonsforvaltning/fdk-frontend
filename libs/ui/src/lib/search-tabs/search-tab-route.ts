import { SEARCH_TAB_PATH_SEGMENTS, type SearchTabsValue } from "./search-tab-config";

export const deriveSearchTabValueFromPathname = function (pathname: string): SearchTabsValue {
  const segment = pathname.split("/").filter(Boolean)[2];
  if (segment && (SEARCH_TAB_PATH_SEGMENTS as readonly string[]).includes(segment)) {
    return segment as SearchTabsValue;
  }
  return "ki";
};
