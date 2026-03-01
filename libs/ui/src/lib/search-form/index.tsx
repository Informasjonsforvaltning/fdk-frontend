'use client';

import { useState, useCallback, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Button, Chip, Heading, Popover, Input, Checkbox, Dropdown, ToggleGroup, Tabs, Tag } from '@digdir/designsystemet-react';
import { HStack, VStack, CheckboxGroup } from '@fellesdatakatalog/ui';
import { Box } from '@fdk-frontend/ui';
import { FilterIcon, SortDownIcon, ChevronDownIcon, CheckmarkIcon } from '@navikt/aksel-icons';

import SearchTabs, { type SearchTabsValue } from '../search-tabs';
import SearchInput from '../search-input';
import styles from './search-form.module.scss';

const temaOptions = [
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
];

const euTemaOptions = [
    { label: '[EU] Regioner og byer (6695)', value: 'regioner-byer' },
    { label: '[EU] Miljø (763)', value: 'miljo' },
    { label: '[EU] Forvaltning og offentlig sektor (524)', value: 'forvaltning-offentlig-sektor' },
    { label: '[EU] Befolkning og samfunn (407)', value: 'befolkning-samfunn' },
    { label: '[EU] Jordbruk, fiskeri, skogbruk og mat (364)', value: 'jordbruk-fiskeri-skogbruk-mat' },
    { label: '[EU] Utdanning, kultur og sport (204)', value: 'utdanning-kultur-sport' },
    { label: '[EU] Transport (159)', value: 'transport' },
    { label: '[EU] Helse (143)', value: 'helse' },
    { label: '[EU] Vitenskap og teknologi (121)', value: 'vitenskap-teknologi' },
    { label: '[EU] Justis, rettssystem og allmenn sikkerhet (111)', value: 'justis-rettssystem-sikkerhet' },
    { label: '[EU] Økonomi og finans (102)', value: 'okonomi-finans' },
    { label: '[EU] Energi (71)', value: 'energi' },
    { label: '[EU] Internasjonale temaer (25)', value: 'internasjonale-temaer' },
];

const mediaFormats = [
    { label: 'octet-stream (6883)', value: 'octet-stream' },
    { label: 'tiff (4275)', value: 'tiff' },
    { label: 'png (4178)', value: 'png' },
    { label: 'vnd.laszip (1903)', value: 'vnd-laszip' },
    { label: 'vnd.sosi (638)', value: 'vnd-sosi' },
    { label: 'gml+xml (537)', value: 'gml-xml' },
    { label: 'csv (311)', value: 'csv' },
    { label: 'sql (305)', value: 'sql' },
    { label: 'json (256)', value: 'json' },
    { label: 'zip (253)', value: 'zip' },
    { label: 'vnd.shp (217)', value: 'vnd-shp' },
    { label: 'geo+json (191)', value: 'geo-json' },
    { label: 'vnd.geo+json (80)', value: 'vnd-geo-json' },
    { label: 'vnd.google-earth.kml+xml (64)', value: 'vnd-google-earth-kml-xml' },
    { label: 'html (63)', value: 'html' },
    { label: 'xml (62)', value: 'xml' },
    { label: 'vnd.openxmlformats-officedocument.spreadsheetml.sheet (54)', value: 'vnd-openxmlformats-officedocument-spreadsheetml-sheet' },
    { label: 'pdf (34)', value: 'pdf' },
    { label: 'geopackage+sqlite3 (30)', value: 'geopackage-sqlite3' },
    { label: 'turtle (24)', value: 'turtle' },
    { label: 'xml (15)', value: 'xml-15' },
    { label: 'javascript (14)', value: 'javascript' },
    { label: 'rdf+xml (5)', value: 'rdf-xml' },
    { label: 'plain (4)', value: 'plain' },
    { label: 'ld+json (3)', value: 'ld-json' },
    { label: 'vnd.oasis.opendocument.spreadsheet (2)', value: 'vnd-oasis-opendocument-spreadsheet' },
    { label: 'n-triples (1)', value: 'n-triples' },
    { label: 'JPEG (1)', value: 'jpeg' },
];

