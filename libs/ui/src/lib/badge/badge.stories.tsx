import type { Meta, StoryObj } from '@storybook/react';

import Badge from '.';
import HStack from '../hstack';

const meta: Meta<typeof Badge> = {
    component: Badge,
    title: 'Badge',
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Primary: Story = {
    parameters: {
        nextjs: {
            appDirectory: true,
        },
    },
    render: () => (
        <>
            <div style={{ padding: '1rem' }}>
                <HStack>
                    <Badge>3</Badge>
                    <Badge>333</Badge>
                    <Badge>Hello</Badge>
                </HStack>
            </div>
        </>
    ),
};
