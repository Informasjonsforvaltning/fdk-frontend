'use client';

import { useState } from 'react';
import cn from 'classnames';

import { type Dictionary, type LocaleCodes } from '@fdk-frontend/dictionaries';

import Breadcrumbs from '@fdk-frontend/ui/breadcrumbs';
import Badge from '@fdk-frontend/ui/badge';
import HStack from '@fdk-frontend/ui/hstack';
import VStack from '@fdk-frontend/ui/vstack';
import { Subtext } from '@fdk-frontend/ui/typography';
import StarButton from '@fdk-frontend/ui/star-button';
import {
    Alert,
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
} from '@digdir/designsystemet-react';
import { DownloadIcon, ExternalLinkIcon } from '@navikt/aksel-icons';

import Distributions, { type Distribution } from '../distributions';
import DatasetDescription from '../dataset-description';
import DatasetDetails from '../dataset-details';
import MetadataPage from '../metadata-page';

import PlaceholderBox from '../placeholder-box';

import fullDetails from '../dataset-details/data/full.json';

import styles from './details-page.module.scss';

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
            href: '#',
            text: 'Datasett',
        },
        {
            href: '#',
            text: 'Energimålinger kommunale bygg',
        },
    ];

    const exampleData: Distribution[] = [
        {
            title: 'Eksempel på tabelloppføring',
            tags: ['csv', 'json', 'xml', 'yaml'],
            description: 'API i formatene JSON, XML, CSV og YAML. Komplett nedlasting som CSV',
            accessUrl: 'https://hotell.difi.no/?dataset=npd/survey/last-updates',
            downloadUrl: 'https://hotell.difi.no/download/npd/survey/last-updates?download',
        },
    ];

    const datasets: Distribution[] = [
        {
            title: 'Oversikt over transportsystemet (ledningsnettet) i de enkelte vannforsyningssystemene',
            tags: ['csv', 'json', 'xml', 'yaml'],
            description: 'API i formatene JSON, XML, CSV og YAML. Komplett nedlasting som CSV',
            accessUrl: 'https://hotell.difi.no/?dataset=npd/survey/last-updates',
            downloadUrl: 'https://hotell.difi.no/download/npd/survey/last-updates?download',
        },
        {
            title: 'Historiske data om endringer i transportsystemet',
            tags: ['csv', 'json', 'xml', 'yaml'],
            description: 'API i formatene JSON, XML, CSV og YAML. Komplett nedlasting som CSV',
            accessUrl: 'https://hotell.difi.no/?dataset=npd/survey/last-updates',
            downloadUrl: 'https://hotell.difi.no/download/npd/survey/last-updates?download',
        },
    ];

    const apis: Distribution[] = [
        {
            title: 'Endepunkt for webtjeneste',
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
                    <Link href='#'>Mattilsynet</Link>
                    <div className={styles.titleContainer}>
                        <Heading
                            level={1}
                            size='lg'
                            className={styles.title}
                        >
                            Vannverk - transportsystem
                        </Heading>
                        <div className={styles.titleToolbar}>
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
                                <DownloadIcon fontSize='1.2em' /> Last ned
                                {/*Be om tilgang*/}
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
                        <span className={styles.lastUpdated}>Publisert 9. mars 2022</span>
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
                            Diskusjoner&nbsp;<Badge>2</Badge>
                        </Tab>
                        <Tab value='metadata'>RDF</Tab>
                    </TabList>
                    <TabContent value='oversikt'>
                        {/*<article className={styles.article}>
                            <p>
                                Statistikk over helt arbeidsledige ved utgangen av måneden fordelt på bostedskommune og
                                fylke Helt ledige arbeidssøkere omfatter alle arbeidssøkere som de to siste ukene har
                                meldt til NAV at de er helt uten arbeid, søker nytt arbeid og er tilgjengelig for det
                                arbeid som søkes. Se om statistikken på www.nav.no for ytterligere forklaringer.
                            </p>
                        </article>*/}
                        <section className={styles.section}>
                            <Heading
                                level={4}
                                size='xxsmall'
                            >
                                Beskrivelse
                            </Heading>
                            <div className={styles.box}>
                                <DatasetDescription className={styles.article}>
                                    {`
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
`}
                                </DatasetDescription>
                            </div>
                        </section>
                        <section className={styles.section}>
                            <Distributions
                                datasets={datasets}
                                className={cn({ [styles.highlight]: highlight })}
                            />
                        </section>
                        <hr className={styles.divider} />
                        <section className={styles.section}>
                            <Heading
                                level={4}
                                size='xxsmall'
                            >
                                Andre så også på
                            </Heading>
                            <table className='table'>
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
                            {/*<ul className={cn(styles.related)}>
                                <li>
                                    <Link href="#">
                                        <span>Hydrologiske data</span>
                                        <span>Norges vassdrags- og energidirektorat (nve)</span>
                                        <Tag color='success' size='sm'>Åpne data</Tag>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#">
                                        <span>Standard for yrkesklassifisering (STYRK08)</span>
                                        <span>Statistisk sentralbyrå</span>
                                        <Tag color='success' size='sm'>Åpne data</Tag>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#">
                                        <span>Folketeljinga 1910</span>
                                        <span>Arkivverket</span>
                                        <Tag color='warning' size='sm'>Begrenset tilgang</Tag>
                                    </Link>
                                </li>
                            </ul>*/}
                        </section>
                    </TabContent>
                    <TabContent value='distribusjoner'>
                        <Distributions
                            exampleData={exampleData}
                            datasets={datasets}
                            apis={apis}
                            className={cn({ [styles.highlight]: highlight })}
                        />
                    </TabContent>
                    <TabContent value='detaljer'>
                        <DatasetDetails details={fullDetails} />
                    </TabContent>
                    <TabContent value='kommentarer'>
                        {/*<section className={styles.section}>
                            <Heading
                                level={4}
                                size='xxsmall'
                            >
                                Kommentarer <Badge>2</Badge>
                            </Heading>
                            <PlaceholderBox>
                                Hello
                            </PlaceholderBox>
                        </section>
                        <hr className={styles.divider} />
                        <section className={styles.section}>
                            <Heading
                                level={4}
                                size='xxsmall'
                            >
                                Diskusjonstråder på Datalandsbyen hvor dette datasettet er nevnt
                            </Heading>
                            <table className='table'>
                                <tbody>
                                    <tr>
                                        <td>
                                            <Link href='#'>Datasett Stort testdatasett 1, RAMSUND OG ROGNAN REVISJON</Link>
                                            <div style={{marginTop:'0.25rem'}}><Subtext>posted by fdk-community-admin</Subtext></div>
                                        </td>
                                        <td align='right'>
                                            <HStack>
                                                <HStack>0 Stemmer</HStack>
                                                <HStack>0 Stemmer</HStack>
                                            </HStack>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </section>*/}
                        <section className={styles.section}>
                            <Heading
                                level={4}
                                size='xxsmall'
                            >
                                <Button
                                    variant='tertiary'
                                    size='sm'
                                    style={{float:'right',position:'relative',top:'-0.75rem'}}
                                >
                                    Gå til Datalandsbyen
                                    <ExternalLinkIcon />
                                </Button>
                                Diskusjoner på Datalandsbyen <Badge>2</Badge>
                            </Heading>
                            <table className='table'>
                                <tbody>
                                    <tr>
                                        <td>
                                            <Link href='#'>Datasett Stort testdatasett 1, RAMSUND OG ROGNAN REVISJON <ExternalLinkIcon /></Link>
                                            <div style={{marginTop:'0.25rem'}}><Subtext>posted by fdk-community-admin</Subtext></div>
                                        </td>
                                        <td align='right'>
                                            <HStack style={{justifyContent:'flex-end'}}>
                                                <div className={styles.forumStats}><span>7</span>Stemmer</div>
                                                <div className={styles.forumStats}><span>12</span>Innlegg</div>
                                                <div className={styles.forumStats}><span>16k</span>Visninger</div>
                                            </HStack>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Link href='#'>Datasett Stort testdatasett 1, RAMSUND OG ROGNAN REVISJON <ExternalLinkIcon /></Link>
                                            <div style={{marginTop:'0.25rem'}}><Subtext>posted by fdk-community-admin</Subtext></div>
                                        </td>
                                        <td align='right'>
                                            <HStack style={{justifyContent:'flex-end'}}>
                                                <div className={styles.forumStats}><span>7</span>Stemmer</div>
                                                <div className={styles.forumStats}><span>12</span>Innlegg</div>
                                                <div className={styles.forumStats}><span>16k</span>Visninger</div>
                                            </HStack>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <hr className={styles.divider} />
                            <Alert>
                                <VStack>
                                    <Heading
                                        level={4}
                                        size='xxsmall'
                                    >
                                        Hva er Datalandsbyen?
                                    </Heading>
                                    <Paragraph size='sm'>
                                        Datalandsbyen er et nettforum hvor man kan etterspørre data, dele erfaringer og spørre om råd som gjelder datadeling og informasjonsforvaltning.
                                    </Paragraph>
                                    <HStack>
                                        <Button variant='secondary' size='sm' asChild>
                                            <a href="https://datalandsbyen.norge.no/">Gå til Datalandsbyen <ExternalLinkIcon /></a>
                                        </Button>
                                        <Button variant='secondary' size='sm' asChild>
                                            <a href="/docs/community">Mer informasjon</a>
                                        </Button>
                                    </HStack>
                                </VStack>
                            </Alert>
                        </section>
                    </TabContent>
                    <TabContent value='metadata'>
                        <MetadataPage />
                    </TabContent>
                </Tabs>
            </div>
        </div>
    );
}
