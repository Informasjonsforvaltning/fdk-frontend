import React, { useContext } from 'react';
import { Heading } from '@digdir/designsystemet-react';
import { PlaceholderText, PlaceholderBox, ExternalLink, SmartList, Dlist } from '@fdk-frontend/ui';
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
                data-size='xs'
            >
                {dictionary.details.legal.title}
            </Heading>
            {hasLegalBasis(dataset) ? (
                <Dlist>
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
                </Dlist>
            ) : (
                <PlaceholderBox>{dictionary.details.noData}</PlaceholderBox>
            )}
        </section>
    );
};

export default LegalDetails;
