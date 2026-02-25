import type { Meta, StoryObj } from '@storybook/react-vite';

import Footer from '.';

const meta: Meta<typeof Footer> = {
    component: Footer,
    title: 'Footer',
};

export default meta;
type Story = StoryObj<typeof Footer>;

export const Primary: Story = {
    parameters: {
        nextjs: {
            appDirectory: true,
        },
    },
    render: () => (
        <Footer locale='en' />
    ),
};
