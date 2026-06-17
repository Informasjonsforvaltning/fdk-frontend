import { type LocaleCodes, parseLocaleFromPathname } from "@fdk-frontend/localization";
import { deriveSearchTabValueFromPathname } from "@fdk-frontend/ui/search-tabs/search-tab-route";

import { type ActiveEntityTab } from "@fdk-frontend/ui/search-tabs/search-tab-config";

export const deriveLangFromPathname = function (pathname: string): LocaleCodes {
  return parseLocaleFromPathname(pathname);
};

export const deriveActiveEntityTabFromPathname = function (pathname: string): ActiveEntityTab {
  const tab = deriveSearchTabValueFromPathname(pathname);
  return tab === "ki" ? undefined : tab;
};
