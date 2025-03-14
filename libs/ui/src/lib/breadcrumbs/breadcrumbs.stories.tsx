import type { Meta, StoryObj } from '@storybook/react';

import Breadcrumbs from '.';

import dictionary from '@fdk-frontend/libs/dictionaries/src/lib/dictionaries/nb/common.json';

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
