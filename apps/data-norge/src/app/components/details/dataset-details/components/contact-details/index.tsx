import { PropsWithChildren, useContext } from 'react';

import { Heading, Link } from '@digdir/designsystemet-react';
import { ExternalLinkIcon } from '@navikt/aksel-icons';

import PlaceholderText from '../../../placeholder-text';
import { DatasetDetailsContext } from '../../';

const ContactDetails = ({ fields, ...props }: { fields: any } & PropsWithChildren) => {
    const { showEmptyRows } = useContext(DatasetDetailsContext);

    return (
        <section>
            <Heading
                level={4}
                size='xxsmall'
            >
                Kontaktinformasjon
            </Heading>
            <dl>
                <dt>Kontaktpunkt:</dt>
                <dd>
                    <Link href='#'>
                        {fields['Kontaktpunkt']}
                        <ExternalLinkIcon />
                    </Link>
                </dd>
                <dt>E-post:</dt>
                <dd>
                    <Link href='#'>{fields['E-post']}</Link>
                </dd>
                {fields['Telefon'] !== null ||
                    (showEmptyRows && (
                        <>
                            <dt>Telefon:</dt>
                            <dd>
                                {fields['Telefon'] ? (
                                    <Link href='#'>{fields['Telefon']}</Link>
                                ) : (
                                    <PlaceholderText>Ikke oppgitt</PlaceholderText>
                                )}
                            </dd>
                        </>
                    ))}
            </dl>
        </section>
    );
};

export default ContactDetails;