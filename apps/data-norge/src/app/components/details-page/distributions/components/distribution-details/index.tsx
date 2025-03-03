import { Link } from '@digdir/designsystemet-react';
import { type LocaleCodes, type Dictionary } from '@fdk-frontend/dictionaries';
import { type JSONValue } from '@fdk-frontend/types';
import Markdown from '@fdk-frontend/ui/markdown';
import Box from '@fdk-frontend/ui/box';
import ExpandableContent from '@fdk-frontend/ui/expandable-content';
import { printLocaleValue, isOpenLicense } from '@fdk-frontend/utils';
import detailsPageStyles from '../../../details-page.module.scss';
import PlaceholderText from '@fdk-frontend/ui/placeholder-text';
import OpenLicenseTag from '@fdk-frontend/ui/open-license-tag';

type DistributionDetailsProps = {
    distribution: JSONValue;
    locale: LocaleCodes;
    dictionary: Dictionary;
};

const DistributionDetails = ({ distribution, locale, dictionary }: DistributionDetailsProps) => {
    return (
        <>
            <dl>
                <dt>{dictionary.distributions.details.description}:</dt>
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
                        <PlaceholderText>{dictionary.distributions.details.noData}</PlaceholderText>
                    )}
                </dd>
                <dt>{dictionary.distributions.details.accessURL}:</dt>
                <dd>
                    {distribution.accessURL ? (
                        <Link href='#'>{distribution.accessURL}</Link>
                    ) : (
                        <PlaceholderText>{dictionary.distributions.details.noData}</PlaceholderText>
                    )}
                </dd>
                <dt>{dictionary.distributions.details.downloadURL}:</dt>
                <dd>
                    {distribution.downloadURL ? (
                        <Link href='#'>{distribution.downloadURL}</Link>
                    ) : (
                        <PlaceholderText>{dictionary.distributions.details.noData}</PlaceholderText>
                    )}
                </dd>
                <dt>{dictionary.distributions.details.accessService}:</dt>
                <dd>
                    {distribution.accessService ? (
                        distribution.accessService.map((api: any) => (
                            <Link
                                key={api.uri}
                                href='#'
                            >
                                {api.uri}
                            </Link>
                        ))
                    ) : (
                        <PlaceholderText>{dictionary.distributions.details.noData}</PlaceholderText>
                    )}
                </dd>
                <dt>{dictionary.distributions.details.page}:</dt>
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
                        <PlaceholderText>{dictionary.distributions.details.noData}</PlaceholderText>
                    )}
                </dd>
                <dt>{dictionary.distributions.details.license}:</dt>
                <dd>
                    {distribution.license ? (
                        distribution.license.map((license: any) => (
                            <div key={license.uri}>
                                <Link href={license.uri}>
                                    {license.prefLabel ? printLocaleValue(locale, license.prefLabel) : license.uri}
                                </Link>
                                {isOpenLicense(license.uri) && <OpenLicenseTag dictionary={dictionary} />}
                            </div>
                        ))
                    ) : (
                        <PlaceholderText>{dictionary.distributions.details.noData}</PlaceholderText>
                    )}
                </dd>
                <dt>{dictionary.distributions.details.conformsTo}:</dt>
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
                        <PlaceholderText>{dictionary.distributions.details.noData}</PlaceholderText>
                    )}
                </dd>
            </dl>
        </>
    );
};

export default DistributionDetails;
