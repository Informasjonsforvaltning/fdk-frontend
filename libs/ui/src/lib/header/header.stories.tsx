import type { Meta, StoryObj } from '@storybook/react-vite';

import Header from '.';

const meta: Meta<typeof Header> = {
    component: Header,
    title: 'Header',
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Primary: Story = {
    parameters: {
        nextjs: {
            appDirectory: true,
        },
    },
    render: () => (
        <Header
            locale='en'
        />
    ),
};
