import { type Dictionary } from '@fdk-frontend/dictionaries';
import { Breadcrumbs, SearchForm } from '@fdk-frontend/ui';
import { type SearchObject } from '@fellesdatakatalog/types';
import { Heading, Tabs, TabsList, TabsTab, TabsPanel, Badge, ToggleGroup } from '@digdir/designsystemet-react';
import { SparklesFillIcon } from '@navikt/aksel-icons';
import { type LlmSearchResponse } from '@fdk-frontend/data-access';
import { type SearchApiResponse } from '@fdk-frontend/data-access/server';
import { EntityTeaser } from '@fdk-frontend/ui';
import { printLocaleValue } from '@fdk-frontend/utils';
import { SearchTabs } from '@fdk-frontend/ui';

import styles from './search-page.module.scss';

const searchTabItems: any[] = [
    {
        value: 'ki',
        label: 'KI',
        icon: <SparklesFillIcon />,
        badgeCount: 6,
    },
    {
        value: 'datasett',
        label: 'Datasett',
        badgeCount: 614,
    },
    {
        value: 'api',
        label: 'API',
        badgeCount: 19,
    },
    {
        value: 'begrep',
        label: 'Begrep',
        badgeCount: 588,
    },
    {
        value: 'infomodels',
        label: 'Informasjonsmodeller',
        badgeCount: 0,
    },
    {
        value: 'tjenester',
        label: 'Tjenester og hendelser',
        badgeCount: 31,
    },
    {
        value: 'docs',
        label: 'Dokumentasjon',
        badgeCount: 4,
    },
];

export type SearchPageProps = {
    dictionaries: {
        common: Dictionary;
    };
    query?: string;
    llmResults?: LlmSearchResponse;
    searchResults?: SearchApiResponse;
};

const SearchPage = ({ dictionaries, query, llmResults, searchResults }: SearchPageProps) => {
    const breadcrumbList = [
        {
            text: query ? `Søk etter "${query}"` : 'Søk',
        },
    ];

    const llmHitsCount = llmResults?.hits?.length ?? 0;
    const searchHitsCount = searchResults?.hits?.length ?? 0;
    const totalResults = llmHitsCount + searchHitsCount;

    // console.log('llmResults', llmResults);
    // console.log('searchResults', searchResults);

    return (
        <div className={styles.searchPage}>
            <Breadcrumbs
                dictionary={dictionaries.common}
                breadcrumbList={breadcrumbList}
            />
            <div className={styles.mainContent}>
                {/* <Heading data-size='md'>
                    Søk
                </Heading> */}
                {query && <Heading data-size='md'>{`${totalResults} resultater for '${query}'`}</Heading>}
                {/* <SearchTabs /> */}
                <SearchForm />
                {/* <Tabs defaultValue={searchTabItems[0]?.value || 'ki'}>
                    <TabsList>
                        {searchTabItems.map((tab) => (
                            <TabsTab
                                key={tab.value}
                                value={tab.value}
                            >
                                {tab.icon}
                                {tab.label}
                                <Badge
                                    count={tab.badgeCount}
                                    variant='tinted'
                                />
                            </TabsTab>
                        ))}
                    </TabsList>
                    {searchTabItems.map((tab) => (
                        <TabsPanel
                            key={tab.value}
                            value={tab.value}
                        ></TabsPanel>
                    ))}
                </Tabs> */}
                <div>
                    {/* LLM Results */}
                    {/*llmResults && llmResults.hits && llmResults.hits.length > 0 && (
                        <div className={styles.resultsSection}>
                            <Heading
                                data-size='sm'
                                className={styles.sectionHeading}
                            >
                                AI-søkeresultater ({llmHitsCount})
                            </Heading>
                            <ul>
                                {llmResults.hits.map((item, i) => (
                                    <li key={item.id || i}>
                                        <h3>{item.title}</h3>
                                        <p>{item.description}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )*/}

                    {/* Regular Search Results */}
                    {searchResults && searchResults.hits && searchResults.hits.length > 0 && (
                        <div className={styles.resultsSection}>
                            <Heading
                                data-size='sm'
                                className={styles.sectionHeading}
                            >
                                Søkeresultater ({searchHitsCount})
                            </Heading>
                            <ul className='fdk-box-list'>
                                {searchResults.hits.map((hit: SearchObject, i: number) => {
                                    console.log(hit);
                                    return <li><EntityTeaser key={hit.id} entity={hit} /></li>
                                    // return (
                                    //     <li key={hit.id || hit.uri || i}>
                                    //         <h3>{printLoc}</h3>
                                    //         <p>{description}</p>
                                    //         {item.searchType && <span className={styles.type}>{item.searchType}</span>}
                                    //     </li>
                                    // );
                                })}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchPage;
