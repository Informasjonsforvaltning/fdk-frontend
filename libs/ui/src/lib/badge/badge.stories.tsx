import type { Meta, StoryObj } from '@storybook/react-vite';

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

export const AllColors: Story = {
    parameters: {
        nextjs: {
            appDirectory: true,
        },
    },
    render: () => (
        <>
            <div style={{ padding: '1rem' }}>
                <HStack>
                    <Badge>Default</Badge>
                    <Badge data-color='orange'>Orange</Badge>
                    <Badge data-color='green'>Green</Badge>
                    <Badge data-color='red'>Red</Badge>
                    <Badge data-color='red-subtle'>Red Subtle</Badge>
                    <Badge data-color='blue-subtle'>Blue Subtle</Badge>
                    <Badge data-color='green-subtle'>Green Subtle</Badge>
                </HStack>
            </div>
        </>
    ),
};
