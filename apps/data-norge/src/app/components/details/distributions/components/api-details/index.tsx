import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import {
    Heading,
    Link,
    Table,
    TableHead,
    TableBody,
    TableHeaderCell,
    TableCell,
    TableRow,
} from '@digdir/designsystemet-react';
import { ExternalLinkIcon } from '@navikt/aksel-icons';
import { i18n, getDictionary, type LocaleCodes } from '@fdk-frontend/dictionaries';
import { type JSONValue } from '@fdk-frontend/types';
import HStack from '@fdk-frontend/ui/hstack';
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
	                    <article className={detailsPageStyles.article}>
	                        {api.description?.[locale] || api.description?.[i18n.defaultLocale]}
	                    </article> :
	                    <PlaceholderText>Ikke oppgitt</PlaceholderText>
	                }
                </dd>
                <dt>Endepunkt:</dt>
                <dd>
                	<Link href="#">{api.endpoint} <ExternalLinkIcon /></Link>
                </dd>
                <dt>Endepunktbeskrivelse:</dt>
                <dd><Link href="#">{api.endpointSpec} <ExternalLinkIcon /></Link></dd>
                <dt>Dokumentasjon:</dt>
                <dd><Link href="#">{api.documentation} <ExternalLinkIcon /></Link></dd>
            </dl>
        </>
    );
}

export default ApiDetails;