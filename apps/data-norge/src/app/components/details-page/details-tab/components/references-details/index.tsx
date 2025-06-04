import React from 'react';
import { Heading, Link } from '@digdir/designsystemet-react';
import PlaceholderBox from '@fdk-frontend/ui/placeholder-box';
import ExternalLink from '@fdk-frontend/ui/external-link';
import { printLocaleValue } from '@fdk-frontend/utils';
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
                <dl>
                    {relations.map((r) => (
                        <React.Fragment key={r.reference?.source?.uri}>
                            <dt>
                                {dictionary.details.references.relationLabels[r.reference?.referenceType?.uri] ||
                                    dictionary.details.references.relationLabels.unknown}
                                :
                            </dt>
                            <dd>
                                {r.resource ? (
                                    <Link href={`/datasets/${r.resource?.id}`}>
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
                    <dd>
                        <ol>
                            {other.map((r) => (
                                <li key={r.reference?.source?.uri}>
                                    {r.resource ? (
                                        <Link
                                            href={r.resource ? `/datasets/${r.resource.id}` : r.reference.source?.uri}
                                        >
                                            {printLocaleValue(locale, r.resource?.title)} yalla
                                        </Link>
                                    ) : (
                                        <ExternalLink
                                            href={r.reference.source?.uri}
                                            locale={locale}
                                            gateway
                                        >
                                            {printLocaleValue(locale, r.reference.source?.prefLabel) ||
                                                r.reference.source?.uri}{' '}
                                            balla
                                        </ExternalLink>
                                    )}
                                </li>
                            ))}
                        </ol>
                    </dd>
                </dl>
            ) : (
                <PlaceholderBox>{dictionary.details.noData}</PlaceholderBox>
            )}
        </section>
    );
};

export default ReferencesDetails;
