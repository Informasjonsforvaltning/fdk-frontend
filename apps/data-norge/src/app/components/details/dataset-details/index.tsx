import {
    Heading,
    Button,
    Link,
    Tag,
    HelpText,
    Table,
    TableHead,
    TableBody,
    TableHeaderCell,
    TableCell,
    TableRow,
    Tabs,
    TabList,
    Tab,
    TabContent,
    Paragraph,
    ChipGroup,
    ChipToggle
} from '@digdir/designsystemet-react';
import { StarIcon, DownloadIcon, ExternalLinkIcon } from '@navikt/aksel-icons';

import styles from './dataset-details.module.scss';

import HelptextWrapper from '../helptext-wrapper/';

const DatasetDetails = (props) => {
	return (
		<>
			<section className={styles.section}>
                <Heading
                    level={4}
                    size='xxsmall'
                >
                    Generelt
                </Heading>
                <dl>
                    <dt>Ansvarlig virksomhet:</dt>
                    <dd>
                        <Link href='#'>Arbeids- og velferdsetaten</Link>
                    </dd>
                    <dt>
                        <HelptextWrapper>
                            <span>Publisert:</span>
                            <HelpText
                                title='Begrepsforklaring'
                                size='sm'
                                style={{ transform: 'scale(0.75)' }}
                            >
                                <Paragraph size='sm'>
                                    Denne datoen sier når datasettet ble publisert på data.norge.no. Det kan ha vært tilgjengelig tidligere andre steder.
                                </Paragraph>
                            </HelpText>
                        </HelptextWrapper>
                    </dt>
                    <dd>
                        9. mars 2022
                    </dd>
                    <dt>Dokumentasjon:</dt>
                    <dd>
                        <Link href='#'>
                            https://github.com/opendatalab-no/open-municipal-data
                            <ExternalLinkIcon />
                        </Link>
                    </dd>
                    <dt>
                        <HelptextWrapper>
                            Metadatakvalitet:
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
                        </HelptextWrapper>
                    </dt>
                    <dd>
                        <Tag
                            size='sm'
                            color='warning'
                        >
                            Tilstrekkelig (42%)
                        </Tag>
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
                    level={4}
                    size='xxsmall'
                >
                    Innhold
                </Heading>
                <dl>
                    <dt>Språk:</dt>
                    <dd>Engelsk</dd>
                    <dt>
                        <HelptextWrapper>
                            <span>I samsvar med:</span>
                            <HelpText
                                title='Begrepsforklaring'
                                size='sm'
                                style={{ transform: 'scale(0.75)' }}
                            >
                                <Paragraph size='sm'>
                                    Referanse til en implementasjonsregel eller annen spesifikasjon, som ligger til grunn for opprettelsen av datasettet.
                                    <Link href="https://data.norge.no/specification/dcat-ap-no#Datasett-iSamsvarMed">Les mer her</Link>
                                </Paragraph>
                            </HelpText>
                        </HelptextWrapper>
                    </dt>
                    <dd>
                        <div className={styles.article}>
                            <ul>
                                <li>
                                    <Link href="#">
                                        Standard for rapportering av data
                                        <ExternalLinkIcon />
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#">
                                        Konsolidering i samarbeidende grupper (KRT-1130)
                                        <ExternalLinkIcon />
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </dd>
                </dl>
            </section>
            <section className={styles.section}>
                <Heading
                    level={4}
                    size='xxsmall'
                >
                    Opphav og oppdatering
                </Heading>
                <dl>
                    <dt>Opphav:</dt>
                    <dd>Autoritativ kilde</dd>
                    <dt>Oppdateringsfrekvens:</dt>
                    <dd>daglig</dd>
                    <dt>Utgitt:</dt>
                    <dd>09.03.2016</dd>
                    <dt>Sist oppdatert:</dt>
                    <dd>22.03.2021</dd>
                </dl>
            </section>
            <section className={styles.section}>
                <Heading
                    level={4}
                    size='xxsmall'
                >
                    Kvalitet på innhold
                </Heading>
                <dl>
                    <dt>Aktualitet</dt>
                    <dd>Høyaktuelt</dd>
                    <dt>Kompletthet</dt>
                    <dd>Helt komplett</dd>
                    <dt>Nøyaktighet</dt>
                    <dd>Ekstremt nøyaktig</dd>
                    <dt>Relevans</dt>
                    <dd>Relevant for testing</dd>
                    <dt>Tilgjengelighet</dt>
                    <dd>Kun til intern bruk</dd>
                </dl>
            </section>
            <section className={styles.section}>
                <Heading
                    level={4}
                    size='xxsmall'
                >
                    Begreper brukt i datasett
                </Heading>
                <dl>
                    <dt>
                        <Link href="#">felles omsorg</Link>
                    </dt>
                    <dd>
                        omsorgssituasjon der begge foreldre til et gitt barn bor sammen og har omsorgen for barnet i skattleggingsperioden
                    </dd>
                    <dt>
                        <Link href="#">samlet uføreytelse fra andre enn folketrygden</Link>
                    </dt>
                    <dd>
                        samlet brutto uføreytelser (uføreytelser før skatt) som du får fra andre enn folketrygden ( herunder uføreytelser fra SPK, uføreytelser fra andre pensjonsordninger herunder uføreytelser fra IPA/IPS og uføreytelser fra utlandet) . Uføreytelser regnes som en del av inntektene dine og skattlegges som vanlig lønnsinntekt.
                    </dd>
                </dl>
            </section>
            <section className={styles.section}>
                <Heading
                    level={4}
                    size='xxsmall'
                >
                    Relasjoner til datasett
                </Heading>
                <dl>
                    <dt>
                        <Link href="#">Hydrologiske data</Link>
                    </dt>
                    <dd>
                        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                            <span>Ramsund og rognan revisjon</span>
                            <Tag
                                color='success'
                                size='sm'
                            >
                                Åpne data
                            </Tag>
                        </div>
                    </dd>
                </dl>
            </section>
            <section className={styles.section}>
                <Heading
                    level={4}
                    size='xxsmall'
                >
                    Innholdsleverandører
                </Heading>
                <dl>
                    <dt>
                        Kunstklubben 9
                    </dt>
                    <dd>
                        
                    </dd>
                </dl>
            </section>
            <section className={styles.section}>
                <Heading
                    level={4}
                    size='xxsmall'
                >
                    Avgrensninger
                </Heading>
                <dl>
                    <dt>
                        Geografisk avgrenset til
                    </dt>
                    <dd>
                        <Link href="#">https://example.com/norge</Link>
                    </dd>
                    <dt>
                        Tidsmessig avgrenset til
                    </dt>
                    <dd>
                        07.12.2020 - 08.12.2020
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
		</>
	);
}

export default DatasetDetails;