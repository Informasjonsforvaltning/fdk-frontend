'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import cn from 'classnames';
import { type Dictionary, type LocaleCodes, i18n } from '@fdk-frontend/dictionaries';
import { type JSONValue } from '@fdk-frontend/types';
import { sumArrayLengths } from '@fdk-frontend/utils';
import Breadcrumbs from '@fdk-frontend/ui/breadcrumbs';
import Badge from '@fdk-frontend/ui/badge';
import StarButton from '@fdk-frontend/ui/star-button';
import { BrandDivider } from '@fdk-frontend/ui/divider';
import Markdown from '@fdk-frontend/ui/markdown';
import Article from '@fdk-frontend/ui/article';
import ScrollShadows from '@fdk-frontend/ui/scroll-shadows';
import ExpandableContent from '@fdk-frontend/ui/expandable-content';
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
import Distributions from '../../distributions';
import DatasetDescription from '../../dataset-description';
import DatasetDetails from '../../dataset-details';
import MetadataPage from '../../metadata-page';
import CommunityTab from '../../community-tab';
import AccessLevelTag from '../../access-level-tag';
import styles from '../details-page.module.scss';

export type DetailsPageVariants = 'dataset' | 'api' | 'concept';

export type DetailsPageType = {
    variant: DetailsPageVariants;
    resource: JSONValue;
    apis?: JSONValue;
    locale: LocaleCodes;
    commonDictionary: Dictionary;
    defaultActiveTab?: string;
};

