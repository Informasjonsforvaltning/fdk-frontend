import React from 'react';
import { Heading, Link } from '@digdir/designsystemet-react';
import { ExternalLinkIcon } from '@navikt/aksel-icons';
import PlaceholderBox from '../../../placeholder-box';
import { DatasetDetailsProps } from '../../';
import { printLocaleValue } from '../../utils';

const ConceptDetails = ({ dataset, locale }: DatasetDetailsProps) => {
    return (
        <section>
            <Heading
                level={4}
                size='xxsmall'
            >
                Begreper brukt i datasett
            </Heading>
            {
                dataset.subject ?
                <dl>
                    {
                        dataset.subject.map(subject => {
                            return (
                                <React.Fragment key={subject.uri}>
                                    <dt>
                                        <Link href={subject.uri}>
                                            {printLocaleValue(subject.prefLabel, locale)}
                                            <ExternalLinkIcon />
                                        </Link>
                                    </dt>
                                    <dd>{printLocaleValue(subject.definition, locale)}</dd>
                                </React.Fragment>
                            );
                        })
                    }
                </dl> :
                <PlaceholderBox>Ikke oppgitt</PlaceholderBox>
            }
        </section>
    );
};

export default ConceptDetails;
