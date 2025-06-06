import React from 'react';
import { type LocaleCodes, type Dictionary } from '@fdk-frontend/dictionaries';
import { type DataService } from '@fdk-frontend/fdk-types';
import Markdown from '@fdk-frontend/ui/markdown';
import Box from '@fdk-frontend/ui/box';
import ExternalLink from '@fdk-frontend/ui/external-link';
import ExpandableContent from '@fdk-frontend/ui/expandable-content';
import detailsPageStyles from '../../../details-page.module.scss';
import PlaceholderText from '@fdk-frontend/ui/placeholder-text';
import SmartList from '@fdk-frontend/ui/smart-list';
import { printLocaleValue } from '@fdk-frontend/utils';

type ApiDetailsProps = {
    api: DataService;
    locale: LocaleCodes;
    dictionary: Dictionary;
};

const ApiDetails = ({ api, locale, dictionary }: ApiDetailsProps) => {
    return (
        <>
            <dl>
                <dt>{dictionary.apis.details.description}:</dt>
                <dd>
                    {api.description ? (
                        <Box className={detailsPageStyles.descBox}>
                            <ExpandableContent maxHeight={100}>
                                <article className={detailsPageStyles.article}>
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
                                        {printLocaleValue(locale, api.description)}
                                    </Markdown>
                                </article>
                            </ExpandableContent>
                        </Box>
                    ) : (
                        <PlaceholderText>{dictionary.apis.details.noData}</PlaceholderText>
                    )}
                </dd>
                <dt>{dictionary.apis.details.endpoint}:</dt>
                <dd>
                    {api.endpointURL?.length ? (
                        <SmartList
                            className='list-no-style'
                            items={api.endpointURL}
                            renderItem={(endpointURL: string, i: number) => (
                                <dl key={endpointURL}>
                                    <dt>{dictionary.apis.details.url}:</dt>
                                    <dd>
                                        <ExternalLink
                                            href={endpointURL}
                                            locale={locale}
                                            gateway
                                        >
                                            {endpointURL}
                                        </ExternalLink>
                                    </dd>
                                    <dt>{dictionary.apis.details.description}:</dt>
                                    <dd>
                                        {api.endpointDescription && api.endpointDescription[i] ? (
                                            <ExpandableContent maxHeight={100}>
                                                <article className={detailsPageStyles.article}>
                                                    <Markdown
                                                        locale={locale}
                                                        components={{
                                                            a: (
                                                                props: React.AnchorHTMLAttributes<HTMLAnchorElement>,
                                                            ) => (
                                                                <ExternalLink
                                                                    {...props}
                                                                    locale={locale}
                                                                    gateway
                                                                />
                                                            ),
                                                        }}
                                                    >
                                                        {api.endpointDescription[i]}
                                                    </Markdown>
                                                </article>
                                            </ExpandableContent>
                                        ) : (
                                            <PlaceholderText>{dictionary.apis.details.noData}</PlaceholderText>
                                        )}
                                    </dd>
                                </dl>
                            )}
                        />
                    ) : (
                        <PlaceholderText>{dictionary.apis.details.noData}</PlaceholderText>
                    )}
                </dd>
                <dt>{dictionary.apis.details.page}:</dt>
                <dd>
                    {api.page?.length ? (
                        <SmartList
                            listType='ol'
                            items={api.page}
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
                        <PlaceholderText>{dictionary.apis.details.noData}</PlaceholderText>
                    )}
                </dd>
            </dl>
        </>
    );
};

export default ApiDetails;
