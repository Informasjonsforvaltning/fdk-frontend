import { type LocaleCodes, getLocalization } from '@fdk-frontend/localization';
import { AiPromoSplash, Breadcrumbs, DocsTeaser, EntityTeaser, SearchForm } from '@fdk-frontend/ui';
import { type SearchObject } from '@fellesdatakatalog/types';
import { HStack } from '@fellesdatakatalog/ui';
import { Alert, Heading, Switch } from '@digdir/designsystemet-react';
import { type LlmSearchResponse } from '@fdk-frontend/data-access';
import {
  getBadgeCounts,
  getSearchTypesForSet,
  KI_TOGGLE_VALUE,
  type SearchSetSegment,
  SET_TO_SEARCH_TYPES
} from '../../[lang]/search/search-set-config';

import styles from './search-page.module.scss';

/** Client-safe shape for entity search results (no server-only import). */
export type SearchResultsProp = { hits?: SearchObject[]; [key: string]: unknown };

export type DocsSearchResult = {
  id: string;
  title: string;
  summary: string;
  url: string;
  locale: LocaleCodes;
  updated?: string;
};

export type SearchPageProps = {
  lang: LocaleCodes;
  query?: string;
  currentSet?: SearchSetSegment;
  llmResults?: LlmSearchResponse;
  searchResults?: SearchResultsProp;
  docsResults?: DocsSearchResult[];
  /** When set (e.g. from summary totalElements), used instead of getBadgeCounts(hits, llm). */
  badgeCountsOverride?: Record<string, number>;
  /** When true, results area shows simple "loading" text (client-side fetch in progress). */
  loading?: boolean;
};

const filterHitsBySet = function (
  hits: SearchObject[] | undefined,
  set: SearchSetSegment
): SearchObject[] {
  if (!hits?.length) return [];
  const types = getSearchTypesForSet(set);
  if (!types) return [];
  const setTypes = new Set(types);
  return hits.filter(
    (h) => h.searchType && setTypes.has(h.searchType)
  );
};

const LLM_TYPE_TO_SEARCH_TYPE: Record<string, string> = {
  dataset: 'DATASET',
  dataservice: 'DATA_SERVICE',
  concept: 'CONCEPT',
  informationmodel: 'INFORMATION_MODEL',
  service: 'SERVICE',
  event: 'EVENT',
};

/** Adapt LLM hit (lowercase type, flat publisher) to SearchObject for EntityTeaser. Trusted boundary: API shape → UI type. */
const llmHitToEntity = function (
  item: LlmSearchResponse['hits'][number]
): SearchObject {
  const searchType = LLM_TYPE_TO_SEARCH_TYPE[item.type] ?? item.type;
  return {
    id: item.id,
    uri: item.id,
    title: item.title,
    description: item.description,
    searchType: searchType as SearchObject['searchType'],
    organization: {
      id: item.publisherId,
      prefLabel: { nb: item.publisher },
    } as SearchObject['organization'],
  } as SearchObject;
};

export type MergeResult = {
  mergedHits: SearchObject[];
  llmOriginIds: Set<string>;
};

/** Merge search hits with LLM hits (converted to SearchObject), deduplicated by id/uri. Tracks which ids came from LLM for UI markers. */
const mergeSearchAndLlmHits = function mergeSearchAndLlmHits(
  searchResults: SearchResultsProp | undefined,
  llmResults: LlmSearchResponse | undefined
): MergeResult {
  const searchHits = searchResults?.hits ?? [];
  const seenIds = new Set<string>(
    searchHits.map((h) => h.id ?? h.uri).filter(Boolean) as string[]
  );
  const llmOriginIds = new Set<string>();
  const merged: SearchObject[] = [...searchHits];

  if (!llmResults?.hits?.length) {
    return { mergedHits: merged, llmOriginIds };
  }

  for (const item of llmResults.hits) {
    const id = item.id ?? '';
    if (!id || seenIds.has(id)) continue;
    seenIds.add(id);
    llmOriginIds.add(id);
    merged.unshift(llmHitToEntity(item));
  }

  return { mergedHits: merged, llmOriginIds };
};

