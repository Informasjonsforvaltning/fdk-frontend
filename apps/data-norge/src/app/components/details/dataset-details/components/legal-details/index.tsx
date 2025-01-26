import React, { PropsWithChildren, useContext } from 'react';
import { Heading, Link, HelpText, Paragraph } from '@digdir/designsystemet-react';
import Article from '@fdk-frontend/ui/article';
import HStack from '@fdk-frontend/ui/hstack';
import { ExternalLinkIcon } from '@navikt/aksel-icons';

import PlaceholderText from '../../../placeholder-text';
import PlaceholderBox from '../../../placeholder-box';
import { DatasetDetailsProps, DatasetDetailsContext } from '../../';
import { printLocaleValue } from '../../utils';
import { type Dictionary, i18n } from '@fdk-frontend/dictionaries';

export const hasLegalBasis = (dataset) =>  
    dataset.legalBasisForAccess || 
    dataset.legalBasisForProcessing ||
    dataset.legalBasisForRestriction;

const LegalDetails = ({ dataset, locale }: DatasetDetailsProps) => {

    const { showEmptyRows } = useContext(DatasetDetailsContext);

    const printLegalBasis = (legalBasis, locale) => {
        if (!legalBasis) return <PlaceholderText>Ikke oppgitt</PlaceholderText>;
        return (
            <ol>
                {
                    legalBasis.map(legal => (
                        <li>
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
                            <dd>{printLegalBasis(dataset.legalBasisForAccess, locale)}</dd>
                        </>
                    }
                    {
                        (!dataset.legalBasisForProcessing && !showEmptyRows) ? null :
                        <>
                            <dt>Behandlingshjemmel:</dt>
                            <dd>{printLegalBasis(dataset.legalBasisForProcessing, locale)}</dd>
                        </>
                    }
                    {
                        (!dataset.legalBasisForRestriction && !showEmptyRows) ? null :
                        <>
                            <dt>Utleveringshjemmel:</dt>
                            <dd>{printLegalBasis(dataset.legalBasisForRestriction, locale)}</dd>
                        </>
                    }
                </dl> :
                <PlaceholderBox>Ikke oppgitt</PlaceholderBox>
            }
        </section>
    );
};

export default LegalDetails;
