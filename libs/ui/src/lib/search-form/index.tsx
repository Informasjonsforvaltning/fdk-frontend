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
                                <Dropdown
                                    className={styles.filterDropdown}
                                    placement='bottom-start'
                                    data-size='sm'
                                >
                                    <VStack>
                                        <Input placeholder='Søk etter utgiver' />
                                        <Box className={styles.box}>
                                            <CheckboxGroup
                                                options={[
                                                    { label: 'Kommune', value: '0' },
                                                    { label: 'Stat', value: '1' },
                                                ]}
                                            />
                                        </Box>
                                    </VStack>
                                </Dropdown>
                            </Dropdown.TriggerContext>
                            <Dropdown.TriggerContext>
                                <Dropdown.Trigger
                                    data-size='sm'
                                    variant='secondary'
                                >
                                    Tema
                                    <ChevronDownIcon />
                                </Dropdown.Trigger>
                                <Dropdown
                                    className={styles.filterDropdown}
                                    placement='bottom-start'
                                    data-size='sm'
                                >
                                    <VStack>
                                        <Input placeholder='Søk etter tema' />
                                        <Box className={styles.box}>
                                            <CheckboxGroup
                                                options={[
                                                    { label: 'Næring (182)', value: 'naring' },
                                                    { label: 'Natur, klima og miljø (169)', value: 'natur-klima-miljo' },
                                                    { label: 'Helse og omsorg (125)', value: 'helse-omsorg' },
                                                    { label: 'Trafikk og transport (100)', value: 'trafikk-transport' },
                                                    { label: 'Bygg og eiendom (99)', value: 'bygg-eiendom' },
                                                    { label: 'Familie og barn (98)', value: 'familie-barn' },
                                                    { label: 'Skatt og avgift (32)', value: 'skatt-avgift' },
                                                    { label: 'Skole og utdanning (28)', value: 'skole-utdanning' },
                                                    { label: 'Arbeid (24)', value: 'arbeid' },
                                                    { label: 'Demokrati og innbyggerrettigheter (18)', value: 'demokrati-innbyggerrettigheter' },
                                                    { label: 'Kultur, idrett og fritid (13)', value: 'kultur-idrett-fritid' },
                                                    { label: 'Lov og rett (8)', value: 'lov-rett' },
                                                    { label: 'Sosiale tjenester (8)', value: 'sosiale-tjenester' },
                                                    { label: 'Samfunnssikkerhet og beredskap (6)', value: 'samfunnssikkerhet-beredskap' },
                                                ]}
                                            />
                                        </Box>
                                    </VStack>
                                </Dropdown>
                            </Dropdown.TriggerContext>
                            <Dropdown.TriggerContext>
                                <Dropdown.Trigger
                                    data-size='sm'
                                    variant='secondary'
                                >
                                    EU-tema
                                    <ChevronDownIcon />
                                </Dropdown.Trigger>
                                <Dropdown
                                    className={styles.filterDropdown}
                                    placement='bottom-start'
                                    data-size='sm'
                                >
                                    <VStack>
                                        <Input placeholder='Søk etter EU-tema' />
                                        <Box className={styles.box}>
                                            <CheckboxGroup
                                                options={[
                                                    { label: 'Regioner og byer (6695)', value: 'regioner-byer' },
                                                    { label: 'Miljø (763)', value: 'miljo' },
                                                    { label: 'Forvaltning og offentlig sektor (524)', value: 'forvaltning-offentlig-sektor' },
                                                    { label: 'Befolkning og samfunn (407)', value: 'befolkning-samfunn' },
                                                    { label: 'Jordbruk, fiskeri, skogbruk og mat (364)', value: 'jordbruk-fiskeri-skogbruk-mat' },
                                                    { label: 'Utdanning, kultur og sport (204)', value: 'utdanning-kultur-sport' },
                                                    { label: 'Transport (159)', value: 'transport' },
                                                    { label: 'Helse (143)', value: 'helse' },
                                                    { label: 'Vitenskap og teknologi (121)', value: 'vitenskap-teknologi' },
                                                    { label: 'Justis, rettssystem og allmenn sikkerhet (111)', value: 'justis-rettssystem-sikkerhet' },
                                                    { label: 'Økonomi og finans (102)', value: 'okonomi-finans' },
                                                    { label: 'Energi (71)', value: 'energi' },
                                                    { label: 'Internasjonale temaer (25)', value: 'internasjonale-temaer' },
                                                ]}
                                            />
                                        </Box>
                                    </VStack>
                                </Dropdown>
                            </Dropdown.TriggerContext>
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
                            <Dropdown
                                className={styles.orderbyDropdown}
                                placement='bottom-end'
                                data-size='sm'
                            >
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
