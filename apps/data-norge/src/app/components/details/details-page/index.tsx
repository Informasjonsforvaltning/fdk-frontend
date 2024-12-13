'use client';

import { useState } from 'react';
import cn from 'classnames';

import { type Dictionary, type LocaleCodes, i18n } from '@fdk-frontend/dictionaries';
import { type JSONValue } from '@fdk-frontend/types';
import { sumArrayLengths } from '@fdk-frontend/utils';

import Breadcrumbs from '@fdk-frontend/ui/breadcrumbs';
import Badge from '@fdk-frontend/ui/badge';
import StarButton from '@fdk-frontend/ui/star-button';
import { BrandDivider } from '@fdk-frontend/ui/divider';
import ScrollShadows from '@fdk-frontend/ui/scroll-shadows';
import {
    Button,
    Heading,
    Link,
    Tag,
    HelpText,
    Tabs,
    TabList,
    Tab,
    TabContent,
    Paragraph,
} from '@digdir/designsystemet-react';
// import { DownloadIcon } from '@navikt/aksel-icons';

import Distributions, { type Distribution } from '../distributions';
import DatasetDescription from '../dataset-description';
import DatasetDetails from '../dataset-details';
import MetadataPage from '../metadata-page';
import CommunityTab from '../community-tab';
import AccessLevelTag from '../access-level-tag';

import fullDetails from '../dataset-details/data/full.json';

import styles from './details-page.module.scss';

export type DetailsPageVariants = 'dataset' | 'api' | 'concept';

export type DetailsPageType = {
    variant: DetailsPageVariants;
    resource: JSONValue;
    search: JSONValue;
    locale: LocaleCodes;
    commonDictionary: Dictionary;
};

