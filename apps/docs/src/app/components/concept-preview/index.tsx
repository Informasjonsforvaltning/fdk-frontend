import { PropsWithChildren } from 'react';

import ConceptPreviewModal from '@fdk-frontend/ui/concept-preview-modal';

type ConceptPreviewProps = PropsWithChildren & {
    uri: string;
};

const ConceptPreview = ({ uri, children }: ConceptPreviewProps) => (
    <ConceptPreviewModal
        label='Concept preview'
        definition='This is a concept preview'
        uri={uri}
    >
        <p>{children}</p>
    </ConceptPreviewModal>
);

export default ConceptPreview;
