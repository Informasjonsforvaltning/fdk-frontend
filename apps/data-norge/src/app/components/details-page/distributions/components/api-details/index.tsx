import { Link } from '@digdir/designsystemet-react';
import { ExternalLinkIcon } from '@navikt/aksel-icons';
import { i18n, type LocaleCodes, type Dictionary } from '@fdk-frontend/dictionaries';
import { type JSONValue } from '@fdk-frontend/types';
import Markdown from '@fdk-frontend/ui/markdown';
import Box from '@fdk-frontend/ui/box';
import ExpandableContent from '@fdk-frontend/ui/expandable-content';
import detailsPageStyles from '../../../details-page.module.scss';
import PlaceholderText from '@fdk-frontend/ui/placeholder-text';

type ApiDetailsProps = {
    api: JSONValue;
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
                                    <Markdown>
                                        {api.description?.[locale] || api.description?.[i18n.defaultLocale]}
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
                    {api.endpointURL.map((endpointURL: string, i: number) => {
                        return (
                            <dl key={endpointURL}>
                                <dt>{dictionary.apis.details.url}:</dt>
                                <dd>
                                    <Link href={endpointURL}>
                                        {endpointURL} <ExternalLinkIcon />
                                    </Link>
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
                    })}
                </dd>
                <dt>{dictionary.apis.details.page}:</dt>
                <dd>
                    {api.page ? (
                        <Link href={api.page}>
                            {api.page} <ExternalLinkIcon />
                        </Link>
                    ) : (
                        <PlaceholderText>{dictionary.apis.details.noData}</PlaceholderText>
                    )}
                </dd>
            </dl>
        </>
    );
};

export default ApiDetails;
