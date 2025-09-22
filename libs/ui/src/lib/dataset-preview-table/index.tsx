import React from 'react';
import { Table, TableHead, TableBody, TableRow, TableHeaderCell, TableCell } from '@digdir/designsystemet-react';
import styles from './styles.module.scss';

type DatasetPreviewTableProps = {
    tableData: any;
};

const DatasetPreviewTable = ({
    tableData,
    ...props
}: DatasetPreviewTableProps & React.HTMLAttributes<HTMLTableElement>) => {
    return (
        <Table
            data-size='sm'
            {...props}
        >
            <TableHead>
                <TableRow>
                    {tableData.header.columns.map((th: string) => (
                        <TableHeaderCell
                            className={styles.cell}
                            key={th}
                        >
                            {th}
                        </TableHeaderCell>
                    ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {tableData.rows.map((row: any, i: number) => (
                    <TableRow key={`row-${i}`}>
                        {row.columns.map((column: string, j: number) => (
                            <TableCell
                                className={styles.cell}
                                key={`col-${j}`}
                            >
                                {column}
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default DatasetPreviewTable;
