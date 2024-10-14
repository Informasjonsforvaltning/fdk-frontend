import { i18n, getDictionary, type LocaleCodes } from '@fdk-frontend/dictionaries';

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

import Distributions from '../../components/distributions';
import Badge from '../../components/badge';

import styles from './page.module.scss';

export type DetailsViewPageType = {
    params: {
        lang: LocaleCodes;
        slug: string[];
    };
};

export default async function DetailsViewPage({ params }: DetailsViewPageType) {
    const locale = params.lang ?? i18n.defaultLocale;
    const commonDictionary = await getDictionary(locale, 'common');

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

    const distributions = [
        {
            title: 'Location measurement points',
            tags: ['csv', 'json', 'xml', 'yaml'],
            description: 'API i formatene JSON, XML, CSV og YAML. Komplett nedlasting som CSV',
        },
        {
            title: 'Locations',
            tags: ['csv', 'json', 'xml', 'yaml'],
            description: 'API i formatene JSON, XML, CSV og YAML. Komplett nedlasting som CSV',
        },
        {
            title: 'Measurement points',
            tags: ['csv', 'json', 'xml', 'yaml'],
            description: 'API i formatene JSON, XML, CSV og YAML. Komplett nedlasting som CSV',
        },
        {
            title: 'Measurements',
            tags: ['csv', 'json', 'xml', 'yaml'],
            description: 'API i formatene JSON, XML, CSV og YAML. Komplett nedlasting som CSV',
        },
    ];

    return (
        <div className={styles.detailsPage}>
            <Breadcrumbs
                dictionary={commonDictionary}
                breadcrumbList={breadcrumbList}
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
                            <Button size='sm'>
                                <DownloadIcon fontSize='1.2em' /> Last ned
                            </Button>
                        </div>
                    </div>
                    <div className={styles.headerTags}>
                        <Tag color='subtle' size="sm">
                            <Link href='#'>Datasett</Link>
                        </Tag>
                        <Tag color="success" size="sm">
                        	Åpne data&nbsp;
                        	<HelpText size="sm" style={{transform:'scale(0.75)'}}>
                        		<Paragraph size="sm">Åpne data er data som er fritt tilgjengelig for alle.</Paragraph>
                        		<Paragraph size="sm"><Link href="#">Les mer om tilgangsnivåer her</Link></Paragraph>
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
                        <div style={{flexGrow:1}} />
                    </div>
                </div>
                <Tabs
                    defaultValue='oversikt'
                    size='sm'
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
                        <Distributions distributions={distributions} />
                    </TabContent>
                    <TabContent value='detaljer'>
                		<section className={styles.section}>
                            <Heading
                                level={4}
                                size='xxs'
                            >
                                Bruk av datasettet
                            </Heading>
                            <dl>
                            	<dt>Utgiver:</dt>
								<dd><Link href="#">Arbeids- og velferdsetaten</Link></dd>
								<dt>Publisert:</dt>
								<dd>9. mars 2022</dd>
                                <dt>Språk:</dt>
								<dd>Engelsk</dd>
								<dt>Dokumentasjon:</dt>
								<dd><Link href="#">https://github.com/opendatalab-no/open-municipal-data<ExternalLinkIcon /></Link></dd>
								<dt>Metadatakvalitet:</dt>
								<dd style={{display:'flex'}}>
									<span><Tag size="sm" color="warning">Tilstrekkelig (42%)</Tag></span>&nbsp;
		                        	<HelpText size="sm" style={{transform:'scale(0.75)'}}>
		                        		<Paragraph size="sm">Metadatakvalitet er en indikator på hvor godt datasettene er beskrevet ved hjelp av metadata.</Paragraph>
		                        		<Paragraph size="sm"><Link href="/nb/docs/metadata-quality">Les mer om metadatakvalitet her</Link></Paragraph>
		                        	</HelpText>
								</dd>
                            </dl>
                        </section>
                        <section className={styles.section}>
                            <Heading
                                level={4}
                                size='xxs'
                            >
                                Kontaktinformasjon
                            </Heading>
                            <dl>
                            	<dt>Kontaktpunkt:</dt>
								<dd><Link href="#">https://www.sintef.no/alle-ansatte/ansatt/erlend.stav/<ExternalLinkIcon /></Link></dd>
								<dt>E-post:</dt>
								<dd><Link href="#">erlend.stav@sintef.no</Link></dd>
                            </dl>
                        </section>
                        <section className={styles.section}>
                            <Heading
                                level={2}
                                size='xxs'
                            >
                                Tema
                            </Heading>
                            <ChipGroup size="sm">
                                {['Energi', 'Forvaltning og offentlig sektor'].map((theme) => (
                                    <ChipToggle key={theme}>{theme}</ChipToggle>
                                ))}
                            </ChipGroup>
                        </section>
                        <section className={styles.section}>
                            <Heading
                                level={2}
                                size='xxs'
                            >
                                Søkeord
                            </Heading>
                            <ChipGroup size="sm">
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

export const metadata = {
    title: 'Datasett: Energimålinger kommunale bygg - data.norge.no',
    description: 'POC for detaljvisning',
};
