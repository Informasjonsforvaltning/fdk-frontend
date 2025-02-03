import { Link, Tag, HelpText, Paragraph } from '@digdir/designsystemet-react';
import { i18n, type LocaleCodes } from '@fdk-frontend/dictionaries';
import { type JSONValue } from '@fdk-frontend/types';
import HStack from '@fdk-frontend/ui/hstack';
import Markdown from '@fdk-frontend/ui/markdown';
import Box from '@fdk-frontend/ui/box';
import ExpandableContent from '@fdk-frontend/ui/expandable-content';
import { printLocaleValue, isOpenLicense } from '@fdk-frontend/utils';
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
                        <Box className={detailsPageStyles.descBox}>
                            <ExpandableContent maxHeight={100}>
                                <article className={detailsPageStyles.article}>
                                    <Markdown>
                                        {printLocaleValue(locale, distribution.description)}
                                    </Markdown>
                                </article>
                            </ExpandableContent>
                        </Box> :
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
                            <div key={license.uri}>
                                <Link href={license.uri}>
                                    {
                                        license.prefLabel ?
                                        printLocaleValue(locale, license.prefLabel) :
                                        license.uri
                                    }
                                </Link>
                                {
                                    isOpenLicense(license.uri) &&
                                    <Tag
                                        color='success'
                                        size='sm'
                                        style={{display: 'inline-flex', marginLeft:'0.5rem'}}
                                    >
                                        Godkjent åpen lisens
                                        &nbsp;
                                        <HelpText
                                            title='Begrepsforklaring'
                                            size='sm'
                                            style={{ transform: 'scale(0.75)' }}
                                        >
                                            <Paragraph size='sm'>
                                                Dette er en godkjent åpen lisens som tillater fri bruk, deling og gjenbruk av data i samsvar med åpne data-prinsipper. Disse lisensene er anerkjent for bruk i offentlige og private datasett, både nasjonalt og internasjonalt.
                                            </Paragraph>
                                            <Paragraph size='sm'>
                                                <Link href='https://data.norge.no/specification/dcat-ap-no#Datasett-tilgangsrettigheter'>
                                                    Les mer om lisenser her
                                                </Link>
                                            </Paragraph>
                                        </HelpText>
                                    </Tag>
                                }
                            </div>
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
                                    standard.prefLabel ?
                                    printLocaleValue(locale, standard.prefLabel) :
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

export default DistributionDetails;