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

type DatasetPreviewModalProps = {
	trigger: ReactNode;
	title: string;
	data: any;
	downloadUrl: string;
}

const DatasetPreviewModal = ({ children, title, data, trigger, downloadUrl, ...props }: DatasetPreviewModalProps & React.HTMLAttributes<HTMLDivElement>) => {

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
      			<HStack>
      				{title}
      				<Tag size='sm' color='warning'>Viser maks 100 rader</Tag>
      			</HStack>
      			<HStack style={{marginTop:'0.5rem'}}>
      				<ArrowDownRightIcon />
      				<Paragraph size='sm'>
      					<code>{downloadUrl}</code>
      				</Paragraph>
      				{/*<Paragraph size='sm'>
      					<code>{downloadUrl}</code>
      				</Paragraph>*/}
      			</HStack>
      		</Modal.Header>
            <Modal.Content className={styles.content}>
            	{
            		data.table ?
            		<DatasetPreviewTable tableData={data.table} /> :
            		<Markdown>
            			{data.plain}
            		</Markdown>
            	}
            </Modal.Content>
            <Modal.Footer>
            	<Button
            		size='sm'
            		variant='secondary'
            		onClick={() => modalRef.current?.close()}
            	>
            		Lukk vindu
            	</Button>
            	<Button
            		asChild
            		size='sm'
            		variant='secondary'
            	>
            		<Link href={downloadUrl}>
            			<DownloadIcon fontSize='1.2em' />
            			Last ned hele datasettet
            		</Link>
            	</Button>
            </Modal.Footer>
	      </Modal.Dialog>
	    </Modal.Root>
	);
}

export default DatasetPreviewModal;