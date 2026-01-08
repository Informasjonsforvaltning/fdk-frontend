import React, { useContext } from 'react';
import { Heading, Paragraph } from '@digdir/designsystemet-react';
import { Hstack, PlaceholderText, ExternalLink, SmartList, Dlist } from '@fdk-frontend/ui';
import { DatasetDetailsProps, DatasetDetailsTabContext } from '../../';
import { printLocaleValue } from '@fdk-frontend/utils';
import { HelpText } from '@fellesdatakatalog/ui';

const ContentDetails = ({ dataset, locale, dictionary }: DatasetDetailsProps) => {
    const { showEmptyRows } = useContext(DatasetDetailsTabContext);

    return (
        <section>
            <Heading
                level={2}
                data-size='xs'
            >
                {dictionary.details.content.title}
            </Heading>
            <Dlist>
                {!dataset.language && !showEmptyRows ? null : (
                    <>
                        <dt>{dictionary.details.content.language}:</dt>
                        <dd>
                            {dataset.language ? (
                                dataset.language
                                    .map((language: any) => printLocaleValue(locale, language.prefLabel))
                                    .join(', ')
                            ) : (
                                <PlaceholderText>{dictionary.details.noData}</PlaceholderText>
                            )}
                        </dd>
                    </>
                )}
                {!dataset.qualifiedAttributions && !showEmptyRows ? null : (
                    <>
                        <dt>{dictionary.details.content.qualifiedAttributions}:</dt>
                        <dd>
                            {dataset.qualifiedAttributions ? (
                                dataset.qualifiedAttributions.map((attribution, index) => (
                                    <span key={`attribution-${index}`}>
                                        {attribution.agent.uri ? (
                                            <ExternalLink
                                                href={attribution.agent.uri}
                                                locale={locale}
                                                gateway
                                            >
                                                {printLocaleValue(locale, attribution.agent.prefLabel)}
                                            </ExternalLink>
                                        ) : (
                                            printLocaleValue(locale, attribution.agent.prefLabel)
                                        )}
                                        {index < dataset.qualifiedAttributions.length - 1 && ', '}
                                    </span>
                                ))
                            ) : (
                                <PlaceholderText>{dictionary.details.noData}</PlaceholderText>
                            )}
                        </dd>
                    </>
                )}
                {!dataset.provenance && !showEmptyRows ? null : (
                    <>
                        <dt>{dictionary.details.content.provenance}:</dt>
                        <dd>
                            {dataset.provenance ? (
                                printLocaleValue(locale, dataset.provenance.prefLabel)
                            ) : (
                                <PlaceholderText>{dictionary.details.noData}</PlaceholderText>
                            )}
                        </dd>
                    </>
                )}
                {!dataset?.accrualPeriodicity && !showEmptyRows ? null : (
                    <>
                        <dt>{dictionary.details.content.accrualPeriodicity}:</dt>
                        <dd>
                            {dataset.accrualPeriodicity ? (
                                <span style={{ textTransform: 'capitalize' }}>
                                    {printLocaleValue(locale, dataset.accrualPeriodicity.prefLabel)}
                                </span>
                            ) : (
                                <PlaceholderText>{dictionary.details.noData}</PlaceholderText>
                            )}
                        </dd>
                    </>
                )}
                {!dataset?.issued && !showEmptyRows ? null : (
                    <>
                        <dt>
                            <Hstack>
                                <span>{dictionary.details.content.issued}:</span>
                                <HelpText aria-label={dictionary.details.general.firstHarvestedHelpTextTitle}>
                                    <Paragraph>{dictionary.details.content.issuedHelpText}</Paragraph>
                                </HelpText>
                            </Hstack>
                        </dt>
                        <dd>
                            {dataset.issued ? (
                                new Date(dataset.issued).toLocaleString(locale, { dateStyle: 'long' })
                            ) : (
                                <PlaceholderText>{dictionary.details.noData}</PlaceholderText>
                            )}
                        </dd>
                    </>
                )}
                {!dataset?.modified && !showEmptyRows ? null : (
                    <>
                        <dt>{dictionary.details.content.modified}:</dt>
                        <dd>
                            {dataset?.modified ? (
                                new Date(dataset.modified).toLocaleString(locale, { dateStyle: 'long' })
                            ) : (
                                <PlaceholderText>{dictionary.details.noData}</PlaceholderText>
                            )}
                        </dd>
                    </>
                )}
                {!dataset?.hasAccuracyAnnotation?.hasBody && !showEmptyRows ? null : (
                    <>
                        <dt>{dictionary.details.content.accuracyAnnotation}:</dt>
                        <dd>
                            {dataset?.hasAccuracyAnnotation?.hasBody ? (
                                printLocaleValue(locale, dataset?.hasAccuracyAnnotation?.hasBody)
                            ) : (
                                <PlaceholderText>{dictionary.details.noData}</PlaceholderText>
                            )}
                        </dd>
                    </>
                )}
                {!dataset?.hasAvailabilityAnnotation?.hasBody && !showEmptyRows ? null : (
                    <>
                        <dt>{dictionary.details.content.availabilityAnnotation}:</dt>
                        <dd>
                            {dataset?.hasAvailabilityAnnotation?.hasBody ? (
                                printLocaleValue(locale, dataset?.hasAvailabilityAnnotation?.hasBody)
                            ) : (
                                <PlaceholderText>{dictionary.details.noData}</PlaceholderText>
                            )}
                        </dd>
                    </>
                )}
                {!dataset?.hasCompletenessAnnotation?.hasBody && !showEmptyRows ? null : (
                    <>
                        <dt>{dictionary.details.content.completenessAnnotation}:</dt>
                        <dd>
                            {dataset?.hasCompletenessAnnotation?.hasBody ? (
                                printLocaleValue(locale, dataset?.hasCompletenessAnnotation?.hasBody)
                            ) : (
                                <PlaceholderText>{dictionary.details.noData}</PlaceholderText>
                            )}
                        </dd>
                    </>
                )}
                {!dataset?.hasCurrentnessAnnotation?.hasBody && !showEmptyRows ? null : (
                    <>
                        <dt>{dictionary.details.content.currentnessAnnotation}:</dt>
                        <dd>
                            {dataset?.hasCurrentnessAnnotation?.hasBody ? (
                                printLocaleValue(locale, dataset?.hasCurrentnessAnnotation?.hasBody)
                            ) : (
                                <PlaceholderText>{dictionary.details.noData}</PlaceholderText>
                            )}
                        </dd>
                    </>
                )}
                {!dataset?.hasRelevanceAnnotation?.hasBody && !showEmptyRows ? null : (
                    <>
                        <dt>{dictionary.details.content.relevanceAnnotation}:</dt>
                        <dd>
                            {dataset?.hasRelevanceAnnotation?.hasBody ? (
                                printLocaleValue(locale, dataset?.hasRelevanceAnnotation?.hasBody)
                            ) : (
                                <PlaceholderText>{dictionary.details.noData}</PlaceholderText>
                            )}
                        </dd>
                    </>
                )}
                {!dataset?.spatial && !showEmptyRows ? null : (
                    <>
                        <dt>{dictionary.details.content.spatial}:</dt>
                        <dd className='article'>
                            {dataset?.spatial ? (
                                <SmartList
                                    listType='ol'
                                    items={dataset.spatial}
                                    renderItem={(spatial) =>
                                        spatial.uri ? (
                                            <ExternalLink
                                                href={spatial.uri}
                                                locale={locale}
                                                gateway
                                            >
                                                {spatial.prefLabel
                                                    ? printLocaleValue(locale, spatial.prefLabel)
                                                    : spatial.uri}
                                            </ExternalLink>
                                        ) : (
                                            printLocaleValue(locale, spatial?.prefLabel)
                                        )
                                    }
                                />
                            ) : (
                                <PlaceholderText>{dictionary.details.noData}</PlaceholderText>
                            )}
                        </dd>
                    </>
                )}
                {!dataset?.temporal && !showEmptyRows ? null : (
                    <>
                        <dt>{dictionary.details.content.temporal}:</dt>
                        <dd>
                            {dataset?.temporal ? (
                                <SmartList
                                    items={dataset.temporal}
                                    style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
                                    renderItem={(temporal) => (
                                        <Dlist>
                                            {temporal.startDate && (
                                                <>
                                                    <dt>{dictionary.details.content.temporalFrom}:</dt>
                                                    <dd>
                                                        {new Date(temporal.startDate).toLocaleString(locale, {
                                                            dateStyle: 'long',
                                                        })}
                                                    </dd>
                                                </>
                                            )}
                                            {temporal.endDate && (
                                                <>
                                                    <dt>{dictionary.details.content.temporalTo}:</dt>
                                                    <dd>
                                                        {new Date(temporal.endDate).toLocaleString(locale, {
                                                            dateStyle: 'long',
                                                        })}
                                                    </dd>
                                                </>
                                            )}
                                        </Dlist>
                                    )}
                                />
                            ) : (
                                <PlaceholderText>{dictionary.details.noData}</PlaceholderText>
                            )}
                        </dd>
                    </>
                )}
                {!dataset?.conformsTo && !showEmptyRows ? null : (
                    <>
                        <dt>
                            <Hstack>
                                {dictionary.details.content.conformsTo}:
                                <HelpText aria-label={dictionary.details.content.conformsToHelpText}>
                                    <Paragraph>{dictionary.details.content.conformsToHelpText}</Paragraph>
                                </HelpText>
                            </Hstack>
                        </dt>
                        <dd className='article'>
                            {dataset?.conformsTo ? (
                                <SmartList
                                    listType='ol'
                                    items={dataset.conformsTo}
                                    renderItem={(item) => (
                                        <ExternalLink
                                            href={item.uri}
                                            locale={locale}
                                            gateway
                                        >
                                            {printLocaleValue(locale, item?.prefLabel) || item.uri}
                                        </ExternalLink>
                                    )}
                                />
                            ) : (
                                <PlaceholderText>{dictionary.details.noData}</PlaceholderText>
                            )}
                        </dd>
                    </>
                )}
            </Dlist>
        </section>
    );
};

export default ContentDetails;
