import React, { useContext } from 'react';
import { Heading, Link } from '@digdir/designsystemet-react';
import { ExternalLinkIcon } from '@navikt/aksel-icons';
import PlaceholderText from '../../../placeholder-text';
import PlaceholderBox from '../../../placeholder-box';
import { DatasetDetailsProps, DatasetDetailsContext } from '../../';
import { printLocaleValue } from '@fdk-frontend/utils';

export const hasLegalBasis = (dataset: any) =>  
    dataset.legalBasisForAccess || 
    dataset.legalBasisForProcessing ||
    dataset.legalBasisForRestriction;

const LegalDetails = ({ dataset, locale, dictionary }: DatasetDetailsProps) => {

    const { showEmptyRows } = useContext(DatasetDetailsContext);

    const printLegalBasis = (legalBasis: any) => {
        if (!legalBasis) return <PlaceholderText>{dictionary.details.legal.title}</PlaceholderText>;
        return (
            <ol>
                {
                    legalBasis.map((legal: any) => (
                        <li key={legal.uri}>
                            <Link href={legal.uri}>
                                {printLocaleValue(locale, legal.prefLabel)}
                                <ExternalLinkIcon />
                            </Link>
                        </li>
                    ))
                }
            </ol>
        );
    };

    return (
        <section>
            <Heading
                level={4}
                size='xxsmall'
            >
                {dictionary.details.legal.title}
            </Heading>
            {
                hasLegalBasis(dataset) ?
                <dl>
                    {
                        (!dataset.legalBasisForAccess && !showEmptyRows) ? null :
                        <>
                            <dt>{dictionary.details.legal.legalBasisForAccess}:</dt>
                            <dd>{printLegalBasis(dataset.legalBasisForAccess)}</dd>
                        </>
                    }
                    {
                        (!dataset.legalBasisForProcessing && !showEmptyRows) ? null :
                        <>
                            <dt>{dictionary.details.legal.legalBasisForProcessing}:</dt>
                            <dd>{printLegalBasis(dataset.legalBasisForProcessing)}</dd>
                        </>
                    }
                    {
                        (!dataset.legalBasisForRestriction && !showEmptyRows) ? null :
                        <>
                            <dt>{dictionary.details.legal.legalBasisForRestriction}:</dt>
                            <dd>{printLegalBasis(dataset.legalBasisForRestriction)}</dd>
                        </>
                    }
                </dl> :
                <PlaceholderBox>{dictionary.details.noData}</PlaceholderBox>
            }
        </section>
    );
};

export default LegalDetails;