export default function DetailsPage({ variant, resource, search, locale, commonDictionary }: DetailsPageType) {
    const [activeTab, setActiveTab] = useState('oversikt');
    const [highlight, setHighlight] = useState(false);

    const blink = () => {
        setHighlight(true);
        setTimeout(() => setHighlight(false), 1000);
    };

    const breadcrumbList = [
        {
            href: '/datasets',
            text: 'Datasett',
        },
        {
            href: '#',
            text: resource.title?.[locale] || resource.title?.[i18n.defaultLocale],
        },
    ];

    const apis: any[] = [
        {
            title: 'data.altinn.no',
            tags: ['json'],
            description: 'Api for å benytte tjenester på data.altinn.no. Tilgang krever både autentisert virksomhet (maskinporten) og api-nøkkel som kan fås på data.altinn.no',
            endpoint: 'https://api.data.altinn.no/v1',
            endpointSpec: 'https://api.data.altinn.no/v1/public/metadata/oas/json',
            documentation: 'https://docs.data.altinn.no/'
        }
    ];

    return (
        <div className={styles.detailsPage}>
            <Breadcrumbs
                dictionary={commonDictionary}
                breadcrumbList={breadcrumbList}
                baseUri=''
            />
            <div className={styles.mainContent}>
                <div className={styles.header}>
                    <Link href='#'>{resource.publisher?.prefLabel?.[locale] || resource.publisher?.prefLabel?.[i18n.defaultLocale]}</Link>
                    <div className={styles.headerGrid}>
                        <Heading
                            level={1}
                            size='lg'
                            className={styles.title}
                        >
                            {resource.title?.[locale] || resource.title?.[i18n.defaultLocale]}
                        </Heading>
                        <div className={styles.headerToolbar}>
                            <StarButton
                                defaultNumber={13}
                                defaultStarred={false}
                            />
                            <Button
                                size='sm'
                                onClick={() => {
                                    setActiveTab('distribusjoner');
                                    blink();
                                }}
                            >
                                Bruk datasett
                            </Button>
                        </div>
                        <div className={styles.headerTags}>
                            <Tag
                                color='info'
                                size='sm'
                            >
                                <Link href='/datasets'>Datasett</Link>
                            </Tag>
                            <AccessLevelTag accessCode={resource.accessRights?.code} />
                            <span className={styles.lastUpdated}>Publisert 9. mars 2022</span>
                        </div>
                    </div>
                </div>
                <Tabs
                    defaultValue='oversikt'
                    size='sm'
                    value={activeTab}
                    onChange={setActiveTab}
                >
                    <ScrollShadows className={styles.tabsScrollShadows}>
                        <TabList>
                            <Tab value='oversikt'>Oversikt</Tab>
                            <Tab value='distribusjoner'>
                                Distribusjoner og API&nbsp;
                                <Badge>
                                    {sumArrayLengths(resource.distribution, resource.sample)}
                                </Badge>
                            </Tab>
                            <Tab value='detaljer'>Detaljer</Tab>
                            <Tab value='kommentarer'>
                                Diskusjoner&nbsp;<Badge>2</Badge>
                            </Tab>
                            <Tab value='metadata'>RDF</Tab>
                        </TabList>
                    </ScrollShadows>
                    <TabContent value='oversikt'>
                        <section className={styles.section}>
                            <Heading
                                level={4}
                                size='xxsmall'
                            >
                                Beskrivelse
                            </Heading>
                            <div className={styles.box}>
                                <DatasetDescription className={styles.article}>
                                    {resource.description?.[locale] || resource.description?.[i18n.defaultLocale]}
                                    {/*`
                                    }
Datasettene omfatter offentlige eller private vannverk som forsyner **50 personer eller mer**. I tillegg inkluderer de alle kommunalt eide virksomheter med egen vannforsyning, uavhengig av størrelse. Datasettene inneholder også data om nedlagte anlegg, for de som ønsker å se historiske data.

#### Tilsynsobjekter i Datasettene
Datasettene dekker følgende tilsynsobjekter:
1. **Vannforsyningssystem** – inkludert analyser av drikkevannet.
2. **Transportsystem**
3. **Behandlingsanlegg**
4. **Inntakspunkt** – inkludert analyser av vannkilden.

Datasett for **Transportsystem** er tilgjengelig nedenfor. I tillegg finnes det en fil (_informasjon.txt_) som gir en oversikt over produksjonstidspunktet for uttrekkene og antall linjer i hver fil. Uttrekkene oppdateres ukentlig.

#### Historiske Data
For datasettene *Vannforsyningssystem*, *Transportsystem*, og *Inntakspunkt* er det mulig å se historiske data som en del av den årlige innrapporteringen. For å nyttiggjøre informasjonen må filen kobles til en "moderfil" for å hente navn og annen statisk informasjon. Disse filene har endelsen _innrapportering i filnavnet.
`*/}
                                </DatasetDescription>
                            </div>
                        </section>
                        <section className={styles.section}>
                            <Distributions
                                datasets={resource.distribution}
                                exampleData={resource.sample}
                                apis={search.hits}
                                className={cn({ [styles.highlight]: highlight })}
                                locale={locale}
                            />
                        </section>
                        <BrandDivider className={styles.divider} />
                        <section className={styles.section}>
                            <Heading
                                level={4}
                                size='xxsmall'
                            >
                                Relaterte datasett
                            </Heading>
                            <ScrollShadows className={styles.tableScroller}>
                                <table className='table' style={{minWidth:475}}>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <Link href='#'>Hydrologiske data</Link>
                                            </td>
                                            <td>
                                                <span className={styles.relatedPublisher}>
                                                    Norges vassdrags- og energidirektorat (nve)
                                                </span>
                                            </td>
                                            <td align='right'>
                                                <Tag
                                                    color='success'
                                                    size='sm'
                                                >
                                                    Åpne data
                                                </Tag>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <Link href='#'>Standard for yrkesklassifisering (STYRK08)</Link>
                                            </td>
                                            <td>
                                                <span className={styles.relatedPublisher}>Statistisk sentralbyrå</span>
                                            </td>
                                            <td align='right'>
                                                <Tag
                                                    color='success'
                                                    size='sm'
                                                >
                                                    Åpne data
                                                </Tag>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <Link href='#'>Folketeljinga 1910</Link>
                                            </td>
                                            <td>
                                                <span className={styles.relatedPublisher}>Arkivverket</span>
                                            </td>
                                            <td align='right'>
                                                <Tag
                                                    color='warning'
                                                    size='sm'
                                                >
                                                    Begrenset tilgang
                                                </Tag>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </ScrollShadows>
                        </section>
                    </TabContent>
                    <TabContent value='distribusjoner'>
                        <Distributions
                            datasets={resource.distribution}
                            exampleData={resource.sample}
                            apis={search.hits}
                            className={cn({ [styles.highlight]: highlight })}
                            locale={locale}
                        />
                    </TabContent>
                    <TabContent value='detaljer'>
                        <DatasetDetails details={fullDetails} />
                    </TabContent>
                    <TabContent value='kommentarer'>
                        <CommunityTab />
                    </TabContent>
                    <TabContent value='metadata'>
                        <MetadataPage />
                    </TabContent>
                </Tabs>
            </div>
        </div>
    );
}
