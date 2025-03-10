import React, { useRef } from 'react';
import { Button, Modal, Paragraph, Link, Alert } from '@digdir/designsystemet-react';
import Badge from '../badge';
import styles from './access-request-modal.module.scss';

type AccessRequestModalProps = {
	trigger: ReactNode;
}

const AccessRequestModal = ({ children, trigger, ...props }: AccessRequestModalProps & React.HTMLAttributes<HTMLDivElement>) => {
	const modalRef = useRef(null);
	return (
		<Modal.Root>
      <Modal.Trigger asChild>{trigger}</Modal.Trigger>
      <Modal.Dialog
        ref={modalRef}
        className={styles.dialog}
        onInteractOutside={() => modalRef.current.close()}
      >
      	<div className={styles.inner}>
      		{/*<div><Badge data-color='green-subtle'>beta</Badge></div>*/}
      		<Paragraph size='sm' style={{padding:'0rem 0rem'}}>
	      		Du kan søke om tilgang til dette datasettet via Kudaf sin <Link href="https://www.digdir.no/media/5590/download">nasjonale søknadsløsning</Link>.
	      	</Paragraph>
      	<Button size='sm'>Opprett søknad →</Button>
      	</div>
      </Modal.Dialog>
    </Modal.Root>
	);
}

export default AccessRequestModal;