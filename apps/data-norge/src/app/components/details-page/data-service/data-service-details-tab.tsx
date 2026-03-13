'use client';

import { useState } from 'react';
import { type Localization, type LocaleCodes } from '@fdk-frontend/localization';
import { type DataService } from '@fellesdatakatalog/types';
import { printLocaleValue } from '@fdk-frontend/utils';
import {
    PlaceholderText,
    PlaceholderBox,
    ExternalLink,
    Dlist,
    Hstack,
    InputWithCopyButton,
    SmartList,
    TagList,
} from '@fdk-frontend/ui';
import { Heading, Tag, Link, Button } from '@digdir/designsystemet-react';
import { EyeIcon, EyeSlashIcon } from '@navikt/aksel-icons';
import styles from './data-service.module.scss';

type DataServiceDetailsTabProps = {
    resource: DataService;
    locale: LocaleCodes;
    dictionary: Localization;
};

export default function DataServiceDetailsTab({ resource, locale, dictionary }: DataServiceDetailsTabProps) {
    const [showEmptyRows, setShowEmptyRows] = useState<boolean>(true);

    return (
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
                        {dictionary.details.hideEmptyRows}
                    </>
                ) : (
                    <>
                        <EyeIcon aria-hidden />
                        {dictionary.details.showEmptyRows}
                    </>
                )}
            </Button>

            {!resource.contactPoint?.length && !showEmptyRows ? null : (
                <section>
                    <Heading
                        level={2}
                        data-size='xs'
                    >
                        {dictionary.details.contactPoint.title}
                    </Heading>
                    {resource.contactPoint && resource.contactPoint.length > 0 ? (
                        resource.contactPoint.map((contactPoint, index) => (
                            <Dlist key={index}>
                                {!contactPoint.formattedName && !showEmptyRows ? null : (
                                    <>
                                        <dt>{dictionary.details.contactPoint.formattedName}:</dt>
                                        <dd>
                                            {printLocaleValue(locale, contactPoint.formattedName) || (
                                                <PlaceholderText>{dictionary.details.noData}</PlaceholderText>
                                            )}
                                        </dd>
                                    </>
                                )}
                                {!contactPoint.hasURL && !showEmptyRows ? null : (
                                    <>
                                        <dt>{dictionary.details.contactPoint.uri}:</dt>
                                        <dd>
                                            {contactPoint.hasURL ? (
                                                <ExternalLink
                                                    href={contactPoint.hasURL}
                                                    locale={locale}
                                                    gateway
                                                >
                                                    {contactPoint.hasURL}
                                                </ExternalLink>
                                            ) : (
                                                <PlaceholderText>{dictionary.details.noData}</PlaceholderText>
                                            )}
                                        </dd>
                                    </>
                                )}
                                {!contactPoint.email && !showEmptyRows ? null : (
                                    <>
                                        <dt>{dictionary.details.contactPoint.email}:</dt>
                                        <dd>
                                            {contactPoint.email ? (
                                                <Link href={`mailto:${contactPoint.email}`}>{contactPoint.email}</Link>
                                            ) : (
                                                <PlaceholderText>{dictionary.details.noData}</PlaceholderText>
                                            )}
                                        </dd>
                                    </>
                                )}
                                {!contactPoint.hasTelephone && !showEmptyRows ? null : (
                                    <>
                                        <dt>{dictionary.details.contactPoint.telephone}:</dt>
                                        <dd>
                                            {contactPoint.hasTelephone || (
                                                <PlaceholderText>{dictionary.details.noData}</PlaceholderText>
                                            )}
                                        </dd>
                                    </>
                                )}
                            </Dlist>
                        ))
                    ) : (
                        <PlaceholderBox>{dictionary.details.noData}</PlaceholderBox>
                    )}
                </section>
            )}

            <section>
                <Heading
                    level={2}
                    data-size='xs'
                >
                    {dictionary.details.general.dataServiceTitle}
                </Heading>
                <Dlist>
                    <dt>{dictionary.details.general.publisher}:</dt>
                    <dd>
                        {resource.publisher?.id ? (
                            <Link href={`/organizations/${resource.publisher.id}`}>
                                {printLocaleValue(locale, resource.publisher?.prefLabel) ||
                                    dictionary.header.namelessOrganization}
                            </Link>
                        ) : (
                            printLocaleValue(locale, resource.publisher?.prefLabel) || (
                                <PlaceholderText>{dictionary.details.noData}</PlaceholderText>
                            )
                        )}
                    </dd>
                    {!resource.endpointURL?.length && !showEmptyRows ? null : (
                        <>
                            <dt>{dictionary.details.general.endpointURL}:</dt>
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
                        </>
                    )}
                    {!resource.endpointDescription?.length && !showEmptyRows ? null : (
                        <>
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
                        </>
                    )}
                    {!resource.version && !showEmptyRows ? null : (
                        <>
                            <dt>{dictionary.details.general.version}:</dt>
                            <dd>
                                {resource.version || (
                                    <PlaceholderText>{dictionary.details.noData}</PlaceholderText>
                                )}
                            </dd>
                        </>
                    )}
                    {!resource.landingPage?.length && !showEmptyRows ? null : (
                        <>
                            <dt>{dictionary.details.general.landingPage}:</dt>
                            <dd>
                                {resource.landingPage?.length ? (
                                    <SmartList
                                        items={resource.landingPage}
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
                        </>
                    )}
                    {!resource.page?.length && !showEmptyRows ? null : (
                        <>
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
                        </>
                    )}
                    {!resource.fdkFormat?.length && !showEmptyRows ? null : (
                        <>
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
                        </>
                    )}
                    {!resource.keyword?.length && !showEmptyRows ? null : (
                        <>
                            <dt>{dictionary.details.general.keyword}:</dt>
                            <dd>
                                {resource.keyword?.filter((keyword) => keyword[locale]).length ? (
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                        {resource.keyword
                                            .filter((keyword) => keyword[locale])
                                            .map((keyword, i) => (
                                                <Tag
                                                    key={`keyword-${i}`}
                                                    data-size='sm'
                                                >
                                                    {keyword[locale]}
                                                </Tag>
                                            ))}
                                    </div>
                                ) : (
                                    <PlaceholderText>{dictionary.details.noData}</PlaceholderText>
                                )}
                            </dd>
                        </>
                    )}
                    <dt>{dictionary.details.general.firstHarvested}:</dt>
                    <dd>
                        {resource.harvest?.firstHarvested ? (
                            new Date(resource.harvest.firstHarvested).toLocaleString(locale, {
                                dateStyle: 'long',
                            })
                        ) : (
                            <PlaceholderText>{dictionary.details.noData}</PlaceholderText>
                        )}
                    </dd>
                    <dt>{dictionary.details.general.modified}:</dt>
                    <dd>
                        {resource.harvest?.modified ? (
                            new Date(resource.harvest.modified).toLocaleString(locale, {
                                dateStyle: 'long',
                            })
                        ) : (
                            <PlaceholderText>{dictionary.details.noData}</PlaceholderText>
                        )}
                    </dd>
                    <dt>URI:</dt>
                    <dd>
                        <Hstack>
                            <InputWithCopyButton
                                value={resource.uri}
                                inputLabel='uri'
                                copyLabel={dictionary.details.general.copyButton[0]}
                                copiedLabel={dictionary.details.general.copyButton[1]}
                            />
                        </Hstack>
                    </dd>
                </Dlist>
            </section>

            {!resource.costs?.length && !showEmptyRows ? null : (
                <section>
                    <Heading
                        level={2}
                        data-size='xs'
                    >
                        {dictionary.details.costs.title}
                    </Heading>
                    {resource.costs && resource.costs.length > 0 ? (
                        resource.costs.map((cost, index) => (
                            <Dlist key={index}>
                                {!cost.hasValue && !showEmptyRows ? null : (
                                    <>
                                        <dt>{dictionary.details.costs.value}:</dt>
                                        <dd>
                                            {cost.hasValue ? (
                                                `${cost.hasValue} ${cost.currency?.code || cost.currency?.uri?.split('/').pop() || ''}`
                                            ) : (
                                                <PlaceholderText>{dictionary.details.noData}</PlaceholderText>
                                            )}
                                        </dd>
                                    </>
                                )}
                                {!printLocaleValue(locale, cost.description) && !showEmptyRows ? null : (
                                    <>
                                        <dt>{dictionary.details.costs.description}:</dt>
                                        <dd>
                                            {printLocaleValue(locale, cost.description) || (
                                                <PlaceholderText>{dictionary.details.noData}</PlaceholderText>
                                            )}
                                        </dd>
                                    </>
                                )}
                                {!cost.documentation?.length && !showEmptyRows ? null : (
                                    <>
                                        <dt>{dictionary.details.costs.documentation}:</dt>
                                        <dd>
                                            {cost.documentation?.length ? (
                                                <SmartList
                                                    items={cost.documentation}
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
                                    </>
                                )}
                            </Dlist>
                        ))
                    ) : (
                        <PlaceholderBox>{dictionary.details.noData}</PlaceholderBox>
                    )}
                </section>
            )}

            {!resource.servesDataset?.length && !showEmptyRows ? null : (
                <section>
                    <Heading
                        level={2}
                        data-size='xs'
                    >
                        {dictionary.details.general.servesDataset}
                    </Heading>
                    <Dlist>
                        <dt>URI:</dt>
                        <dd>
                            {resource.servesDataset?.length ? (
                                <SmartList
                                    items={resource.servesDataset}
                                    renderItem={(datasetUri) => (
                                        <Hstack>
                                            <InputWithCopyButton
                                                value={datasetUri}
                                                inputLabel='uri'
                                                copyLabel={dictionary.details.general.copyButton[0]}
                                                copiedLabel={dictionary.details.general.copyButton[1]}
                                            />
                                        </Hstack>
                                    )}
                                />
                            ) : (
                                <PlaceholderText>{dictionary.details.noData}</PlaceholderText>
                            )}
                        </dd>
                    </Dlist>
                </section>
            )}
        </div>
    );
}
