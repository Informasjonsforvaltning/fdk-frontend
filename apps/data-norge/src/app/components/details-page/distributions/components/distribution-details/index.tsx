import React from 'react';
import { type LocaleCodes, type Dictionary } from '@fdk-frontend/dictionaries';
import { type Distribution } from '@fdk-frontend/fdk-types';
import Markdown from '@fdk-frontend/ui/markdown';
import VStack from '@fdk-frontend/ui/vstack';
import Box from '@fdk-frontend/ui/box';
import DatasetPreviewWidget from '@fdk-frontend/ui/dataset-preview-widget';
import ExpandableContent from '@fdk-frontend/ui/expandable-content';
import { printLocaleValue, isOpenLicense } from '@fdk-frontend/utils';
import PlaceholderText from '@fdk-frontend/ui/placeholder-text';
import OpenLicenseTag from '@fdk-frontend/ui/open-license-tag';
import ExternalLink from '@fdk-frontend/ui/external-link';
import SmartList from '@fdk-frontend/ui/smart-list';
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
    const datasetPreviewTitle =
        printLocaleValue(locale, distribution.title) ||
        distribution.downloadURL?.at(0) ||
        dictionaries.detailsPage.distributions.header.nameless;

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
                        <table className='fdk-link-list-table'>
                            <tbody>
                                {distribution.downloadURL.map((url: string, index: number) => (
                                    <tr key={`${url}-${index}`}>
                                        <td>
                                            <ExternalLink
                                                href={url}
                                                locale={locale}
                                                gateway
                                                className='fdk-box-link'
                                            >
                                                {url}
                                            </ExternalLink>
                                        </td>
                                        <td
                                            width='1'
                                            align='right'
                                        >
                                            <DatasetPreviewWidget
                                                downloadUrl={url as string}
                                                title={datasetPreviewTitle}
                                                dictionary={dictionaries.detailsPage}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
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
                                <VStack key={license.uri}>
                                    <ExternalLink
                                        href={license.uri}
                                        locale={locale}
                                        className='fdk-box-link'
                                    >
                                        {license.prefLabel ? printLocaleValue(locale, license.prefLabel) : license.uri}
                                    </ExternalLink>
                                    {isOpenLicense(license.uri) && (
                                        <OpenLicenseTag
                                            dictionary={dictionaries.common}
                                            style={{ marginBottom: '0.5rem' }}
                                        />
                                    )}
                                </VStack>
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
