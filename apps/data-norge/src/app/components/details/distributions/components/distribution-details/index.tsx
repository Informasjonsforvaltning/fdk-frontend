import { Link } from '@digdir/designsystemet-react';
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

export default DistributionDetails;