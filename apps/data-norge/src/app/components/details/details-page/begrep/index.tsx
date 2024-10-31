'use client';

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
    Paragraph,
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
                    <Link href='#'>Arbeids- og velferdsetaten</Link>
                    <div className={styles.titleContainer}>
                        <Heading
                            level={1}
                            size='lg'
                            className={styles.title}
                        >
                            egenandel på dagpenger
                        </Heading>
                        <div className={styles.titleToolbar}>
                            <StarButton defaultNumber={0} defaultStarred={false} />
                        </div>
                    </div>
                    <div className={styles.headerTags}>
                        <Tag
                            color='info'
                            size='sm'
                        >
                            <Link href='#'>Begrep</Link>
                        </Tag>
                        <span className={styles.lastUpdated}>Sist oppdatert 2. januar 2023</span>
                        <div style={{ flexGrow: 1 }} />
                    </div>
                </div>
                <Tabs
                    defaultValue='oversikt'
                    size='sm'
                >
                    <TabList>
                        <Tab value='oversikt'>Oversikt</Tab>
                        <Tab value='detaljer'>Detaljer</Tab>
                        <Tab value='kommentarer'>
                            Kommentarer&nbsp;<Badge>2</Badge>
                        </Tab>
                    </TabList>
                    <TabContent value='oversikt'>
                        <section className={styles.section}>
                            <Heading
                                level={4}
                                size='xs'
                            >
                                Bokmål
                            </Heading>
                            <dl>
                                <dt>Begrep:</dt>
                                <dd>egenandel på dagpenger</dd>
                                <dt>Definisjon:</dt>
                                <dd>
                                    <em>
                                        &quot;beregnet beløp som trekkes fra de første utbetalingene av dagpenger&quot;
                                    </em>
                                </dd>
                            </dl>
                        </section>
                        <section className={styles.section}>
                            <Heading
                                level={4}
                                size='xs'
                            >
                                Nynorsk
                            </Heading>
                            <dl>
                                <dt>Begrep:</dt>
                                <dd>eigenandel på dagpengar</dd>
                                <dt>Definisjon:</dt>
                                <dd>
                                    <em>
                                        &quot;berekna beløp som blir trekt frå dei første utbetalingane av
                                        dagpengar&quot;
                                    </em>
                                </dd>
                            </dl>
                        </section>
                        {/*<section className={styles.section}>
                            <Heading
                                level={4}
                                size='xs'
                            >
                                Begrep
                            </Heading>
                            <dl>
                                <dt>Bokmål:</dt>
                                <dd>egenandel på dagpenger</dd>
                                <dt>Nynorsk:</dt>
                                <dd>eigenandel på dagpengar</dd>
                            </dl>
                        </section>*/}
                        {/*<section className={styles.section}>
                            <Heading
                                level={4}
                                size='xs'
                            >
                                Definisjoner
                            </Heading>
                            <dl>
                                <dt>Bokmål:</dt>
                                <dd><em>"beregnet beløp som trekkes fra de første utbetalingene av dagpenger"</em></dd>
                                <dt>Nynorsk:</dt>
                                <dd><em>"berekna beløp som blir trekt frå dei første utbetalingane av dagpengar"</em></dd>
                                <dt>Kilde:</dt>
                                <dd>Basert på LOV-1997-02-28-19 Lov om folketrygd (folketrygdloven) § 4-9</dd>
                                <dt>Merknad</dt>
                                <dd>
                                    Når dagpenger er innvilget, beregnes en egenandel. Regelen gjelder i saker der ny dagpengeperiode er innvilget fra og med 1. januar 2024, og erstatter den tidligere regelen om ventetid. Egenandelen tilsvarer tre dagsatser medregnet eventuelt barnetillegg og etter eventuell samordning. Egenandelen reduserer brutto utbetaling av dagpenger. Det beregnes ikke egenandel ved permittering i fiskeindustrien eller ved forskuttering av lønnsgarantimidler i form av dagpenger.
                                </dd>
                            </dl>
                        </section>*/}
                        <section className={styles.section}>
                            <Heading
                                level={4}
                                size='xs'
                            >
                                Merknad
                            </Heading>
                            <Paragraph size='sm'>
                                Når dagpenger er innvilget, beregnes en egenandel. Regelen gjelder i saker der ny
                                dagpengeperiode er innvilget fra og med 1. januar 2024, og erstatter den tidligere
                                regelen om ventetid. Egenandelen tilsvarer tre dagsatser medregnet eventuelt
                                barnetillegg og etter eventuell samordning. Egenandelen reduserer brutto utbetaling av
                                dagpenger. Det beregnes ikke egenandel ved permittering i fiskeindustrien eller ved
                                forskuttering av lønnsgarantimidler i form av dagpenger.
                            </Paragraph>
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
