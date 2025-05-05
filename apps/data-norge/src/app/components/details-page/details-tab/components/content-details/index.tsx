import React, { useContext } from 'react';
import { Heading, HelpText, Paragraph } from '@digdir/designsystemet-react';
import HStack from '@fdk-frontend/ui/hstack';
import PlaceholderText from '@fdk-frontend/ui/placeholder-text';
import ExternalLink from '@fdk-frontend/ui/external-link';
import { DatasetDetailsProps, DatasetDetailsTabContext } from '../../';
import { printLocaleValue } from '@fdk-frontend/utils';

const ContentDetails = ({ dataset, locale, dictionary }: DatasetDetailsProps) => {
    const { showEmptyRows } = useContext(DatasetDetailsTabContext);

    return (
        <section>
            <Heading
                level={2}
                size='xxsmall'
            >
                {dictionary.details.content.title}
            </Heading>
            <dl>
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
                                <ol>
                                    {dataset.qualifiedAttributions.map((attribution: any, i: number) => (
                                        <li key={`attribution-${i}`}>
                                            {attribution.agent.uri ? (
                                                <ExternalLink href={attribution.agent.uri}>
                                                    {printLocaleValue(locale, attribution.agent.prefLabel)}
                                                </ExternalLink>
                                            ) : (
                                                printLocaleValue(locale, attribution.agent.prefLabel)
                                            )}
                                        </li>
                                    ))}
                                </ol>
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
                            <HStack>
                                <span>{dictionary.details.content.issued}:</span>
                                <HelpText
                                    title={dictionary.details.general.firstHarvestedHelpTextTitle}
                                    size='sm'
                                    style={{ transform: 'scale(0.75)' }}
                                >
                                    <Paragraph size='sm'>{dictionary.details.content.issuedHelpText}</Paragraph>
                                </HelpText>
                            </HStack>
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
                        <dd>
                            {dataset?.spatial ? (
                                <ol>
                                    {dataset?.spatial?.map((spatial: any, i: number) => {
                                        if (spatial.prefLabel && spatial.uri) {
                                            return (
                                                <li key={`spatial-${i}`}>
                                                    <ExternalLink href={spatial.uri}>
                                                        {printLocaleValue(locale, spatial?.prefLabel)}
                                                    </ExternalLink>
                                                </li>
                                            );
                                        } else if (spatial.prefLabel) {
                                            return (
                                                <li key={`spatial-${i}`}>
                                                    {printLocaleValue(locale, spatial?.prefLabel)}
                                                </li>
                                            );
                                        } else if (spatial.uri) {
                                            return (
                                                <li key={`spatial-${i}`}>
                                                    <ExternalLink href={spatial.uri}>
                                                        {spatial.uri}
                                                    </ExternalLink>
                                                </li>
                                            );
                                        }
                                    })}
                                </ol>
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
                                <ol className='no-style'>
                                    {dataset?.temporal?.map((temporal: any, i: number) => (
                                        <li key={`temporal-${i}`}>
                                            <dl>
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
                                            </dl>
                                        </li>
                                    ))}
                                </ol>
                            ) : (
                                <PlaceholderText>{dictionary.details.noData}</PlaceholderText>
                            )}
                        </dd>
                    </>
                )}
                {!dataset?.conformsTo && !showEmptyRows ? null : (
                    <>
                        <dt>
                            <HStack>
                                {dictionary.details.content.conformsTo}:
                                <HelpText
                                    title={dictionary.details.content.conformsToHelpText}
                                    size='sm'
                                    style={{ transform: 'scale(0.75)' }}
                                >
                                    <Paragraph size='sm'>{dictionary.details.content.conformsToHelpText}</Paragraph>
                                </HelpText>
                            </HStack>
                        </dt>
                        <dd>
                            {dataset?.conformsTo ? (
                                <ol>
                                    {dataset?.conformsTo?.map((item: any, i: number) => (
                                        <li key={item.uri}>
                                            <ExternalLink href={item.uri}>
                                                {printLocaleValue(locale, item?.prefLabel) || item.uri}
                                            </ExternalLink>
                                        </li>
                                    ))}
                                </ol>
                            ) : (
                                <PlaceholderText>{dictionary.details.noData}</PlaceholderText>
                            )}
                        </dd>
                    </>
                )}
            </dl>
        </section>
    );
};

export default ContentDetails;
