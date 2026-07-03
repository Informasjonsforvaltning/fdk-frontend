import { type DatasetReference, type Dataset } from "@fellesdatakatalog/types";
import type { LocaleCodes } from "@fdk-frontend/localization";

export type SearchSuggestionTitle = Partial<Record<LocaleCodes | "no", string>>;

export type SearchSuggestion = {
  id: string;
  title: SearchSuggestionTitle;
  uri: string;
  searchType: string;
};

export type SearchSuggestionsResponse = {
  suggestions: SearchSuggestion[];
};

export type LinkObjectType = {
  href?: string;
  className?: string;
  external?: boolean;
  text?: string;
  undecoratedText?: string;
};

export type CatalogTypes = "datasets" | "apis" | "terms" | "information-models" | "services-events" | "ai";

export type JSONValue = any;

export interface PopulatedDatasetReference {
  reference: DatasetReference;
  resource: Dataset;
}
