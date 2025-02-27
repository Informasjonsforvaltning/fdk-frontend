import type { Meta, StoryObj } from '@storybook/react';

import StarButton from '.';
import HStack from '../hstack';

const meta: Meta<typeof StarButton> = {
    component: StarButton,
    title: 'StarButton',
};

export default meta;
type Story = StoryObj<typeof StarButton>;

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
                    <StarButton labels={['Kopier', 'Kopiert!']} />
                </HStack>
            </div>
        </>
    ),
};
