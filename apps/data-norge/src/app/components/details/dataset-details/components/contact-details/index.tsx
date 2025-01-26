import { useContext } from 'react';
import { Heading, Link } from '@digdir/designsystemet-react';
import { ExternalLinkIcon } from '@navikt/aksel-icons';
import PlaceholderText from '../../../placeholder-text';
import PlaceholderBox from '../../../placeholder-box';
import { DatasetDetailsProps, DatasetDetailsContext } from '../../';
import { i18n } from '@fdk-frontend/dictionaries';

const ContactDetails = ({ dataset, locale }: DatasetDetailsProps) => {

    const { showEmptyRows } = useContext(DatasetDetailsContext);

    const printContactPointOrgUnit = (contactPoint) => {
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
                Kontaktinformasjon
            </Heading>
            {
                dataset.contactPoint && dataset.contactPoint.length > 0 ?
                dataset.contactPoint.map((contactPoint, i) => (
                    <dl key={`contactPoint-${i}`}>
                        {
                            (!contactPoint.fullname && !showEmptyRows) ? null :
                            <>
                                <dt>Kontaktperson:</dt>
                                <dd>
                                    {
                                        contactPoint.fullname || <PlaceholderText>Ikke oppgitt</PlaceholderText>
                                    }
                                </dd>
                            </>
                        }
                        {
                            (!contactPoint.organizationUnit && !showEmptyRows) ? null :
                            <>
                                <dt>Enhet:</dt>
                                <dd>
                                    {
                                        contactPoint.organizationUnit ?
                                        printContactPointOrgUnit(contactPoint) :
                                        <PlaceholderText>Ikke oppgitt</PlaceholderText>
                                    }
                                </dd>
                            </>
                        }
                        {
                            (!contactPoint.email && !showEmptyRows) ? null :
                            <>
                                <dt>E-post:</dt>
                                <dd>
                                    {
                                        contactPoint.email ?
                                        <Link href={`mailto:${contactPoint.email}`}>{contactPoint.email}</Link> :
                                        <PlaceholderText>Ikke oppgitt</PlaceholderText>
                                    }
                                </dd>
                            </>
                        }
                        {
                            (!contactPoint.hasTelephone && !showEmptyRows) ? null :
                            <>
                                <dt>Telefon:</dt>
                                <dd>
                                    {
                                        contactPoint.hasTelephone || <PlaceholderText>Ikke oppgitt</PlaceholderText>
                                    }
                                </dd>
                            </>
                        }
                    </dl>
                )) :
                <PlaceholderBox>Ikke oppgitt</PlaceholderBox>
            }
        </section>
    );
};

export default ContactDetails;
