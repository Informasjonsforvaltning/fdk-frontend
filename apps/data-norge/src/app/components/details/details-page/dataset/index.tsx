'use client';

import { useState } from 'react';
import cn from 'classnames';
import { type Dictionary, type LocaleCodes } from '@fdk-frontend/dictionaries';
import { type JSONValue } from '@fdk-frontend/types';
import { sumArrayLengths, printLocaleValue } from '@fdk-frontend/utils';
import Breadcrumbs from '@fdk-frontend/ui/breadcrumbs';
import Badge from '@fdk-frontend/ui/badge';
import StarButton from '@fdk-frontend/ui/star-button';
import { BrandDivider } from '@fdk-frontend/ui/divider';
import Markdown from '@fdk-frontend/ui/markdown';
import Article from '@fdk-frontend/ui/article';
import HStack from '@fdk-frontend/ui/hstack';
import OrgButton from '@fdk-frontend/ui/org-button';
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
import DatasetDetails from '../../dataset-details';
import MetadataPage from '../../metadata-page';
import CommunityTab from '../../community-tab';
import AccessLevelTag from '../../access-level-tag';
import PlaceholderBox from '../../placeholder-box';
import styles from '../details-page.module.scss';

export type DetailsPageVariants = 'dataset' | 'api' | 'concept';

export type DetailsPageType = {
    variant: DetailsPageVariants;
    resource: JSONValue;
    apis?: JSONValue;
    relatedDatasets?: JSONValue;
    orgDatasets?: JSONValue;
    metadataScore?: JSONValue;
    locale: LocaleCodes;
    commonDictionary: Dictionary;
    defaultActiveTab?: string;
    orgLogo?: string;
};

export default function DetailsPage({ variant, resource, apis, relatedDatasets, orgDatasets, metadataScore, orgLogo, locale, commonDictionary, defaultActiveTab = 'overview' }: DetailsPageType) {
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
            text: printLocaleValue(locale, resource.title)
        },
    ];

    const updateUri = (tab: string) => {
        window.history.pushState(null, "", `?tab=${tab}`);

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
                    {/*<Tag
                        color='neutral'
                        size='sm'
                    >
                        <Link href={`/organizations/${resource.publisher?.id}`} style={{textDecoration:'none'}}>
                            {
                                resource.publisher ?
                                printLocaleValue(locale, resource.publisher?.prefLabel) :
                                'Navnløs virksomhet'
                            }
                        </Link>
                    </Tag>*/}
                    {/*<Link href={`/organizations/${resource.publisher?.id}`} className={styles.publisher}>
                        {
                            resource.publisher ?
                            printLocaleValue(locale, resource.publisher?.prefLabel) :
                            'Navnløs virksomhet'
                        }
                    </Link>*/}
                    <OrgButton orgLogo={orgLogo}>
                        {
                            resource.publisher ?
                            printLocaleValue(locale, resource.publisher?.prefLabel) :
                            'Navnløs virksomhet'
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
                                'Navnløst datasett'
                            }
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
                            {/*<Tag
                                color='neutral'
                                size='sm'
                            >
                                <Link href='/datasets'>Autoritativ kilde</Link>
                            </Tag>*/}
                            <AccessLevelTag accessCode={resource.accessRights?.code} />
                            {
                                resource.isOpenData &&
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
                                            Datasettet er klassifisert som <em>Allmenn tilgang</em> og har minst 1 distribusjon med godkjent åpen lisens.
                                        </Paragraph>
                                        <Paragraph size='sm'>
                                            <Link href='https://data.norge.no/specification/dcat-ap-no#Datasett-tilgangsrettigheter'>
                                                Les mer om lisenser her
                                            </Link>
                                        </Paragraph>
                                    </HelpText>
                                    {/*<Link href='/datasets'>Lisens: {resource.distribution[0].license[0].prefLabel['en']}</Link>*/}
                                </Tag>
                            }
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
                                    Dette datasettet har ingen beskrivelse.
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
                            />
                        </section>
                        {
                            relatedDatasets && relatedDatasets.length > 0 &&
                            <>
                                <BrandDivider className={styles.divider} />
                                <section className={styles.section}>
                                    <Heading
                                        level={4}
                                        size='xxsmall'
                                    >
                                        Lignende datasett
                                    </Heading>
                                    <ScrollShadows className={styles.tableScroller}>
                                        <table className={cn('table', styles.relatedTable)} style={{minWidth:475}}>
                                            <tbody>
                                                {
                                                    relatedDatasets && relatedDatasets.map((dataset: any) => (
                                                        <tr key={dataset.id}>
                                                            <td>
                                                                <Link href={`${dataset.id}`}>
                                                                    {printLocaleValue(locale, dataset.title)}
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
                                                                    <AccessLevelTag accessCode={dataset.accessRights?.code} nonInteractive />
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
                        />
                    </TabContent>
                    <TabContent value='details'>
                        <DatasetDetails
                            dataset={resource}
                            locale={locale}
                            metadataScore={metadataScore}
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
