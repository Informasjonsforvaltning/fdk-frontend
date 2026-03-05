import React from 'react';
import mime from 'mime-types';
import { type Distribution } from '@fellesdatakatalog/types';
import { isOpenLicense } from '@fdk-frontend/utils';
import { type Localization } from '@fdk-frontend/localization';
import { Tag } from '@digdir/designsystemet-react';
import TagList, { type TagListProps } from '../tag-list';

type DistributionTagsProps = TagListProps & {
    distribution: Distribution;
    exampleData?: boolean;
    dictionary: Localization;
    hasApi?: boolean;
};

const DistributionTags = ({
    children,
    distribution,
    exampleData,
    dictionary,
    ...props
}: DistributionTagsProps & React.HTMLAttributes<HTMLUListElement>) => {
    const hasOpenLicense = distribution.license && distribution.license.some((l: any) => isOpenLicense(l.uri));
    const hasApi = Boolean(distribution.accessService?.length);

    return (
        <TagList {...props}>
            {hasOpenLicense && (
                <Tag
                    data-color='success'
                    data-size='md'
                >
                    {dictionary.distributions.header.openLicense}
                </Tag>
            )}
            {hasApi && (
                <Tag
                    data-color='success'
                    data-size='md'
                >
                    {dictionary.distributions.header.hasApi}
                </Tag>
            )}
            {exampleData && (
                <Tag
                    data-color='neutral'
                    data-size='md'
                >
                    {dictionary.distributions.header.exampleData}
                </Tag>
            )}
            {distribution.fdkFormat
                ?.filter((format: any) => format?.code)
                .map((format: any) => (
                    <Tag
                        data-color='info'
                        data-size='md'
                        key={format.code}
                    >
                        {(mime.extension(format.code) || format.name || format.code)?.toLowerCase()}
                    </Tag>
                ))}
        </TagList>
    );
};

export default DistributionTags;