export default function DetailsPage({ variant, resource, apis, locale, commonDictionary, defaultActiveTab = 'overview' }: DetailsPageType) {
    const router = useRouter();

    const [activeTab, setActiveTab] = useState(defaultActiveTab);
    const [highlight, setHighlight] = useState(false);

    const blink = () => {
        setHighlight(true);
        setTimeout(() => setHighlight(false), 1000);
    };

    const breadcrumbList = [
        {
            href: '/datasets',
            text: 'Datasett',
        },
        {
            href: '#',
            text: resource.title?.[locale] || resource.title?.[i18n.defaultLocale],
        },
    ];

    const updateUri = (tab: string) => {
        // @ts-expect-error arg numbers
        router.push(`?tab=${tab}`, { scroll: false });
    }

    return (
        <div className={styles.detailsPage}>
            <Breadcrumbs
                dictionary={commonDictionary}
                breadcrumbList={breadcrumbList}
                baseUri=''
            />
            <div className={styles.mainContent}>
                <div className={styles.header}>
                    <Link href={`/organizations/${resource.publisher?.id}`} className={styles.publisher}>
                        {
                            resource.publisher?.prefLabel?.[locale] ||
                            resource.publisher?.prefLabel?.[i18n.defaultLocale]
                        }
                    </Link>
                    <div className={styles.headerGrid}>
                        <Heading
                            level={1}
                            size='lg'
                            className={styles.title}
                        >
                            {resource.title?.[locale] || resource.title?.[i18n.defaultLocale] || resource.title?.['no']}
                        </Heading>
                        <div className={styles.headerToolbar}>
                            <StarButton
                                defaultNumber={13}
                                defaultStarred={false}
                            />
                            <Button
                                size='sm'
                                onClick={() => {
                                    setActiveTab('distributions');
                                    updateUri('distributions')
                                    blink();
                                }}
                            >
                                Bruk datasett
                            </Button>
                        </div>
                        <div className={styles.headerTags}>
                            <Tag
                                color='info'
                                size='sm'
                            >
                                <Link href='/datasets'>Datasett</Link>
                            </Tag>
                            <AccessLevelTag accessCode={resource.accessRights?.code} />
                            <Tag
                                color='success'
                                size='sm'
                            >
                                <Link href={`/datasets?opendata=true`}>Åpne data</Link>
                                &nbsp;
                                <HelpText
                                    title='Begrepsforklaring'
                                    size='sm'
                                    style={{ transform: 'scale(0.75)' }}
                                >
                                    <Paragraph size='sm'>
                                        Datasettet har minst 1 distribusjon med godkjent åpen lisens.
                                    </Paragraph>
                                    <Paragraph size='sm'>
                                        <Link href='https://data.norge.no/specification/dcat-ap-no#Datasett-tilgangsrettigheter'>
                                            Les mer om lisenser her
                                        </Link>
                                    </Paragraph>
                                </HelpText>
                                {/*<Link href='/datasets'>Lisens: {resource.distribution[0].license[0].prefLabel['en']}</Link>*/}
                            </Tag>
                            <span className={styles.lastUpdated}>Publisert 9. mars 2022</span>
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
                                Oversikt
                            </Tab>
                            <Tab
                                value='distributions'
                                onClick={() => updateUri('distributions')}
                            >
                                Distribusjoner og API&nbsp;
                                <Badge>
                                    {sumArrayLengths(resource.distribution, resource.sample, apis)}
                                </Badge>
                            </Tab>
                            <Tab
                                value='details'
                                onClick={() => updateUri('details')}
                            >
                                Detaljer
                            </Tab>
                            <Tab
                                value='community'
                                onClick={() => updateUri('community')}
                            >
                                Diskusjoner&nbsp;<Badge>2</Badge>
                            </Tab>
                            <Tab
                                value='rdf'
                                onClick={() => updateUri('rdf')}
                            >
                                RDF
                            </Tab>
                        </TabList>
                    </ScrollShadows>
                    <TabContent value='overview'>
                        <section className={styles.section}>
                            <Heading
                                level={4}
                                size='xxsmall'
                            >
                                Beskrivelse
                            </Heading>
                            <div className={styles.box}>
                                <ExpandableContent>
                                    <Article>
                                        <Markdown>
                                            {resource.description?.[locale] || resource.description?.[i18n.defaultLocale]}
                                        </Markdown>
                                    </Article>
                                </ExpandableContent>
                                {/*<DatasetDescription className={styles.article}>
                                    {resource.description?.[locale] || resource.description?.[i18n.defaultLocale]}
                                </DatasetDescription>*/}
                            </div>
                        </section>
                        <section className={styles.section}>
                            <Distributions
                                datasets={resource.distribution}
                                exampleData={resource.sample}
                                apis={apis}
                                className={cn({ [styles.highlight]: highlight })}
                                locale={locale}
                            />
                        </section>
                        <BrandDivider className={styles.divider} />
                        <section className={styles.section}>
                            <Heading
                                level={4}
                                size='xxsmall'
                            >
                                Relaterte datasett
                            </Heading>
                            <ScrollShadows className={styles.tableScroller}>
                                <table className='table' style={{minWidth:475}}>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <Link href='#'>Hydrologiske data</Link>
                                            </td>
                                            <td>
                                                <span className={styles.relatedPublisher}>
                                                    Norges vassdrags- og energidirektorat (nve)
                                                </span>
                                            </td>
                                            <td align='right'>
                                                <Tag
                                                    color='success'
                                                    size='sm'
                                                >
                                                    Åpne data
                                                </Tag>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <Link href='#'>Standard for yrkesklassifisering (STYRK08)</Link>
                                            </td>
                                            <td>
                                                <span className={styles.relatedPublisher}>Statistisk sentralbyrå</span>
                                            </td>
                                            <td align='right'>
                                                <Tag
                                                    color='success'
                                                    size='sm'
                                                >
                                                    Åpne data
                                                </Tag>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <Link href='#'>Folketeljinga 1910</Link>
                                            </td>
                                            <td>
                                                <span className={styles.relatedPublisher}>Arkivverket</span>
                                            </td>
                                            <td align='right'>
                                                <Tag
                                                    color='warning'
                                                    size='sm'
                                                >
                                                    Begrenset tilgang
                                                </Tag>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </ScrollShadows>
                        </section>
                    </TabContent>
                    <TabContent value='distributions'>
                        <Distributions
                            datasets={resource.distribution}
                            exampleData={resource.sample}
                            apis={apis}
                            className={cn({ [styles.highlight]: highlight })}
                            locale={locale}
                        />
                    </TabContent>
                    <TabContent value='details'>
                        <DatasetDetails
                            dataset={resource}
                            locale={locale}
                        />
                    </TabContent>
                    <TabContent value='community'>
                        <CommunityTab />
                    </TabContent>
                    <TabContent value='rdf'>
                        <MetadataPage />
                    </TabContent>
                </Tabs>
            </div>
        </div>
    );
}
