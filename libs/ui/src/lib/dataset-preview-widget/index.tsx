'use client';

import React, { useState, useEffect } from 'react';
import { Tag, Spinner, Button } from '@digdir/designsystemet-react';
import {
	fetchCsrfToken,
	fetchDatasetPreview
} from '@fdk-frontend/data-access/server';
import { useEnvironmentVariables } from '@fdk-frontend/utils';
import styles from './styles.module.scss';

type DatasetPreviewWidgetProps = {
	downloadUrl: string;
	rows: number;
}

const DatasetPreviewWidget = ({ downloadUrl, rows, ...props }: DatasetPreviewWidgetProps & React.HTMLAttributes<HTMLDivElement>) => {

	const { FDK_BASE_URI, FDK_DATASET_PREVIEW_API_KEY } = useEnvironmentVariables();
	const [ loading, setLoading ] = useState(true);
	const [ error, setError ] = useState(false);
	const [ data, setData ] = useState<any>(undefined);

	useEffect(() => {

		const getDatasetPreview = async () => {
			try {
				const token = await fetchCsrfToken(FDK_BASE_URI);
				if (!token) throw new Error('Failed to get CSRF token');

				console.log('token', token);

				const previewData = await fetchDatasetPreview(FDK_BASE_URI, FDK_DATASET_PREVIEW_API_KEY, downloadUrl, rows, token);
				if (!previewData) throw new Error('Failed to get dataset preview');

				setData(previewData);

				console.log('preview', previewData);
			} catch (err) {
				console.log(err);
				setError(true);
			} finally {
				setLoading(false);
			}
		}

		getDatasetPreview();

	}, []);

	return (
		<div className={styles.wrapper} {...props}>
			{
				loading &&
				<div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {`Genererer forhåndsvisning...`}
                    <Spinner
                        title={'loading'}
                        size='xs'
                        variant='interaction'
                        aria-hidden={true}
                    />
                </div>
			}
			{
				error &&
				<Tag size='sm' color='warning'>
					⚠️ Forhåndsvisning ikke tilgjengelig
				</Tag>
			}
			{
				data &&
				<Button>Vis forhåndsvisning</Button>
			}
		</div>
	);
}

export default DatasetPreviewWidget;