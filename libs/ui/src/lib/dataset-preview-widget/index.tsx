'use client';

import React, { useState, useEffect } from 'react';
import { Tag, Spinner, Button, HelpText, Paragraph } from '@digdir/designsystemet-react';
import { EyeIcon } from '@navikt/aksel-icons';
import DatasetPreviewModal from '../dataset-preview-modal/';
import { type Dictionary } from '@fdk-frontend/dictionaries';

type DatasetPreviewWidgetProps = {
    downloadUrl: string;
    title: string;
    dictionary: Dictionary;
};

const DatasetPreviewWidget = ({
    downloadUrl,
    title,
    dictionary,
    ...props
}: DatasetPreviewWidgetProps & React.HTMLAttributes<HTMLDivElement>) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [data, setData] = useState<any>(undefined);

    useEffect(() => {
        const getDatasetPreview = async () => {
            try {
                const response = await fetch('/api/dataset-preview', {
                    method: 'POST',
                    body: JSON.stringify({ downloadUrl }),
                });

                if (!response.ok) throw new Error('Request failed');

                const json = await response.json();
                setData(json);
            } catch {
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        getDatasetPreview();
    }, []);

    return (
        <div {...props}>
            {loading && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {dictionary.datasetPreview.generatingPreview}
                    <Spinner
                        title={'loading'}
                        size='xs'
                        variant='interaction'
                        aria-hidden={true}
                    />
                </div>
            )}
            {error && !data?.table && (
                <Tag
                    size='sm'
                    color='info'
                >
                    {dictionary.datasetPreview.previewNotAvailable}&nbsp;
                    <HelpText
                        title={''}
                        size='sm'
                        style={{ transform: 'scale(0.75)' }}
                    >
                        <Paragraph size='sm'>{dictionary.datasetPreview.previewNotAvailableHelpText}</Paragraph>
                    </HelpText>
                </Tag>
            )}
            {!error && data?.table && (
                <DatasetPreviewModal
                    title={title}
                    data={data}
                    downloadUrl={downloadUrl}
                    trigger={
                        <Button
                            size='sm'
                            variant='secondary'
                        >
                            <EyeIcon fontSize='1.2em' />
                            {dictionary.datasetPreview.showPreviewButton}
                        </Button>
                    }
                    dictionary={dictionary}
                />
            )}
        </div>
    );
};

export default DatasetPreviewWidget;
