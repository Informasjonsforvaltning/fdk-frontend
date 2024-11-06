import React, { PropsWithChildren } from 'react';

import { Heading, Link } from '@digdir/designsystemet-react';

import Article from '@fdk-frontend/ui/article';

import PlaceholderBox from '../../../placeholder-box';

const LegalDetails = ({ fields, ...props }: { fields: any } & PropsWithChildren) => {
    return (
        <section>
            <Heading
                level={4}
                size='xxsmall'
            >
                Lovhjemler
            </Heading>
            {fields !== null ? (
                <dl>
                    {Object.entries(fields).map(([key, value]) => {
                        return (
                            <React.Fragment key={key}>
                                <dt>{key}:</dt>
                                <dd>
                                    <Article>
                                        <ol>
                                            {(value as string[]).map((v) => (
                                                <li key={v}>
                                                    <Link href='#'>{v}</Link>
                                                </li>
                                            ))}
                                        </ol>
                                    </Article>
                                </dd>
                            </React.Fragment>
                        );
                    })}
                </dl>
            ) : (
                <PlaceholderBox>Ingen lovhjemler oppgitt</PlaceholderBox>
            )}
        </section>
    );
};

export default LegalDetails;
