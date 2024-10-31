import {
    Heading,
    Link,
    Tag,
    HelpText,
    Paragraph,
    ChipGroup,
    ChipToggle
} from '@digdir/designsystemet-react';
import { ExternalLinkIcon } from '@navikt/aksel-icons';

import Article from '@fdk-frontend/ui/article';

import styles from './dataset-details.module.scss';

import HStack from '../hstack';

const DatasetDetails = ({ worst }) => {
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
                        <HStack>
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
                        </HStack>
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
                        <HStack>
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
                        </HStack>
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
                    <dt>Telefon:</dt>
                    <dd><span className={styles.placeholderText}>-</span></dd>
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
                    <dt>Innholdsleverandører:</dt>
                    <dd><span className={styles.placeholderText}>-</span></dd>
                    <dt>Opphav:</dt>
                    <dd><span className={styles.placeholderText}>-</span></dd>
                    <dt>Oppdateringsfrekvens:</dt>
                    <dd><span className={styles.placeholderText}>-</span></dd>
                    <dt>Utgitt:</dt>
                    <dd><span className={styles.placeholderText}>-</span></dd>
                    <dt>Sist oppdatert:</dt>
                    <dd><span className={styles.placeholderText}>-</span></dd>
                    <dt>Aktualitet:</dt>
                    <dd><span className={styles.placeholderText}>-</span></dd>
                    <dt>Kompletthet:</dt>
                    <dd><span className={styles.placeholderText}>-</span></dd>
                    <dt>Nøyaktighet:</dt>
                    <dd><span className={styles.placeholderText}>-</span></dd>
                    <dt>Relevans:</dt>
                    <dd><span className={styles.placeholderText}>-</span></dd>
                    <dt>Tilgjengelighet:</dt>
                    <dd><span className={styles.placeholderText}>-</span></dd>
                    <dt>
                        Geografisk avgrenset til:
                    </dt>
                    <dd><span className={styles.placeholderText}>-</span></dd>
                    <dt>
                        Tidsmessig avgrenset til:
                    </dt>
                    <dd><span className={styles.placeholderText}>-</span></dd>
                    <dt>
                        <HStack>
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
                        </HStack>
                    </dt>
                    <dd><span className={styles.placeholderText}>-</span></dd>
                </dl>
            </section>
            <section className={styles.section}>
                <Heading
                    level={4}
                    size='xxsmall'
                >
                    Lovhjemler
                </Heading>
                <div className={styles.greyBox}>
                    <span className={styles.placeholderText}>Ingen lovhjemler oppgitt</span>
                </div>
            </section>
            <section className={styles.section}>
                <Heading
                    level={4}
                    size='xxsmall'
                >
                    Begreper brukt i datasett
                </Heading>
                <div className={styles.greyBox}>
                    <span className={styles.placeholderText}>Ingen begreper oppgitt</span>
                </div>
            </section>
            <section className={styles.section}>
                <Heading
                    level={4}
                    size='xxsmall'
                >
                    Relasjoner til datasett
                </Heading>
                <div className={styles.greyBox}>
                    <span className={styles.placeholderText}>Ingen relasjoner til datasett oppgitt</span>
                </div>
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