import { type LocaleCodes } from '@fdk-frontend/localization';
import { Breadcrumbs, EntityTeaser, SearchForm } from '@fdk-frontend/ui';
import { type SearchObject } from '@fellesdatakatalog/types';
import { Alert, Heading } from '@digdir/designsystemet-react';
import { type LlmSearchResponse } from '@fdk-frontend/data-access';
import {
  getBadgeCounts,
  getSearchTypesForSet,
  type SearchSetSegment,
} from '../../[lang]/search/search-set-config';

import styles from './search-page.module.scss';

/** Client-safe shape for entity search results (no server-only import). */
export type SearchResultsProp = { hits?: SearchObject[]; [key: string]: unknown };

export type SearchPageProps = {
  lang: LocaleCodes;
  query?: string;
  currentSet?: SearchSetSegment;
  llmResults?: LlmSearchResponse;
  searchResults?: SearchResultsProp;
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
  service: 'PUBLIC_SERVICE',
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

const SearchPage = ({
  lang,
  query,
  currentSet,
  llmResults,
  searchResults,
  loading = false,
}: SearchPageProps) => {
  const breadcrumbList = [
    {
      text: query ? `Søk etter "${query}"` : 'Søk',
    },
  ];

  const llmHitsCount = llmResults?.hits?.length ?? 0;
  const allSearchHits = searchResults?.hits ?? [];
  const badgeCounts = getBadgeCounts(allSearchHits, llmHitsCount);

  const showLlm = currentSet === undefined;
  const filteredHits =
    currentSet && currentSet !== 'docs'
      ? filterHitsBySet(allSearchHits, currentSet)
      : [];
  const displayCount = showLlm ? llmHitsCount : filteredHits.length;
  const totalResults = llmHitsCount + allSearchHits.length;

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
                  {query ? `Søker etter '${query}'...` : 'Laster...'}
                </Heading>
              )
            : (
                <Heading data-size="md">
                  {query ? `${totalResults} resultater for '${query}'` : `${totalResults} resultater`}
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
                    {`KI-resultater (${llmHitsCount})`}
                  </Heading>
                  {/* <Alert data-size='sm'>
                    <Paragraph>
                      Vårt KI-søk gjør det enkelt å finne datasett ved å bruke naturlig språk uten at du trenger å kjenne til spesifikke datasettnavn, fagtermer eller tekniske formater. Vær obs på at KI-søket kan være både ufullstendig og inneholde feil. <strong>Ikke skriv inn personopplysninger i søkefeltet.</strong>
                    </Paragraph>
                    <Paragraph>
                      <Link href="#">Les mer om KI-søket her</Link>
                    </Paragraph>
                  </Alert> */}
                  <ul className="fdk-box-list">
                    {llmResults.hits.map((item, i) => (
                      <li key={item.id ?? i}>
                        <EntityTeaser locale={lang} entity={llmHitToEntity(item)} />
                      </li>
                    ))}
                  </ul>
                </> :
                <Alert>Ingen resultater</Alert>
              }
            </div>
          )}

          {!loading && !showLlm && currentSet !== 'docs' && (
            <div className={styles.resultsSection}>
              {
                filteredHits.length > 0 ?
                <>
                  <Heading
                    data-size="sm"
                    className={styles.sectionHeading}
                  >
                    {currentSet} ({displayCount})
                  </Heading>
                  <ul className="fdk-box-list">
                    {filteredHits.map((hit: SearchObject, i: number) => (
                      <li key={hit.id ?? hit.uri ?? i}>
                        <EntityTeaser locale={lang} entity={hit} />
                      </li>
                    ))}
                  </ul>
                </> :
                <Alert>Ingen resultater</Alert>
              }
            </div>
          )}

          {!loading && currentSet === 'docs' && (
            <div className={styles.resultsSection}>
              <Heading data-size="sm" className={styles.sectionHeading}>
                Dokumentasjon
              </Heading>
              <p>Dokumentasjonssøk kommer snart.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
