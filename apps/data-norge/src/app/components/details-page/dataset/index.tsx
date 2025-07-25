'use client';

import React, { useState } from 'react';
import { type Dictionary, type LocaleCodes } from '@fdk-frontend/dictionaries';
import DatasetStructuredData from '../../structured-data/dataset-structured-data';
import {
    type DatasetWithIdentifier,
    type DataService,
    type DatasetScore,
    type CommunityTopic,
    type SearchObject,
} from '@fellesdatakatalog/types';
import { type PopulatedDatasetReference } from '@fdk-frontend/types';
import { sumArrayLengths, printLocaleValue } from '@fdk-frontend/utils';
import {
    Breadcrumbs,
    Badge,
    BrandDivider,
    Markdown,
    Article,
    ScrollShadows,
    ExpandableContent,
    PlaceholderBox,
    DatasetTable,
    ResourceNotAvailableNotice,
    ExternalLink,
} from '@fdk-frontend/ui';
import { accessRequestWhiteList } from '@fdk-frontend/utils/access-request';
import { Heading, Tabs, TabList, Tab, TabContent } from '@digdir/designsystemet-react';
import Distributions from '../distributions';
import DatasetDetailsTab from '../details-tab';
import MetadataTab from '../metadata-tab';
import CommunityTab from '../community-tab';
import DatasetHeader from '../dataset-header';
import styles from '../details-page.module.scss';

export type DatasetDetailsPageType = {
    baseUri: string;
    resource: DatasetWithIdentifier;
    apis?: DataService[];
    concepts?: SearchObject[];
    populatedReferences?: PopulatedDatasetReference[];
    similarDatasets?: DatasetWithIdentifier[];
    internalRelatedDatasets?: DatasetWithIdentifier[];
    orgDatasets?: DatasetWithIdentifier[];
    metadataScore?: DatasetScore;
    communityTopics?: CommunityTopic[];
    communityBaseUri: string;
    defaultActiveTab?: string;
    orgLogo?: string | null;
    locale: LocaleCodes;
    dictionaries: {
        common: Dictionary;
        detailsPage: Dictionary;
    };
    resolvedDistributionDataServices?: SearchObject[];
    resolvedDistributionInformationModels?: SearchObject[];
};

