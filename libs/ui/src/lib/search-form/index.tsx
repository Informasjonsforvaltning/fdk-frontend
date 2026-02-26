'use client';

import { useState } from 'react';
import { Button, Chip, Heading, Popover, Input, Checkbox, Dropdown } from '@digdir/designsystemet-react';
import { HStack, VStack, CheckboxGroup } from '@fellesdatakatalog/ui';
import { Box } from '@fdk-frontend/ui';
import { FilterIcon, SortDownIcon, ChevronDownIcon, CheckmarkIcon } from '@navikt/aksel-icons';

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
                <VStack className={styles.searchControls}>
                    <SearchTabs
                        defaultValue={defaultValue}
                        onChange={setSearchType}
                    />
                    <HStack className={styles.searchToolbar}>
                        <HStack>
                            {/* <Button
                                data-size='sm'
                                variant='secondary'
                            >
                                <FilterIcon />
                                
                            </Button>*/}
                            <Dropdown.TriggerContext>
                                <Dropdown.Trigger
                                    data-size='sm'
                                    variant='secondary'
                                >
                                    Utgiver
                                    <ChevronDownIcon />
                                </Dropdown.Trigger>
                                <Dropdown placement='bottom' data-size='sm'>
                                        <VStack>
                                            <Input placeholder='Søk etter utgiver' />
                                            <Box>
                                                <CheckboxGroup
                                                    options={[
                                                        { label: 'Kommune', value: 0 },
                                                        { label: 'Stat', value: 0 },
                                                    ]}
                                                />
                                            </Box>
                                        </VStack>
                                </Dropdown>
                            </Dropdown.TriggerContext>
                            <Button
                                data-size='sm'
                                variant='secondary'
                            >
                                {/* <FilterIcon /> */}
                                Tema
                                <ChevronDownIcon />
                            </Button>
                            <Button
                                data-size='sm'
                                variant='secondary'
                            >
                                {/* <FilterIcon /> */}
                                EU-tema
                                <ChevronDownIcon />
                            </Button>
                        </HStack>
                        {/* <Button
                            data-size='sm'
                            variant='tertiary'
                        >
                            <SortDownIcon />
                            Relevans
                        </Button> */}
                        <Dropdown.TriggerContext>
                            <Dropdown.Trigger
                                data-size='sm'
                                variant='tertiary'
                            >
                                <SortDownIcon />
                                Relevans
                            </Dropdown.Trigger>
                            <Dropdown placement='bottom-end' data-size='sm'>
                                <Dropdown.List>
                                    <Dropdown.Item>
                                        <Dropdown.Button aria-pressed>
                                            <CheckmarkIcon />
                                            Relevans
                                        </Dropdown.Button>
                                    </Dropdown.Item>
                                    <Dropdown.Item>
                                        <Dropdown.Button>Sist publisert</Dropdown.Button>
                                    </Dropdown.Item>
                                </Dropdown.List>
                            </Dropdown>
                        </Dropdown.TriggerContext>
                    </HStack>
                    {/* <HStack>
                        <Chip.Removable>Utgiver: Digitaliseringsdirektoratet</Chip.Removable>
                        <Chip.Removable>Tema: Transport</Chip.Removable>
                    </HStack> */}
                </VStack>
            </VStack>
        </form>
    );
};

export default SearchForm;
