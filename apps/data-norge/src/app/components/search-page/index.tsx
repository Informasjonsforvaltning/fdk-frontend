import { type Dictionary } from '@fdk-frontend/dictionaries';
import { Breadcrumbs, SearchForm } from '@fdk-frontend/ui';

import styles from './search-page.module.scss';

export type SearchPageProps = {
    dictionaries: {
        common: Dictionary;
    };
};

const SearchPage = ({ dictionaries }: SearchPageProps) => {
    const breadcrumbList = [
        {
            text: 'Søk etter "Hei på deg"',
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
            </div>
        </div>
    );
};

export default SearchPage;
