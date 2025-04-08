import type { Meta, StoryObj } from '@storybook/react';

import PlaceholderBox from '.';

const meta: Meta<typeof PlaceholderBox> = {
    component: PlaceholderBox,
    title: 'PlaceholderBox',
};

export default meta;
type Story = StoryObj<typeof PlaceholderBox>;

export const Primary: Story = {
    parameters: {
        nextjs: {
            appDirectory: true,
        },
    },
    render: () => (
        <>
            <div style={{ padding: '1rem' }}>
                <PlaceholderBox>PlaceholderBox</PlaceholderBox>
            </div>
        </>
    ),
};
