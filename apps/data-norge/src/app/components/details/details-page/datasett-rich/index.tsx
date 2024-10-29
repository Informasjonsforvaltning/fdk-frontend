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
    HelpText,
    Tabs,
    TabList,
    Tab,
    TabContent,
    Paragraph,
    ChipGroup,
    ChipToggle,
} from '@digdir/designsystemet-react';
import { StarIcon, DownloadIcon, ExternalLinkIcon } from '@navikt/aksel-icons';

import Distributions, { type Distribution } from '../../distributions';
import Badge from '../../badge';

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

    const distributions: Distribution[] = [
        {
            title: 'Location measurement points',
            tags: ['csv', 'json', 'xml', 'yaml'],
            description: 'API i formatene JSON, XML, CSV og YAML. Komplett nedlasting som CSV',
            accessUrl: 'https://hotell.difi.no/?dataset=npd/survey/last-updates',
            downloadUrl: 'https://hotell.difi.no/download/npd/survey/last-updates?download',
        },
        {
            title: 'Locations',
            tags: ['csv', 'json', 'xml', 'yaml'],
            description: 'API i formatene JSON, XML, CSV og YAML. Komplett nedlasting som CSV',
            accessUrl: 'https://hotell.difi.no/?dataset=npd/survey/last-updates',
            downloadUrl: 'https://hotell.difi.no/download/npd/survey/last-updates?download',
        },
        {
            title: 'Measurement points',
            tags: ['csv', 'json', 'xml', 'yaml'],
            description: 'API i formatene JSON, XML, CSV og YAML. Komplett nedlasting som CSV',
            accessUrl: 'https://hotell.difi.no/?dataset=npd/survey/last-updates',
            downloadUrl: 'https://hotell.difi.no/download/npd/survey/last-updates?download',
        },
        {
            title: 'Measurements',
            tags: ['csv', 'json', 'xml', 'yaml'],
            description: 'API i formatene JSON, XML, CSV og YAML. Komplett nedlasting som CSV',
            accessUrl: 'https://hotell.difi.no/?dataset=npd/survey/last-updates',
            downloadUrl: 'https://hotell.difi.no/download/npd/survey/last-updates?download',
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
                            Energimålinger kommunale bygg
                        </Heading>
                        <div className={styles.titleToolbar}>
                            <Button
                                variant='secondary'
                                size='sm'
                            >
                                <StarIcon />
                            </Button>
                            <Button size='sm' onClick={() => { setActiveTab('distribusjoner'); blink(); }}>
                                <DownloadIcon fontSize='1.2em' /> Last ned
                            </Button>
                        </div>
                    </div>
                    <div className={styles.headerTags}>
                        <Tag
                            color='info'
                            size='sm'
                        >
                            <Link href='#'>Datasett</Link>
                        </Tag>
                        <Tag
                            color='success'
                            size='sm'
                        >
                            Åpne data&nbsp;
                            <HelpText
                                title='Begrepsforklaring'
                                size='sm'
                                style={{ transform: 'scale(0.75)' }}
                            >
                                <Paragraph size='sm'>Åpne data er data som er fritt tilgjengelig for alle.</Paragraph>
                                <Paragraph size='sm'>
                                    <Link href='https://data.norge.no/specification/dcat-ap-no#Datasett-tilgangsniv%C3%A5'>
                                        Les mer om tilgangsnivåer her
                                    </Link>
                                </Paragraph>
                            </HelpText>
                        </Tag>
                        {/*<Tag color='warning' size="sm">Begrenset tilgang</Tag>*/}
                        {/*<Tag color='subtle' size="sm">
                        	<span style={{fontWeight:600}}>88%</span>&nbsp;Metadatakvalitet&nbsp;
                        	<HelpText size="sm" style={{transform:'scale(0.75)'}}>
                        		<Paragraph size="sm">Metadatakvalitet er en indikator på hvor godt datasettene er beskrevet ved hjelp av metadata.</Paragraph>
                        		<Paragraph size="sm"><Link href="#">Les mer om metadatakvalitet her</Link></Paragraph>
                        	</HelpText>
                        </Tag>*/}
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
                        <Tab value='distribusjoner'>
                            Distribusjoner&nbsp;<Badge>4</Badge>
                        </Tab>
                        <Tab value='detaljer'>Detaljer</Tab>
                        <Tab value='kommentarer'>
                            Kommentarer&nbsp;<Badge>2</Badge>
                        </Tab>
                    </TabList>
                    <TabContent value='oversikt'>
                        <article className={styles.article}>
                            <p>
                                Statistikk over helt arbeidsledige ved utgangen av måneden fordelt på bostedskommune og
                                fylke Helt ledige arbeidssøkere omfatter alle arbeidssøkere som de to siste ukene har
                                meldt til NAV at de er helt uten arbeid, søker nytt arbeid og er tilgjengelig for det
                                arbeid som søkes. Se om statistikken på www.nav.no for ytterligere forklaringer.
                            </p>
                        </article>
                        <section className={styles.section}>
                            <Heading
                                level={2}
                                size='xs'
                            >
                                Distribusjoner
                            </Heading>
                            <Distributions distributions={distributions} />
                        </section>
                    </TabContent>
                    <TabContent value='distribusjoner'>
                        <Distributions distributions={distributions} className={cn({ [styles.highlight]: highlight })} />
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
                                    <Link href='#'>
                                        https://github.com/opendatalab-no/open-municipal-data
                                        <ExternalLinkIcon />
                                    </Link>
                                </dd>
                                <dt>Metadatakvalitet:</dt>
                                <dd style={{ display: 'flex' }}>
                                    <span>
                                        <Tag
                                            size='sm'
                                            color='warning'
                                        >
                                            Tilstrekkelig (42%)
                                        </Tag>
                                    </span>
                                    &nbsp;
                                    <HelpText
                                        title='Begrepsforklaring'
                                        size='sm'
                                        style={{ transform: 'scale(0.75)' }}
                                    >
                                        <Paragraph size='sm'>
                                            Metadatakvalitet er en indikator på hvor godt datasettene er beskrevet ved
                                            hjelp av metadata.
                                        </Paragraph>
                                        <Paragraph size='sm'>
                                            <Link href='/nb/docs/metadata-quality'>
                                                Les mer om metadatakvalitet her
                                            </Link>
                                        </Paragraph>
                                    </HelpText>
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
                                    <Link href='#'>
                                        https://www.sintef.no/alle-ansatte/ansatt/erlend.stav/
                                        <ExternalLinkIcon />
                                    </Link>
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
                                Tema
                            </Heading>
                            <ChipGroup size='sm'>
                                {['Energi', 'Forvaltning og offentlig sektor'].map((theme) => (
                                    <ChipToggle key={theme}>{theme}</ChipToggle>
                                ))}
                            </ChipGroup>
                        </section>
                        <section className={styles.section}>
                            <Heading
                                level={2}
                                size='xxsmall'
                            >
                                Søkeord
                            </Heading>
                            <ChipGroup size='sm'>
                                {['arbeidsledige', 'statistikk', 'arbeidsmarked', 'nav'].map((term) => (
                                    <ChipToggle key={term}>{term}</ChipToggle>
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