export default function DatasetDetailsPage({
    baseUri,
    resource,
    apis,
    concepts,
    populatedReferences,
    similarDatasets,
    internalRelatedDatasets,
    orgDatasets,
    metadataScore,
    communityTopics,
    communityBaseUri,
    orgLogo,
    defaultActiveTab = 'overview',
    locale,
    dictionaries,
    resolvedDistributionDataServices,
    resolvedDistributionInformationModels,
}: DatasetDetailsPageType) {
    const [activeTab, setActiveTab] = useState(defaultActiveTab);
    const isAvailable = !!sumArrayLengths(resource.distribution, resource.sample, apis);
    const accessRequestDemo = accessRequestWhiteList.some((i) => i.id === resource.id);

    const breadcrumbList = [
        {
            href: `/datasets`,
            text: dictionaries.detailsPage.breadcrumbs.datasets,
        },
        {
            text: printLocaleValue(locale, resource.title),
        },
    ];

    const updateUri = (tab: string) => {
        window.history.pushState(null, '', `?tab=${tab}`);
    };

    return (
        <div className={styles.detailsPage}>
            <DatasetStructuredData
                dataset={resource}
                locale={locale}
                baseUri={baseUri}
            />
            <Breadcrumbs
                dictionary={dictionaries.common}
                breadcrumbList={breadcrumbList}
            />
            <div className={styles.mainContent}>
                <DatasetHeader
                    dataset={resource}
                    apis={apis}
                    dictionaries={dictionaries}
                    locale={locale}
                    orgLogo={orgLogo}
                    accessRequestDemo={accessRequestDemo}
                    isAvailable={isAvailable}
                />
                <Tabs
                    className={styles.tabs}
                    defaultValue='overview'
                    size='sm'
                    value={activeTab}
                    onChange={(value) => {
                        setActiveTab(value);
                    }}
                >
                    <ScrollShadows className={styles.tabsScrollShadows}>
                        <TabList>
                            <Tab
                                value='overview'
                                onClick={() => updateUri('overview')}
                            >
                                {dictionaries.detailsPage.tabs.overview}
                            </Tab>
                            <Tab
                                value='distributions'
                                onClick={() => updateUri('distributions')}
                            >
                                {dictionaries.detailsPage.tabs.distributions}&nbsp;
                                <Badge>{sumArrayLengths(resource.distribution, resource.sample, apis)}</Badge>
                            </Tab>
                            <Tab
                                value='details'
                                onClick={() => updateUri('details')}
                            >
                                {dictionaries.detailsPage.tabs.details}
                            </Tab>
                            <Tab
                                value='community'
                                onClick={() => updateUri('community')}
                            >
                                {dictionaries.detailsPage.tabs.community}
                                &nbsp;<Badge>{communityTopics?.length || 0}</Badge>
                            </Tab>
                            <Tab
                                value='rdf'
                                onClick={() => updateUri('rdf')}
                            >
                                {dictionaries.detailsPage.tabs.rdf}
                            </Tab>
                        </TabList>
                    </ScrollShadows>
                    <TabContent value='overview'>
                        <section className={styles.section}>
                            <Heading
                                level={2}
                                size='xxsmall'
                            >
                                {dictionaries.detailsPage.overview.description.title}
                            </Heading>
                            {resource.description ? (
                                <div className={styles.box}>
                                    <ExpandableContent>
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
                                                {printLocaleValue(locale, resource.description)}
                                            </Markdown>
                                        </Article>
                                    </ExpandableContent>
                                </div>
                            ) : (
                                <PlaceholderBox>
                                    {dictionaries.detailsPage.overview.description.placeholder}
                                </PlaceholderBox>
                            )}
                        </section>
                        <section className={styles.section}>
                            {!isAvailable && accessRequestDemo ? (
                                <ResourceNotAvailableNotice
                                    kind='datasets'
                                    id={resource.id}
                                    dictionary={dictionaries.detailsPage}
                                    locale={locale}
                                />
                            ) : (
                                <Distributions
                                    datasets={resource.distribution}
                                    exampleData={resource.sample}
                                    apis={apis}
                                    locale={locale}
                                    dictionaries={dictionaries}
                                    resolvedDistributionDataServices={resolvedDistributionDataServices}
                                    resolvedDistributionInformationModels={resolvedDistributionInformationModels}
                                />
                            )}
                        </section>
                        {((internalRelatedDatasets && internalRelatedDatasets.length > 0) ||
                            (similarDatasets && similarDatasets.length > 0)) && (
                            <BrandDivider className={styles.divider} />
                        )}
                        {internalRelatedDatasets && internalRelatedDatasets.length > 0 && (
                            <section
                                className={styles.section}
                                style={{ marginBottom: '3rem' }}
                            >
                                <Heading
                                    level={2}
                                    size='xxsmall'
                                >
                                    {dictionaries.detailsPage.internalRelations}
                                </Heading>
                                <ScrollShadows className={styles.tableScroller}>
                                    <DatasetTable
                                        datasets={internalRelatedDatasets}
                                        locale={locale}
                                        dictionary={dictionaries.detailsPage}
                                    />
                                </ScrollShadows>
                            </section>
                        )}
                        {similarDatasets && similarDatasets.length > 0 && (
                            <section className={styles.section}>
                                <Heading
                                    level={2}
                                    size='xxsmall'
                                >
                                    {dictionaries.detailsPage.similarDatasets}
                                </Heading>
                                <ScrollShadows className={styles.tableScroller}>
                                    <DatasetTable
                                        datasets={similarDatasets}
                                        locale={locale}
                                        dictionary={dictionaries.detailsPage}
                                    />
                                </ScrollShadows>
                            </section>
                        )}
                    </TabContent>
                    <TabContent value='distributions'>
                        {!isAvailable && accessRequestDemo ? (
                            <ResourceNotAvailableNotice
                                kind='datasets'
                                id={resource.id}
                                dictionary={dictionaries.detailsPage}
                                locale={locale}
                            />
                        ) : (
                            <Distributions
                                datasets={resource.distribution}
                                exampleData={resource.sample}
                                apis={apis}
                                locale={locale}
                                dictionaries={dictionaries}
                                resolvedDistributionDataServices={resolvedDistributionDataServices}
                                resolvedDistributionInformationModels={resolvedDistributionInformationModels}
                            />
                        )}
                    </TabContent>
                    <TabContent value='details'>
                        <DatasetDetailsTab
                            dataset={resource}
                            internalRelatedDatasets={internalRelatedDatasets}
                            populatedReferences={populatedReferences}
                            concepts={concepts}
                            locale={locale}
                            metadataScore={metadataScore}
                            dictionary={dictionaries.detailsPage}
                        />
                    </TabContent>
                    <TabContent value='community'>
                        <CommunityTab
                            topics={communityTopics}
                            communityBaseUri={communityBaseUri}
                            dictionary={dictionaries.detailsPage}
                            locale={locale}
                        />
                    </TabContent>
                    <TabContent value='rdf'>
                        <MetadataTab
                            uri={`${baseUri}/datasets/${resource.id}`}
                            dictionary={dictionaries.detailsPage}
                            locale={locale}
                        />
                    </TabContent>
                </Tabs>
            </div>
        </div>
    );
}
