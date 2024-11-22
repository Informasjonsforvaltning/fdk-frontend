'use client';

import { useState } from 'react';
import cn from 'classnames';

import { type Dictionary, type LocaleCodes } from '@fdk-frontend/dictionaries';

import Breadcrumbs from '@fdk-frontend/ui/breadcrumbs';
import Badge from '@fdk-frontend/ui/badge';
import { BrandDivider } from '@fdk-frontend/ui/divider';
import StarButton from '@fdk-frontend/ui/star-button';
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
} from '@digdir/designsystemet-react';

import Distributions, { type Distribution } from '../../distributions';

import DatasetDescription from '../../dataset-description';
import DatasetDetails from '../../dataset-details';
import MetadataPage from '../../metadata-page';

import worstDetails from '../../dataset-details/data/worst.json';

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
            href: '/datasets',
            text: 'Datasett',
        },
        {
            href: '#',
            text: 'Energimålinger kommunale bygg',
        },
    ];

    const datasets: Distribution[] = [
        {
            title: 'Location measurement points',
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
                                Bruk datasett
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
                            Distribusjoner og API&nbsp;<Badge>1</Badge>
                        </Tab>
                        <Tab value='detaljer'>Detaljer</Tab>
                        <Tab value='kommentarer'>
                            Kommentarer&nbsp;<Badge>2</Badge>
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
**Datasettet Tilsyn** [https://data.mattilsynet.no/smilefjes-tilsyn.csv](https://data.mattilsynet.no/smilefjes-tilsyn.csv) inneholder den tilsvarende informasjonen som plakaten som henges opp hos spisestedene etter at de har hatt tilsyn. Datasettet er visualisert med et søk på [https://smilefjes.mattilsynet.no/](https://smilefjes.mattilsynet.no/)

**Datasettet Kravpunkter** [https://data.mattilsynet.no/smilefjes-kravpunkter.csv](https://data.mattilsynet.no/smilefjes-kravpunkter.csv) inneholder hvert enkelt kravpunkt som inngår i ett tilsyn, sammen med karakteren kravpunktet er gitt. Hvert tilsyn vil ha et sett med rader i dette tilsynet, knyttet sammen av tilsynid.

**Beskrivelse av elementene i datasett for smilefjes**

**Tilsynsobjekt:**  
Et tilsynsobjekt er et sted hvor det foregår aktivitet som Mattilsynet skal føre tilsyn med (for smilefjesordningen er dette serveringssteder som er tilrettelagt og beregnet for at maten skal spises på stedet). Et tilsynsobjekt identifiseres entydig ved en intern id, kalt tilsynsobjektid. I tillegg angis hvilken bedrift i Brønnøysundregisteret som eier tilsynsobjektet. Ansvarlig foretak kan da finnes ved å slå opp på <[www.brreg.no](http://www.brreg.no)> (eller ved bruk av en nettjeneste). Adressene som angis for tilsynsobjektet er interne data med variabel kvalitet, men dette vil bli utbedret etterhvert som tilsynet blir utført. Tilsynsobjekter skifter normalt ikke adresse. Dersom en bedrift flytter en aktivitet fra ett sted til ett annet, vil det oppstå ett nytt tilsynsobjekt.

**Kravpunkt:**  
Krav i regelverket satt opp som punkter. Kravene retter seg mot tilsynsobjektene og Mattilsynet fører tilsyn med kravene. Kravpunktene er ett spesifikt element i ett tilsyn. Disse kan være obligatoriske ved ordinært tilsyn (se tilsyn).

**Avvik:**  
Ett kravpunkt som har blitt undersøkt, og hvor Mattilsynet har funnet brudd på regelverket som fører til at det varsles eller fattes vedtak overfor tilsynsobjektet.

**Tema:**  
Organisering av kravpunkter som benyttes på smilefjesplakaten for å gruppere kravpunkter.

**Tilsyn:**  
Mattilsynets tilsynsprosess består av et ordinært tilsyn, med påfølgende oppfølgingstilsyn til alle avvik er lukket/utbedret eller tilsynsobjektet legger ned aktiviteten. Når vi utfører et ordinært tilsyn vil alle kravpunkter være mulig å vurdere, men det legges ikke opp til at alle kravpunkter vil bli vurdert ved hvert ordinære tilsyn. På oppfølgingstilsyn vurderes normalt bare de kravpunkt som det ble funnet avvik på, med mindre det har oppstått helt åpenbare avvik (eller det er mistanke om avvik) ved øvrige kravpunkter siden forrige tilsyn.

**Karakterskala:**  
0 = Ingen brudd på regelverket funnet. Stort smil.  
1 = Mindre brudd på regelverket som ikke krever oppfølging. Stort smil.  
2 = Brudd på regelverket som krever oppfølging. Strekmunn.  
3 = Alvorlig brudd på regelverket. Sur munn.  
4 = Ikke aktuelt - Virksomheten har ikke denne aktiviteten ved tilsynsobjektet. Påvirker ikke smilefjeskarakter.  
5 = Ikke vurdert - Mattilsynet har ikke vurdert kravpunktet ved dette tilsynet. Påvirker ikke smilefjeskarakter. Dersom det hadde blitt avdekket mistanke om vesentlige eller åpenbare avvik i forbindelse med inspeksjonen, ville kravpunktet blitt vurdert.

**Karaktersetting:**  
Det totale smilefjesymbolet etter et tilsyn tilsvarer den dårligste karakteren som blir gitt på tilsynet. Karakter for hvert tema er den dårligste karakteren gitt til kravpunkter under tema. Hvert enkelt kravpunkt gis karakterer på skalaen.

**Invalidering av tilsyn:**  
Dersom Mattilsynet ikke overholder sine forpliktelser i smilefjesforskriften, eller et påklaget vedtak gis medhold, vil tilsynet og tilsynsresultatet bli trukket tilbake fra åpne data. Informasjonen om dette tilsynet vil ikke lenger være ansett som korrekt. Det er derfor viktig at brukere av datasettet er klar over dette slik at de kan holde sine data oppdatert (1 gang pr. døgn) for å unngå publisering av feilaktig informasjon om et tilsynsobjekt.

**Deklarasjon av innholdet i datasettene**

**Tilsyn:**  
[https://data.mattilsynet.no/smilefjes-tilsyn.csv](https://data.mattilsynet.no/smilefjes-tilsyn.csv) - Dette datasettet inneholder den tilsvarende informasjonen som plakaten som henges opp hos spisestedene etter at de har hatt tilsyn.

- tilsynsobjektid; - Nøkkel for å identifisere tilsynsobjektet  
- orgnummer; - Nøkkel for å koble tilsynsobjektet til eier (i [www.brreg.no](http://www.brreg.no))  
- navn; - Navnet på tilsynsobjektet  
- adrlinje1; - Adresse  
- adrlinje2; - Adresse  
- postnr; - Postnr  
- poststed; - Poststed  
- tilsynid; - Nøkkel for å identifisere tilsynet  
- sakref; - Referansenummer for arkivinformasjon  
- status; - Gjennomføres = utestående avvik finnes. Gjennomført = alle avvik lukket.  
- dato; - Dato tilsynet er utført (ddmmyyyy)  
- karakter; - Smilefjeskarakter for hele tilsynet  
- tilsynsbesoektype; - Ordinært eller oppfølgings-tilsyn  
- tema_karakter1; - Temanavn:karakter (e.g. Ledelse og rutiner:1)  
- tema_karakter2; - Temanavn:karakter (e.g. Lokaler og utstyr:0)  
- tema_karakter3; - Temanavn:karakter (e.g. Mattilberedning og håndtering:0)  
- tema_karakter4; - Temanavn:karakter (e.g. Sporbarhet og Merking:2)  
- kravpunkter_href; - Lenke til datasett som gir kravpunktene som inngikk i tilsynet.

**Kravpunkter:**  
[https://data.mattilsynet.no/smilefjes-kravpunkter.csv](https://data.mattilsynet.no/smilefjes-kravpunkter.csv) - Dette datasettet inneholder hvert enkelt kravpunkt som inngår i ett tilsyn, sammen med karakteren kravpunktet er gitt. Hvert tilsyn vil ha ett sett med rader i dette tilsynet, knyttet sammen av tilsynid.

- "tilsynid"; - Nøkkel for identifisere ett tilsyn  
- "dato"; - Dato tilsynet er utført  
- "tema.kravpunkt"; - Nøkkel for å identifisere ett kravpunkt (ikke unik over tid)  
- "kravpunktnavn"; - Navn på kravpunktet  
- "karakter"; - Karakter (utifra skala)  
- "tekst_no"; - Tekstlig beskrivelse av karakter, bokmål  
- "tekst_nn"; - Tekstlig beskrivelse av karakter, nynorsk  
- "tilsyn_href"; - Lenke til tilsynet, slik at kravpunkter kan kobles sammen med tilsynsobjektet

---

Formål: Data fra smilefjestilsyn gir en samlet oversikt over alle serveringssteder som er omfattet av smilefjesordningen (smilefjesforskriften) og tilsynsresultatene fra Mattilsynets tilsyn fra 1.1. 2016 fram til dags dato.

`}
                                </DatasetDescription>
                            </div>
                        </section>
                        <section className={styles.section}>
                            <Distributions datasets={datasets} />
                        </section>
                        <BrandDivider className={styles.divider} />
                        <section className={styles.section}>
                            <Heading
                                level={4}
                                size='xxsmall'
                            >
                                Relaterte datasett
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
                            datasets={datasets}
                            className={cn({ [styles.highlight]: highlight })}
                        />
                    </TabContent>
                    <TabContent value='detaljer'>
                        <DatasetDetails details={worstDetails} />
                    </TabContent>
                    <TabContent value='kommentarer'>
                        <section className={styles.section}>
                            <Heading
                                level={4}
                                size='xxsmall'
                            >
                                Kommentarer
                            </Heading>
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
