import { render } from '@testing-library/react';

import ConceptPreviewBase from '.';

describe('ConceptPreview', () => {
    it('should render successfully', () => {
        const { baseElement } = render(
            <ConceptPreviewBase
                label='test'
                uri='test'
                definition='test'
                goToDataNorgeText='test'
            />,
        );
        expect(baseElement).toBeTruthy();
    });
});
