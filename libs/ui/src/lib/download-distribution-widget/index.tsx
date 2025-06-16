import React from 'react';
import { type Dictionary, type LocaleCodes } from '@fdk-frontend/dictionaries';
import Box from '../box';
import ExternalLink from '../external-link';
import DatasetPreviewWidget from '../dataset-preview-widget/';
import styles from './styles.module.scss';

type DownloadDistributionWidgetProps = {
    title: string;
    downloadUrl: string;
    dictionary: Dictionary;
    locale: LocaleCodes;
};

const DownloadDistributionWidget = ({
    title,
    downloadUrl,
    dictionary,
    locale,
    ...props
}: DownloadDistributionWidgetProps & React.HTMLAttributes<HTMLDivElement>) => {
    const datasetPreviewTitle = title || downloadUrl || dictionary.distributions.header.nameless;
    return (
        <Box
            className={styles.wrapper}
            {...props}
        >
            <ExternalLink
                className='fdk-box-link'
                href={downloadUrl}
                locale={locale}
                gateway
            >
                {downloadUrl}
            </ExternalLink>
            <div className={styles.previewWidgetContainer}>
                <DatasetPreviewWidget
                    className={styles.previewWidget}
                    downloadUrl={downloadUrl}
                    dictionary={dictionary}
                    title={datasetPreviewTitle}
                    triggerBtnClass={styles.previewTriggerBtn}
                />
            </div>
        </Box>
    );
};

export default DownloadDistributionWidget;
