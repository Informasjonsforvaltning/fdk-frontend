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
    Tag
} from '@digdir/designsystemet-react';
import { ExternalLinkIcon } from '@navikt/aksel-icons';
import { i18n, type LocaleCodes } from '@fdk-frontend/dictionaries';
import { type JSONValue } from '@fdk-frontend/types';
import HStack from '@fdk-frontend/ui/hstack';
import Markdown from '@fdk-frontend/ui/markdown';
import detailsPageStyles from '../../../details-page/details-page.module.scss';
import PlaceholderText from '../../../placeholder-text';

type DistributionDetailsProps = {
    distribution: JSONValue;
    locale: LocaleCodes;
}

const DistributionDetails = ({ distribution, locale }: DistributionDetailsProps) => {
    return (
        <>
            <dl>
                <dt>Beskrivelse:</dt>
                <dd>
                    {
                        distribution.description ?
                        <article className={detailsPageStyles.article}>
                            <Markdown>
                                {distribution.description?.[locale] || distribution.description?.[i18n.defaultLocale]}
                            </Markdown>
                        </article> :
                        <PlaceholderText>Ikke oppgitt</PlaceholderText>
                    }
                </dd>
                <dt>TilgangsURL:</dt>
                <dd>
                    {
                        distribution.accessURL ?
                        <Link href="#">{distribution.accessURL}</Link> :
                        <PlaceholderText>Ikke oppgitt</PlaceholderText>
                    }
                </dd>
                <dt>Direkte nedlasting:</dt>
                <dd>
                    {
                        distribution.downloadURL ?
                        <Link href="#">{distribution.downloadURL}</Link> :
                        <PlaceholderText>Ikke oppgitt</PlaceholderText>
                    }
                </dd>
                <dt>API:</dt>
                <dd>
                    {
                        distribution.accessService ? 
                        distribution.accessService.map((api: any) => (<Link key={api.uri} href="#">{api.uri}</Link>)) :
                        <PlaceholderText>Ikke oppgitt</PlaceholderText>
                    }
                </dd>
                <dt>Dokumentasjon:</dt>
                <dd>
                    {
                        distribution.page ? 
                        distribution.page.map((page: any) => (<Link key={page.uri} href={page.uri}>{page.uri}</Link>)) :
                        <PlaceholderText>Ikke oppgitt</PlaceholderText>
                    }
                </dd>
                <dt>Lisens:</dt>
                <dd>
                    {
                        distribution.license ? 
                        distribution.license.map((license: any) => (
                            <HStack key={license.uri}>
                                <Link href={license.uri}>
                                    {
                                        license.prefLabel?.[locale] ||
                                        license.prefLabel?.['no'] ||
                                        license.prefLabel?.[i18n.defaultLocale]
                                    }
                                </Link>
                                {/*{
                                    distribution.license &&
                                    <Tag
                                        color='success'
                                        size='sm'
                                        style={{transform:'scale(0.9)'}}
                                    >
                                        Åpen lisens
                                    </Tag>
                                }*/}
                            </HStack>
                        )) :
                        <PlaceholderText>Ikke oppgitt</PlaceholderText>
                    }
                </dd>
                <dt>I samsvar med:</dt>
                <dd>
                    {
                        distribution.conformsTo ? 
                        distribution.conformsTo.map((standard: any) => (
                            <Link href={standard.uri} key={standard.uri}>
                                {
                                    standard.prefLabel ||
                                    standard.uri
                                }
                            </Link>
                        )) :
                        <PlaceholderText>Ikke oppgitt</PlaceholderText>
                    }
                </dd>
            </dl>
        </>
    );
}

const SimpleContent = () => {
    return (
        <>
            <dl>
                <dt>Beskrivelse:</dt>
                <dd>
                    <article className={detailsPageStyles.article}>
                        <p>
                            Statistikk over helt arbeidsledige ved utgangen av måneden fordelt på bostedskommune og
                            fylke Helt ledige arbeidssøkere omfatter alle arbeidssøkere som de to siste ukene har meldt
                            til NAV at de er helt uten arbeid, søker nytt arbeid og er tilgjengelig for det arbeid som
                            søkes. Se om statistikken på www.nav.no for ytterligere forklaringer.
                        </p>
                    </article>
                </dd>
                {/*<dt>TilgangsURL:</dt>
                <dd><Link href="#">https://www.brreg.no/produkter-og-tjenester/bestille-produkter/maskinlesbare-data-enhetsregisteret/full-tilgang-enhetsregisteret/</Link></dd>
                <dt>Direkte nedlasting:</dt>
                <dd><Link href="#">https://www.brreg.no/produkter-og-tjenester/bestille-produkter/maskinlesbare-data-enhetsregisteret/full-tilgang-enhetsregisteret/data.csv</Link></dd>*/}
                <dt>API:</dt>
                <dd>
                    <HStack>
                        <Link href="#">https://api.data.altinn.no/v1
</Link>
                        {/*<div style={{'flexGrow':1}} />
                        <Button size='sm' variant='secondary'>Mer informasjon</Button>*/}
                    </HStack>
                </dd>
                <dt>Lisens:</dt>
                <dd><Link href="#">Creative Commons Navngivelse 4.0 Internasjonal <ExternalLinkIcon /></Link></dd>
            </dl>
        </>
    );
}

const ExampleContent = () => {
    return (
        <>
            <dl>
                <dt>Beskrivelse</dt>
                <dd>
                    <article className={detailsPageStyles.article}>
                        <p>
                            Utdrag av datasett
                        </p>
                    </article>
                </dd>
                {/*<dt>TilgangsURL</dt>
                <dd><Link href="#">https://www.brreg.no/produkter-og-tjenester/bestille-produkter/maskinlesbare-data-enhetsregisteret/full-tilgang-enhetsregisteret/</Link></dd>
                <dt>Direkte nedlasting</dt>
                <dd><Link href="#">https://www.brreg.no/produkter-og-tjenester/bestille-produkter/maskinlesbare-data-enhetsregisteret/full-tilgang-enhetsregisteret/sample.csv</Link></dd>*/}
                <dt>Lisens</dt>
                <dd><Link href="#">Creative Commons Navngivelse 4.0 Internasjonal <ExternalLinkIcon /></Link></dd>
            </dl>
        </>
    );
}

const APIContent = ({ api }: any) => {
    return (
        <>
            <dl>
                <dt>Beskrivelse</dt>
                <dd>
                    <article className={detailsPageStyles.article}>
                        <p>
                            {api.description}
                        </p>
                    </article>
                </dd>
                <dt>Endepunkt:</dt>
                <dd><Link href="#">{api.endpoint} <ExternalLinkIcon /></Link></dd>
                <dt>Endepunktbeskrivelse:</dt>
                <dd><Link href="#">{api.endpointSpec} <ExternalLinkIcon /></Link></dd>
                <dt>Dokumentasjon:</dt>
                <dd><Link href="#">{api.documentation} <ExternalLinkIcon /></Link></dd>
            </dl>
        </>
    );
}


const RichContent = () => {
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

export { RichContent, SimpleContent, ExampleContent, APIContent };
export default DistributionDetails;