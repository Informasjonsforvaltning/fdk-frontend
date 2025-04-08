import React from 'react';
import { type Dataset } from '@fdk-frontend/fdk-types';
import { printLocaleValue } from '@fdk-frontend/utils';
import { type LocaleCodes } from '@fdk-frontend/dictionaries';
import { ChipGroup, ChipToggle, Link } from '@digdir/designsystemet-react';

type DatasetTagsProps = {
    locale: LocaleCodes;
    dataset: Dataset;
};

const DatasetTags = ({ locale, dataset }: DatasetTagsProps & React.HTMLAttributes<HTMLDivElement>) => {
    return (
        <ChipGroup size='sm'>
            {dataset.theme?.map((theme: any) => (
                <Link
                    key={theme.code}
                    href={`/datasets?theme=${theme.code}`}
                >
                    <ChipToggle>{printLocaleValue(locale, theme.title)}</ChipToggle>
                </Link>
            ))}
            {dataset.losTheme?.map((theme: any) => (
                <Link
                    key={theme.code}
                    href={`/datasets?losTheme=${theme.code}`}
                >
                    <ChipToggle>{printLocaleValue(locale, theme.name)}</ChipToggle>
                </Link>
            ))}
        </ChipGroup>
    );
};

export default DatasetTags;
