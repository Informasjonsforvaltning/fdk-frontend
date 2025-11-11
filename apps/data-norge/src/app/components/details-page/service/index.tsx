'use client';

import React, { useState } from 'react';
import { i18n, type Dictionary, type LocaleCodes } from '@fdk-frontend/dictionaries';
import { type DatasetWithIdentifier, type CommunityTopic, type PublicService } from '@fellesdatakatalog/types';
import { printLocaleValue } from '@fdk-frontend/utils';
import {
    Badge,
    Breadcrumbs,
    Markdown,
    Article,
    ScrollShadows,
    ExpandableContent,
    PlaceholderBox,
    ExternalLink,
    PlaceholderText,
    Dlist,
    Hstack,
    InputWithCopyButton,
    SmartList,
} from '@fdk-frontend/ui';
import { Card, Heading, Tabs, TabsList, TabsTab, TabsPanel, Button, Link, Tag } from '@digdir/designsystemet-react';
import MetadataTab from '../metadata-tab';
import CommunityTab from '../community-tab';
import styles from '../details-page.module.scss';
import ServiceHeader from '../service-header';
import Produces from '../produces';
import { EyeIcon, EyeSlashIcon } from '@navikt/aksel-icons';
import ServiceStructuredData from '../../structured-data/service-structured-data';

