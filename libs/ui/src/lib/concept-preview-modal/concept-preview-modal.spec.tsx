import { render } from '@testing-library/react';

import ConceptPreviewModal from '.';

describe('ConceptPreview', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<ConceptPreviewModal label='test' uri='test' definition='test' />);
        expect(baseElement).toBeTruthy();
    });
});
