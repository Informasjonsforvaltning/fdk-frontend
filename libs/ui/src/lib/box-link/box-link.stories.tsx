import type { Meta, StoryObj } from '@storybook/react';

import BoxLink from '.';

const meta: Meta<typeof BoxLink> = {
    component: BoxLink,
    title: 'BoxLink',
};

export default meta;
type Story = StoryObj<typeof BoxLink>;

export const Primary: Story = {
    parameters: {
        nextjs: {
            appDirectory: true,
        },
    },
    render: () => (
        <>
            <div style={{ padding: '1rem' }}>
                <BoxLink href='#'>This is a boxLink</BoxLink>
            </div>
        </>
    ),
};
