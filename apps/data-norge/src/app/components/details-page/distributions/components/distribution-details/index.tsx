import React from 'react';
import { type LocaleCodes, type Dictionary } from '@fdk-frontend/dictionaries';
import { type Distribution } from '@fdk-frontend/fdk-types';
import Markdown from '@fdk-frontend/ui/markdown';
import Box from '@fdk-frontend/ui/box';
import ExpandableContent from '@fdk-frontend/ui/expandable-content';
import { printLocaleValue } from '@fdk-frontend/utils';
import PlaceholderText from '@fdk-frontend/ui/placeholder-text';
import LicenseBoxLink from '@fdk-frontend/ui/license-box-link';
import ExternalLink from '@fdk-frontend/ui/external-link';
import SmartList from '@fdk-frontend/ui/smart-list';
import DownloadDistributionWidget from '@fdk-frontend/ui/download-distribution-widget';
import detailsPageStyles from '../../../details-page.module.scss';

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
                                </article>
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
                            className='fdk-link-list'
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
                            className='fdk-link-list'
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
                            className='fdk-link-list'
                            listType='ol'
                            items={distribution.accessService}
                            renderItem={(api) => (
                                <ExternalLink
                                    href={api.uri}
                                    locale={locale}
                                    gateway
                                    className='fdk-box-link'
                                >
                                    {printLocaleValue(locale, api.title) || api.uri}
                                </ExternalLink>
                            )}
                        />
                    ) : (
                        <PlaceholderText>{dictionaries.detailsPage.distributions.details.noData}</PlaceholderText>
                    )}
                </dd>
                <dt>{dictionaries.detailsPage.distributions.details.page}:</dt>
                <dd>
                    {distribution.page ? (
                        <SmartList
                            className='fdk-link-list'
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
                                <LicenseBoxLink uri={license.uri} dictionary={dictionaries.common} locale={locale}>
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
                            className='fdk-link-list'
                            listType='ol'
                            items={distribution.conformsTo}
                            renderItem={(standard) => (
                                <ExternalLink
                                    href={standard.uri}
                                    locale={locale}
                                    gateway
                                    className='fdk-box-link'
                                >
                                    {standard.prefLabel ? printLocaleValue(locale, standard.prefLabel) : standard.uri}
                                </ExternalLink>
                            )}
                        />
                    ) : (
                        <PlaceholderText>{dictionaries.detailsPage.distributions.details.noData}</PlaceholderText>
                    )}
                </dd>
            </dl>
        </>
    );
};

export default DistributionDetails;
