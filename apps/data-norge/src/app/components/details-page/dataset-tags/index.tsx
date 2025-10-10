import React from 'react';
import { type Dataset } from '@fellesdatakatalog/types';
import { printLocaleValue } from '@fdk-frontend/utils';
import { type LocaleCodes } from '@fdk-frontend/dictionaries';
import { Tag, Link } from '@digdir/designsystemet-react';

type DatasetTagsProps = {
    locale: LocaleCodes;
    dataset: Dataset;
};

const DatasetTags = ({ locale, dataset }: DatasetTagsProps & React.HTMLAttributes<HTMLDivElement>) => {
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {dataset.theme?.map((theme: any) => (
                <Link
                    key={theme.code}
                    href={`/datasets?theme=${theme.code}`}
                >
                    <Tag size='sm'>{printLocaleValue(locale, theme.title) || theme.code}</Tag>
                </Link>
            ))}
            {dataset.losTheme?.map((theme: any) => (
                <Link
                    key={theme.code}
                    href={`/datasets?losTheme=${theme.code}`}
                >
                    <Tag size='sm'>{printLocaleValue(locale, theme.name) || theme.code}</Tag>
                </Link>
            ))}
        </div>
    );
};

export default DatasetTags;
