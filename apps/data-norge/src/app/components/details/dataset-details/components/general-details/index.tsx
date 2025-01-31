import { useContext } from 'react';
import { Heading, Link, Tag, type TagProps, HelpText, Paragraph } from '@digdir/designsystemet-react';
import { ExternalLinkIcon } from '@navikt/aksel-icons';
import HStack from '@fdk-frontend/ui/hstack';
import PlaceholderText from '../../../placeholder-text';
import { DatasetDetailsProps, DatasetDetailsContext } from '../../';
import { i18n } from '@fdk-frontend/dictionaries';

const GeneralDetails = ({ dataset, locale }: DatasetDetailsProps) => {

    const { showEmptyRows } = useContext(DatasetDetailsContext);
    
    const getMetadataQuality = (value: number) => {
        if (value < 25) return { color: 'danger', label: `Dårlig (${value}%)` };
        if (value < 50) return { color: 'warning', label: `Tilstrekkelig (${value}%)` };
        if (value < 75) return { color: 'success', label: `God (${value}%)` };
        return { color: 'success', label: `Utmerket (${value}%)` };
    };

    const metadataQuality = getMetadataQuality(75);

    return (
        <section>
            <Heading
                level={4}
                size='xxsmall'
            >
                Generelt
            </Heading>
            <dl>
                <dt>Ansvarlig virksomhet:</dt>
                <dd>
                    <Link href={`/organizations/${dataset.publisher?.id}`}>
                        {dataset.publisher.prefLabel?.[locale] || dataset.publisher.prefLabel?.[i18n.defaultLocale]}
                    </Link>
                </dd>
                
                <dt>
                    <HStack>
                        <span>Publisert:</span>
                        <HelpText
                            title='Begrepsforklaring'
                            size='sm'
                            style={{ transform: 'scale(0.75)' }}
                        >
                            <Paragraph size='sm'>
                                Denne datoen sier når datasettet ble <Link href="/docs/sharing-data/publishing-data-descriptions/4-triggering-harvest">høstet</Link> av data.norge.no. Det kan ha vært
                                tilgjengelig tidligere andre steder.
                            </Paragraph>
                        </HelpText>
                    </HStack>
                </dt>
                <dd>
                    {new Date(dataset.harvest.firstHarvested).toLocaleString(locale, { dateStyle: 'long' })}
                </dd>
                {
                    (!dataset.page && !showEmptyRows) ? null :
                    <>
                        <dt>Dokumentasjon:</dt>
                        <dd>
                            {
                                dataset.page ?
                                <Link href={dataset.page}>
                                    {dataset.page}
                                    <ExternalLinkIcon />
                                </Link> :
                                <PlaceholderText>Ikke oppgitt</PlaceholderText>
                            }
                        </dd>
                    </>
                }
                <dt>
                    <HStack>
                        Metadatakvalitet:
                        <HelpText
                            title='Begrepsforklaring'
                            size='sm'
                            style={{ transform: 'scale(0.75)' }}
                        >
                            <Paragraph size='sm'>
                                Metadatakvalitet er en indikator på hvor godt datasettene er beskrevet ved hjelp av
                                metadata.
                            </Paragraph>
                            <Paragraph size='sm'>
                                <Link href='/nb/docs/metadata-quality'>Les mer om metadatakvalitet her</Link>
                            </Paragraph>
                        </HelpText>
                    </HStack>
                </dt>
                <dd>
                    <Tag
                        size='sm'
                        color={metadataQuality.color as TagProps['color']}
                    >
                        {metadataQuality.label}
                    </Tag>
                </dd>
            </dl>
        </section>
    );
};

export default GeneralDetails;
