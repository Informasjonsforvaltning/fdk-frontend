'use client';

import React, { Fragment, useState } from 'react';
import { type Dictionary, type LocaleCodes } from '@fdk-frontend/dictionaries';
import { type Organization, type CommunityTopic, type PublicService, SearchObject } from '@fellesdatakatalog/types';
import { getSlug, printLocaleValue, sumArrayLengths } from '@fdk-frontend/utils';
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
    StatusTag,
} from '@fdk-frontend/ui';
import { Card, Heading, Tabs, TabsList, TabsTab, TabsPanel, Button, Link, Tag } from '@digdir/designsystemet-react';
import MetadataTab from '../metadata-tab';
import CommunityTab from '../community-tab';
import styles from './service.module.scss';
import { EyeIcon, EyeSlashIcon } from '@navikt/aksel-icons';
import ServiceStructuredData from '../../structured-data/service-structured-data';

export type ServiceDetailsPageType = {
    baseUri: string;
    communityTopics?: CommunityTopic[];
    communityBaseUri: string;
    concepts: SearchObject[];
    defaultActiveTab?: string;
    dictionaries: {
        common: Dictionary;
        detailsPage: Dictionary;
    };
    locale: LocaleCodes;
    orgLogo?: string | null;
    publisher?: Partial<Organization>;
    service: PublicService;
};

