import { PropsWithChildren } from 'react';

import { Heading, Link, Tag, type TagProps, HelpText, Paragraph } from '@digdir/designsystemet-react';
import { ExternalLinkIcon } from '@navikt/aksel-icons';
import HStack from '@fdk-frontend/ui/hstack';

import PlaceholderText from '../../../placeholder-text';

const GeneralDetails = ({ fields, ...props }: { fields: any } & PropsWithChildren) => {
    const getMetadataQuality = (value: number) => {
        if (value < 25) return { color: 'danger', label: `Dårlig (${value}%)` };
        if (value < 50) return { color: 'warning', label: `Tilstrekkelig (${value}%)` };
        if (value < 75) return { color: 'success', label: `God (${value}%)` };
        return { color: 'success', label: `Utmerket (${value}%)` };
    };

    const metadataQuality = getMetadataQuality(fields['Metadatakvalitet']);

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
                    {fields['Ansvarlig virksomhet'] ? (
                        <Link href='#'>{fields['Ansvarlig virksomhet']}</Link>
                    ) : (
                        <PlaceholderText>Ikke oppgitt</PlaceholderText>
                    )}
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
                                Denne datoen sier når datasettet ble publisert på data.norge.no. Det kan ha vært
                                tilgjengelig tidligere andre steder.
                            </Paragraph>
                        </HelpText>
                    </HStack>
                </dt>
                <dd>9. mars 2022</dd>
                <dt>Dokumentasjon:</dt>
                <dd>
                    <Link href='#'>
                        https://github.com/opendatalab-no/open-municipal-data
                        <ExternalLinkIcon />
                    </Link>
                </dd>
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
