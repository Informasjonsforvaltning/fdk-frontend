'use client';

import React from 'react';
import { type DatasetWithIdentifier, type DataService } from '@fellesdatakatalog/types';
import { type Dictionary, type LocaleCodes } from '@fdk-frontend/dictionaries';
import { printLocaleValue } from '@fdk-frontend/utils';
import {
    OrgButton,
    OpenDataTag,
    AccessRequestButton,
    AccessLevelTag,
    UseDatasetPopover,
    TagList,
} from '@fdk-frontend/ui';
import { Heading, Link, Tag } from '@digdir/designsystemet-react';
import styles from './dataset-header.module.scss';

type DatasetHeaderProps = {
    dataset: DatasetWithIdentifier;
    apis?: DataService[];
    dictionaries: {
        common: Dictionary;
        detailsPage: Dictionary;
    };
    locale: LocaleCodes;
    orgLogo?: string | null;
    accessRequestDemo?: boolean;
    isAvailable?: boolean;
};

const DatasetHeader = ({
    children,
    dataset,
    apis = [],
    dictionaries,
    orgLogo,
    locale,
    accessRequestDemo,
    isAvailable,
    ...props
}: DatasetHeaderProps & React.HTMLAttributes<HTMLDivElement>) => {
    return (
        <div className={styles.header}>
            <OrgButton
                href={`/organizations/${dataset.publisher?.id}`}
                orgLogoSrc={orgLogo}
                className={styles.orgBtn}
            >
                {printLocaleValue(locale, dataset.publisher?.prefLabel) ??
                    dictionaries.detailsPage.header.namelessOrganization}
            </OrgButton>
            <Heading
                level={1}
                data-size='lg'
                className={styles.title}
            >
                {printLocaleValue(locale, dataset.title) || dictionaries.detailsPage.header.namelessDataset}
            </Heading>
            <div className={styles.headerToolbar}>
                {accessRequestDemo && (
                    <AccessRequestButton
                        kind='datasets'
                        id={dataset.id}
                        locale={locale}
                        dictionary={dictionaries.detailsPage}
                        isAvailable={isAvailable}
                    />
                )}
                <UseDatasetPopover
                    dataset={dataset}
                    apis={apis}
                    dictionary={dictionaries.detailsPage}
                    locale={locale}
                />
            </div>
            <TagList className={styles.headerTags}>
                <Tag
                    data-color='info'
                    data-size='md'
                >
                    <Link href='/datasets'>{dictionaries.detailsPage.header.datasetsTagLink}</Link>
                </Tag>
                <AccessLevelTag
                    accessCode={dataset.accessRights?.code}
                    locale={locale}
                    dictionary={dictionaries.detailsPage}
                    data-size='md'
                />
                {dataset.isOpenData && <OpenDataTag dictionary={dictionaries.common} />}
            </TagList>
        </div>
    );
};

export default DatasetHeader;
