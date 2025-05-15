import React, { ReactNode, useRef } from 'react';
import { Alert, Modal, Button, Tag, Link, Paragraph } from '@digdir/designsystemet-react';
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
        <Modal.Root>
            <Modal.Trigger asChild>{trigger}</Modal.Trigger>
            <Modal.Dialog
                ref={modalRef}
                className={styles.dialog}
                onInteractOutside={() => modalRef.current?.close()}
            >
                <Modal.Header closeButton={true}>
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
                </Modal.Header>
                <Modal.Content className={styles.content}>
                    <div className={styles.inner}>
                        {data.table ? (
                            <DatasetPreviewTable tableData={data.table} />
                        ) : (
                            <Alert size='sm'>{dictionary.datasetPreview.noTableData}</Alert>
                        )}
                    </div>
                </Modal.Content>
                <Modal.Footer>
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
                </Modal.Footer>
            </Modal.Dialog>
        </Modal.Root>
    );
};

export default DatasetPreviewModal;
