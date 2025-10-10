'use client';

import React, { ReactNode, useRef } from 'react';
import { Alert, Dialog, Button, Tag, Link, Paragraph } from '@digdir/designsystemet-react';
import { DownloadIcon, ArrowDownRightIcon } from '@navikt/aksel-icons';
import styles from './styles.module.scss';
import DatasetPreviewTable from '../dataset-preview-table/';
import { type Dictionary } from '@fdk-frontend/dictionaries';

type DatasetPreviewModalProps = {
    trigger: ReactNode;
    title: string;
    data: any;
    downloadUrl: string;
    dictionary: Dictionary;
};

const DatasetPreviewModal = ({
    children,
    title,
    data,
    trigger,
    downloadUrl,
    dictionary,
    ...props
}: DatasetPreviewModalProps & React.HTMLAttributes<HTMLDivElement>) => {
    const modalRef = useRef<HTMLDialogElement>(null);

    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
            <Dialog.Dialog
                ref={modalRef}
                className={styles.dialog}
                onInteractOutside={() => modalRef.current?.close()}
            >
                <Dialog.Header closeButton={true}>
                    <div className={styles.headerWrapper}>
                        {title}
                        <Tag
                            className={styles.maxRowsNotice}
                            size='sm'
                            color='warning'
                        >
                            {dictionary.datasetPreview.showingMaxRows}
                        </Tag>
                    </div>
                    <div>
                        <ArrowDownRightIcon className={styles.arrowIcon} />
                        <Paragraph size='sm'>
                            <code>{downloadUrl}</code>
                        </Paragraph>
                    </div>
                </Dialog.Header>
                <Dialog.Content className={styles.content}>
                    <div className={styles.inner}>
                        {data.table ? (
                            <DatasetPreviewTable tableData={data.table} />
                        ) : (
                            <Alert size='sm'>{dictionary.datasetPreview.noTableData}</Alert>
                        )}
                    </div>
                </Dialog.Content>
                <Dialog.Footer>
                    <Button
                        size='sm'
                        variant='secondary'
                        onClick={() => modalRef.current?.close()}
                    >
                        {dictionary.datasetPreview.closeButton}
                    </Button>
                    <Button
                        asChild
                        size='sm'
                        variant='secondary'
                    >
                        <Link href={downloadUrl}>
                            <DownloadIcon fontSize='1.2em' />
                            {dictionary.datasetPreview.downloadButton}
                        </Link>
                    </Button>
                </Dialog.Footer>
            </Dialog.Dialog>
        </Dialog.Root>
    );
};

export default DatasetPreviewModal;
