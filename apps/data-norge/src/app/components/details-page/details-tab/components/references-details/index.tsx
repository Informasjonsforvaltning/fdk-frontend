import React from 'react';
import { Heading, Link } from '@digdir/designsystemet-react';
import { PlaceholderBox, ExternalLink, SmartList, Dlist } from '@fdk-frontend/ui';
import { printLocaleValue, getDatasetSlug } from '@fdk-frontend/utils';
import { DatasetDetailsProps } from '../../';

const ReferencesDetails = ({ populatedReferences, locale, dictionary }: Omit<DatasetDetailsProps, 'dataset'>) => {
    const relations =
        populatedReferences?.filter((r) => r.reference.referenceType.uri !== 'http://purl.org/dc/terms/relation') || [];
    const other = populatedReferences?.filter((r) => !relations.includes(r)) || [];

    return (
        <section>
            <Heading
                level={2}
                size='xxsmall'
            >
                {dictionary.details.references.title}
            </Heading>
            {populatedReferences && populatedReferences.length ? (
                <Dlist>
                    {relations.map((r) => (
                        <React.Fragment key={r.reference?.source?.uri}>
                            <dt>
                                {dictionary.details.references.relationLabels[r.reference?.referenceType?.uri] ||
                                    dictionary.details.references.relationLabels.unknown}
                                :
                            </dt>
                            <dd>
                                {r.resource ? (
                                    <Link
                                        href={`/${locale}/datasets/${r.resource?.id}/${getDatasetSlug(r.resource, locale)}`}
                                    >
                                        {printLocaleValue(locale, r.resource?.title)}
                                    </Link>
                                ) : (
                                    <ExternalLink
                                        href={r.reference.source?.uri}
                                        locale={locale}
                                        gateway
                                    >
                                        {printLocaleValue(locale, r.reference.source?.prefLabel) ||
                                            r.reference.source?.uri}
                                    </ExternalLink>
                                )}
                            </dd>
                        </React.Fragment>
                    ))}
                    <dt>{dictionary.details.references.relatedResources}:</dt>
                    <dd className='article'>
                        <SmartList
                            items={other}
                            renderItem={(r) =>
                                r.resource ? (
                                    <Link
                                        href={
                                            r.resource
                                                ? `/${locale}/datasets/${r.resource.id}/${getDatasetSlug(r.resource, locale)}`
                                                : r.reference.source?.uri
                                        }
                                    >
                                        {printLocaleValue(locale, r.resource?.title)}
                                    </Link>
                                ) : (
                                    <ExternalLink
                                        href={r.reference.source?.uri}
                                        locale={locale}
                                        gateway
                                    >
                                        {printLocaleValue(locale, r.reference.source?.prefLabel) ||
                                            r.reference.source?.uri}
                                    </ExternalLink>
                                )
                            }
                        />
                    </dd>
                </Dlist>
            ) : (
                <PlaceholderBox>{dictionary.details.noData}</PlaceholderBox>
            )}
        </section>
    );
};

export default ReferencesDetails;
