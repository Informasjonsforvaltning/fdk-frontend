import { type LocaleCodes, getLocalization } from "@fdk-frontend/localization";
import {
  AiPromoSplash,
  Breadcrumbs,
  DocsTeaser,
  EntityTeaser,
  SearchForm,
  type AggregationKeyCount,
} from "@fdk-frontend/ui";
import { type SearchObject } from "@fellesdatakatalog/types";
import { Alert, Heading } from "@digdir/designsystemet-react";
import { type LlmSearchResponse } from "@fdk-frontend/data-access";
import { getPrimarySearchTypeForTab, type SearchSetSegment } from "@fdk-frontend/ui/search-tabs/search-tab-config";
import { filterHitsForTab, mapLlmHitToSearchObject } from "../../[lang]/search/search-tab-helpers";

import styles from "./search-page.module.scss";
import { computeSearchPageDisplay, getDisplayCount, resolveSearchTabBadgeCounts } from "./search-page-display";
import SearchResultsSkeleton from "./search-results-skeleton";
import { type DocsSearchResult, type SearchResultsProp } from "./search-page-types";

export type SearchPageProps = {
  lang: LocaleCodes;
  query?: string;
  activeEntityTab?: SearchSetSegment;
  llmResults?: LlmSearchResponse;
  searchResults?: SearchResultsProp;
  docsResults?: DocsSearchResult[];
  tabBadgeCounts?: Record<string, number>;
  orgAggregation?: AggregationKeyCount[];
  accessAggregation?: AggregationKeyCount[];
  provenanceAggregation?: AggregationKeyCount[];
  spatialAggregation?: AggregationKeyCount[];
  formatAggregation?: AggregationKeyCount[];
  losThemeAggregation?: AggregationKeyCount[];
  dataThemeAggregation?: AggregationKeyCount[];
  entityLoading?: boolean;
  llmLoading?: boolean;
};

const SearchPage = ({
  lang,
  query,
  activeEntityTab,
  llmResults,
  searchResults,
  docsResults,
  tabBadgeCounts,
  orgAggregation,
  accessAggregation,
  provenanceAggregation,
  spatialAggregation,
  formatAggregation,
  losThemeAggregation,
  dataThemeAggregation,
  entityLoading = false,
  llmLoading = false,
}: SearchPageProps) => {
  const dictionary = getLocalization(lang).common;
  const breadcrumbList = [
    {
      // TODO: localization remains to be implemented
      text: query ? `Søk etter "${query}"` : "Søk",
    },
  ];

  const { llmHitsCount, docsHitsCount, badgeCounts, searchHits, totalResults } = computeSearchPageDisplay({
    activeEntityTab,
    llmResults,
    searchResults,
    docsResults,
    tabBadgeCounts,
  });
  const resolvedTabBadgeCounts = resolveSearchTabBadgeCounts({
    badgeCounts,
    tabBadgeCounts,
    entityLoading,
    llmLoading,
  });
  const filteredHits =
    activeEntityTab && activeEntityTab !== "docs" ? filterHitsForTab(searchHits, activeEntityTab) : [];
  const displayCount = getDisplayCount({
    activeEntityTab,
    llmHitsCount,
    filteredHits,
    tabBadgeCounts,
  });

  return (
    <div className={styles.searchPage}>
      <Breadcrumbs
        locale={lang}
        breadcrumbList={breadcrumbList}
      />
      <div className={styles.mainContent}>
        {entityLoading ? (
          <Heading data-size="md">
            {/* TODO: localization remains to be implemented */}
            {query ? `Søker etter '${query}'...` : "Laster..."}
          </Heading>
        ) : (
          <Heading data-size="md">
            {/* TODO: localization remains to be implemented */}
            {query ? `${totalResults} treff for '${query}'` : `${totalResults} treff`}
          </Heading>
        )}
        <SearchForm
          lang={lang}
          activeEntityTab={activeEntityTab}
          defaultQuery={query ?? ""}
          badgeCounts={resolvedTabBadgeCounts}
          orgAggregation={orgAggregation}
          accessAggregation={accessAggregation}
          provenanceAggregation={provenanceAggregation}
          spatialAggregation={spatialAggregation}
          formatAggregation={formatAggregation}
          losThemeAggregation={losThemeAggregation}
          dataThemeAggregation={dataThemeAggregation}
        />
        <div>
          {entityLoading && activeEntityTab !== undefined && activeEntityTab !== "docs" && (
            <div className={styles.resultsSection}>
              <SearchResultsSkeleton locale={lang} />
            </div>
          )}

          {!entityLoading && activeEntityTab === undefined && (
            <div className={styles.resultsSection}>
              {llmLoading ? (
                <SearchResultsSkeleton locale={lang} />
              ) : llmResults?.hits && llmResults.hits.length > 0 ? (
                <>
                  <Heading
                    data-size="sm"
                    className={styles.sectionHeading}
                  >
                    {/* TODO: localization remains to be implemented */}
                    {`KI-søk (${llmHitsCount} treff)`}
                  </Heading>
                  <ul className="fdk-box-list">
                    {llmResults.hits.map((item, i) => (
                      <li key={item.id ?? i}>
                        <EntityTeaser
                          locale={lang}
                          entity={mapLlmHitToSearchObject(item)}
                          llm
                        />
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <AiPromoSplash locale={lang} />
              )}
            </div>
          )}

          {!entityLoading && activeEntityTab !== undefined && activeEntityTab !== "docs" && (
            <div className={styles.resultsSection}>
              {filteredHits.length > 0 ? (
                <>
                  <Heading
                    data-size="sm"
                    className={styles.sectionHeading}
                  >
                    {dictionary.entities[getPrimarySearchTypeForTab(activeEntityTab) ?? ""]} ({displayCount} treff)
                  </Heading>
                  <ul className="fdk-box-list">
                    {filteredHits.map((hit: SearchObject, i: number) => {
                      const hitId = hit.id ?? hit.uri ?? "";
                      return (
                        <li key={hitId || i}>
                          <EntityTeaser
                            locale={lang}
                            entity={hit}
                          />
                        </li>
                      );
                    })}
                  </ul>
                </>
              ) : (
                <Alert>Ingen treff</Alert>
              )}
            </div>
          )}

          {!llmLoading && activeEntityTab === "docs" && (
            <div className={styles.resultsSection}>
              <Heading
                data-size="sm"
                className={styles.sectionHeading}
              >
                {/* TODO: localization remains to be implemented */}
                {`Dokumentasjon${query ? ` (${docsHitsCount} treff)` : ""}`}
              </Heading>
              {docsResults && docsResults.length > 0 ? (
                <ul className="fdk-box-list">
                  {docsResults.map((doc) => (
                    <li key={doc.id}>
                      <DocsTeaser
                        locale={lang}
                        title={doc.title}
                        desc={doc.summary}
                        href={doc.url}
                      />
                    </li>
                  ))}
                </ul>
              ) : query ? (
                <Alert>Ingen treff i dokumentasjon</Alert> // TODO: localization remains to be implemented
              ) : (
                <Alert>Ingen dokumentasjon funnet.</Alert> // TODO: localization remains to be implemented
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
