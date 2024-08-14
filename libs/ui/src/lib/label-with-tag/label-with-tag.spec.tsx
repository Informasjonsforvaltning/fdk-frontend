import { screen, render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

import { LabelWithTag } from '.';
import React from 'react';

expect.extend(toHaveNoViolations);

describe('LabelWithTag', () => {
    it('should render successfully', async () => {
        render(
            <LabelWithTag
                labelText='My label'
                tagText='Is required'
            />,
        );
        const linkElement = screen.getByText('My label');
        expect(linkElement).toBeInTheDocument();

        const labelElement = screen.getByText('Is required');
        expect(labelElement).toBeInTheDocument();
    });

    it('should have no a11y violations', async () => {
        const { baseElement } = render(
            <main>
                <LabelWithTag
                    labelText='My label'
                    tagText='Is required'
                />
            </main>,
        );
        expect(await axe(baseElement)).toHaveNoViolations();
    });
});
