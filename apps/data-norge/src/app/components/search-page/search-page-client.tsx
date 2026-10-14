"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useReducer } from "react";
import { parseLocaleFromPathname, type LocaleCodes } from "@fdk-frontend/localization";
import { type AggregationKeyCount, isTransportportalMenuSet } from "@fdk-frontend/ui";
import {
  deriveSearchSetIdFromPathname,
  isCatalogSet,
  parseSearchPageParam,
  parseSearchPageSizeParam,
  readLlmSearchCache,
  type SearchSetId,
} from "@fdk-frontend/utils";
import SearchPage, { type SearchPageProps } from "./index";
import { loadDocsSearchState, loadEntitySearchState, loadLlmSearchState } from "./search-fetch";
import { initialSearchPageState, searchPageReducer, type SearchPageData } from "./search-page-state";
import { Profile } from "@fdk-frontend/types";

const CATALOG_AGGREGATION_FIELDS = [
  "orgAggregationsBySet",
  "accessAggregationsBySet",
  "provenanceAggregationsBySet",
  "dcatProfileAggregationsBySet",
  "spatialAggregationsBySet",
  "formatAggregationsBySet",
  "losThemeAggregationsBySet",
  "dataThemeAggregationsBySet",
] as const satisfies readonly (keyof SearchPageData)[];

type CatalogAggregationField = (typeof CATALOG_AGGREGATION_FIELDS)[number];

type CatalogAggregationProps = {
  orgAggregation: AggregationKeyCount[] | undefined;
  accessAggregation: AggregationKeyCount[] | undefined;
  provenanceAggregation: AggregationKeyCount[] | undefined;
  dcatProfileAggregation: AggregationKeyCount[] | undefined;
  spatialAggregation: AggregationKeyCount[] | undefined;
  formatAggregation: AggregationKeyCount[] | undefined;
  losThemeAggregation: AggregationKeyCount[] | undefined;
  dataThemeAggregation: AggregationKeyCount[] | undefined;
};

const aggregationsForActiveSet = (pageData: SearchPageData, setId: SearchSetId): CatalogAggregationProps => {
  const catalogSet = isCatalogSet(setId);
  const forSet = (field: CatalogAggregationField) => (catalogSet ? pageData[field]?.[setId] : undefined);

  return {
    orgAggregation: forSet("orgAggregationsBySet"),
    accessAggregation: forSet("accessAggregationsBySet"),
    provenanceAggregation: forSet("provenanceAggregationsBySet"),
    dcatProfileAggregation: forSet("dcatProfileAggregationsBySet"),
    spatialAggregation: forSet("spatialAggregationsBySet"),
    formatAggregation: forSet("formatAggregationsBySet"),
    losThemeAggregation: forSet("losThemeAggregationsBySet"),
    dataThemeAggregation: forSet("dataThemeAggregationsBySet"),
  };
};

export type SearchPageClientProps = Pick<SearchPageProps, "lang"> & { profile?: Profile };

const SearchPageClient = function ({ lang, profile = "data.norge" }: SearchPageClientProps) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const langFromUrl = parseLocaleFromPathname(pathname);
  const activeSet = deriveSearchSetIdFromPathname(pathname);
  const query = searchParams.get("q") ?? "";
  const orgPathParam = searchParams.get("orgPath");
  const accessParam = searchParams.get("access");
  const provenanceParam = searchParams.get("provenance");
  const dcatProfileParam = searchParams.get("dcatProfile");
  const spatialParam = searchParams.get("spatial");
  const formatParam = searchParams.get("format");
  const losThemeParam = searchParams.get("losTheme");
  const dataThemeParam = searchParams.get("dataTheme");
  const sortParam = searchParams.get("sort");
  const pageParam = parseSearchPageParam(searchParams.get("page"));
  const sizeParam = parseSearchPageSizeParam(searchParams.get("size"));
  const locale: LocaleCodes = lang ?? langFromUrl;
  const hideAiSet = profile === "transportportal";

  const [{ entityLoading, docsLoading, llmLoading, data }, dispatch] = useReducer(
    searchPageReducer,
    initialSearchPageState,
  );

  // The transportportal menu is all-catalogs, datasets, and docs. Any other set falls back to all-catalogs.
  useEffect(() => {
    if (!hideAiSet || isTransportportalMenuSet(activeSet)) return;
    const queryString = searchParams.toString();
    router.replace(`/${locale}/search${queryString ? `?${queryString}` : ""}`);
  }, [hideAiSet, activeSet, locale, router, searchParams]);

  const aggregations = aggregationsForActiveSet(data, activeSet);

  useEffect(() => {
    let cancelled = false;
    dispatch({ type: "entity_fetch_started" });

    loadEntitySearchState({
      query,
      orgPathParam,
      accessParam,
      provenanceParam,
      dcatProfileParam,
      spatialParam,
      formatParam,
      losThemeParam,
      dataThemeParam,
      sortParam,
      activeSet,
      page: pageParam,
      size: sizeParam,
    })
      .then((result) => {
        if (cancelled) return;
        dispatch({ type: "entity_fetch_succeeded", payload: result });
      })
      .catch(() => {
        if (!cancelled) dispatch({ type: "entity_fetch_failed" });
      });

    return () => {
      cancelled = true;
    };
  }, [
    query,
    orgPathParam,
    accessParam,
    provenanceParam,
    dcatProfileParam,
    spatialParam,
    formatParam,
    losThemeParam,
    dataThemeParam,
    sortParam,
    activeSet,
    pageParam,
    sizeParam,
  ]);

  useEffect(() => {
    let cancelled = false;
    const cached = readLlmSearchCache(query);
    if (cached) {
      dispatch({ type: "llm_fetch_succeeded", payload: cached });
      return;
    }

    dispatch({ type: "llm_fetch_started" });

    loadLlmSearchState(query)
      .then((result) => {
        if (cancelled) return;
        dispatch({ type: "llm_fetch_succeeded", payload: result });
      })
      .catch(() => {
        if (!cancelled) dispatch({ type: "llm_fetch_failed" });
      });

    return () => {
      cancelled = true;
    };
  }, [query]);

  useEffect(() => {
    let cancelled = false;
    dispatch({ type: "docs_fetch_started" });

    loadDocsSearchState(query, locale)
      .then((result) => {
        if (cancelled) return;
        dispatch({ type: "docs_fetch_succeeded", payload: result });
      })
      .catch(() => {
        if (!cancelled) dispatch({ type: "docs_fetch_failed" });
      });

    return () => {
      cancelled = true;
    };
  }, [query, locale]);

  const displayLang = lang ?? langFromUrl;

  return (
    <SearchPage
      lang={displayLang}
      query={query}
      activeSet={activeSet}
      llmResults={llmLoading ? undefined : data.llmResults}
      catalogResults={entityLoading ? undefined : data.catalogResults}
      docsResults={docsLoading ? undefined : data.docsResults}
      setBadgeCounts={data.setBadgeCounts}
      {...aggregations}
      entityLoading={entityLoading}
      docsLoading={docsLoading}
      llmLoading={llmLoading}
      hideAiSet={hideAiSet}
    />
  );
};

export default SearchPageClient;
