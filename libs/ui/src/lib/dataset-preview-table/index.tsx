import React from 'react';
import {
	Table,
    TableHead,
    TableBody,
    TableRow,
    TableHeaderCell,
    TableCell
} from '@digdir/designsystemet-react';
// import styles from './my-component.module.scss';

type DatasetPreviewTableProps = {
	tableData: any;
}

const DatasetPreviewTable = ({ tableData, ...props }: DatasetPreviewTableProps & React.HTMLAttributes<HTMLTableElement>) => {
	return (
		<Table size='sm' {...props}>
			<TableHead>	
				<TableRow>
					{
						tableData.header.columns.map((th: string) => <TableHeaderCell key={th}>{th}</TableHeaderCell>)
					}
				</TableRow>
			</TableHead>
			<TableBody>
				{
					tableData.rows.map((row: any, i: number) => 
						<TableRow key={`row-${i}`}>
							{
								row.columns.map((column: string, j: number) => 
									<TableCell key={`col-${j}`}>{column}</TableCell>
								)
							}
						</TableRow>
					)
				}
			</TableBody>
		</Table>
	);
}

export default DatasetPreviewTable;