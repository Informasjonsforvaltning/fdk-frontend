'use client';

import { useState } from 'react';
import cn from 'classnames';

import { type Dictionary, type LocaleCodes } from '@fdk-frontend/dictionaries';

import Breadcrumbs from '@fdk-frontend/ui/breadcrumbs';
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
import { StarIcon, ExternalLinkIcon } from '@navikt/aksel-icons';

import Badge from '../../badge';
import StarButton from '../../star-button';

import styles from '../details-page.module.scss';

export type DetailsPageType = {
    locale: LocaleCodes;
    commonDictionary: Dictionary;
};

export default function DetailsPage({ locale, commonDictionary }: DetailsPageType) {

    const [ activeTab, setActiveTab ] = useState('oversikt');
    const [ highlight, setHighlight ] = useState(false);

    const blink = () => {
        setHighlight(true);
        setTimeout(() => setHighlight(false), 1000);
    }

    const breadcrumbList = [
        {
            href: '#',
            text: 'Datasett',
        },
        {
            href: '#',
            text: 'Energimålinger kommunale bygg',
        },
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
                    <Link href='#'>Skatteetaten</Link>
                    <div className={styles.titleContainer}>
                        <Heading
                            level={1}
                            size='lg'
                            className={styles.title}
                        >
                            Inntektsmottakere API
                        </Heading>
                        <div className={styles.titleToolbar}>
                            <StarButton defaultNumber={7} defaultStarred={false} />
                            <Button size='sm' onClick={() => { setActiveTab('endepunkt'); blink(); }}>
                                Ta i bruk
                            </Button>
                        </div>
                    </div>
                    <div className={styles.headerTags}>
                        <Tag
                            color='info'
                            size='sm'
                        >
                            <Link href='#'>API</Link>
                        </Tag>
                        <span className={styles.lastUpdated}>Sist oppdatert 2. januar 2023</span>
                        <div style={{ flexGrow: 1 }} />
                    </div>
                </div>
                <Tabs
                    defaultValue='oversikt'
                    size='sm'
                    value={activeTab}
                    onChange={setActiveTab}
                >
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
                    <TabContent value='oversikt'>
                        <article className={styles.article}>
                            <p>
                                Tjenesten leverer en liste over inntektsmottakere der arbeidsgiver (opplysningspliktig),
                                via a-ordningen, har rapportert pensjonsavtale med pensjonsinnretningen som utfører
                                kallet.
                            </p>
                        </article>
                        <section className={styles.section}>
                            <Heading
                                level={4}
                                size='xs'
                            >
                                Endepunkter
                            </Heading>
                            <dl>
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
                    </TabContent>
                    <TabContent value='endepunkt'>
                        <section className={styles.section}>
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
                                Bruk av datasettet
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
                    <TabContent value='kommentarer'>Kommentarer her</TabContent>
                </Tabs>
            </div>
        </div>
    );
}
