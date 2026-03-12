'use client';

import { useState } from 'react';
import { type Localization, type LocaleCodes } from '@fdk-frontend/localization';
import { type DataService, type CommunityTopic } from '@fellesdatakatalog/types';
import { printLocaleValue } from '@fdk-frontend/utils';
import {
    Badge,
    Breadcrumbs,
    ScrollShadows,
    OrgButton,
    TagList,
} from '@fdk-frontend/ui';
import { Heading, Tabs, TabsList, TabsTab, TabsPanel, Tag, Link } from '@digdir/designsystemet-react';
import MetadataTab from '../metadata-tab';
import CommunityTab from '../community-tab';
import DataServiceDetailsTab from './data-service-details-tab';
import DataServiceOverviewTab from './data-service-overview-tab';
import styles from '../details-page.module.scss';
import headerStyles from '../dataset-header/dataset-header.module.scss';

export type DataServiceDetailsPageType = {
    baseUri: string;
    resource: DataService;
    communityTopics?: CommunityTopic[];
    communityBaseUri: string;
    defaultActiveTab?: string;
    orgLogo?: string | null;
    locale: LocaleCodes;
    dictionaries: {
        common: Localization;
        detailsPage: Localization;
    };
};

export default function DataServiceDetailsPage({
    baseUri,
    resource,
    communityTopics,
    communityBaseUri,
    orgLogo,
    defaultActiveTab = 'overview',
    locale,
    dictionaries,
}: DataServiceDetailsPageType) {
    const [activeTab, setActiveTab] = useState(defaultActiveTab);

    const breadcrumbList = [
        {
            href: `/data-services`,
            text: dictionaries.detailsPage.breadcrumbs.dataServices,
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
            <Breadcrumbs
                locale={locale}
                breadcrumbList={breadcrumbList}
            />
            <div className={styles.mainContent}>
                <div className={headerStyles.header}>
                    <OrgButton
                        href={`/organizations/${resource.publisher?.id}`}
                        orgLogoSrc={orgLogo}
                        className={headerStyles.orgBtn}
                    >
                        {printLocaleValue(locale, resource.publisher?.prefLabel) ??
                            dictionaries.detailsPage.header.namelessOrganization}
                    </OrgButton>
                    <Heading
                        level={1}
                        data-size='lg'
                        className={headerStyles.title}
                    >
                        {printLocaleValue(locale, resource.title) ||
                            dictionaries.detailsPage.header.namelessDataService}
                    </Heading>
                    <TagList className={headerStyles.headerTags}>
                        <Tag
                            data-color='info'
                            data-size='md'
                        >
                            <Link href='/data-services'>{dictionaries.detailsPage.header.dataServicesTagLink}</Link>
                        </Tag>
                    </TagList>
                </div>
                <Tabs
                    className={styles.tabs}
                    defaultValue='overview'
                    data-size='sm'
                    value={activeTab}
                    onChange={(value) => {
                        setActiveTab(value);
                    }}
                >
                    <ScrollShadows className={styles.tabsScrollShadows}>
                        <TabsList>
                            <TabsTab
                                value='overview'
                                onClick={() => updateUri('overview')}
                            >
                                {dictionaries.detailsPage.tabs.overview}
                            </TabsTab>
                            <TabsTab
                                value='details'
                                onClick={() => updateUri('details')}
                            >
                                {dictionaries.detailsPage.tabs.details}
                            </TabsTab>
                            <TabsTab
                                value='community'
                                onClick={() => updateUri('community')}
                            >
                                {dictionaries.detailsPage.tabs.community}
                                &nbsp;<Badge>{communityTopics?.length || 0}</Badge>
                            </TabsTab>
                            <TabsTab
                                value='rdf'
                                onClick={() => updateUri('rdf')}
                            >
                                {dictionaries.detailsPage.tabs.rdf}
                            </TabsTab>
                        </TabsList>
                    </ScrollShadows>
                    <TabsPanel
                        className={styles.tabPanel}
                        value='overview'
                    >
                        <DataServiceOverviewTab
                            resource={resource}
                            locale={locale}
                            dictionary={dictionaries.detailsPage}
                        />
                    </TabsPanel>
                    <TabsPanel
                        className={styles.tabPanel}
                        value='details'
                    >
                        <DataServiceDetailsTab
                            resource={resource}
                            locale={locale}
                            dictionary={dictionaries.detailsPage}
                        />
                    </TabsPanel>
                    <TabsPanel
                        className={styles.tabPanel}
                        value='community'
                    >
                        <CommunityTab
                            topics={communityTopics}
                            communityBaseUri={communityBaseUri}
                            dictionary={dictionaries.detailsPage}
                            locale={locale}
                        />
                    </TabsPanel>
                    <TabsPanel
                        className={styles.tabPanel}
                        value='rdf'
                    >
                        <MetadataTab
                            uri={`${baseUri}/data-services/${resource.id}`}
                            dictionary={dictionaries.detailsPage}
                            locale={locale}
                        />
                    </TabsPanel>
                </Tabs>
            </div>
        </div>
    );
}
