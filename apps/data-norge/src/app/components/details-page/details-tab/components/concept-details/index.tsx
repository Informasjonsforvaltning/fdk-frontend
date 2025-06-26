import React from 'react';
import { Heading, Link } from '@digdir/designsystemet-react';
import PlaceholderBox from '@fdk-frontend/ui/placeholder-box';
import DList from '@fdk-frontend/ui/dlist';
import { DatasetDetailsProps } from '../../';
import { printLocaleValue } from '@fdk-frontend/utils';

const ConceptDetails = ({ dataset, locale, dictionary, concepts }: DatasetDetailsProps) => {
    return (
        <section>
            <Heading
                level={2}
                size='xxsmall'
            >
                {dictionary.details.concepts.title}
            </Heading>
            {concepts && concepts.length ? (
                <DList>
                    {concepts.map((concept: any) => {
                        return (
                            <React.Fragment key={concept.uri}>
                                <dt>
                                    <Link href={`/concepts/${concept.id}`}>
                                        {printLocaleValue(locale, concept.title) || concept.uri}
                                    </Link>
                                </dt>
                                <dd>{printLocaleValue(locale, concept.description)}</dd>
                            </React.Fragment>
                        );
                    })}
                </DList>
            ) : (
                <PlaceholderBox>{dictionary.details.noData}</PlaceholderBox>
            )}
        </section>
    );
};

export default ConceptDetails;
