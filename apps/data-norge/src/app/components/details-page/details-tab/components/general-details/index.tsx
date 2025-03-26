import { useContext } from 'react';
import { Heading, Link, Tag, type TagProps, HelpText, Paragraph } from '@digdir/designsystemet-react';
import { ExternalLinkIcon } from '@navikt/aksel-icons';
import HStack from '@fdk-frontend/ui/hstack';
import { calculateMetadataScore } from '@fdk-frontend/utils';
import PlaceholderText from '@fdk-frontend/ui/placeholder-text';
import { DatasetDetailsProps, DatasetDetailsTabContext } from '../../';
import { i18n } from '@fdk-frontend/dictionaries';

const GeneralDetails = ({ dataset, locale, dictionary, metadataScore }: DatasetDetailsProps) => {
    const { showEmptyRows } = useContext(DatasetDetailsTabContext);

    const getMetadataQuality = (value: number) => {
        if (value < 25)
            return { color: 'danger', label: `${dictionary.details.general.metadataQuality.labels.poor} (${value}%)` };
        if (value < 50)
            return {
                color: 'warning',
                label: `${dictionary.details.general.metadataQuality.labels.sufficient} (${value}%)`,
            };
        if (value < 75)
            return { color: 'success', label: `${dictionary.details.general.metadataQuality.labels.good} (${value}%)` };
        return {
            color: 'success',
            label: `${dictionary.details.general.metadataQuality.labels.excellent} (${value}%)`,
        };
    };

    const metadataQualityScore = calculateMetadataScore(metadataScore?.dataset);
    const metadataQuality = getMetadataQuality(metadataQualityScore);

    return (
        <section>
            <Heading
                level={2}
                size='xxsmall'
            >
                {dictionary.details.general.title}
            </Heading>
            <dl>
                <dt>{dictionary.details.general.publisher}:</dt>
                <dd>
                    {
                        dataset.publisher ?
                        <Link href={`/organizations/${dataset.publisher?.id}`}>
                            {dataset.publisher?.prefLabel?.[locale] || dataset.publisher?.prefLabel?.[i18n.defaultLocale]}
                        </Link> :
                        <PlaceholderText>{dictionary.details.noData}</PlaceholderText>
                    }
                </dd>
                <dt>
                    <HStack>
                        <span>{dictionary.details.general.firstHarvested}:</span>
                        <HelpText
                            title={dictionary.details.general.firstHarvestedHelpTextTitle}
                            size='sm'
                            style={{ transform: 'scale(0.75)' }}
                        >
                            <Paragraph size='sm'>{dictionary.details.general.firstHarvestedHelpText}</Paragraph>
                            <Paragraph size='sm'>
                                <Link href='/docs/sharing-data/publishing-data-descriptions/4-triggering-harvest'>
                                    {dictionary.details.general.firstHarvestedHelpTextLink}
                                </Link>
                            </Paragraph>
                        </HelpText>
                    </HStack>
                </dt>
                <dd>
                    {
                        dataset.harvest?.firstHarvested ?
                        new Date(dataset.harvest.firstHarvested).toLocaleString(locale, { dateStyle: 'long' }) :
                        <PlaceholderText>{dictionary.details.noData}</PlaceholderText>
                    }
                </dd>
                {!dataset.page && !showEmptyRows ? null : (
                    <>
                        <dt>{dictionary.details.general.page}:</dt>
                        <dd>
                            {
                                dataset.page?.length ?
                                (<ul>
                                    {
                                        dataset.page.map(page => (
                                            <li key={page}>
                                                <Link href={page}>
                                                    {page} <ExternalLinkIcon />
                                                </Link>
                                            </li>
                                        ))
                                    }
                                </ul>) :
                                <PlaceholderText>{dictionary.apis.details.noData}</PlaceholderText>
                            }
                        </dd>
                    </>
                )}
                <dt>
                    <HStack>
                        {dictionary.details.general.metadataQuality.title}:
                        <HelpText
                            title={dictionary.details.general.metadataQuality.helpTextTitle}
                            size='sm'
                            style={{ transform: 'scale(0.75)' }}
                        >
                            <Paragraph size='sm'>{dictionary.details.general.metadataQuality.helpText}</Paragraph>
                            <Paragraph size='sm'>
                                <Link href='/nb/docs/metadata-quality'>
                                    {dictionary.details.general.metadataQuality.helpTextLink}
                                </Link>
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
