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

import detailsPageStyles from '../details-page/details-page.module.scss';

const DistributionContent = () => {
    return (
        <>
            <dl>
                <dt>Beskrivelse</dt>
                <dd>
                    <article className={detailsPageStyles.article}>
                        <p>
                            Statistikk over helt arbeidsledige ved utgangen av måneden fordelt på bostedskommune og
                            fylke Helt ledige arbeidssøkere omfatter alle arbeidssøkere som de to siste ukene har meldt
                            til NAV at de er helt uten arbeid, søker nytt arbeid og er tilgjengelig for det arbeid som
                            søkes. Se om statistikken på www.nav.no for ytterligere forklaringer.
                        </p>
                        <Heading level={4}>Datastruktur</Heading>
                        <Table size='sm'>
                            <TableHead>
                                <TableRow>
                                    <TableHeaderCell>Code</TableHeaderCell>
                                    <TableHeaderCell>ParentCode</TableHeaderCell>
                                    <TableHeaderCell>Level</TableHeaderCell>
                                    <TableHeaderCell>Name</TableHeaderCell>
                                    <TableHeaderCell>ShortName</TableHeaderCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell>0</TableCell>
                                    <TableCell>0</TableCell>
                                    <TableCell>1</TableCell>
                                    <TableCell>Militære yrker og uoppgitt</TableCell>
                                    <TableCell>n/a</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>0</TableCell>
                                    <TableCell>0</TableCell>
                                    <TableCell>1</TableCell>
                                    <TableCell>Ledere</TableCell>
                                    <TableCell>n/a</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>0</TableCell>
                                    <TableCell>0</TableCell>
                                    <TableCell>1</TableCell>
                                    <TableCell>Akademiske yrker</TableCell>
                                    <TableCell>n/a</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                        <Heading level={4}>Eksempel på data</Heading>
                        <SyntaxHighlighter
                            language='json'
                            style={vscDarkPlus}
                        >
                            {`{
  "id": "https://register.geonorge.no/sosi-kodelister/inndelinger/inndelingsbase/kommunenummer/5427",
  "label": "Skjervøy",
  "lang": "no",
  "itemclass": "CodelistValue",
  "uuid": "56d0f814-f25e-48fe-b190-00363e84d020",
  "status": "Tilbaketrukket",
  "description": "Skjervøy",
  "seoname": "skjervøy",
  "owner": "Kartverket",
  "versionNumber": 1,
  "lastUpdated": "2023-01-02T10:03:45.647",
  "dateSubmitted": "2023-01-02T10:03:45.457",
  "codevalue": "5427",
  "ValidFrom": "2020-01-01T00:00:00",
  "ValidTo": "2023-12-31T00:00:00"
}`}
                        </SyntaxHighlighter>
                    </article>
                </dd>
                {/*<dt>Få tilgang til datasettet:</dt>
                <dd>
                    <Link href={distribution.accessUrl}>
                        {distribution.accessUrl}
                    </Link>
                </dd>
                <dt>Direkte nedlastingslenke:</dt>
                <dd>
                    <Link href={distribution.downloadUrl}>
                        {distribution.downloadUrl}
                    </Link>
                </dd>*/}
                <dt>Lisens</dt>
                <dd>
                    <Link href='http://publications.europa.eu/resource/authority/licence/NLOD_2_0'>
                        Norsk lisens for offentlige data
                        <ExternalLinkIcon />
                    </Link>
                </dd>
            </dl>
            {/*<table>
                <tbody>
                    <tr>
                        <th>Beskrivelse:</th>
                        <td>{distribution.description}</td>
                    </tr>
                    <tr>
                        <th>Lisens:</th>
                        <td>
                            <Link href='http://publications.europa.eu/resource/authority/licence/NLOD_2_0'>
                                Norsk lisens for offentlige data<ExternalLinkIcon />
                            </Link>
                        </td>
                    </tr>
                </tbody>
            </table>*/}
        </>
    );
};

export default DistributionContent;
