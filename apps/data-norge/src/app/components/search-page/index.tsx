import { type LocaleCodes, getLocalization, interpolate } from "@fdk-frontend/localization";
import {
  AiPromoSplash,
  Breadcrumbs,
  DocsTeaser,
  EntityTeaser,
  SearchForm,
  SearchHistory,
  SearchMenu,
  SearchResultListControls,
  SearchSuggestions,
  type AggregationKeyCount,
} from "@fdk-frontend/ui";
import { type SearchObject } from "@fellesdatakatalog/types";
import { Alert, Heading } from "@digdir/designsystemet-react";
import { isCatalogSet, type LlmSearchCacheBody, type SearchPageInfo, type SearchSetId } from "@fdk-frontend/utils";
import { mapLlmHitToSearchObject } from "../../[lang]/search/map-llm-hit";

import styles from "./search-page.module.scss";
import { computeSearchPageDisplay, resolveSearchSetBadgeCounts } from "./search-page-display";
import SearchPagination from "./search-pagination";
import SearchResultsSkeleton from "./search-results-skeleton";
import { type DocsSearchResult } from "./search-page-types";

export type SearchPageProps = {
  lang: LocaleCodes;
  query?: string;
  activeSet: SearchSetId;
  llmResults?: LlmSearchCacheBody;
  catalogResults?: { hits: SearchObject[]; page: SearchPageInfo };
  docsResults?: DocsSearchResult[];
  setBadgeCounts?: Record<string, number>;
  orgAggregation?: AggregationKeyCount[];
  accessAggregation?: AggregationKeyCount[];
  provenanceAggregation?: AggregationKeyCount[];
  dcatProfileAggregation?: AggregationKeyCount[];
  spatialAggregation?: AggregationKeyCount[];
  formatAggregation?: AggregationKeyCount[];
  losThemeAggregation?: AggregationKeyCount[];
  dataThemeAggregation?: AggregationKeyCount[];
  entityLoading?: boolean;
  docsLoading?: boolean;
  llmLoading?: boolean;
  /** Transportportal: menu is all-catalogs, datasets, and docs. The AI result block stays hidden. */
  hideAiSet?: boolean;
};

const SearchPage = ({
  lang,
  query,
  activeSet,
  llmResults,
  catalogResults,
  docsResults,
  setBadgeCounts,
  orgAggregation,
  accessAggregation,
  provenanceAggregation,
  dcatProfileAggregation,
  spatialAggregation,
  formatAggregation,
  losThemeAggregation,
  dataThemeAggregation,
  entityLoading = false,
  docsLoading = false,
  llmLoading = false,
  hideAiSet = false,
}: SearchPageProps) => {
  const loc = getLocalization(lang);
  const dictionary = loc.searchPage;

  const breadcrumbLabel = query
    ? interpolate(dictionary.breadcrumb.labelWithQuery, { query })
    : dictionary.breadcrumb.label;
  const breadcrumbList = [{ text: breadcrumbLabel }];

  const { llmHitsCount, docsHitsCount, badgeCounts } = computeSearchPageDisplay({
    llmResults,
    docsResults,
    setBadgeCounts,
  });
  const resolvedBadgeCounts = resolveSearchSetBadgeCounts({
    badgeCounts,
    setBadgeCounts,
    entityLoading,
    docsLoading,
    llmLoading,
  });
  const catalogHits = catalogResults?.hits ?? [];
  const catalogPage = catalogResults?.page;
  const catalogAndDocsReady = !entityLoading && !docsLoading;
  const showCatalog = isCatalogSet(activeSet);
  const sectionLabel = dictionary.searchSets[activeSet] ?? activeSet;
  // all-catalogs is the sum of the catalog sets. The combined search reports at most 10 000 hits.
  const allCatalogsHitCount = setBadgeCounts?.["all-catalogs"];
  const sectionHitCount =
    activeSet === "ai"
      ? llmHitsCount
      : activeSet === "docs"
        ? docsHitsCount
        : activeSet === "all-catalogs" && allCatalogsHitCount !== undefined
          ? allCatalogsHitCount
          : (catalogPage?.totalElements ?? setBadgeCounts?.[activeSet] ?? catalogHits.length);
  const sectionHeading = `${sectionLabel} ${interpolate(dictionary.entitySearch.hitsCountLabel, { count: sectionHitCount })}`;

  return (
    <div className={styles.searchPage}>
      <Breadcrumbs
        locale={lang}
        breadcrumbList={breadcrumbList}
      />
      <div className={styles.content}>
        <div className={styles.leftColumn}>
          <Heading
            level={1}
            data-size="sm"
            className={styles.pageHeading}
          >
            {query ? (
              <>
                {dictionary.heading.queryPrefix} <strong>&apos;{query}&apos;</strong>
              </>
            ) : (
              dictionary.heading.label
            )}
          </Heading>
          <SearchMenu
            locale={lang}
            badgeCounts={resolvedBadgeCounts}
            hideAiSet={hideAiSet}
          />
        </div>
        <div className={styles.mainColumn}>
          <div className={styles.resultsHeader}>
            <Heading
              level={2}
              data-size="sm"
            >
              {sectionHeading}
            </Heading>
            <SearchResultListControls
              lang={lang}
              activeSet={activeSet}
            />
          </div>
          <SearchForm
            lang={lang}
            activeSet={activeSet}
            defaultQuery={query ?? ""}
            orgAggregation={orgAggregation}
            accessAggregation={accessAggregation}
            provenanceAggregation={provenanceAggregation}
            dcatProfileAggregation={dcatProfileAggregation}
            spatialAggregation={spatialAggregation}
            formatAggregation={formatAggregation}
            losThemeAggregation={losThemeAggregation}
            dataThemeAggregation={dataThemeAggregation}
          />
          <div>
            {!catalogAndDocsReady && showCatalog && (
              <div className={styles.resultsSection}>
                <SearchResultsSkeleton locale={lang} />
              </div>
            )}

            {!entityLoading && activeSet === "ai" && !hideAiSet && (
              <div className={styles.resultsSection}>
                {llmLoading ? (
                  <SearchResultsSkeleton locale={lang} />
                ) : llmResults?.hits && llmResults.hits.length > 0 ? (
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
                ) : (
                  <AiPromoSplash locale={lang} />
                )}
              </div>
            )}

            {catalogAndDocsReady && showCatalog && (
              <div className={styles.resultsSection}>
                {catalogHits.length > 0 ? (
                  <>
                    <ul className="fdk-box-list">
                      {catalogHits.map((hit: SearchObject, i: number) => {
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
                    {catalogPage && (
                      <SearchPagination
                        page={catalogPage}
                        dictionary={dictionary.pagination}
                      />
                    )}
                  </>
                ) : (
                  <Alert>{dictionary.entitySearch.noResults}</Alert>
                )}
              </div>
            )}

            {!docsLoading && activeSet === "docs" && (
              <div className={styles.resultsSection}>
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
        <div className={styles.rightColumn}>
          <SearchHistory lang={lang} />
          <SearchSuggestions lang={lang} />
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
