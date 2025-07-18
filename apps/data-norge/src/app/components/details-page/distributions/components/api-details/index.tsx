import React from 'react';
import { type LocaleCodes, type Dictionary } from '@fdk-frontend/dictionaries';
import { type DataService } from '@fellesdatakatalog/types';
import Markdown from '@fdk-frontend/ui/markdown';
import Box from '@fdk-frontend/ui/box';
import ExternalLink from '@fdk-frontend/ui/external-link';
import ExpandableContent from '@fdk-frontend/ui/expandable-content';
import detailsPageStyles from '../../../details-page.module.scss';
import PlaceholderText from '@fdk-frontend/ui/placeholder-text';
import SmartList from '@fdk-frontend/ui/smart-list';
import DList from '@fdk-frontend/ui/dlist';
import Article from '@fdk-frontend/ui/article';
import { printLocaleValue } from '@fdk-frontend/utils';
import distStyles from '../../distributions.module.scss';

type ApiDetailsProps = {
    api: DataService;
    locale: LocaleCodes;
    dictionary: Dictionary;
};

const ApiDetails = ({ api, locale, dictionary }: ApiDetailsProps) => {
    return (
        <>
            <DList>
                <dt>{dictionary.apis.details.description}:</dt>
                <dd>
                    {api.description ? (
                        <Box className={distStyles.descBox}>
                            <ExpandableContent maxHeight={100}>
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
                                        {printLocaleValue(locale, api.description)}
                                    </Markdown>
                                </Article>
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
                            style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
                            renderItem={(endpointURL: string, i: number) => (
                                <DList key={endpointURL}>
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
                                </DList>
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
            </DList>
        </>
    );
};

export default ApiDetails;
