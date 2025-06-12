import React from 'react';
import cn from 'classnames';
import { type Dictionary, type LocaleCodes } from '@fdk-frontend/dictionaries';
import Box from '../box';
import ExternalLink from '../external-link';
import DatasetPreviewWidget from '../dataset-preview-widget/';
import styles from './styles.module.scss';

type DownloadDistributionWidgetProps = {
	downloadUrl: string;
	dictionary: Dictionary;
	locale: LocaleCodes;
}

const DownloadDistributionWidget = ({ downloadUrl, dictionary, locale, ...props }: DownloadDistributionWidgetProps & React.HTMLAttributes<HTMLDivElement>) => {
	return (
		<Box
			className={styles.wrapper}
			{...props}
		>
			<ExternalLink
				className='fdk-box-link'
				href={downloadUrl}
				gateway
			>
				{downloadUrl}
			</ExternalLink>
			<div className={styles.previewWidgetContainer}>
				<DatasetPreviewWidget
					className={styles.previewWidget}
					downloadUrl={downloadUrl}
					dictionary={dictionary}
					locale={locale}
				/>
			</div>
		</Box>
	);
}

export default DownloadDistributionWidget;