'use client';

import { useState } from 'react';
import cn from 'classnames';

import { type Dictionary, type LocaleCodes } from '@fdk-frontend/dictionaries';

import Breadcrumbs from '@fdk-frontend/ui/breadcrumbs';
import Badge from '@fdk-frontend/ui/badge';
import StarButton from '@fdk-frontend/ui/star-button';
import { BrandDivider } from '@fdk-frontend/ui/divider';
import ScrollShadows from '@fdk-frontend/ui/scroll-shadows';
import {
    Heading,
    Button,
    Link,
    Tag,
    Tabs,
    TabList,
    Tab,
    TabContent,
    ChipGroup,
    ChipToggle,
} from '@digdir/designsystemet-react';
import { ExternalLinkIcon } from '@navikt/aksel-icons';

import CommunityTab from '../../community-tab';

import styles from '../details-page.module.scss';

export type DetailsPageType = {
    locale: LocaleCodes;
    commonDictionary: Dictionary;
};

export default function DetailsPage({ locale, commonDictionary }: DetailsPageType) {
    const [activeTab, setActiveTab] = useState('oversikt');
    const [highlight, setHighlight] = useState(false);

    const blink = () => {
        setHighlight(true);
        setTimeout(() => setHighlight(false), 1000);
    };

    const breadcrumbList = [
        {
            href: '/data-services',
            text: 'API-er',
        },
        {
            href: '#',
            text: 'Energimålinger kommunale bygg',
        },
    ];

    const relatedDatasets = [
        { name: "Vannverk - transportsystem", publisher: "Mattilsynet", accessLevel: "open" },
        { name: "Grunnboken", publisher: "Kartverket", accessLevel: "open" },
        { name: "Kjøretøyopplysninger", publisher: "Statens vegvesen", accessLevel: "limited" },
        // { name: "Merverdiavgiftsregisteret", publisher: "Skatteetaten", accessLevel: "open" },
        // { name: "Bemanningsforetak som er godkjent av Arbeidstilsynet", publisher: "Arbeidstilsynet", accessLevel: "open" },
        // { name: "Tilda tilsynsrapport", publisher: "Arbeidstilsynet", accessLevel: "open" },
        // { name: "Tilda tilsynskoordinering", publisher: "Arbeidstilsynet", accessLevel: "limited" },
        // { name: "Tilda trender", publisher: "Arbeidstilsynet", accessLevel: "limited" },
        // { name: "Foretaksregisteret", publisher: "Brønnøysundregistrene", accessLevel: "restricted" },
        // { name: "Tilda melding til annen myndighet", publisher: "Arbeidstilsynet", accessLevel: "open" },
        // { name: "Enhetsregisteret", publisher: "Brønnøysundregistrene", accessLevel: "open" },
        // { name: "Folkeregisteret", publisher: "Skatteetaten", accessLevel: "restricted" },
        // { name: "Renholdsvirksomheter godkjent av Arbeidstilsynet", publisher: "Arbeidstilsynet", accessLevel: "restricted" },
        // { name: "Oppgaveregisteret", publisher: "Brønnøysundregistrene", accessLevel: "open" },
        // { name: "Matrikkelen - Adresse", publisher: "Kartverket", accessLevel: "open" },
    ];

    const getColorFromAccessLevel = (accessLevel: any) => {
        switch (accessLevel) {
            case 'open': return 'success';
            case 'limited': return 'warning';
            case 'restricted': return 'danger';
            default: return 'success';
        }
    }

    const getLabelFromAccessLevel = (accessLevel: any) => {
        switch (accessLevel) {
            case 'open': return 'Åpne data';
            case 'limited': return 'Begrenset tilgang';
            case 'restricted': return 'Ikke-allmenn tilgang';
            default: return 'Åpne data';
        }
    }

    return (
        <div className={styles.detailsPage}>
            <Breadcrumbs
                dictionary={commonDictionary}
                breadcrumbList={breadcrumbList}
                baseUri=''
            />
            <div className={styles.mainContent}>
                <div className={styles.header}>
                    <Link href='#'>Digdir</Link>
                    <div className={styles.headerGrid}>
                        <Heading
                            level={1}
                            size='lg'
                            className={styles.title}
                        >
                            data.altinn.no
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
                                {/*<DownloadIcon fontSize='1.2em' /> Last ned*/}
                                Bruk API
                            </Button>
                        </div>
                        <div className={styles.headerTags}>
                            <Tag
                                color='info'
                                size='sm'
                            >
                                <Link href='#'>API</Link>
                            </Tag>
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
                    <ScrollShadows>
                        <TabList>
                            <Tab value='oversikt'>Oversikt</Tab>
                            <Tab value='endepunkt'>
                                Endepunkter&nbsp;<Badge>2</Badge>
                            </Tab>
                            <Tab value='detaljer'>Detaljer</Tab>
                            <Tab value='kommentarer'>
                                Kommentarer&nbsp;<Badge>2</Badge>
                            </Tab>
                        </TabList>
                    </ScrollShadows>
                    <TabContent value='oversikt'>
                        <Heading
                            level={4}
                            size='xxsmall'
                        >
                            Beskrivelse
                        </Heading>
                        <div className={styles.box}>
                            Api for å benytte tjenester på data.altinn.no. Tilgang krever både autentisert virksomhet (maskinporten) og api-nøkkel som kan fås på data.altinn.no
                        </div>
                        <section className={styles.section}>
                            <Heading
                                level={4}
                                size='xxsmall'
                            >
                                Endepunkter&nbsp;<Badge>2</Badge>
                            </Heading>
                            <dl>
                                <dt>Endepunkt:</dt>
                                <dd>
                                    <Link href='https://api.data.altinn.no/v1'>
                                        https://api.data.altinn.no/v1
                                        <ExternalLinkIcon />
                                    </Link>
                                </dd>
                                <dt>Endepunktbeskrivelse:</dt>
                                <dd>
                                    <Link href='https://api.data.altinn.no/v1/public/metadata/oas/json'>
                                        https://api.data.altinn.no/v1/public/metadata/oas/json
                                        <ExternalLinkIcon />
                                    </Link>
                                </dd>
                                <dt>Dokumentasjon:</dt>
                                <dd>
                                    <Link href='https://docs.data.altinn.no/'>
                                        https://docs.data.altinn.no/
                                        <ExternalLinkIcon />
                                    </Link>
                                </dd>
                                <dt>Formater:</dt>
                                <dd>
                                    <ChipGroup size='sm'>
                                        {['json', 'xml'].map((format) => (
                                            <ChipToggle key={format}>{format}</ChipToggle>
                                        ))}
                                    </ChipGroup>
                                </dd>
                            </dl>
                        </section>
                        <BrandDivider className={styles.divider} />
                        <section className={styles.section}>
                            <Heading
                                level={4}
                                size='xxsmall'
                            >
                                {/*Relaterte datasett&nbsp;<Badge>{relatedDatasets.length}</Badge>*/}
                                Tilgjengeliggjør datasett
                            </Heading>
                            <ScrollShadows>
                                <table className='table' style={{minWidth:475}}>
                                    <tbody>
                                        {relatedDatasets.map(dataset => (
                                            <tr key={dataset.name}>
                                                <td>
                                                    <Link href='/view'>{dataset.name}</Link>
                                                </td>
                                                <td>
                                                    <span className={styles.relatedPublisher}>
                                                        {dataset.publisher}
                                                    </span>
                                                </td>
                                                <td align='right'>
                                                    <Tag
                                                        color={getColorFromAccessLevel(dataset.accessLevel)}
                                                        size='sm'
                                                    >
                                                        {getLabelFromAccessLevel(dataset.accessLevel)}
                                                    </Tag>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </ScrollShadows>
                        </section>
                    </TabContent>
                    <TabContent value='endepunkt'>
                        <section className={styles.section}>
                            <Heading
                                level={4}
                                size='xxsmall'
                            >
                                Endepunkter
                            </Heading>
                            <dl className={cn({ [styles.highlight]: highlight })}>
                                <dt>Endepunkt:</dt>
                                <dd>
                                    <Link href='#'>
                                        https://inntektsmottakere.api.skatteetaten-test.no/v1
                                        <ExternalLinkIcon />
                                    </Link>
                                </dd>
                                <dt>Endepunkt:</dt>
                                <dd>
                                    <Link href='#'>
                                        https://inntektsmottakere.api.skatteetaten.no/v1
                                        <ExternalLinkIcon />
                                    </Link>
                                </dd>
                                <dt>Endepunktbeskrivelse:</dt>
                                <dd>
                                    <Link href='https://api.swaggerhub.com/apis/skatteetaten/inntektsmottakere-api/1.1.0'>
                                        Gå til spesifikasjon
                                        <ExternalLinkIcon />
                                    </Link>
                                </dd>
                                <dt>Formater:</dt>
                                <dd>
                                    <ChipGroup size='sm'>
                                        {['json', 'xml'].map((format) => (
                                            <ChipToggle key={format}>{format}</ChipToggle>
                                        ))}
                                    </ChipGroup>
                                </dd>
                            </dl>
                        </section>
                        {/*<section className={styles.section}>
                            <Heading
                                level={2}
                                size='xxsmall'
                            >
                                Formater
                            </Heading>
                            <ChipGroup size="sm">
                                {['json', 'xml'].map((tema) => (
                                    <ChipToggle>{tema}</ChipToggle>
                                ))}
                            </ChipGroup>
                        </section>*/}
                    </TabContent>
                    <TabContent value='detaljer'>
                        <section className={styles.section}>
                            <Heading
                                level={4}
                                size='xxsmall'
                            >
                                Generelt
                            </Heading>
                            <dl>
                                <dt>Utgiver:</dt>
                                <dd>
                                    <Link href='#'>Arbeids- og velferdsetaten</Link>
                                </dd>
                                <dt>Publisert:</dt>
                                <dd>9. mars 2022</dd>
                                <dt>Språk:</dt>
                                <dd>Engelsk</dd>
                                <dt>Dokumentasjon:</dt>
                                <dd>
                                    <Link href='#'>https://github.com/opendatalab-no/open-municipal-data</Link>
                                </dd>
                            </dl>
                        </section>
                        <section className={styles.section}>
                            <Heading
                                level={4}
                                size='xxsmall'
                            >
                                Kontaktinformasjon
                            </Heading>
                            <dl>
                                <dt>Kontaktpunkt:</dt>
                                <dd>
                                    <Link href='#'>https://www.sintef.no/alle-ansatte/ansatt/erlend.stav/</Link>
                                </dd>
                                <dt>E-post:</dt>
                                <dd>
                                    <Link href='#'>erlend.stav@sintef.no</Link>
                                </dd>
                            </dl>
                        </section>
                        <section className={styles.section}>
                            <Heading
                                level={2}
                                size='xxsmall'
                            >
                                Formater
                            </Heading>
                            <ChipGroup size='sm'>
                                {['json', 'xml'].map((format) => (
                                    <ChipToggle key={format}>{format}</ChipToggle>
                                ))}
                            </ChipGroup>
                        </section>
                    </TabContent>
                    <TabContent value='kommentarer'>
                        <CommunityTab />
                    </TabContent>
                </Tabs>
            </div>
        </div>
    );
}
