import type { Meta, StoryObj } from '@storybook/react';

import Box from '.';

const meta: Meta<typeof Box> = {
    component: Box,
    title: 'Box',
};

export default meta;
type Story = StoryObj<typeof Box>;

export const Primary: Story = {
    parameters: {
        nextjs: {
            appDirectory: true,
        },
    },
    render: () => (
        <>
            <div style={{ padding: '1rem' }}>
                <Box>This is a box</Box>
            </div>
        </>
    ),
};
