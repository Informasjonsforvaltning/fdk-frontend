import { useContext } from 'react';
import { Heading, Link, Tag, type TagProps, HelpText, Paragraph } from '@digdir/designsystemet-react';
import { Hstack, PlaceholderText, ExternalLink, SmartList, Dlist, CopyButton } from '@fdk-frontend/ui';
import { calculateMetadataScore, printLocaleValue } from '@fdk-frontend/utils';
import { type DatasetType } from '@fellesdatakatalog/types';
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
            <Dlist>
                <dt>{dictionary.details.general.publisher}:</dt>
                <dd>
                    {dataset.publisher ? (
                        <Link href={`/organizations/${dataset.publisher?.id}`}>
                            {dataset.publisher?.prefLabel?.[locale] ||
                                dataset.publisher?.prefLabel?.[i18n.defaultLocale]}
                        </Link>
                    ) : (
                        <PlaceholderText>{dictionary.details.noData}</PlaceholderText>
                    )}
                </dd>
                <dt>
                    <Hstack>
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
                    </Hstack>
                </dt>
                <dd>
                    {dataset.harvest?.firstHarvested ? (
                        new Date(dataset.harvest.firstHarvested).toLocaleString(locale, { dateStyle: 'long' })
                    ) : (
                        <PlaceholderText>{dictionary.details.noData}</PlaceholderText>
                    )}
                </dd>
                <dt>
                    <span>{dictionary.details.general.modified}:</span>
                </dt>
                <dd>
                    {dataset.harvest?.modified ? (
                        new Date(dataset.harvest.modified).toLocaleString(locale, { dateStyle: 'long' })
                    ) : (
                        <PlaceholderText>{dictionary.details.noData}</PlaceholderText>
                    )}
                </dd>
                {!dataset.landingPage && !showEmptyRows ? null : (
                    <>
                        <dt>{dictionary.details.general.landingPage}:</dt>
                        <dd>
                            {dataset.landingPage?.length ? (
                                <SmartList
                                    items={dataset.landingPage}
                                    renderItem={(page) => (
                                        <ExternalLink
                                            href={page}
                                            locale={locale}
                                            gateway
                                        >
                                            {page}
                                        </ExternalLink>
                                    )}
                                />
                            ) : (
                                <PlaceholderText>{dictionary.details.noData}</PlaceholderText>
                            )}
                        </dd>
                    </>
                )}
                {!dataset.page && !showEmptyRows ? null : (
                    <>
                        <dt>{dictionary.details.general.page}:</dt>
                        <dd>
                            {dataset.page?.length ? (
                                <SmartList
                                    items={dataset.page}
                                    renderItem={(page) => (
                                        <ExternalLink
                                            href={page}
                                            locale={locale}
                                            gateway
                                        >
                                            {page}
                                        </ExternalLink>
                                    )}
                                />
                            ) : (
                                <PlaceholderText>{dictionary.details.noData}</PlaceholderText>
                            )}
                        </dd>
                    </>
                )}
                {!dataset.dctType && !showEmptyRows ? null : (
                    <>
                        <dt>{dictionary.details.general.type}:</dt>
                        <dd>
                            {dataset.dctType ? (
                                printLocaleValue(locale, (dataset.dctType as DatasetType)?.prefLabel)
                            ) : (
                                <PlaceholderText>{dictionary.details.noData}</PlaceholderText>
                            )}
                        </dd>
                    </>
                )}
                <dt>
                    <Hstack>
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
                    </Hstack>
                </dt>
                <dd>
                    <Tag
                        size='sm'
                        color={metadataQuality.color as TagProps['color']}
                    >
                        {metadataQuality.label}
                    </Tag>
                </dd>
                <dt>UID:</dt>
                <dd>
                    <HStack>
                        {dataset.id}
                        <CopyButton
                            copyLabel={dictionary.details.general.copyButton[0]}
                            copiedLabel={dictionary.details.general.copyButton[1]}
                            copyOnClick={dataset.id}
                            buttonProps={{
                                style: { margin: '-0.25rem 0' }
                            }}
                        />
                    </HStack>
                </dd>
            </Dlist>
        </section>
    );
};

export default GeneralDetails;