const SearchPage = ({
  lang,
  query,
  currentSet,
  llmResults,
  searchResults,
  docsResults,
  badgeCountsOverride,
  loading = false,
}: SearchPageProps) => {
  const dictionary = getLocalization(lang).common;
  const breadcrumbList = [
    {
       // TODO: localization remains to be implemented
      text: query ? `Søk etter "${query}"` : 'Søk',
    },
  ];

  const llmHitsCount = llmResults?.hits?.length ?? 0;
  const { mergedHits, llmOriginIds } = mergeSearchAndLlmHits(searchResults, llmResults);
  const baseBadgeCounts =
    badgeCountsOverride ?? getBadgeCounts(mergedHits, llmHitsCount);
  const docsHitsCount = docsResults?.length ?? 0;
  const badgeCounts = {
    ...baseBadgeCounts,
    docs: docsHitsCount,
  };

  const showLlm = currentSet === undefined;
  const filteredHits =
    currentSet && currentSet !== 'docs'
      ? filterHitsBySet(mergedHits, currentSet)
      : [];
  const displayCount = showLlm ? llmHitsCount : filteredHits.length;
  const totalResults =
    !query && badgeCountsOverride
      ? Object.entries(badgeCountsOverride).reduce((sum, [key, value]) => {
          if (key === KI_TOGGLE_VALUE || key === 'docs') return sum;
          return sum + value;
        }, 0)
      : mergedHits.length;
  
  return (
    <div className={styles.searchPage}>
      <Breadcrumbs
          locale={lang}
          breadcrumbList={breadcrumbList}
      />
      <div className={styles.mainContent}>
        {
          loading
            ? (
                <Heading data-size="md">
                  {/* TODO: localization remains to be implemented */}
                  {query ? `Søker etter '${query}'...` : 'Laster...'}
                </Heading>
              )
            : (
                <Heading data-size="md">
                  {/* TODO: localization remains to be implemented */}
                  {query
                    ? `${totalResults} treff for '${query}'`
                    : `${totalResults} treff`}
                </Heading>
              )
        }
        <SearchForm
          lang={lang}
          currentSet={currentSet}
          defaultQuery={query ?? ''}
          badgeCounts={badgeCounts}
        />
        <div>
          {
            loading &&
            <div className={styles.resultsSection}>
              <Heading
                data-size="sm"
                className={styles.sectionHeading}
              >
                {/* TODO: localization remains to be implemented */}
                Laster...
              </Heading>
              <ul className="fdk-box-list">
                <li><EntityTeaser locale={lang} /></li>
                <li><EntityTeaser locale={lang} /></li>
                <li><EntityTeaser locale={lang} /></li>
              </ul>
            </div>
          }

          {!loading && showLlm && (
            <div className={styles.resultsSection}>
              {
                llmResults?.hits && llmResults.hits.length > 0 ?
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
                        <EntityTeaser locale={lang} entity={llmHitToEntity(item)} llm />
                      </li>
                    ))}
                  </ul>
                </> :
                <AiPromoSplash locale={lang} />
              }
            </div>
          )}

          {!loading && !showLlm && currentSet !== 'docs' && (
            <div className={styles.resultsSection}>
              {
                filteredHits.length > 0 ?
                <>
                  <HStack style={{justifyContent:'space-between'}}>
                    <Heading
                      data-size="sm"
                      className={styles.sectionHeading}
                    >
                      {dictionary.entities[(SET_TO_SEARCH_TYPES[currentSet as Exclude<SearchSetSegment, 'docs'>] ?? [])[0] ?? '']} ({displayCount} treff)
                    </Heading>
                    <Switch
                      className={styles.showAiResultsSwitch}
                      label='Vis KI-treff' // TODO: localization remains to be implemented
                      defaultChecked
                    />
                  </HStack>
                  <ul className="fdk-box-list">
                    {filteredHits.map((hit: SearchObject, i: number) => {
                      const hitId = hit.id ?? hit.uri ?? '';
                      const fromLlm = typeof hitId === 'string' && hitId.length > 0 && llmOriginIds.has(hitId);
                      return (
                        <li
                          key={hitId || i}
                          data-from-llm={fromLlm ? 'true' : undefined}
                        >
                          <EntityTeaser locale={lang} entity={hit} llm={fromLlm} />
                        </li>
                      );
                    })}
                  </ul>
                </> :
                <Alert>Ingen treff</Alert> // TODO: localization remains to be implemented
              }
            </div>
          )}

          {!loading && currentSet === 'docs' && (
            <div className={styles.resultsSection}>
              <Heading data-size="sm" className={styles.sectionHeading}>
                {/* TODO: localization remains to be implemented */}
                {`Dokumentasjon${query ? ` (${docsHitsCount} treff)` : ''}`}
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
