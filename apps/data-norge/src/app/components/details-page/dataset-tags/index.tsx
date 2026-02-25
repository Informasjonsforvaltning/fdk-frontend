import React from 'react';
import { type Dataset } from '@fellesdatakatalog/types';
import { printLocaleValue } from '@fdk-frontend/utils';
import { type LocaleCodes } from '@fdk-frontend/localization';
import { Tag, Link } from '@digdir/designsystemet-react';
import { TagList } from '@fdk-frontend/ui';

type DatasetTagsProps = {
    locale: LocaleCodes;
    dataset: Dataset;
};

const DatasetTags = ({ locale, dataset }: DatasetTagsProps & React.HTMLAttributes<HTMLDivElement>) => {
    return (
        <TagList>
            {dataset.theme?.map((theme: any) => (
                <Link
                    key={theme.code}
                    href={`/datasets?theme=${theme.code}`}
                >
                    <Tag data-size='sm'>{printLocaleValue(locale, theme.title) || theme.code}</Tag>
                </Link>
            ))}
            {dataset.losTheme?.map((theme: any) => (
                <Link
                    key={theme.code}
                    href={`/datasets?losTheme=${theme.code}`}
                >
                    <Tag data-size='sm'>{printLocaleValue(locale, theme.name) || theme.code}</Tag>
                </Link>
            ))}
        </TagList>
    );
};

export default DatasetTags;
