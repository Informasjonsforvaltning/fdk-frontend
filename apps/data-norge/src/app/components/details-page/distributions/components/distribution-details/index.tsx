import React from 'react';
import { Link } from '@digdir/designsystemet-react';
import { type LocaleCodes, type Localization } from '@fdk-frontend/localization';
import { printLocaleValue } from '@fdk-frontend/utils';
import { type Distribution, type SearchObject } from '@fellesdatakatalog/types';
import {
    Markdown,
    Box,
    ExpandableContent,
    PlaceholderText,
    LicenseBoxLink,
    ExternalLink,
    SmartList,
    Dlist,
    Article,
    DownloadDistributionWidget,
    noHeadings,
} from '@fdk-frontend/ui';
import distStyles from '../../distributions.module.scss';

type DistributionDetailsProps = {
    distribution: Distribution;
    locale: LocaleCodes;
    dictionaries: {
        common: Localization;
        detailsPage: Localization;
    };
    isRelatedToTransportportal?: boolean;
    resolvedDistributionDataServices?: SearchObject[];
    resolvedDistributionInformationModels?: SearchObject[];
};

const DistributionDetails = ({
    distribution,
    locale,
    dictionaries,
    isRelatedToTransportportal,
    resolvedDistributionDataServices = [],
    resolvedDistributionInformationModels = [],
}: DistributionDetailsProps) => {
    return (
        <>
            <Dlist>
                <dt>{dictionaries.detailsPage.distributions.details.description}:</dt>
                <dd>
                    {distribution.description ? (
                        <Box className={distStyles.descBox}>
                            <ExpandableContent maxHeight={100}>
                                <Article>
                                    <Markdown
                                        locale={locale}
                                        allowedElements={noHeadings}
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
                <dt>{dictionaries.detailsPage.distributions.details.status}:</dt>
                <dd>
                    {distribution?.status?.prefLabel ? (
                        <span>{printLocaleValue(locale, distribution.status.prefLabel)}</span>
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
                                    openLicenseLabel={dictionaries.detailsPage.distributions.header.openLicense}
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
                <dt>{dictionaries.detailsPage.distributions.details.rightsType}:</dt>
                <dd>
                    {distribution?.rights?.type?.prefLabel ? (
                        <span>{printLocaleValue(locale, distribution?.rights?.type?.prefLabel)}</span>
                    ) : (
                        <PlaceholderText>{dictionaries.detailsPage.distributions.details.noData}</PlaceholderText>
                    )}
                </dd>
                {!isRelatedToTransportportal ? null : (
                    <>
                        <dt>{dictionaries.detailsPage.distributions.details.mobilityDataStandard}:</dt>
                        <dd>
                            {distribution?.mobilityDataStandard?.prefLabel ? (
                                <span>{printLocaleValue(locale, distribution.mobilityDataStandard.prefLabel)}</span>
                            ) : (
                                <PlaceholderText>
                                    {dictionaries.detailsPage.distributions.details.noData}
                                </PlaceholderText>
                            )}
                        </dd>
                    </>
                )}
            </Dlist>
        </>
    );
};

export default DistributionDetails;
