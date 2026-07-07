import { type LocaleCodes, getLocalization, interpolate } from "@fdk-frontend/localization";
import {
  AiPromoSplash,
  Breadcrumbs,
  DocsTeaser,
  EntityTeaser,
  SearchForm,
  type AggregationKeyCount,
  type SearchPageInfo,
} from "@fdk-frontend/ui";
import { type SearchObject } from "@fellesdatakatalog/types";
import { Alert, Heading } from "@digdir/designsystemet-react";
import { type LlmSearchResponse } from "@fdk-frontend/data-access";
import { type SearchSetSegment } from "@fdk-frontend/ui/search-tabs/search-tab-config";
import { mapLlmHitToSearchObject } from "../../[lang]/search/search-tab-helpers";

import styles from "./search-page.module.scss";
import { computeSearchPageDisplay, resolveSearchTabBadgeCounts } from "./search-page-display";
import SearchPagination from "./search-pagination";
import SearchResultsSkeleton from "./search-results-skeleton";
import { type DocsSearchResult } from "./search-page-types";

export type SearchPageProps = {
  lang: LocaleCodes;
  query?: string;
  activeEntityTab?: SearchSetSegment;
  llmResults?: LlmSearchResponse;
  entityTabResults?: { hits: SearchObject[]; page: SearchPageInfo };
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
  entityTabResults,
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
  const loc = getLocalization(lang);
  const dictionary = loc.searchPage;

  const breadcrumbLabel = query
    ? interpolate(dictionary.breadcrumb.labelWithQuery, { query })
    : dictionary.breadcrumb.label;
  const breadcrumbList = [{ text: breadcrumbLabel }];

  const { llmHitsCount, docsHitsCount, badgeCounts } = computeSearchPageDisplay({
    activeEntityTab,
    llmResults,
    docsResults,
    tabBadgeCounts,
  });
  const resolvedTabBadgeCounts = resolveSearchTabBadgeCounts({
    badgeCounts,
    tabBadgeCounts,
    entityLoading,
    llmLoading,
  });
  const entityTabHits = entityTabResults?.hits ?? [];
  const entityTabPage = entityTabResults?.page;

  return (
    <div className={styles.searchPage}>
      <Breadcrumbs
        locale={lang}
        breadcrumbList={breadcrumbList}
      />
      <div className={styles.mainContent}>
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
              <SearchResultsSkeleton
                locale={lang}
                dictionary={dictionary}
              />
            </div>
          )}

          {!entityLoading && activeEntityTab === undefined && (
            <div className={styles.resultsSection}>
              {llmLoading ? (
                <SearchResultsSkeleton
                  locale={lang}
                  dictionary={dictionary}
                />
              ) : llmResults?.hits && llmResults.hits.length > 0 ? (
                <>
                  <Heading
                    data-size="sm"
                    className={styles.sectionHeading}
                  >
                    {interpolate(dictionary.aiSearch.headingWithCount, { count: llmHitsCount })}
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
              {entityTabHits.length > 0 ? (
                <>
                  <ul className="fdk-box-list">
                    {entityTabHits.map((hit: SearchObject, i: number) => {
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
                  {entityTabPage && (
                    <SearchPagination
                      page={entityTabPage}
                      dictionary={dictionary.pagination}
                    />
                  )}
                </>
              ) : (
                <Alert>{dictionary.entitySearch.noResults}</Alert>
              )}
            </div>
          )}

          {!llmLoading && activeEntityTab === "docs" && (
            <div className={styles.resultsSection}>
              <Heading
                data-size="sm"
                className={styles.sectionHeading}
              >
                {query
                  ? interpolate(dictionary.docs.headingWithCount, { count: docsHitsCount })
                  : dictionary.docs.heading}
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
                <Alert>{dictionary.docs.noResults}</Alert>
              ) : (
                <Alert>{dictionary.docs.noContent}</Alert>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
