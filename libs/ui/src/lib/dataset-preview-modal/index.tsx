import React, { ReactNode, useRef } from 'react';
import {
	Modal,
	Button,
	Tag,
	Link,
	Paragraph
} from '@digdir/designsystemet-react';
import { DownloadIcon, ArrowDownRightIcon } from '@navikt/aksel-icons';
import styles from './styles.module.scss';
import DatasetPreviewTable from '../dataset-preview-table/';
import HStack from '../hstack';
import Markdown from '../markdown';
import { type Dictionary } from '@fdk-frontend/dictionaries';

type DatasetPreviewModalProps = {
	trigger: ReactNode;
	title: string;
	data: any;
	downloadUrl: string;
	dictionary: Dictionary;
}

const DatasetPreviewModal = ({ children, title, data, trigger, downloadUrl, dictionary, ...props }: DatasetPreviewModalProps & React.HTMLAttributes<HTMLDivElement>) => {

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
      			<HStack style={{marginBottom:'0.75rem'}}>
      				{title}
      				<Tag size='sm' color='warning'>{dictionary.datasetPreview.showingMaxRows}</Tag>
      			</HStack>
      			<HStack style={{marginTop:'0.5rem'}}>
      				<ArrowDownRightIcon />
      				<Paragraph size='sm'>
      					<code>{downloadUrl}</code>
      				</Paragraph>
      			</HStack>
      		</Modal.Header>
            <Modal.Content className={styles.content}>
            	<div className={styles.inner}>
            	{
            		data.table ?
            		<DatasetPreviewTable tableData={data.table} /> :
            		<Markdown>
            			{data.plain}
            		</Markdown>
            	}
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
}

export default DatasetPreviewModal;