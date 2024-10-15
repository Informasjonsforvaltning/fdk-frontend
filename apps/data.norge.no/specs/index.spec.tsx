import React from 'react';
import { render } from '@testing-library/react';

import Page from '../src/app/[lang]/[...slug]/not-found.tsx';

describe('Page', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<Page />);
        expect(baseElement).toBeTruthy();
    });
});
