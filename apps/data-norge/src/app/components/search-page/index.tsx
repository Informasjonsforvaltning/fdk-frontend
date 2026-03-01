import { type LocaleCodes } from '@fdk-frontend/localization';
import { Breadcrumbs, SearchForm } from '@fdk-frontend/ui';
import { type SearchObject } from '@fellesdatakatalog/types';
import { Heading } from '@digdir/designsystemet-react';
import { type LlmSearchResponse } from '@fdk-frontend/data-access';
import { type SearchApiResponse } from '@fdk-frontend/data-access/server';
import { EntityTeaser } from '@fdk-frontend/ui';
import {
  getBadgeCounts,
  getSearchTypesForSet,
  type SearchSetSegment,
} from '../../[lang]/search/search-set-config';

import styles from './search-page.module.scss';

export type SearchPageProps = {
  lang: LocaleCodes;
  query?: string;
  currentSet?: SearchSetSegment;
  llmResults?: LlmSearchResponse;
  searchResults?: SearchApiResponse;
};

function filterHitsBySet(
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
}

const SearchPage = ({
  lang,
  query,
  currentSet,
  llmResults,
  searchResults,
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
        {query && (
          <Heading data-size="md">{`${totalResults} resultater for '${query}'`}</Heading>
        )}
        <SearchForm
          lang={lang}
          currentSet={currentSet}
          defaultQuery={query ?? ''}
          badgeCounts={badgeCounts}
        />
        <div>
          {showLlm && llmResults?.hits && llmResults.hits.length > 0 && (
            <div className={styles.resultsSection}>
              <Heading
                data-size="sm"
                className={styles.sectionHeading}
              >
                {`KI-resultater (${llmHitsCount})`}
              </Heading>
              <ul className="fdk-box-list">
                {llmResults.hits.map((item, i) => (
                  <li key={item.id ?? i}>
                    <EntityTeaser locale={lang} entity={{
                        ...item,
                        searchType: item.type,
                        organization: {
                            id: item.publisherId,
                            prefLabel: item.publisher
                        }
                    }} />
                  </li>
                ))}
              </ul>
            </div>
          )}

          {!showLlm && currentSet !== 'docs' && filteredHits.length > 0 && (
            <div className={styles.resultsSection}>
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
            </div>
          )}

          {currentSet === 'docs' && (
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
