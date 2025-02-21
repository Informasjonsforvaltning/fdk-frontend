import { useContext } from 'react';
import { Heading, Link } from '@digdir/designsystemet-react';
import { ExternalLinkIcon } from '@navikt/aksel-icons';
import PlaceholderText from '../../../placeholder-text';
import PlaceholderBox from '../../../placeholder-box';
import { DatasetDetailsProps, DatasetDetailsContext } from '../../';
import { i18n } from '@fdk-frontend/dictionaries';

const ContactDetails = ({ dataset, locale, dictionary }: DatasetDetailsProps) => {

    const { showEmptyRows } = useContext(DatasetDetailsContext);

    const printContactPointOrgUnit = (contactPoint: any) => {
        return contactPoint.hasURL ?
            <Link href={contactPoint.hasURL}>
                {contactPoint.organizationUnit?.[locale] || contactPoint.organizationUnit?.[i18n.defaultLocale]}
                <ExternalLinkIcon />
            </Link> :
            contactPoint.organizationUnit?.[locale] || contactPoint.organizationUnit?.[i18n.defaultLocale];
    }

    return (
        <section>
            <Heading
                level={4}
                size='xxsmall'
            >
                {dictionary.details.contactPoint.title}
            </Heading>
            {
                dataset.contactPoint && dataset.contactPoint.length > 0 ?
                dataset.contactPoint.map((contactPoint: any, i: number) => (
                    <dl key={`contactPoint-${i}`}>
                        {
                            (!contactPoint.fullname && !showEmptyRows) ? null :
                            <>
                                <dt>{dictionary.details.contactPoint.fullname}:</dt>
                                <dd>
                                    {
                                        contactPoint.fullname || <PlaceholderText>{dictionary.details.noData}</PlaceholderText>
                                    }
                                </dd>
                            </>
                        }
                        {
                            (!contactPoint.organizationUnit && !showEmptyRows) ? null :
                            <>
                                <dt>{dictionary.details.contactPoint.organizationUnit}:</dt>
                                <dd>
                                    {
                                        contactPoint.organizationUnit ?
                                        printContactPointOrgUnit(contactPoint) :
                                        <PlaceholderText>{dictionary.details.noData}</PlaceholderText>
                                    }
                                </dd>
                            </>
                        }
                        {
                            (!contactPoint.email && !showEmptyRows) ? null :
                            <>
                                <dt>{dictionary.details.contactPoint.email}:</dt>
                                <dd>
                                    {
                                        contactPoint.email ?
                                        <Link href={`mailto:${contactPoint.email}`}>{contactPoint.email}</Link> :
                                        <PlaceholderText>{dictionary.details.noData}</PlaceholderText>
                                    }
                                </dd>
                            </>
                        }
                        {
                            (!contactPoint.hasTelephone && !showEmptyRows) ? null :
                            <>
                                <dt>{dictionary.details.contactPoint.telephone}:</dt>
                                <dd>
                                    {
                                        contactPoint.hasTelephone || <PlaceholderText>{dictionary.details.noData}</PlaceholderText>
                                    }
                                </dd>
                            </>
                        }
                    </dl>
                )) :
                <PlaceholderBox>{dictionary.details.noData}</PlaceholderBox>
            }
        </section>
    );
};

export default ContactDetails;
