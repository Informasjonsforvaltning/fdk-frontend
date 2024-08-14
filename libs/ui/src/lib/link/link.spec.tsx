import '@testing-library/jest-dom';
import { screen, render, waitFor } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

import { Link } from '.';

expect.extend(toHaveNoViolations);

describe('Link', () => {
    it('should render successfully', async () => {
        render(<Link href='#'>Hello</Link>);
        const linkElement = screen.getByText('Hello');
        expect(linkElement).toBeInTheDocument();
        expect(linkElement).toHaveAttribute('href', '#');
    });

    it('should have no a11y violations', async () => {
        const { baseElement } = render(
            <main>
                <Link href='#'>Hello</Link>
            </main>,
        );
        await waitFor(async () => expect(await axe(baseElement)).toHaveNoViolations());
    });
});
