import React, { PropsWithChildren, useContext } from 'react';
import { Heading, Link, HelpText, Paragraph } from '@digdir/designsystemet-react';
import Article from '@fdk-frontend/ui/article';
import HStack from '@fdk-frontend/ui/hstack';
import { ExternalLinkIcon } from '@navikt/aksel-icons';

import PlaceholderText from '../../../placeholder-text';
import { DatasetDetailsProps, DatasetDetailsContext } from '../../';
import { printLocaleValue } from '../../utils';
import { type Dictionary, i18n } from '@fdk-frontend/dictionaries';

const ContentDetails = ({ dataset, locale }: DatasetDetailsProps) => {

    const { showEmptyRows } = useContext(DatasetDetailsContext);

    return (
        <section>
            <Heading
                level={4}
                size='xxsmall'
            >
                Innhold
            </Heading>
            <dl>
                {
                    (!dataset.language && !showEmptyRows) ? null :
                    <>
                        <dt>Språk:</dt>
                        <dd>
                            {
                                dataset.language ?
                                dataset.language.map(language => 
                                    printLocaleValue(language.prefLabel, locale)).join(', ') :
                                <PlaceholderText>Ikke oppgitt</PlaceholderText>
                            }
                        </dd>
                    </>
                }
                {
                    (!dataset.qualifiedAttributions && !showEmptyRows) ? null :
                    <>
                        <dt>Innholdsleverandører:</dt>
                        <dd>
                            {
                                dataset.qualifiedAttributions ?
                                <ol>
                                    {dataset.qualifiedAttributions.map((attribution, i) => (
                                        <li key={`attribution-${i}`}>
                                            {
                                                attribution.agent.uri ?
                                                <Link href={attribution.agent.uri}>
                                                    {printLocaleValue(attribution.agent.prefLabel, locale)}
                                                    <ExternalLinkIcon />
                                                </Link> :
                                                printLocaleValue(attribution.agent.prefLabel, locale)
                                            }
                                        </li>
                                    ))}
                                </ol> :
                                <PlaceholderText>Ikke oppgitt</PlaceholderText>
                            }
                        </dd>
                    </>
                }
                {
                    (!dataset.provenance && !showEmptyRows) ? null :
                    <>
                        <dt>Opphav:</dt>
                        <dd>
                            {
                                dataset.provenance ?
                                printLocaleValue(dataset.provenance.prefLabel, locale) :
                                <PlaceholderText>Ikke oppgitt</PlaceholderText>
                            }
                        </dd>
                    </>
                }
                {
                    (!dataset?.accrualPeriodicity && !showEmptyRows) ? null :
                    <>
                        <dt>Oppdateringsfrekvens:</dt>
                        <dd>
                            {
                                dataset.accrualPeriodicity ?
                                <span style={{textTransform:'capitalize'}}>
                                    {printLocaleValue(dataset.accrualPeriodicity.prefLabel, locale)}
                                </span> :
                                <PlaceholderText>Ikke oppgitt</PlaceholderText>
                            }
                        </dd>
                    </>
                }
                {
                    (!dataset?.issued && !showEmptyRows) ? null :
                    <>
                        <dt>Utgitt:</dt>
                        <dd>
                            {
                                dataset.issued ?
                                new Date(dataset.issued).toLocaleString(locale, { dateStyle: 'long' }) :
                                <PlaceholderText>Ikke oppgitt</PlaceholderText>
                            }
                        </dd>
                    </>
                }
                {
                    (!dataset?.harvest?.modified && !showEmptyRows) ? null :
                    <>
                        <dt>Sist oppdatert:</dt>
                        <dd>
                            {
                                dataset?.harvest?.modified ?
                                new Date(dataset.harvest.modified).toLocaleString(locale, { dateStyle: 'long' }) :
                                <PlaceholderText>Ikke oppgitt</PlaceholderText>
                            }
                        </dd>
                    </>
                }
                {
                    (!dataset?.hasAccuracyAnnotation?.hasBody && !showEmptyRows) ? null :
                    <>
                        <dt>Nøyaktighet:</dt>
                        <dd>
                            {
                                dataset?.hasAccuracyAnnotation?.hasBody ?
                                printLocaleValue(dataset?.hasAccuracyAnnotation?.hasBody, locale) :
                                <PlaceholderText>Ikke oppgitt</PlaceholderText>
                            }
                        </dd>
                    </>
                }
                {
                    (!dataset?.hasAvailabilityAnnotation?.hasBody && !showEmptyRows) ? null :
                    <>
                        <dt>Tilgjengelighet:</dt>
                        <dd>
                            {
                                dataset?.hasAvailabilityAnnotation?.hasBody ?
                                printLocaleValue(dataset?.hasAvailabilityAnnotation?.hasBody, locale) :
                                <PlaceholderText>Ikke oppgitt</PlaceholderText>
                            }
                        </dd>
                    </>
                }
                {
                    (!dataset?.hasCompletenessAnnotation?.hasBody && !showEmptyRows) ? null :
                    <>
                        <dt>Kompletthet:</dt>
                        <dd>
                            {
                                dataset?.hasCompletenessAnnotation?.hasBody ?
                                printLocaleValue(dataset?.hasCompletenessAnnotation?.hasBody, locale) :
                                <PlaceholderText>Ikke oppgitt</PlaceholderText>
                            }
                        </dd>
                    </>
                }
                {
                    (!dataset?.hasCurrentnessAnnotation?.hasBody && !showEmptyRows) ? null :
                    <>
                        <dt>Aktualitet:</dt>
                        <dd>
                            {
                                dataset?.hasCurrentnessAnnotation?.hasBody ?
                                printLocaleValue(dataset?.hasCurrentnessAnnotation?.hasBody, locale) :
                                <PlaceholderText>Ikke oppgitt</PlaceholderText>
                            }
                        </dd>
                    </>
                }
                {
                    (!dataset?.hasRelevanceAnnotation?.hasBody && !showEmptyRows) ? null :
                    <>
                        <dt>Relevans:</dt>
                        <dd>
                            {
                                dataset?.hasRelevanceAnnotation?.hasBody ?
                                printLocaleValue(dataset?.hasRelevanceAnnotation?.hasBody, locale) :
                                <PlaceholderText>Ikke oppgitt</PlaceholderText>
                            }
                        </dd>
                    </>
                }
                {
                    (!dataset?.spatial && !showEmptyRows) ? null :
                    <>
                        <dt>Geografisk avgrensning:</dt>
                        <dd>
                            {
                                dataset?.spatial ?
                                <ol>
                                    {
                                        dataset?.spatial?.map((spatial, i) => {
                                            if (spatial.prefLabel && spatial.uri) {
                                                return (
                                                    <li key={`spatial-${i}`}>
                                                        <Link href={spatial.uri}>
                                                            {printLocaleValue(spatial?.prefLabel, locale)}
                                                            <ExternalLinkIcon />
                                                        </Link>
                                                    </li>
                                                );
                                            } else if (spatial.prefLabel) {
                                                return (
                                                    <li key={`spatial-${i}`}>
                                                        {printLocaleValue(spatial?.prefLabel, locale)}
                                                    </li>
                                                );
                                            } else if (spatial.uri) {
                                                return (
                                                    <li key={`spatial-${i}`}>
                                                        <Link href={spatial.uri}>
                                                            {spatial.uri}
                                                            <ExternalLinkIcon />
                                                        </Link>
                                                    </li>
                                                );
                                            }
                                        })
                                    }
                                </ol> :
                                <PlaceholderText>Ikke oppgitt</PlaceholderText>
                            }
                        </dd>
                    </>
                }
                {
                    (!dataset?.temporal && !showEmptyRows) ? null :
                    <>
                        <dt>Tidsmessig avgrensning:</dt>
                        <dd>
                            {
                                dataset?.temporal ?
                                <ol className="no-style">
                                    {dataset?.temporal?.map((temporal, i) => (
                                        <li key={`temporal-${i}`}>
                                            <dl>
                                                {
                                                    temporal.startDate && 
                                                    <>
                                                        <dt>Fra:</dt>
                                                        <dd>{new Date(temporal.startDate).toLocaleString(locale, { dateStyle: 'long' })}</dd>
                                                    </>
                                                }
                                                {
                                                    temporal.endDate && 
                                                    <>
                                                        <dt>Til:</dt>
                                                        <dd>{new Date(temporal.endDate).toLocaleString(locale, { dateStyle: 'long' })}</dd>
                                                    </>
                                                }
                                            </dl>
                                        </li>
                                    ))}
                                </ol> :
                                <PlaceholderText>Ikke oppgitt</PlaceholderText>
                            }
                        </dd>
                    </>
                }
                {
                    (!dataset?.conformsTo && !showEmptyRows) ? null :
                    <>
                        <dt>
                            <HStack>
                                I samsvar med:
                                <HelpText
                                    title='Begrepsforklaring'
                                    size='sm'
                                    style={{ transform: 'scale(0.75)' }}
                                >
                                    <Paragraph size='sm'>
                                        Referanse til en implementasjonsregel eller annen spesifikasjon, som
                                        ligger til grunn for opprettelsen av datasettet.
                                        <Link href='https://data.norge.no/specification/dcat-ap-no#Datasett-iSamsvarMed'>
                                            Les mer her
                                        </Link>
                                    </Paragraph>
                                </HelpText>
                            </HStack>
                        </dt>
                        <dd>
                            {
                                dataset?.conformsTo ?
                                <ol>
                                    {dataset?.conformsTo?.map((item, i) => (
                                        <li key={item.uri}>
                                            <Link href={item.uri}>
                                                {printLocaleValue(item?.prefLabel, locale)}
                                                <ExternalLinkIcon />
                                            </Link>
                                        </li>
                                    ))}
                                </ol> :
                                <PlaceholderText>Ikke oppgitt</PlaceholderText>
                            }
                        </dd>
                    </>
                }
            </dl>
        </section>
    );
};

export default ContentDetails;
