import { type LocaleCodes } from "@fdk-frontend/localization";

export type DocsSearchResult = {
  id: string;
  title: string;
  summary: string;
  url: string;
  locale: LocaleCodes;
  updated?: string;
};
