'use client';

import React, { useState } from 'react';
import { i18n, type Dictionary, type LocaleCodes } from '@fdk-frontend/dictionaries';
import { type CommunityTopic, type PublicService } from '@fellesdatakatalog/types';
import { printLocaleValue, sumArrayLengths } from '@fdk-frontend/utils';
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
    OrgButton,
    TagList,
} from '@fdk-frontend/ui';
import {
    Card,
    Heading,
    Tabs,
    TabsList,
    TabsTab,
    TabsPanel,
    Button,
    Link,
    Tag,
    Details,
} from '@digdir/designsystemet-react';
import MetadataTab from '../metadata-tab';
import CommunityTab from '../community-tab';
import styles from './service.module.scss';
import { EyeIcon, EyeSlashIcon } from '@navikt/aksel-icons';
import ServiceStructuredData from '../../structured-data/service-structured-data';
import StatusTag from '../status-tag';

export type ServiceDetailsPageType = {
    baseUri: string;
    communityTopics?: CommunityTopic[];
    communityBaseUri: string;
    defaultActiveTab?: string;
    dictionaries: {
        common: Dictionary;
        detailsPage: Dictionary;
    };
    locale: LocaleCodes;
    orgLogo?: string | null;
    service: PublicService;
};

export default function ServiceDetailsPage(props: ServiceDetailsPageType) {
    const {
        baseUri,
        communityTopics,
        communityBaseUri,
        defaultActiveTab = 'overview',
        dictionaries,
        locale,
        orgLogo,
        service,
    } = props;
    const [activeTab, setActiveTab] = useState(defaultActiveTab);
    const [showEmptyRows, setShowEmptyRows] = useState<boolean>(true);

    const breadcrumbList = [
        {
            href: `/services`,
            text: dictionaries.detailsPage.breadcrumbs.services,
        },
        {
            text: printLocaleValue(locale, service.title),
        },
    ];

    const updateUri = (tab: string) => {
        window.history.pushState(null, '', `?tab=${tab}`);
    };

    return (
        <div className={styles.detailsPage}>
            <ServiceStructuredData
                service={service}
                locale={locale}
                baseUri={baseUri}
            />
            <Breadcrumbs
                dictionary={dictionaries.common}
                breadcrumbList={breadcrumbList}
            />
            <div className={styles.mainContent}>
                <div className={styles.header}>
                    {service?.catalog?.publisher && (
                        <div>
                            <OrgButton
                                href={`/organizations/${service.catalog.publisher.id}`}
                                orgLogoSrc={orgLogo}
                            >
                                {printLocaleValue(locale, service.catalog.publisher.prefLabel) ??
                                    dictionaries.detailsPage.header.namelessOrganization}
                            </OrgButton>
                        </div>
                    )}
                    <Heading
                        level={1}
                        data-size='lg'
                    >
                        {printLocaleValue(locale, service.title) || dictionaries.detailsPage.header.namelessService}
                    </Heading>
                    <TagList>
                        <Tag
                            data-color='info'
                            data-size='md'
                        >
                            <Link href='/services'>{dictionaries.detailsPage.header.servicesTagLink}</Link>
                        </Tag>
                        {service.admsStatus && (
                            <StatusTag
                                locale={locale}
                                status={service.admsStatus}
                            />
                        )}
                    </TagList>
                </div>
                <Tabs
                    className={styles.tabs}
                    defaultValue='overview'
                    data-size='sm'
                    value={activeTab}
                    onChange={setActiveTab}
                >
                    <ScrollShadows>
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
                        <Heading
                            level={2}
                            data-size='xs'
                            className={styles.heading}
                        >
                            {dictionaries.detailsPage.overview.description.title}
                        </Heading>
                        {service.description ? (
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
                                            {printLocaleValue(locale, service.description)}
                                        </Markdown>
                                    </Article>
                                </ExpandableContent>
                            </Card>
                        ) : (
                            <PlaceholderBox>{dictionaries.detailsPage.overview.description.placeholder}</PlaceholderBox>
                        )}

                        <Heading
                            level={2}
                            data-size='xs'
                            className={styles.heading}
                        >
                            <Hstack>
                                <span>{dictionaries.detailsPage.produces.title}</span>
                                <Badge>{sumArrayLengths(service.produces)}</Badge>
                            </Hstack>
                        </Heading>
                        {sumArrayLengths(service.produces) > 0 ? (
                            <Card>
                                {service.produces?.map((output, index) => (
                                    <Details
                                        key={`${output.identifier}-${index}`}
                                        className={styles.accordionItem}
                                    >
                                        <Details.Summary className={styles.summary}>
                                            {printLocaleValue(locale, output.name) ||
                                                dictionaries.detailsPage.produces.header.nameless}
                                        </Details.Summary>
                                        <Details.Content>
                                            {printLocaleValue(locale, output.description) ||
                                                dictionaries.detailsPage.produces.header.nameless}
                                        </Details.Content>
                                    </Details>
                                ))}
                            </Card>
                        ) : (
                            <PlaceholderBox>{dictionaries.detailsPage.produces.placeholder}</PlaceholderBox>
                        )}
                    </TabsPanel>
                    <TabsPanel
                        className={styles.tabPanel}
                        value='details'
                    >
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
                        {!service.contactPoint && !showEmptyRows ? null : (
                            <>
                                <Heading
                                    level={2}
                                    data-size='xs'
                                    className={styles.heading}
                                >
                                    {dictionaries.detailsPage.details.contactPoint.title}
                                </Heading>
                                {service.contactPoint && service.contactPoint.length > 0 ? (
                                    service.contactPoint.map((contactPoint, index) => (
                                        <Dlist
                                            className={styles.dlist}
                                            key={index}
                                        >
                                            {!contactPoint.contactPage && !showEmptyRows ? null : (
                                                <>
                                                    <dt>
                                                        {dictionaries.detailsPage.details.contactPoint.formattedName}:
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
                                                    <dt>{dictionaries.detailsPage.details.contactPoint.telephone}:</dt>
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
                            </>
                        )}

                        <Heading
                            level={2}
                            data-size='xs'
                            className={styles.heading}
                        >
                            {dictionaries.detailsPage.details.general.serviceTitle}
                        </Heading>
                        <Dlist className={styles.dlist}>
                            <dt>{dictionaries.detailsPage.details.general.publisher}:</dt>
                            <dd>
                                {service.catalog?.publisher ? (
                                    <Link href={`/organizations/${service.catalog.publisher?.id}`}>
                                        {service.catalog.publisher?.prefLabel?.[locale] ||
                                            service.catalog.publisher?.prefLabel?.[i18n.defaultLocale]}
                                    </Link>
                                ) : (
                                    <PlaceholderText>{dictionaries.detailsPage.details.noData}</PlaceholderText>
                                )}
                            </dd>
                            <dt>{dictionaries.detailsPage.details.general.firstHarvested}:</dt>
                            <dd>
                                {service.harvest?.firstHarvested ? (
                                    new Date(service.harvest.firstHarvested).toLocaleString(locale, {
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
                                {service.harvest?.modified ? (
                                    new Date(service.harvest.modified).toLocaleString(locale, {
                                        dateStyle: 'long',
                                    })
                                ) : (
                                    <PlaceholderText>{dictionaries.detailsPage.details.noData}</PlaceholderText>
                                )}
                            </dd>
                            {!service.homepage && !showEmptyRows ? null : (
                                <>
                                    <dt>{dictionaries.detailsPage.details.general.homepage}:</dt>
                                    <dd>
                                        {service.homepage?.length ? (
                                            <SmartList
                                                items={service.homepage}
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
                                            <PlaceholderText>{dictionaries.detailsPage.details.noData}</PlaceholderText>
                                        )}
                                    </dd>
                                </>
                            )}
                            <dt>UID:</dt>
                            <dd>
                                <Hstack>
                                    <InputWithCopyButton
                                        value={service.id}
                                        inputLabel='uid'
                                        copyLabel={dictionaries.detailsPage.details.general.copyButton[0]}
                                        copiedLabel={dictionaries.detailsPage.details.general.copyButton[1]}
                                    />
                                </Hstack>
                            </dd>
                        </Dlist>
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
                            uri={`${baseUri}/public-services/${service.id}`}
                            dictionary={dictionaries.detailsPage}
                            locale={locale}
                        />
                    </TabsPanel>
                </Tabs>
            </div>
        </div>
    );
}
