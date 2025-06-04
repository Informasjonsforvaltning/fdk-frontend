import React from 'react';
import { Link } from '@digdir/designsystemet-react';
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
                    {distribution.accessURL?.at(0) ? (
                        <ExternalLink
                            href={distribution.accessURL.at(0)}
                            locale={locale}
                            gateway
                        >
                            {distribution.accessURL.at(0)}
                        </ExternalLink>
                    ) : (
                        <PlaceholderText>{dictionaries.detailsPage.distributions.details.noData}</PlaceholderText>
                    )}
                </dd>
                <dt>{dictionaries.detailsPage.distributions.details.downloadURL}:</dt>
                <dd>
                    {distribution.downloadURL?.at(0) ? (
                        <VStack>
                            <ExternalLink
                                href={distribution.downloadURL.at(0)}
                                locale={locale}
                                gateway
                            >
                                {distribution.downloadURL.at(0)}
                            </ExternalLink>
                            <DatasetPreviewWidget
                                downloadUrl={distribution.downloadURL?.at(0) as string}
                                title={datasetPreviewTitle}
                                dictionary={dictionaries.detailsPage}
                            />
                        </VStack>
                    ) : (
                        <PlaceholderText>{dictionaries.detailsPage.distributions.details.noData}</PlaceholderText>
                    )}
                </dd>
                <dt>{dictionaries.detailsPage.distributions.details.accessService}:</dt>
                <dd>
                    {distribution.accessService?.length ? (
                        <ol>
                            {distribution.accessService.map((api: any) => (
                                <li key={api.uri}>
                                    <Link
                                        key={api.uri}
                                        href={api.uri}
                                    >
                                        {printLocaleValue(locale, api.title) || api.uri}
                                    </Link>
                                </li>
                            ))}
                        </ol>
                    ) : (
                        <PlaceholderText>{dictionaries.detailsPage.distributions.details.noData}</PlaceholderText>
                    )}
                </dd>
                <dt>{dictionaries.detailsPage.distributions.details.page}:</dt>
                <dd>
                    {distribution.page ? (
                        distribution.page.map((page: any) => (
                            <ExternalLink
                                key={page.uri}
                                href={page.uri}
                                locale={locale}
                                gateway
                            >
                                {page.uri}
                            </ExternalLink>
                        ))
                    ) : (
                        <PlaceholderText>{dictionaries.detailsPage.distributions.details.noData}</PlaceholderText>
                    )}
                </dd>
                <dt>{dictionaries.detailsPage.distributions.details.license}:</dt>
                <dd>
                    {distribution.license ? (
                        distribution.license.map((license: any) => (
                            <VStack key={license.uri}>
                                <ExternalLink
                                    href={license.uri}
                                    locale={locale}
                                >
                                    {license.prefLabel ? printLocaleValue(locale, license.prefLabel) : license.uri}
                                </ExternalLink>
                                {isOpenLicense(license.uri) && <OpenLicenseTag dictionary={dictionaries.common} />}
                            </VStack>
                        ))
                    ) : (
                        <PlaceholderText>{dictionaries.detailsPage.distributions.details.noData}</PlaceholderText>
                    )}
                </dd>
                <dt>{dictionaries.detailsPage.distributions.details.conformsTo}:</dt>
                <dd>
                    {distribution.conformsTo ? (
                        distribution.conformsTo.map((standard: any) => (
                            <ExternalLink
                                locale={locale}
                                href={standard.uri}
                                key={standard.uri}
                                gateway
                            >
                                {standard.prefLabel ? printLocaleValue(locale, standard.prefLabel) : standard.uri}
                            </ExternalLink>
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
