import { useContext } from 'react';
import { Heading, Link } from '@digdir/designsystemet-react';
import PlaceholderText from '@fdk-frontend/ui/placeholder-text';
import PlaceholderBox from '@fdk-frontend/ui/placeholder-box';
import ExternalLink from '@fdk-frontend/ui/external-link';
import { DatasetDetailsProps, DatasetDetailsTabContext } from '../../';
import { i18n } from '@fdk-frontend/dictionaries';

const ContactDetails = ({ dataset, locale, dictionary }: DatasetDetailsProps) => {
    const { showEmptyRows } = useContext(DatasetDetailsTabContext);

    const printContactPointOrgUnit = (contactPoint: any) => {
        return contactPoint.hasURL
            ? contactPoint.organizationUnit?.[locale] || contactPoint.organizationUnit?.[i18n.defaultLocale]
            : contactPoint.organizationUnit?.[locale] || contactPoint.organizationUnit?.[i18n.defaultLocale];
    };

    return (
        <section>
            <Heading
                level={2}
                size='xxsmall'
            >
                {dictionary.details.contactPoint.title}
            </Heading>
            {dataset.contactPoint && dataset.contactPoint.length > 0 ? (
                dataset.contactPoint.map((contactPoint: any, i: number) => (
                    <dl key={`contactPoint-${i}`}>
                        {!contactPoint.organizationUnit && !showEmptyRows ? null : (
                            <>
                                <dt>{dictionary.details.contactPoint.organizationUnit}:</dt>
                                <dd>
                                    {contactPoint.organizationUnit ? (
                                        printContactPointOrgUnit(contactPoint)
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
                                        <ExternalLink href={contactPoint.hasURL}>
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
                    </dl>
                ))
            ) : (
                <PlaceholderBox>{dictionary.details.noData}</PlaceholderBox>
            )}
        </section>
    );
};

export default ContactDetails;
