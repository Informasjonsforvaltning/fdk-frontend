import type { Meta, StoryObj } from '@storybook/react';
import { getDictionary } from '@fdk-frontend/dictionaries';

import Breadcrumbs from '.';

const dictionary = await getDictionary('en', 'data-hunter-page');

const meta: Meta<typeof Breadcrumbs> = {
    component: Breadcrumbs,
    title: 'Breadcrumbs',
};

export default meta;
type Story = StoryObj<typeof Breadcrumbs>;

const breadcrumbList = [
    {
        href: '#',
        text: 'Parent page',
    },
    {
        href: '#',
        text: 'This page',
    },
];

export const Primary: Story = {
    render: () => (
        <Breadcrumbs
            baseUri='/'
            dictionary={dictionary}
            breadcrumbList={breadcrumbList}
        />
    ),
};
