'use client';

import { useState } from 'react';
import { Button, Chip, Heading } from '@digdir/designsystemet-react';
import { HStack, VStack } from '@fellesdatakatalog/ui';
import { FilterIcon, SortDownIcon, ChevronDownIcon } from '@navikt/aksel-icons';

import SearchTabs, { type SearchTabsValue } from '../search-tabs';
import SearchInput from '../search-input';
import styles from './search-form.module.scss';

export type SearchFormProps = {
    defaultValue?: SearchTabsValue;
    searchLabel?: string;
    onSearch?: (query: string, type: SearchTabsValue) => void;
    className?: string;
};

const SearchForm = ({ defaultValue = 'ki', searchLabel = 'Søk', onSearch, className }: SearchFormProps) => {
    const [searchType, setSearchType] = useState<SearchTabsValue>(defaultValue);
    const [query, setQuery] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSearch?.(query, searchType);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className={className}
        >
            <VStack className={styles.searchForm}>
                <Heading data-size='md'>
                    1288 resultater for 'Hei på deg'
                </Heading>
                <VStack className={styles.searchControls}>
                    <SearchTabs
                        defaultValue={defaultValue}
                        onChange={setSearchType}
                    />
                    <HStack className={styles.searchToolbar}>
                        <HStack>
                            <Button data-size='sm' variant='tertiary'>
                                <FilterIcon />
                                Filter
                                {/* <ChevronDownIcon /> */}
                            </Button>
                            <Chip.Removable>Hello</Chip.Removable>
                        </HStack>
                        <Button data-size='sm' variant='tertiary'>
                            <SortDownIcon />
                            Relevans
                            {/* <ChevronDownIcon /> */}
                        </Button>
                    </HStack>
                </VStack>
                <div>
                    Search results here
                </div>
            </VStack>
        </form>
    );
};

export default SearchForm;
