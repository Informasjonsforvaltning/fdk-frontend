import { PropsWithChildren } from 'react';
import { Divider, Modal, Paragraph } from '@digdir/designsystemet-react';
import { Link } from '../link';

type ConceptPreviewProps = PropsWithChildren & {
    label: string;
    definition: string;
    uri: string;
};

const ConceptPreviewModal = ({ label, definition, uri, children }: ConceptPreviewProps) => {
    return (
        <Modal.Root>
            <Modal.Trigger>Open Modal</Modal.Trigger>
            <Modal.Dialog>
                <Modal.Header subtitle='Modal subtittel'>Hader</Modal.Header>
                <Modal.Content>Content</Modal.Content>
                <Modal.Footer>Footer</Modal.Footer>
            </Modal.Dialog>
        </Modal.Root>
        // <Modal.Root>
        //     <Modal.Trigger>{children}</Modal.Trigger>
        //     <Modal.Dialog>
        //         <Modal.Header>
        //             {label}
        //         </Modal.Header>
        //         <Divider color='subtle' />
        //         <Modal.Content>
        //             <Paragraph>{definition}</Paragraph>
        //         </Modal.Content>
        //         <Divider color='subtle' />
        //         <Modal.Footer><Link href={uri} external>Gå til beskrivelsen på data.norge.no</Link></Modal.Footer>
        //     </Modal.Dialog>
        // </Modal.Root>
    );
}

export default ConceptPreviewModal;
