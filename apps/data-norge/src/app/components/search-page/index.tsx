import { type Dictionary } from '@fdk-frontend/dictionaries';
import { Breadcrumbs, SearchForm } from '@fdk-frontend/ui';
import { type LlmSearchResponse } from '@fdk-frontend/data-access';

import styles from './search-page.module.scss';

export type ItemObjectType = {
    id: string;
    title: string;
    description: string;
    type: string;
    publisher: string;
    publisherId: string;
};

export type SearchPageProps = {
    dictionaries: {
        common: Dictionary;
    };
    query?: string;
    results?: LlmSearchResponse<ItemObjectType>;
};

const SearchPage = ({ dictionaries, query, results }: SearchPageProps) => {
    const breadcrumbList = [
        {
            text: query ? `Søk etter "${query}"` : 'Søk',
        },
    ];

    return (
        <div className={styles.searchPage}>
            <Breadcrumbs
                dictionary={dictionaries.common}
                breadcrumbList={breadcrumbList}
            />
            <div className={styles.mainContent}>
                <SearchForm />
                <div>
                    {results && results.hits && (
                        <ul>
                            {results.hits.map((item, i) => (
                                <li key={item.id || i}>
                                    <h3>{item.title}</h3>
                                    <p>{item.description}</p>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchPage;
