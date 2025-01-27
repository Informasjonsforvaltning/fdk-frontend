import React, { useContext } from 'react';
import { Heading, Link } from '@digdir/designsystemet-react';
import { ExternalLinkIcon } from '@navikt/aksel-icons';
import PlaceholderText from '../../../placeholder-text';
import PlaceholderBox from '../../../placeholder-box';
import { DatasetDetailsProps, DatasetDetailsContext } from '../../';
import { printLocaleValue } from '../../utils';

export const hasLegalBasis = (dataset: any) =>  
    dataset.legalBasisForAccess || 
    dataset.legalBasisForProcessing ||
    dataset.legalBasisForRestriction;

const LegalDetails = ({ dataset, locale }: DatasetDetailsProps) => {

    const { showEmptyRows } = useContext(DatasetDetailsContext);

    const printLegalBasis = (legalBasis: any) => {
        if (!legalBasis) return <PlaceholderText>Ikke oppgitt</PlaceholderText>;
        return (
            <ol>
                {
                    legalBasis.map((legal: any) => (
                        <li key={legal.uri}>
                            <Link href={legal.uri}>
                                {printLocaleValue(legal.prefLabel, locale)}
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
                Lovhjemler
            </Heading>
            {
                hasLegalBasis(dataset) ?
                <dl>
                    {
                        (!dataset.legalBasisForAccess && !showEmptyRows) ? null :
                        <>
                            <dt>Utleveringshjemmel:</dt>
                            <dd>{printLegalBasis(dataset.legalBasisForAccess)}</dd>
                        </>
                    }
                    {
                        (!dataset.legalBasisForProcessing && !showEmptyRows) ? null :
                        <>
                            <dt>Behandlingshjemmel:</dt>
                            <dd>{printLegalBasis(dataset.legalBasisForProcessing)}</dd>
                        </>
                    }
                    {
                        (!dataset.legalBasisForRestriction && !showEmptyRows) ? null :
                        <>
                            <dt>Utleveringshjemmel:</dt>
                            <dd>{printLegalBasis(dataset.legalBasisForRestriction)}</dd>
                        </>
                    }
                </dl> :
                <PlaceholderBox>Ikke oppgitt</PlaceholderBox>
            }
        </section>
    );
};

export default LegalDetails;
