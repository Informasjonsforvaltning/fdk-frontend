'use client';

import { useState } from 'react';
import cn from 'classnames';
import { type Dictionary, type LocaleCodes } from '@fdk-frontend/dictionaries';
import { type JSONValue } from '@fdk-frontend/types';
import { sumArrayLengths, printLocaleValue } from '@fdk-frontend/utils';
import Breadcrumbs from '@fdk-frontend/ui/breadcrumbs';
import Badge from '@fdk-frontend/ui/badge';
// import StarButton from '@fdk-frontend/ui/star-button';
import { BrandDivider } from '@fdk-frontend/ui/divider';
import Markdown from '@fdk-frontend/ui/markdown';
import Article from '@fdk-frontend/ui/article';
import HStack from '@fdk-frontend/ui/hstack';
import OrgButton from '@fdk-frontend/ui/org-button';
import ScrollShadows from '@fdk-frontend/ui/scroll-shadows';
import ExpandableContent from '@fdk-frontend/ui/expandable-content';
import AccessLevelTag from '@fdk-frontend/ui/access-level-tag';
import PlaceholderBox from '@fdk-frontend/ui/placeholder-box';
import {
    Button,
    Heading,
    Link,
    Tag,
    Tabs,
    TabList,
    Tab,
    TabContent,
    HelpText,
    Paragraph
} from '@digdir/designsystemet-react';

import Distributions from '../distributions';
import DatasetDetailsTab from '../details-tab';
import MetadataTab from '../metadata-tab';
import CommunityTab from '../community-tab';
import styles from '../details-page.module.scss';

export type DetailsPageVariants = 'dataset' | 'api' | 'concept';

