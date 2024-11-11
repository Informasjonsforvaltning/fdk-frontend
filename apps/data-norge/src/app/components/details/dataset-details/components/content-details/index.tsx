import React, { PropsWithChildren, useContext } from 'react';
import { Heading, Link, HelpText, Paragraph } from '@digdir/designsystemet-react';
import Article from '@fdk-frontend/ui/article';
import HStack from '@fdk-frontend/ui/hstack';

import PlaceholderText from '../../../placeholder-text';
import { DatasetDetailsContext } from '../../';

const ContentDetails = ({ fields, ...props }: { fields: any } & PropsWithChildren) => {
    const { showEmptyRows } = useContext(DatasetDetailsContext);

    const renderContentValue = (value: any) => {
        if (!value) return <PlaceholderText>Ikke oppgitt</PlaceholderText>;
        if (Array.isArray(value)) {
            return (
                <Article>
                    <ol>
                        {value.map((v) => (
                            <li key={v}>
                                <Link href='#'>{v}</Link>
                            </li>
                        ))}
                    </ol>
                </Article>
            );
        }
        if (value.startsWith('http')) return <Link href='#'>{value}</Link>;
        return value;
    };

    return (
        <section>
            <Heading
                level={4}
                size='xxsmall'
            >
                Innhold
            </Heading>
            <dl>
                {Object.entries(fields).map(([key, value]) => {
                    if (!showEmptyRows && fields[key] === null) return false;

                    return (
                        <React.Fragment key={key}>
                            <dt>
                                {key === 'I samsvar med' ? (
                                    <HStack>
                                        {key}:
                                        <HelpText
                                            title='Begrepsforklaring'
                                            size='sm'
                                            style={{ transform: 'scale(0.75)' }}
                                        >
                                            <Paragraph size='sm'>
                                                Referanse til en implementasjonsregel eller annen spesifikasjon, som
                                                ligger til grunn for opprettelsen av datasettet.
                                                <Link href='https://data.norge.no/specification/dcat-ap-no#Datasett-iSamsvarMed'>
                                                    Les mer her
                                                </Link>
                                            </Paragraph>
                                        </HelpText>
                                    </HStack>
                                ) : (
                                    `${key}:`
                                )}
                            </dt>
                            <dd>{renderContentValue(value)}</dd>
                        </React.Fragment>
                    );
                })}
            </dl>
        </section>
    );
};

export default ContentDetails;
