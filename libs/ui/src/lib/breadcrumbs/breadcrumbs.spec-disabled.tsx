import { screen, render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { getLocalization } from '@fdk-frontend/localization';

import Breadcrumbs from '.';

expect.extend(toHaveNoViolations);

describe('Breadcrumbs', () => {
    it('should render successfully', () => {
        const homeText = getLocalization('en').common.breadcrumbs.home;
        render(
            <Breadcrumbs
                locale='en'
                breadcrumbList={[
                    {
                        href: '#',
                        text: 'test',
                    },
                ]}
            />,
        );

        const homeLinkElement = screen.getByText(homeText, { selector: 'a' });
        expect(homeLinkElement).toBeInTheDocument();

        const currentPageELement = screen.getByText('test', { selector: 'span' });
        expect(currentPageELement).toBeInTheDocument();
    });

    it('should have no a11y violations', async () => {
        const { baseElement } = render(
            <main>
                <Breadcrumbs
                    locale='en'
                    breadcrumbList={[
                        {
                            href: '#',
                            text: 'test',
                        },
                    ]}
                />
            </main>,
        );

        expect(await axe(baseElement)).toHaveNoViolations();
    });
});
