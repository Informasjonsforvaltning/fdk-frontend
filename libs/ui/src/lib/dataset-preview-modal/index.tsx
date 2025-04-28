import React, { ReactNode, useRef } from 'react';
import { Modal } from '@digdir/designsystemet-react';
import styles from './my-component.module.scss';

type DatasetPreviewModalProps = {}

const DatasetPreviewModal = ({ children, ...props }: DatasetPreviewModalProps & React.HTMLAttributes<HTMLDivElement>) => {

	const modalRef = useRef<HTMLDialogElement>(null);

	return (
		<Modal.Root>
	      <Modal.Trigger asChild>{trigger}</Modal.Trigger>
	      <Modal.Dialog
	        ref={modalRef}
	        className={styles.dialog}        
	        style={{
	          overflow: 'visible',
	        }}
	      >
	      	Hello
	      </Modal.Dialog>
	    </Modal.Root>
	);
}

export default DatasetPreviewModal;