const filetype = [
    { label: 'OCTET (6291)', value: 'octet' },
    { label: 'GEOTIFF (6130)', value: 'geotiff' },
    { label: 'TIFF (4273)', value: 'tiff' },
    { label: 'JPEG (4183)', value: 'jpeg' },
    { label: 'PNG (4178)', value: 'png' },
    { label: 'LAZ (1903)', value: 'laz' },
    { label: 'TXT (638)', value: 'txt' },
    { label: 'GDB (573)', value: 'gdb' },
    { label: 'GML (536)', value: 'gml' },
    { label: 'CSV (441)', value: 'csv' },
    { label: 'XML (413)', value: 'xml' },
    { label: 'SQL (305)', value: 'sql' },
    { label: 'ZIP (246)', value: 'zip' },
    { label: 'SHP (217)', value: 'shp' },
    { label: 'GEOJSON (191)', value: 'geojson' },
    { label: 'JSON (87)', value: 'json' },
    { label: 'KML (62)', value: 'kml' },
    { label: 'GPKG (30)', value: 'gpkg' },
    { label: 'PPTX (26)', value: 'pptx' },
    { label: 'NETCDF (22)', value: 'netcdf' },
    { label: 'PDF (14)', value: 'pdf' },
    { label: 'HTML (5)', value: 'html' },
    { label: 'KMZ (2)', value: 'kmz' },
    { label: 'DTD_XML (1)', value: 'dtd-xml' },
    { label: 'JSON_LD (1)', value: 'json-ld' },
    { label: 'RDF (1)', value: 'rdf' },
    { label: 'RDF_TURTLE (1)', value: 'rdf-turtle' },
    { label: 'XLSX (1)', value: 'xlsx' },
    { label: 'YAML (1)', value: 'yaml' },
];

const geography = [
    { label: 'Norge (266)', value: 'norge' },
    { label: 'Stavanger (100)', value: 'stavanger' },
    { label: 'Oslo (14)', value: 'oslo' },
    { label: 'Aure (8)', value: 'aure' },
    { label: 'Bergen (8)', value: 'bergen' },
    { label: 'Gjesdal (6)', value: 'gjesdal' },
    { label: 'Sogndal (4)', value: 'sogndal' },
    { label: 'Bjørnafjorden (3)', value: 'bjornafjorden' },
    { label: 'Steinkjer (3)', value: 'steinkjer' },
    { label: 'Aurland (2)', value: 'aurland' },
    { label: 'Molde (2)', value: 'molde' },
    { label: 'Rogaland (2)', value: 'rogaland' },
    { label: 'Vestland (2)', value: 'vestland' },
    { label: 'Ålesund (2)', value: 'alesund' },
    { label: 'Harstad (1)', value: 'harstad' },
    { label: 'Indre Østfold (1)', value: 'indre-ostfold' },
    { label: 'Lillehammer (1)', value: 'lillehammer' },
    { label: 'Lørenskog (1)', value: 'lorenskog' },
    { label: 'Randaberg (1)', value: 'randaberg' },
    { label: 'Sauda (1)', value: 'sauda' },
    { label: 'Sunnfjord (1)', value: 'sunnfjord' },
    { label: 'Sør-Varanger (1)', value: 'sor-varanger' },
    { label: 'Tromsø (1)', value: 'tromso' },
    { label: 'Trondheim (1)', value: 'trondheim' },
    { label: 'Viken (1)', value: 'viken' },
];

export type SearchFormProps = {
    /** When provided with lang, form is URL-driven: tabs navigate, submit navigates to current path with q. */
    lang?: string;
    /** Current set from URL (undefined = KI, no segment). */
    currentSet?: string;
    /** Initial query from URL (for display and for building URLs). */
    defaultQuery?: string;
    /** Badge counts per tab value (from search results). */
    badgeCounts?: Record<string, number>;
    defaultValue?: SearchTabsValue;
    searchLabel?: string;
    onSearch?: (query: string, type: SearchTabsValue) => void;
    className?: string;
};

