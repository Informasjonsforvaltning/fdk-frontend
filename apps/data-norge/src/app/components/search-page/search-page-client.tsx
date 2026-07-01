"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useReducer } from "react";
import { type LocaleCodes } from "@fdk-frontend/localization";
import { parseSearchPageParam, parseSearchPageSizeParam } from "@fdk-frontend/ui/search-form";
import { deriveActiveEntityTabFromPathname, deriveLangFromPathname } from "../../[lang]/search/search-route";
import SearchPage, { type SearchPageProps } from "./index";
import { loadEntitySearchState, loadLlmDocsSearchState } from "./search-fetch";
import { initialSearchPageState, searchPageReducer } from "./search-page-state";

export type SearchPageClientProps = Pick<SearchPageProps, "lang">;

const SearchPageClient = function ({ lang }: SearchPageClientProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const langFromUrl = deriveLangFromPathname(pathname);
  const activeEntityTab = deriveActiveEntityTabFromPathname(pathname);
  const query = searchParams.get("q") ?? "";
  const orgPathParam = searchParams.get("orgPath");
  const accessParam = searchParams.get("access");
  const provenanceParam = searchParams.get("provenance");
  const spatialParam = searchParams.get("spatial");
  const formatParam = searchParams.get("format");
  const losThemeParam = searchParams.get("losTheme");
  const dataThemeParam = searchParams.get("dataTheme");
  const sortParam = searchParams.get("sort");
  const pageParam = parseSearchPageParam(searchParams.get("page"));
  const sizeParam = parseSearchPageSizeParam(searchParams.get("size"));
  const locale = (lang ?? langFromUrl) as LocaleCodes;

  const [{ entityLoading, llmLoading, data }, dispatch] = useReducer(searchPageReducer, initialSearchPageState);

  const orgAggregation =
    activeEntityTab && activeEntityTab !== "docs" ? data.orgAggregationsByTab?.[activeEntityTab] : undefined;
  const accessAggregation =
    activeEntityTab && activeEntityTab !== "docs" ? data.accessAggregationsByTab?.[activeEntityTab] : undefined;
  const provenanceAggregation =
    activeEntityTab && activeEntityTab !== "docs" ? data.provenanceAggregationsByTab?.[activeEntityTab] : undefined;
  const spatialAggregation =
    activeEntityTab && activeEntityTab !== "docs" ? data.spatialAggregationsByTab?.[activeEntityTab] : undefined;
  const formatAggregation =
    activeEntityTab && activeEntityTab !== "docs" ? data.formatAggregationsByTab?.[activeEntityTab] : undefined;
  const losThemeAggregation =
    activeEntityTab && activeEntityTab !== "docs" ? data.losThemeAggregationsByTab?.[activeEntityTab] : undefined;
  const dataThemeAggregation =
    activeEntityTab && activeEntityTab !== "docs" ? data.dataThemeAggregationsByTab?.[activeEntityTab] : undefined;

  useEffect(() => {
    let cancelled = false;
    dispatch({ type: "entity_fetch_started" });

    loadEntitySearchState({
      query,
      orgPathParam,
      accessParam,
      provenanceParam,
      spatialParam,
      formatParam,
      losThemeParam,
      dataThemeParam,
      sortParam,
      activeEntityTab,
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
    spatialParam,
    formatParam,
    losThemeParam,
    dataThemeParam,
    sortParam,
    activeEntityTab,
    pageParam,
    sizeParam,
  ]);

  useEffect(() => {
    let cancelled = false;
    dispatch({ type: "llm_docs_fetch_started" });

    loadLlmDocsSearchState(query, locale)
      .then((result) => {
        if (cancelled) return;
        dispatch({ type: "llm_docs_fetch_succeeded", payload: result });
      })
      .catch(() => {
        if (!cancelled) dispatch({ type: "llm_docs_fetch_failed" });
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
      activeEntityTab={activeEntityTab}
      llmResults={llmLoading ? undefined : data.llmResults}
      entityTabResults={entityLoading ? undefined : data.entityTabResults}
      docsResults={llmLoading ? undefined : data.docsResults}
      tabBadgeCounts={data.tabBadgeCounts}
      orgAggregation={orgAggregation}
      accessAggregation={accessAggregation}
      provenanceAggregation={provenanceAggregation}
      spatialAggregation={spatialAggregation}
      formatAggregation={formatAggregation}
      losThemeAggregation={losThemeAggregation}
      dataThemeAggregation={dataThemeAggregation}
      entityLoading={entityLoading}
      llmLoading={llmLoading}
    />
  );
};

export default SearchPageClient;
