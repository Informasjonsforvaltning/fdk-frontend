import { type Localization, type LocaleCodes } from '@fdk-frontend/localization';
import { type DataService } from '@fellesdatakatalog/types';
import { printLocaleValue } from '@fdk-frontend/utils';
import { Markdown, Article, PlaceholderBox, noHeadings, Dlist, SmartList, ExternalLink } from '@fdk-frontend/ui';
import { Heading, Card } from '@digdir/designsystemet-react';
import styles from '../details-page.module.scss';

type DataServiceOverviewTabProps = {
    resource: DataService;
    locale: LocaleCodes;
    dictionary: Localization;
};

export default function DataServiceOverviewTab({ resource, locale, dictionary }: DataServiceOverviewTabProps) {
    const hasEndpointURL = !!resource.endpointURL?.length;
    const hasEndpointDescription = !!resource.endpointDescription?.length;
    const hasEndpointData = hasEndpointURL || hasEndpointDescription;

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
            {hasEndpointData && (
                <section className={styles.section}>
                    <Heading
                        level={2}
                        data-size='xs'
                    >
                        Ta i bruk API-et
                    </Heading>
                    <Dlist>
                        {hasEndpointURL && (
                            <>
                                <dt>{dictionary.details.general.endpointURL}:</dt>
                                <dd>
                                    <SmartList
                                        items={resource.endpointURL!}
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
                                </dd>
                            </>
                        )}
                        {hasEndpointDescription && (
                            <>
                                <dt>{dictionary.details.general.endpointDescription}:</dt>
                                <dd>
                                    <SmartList
                                        items={resource.endpointDescription!}
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
                                </dd>
                            </>
                        )}
                    </Dlist>
                </section>
            )}
        </>
    );
}
