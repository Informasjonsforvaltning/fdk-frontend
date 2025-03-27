import { Link } from '@digdir/designsystemet-react';
import { type LocaleCodes, type Dictionary } from '@fdk-frontend/dictionaries';
import { type Distribution } from '@fdk-frontend/fdk-types';
import Markdown from '@fdk-frontend/ui/markdown';
import Box from '@fdk-frontend/ui/box';
import ExpandableContent from '@fdk-frontend/ui/expandable-content';
import { printLocaleValue, isOpenLicense } from '@fdk-frontend/utils';
import detailsPageStyles from '../../../details-page.module.scss';
import PlaceholderText from '@fdk-frontend/ui/placeholder-text';
import OpenLicenseTag from '@fdk-frontend/ui/open-license-tag';

type DistributionDetailsProps = {
    distribution: Distribution;
    locale: LocaleCodes;
    dictionaries: {
        common: Dictionary;
        detailsPage: Dictionary;
    };
};

const DistributionDetails = ({ distribution, locale, dictionaries }: DistributionDetailsProps) => {
    return (
        <>
            <dl>
                <dt>{dictionaries.detailsPage.distributions.details.description}:</dt>
                <dd>
                    {distribution.description ? (
                        <Box className={detailsPageStyles.descBox}>
                            <ExpandableContent maxHeight={100}>
                                <article className={detailsPageStyles.article}>
                                    <Markdown>{printLocaleValue(locale, distribution.description)}</Markdown>
                                </article>
                            </ExpandableContent>
                        </Box>
                    ) : (
                        <PlaceholderText>{dictionaries.detailsPage.distributions.details.noData}</PlaceholderText>
                    )}
                </dd>
                <dt>{dictionaries.detailsPage.distributions.details.accessURL}:</dt>
                <dd>
                    {distribution.accessURL ? (
                        <Link href='#'>{distribution.accessURL}</Link>
                    ) : (
                        <PlaceholderText>{dictionaries.detailsPage.distributions.details.noData}</PlaceholderText>
                    )}
                </dd>
                <dt>{dictionaries.detailsPage.distributions.details.downloadURL}:</dt>
                <dd>
                    {distribution.downloadURL ? (
                        <Link href='#'>{distribution.downloadURL}</Link>
                    ) : (
                        <PlaceholderText>{dictionaries.detailsPage.distributions.details.noData}</PlaceholderText>
                    )}
                </dd>
                <dt>{dictionaries.detailsPage.distributions.details.accessService}:</dt>
                <dd>
                    {distribution.accessService?.length ? (
                        <ol>
                            {
                                distribution.accessService.map((api: any) => (
                                    <li>
                                        <Link
                                            key={api.uri}
                                            href='#'
                                        >
                                            {printLocaleValue(locale, api.title) || api.uri}
                                        </Link>
                                    </li>
                                ))
                            }
                        </ol>
                    ) : (
                        <PlaceholderText>{dictionaries.detailsPage.distributions.details.noData}</PlaceholderText>
                    )}
                </dd>
                <dt>{dictionaries.detailsPage.distributions.details.page}:</dt>
                <dd>
                    {distribution.page ? (
                        distribution.page.map((page: any) => (
                            <Link
                                key={page.uri}
                                href={page.uri}
                            >
                                {page.uri}
                            </Link>
                        ))
                    ) : (
                        <PlaceholderText>{dictionaries.detailsPage.distributions.details.noData}</PlaceholderText>
                    )}
                </dd>
                <dt>{dictionaries.detailsPage.distributions.details.license}:</dt>
                <dd>
                    {distribution.license ? (
                        distribution.license.map((license: any) => (
                            <div key={license.uri}>
                                <Link href={license.uri}>
                                    {license.prefLabel ? printLocaleValue(locale, license.prefLabel) : license.uri}
                                </Link>
                                {isOpenLicense(license.uri) && <OpenLicenseTag dictionary={dictionaries.common} />}
                            </div>
                        ))
                    ) : (
                        <PlaceholderText>{dictionaries.detailsPage.distributions.details.noData}</PlaceholderText>
                    )}
                </dd>
                <dt>{dictionaries.detailsPage.distributions.details.conformsTo}:</dt>
                <dd>
                    {distribution.conformsTo ? (
                        distribution.conformsTo.map((standard: any) => (
                            <Link
                                href={standard.uri}
                                key={standard.uri}
                            >
                                {standard.prefLabel ? printLocaleValue(locale, standard.prefLabel) : standard.uri}
                            </Link>
                        ))
                    ) : (
                        <PlaceholderText>{dictionaries.detailsPage.distributions.details.noData}</PlaceholderText>
                    )}
                </dd>
            </dl>
        </>
    );
};

export default DistributionDetails;
