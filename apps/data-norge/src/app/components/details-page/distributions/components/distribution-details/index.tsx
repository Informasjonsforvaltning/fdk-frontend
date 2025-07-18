import React from 'react';
import { Link } from '@digdir/designsystemet-react';
import { type LocaleCodes, type Dictionary } from '@fdk-frontend/dictionaries';
import { type Distribution, type SearchObject } from '@fellesdatakatalog/types';
import Markdown from '@fdk-frontend/ui/markdown';
import Box from '@fdk-frontend/ui/box';
import ExpandableContent from '@fdk-frontend/ui/expandable-content';
import { printLocaleValue } from '@fdk-frontend/utils';
import PlaceholderText from '@fdk-frontend/ui/placeholder-text';
import LicenseBoxLink from '@fdk-frontend/ui/license-box-link';
import ExternalLink from '@fdk-frontend/ui/external-link';
import SmartList from '@fdk-frontend/ui/smart-list';
import DList from '@fdk-frontend/ui/dlist';
import Article from '@fdk-frontend/ui/article';
import DownloadDistributionWidget from '@fdk-frontend/ui/download-distribution-widget';
import distStyles from '../../distributions.module.scss';

type DistributionDetailsProps = {
    distribution: Distribution;
    locale: LocaleCodes;
    dictionaries: {
        common: Dictionary;
        detailsPage: Dictionary;
    };
    resolvedDistributionDataServices?: SearchObject[];
    resolvedDistributionInformationModels?: SearchObject[];
};

const DistributionDetails = ({
    distribution,
    locale,
    dictionaries,
    resolvedDistributionDataServices = [],
    resolvedDistributionInformationModels = [],
}: DistributionDetailsProps) => {
    return (
        <>
            <DList>
                <dt>{dictionaries.detailsPage.distributions.details.description}:</dt>
                <dd>
                    {distribution.description ? (
                        <Box className={distStyles.descBox}>
                            <ExpandableContent maxHeight={100}>
                                <Article>
                                    <Markdown
                                        locale={locale}
                                        components={{
                                            a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
                                                <ExternalLink
                                                    {...props}
                                                    locale={locale}
                                                    gateway
                                                />
                                            ),
                                        }}
                                    >
                                        {printLocaleValue(locale, distribution.description)}
                                    </Markdown>
                                </Article>
                            </ExpandableContent>
                        </Box>
                    ) : (
                        <PlaceholderText>{dictionaries.detailsPage.distributions.details.noData}</PlaceholderText>
                    )}
                </dd>
                <dt>{dictionaries.detailsPage.distributions.details.accessURL}:</dt>
                <dd>
                    {distribution.accessURL?.length ? (
                        <SmartList
                            className='fdk-box-list'
                            listType='ol'
                            items={distribution.accessURL}
                            renderItem={(url) => (
                                <ExternalLink
                                    href={url}
                                    locale={locale}
                                    gateway
                                    className='fdk-box-link'
                                >
                                    {url}
                                </ExternalLink>
                            )}
                        />
                    ) : (
                        <PlaceholderText>{dictionaries.detailsPage.distributions.details.noData}</PlaceholderText>
                    )}
                </dd>
                <dt>{dictionaries.detailsPage.distributions.details.downloadURL}:</dt>
                <dd>
                    {distribution.downloadURL?.length ? (
                        <SmartList
                            className='fdk-box-list'
                            listType='ol'
                            items={distribution.downloadURL}
                            renderItem={(url) => (
                                <DownloadDistributionWidget
                                    title={printLocaleValue(locale, distribution.title)}
                                    downloadUrl={url}
                                    dictionary={dictionaries.detailsPage}
                                    locale={locale}
                                />
                            )}
                        />
                    ) : (
                        <PlaceholderText>{dictionaries.detailsPage.distributions.details.noData}</PlaceholderText>
                    )}
                </dd>
                <dt>{dictionaries.detailsPage.distributions.details.accessService}:</dt>
                <dd>
                    {distribution.accessService?.length ? (
                        <SmartList
                            className='fdk-box-list'
                            listType='ol'
                            items={distribution.accessService}
                            renderItem={(api) => {
                                const resolvedDataService = resolvedDistributionDataServices.find(
                                    (service) => service.uri === api.uri,
                                );

                                if (resolvedDataService) {
                                    return (
                                        <Link
                                            href={`/data-services/${resolvedDataService.id}`}
                                            className='fdk-box-link'
                                        >
                                            {printLocaleValue(locale, resolvedDataService.title) ||
                                                resolvedDataService.uri}
                                        </Link>
                                    );
                                }

                                return (
                                    <ExternalLink
                                        href={api.uri}
                                        locale={locale}
                                        gateway
                                        className='fdk-box-link'
                                    >
                                        {printLocaleValue(locale, api.title) || api.uri}
                                    </ExternalLink>
                                );
                            }}
                        />
                    ) : (
                        <PlaceholderText>{dictionaries.detailsPage.distributions.details.noData}</PlaceholderText>
                    )}
                </dd>
                <dt>{dictionaries.detailsPage.distributions.details.page}:</dt>
                <dd>
                    {distribution.page ? (
                        <SmartList
                            className='fdk-box-list'
                            listType='ol'
                            items={distribution.page}
                            renderItem={(page) => (
                                <ExternalLink
                                    href={page.uri}
                                    locale={locale}
                                    gateway
                                    className='fdk-box-link'
                                >
                                    {page.uri}
                                </ExternalLink>
                            )}
                        />
                    ) : (
                        <PlaceholderText>{dictionaries.detailsPage.distributions.details.noData}</PlaceholderText>
                    )}
                </dd>
                <dt>{dictionaries.detailsPage.distributions.details.license}:</dt>
                <dd>
                    {distribution.license ? (
                        <SmartList
                            listType='ol'
                            items={distribution.license}
                            renderItem={(license) => (
                                <LicenseBoxLink
                                    uri={license.uri}
                                    dictionary={dictionaries.common}
                                    locale={locale}
                                >
                                    {license.prefLabel ? printLocaleValue(locale, license.prefLabel) : license.uri}
                                </LicenseBoxLink>
                            )}
                        />
                    ) : (
                        <PlaceholderText>{dictionaries.detailsPage.distributions.details.noData}</PlaceholderText>
                    )}
                </dd>
                <dt>{dictionaries.detailsPage.distributions.details.conformsTo}:</dt>
                <dd>
                    {distribution.conformsTo ? (
                        <SmartList
                            className='fdk-box-list'
                            listType='ol'
                            items={distribution.conformsTo}
                            renderItem={(standard) => {
                                const resolvedInformationModel = resolvedDistributionInformationModels.find(
                                    (infoModel) => infoModel.uri === standard.uri,
                                );

                                if (resolvedInformationModel) {
                                    return (
                                        <Link
                                            href={`/information-models/${resolvedInformationModel.id}`}
                                            className='fdk-box-link'
                                        >
                                            {printLocaleValue(locale, resolvedInformationModel.title) ||
                                                resolvedInformationModel.uri}
                                        </Link>
                                    );
                                }

                                return (
                                    <ExternalLink
                                        href={standard.uri}
                                        locale={locale}
                                        gateway
                                        className='fdk-box-link'
                                    >
                                        {printLocaleValue(locale, standard.prefLabel) || standard.uri}
                                    </ExternalLink>
                                );
                            }}
                        />
                    ) : (
                        <PlaceholderText>{dictionaries.detailsPage.distributions.details.noData}</PlaceholderText>
                    )}
                </dd>
            </DList>
        </>
    );
};

export default DistributionDetails;
