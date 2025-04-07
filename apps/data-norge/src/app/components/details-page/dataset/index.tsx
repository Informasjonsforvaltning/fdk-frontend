'use client';

import { useState } from 'react';
import cn from 'classnames';
import { type Dictionary, type LocaleCodes } from '@fdk-frontend/dictionaries';
import {
    type DatasetWithIdentifier,
    type DataService,
    type DatasetScore,
    type CommunityTopic,
    type SearchObject,
} from '@fdk-frontend/fdk-types';
import { type PopulatedDatasetReference } from '@fdk-frontend/types';
import { sumArrayLengths, printLocaleValue } from '@fdk-frontend/utils';
import Breadcrumbs from '@fdk-frontend/ui/breadcrumbs';
import Badge from '@fdk-frontend/ui/badge';
import { BrandDivider } from '@fdk-frontend/ui/divider';
import Markdown from '@fdk-frontend/ui/markdown';
import Article from '@fdk-frontend/ui/article';
import OrgButton from '@fdk-frontend/ui/org-button';
import ScrollShadows from '@fdk-frontend/ui/scroll-shadows';
import ExpandableContent from '@fdk-frontend/ui/expandable-content';
import AccessLevelTag from '@fdk-frontend/ui/access-level-tag';
import OpenDataTag from '@fdk-frontend/ui/open-data-tag';
import PlaceholderBox from '@fdk-frontend/ui/placeholder-box';
import DatasetTable from '@fdk-frontend/ui/dataset-table';
import AccessRequestButton from '@fdk-frontend/ui/access-request-button';
import ResourceNotAvailableNotice from '@fdk-frontend/ui/resource-not-available-notice';
import { accessRequestWhiteList } from '@fdk-frontend/utils/access-request';
import { Button, Heading, Link, Tag, Tabs, TabList, Tab, TabContent } from '@digdir/designsystemet-react';
import Distributions from '../distributions';
import DatasetDetailsTab from '../details-tab';
import MetadataTab from '../metadata-tab';
import CommunityTab from '../community-tab';
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
}: DatasetDetailsPageType) {
    const [activeTab, setActiveTab] = useState(defaultActiveTab);
    const [highlight, setHighlight] = useState(false);

    const isAvailable = !!sumArrayLengths(resource.distribution, resource.sample, apis);
    const accessRequestDemo = accessRequestWhiteList.some((i) => i.id === resource.id);

    const blink = () => {
        setHighlight(true);
        setTimeout(() => setHighlight(false), 1000);
    };

    const breadcrumbList = [
        {
            href: '/datasets',
            text: dictionaries.detailsPage.breadcrumbs.datasets,
        },
        {
            href: '#',
            text: printLocaleValue(locale, resource.title),
        },
    ];

    const updateUri = (tab: string) => {
        window.history.pushState(null, '', `?tab=${tab}`);
    };

    return (
        <div className={styles.detailsPage}>
            <Breadcrumbs
                dictionary={dictionaries.common}
                breadcrumbList={breadcrumbList}
                baseUri=''
            />
            <div className={styles.mainContent}>
                <div className={styles.header}>
                    <OrgButton
                        href={`/organizations/${resource.publisher?.id}`}
                        orgLogoSrc={orgLogo}
                    >
                        {resource.publisher
                            ? printLocaleValue(locale, resource.publisher?.prefLabel)
                            : dictionaries.detailsPage.header.namelessOrganization}
                    </OrgButton>
                    <div className={styles.headerGrid}>
                        <Heading
                            level={1}
                            size='lg'
                            className={styles.title}
                        >
                            {printLocaleValue(locale, resource.title) ||
                                dictionaries.detailsPage.header.namelessDataset}
                        </Heading>
                        <div className={styles.headerToolbar}>
                            {accessRequestDemo && (
                                <AccessRequestButton
                                    kind='datasets'
                                    id={resource.id}
                                    dictionary={dictionaries.detailsPage}
                                    isAvailable={isAvailable}
                                />
                            )}
                            <Button
                                size='sm'
                                onClick={() => {
                                    setActiveTab('distributions');
                                    updateUri('distributions');
                                    blink();
                                }}
                            >
                                {dictionaries.detailsPage.header.useDatasetButton}
                            </Button>
                        </div>
                        <div className={styles.headerTags}>
                            <Tag
                                color='info'
                                size='sm'
                            >
                                <Link href='/datasets'>{dictionaries.detailsPage.header.datasetsTagLink}</Link>
                            </Tag>
                            <AccessLevelTag
                                accessCode={resource.accessRights?.code}
                                dictionary={dictionaries.detailsPage}
                            />
                            {resource.isOpenData && <OpenDataTag dictionary={dictionaries.common} />}
                        </div>
                    </div>
                </div>
                <Tabs
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
                                            <Markdown>{printLocaleValue(locale, resource.description)}</Markdown>
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
                                    className={cn({ [styles.highlight]: highlight })}
                                    kind='datasets'
                                    id={resource.id}
                                    dictionary={dictionaries.detailsPage}
                                />
                            ) : (
                                <Distributions
                                    datasets={resource.distribution}
                                    exampleData={resource.sample}
                                    apis={apis}
                                    className={cn({ [styles.highlight]: highlight })}
                                    locale={locale}
                                    dictionaries={dictionaries}
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
                                className={cn({ [styles.highlight]: highlight })}
                                kind='datasets'
                                id={resource.id}
                                dictionary={dictionaries.detailsPage}
                            />
                        ) : (
                            <Distributions
                                datasets={resource.distribution}
                                exampleData={resource.sample}
                                apis={apis}
                                className={cn({ [styles.highlight]: highlight })}
                                locale={locale}
                                dictionaries={dictionaries}
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
                        />
                    </TabContent>
                    <TabContent value='rdf'>
                        <MetadataTab
                            uri={`${baseUri}/datasets/${resource.id}`}
                            dictionary={dictionaries.detailsPage}
                        />
                    </TabContent>
                </Tabs>
            </div>
        </div>
    );
}
