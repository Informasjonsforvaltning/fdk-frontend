import { type Localization, type LocaleCodes } from '@fdk-frontend/localization';
import { type DataService, type SearchObject } from '@fellesdatakatalog/types';
import { printLocaleValue } from '@fdk-frontend/utils';
import { Markdown, Article, PlaceholderBox, PlaceholderText, noHeadings, Dlist, SmartList, ExternalLink, TagList, ScrollShadows, DatasetTable } from '@fdk-frontend/ui';
import { Heading, Card, Tag } from '@digdir/designsystemet-react';
import styles from '../details-page.module.scss';

type DataServiceOverviewTabProps = {
    resource: DataService;
    locale: LocaleCodes;
    dictionary: Localization;
    resolvedDatasets?: SearchObject[];
};

export default function DataServiceOverviewTab({ resource, locale, dictionary, resolvedDatasets = [] }: DataServiceOverviewTabProps) {
    return (
        <>
            <section className={styles.section}>
                <Heading
                    level={2}
                    data-size='xs'
                >
                    {dictionary.overview.description.title}
                </Heading>
                {resource.description ? (
                    <Card className={styles.descriptionCard}>
                        <Article>
                            <Markdown
                                locale={locale}
                                allowedElements={noHeadings}
                            >
                                {printLocaleValue(locale, resource.description)}
                            </Markdown>
                        </Article>
                    </Card>
                ) : (
                    <PlaceholderBox>
                        {dictionary.overview.description.placeholder}
                    </PlaceholderBox>
                )}
            </section>
            <section className={styles.section}>
                <Heading
                    level={2}
                    data-size='xs'
                >
                    {dictionary.details.general.endpointTitle}
                </Heading>
                <Dlist>
                    <dt>{dictionary.details.general.endpointTitle}:</dt>
                    <dd>
                        {resource.endpointURL?.length ? (
                            <SmartList
                                items={resource.endpointURL}
                                renderItem={(url) => (
                                    <ExternalLink
                                        href={url}
                                        locale={locale}
                                        gateway
                                    >
                                        {url}
                                    </ExternalLink>
                                )}
                            />
                        ) : (
                            <PlaceholderText>{dictionary.details.noData}</PlaceholderText>
                        )}
                    </dd>
                    <dt>{dictionary.details.general.endpointDescription}:</dt>
                    <dd>
                        {resource.endpointDescription?.length ? (
                            <SmartList
                                items={resource.endpointDescription}
                                renderItem={(url) => (
                                    <ExternalLink
                                        href={url}
                                        locale={locale}
                                        gateway
                                    >
                                        {url}
                                    </ExternalLink>
                                )}
                            />
                        ) : (
                            <PlaceholderText>{dictionary.details.noData}</PlaceholderText>
                        )}
                    </dd>
                    <dt>{dictionary.details.general.page}:</dt>
                    <dd>
                        {resource.page?.length ? (
                            <SmartList
                                items={resource.page}
                                renderItem={(url) => (
                                    <ExternalLink
                                        href={url}
                                        locale={locale}
                                        gateway
                                    >
                                        {url}
                                    </ExternalLink>
                                )}
                            />
                        ) : (
                            <PlaceholderText>{dictionary.details.noData}</PlaceholderText>
                        )}
                    </dd>
                    <dt>{dictionary.details.general.format}:</dt>
                    <dd>
                        {resource.fdkFormat?.length ? (
                            <TagList>
                                {resource.fdkFormat.map((format) => (
                                    <Tag
                                        key={format.code}
                                        data-size='sm'
                                    >
                                        {format.name || format.code}
                                    </Tag>
                                ))}
                            </TagList>
                        ) : (
                            <PlaceholderText>{dictionary.details.noData}</PlaceholderText>
                        )}
                    </dd>
                </Dlist>
            </section>
            {resolvedDatasets.length > 0 && (
                <section className={styles.section}>
                    <Heading
                        level={2}
                        data-size='xs'
                    >
                        {dictionary.overview.servesDataset.title}
                    </Heading>
                    <ScrollShadows className={styles.tableScroller}>
                        <DatasetTable
                            datasets={resolvedDatasets}
                            locale={locale}
                            dictionary={dictionary}
                        />
                    </ScrollShadows>
                </section>
            )}
        </>
    );
}
