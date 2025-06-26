import React from 'react';
import mime from 'mime-types';
import { type Distribution } from '@fdk-frontend/fdk-types';
import { isOpenLicense } from '@fdk-frontend/utils';
import { type Dictionary } from '@fdk-frontend/dictionaries';
import { Tag } from '@digdir/designsystemet-react';
import TagList from '../tag-list';

type DistributionTagsProps = {
    distribution: Distribution;
    exampleData?: boolean;
    dictionary: Dictionary;
    hasApi?: boolean;
}

const DistributionTags = ({ children, distribution, exampleData, dictionary, hasApi, ...props }: DistributionTagsProps & React.HTMLAttributes<HTMLDivElement>) => {

    const hasOpenLicense = distribution.license && distribution.license.some((l: any) => isOpenLicense(l.uri));

    return (
        <TagList>
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
}

export default DistributionTags;