export type ServiceDetailsPageType = {
    baseUri: string;
    resource: PublicService;
    orgDatasets?: DatasetWithIdentifier[];
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

export default function ServiceDetailsPage(props: ServiceDetailsPageType) {
    const {
        baseUri,
        resource,
        communityTopics,
        communityBaseUri,
        orgLogo,
        defaultActiveTab = 'overview',
        locale,
        dictionaries,
    } = props;
    const [activeTab, setActiveTab] = useState(defaultActiveTab);
    const [showEmptyRows, setShowEmptyRows] = useState<boolean>(true);

    const breadcrumbList = [
        {
            href: `/public-services-and-events`,
            text: dictionaries.detailsPage.breadcrumbs.services,
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
            <ServiceStructuredData
                service={resource}
                locale={locale}
                baseUri={baseUri}
            />
            <Breadcrumbs
                dictionary={dictionaries.common}
                breadcrumbList={breadcrumbList}
            />
            <div className={styles.mainContent}>
                <ServiceHeader
                    dictionaries={dictionaries}
                    locale={locale}
                    orgLogo={orgLogo}
                    publisher={resource?.catalog?.publisher}
                    title={resource.title}
                    admsStatus={resource.admsStatus}
                />
                <Tabs
                    className={styles.tabs}
                    defaultValue='overview'
                    data-size='sm'
                    value={activeTab}
                    onChange={setActiveTab}
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
                        <section className={styles.section}>
                            <Heading
                                level={2}
                                data-size='xs'
                            >
                                {dictionaries.detailsPage.overview.description.title}
                            </Heading>
                            {resource.description ? (
                                <Card>
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
                                </Card>
                            ) : (
                                <PlaceholderBox>
                                    {dictionaries.detailsPage.overview.description.placeholder}
                                </PlaceholderBox>
                            )}
                        </section>
                        <section className={styles.section}>
                            <Produces
                                produces={resource.produces}
                                locale={locale}
                                dictionaries={dictionaries}
                            />
                        </section>
                    </TabsPanel>
                    <TabsPanel
                        className={styles.tabPanel}
                        value='details'
                    >
                        <div className={styles.details}>
                            <Button
                                className={styles.toggleButton}
                                variant='tertiary'
                                data-size='sm'
                                onClick={() => setShowEmptyRows(!showEmptyRows)}
                            >
                                {showEmptyRows ? (
                                    <>
                                        <EyeSlashIcon aria-hidden />
                                        {dictionaries.detailsPage.details.hideEmptyRows}
                                    </>
                                ) : (
                                    <>
                                        <EyeIcon aria-hidden />
                                        {dictionaries.detailsPage.details.showEmptyRows}
                                    </>
                                )}
                            </Button>
                            {!resource.contactPoint && !showEmptyRows ? null : (
                                <section>
                                    <Heading
                                        level={2}
                                        data-size='xs'
                                    >
                                        {dictionaries.detailsPage.details.contactPoint.title}
                                    </Heading>
                                    {resource.contactPoint && resource.contactPoint.length > 0 ? (
                                        resource.contactPoint.map((contactPoint, index) => (
                                            <Dlist key={index}>
                                                {!contactPoint.contactPage && !showEmptyRows ? null : (
                                                    <>
                                                        <dt>
                                                            {
                                                                dictionaries.detailsPage.details.contactPoint
                                                                    .formattedName
                                                            }
                                                            :
                                                        </dt>
                                                        <dd>
                                                            {contactPoint.contactPage ? (
                                                                contactPoint.contactPage
                                                            ) : (
                                                                <PlaceholderText>
                                                                    {dictionaries.detailsPage.details.noData}
                                                                </PlaceholderText>
                                                            )}
                                                        </dd>
                                                    </>
                                                )}
                                                {!contactPoint.contactPage && !showEmptyRows ? null : (
                                                    <>
                                                        <dt>{dictionaries.detailsPage.details.contactPoint.uri}:</dt>
                                                        <dd>
                                                            {contactPoint.contactPage ? (
                                                                <ExternalLink
                                                                    href={contactPoint.contactPage}
                                                                    locale={locale}
                                                                    gateway
                                                                >
                                                                    {contactPoint.contactPage}
                                                                </ExternalLink>
                                                            ) : (
                                                                <PlaceholderText>
                                                                    {dictionaries.detailsPage.details.noData}
                                                                </PlaceholderText>
                                                            )}
                                                        </dd>
                                                    </>
                                                )}
                                                {!contactPoint.email && !showEmptyRows ? null : (
                                                    <>
                                                        <dt>{dictionaries.detailsPage.details.contactPoint.email}:</dt>
                                                        <dd>
                                                            {contactPoint.email ? (
                                                                <Link href={`mailto:${contactPoint.email}`}>
                                                                    {contactPoint.email}
                                                                </Link>
                                                            ) : (
                                                                <PlaceholderText>
                                                                    {dictionaries.detailsPage.details.noData}
                                                                </PlaceholderText>
                                                            )}
                                                        </dd>
                                                    </>
                                                )}
                                                {!contactPoint.telephone && !showEmptyRows ? null : (
                                                    <>
                                                        <dt>
                                                            {dictionaries.detailsPage.details.contactPoint.telephone}:
                                                        </dt>
                                                        <dd>
                                                            {contactPoint.telephone || (
                                                                <PlaceholderText>
                                                                    {dictionaries.detailsPage.details.noData}
                                                                </PlaceholderText>
                                                            )}
                                                        </dd>
                                                    </>
                                                )}
                                            </Dlist>
                                        ))
                                    ) : (
                                        <PlaceholderBox>{dictionaries.detailsPage.details.noData}</PlaceholderBox>
                                    )}
                                </section>
                            )}

                            <section>
                                <Heading
                                    level={2}
                                    data-size='xs'
                                >
                                    {dictionaries.detailsPage.details.general.serviceTitle}
                                </Heading>
                                <Dlist>
                                    <dt>{dictionaries.detailsPage.details.general.publisher}:</dt>
                                    <dd>
                                        {resource.catalog?.publisher ? (
                                            <Link href={`/organizations/${resource.catalog.publisher?.id}`}>
                                                {resource.catalog.publisher?.prefLabel?.[locale] ||
                                                    resource.catalog.publisher?.prefLabel?.[i18n.defaultLocale]}
                                            </Link>
                                        ) : (
                                            <PlaceholderText>{dictionaries.detailsPage.details.noData}</PlaceholderText>
                                        )}
                                    </dd>
                                    <dt>{dictionaries.detailsPage.details.general.firstHarvested}:</dt>
                                    <dd>
                                        {resource.harvest?.firstHarvested ? (
                                            new Date(resource.harvest.firstHarvested).toLocaleString(locale, {
                                                dateStyle: 'long',
                                            })
                                        ) : (
                                            <PlaceholderText>{dictionaries.detailsPage.details.noData}</PlaceholderText>
                                        )}
                                    </dd>
                                    <dt>
                                        <span>{dictionaries.detailsPage.details.general.modified}:</span>
                                    </dt>
                                    <dd>
                                        {resource.harvest?.modified ? (
                                            new Date(resource.harvest.modified).toLocaleString(locale, {
                                                dateStyle: 'long',
                                            })
                                        ) : (
                                            <PlaceholderText>{dictionaries.detailsPage.details.noData}</PlaceholderText>
                                        )}
                                    </dd>
                                    {!resource.homepage && !showEmptyRows ? null : (
                                        <>
                                            <dt>{dictionaries.detailsPage.details.general.homepage}:</dt>
                                            <dd>
                                                {resource.homepage?.length ? (
                                                    <SmartList
                                                        items={resource.homepage}
                                                        renderItem={(page) => (
                                                            <ExternalLink
                                                                href={page}
                                                                locale={locale}
                                                                gateway
                                                            >
                                                                {page}
                                                            </ExternalLink>
                                                        )}
                                                    />
                                                ) : (
                                                    <PlaceholderText>
                                                        {dictionaries.detailsPage.details.noData}
                                                    </PlaceholderText>
                                                )}
                                            </dd>
                                        </>
                                    )}
                                    <dt>UID:</dt>
                                    <dd>
                                        <Hstack>
                                            <InputWithCopyButton
                                                value={resource.id}
                                                inputLabel='uid'
                                                copyLabel={dictionaries.detailsPage.details.general.copyButton[0]}
                                                copiedLabel={dictionaries.detailsPage.details.general.copyButton[1]}
                                            />
                                        </Hstack>
                                    </dd>
                                </Dlist>
                            </section>
                        </div>
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
                            uri={`${baseUri}/public-services/${resource.id}`}
                            dictionary={dictionaries.detailsPage}
                            locale={locale}
                        />
                    </TabsPanel>
                </Tabs>
            </div>
        </div>
    );
}
