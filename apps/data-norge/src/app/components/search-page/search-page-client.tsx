"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useReducer } from "react";
import { type LocaleCodes } from "@fdk-frontend/localization";
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
  const locale = (lang ?? langFromUrl) as LocaleCodes;

  const [{ entityLoading, llmLoading, data }, dispatch] = useReducer(searchPageReducer, initialSearchPageState);

  const orgAggregation =
    activeEntityTab && activeEntityTab !== "docs" ? data.orgAggregationsByTab?.[activeEntityTab] : undefined;

  useEffect(() => {
    let cancelled = false;
    dispatch({ type: "entity_fetch_started" });

    loadEntitySearchState({ query, orgPathParam })
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
  }, [query, orgPathParam]);

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
      searchResults={entityLoading ? undefined : data.searchResults}
      docsResults={llmLoading ? undefined : data.docsResults}
      tabBadgeCounts={data.tabBadgeCounts}
      orgAggregation={orgAggregation}
      entityLoading={entityLoading}
      llmLoading={llmLoading}
    />
  );
};

export default SearchPageClient;
