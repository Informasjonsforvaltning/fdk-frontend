import type { Meta, StoryObj } from '@storybook/react-vite';

import Breadcrumbs from '.';

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
            locale='nb'
            breadcrumbList={breadcrumbList}
        />
    ),
};