export default function ServiceDetailsPage(props: ServiceDetailsPageType) {
    const {
        baseUri,
        communityTopics,
        communityBaseUri,
        concepts,
        defaultActiveTab,
        dictionaries,
        locale,
        orgLogo,
        publisher,
        service,
    } = props;
    const [activeTab, setActiveTab] = useState(defaultActiveTab);
    const [showEmptyRows, setShowEmptyRows] = useState<boolean>(true);

    const publisherId = publisher?.id || publisher?.identifier;
    const publisherLabel = printLocaleValue(locale, publisher?.prefLabel || publisher?.title || publisher?.name);

    const breadcrumbList = [
        {
            href: '/public-services-and-events',
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
                    {publisherId && (
                        <div>
                            <OrgButton
                                href={`/organizations/${publisherId}`}
                                orgLogoSrc={orgLogo}
                            >
                                {publisherLabel}
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
                            <Link href='/public-services-and-events'>
                                {dictionaries.detailsPage.header.servicesTagLink}
                            </Link>
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
                        className={styles.tabsPanel}
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
                                                a: (anchorProps: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
                                                    <ExternalLink
                                                        {...anchorProps}
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
                            <Dlist>
                                {service.produces?.map((output, index) => (
                                    <Fragment key={`${output.identifier}-${index}`}>
                                        <dt className={styles.producesDt}>
                                            {printLocaleValue(locale, output.name) ||
                                                dictionaries.detailsPage.produces.header.nameless}
                                        </dt>
                                        <dd>{printLocaleValue(locale, output.description)}</dd>
                                    </Fragment>
                                ))}
                            </Dlist>
                        ) : (
                            <PlaceholderBox>{dictionaries.detailsPage.produces.placeholder}</PlaceholderBox>
                        )}

                        <Heading
                            level={2}
                            data-size='xs'
                            className={styles.heading}
                        >
                            <Hstack>
                                <span>{dictionaries.detailsPage.details.requires.title}</span>
                                <Badge>{sumArrayLengths(service.requires)}</Badge>
                            </Hstack>
                        </Heading>
                        {sumArrayLengths(service.requires) > 0 ? (
                            <Dlist>
                                {service.requires?.map((item) => (
                                    <Fragment key={item.id}>
                                        <dt>
                                            <Link href={`/${locale}/services/${item.id}/${getSlug(item, locale)}`}>
                                                {printLocaleValue(locale, item.title) ||
                                                    dictionaries.detailsPage.header.namelessService}
                                            </Link>
                                        </dt>
                                        <dd>{printLocaleValue(locale, item.description)}</dd>
                                    </Fragment>
                                ))}
                            </Dlist>
                        ) : (
                            <PlaceholderBox>{dictionaries.detailsPage.details.requires.placeholder}</PlaceholderBox>
                        )}
                    </TabsPanel>
                    <TabsPanel
                        className={styles.tabsPanel}
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

                        {!concepts.length && !showEmptyRows ? null : (
                            <>
                                <Heading
                                    level={2}
                                    data-size='xs'
                                    className={styles.heading}
                                >
                                    {dictionaries.detailsPage.details.subject.title}
                                </Heading>
                                {concepts.length ? (
                                    <Dlist className={styles.dlist}>
                                        {concepts.map((concept) => (
                                            <React.Fragment key={concept.uri}>
                                                <dt>
                                                    <Link href={`/concepts/${concept.id}`}>
                                                        {printLocaleValue(locale, concept.title) || concept.uri}
                                                    </Link>
                                                </dt>
                                                <dd>{printLocaleValue(locale, concept.description)}</dd>
                                            </React.Fragment>
                                        ))}
                                    </Dlist>
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
                                {publisherId ? (
                                    <Link href={`/organizations/${publisherId}`}>
                                        {publisherLabel || dictionaries.detailsPage.header.namelessOrganization}
                                    </Link>
                                ) : (
                                    publisherLabel || (
                                        <PlaceholderText>{dictionaries.detailsPage.details.noData}</PlaceholderText>
                                    )
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
                            {!service.spatial && !showEmptyRows ? null : (
                                <>
                                    <dt>{dictionaries.detailsPage.details.content.spatial}:</dt>
                                    <dd className='article'>
                                        {service.spatial ? (
                                            <SmartList
                                                listType='ol'
                                                items={service.spatial}
                                                renderItem={(spatial) =>
                                                    spatial.uri ? (
                                                        <ExternalLink
                                                            href={spatial.uri}
                                                            locale={locale}
                                                            gateway
                                                        >
                                                            {spatial.prefLabel
                                                                ? printLocaleValue(locale, spatial?.prefLabel)
                                                                : spatial.uri}
                                                        </ExternalLink>
                                                    ) : (
                                                        printLocaleValue(locale, spatial?.prefLabel)
                                                    )
                                                }
                                            />
                                        ) : (
                                            <PlaceholderText>{dictionaries.detailsPage.details.noData}</PlaceholderText>
                                        )}
                                    </dd>
                                </>
                            )}
                            <dt>URI:</dt>
                            <dd>
                                <Hstack>
                                    <InputWithCopyButton
                                        value={service.uri}
                                        inputLabel='uri'
                                        copyLabel={dictionaries.detailsPage.details.general.copyButton[0]}
                                        copiedLabel={dictionaries.detailsPage.details.general.copyButton[1]}
                                    />
                                </Hstack>
                            </dd>
                        </Dlist>

                        {!service.eurovocThemes?.length && !service.losThemes?.length && !showEmptyRows ? null : (
                            <>
                                <Heading
                                    level={2}
                                    data-size='xs'
                                    className={styles.heading}
                                >
                                    {dictionaries.detailsPage.details.thematicArea}
                                </Heading>
                                {service.eurovocThemes?.length || service.losThemes?.length ? (
                                    <TagList>
                                        {service.eurovocThemes?.map((theme) => (
                                            <Link
                                                key={theme.code}
                                                href={`/public-services-and-events?eurovocTheme=${theme.code}`}
                                            >
                                                <Tag data-size='sm'>
                                                    {printLocaleValue(locale, theme.label) || theme.code}
                                                </Tag>
                                            </Link>
                                        ))}

                                        {service.losThemes?.map((theme) => (
                                            <Link
                                                key={theme.code}
                                                href={`/public-services-and-events?losTheme=${theme.code}`}
                                            >
                                                <Tag data-size='sm'>
                                                    {printLocaleValue(locale, theme.name) || theme.code}
                                                </Tag>
                                            </Link>
                                        ))}
                                    </TagList>
                                ) : (
                                    <PlaceholderBox>{dictionaries.detailsPage.details.noData}</PlaceholderBox>
                                )}
                            </>
                        )}
                    </TabsPanel>
                    <TabsPanel
                        className={styles.tabsPanel}
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
                        className={styles.tabsPanel}
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
