import { type LocaleCodes, type Dictionary } from '@fdk-frontend/dictionaries';
import { type DataService } from '@fdk-frontend/fdk-types';
import Markdown from '@fdk-frontend/ui/markdown';
import Box from '@fdk-frontend/ui/box';
import ExternalLink from '@fdk-frontend/ui/external-link';
import ExpandableContent from '@fdk-frontend/ui/expandable-content';
import detailsPageStyles from '../../../details-page.module.scss';
import PlaceholderText from '@fdk-frontend/ui/placeholder-text';
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
                                    <Markdown locale={locale}>{printLocaleValue(locale, api.description)}</Markdown>
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
                        api.endpointURL.map((endpointURL: string, i: number) => {
                            return (
                                <dl key={endpointURL}>
                                    <dt>{dictionary.apis.details.url}:</dt>
                                    <dd>
                                        <ExternalLink href={endpointURL}>{endpointURL}</ExternalLink>
                                    </dd>
                                    <dt>{dictionary.apis.details.description}:</dt>
                                    <dd>
                                        {api.endpointDescription && api.endpointDescription[i] ? (
                                            <ExpandableContent maxHeight={100}>
                                                <article className={detailsPageStyles.article}>
                                                    <Markdown>{api.endpointDescription[i]}</Markdown>
                                                </article>
                                            </ExpandableContent>
                                        ) : (
                                            <PlaceholderText>{dictionary.apis.details.noData}</PlaceholderText>
                                        )}
                                    </dd>
                                </dl>
                            );
                        })
                    ) : (
                        <PlaceholderText>{dictionary.apis.details.noData}</PlaceholderText>
                    )}
                </dd>
                <dt>{dictionary.apis.details.page}:</dt>
                <dd>
                    {api.page?.length ? (
                        <ul>
                            {api.page.map((page) => (
                                <li key={page}>
                                    <ExternalLink href={page}>{page}</ExternalLink>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <PlaceholderText>{dictionary.apis.details.noData}</PlaceholderText>
                    )}
                </dd>
            </dl>
        </>
    );
};

export default ApiDetails;
