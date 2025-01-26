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

const ConceptDetails = ({ dataset, locale }: DatasetDetailsProps) => {

    const { showEmptyRows } = useContext(DatasetDetailsContext);

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
