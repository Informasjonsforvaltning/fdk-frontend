import { useContext } from 'react';
import { Heading, Link } from '@digdir/designsystemet-react';
import { PlaceholderText, PlaceholderBox, ExternalLink, Dlist } from '@fdk-frontend/ui';
import { DatasetDetailsProps, DatasetDetailsTabContext } from '../../';
import { i18n } from '@fdk-frontend/localization';

const ContactDetails = ({ dataset, locale, dictionary }: DatasetDetailsProps) => {
    const { showEmptyRows } = useContext(DatasetDetailsTabContext);

    const printContactPointName = (contactPoint: any) => {
        return contactPoint.formattedName?.[locale] || contactPoint.formattedName?.[i18n.defaultLocale];
    };

    return (
        <section>
            <Heading
                level={2}
                data-size='xs'
            >
                {dictionary.details.contactPoint.title}
            </Heading>
            {dataset.contactPoint && dataset.contactPoint.length > 0 ? (
                dataset.contactPoint.map((contactPoint: any, i: number) => (
                    <Dlist key={`contactPoint-${i}`}>
                        {!contactPoint.formattedName && !showEmptyRows ? null : (
                            <>
                                <dt>{dictionary.details.contactPoint.formattedName}:</dt>
                                <dd>
                                    {contactPoint.formattedName ? (
                                        printContactPointName(contactPoint)
                                    ) : (
                                        <PlaceholderText>{dictionary.details.noData}</PlaceholderText>
                                    )}
                                </dd>
                            </>
                        )}
                        {!contactPoint.hasURL && !showEmptyRows ? null : (
                            <>
                                <dt>{dictionary.details.contactPoint.uri}:</dt>
                                <dd>
                                    {contactPoint.hasURL ? (
                                        <ExternalLink
                                            href={contactPoint.hasURL}
                                            locale={locale}
                                            gateway
                                        >
                                            {contactPoint.hasURL}
                                        </ExternalLink>
                                    ) : (
                                        <PlaceholderText>{dictionary.details.noData}</PlaceholderText>
                                    )}
                                </dd>
                            </>
                        )}
                        {!contactPoint.email && !showEmptyRows ? null : (
                            <>
                                <dt>{dictionary.details.contactPoint.email}:</dt>
                                <dd>
                                    {contactPoint.email ? (
                                        <Link href={`mailto:${contactPoint.email}`}>{contactPoint.email}</Link>
                                    ) : (
                                        <PlaceholderText>{dictionary.details.noData}</PlaceholderText>
                                    )}
                                </dd>
                            </>
                        )}
                        {!contactPoint.hasTelephone && !showEmptyRows ? null : (
                            <>
                                <dt>{dictionary.details.contactPoint.telephone}:</dt>
                                <dd>
                                    {contactPoint.hasTelephone || (
                                        <PlaceholderText>{dictionary.details.noData}</PlaceholderText>
                                    )}
                                </dd>
                            </>
                        )}
                    </Dlist>
                ))
            ) : (
                <PlaceholderBox>{dictionary.details.noData}</PlaceholderBox>
            )}
        </section>
    );
};

export default ContactDetails;
