import React, { useContext } from 'react';
import { Heading } from '@digdir/designsystemet-react';
import PlaceholderText from '@fdk-frontend/ui/placeholder-text';
import PlaceholderBox from '@fdk-frontend/ui/placeholder-box';
import ExternalLink from '@fdk-frontend/ui/external-link';
import SmartList from '@fdk-frontend/ui/smart-list';
import { DatasetDetailsProps, DatasetDetailsTabContext } from '../../';
import { printLocaleValue } from '@fdk-frontend/utils';

export const hasLegalBasis = (dataset: any) =>
    dataset.legalBasisForAccess || dataset.legalBasisForProcessing || dataset.legalBasisForRestriction;

const LegalDetails = ({ dataset, locale, dictionary }: DatasetDetailsProps) => {
    const { showEmptyRows } = useContext(DatasetDetailsTabContext);

    const printLegalBasis = (legalBasis: any) => {
        if (!legalBasis) return <PlaceholderText>{dictionary.details.noData}</PlaceholderText>;
        return (
            <SmartList
                items={legalBasis}
                renderItem={(legal: any) => (
                    <ExternalLink
                        href={legal.uri as string}
                        locale={locale}
                        gateway
                    >
                        {printLocaleValue(locale, legal.prefLabel)}
                    </ExternalLink>
                )}
            />
        );
    };

    return (
        <section>
            <Heading
                level={2}
                size='xxsmall'
            >
                {dictionary.details.legal.title}
            </Heading>
            {hasLegalBasis(dataset) ? (
                <dl>
                    {!dataset.legalBasisForAccess && !showEmptyRows ? null : (
                        <>
                            <dt>{dictionary.details.legal.legalBasisForAccess}:</dt>
                            <dd className='article'>{printLegalBasis(dataset.legalBasisForAccess)}</dd>
                        </>
                    )}
                    {!dataset.legalBasisForProcessing && !showEmptyRows ? null : (
                        <>
                            <dt>{dictionary.details.legal.legalBasisForProcessing}:</dt>
                            <dd className='article'>{printLegalBasis(dataset.legalBasisForProcessing)}</dd>
                        </>
                    )}
                    {!dataset.legalBasisForRestriction && !showEmptyRows ? null : (
                        <>
                            <dt>{dictionary.details.legal.legalBasisForRestriction}:</dt>
                            <dd className='article'>{printLegalBasis(dataset.legalBasisForRestriction)}</dd>
                        </>
                    )}
                </dl>
            ) : (
                <PlaceholderBox>{dictionary.details.noData}</PlaceholderBox>
            )}
        </section>
    );
};

export default LegalDetails;