const SearchForm = ({
    lang,
    currentSet,
    defaultQuery = '',
    badgeCounts,
    defaultValue = 'ki',
    searchLabel = 'Søk',
    onSearch,
    className,
}: SearchFormProps) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [searchType, setSearchType] = useState<SearchTabsValue>(defaultValue);
    const [query, setQuery] = useState(defaultQuery);

    const isUrlDriven = lang != null;

    const buildSearchUrl = useCallback(
        (setValue: SearchTabsValue, q: string) => {
            const locale = lang ?? pathname.split('/')[1] ?? 'nb';
            const base = `/${locale}/search`;
            const path = setValue === 'ki' ? base : `${base}/${setValue}`;
            const params = new URLSearchParams();
            if (q.trim()) params.set('q', q.trim());
            const queryString = params.toString();
            return queryString ? `${path}?${queryString}` : path;
        },
        [lang, pathname]
    );

    const handleTabChange = useCallback(
        (value: SearchTabsValue) => {
            if (isUrlDriven) {
                const q = searchParams.get('q') ?? defaultQuery ?? '';
                const url = buildSearchUrl(value, q);
                router.replace(url);
            } else {
                setSearchType(value);
            }
        },
        [isUrlDriven, searchParams, defaultQuery, buildSearchUrl, router]
    );

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isUrlDriven) {
            const q = query.trim() || (searchParams.get('q') ?? defaultQuery ?? '');
            const setValue = (currentSet ?? 'ki') as SearchTabsValue;
            const url = buildSearchUrl(setValue, q);
            router.replace(url);
        } else {
            onSearch?.(query, searchType);
        }
    };

    const tabValue = (isUrlDriven ? (currentSet ?? 'ki') : searchType) as SearchTabsValue;

    useEffect(() => {
        if (isUrlDriven && defaultQuery !== undefined) {
            setQuery(defaultQuery);
        }
    }, [isUrlDriven, defaultQuery]);

    return (
        <form
            onSubmit={handleSubmit}
            className={className}
        >
            <VStack className={styles.searchForm}>
                <VStack className={styles.searchControls}>
                    <SearchTabs
                        value={tabValue}
                        defaultValue={defaultValue}
                        onChange={handleTabChange}
                        badgeCounts={badgeCounts}
                    />
                    <HStack className={styles.searchToolbar}>
                        <HStack className={styles.filterToolbar}>
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
                                                options={[...temaOptions, ...euTemaOptions]}
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
                                    Tilgangsnivå
                                    <ChevronDownIcon />
                                </Dropdown.Trigger>
                                <Dropdown
                                    className={styles.filterDropdown}
                                    placement='bottom-start'
                                    data-size='sm'
                                >
                                    <Box className={styles.box}>
                                        <CheckboxGroup
                                            options={[
                                                { label: 'Allmenn tilgang', value: 'allmenn-tilgang' },
                                                { label: 'Begrenset tilgang', value: 'begrenset-tilgang' },
                                                { label: 'Ikke-allmen tilgang', value: 'ikke-allmen-tilgang' },
                                                { label: 'Åpne data', value: 'open-data' },
                                            ]}
                                            // options={[
                                            //     { label: <Tag data-color='success'>Allmenn tilgang</Tag>, value: 'allmenn-tilgang' },
                                            //     { label: <Tag data-color='warning'>Begrenset tilgang</Tag>, value: 'begrenset-tilgang' },
                                            //     { label: <Tag data-color='danger'>Ikke-allmen tilgang</Tag>, value: 'ikke-allmen-tilgang' },
                                            //     { label: <Tag data-color='success'>Åpne data</Tag>, value: 'open-data' },
                                            // ]}
                                        />
                                    </Box>
                                </Dropdown>
                            </Dropdown.TriggerContext>
                            <Dropdown.TriggerContext>
                                <Dropdown.Trigger
                                    data-size='sm'
                                    variant='secondary'
                                >
                                    Data-format
                                    <ChevronDownIcon />
                                </Dropdown.Trigger>
                                <Dropdown
                                    className={styles.filterDropdown}
                                    placement='bottom-start'
                                    data-size='sm'
                                >
                                    <Tabs defaultValue='value1' className={styles.filterTabs}>
                                        <Tabs.List>
                                            <Tabs.Tab value='value1'>Medieformat</Tabs.Tab>
                                            <Tabs.Tab value='value2'>Filtype</Tabs.Tab>
                                        </Tabs.List>
                                        <Tabs.Panel value='value1' style={{padding:0,paddingTop:'0.5rem'}}>
                                            <VStack>
                                                <Input placeholder='Søk etter medieformat' />
                                                <Box className={styles.box}>
                                                    <CheckboxGroup
                                                        options={mediaFormats}
                                                    />
                                                </Box>
                                            </VStack>
                                        </Tabs.Panel>
                                        <Tabs.Panel value='value2' style={{padding:0,paddingTop:'0.5rem'}}>
                                            <VStack>
                                                <Input placeholder='Søk etter filtype' />
                                                <Box className={styles.box}>
                                                    <CheckboxGroup
                                                        options={filetype}
                                                    />
                                                </Box>
                                            </VStack>
                                        </Tabs.Panel>
                                    </Tabs>
                                </Dropdown>
                            </Dropdown.TriggerContext>
                            <Dropdown.TriggerContext>
                                <Dropdown.Trigger
                                    data-size='sm'
                                    variant='secondary'
                                >
                                    Geografi
                                    <ChevronDownIcon />
                                </Dropdown.Trigger>
                                <Dropdown
                                    className={styles.filterDropdown}
                                    placement='bottom-start'
                                    data-size='sm'
                                >
                                    <VStack>
                                        <Input placeholder='Søk etter geografi' />
                                        <Box className={styles.box}>
                                            <CheckboxGroup
                                                options={geography}
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
                                    Opphav
                                    <ChevronDownIcon />
                                </Dropdown.Trigger>
                                <Dropdown
                                    className={styles.filterDropdown}
                                    placement='bottom-start'
                                    data-size='sm'
                                >
                                    <Box className={styles.box}>
                                        <CheckboxGroup
                                            options={[
                                                { label: 'Nasjonal', value: 'nasjonal' },
                                                { label: 'Vedtak', value: 'vedtak' },
                                                { label: 'Bruker', value: 'bruker' },
                                                { label: 'Tredjepart', value: 'tredjepart' },
                                            ]}
                                        />
                                    </Box>
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
