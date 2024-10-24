import { screen, render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { getDictionary, type Dictionary } from '@fdk-frontend/dictionaries';

import Breadcrumbs from '.';

expect.extend(toHaveNoViolations);

describe('Breadcrumbs', () => {
    let dictionary: Dictionary;

    beforeEach(async () => {
        dictionary = await getDictionary('en', 'data-hunter-page');
    });

    it('should render successfully', () => {
        render(
            <Breadcrumbs
                baseUri='/'
                dictionary={dictionary}
                breadcrumbList={[
                    {
                        href: '#',
                        text: 'test',
                    },
                ]}
            />,
        );

        const homeLinkElement = screen.getByText(dictionary.homePage, { selector: 'a' });
        expect(homeLinkElement).toBeInTheDocument();

        const currentPageELement = screen.getByText('test', { selector: 'span' });
        expect(currentPageELement).toBeInTheDocument();
    });

    it('should have no a11y violations', async () => {
        const { baseElement } = render(
            <main>
                <Breadcrumbs
                    baseUri='/'
                    dictionary={dictionary}
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
