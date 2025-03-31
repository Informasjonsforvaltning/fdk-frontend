import React from 'react';
import { Heading, Link } from '@digdir/designsystemet-react';
import { ExternalLinkIcon } from '@navikt/aksel-icons';
import PlaceholderBox from '@fdk-frontend/ui/placeholder-box';
import { DatasetDetailsProps } from '../../';
import { printLocaleValue } from '@fdk-frontend/utils';

const ConceptDetails = ({ dataset, locale, dictionary }: DatasetDetailsProps) => {
    console.log(dataset.subject);
    return (
        <section>
            <Heading
                level={2}
                size='xxsmall'
            >
                {dictionary.details.concepts.title}
            </Heading>
            {dataset?.subject ? (
                <dl>
                    {dataset.subject.map((subject: any) => {
                        return (
                            <React.Fragment key={subject.uri}>
                                <dt>
                                    <Link href={subject.uri}>
                                        {printLocaleValue(locale, subject.prefLabel) || subject.uri}
                                        <ExternalLinkIcon aria-hidden />
                                    </Link>
                                </dt>
                                <dd>{printLocaleValue(locale, subject.description)}</dd>
                            </React.Fragment>
                        );
                    })}
                </dl>
            ) : (
                <PlaceholderBox>{dictionary.details.noData}</PlaceholderBox>
            )}
        </section>
    );
};

export default ConceptDetails;
