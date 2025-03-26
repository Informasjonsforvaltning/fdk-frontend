import React from 'react';
import mime from 'mime-types';
import { type Distribution } from '@fdk-frontend/fdk-types';
import { isOpenLicense } from '@fdk-frontend/utils';
import { type Dictionary } from '@fdk-frontend/dictionaries';
import { Tag } from '@digdir/designsystemet-react';
import TagList, { type TagListProps } from '../tag-list';

type DistributionTagsProps = TagListProps & {
    distribution: Distribution;
    exampleData?: boolean;
    dictionary: Dictionary;
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
                    color='success'
                    size='sm'
                >
                    {dictionary.distributions.header.openLicense}
                </Tag>
            )}
            {hasApi && (
                <Tag
                    color='success'
                    size='sm'
                >
                    {dictionary.distributions.header.hasApi}
                </Tag>
            )}
            {exampleData && (
                <Tag
                    color='neutral'
                    size='sm'
                >
                    {dictionary.distributions.header.exampleData}
                </Tag>
            )}
            {distribution.fdkFormat
                ?.filter((format: any) => format?.code)
                .map((format: any) => (
                    <Tag
                        color='info'
                        size='sm'
                        key={format.code}
                    >
                        {(mime.extension(format.code) || format.name || format.code)?.toLowerCase()}
                    </Tag>
                ))}
        </TagList>
    );
};

export default DistributionTags;
