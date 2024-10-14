import { i18n, getDictionary, type LocaleCodes } from '@fdk-frontend/dictionaries';

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

import Badge from '../../../components/badge';

import styles from '../page.module.scss';

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
            text: 'API',
        },
        {
            href: '#',
            text: 'Inntektsmottakere API',
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
                            <Button
                                variant='secondary'
                                size='sm'
                            >
                                <StarIcon />
                            </Button>
                            <Button size='sm'>
                                Ta i bruk
                            </Button>
                        </div>
                    </div>
                    <div className={styles.headerTags}>
                        <Tag color='subtle' size="sm">
                            <Link href='#'>API</Link>
                        </Tag>
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
                                Tjenesten leverer en liste over inntektsmottakere der arbeidsgiver (opplysningspliktig), via a-ordningen, har rapportert pensjonsavtale med pensjonsinnretningen som utfører kallet.
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
                                <dd><Link href="#">https://inntektsmottakere.api.skatteetaten-test.no/v1<ExternalLinkIcon /></Link></dd>
                                <dt>Endepunkt:</dt>
                                <dd><Link href="#">https://inntektsmottakere.api.skatteetaten.no/v1<ExternalLinkIcon /></Link></dd>
                                <dt>Endepunktbeskrivelse:</dt>
                                <dd><Link href="https://api.swaggerhub.com/apis/skatteetaten/inntektsmottakere-api/1.1.0">Gå til spesifikasjon<ExternalLinkIcon /></Link></dd>
                                <dt>Formater:</dt>
                                <dd>
                                    <ChipGroup size="sm">
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
                            <dl>
                                <dt>Endepunkt:</dt>
                                <dd><Link href="#">https://inntektsmottakere.api.skatteetaten-test.no/v1<ExternalLinkIcon /></Link></dd>
                                <dt>Endepunkt:</dt>
                                <dd><Link href="#">https://inntektsmottakere.api.skatteetaten.no/v1<ExternalLinkIcon /></Link></dd>
                                <dt>Endepunktbeskrivelse:</dt>
                                <dd><Link href="https://api.swaggerhub.com/apis/skatteetaten/inntektsmottakere-api/1.1.0">Gå til spesifikasjon<ExternalLinkIcon /></Link></dd>
                                <dt>Formater:</dt>
                                <dd>
                                    <ChipGroup size="sm">
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
                                size='xxs'
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
								<dd><Link href="#">https://github.com/opendatalab-no/open-municipal-data</Link></dd>
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
								<dd><Link href="#">https://www.sintef.no/alle-ansatte/ansatt/erlend.stav/</Link></dd>
								<dt>E-post:</dt>
								<dd><Link href="#">erlend.stav@sintef.no</Link></dd>
                            </dl>
                        </section>
                        <section className={styles.section}>
                            <Heading
                                level={2}
                                size='xxs'
                            >
                                Formater
                            </Heading>
                            <ChipGroup size="sm">
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

export const metadata = {
    title: 'API: Inntektsmottakere API - data.norge.no',
    description: 'POC for detaljvisning',
};
