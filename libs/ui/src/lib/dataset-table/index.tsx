import React from 'react';
import cn from 'classnames';
import { Link, Table } from '@digdir/designsystemet-react';
import AccessLevelTag from '../access-level-tag';
import HStack from '../hstack';
import { printLocaleValue } from '@fdk-frontend/utils';
import { type Localization, type LocaleCodes } from '@fdk-frontend/localization';
import styles from './dataset-table.module.scss';

type DatasetTableProps = {
    locale: LocaleCodes;
    dictionary: Localization;
    datasets: any[];
};

const DatasetTable = ({
    children,
    datasets,
    locale,
    dictionary,
    ...props
}: DatasetTableProps & React.HTMLAttributes<HTMLDivElement>) => {
    return (
        <Table
            className={cn('table', styles.table)}
            data-size='sm'
            border
            hover
        >
            <tbody>
                {datasets &&
                    datasets.map((dataset: any, index: number) => (
                        <tr key={`${dataset.id}-${index}`}>
                            <td>
                                <Link
                                    href={`/${locale}/datasets/${dataset.id}`}
                                    className={styles.datasetLink}
                                >
                                    {printLocaleValue(locale, dataset.title) || dictionary.header.namelessDataset}
                                </Link>
                            </td>
                            <td>
                                <span className={styles.relatedPublisher}>
                                    {dataset.publisher
                                        ? printLocaleValue(locale, dataset.publisher?.prefLabel)
                                        : dataset.organization
                                          ? printLocaleValue(locale, dataset.organization?.prefLabel)
                                          : `Ukjent virksomhet`}
                                </span>
                            </td>
                            <td align='right'>
                                <HStack
                                    style={{
                                        justifyContent: 'flex-end',
                                        gap: '0.5rem',
                                    }}
                                >
                                    <AccessLevelTag
                                        accessCode={dataset.accessRights?.code}
                                        locale={locale}
                                        nonInteractive
                                    />
                                </HStack>
                            </td>
                        </tr>
                    ))}
            </tbody>
        </Table>
    );
};

export default DatasetTable;