export type DatasetDetailsPageType = {
    variant: DetailsPageVariants;
    baseUri: string;
    resource: JSONValue;
    apis?: JSONValue;
    relatedDatasets?: JSONValue;
    similarDatasets?: JSONValue;
    orgDatasets?: JSONValue;
    metadataScore?: JSONValue;
    communityTopics?: JSONValue;
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
    variant,
    baseUri,
    resource,
    apis,
    relatedDatasets,
    similarDatasets,
    orgDatasets,
    metadataScore,
    communityTopics,
    communityBaseUri,
    orgLogo,
    defaultActiveTab = 'overview',
    locale,
    dictionaries
}: DatasetDetailsPageType) {

    const [activeTab, setActiveTab] = useState(defaultActiveTab);
    const [highlight, setHighlight] = useState(false);

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
            text: printLocaleValue(locale, resource.title)
        },
    ];

    const updateUri = (tab: string) => {
        window.history.pushState(null, "", `?tab=${tab}`);

    }

    return (
        <div className={styles.detailsPage}>
            <Breadcrumbs
                dictionary={dictionaries.common}
                breadcrumbList={breadcrumbList}
                baseUri=''
            />
            <div className={styles.mainContent}>
                <div className={styles.header}>
                    <OrgButton href={`/organizations/${resource.publisher?.id}`} orgLogoSrc={orgLogo}>
                        {
                            resource.publisher ?
                            printLocaleValue(locale, resource.publisher?.prefLabel) :
                            dictionaries.detailsPage.header.namelessOrganization
                        }
                    </OrgButton>
                    <div className={styles.headerGrid}>
                        <Heading
                            level={1}
                            size='lg'
                            className={styles.title}
                        >
                            {
                                printLocaleValue(locale, resource.title) ||
                                dictionaries.detailsPage.header.namelessDataset
                            }
                        </Heading>
                        <div className={styles.headerToolbar}>
                            {/*<StarButton
                                defaultNumber={13}
                                defaultStarred={false}
                            />*/}
                            <Button
                                size='sm'
                                onClick={() => {
                                    setActiveTab('distributions');
                                    updateUri('distributions')
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
                            {/*<Tag
                                color='neutral'
                                size='sm'
                            >
                                <Link href='/datasets'>Autoritativ kilde</Link>
                            </Tag>*/}
                            <AccessLevelTag
                                accessCode={resource.accessRights?.code}
                                dictionary={dictionaries.detailsPage}
                            />
                            {
                                resource.isOpenData &&
                                <Tag
                                    color='success'
                                    size='sm'
                                >
                                    <Link href={`/datasets?opendata=true`}>
                                        {dictionaries.detailsPage.openData.label}
                                    </Link>
                                    &nbsp;
                                    <HelpText
                                        title={dictionaries.detailsPage.openData.helpTextTitle}
                                        size='sm'
                                        style={{ transform: 'scale(0.75)' }}
                                    >
                                        <Paragraph size='sm'>
                                            {dictionaries.detailsPage.openData.helpText}
                                        </Paragraph>
                                        <Paragraph size='sm'>
                                            <Link href='https://data.norge.no/specification/dcat-ap-no#Datasett-tilgangsrettigheter'>
                                                {dictionaries.detailsPage.openData.readMoreLinkText}
                                            </Link>
                                        </Paragraph>
                                    </HelpText>
                                    {/*<Link href='/datasets'>Lisens: {resource.distribution[0].license[0].prefLabel['en']}</Link>*/}
                                </Tag>
                            }
                            <span className={styles.lastUpdated}>
                                {dictionaries.detailsPage.header.published}&nbsp;
                                {new Date(resource.harvest.firstHarvested).toLocaleString(locale, { dateStyle: 'long' })}
                            </span>
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
                                <Badge>
                                    {sumArrayLengths(resource.distribution, resource.sample, apis)}
                                </Badge>
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
                                {
                                    communityTopics.length > 0 &&
                                    <>
                                        &nbsp;<Badge>{communityTopics.length}</Badge>
                                    </>
                                }
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
                                level={4}
                                size='xxsmall'
                            >
                                {dictionaries.detailsPage.overview.description.title}
                            </Heading>
                            {/*{resource.description?.['no']}*/}
                            {/*{printLocaleValue(locale, resource.description)}*/}
                            {
                                resource.description ?
                                <div className={styles.box}>
                                    <ExpandableContent>
                                        <Article>
                                            <Markdown>
                                                {
                                                    printLocaleValue(locale, resource.description)
                                                }
                                            </Markdown>
                                        </Article>
                                    </ExpandableContent> 
                                </div> :
                                <PlaceholderBox>
                                    {dictionaries.detailsPage.overview.description.placeholder}
                                </PlaceholderBox>
                            }
                        </section>
                        <section className={styles.section}>
                            <Distributions
                                datasets={resource.distribution}
                                exampleData={resource.sample}
                                apis={apis}
                                className={cn({ [styles.highlight]: highlight })}
                                locale={locale}
                                dictionary={dictionaries.detailsPage}
                            />
                        </section>
                        {
                            similarDatasets && similarDatasets.length > 0 &&
                            <>
                                <BrandDivider className={styles.divider} />
                                <section className={styles.section}>
                                    <Heading
                                        level={4}
                                        size='xxsmall'
                                    >
                                        {dictionaries.detailsPage.similarDatasets}
                                    </Heading>
                                    <ScrollShadows className={styles.tableScroller}>
                                        <table className={cn('table', styles.relatedTable)} style={{minWidth:475}}>
                                            <tbody>
                                                {
                                                    similarDatasets && similarDatasets.map((dataset: any) => (
                                                        <tr key={dataset.id}>
                                                            <td>
                                                                <Link href={`${dataset.id}`}>
                                                                    {
                                                                        printLocaleValue(locale, dataset.title) ||
                                                                        `Navnløst datasett`
                                                                    }
                                                                </Link>
                                                            </td>
                                                            <td>
                                                                <span className={styles.relatedPublisher}>
                                                                    {
                                                                        dataset.publisher ?
                                                                        printLocaleValue(locale, dataset.publisher?.prefLabel) :
                                                                        dataset.organization ?
                                                                        printLocaleValue(locale, dataset.organization?.prefLabel) :
                                                                        `Ukjent virksomhet`
                                                                    }
                                                                </span>
                                                            </td>
                                                            <td align='right'>
                                                                <HStack style={{justifyContent: 'flex-end', gap: '0.5rem'}}>
                                                                    <AccessLevelTag
                                                                        accessCode={dataset.accessRights?.code}
                                                                        dictionary={dictionaries.detailsPage}
                                                                        nonInteractive
                                                                    />
                                                                </HStack>
                                                            </td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </table>
                                    </ScrollShadows>
                                </section>
                            </>
                        }
                    </TabContent>
                    <TabContent value='distributions'>
                        <Distributions
                            datasets={resource.distribution}
                            exampleData={resource.sample}
                            apis={apis}
                            className={cn({ [styles.highlight]: highlight })}
                            locale={locale}
                            dictionary={dictionaries.detailsPage}
                        />
                    </TabContent>
                    <TabContent value='details'>
                        <DatasetDetailsTab
                            dataset={resource}
                            related={relatedDatasets}
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
