import { type LocaleCodes } from "@fdk-frontend/localization";
import { type SearchObject } from "@fellesdatakatalog/types";

export type SearchResultsProp = { hits?: SearchObject[]; [key: string]: unknown };

export type DocsSearchResult = {
  id: string;
  title: string;
  summary: string;
  url: string;
  locale: LocaleCodes;
  updated?: string;
};
