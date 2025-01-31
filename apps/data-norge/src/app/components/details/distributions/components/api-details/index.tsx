import { Link } from '@digdir/designsystemet-react';
import { ExternalLinkIcon } from '@navikt/aksel-icons';
import { i18n, type LocaleCodes } from '@fdk-frontend/dictionaries';
import { type JSONValue } from '@fdk-frontend/types';
import Markdown from '@fdk-frontend/ui/markdown';
import Box from '@fdk-frontend/ui/box';
import ExpandableContent from '@fdk-frontend/ui/expandable-content';
import detailsPageStyles from '../../../details-page/details-page.module.scss';
import PlaceholderText from '../../../placeholder-text';

type ApiDetailsProps = {
    api: JSONValue;
    locale: LocaleCodes;
}

const ApiDetails = ({ api, locale }: ApiDetailsProps) => {
    return (
        <>
            <dl>
            	<dt>Beskrivelse:</dt>
                <dd>
                	{
                		api.description ?
                        <Box className={detailsPageStyles.descBox}>
                            <ExpandableContent maxHeight={100}>
        	                    <article className={detailsPageStyles.article}>
                                    <Markdown>
        	                           {api.description?.[locale] || api.description?.[i18n.defaultLocale]}
                                    </Markdown>
        	                    </article>
                            </ExpandableContent>
                        </Box> :
	                    <PlaceholderText>Ikke oppgitt</PlaceholderText>
	                }
                </dd>
                <dt>Endepunkt:</dt>
                <dd>
                    {
                        api.endpointURL.map((endpointURL: string, i: number) => {
                            return (
                                <dl key={endpointURL}>
                                    <dt>URL:</dt>
                                    <dd><Link href={endpointURL}>{endpointURL} <ExternalLinkIcon /></Link></dd>
                                    <dt>Beskrivelse:</dt>
                                    <dd>
                                        {
                                            api.endpointDescription && api.endpointDescription[i] ?
                                            <ExpandableContent maxHeight={100}>
                                                <article className={detailsPageStyles.article}>
                                                    <Markdown>
                                                        {api.endpointDescription[i]}
                                                    </Markdown>
                                                </article>
                                            </ExpandableContent> :
                                            <PlaceholderText>Ikke oppgitt</PlaceholderText>    
                                        }
                                    </dd>
                                </dl>
                            );
                        })
                    }
                </dd>
                <dt>Dokumentasjon:</dt>
                <dd>
                    {
                        api.page ?
                        <Link href={api.page}>{api.page} <ExternalLinkIcon /></Link> :
                        <PlaceholderText>Ikke oppgitt</PlaceholderText>
                    }
                </dd>
            </dl>
        </>
    );
}

export default ApiDetails;