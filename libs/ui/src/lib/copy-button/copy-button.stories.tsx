import type { Meta, StoryObj } from '@storybook/react';

import CopyButton from '.';
import HStack from '../hstack';

const meta: Meta<typeof CopyButton> = {
    component: CopyButton,
    title: 'CopyButton',
};

export default meta;
type Story = StoryObj<typeof CopyButton>;

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
                    <CopyButton labels={['Kopier', 'Kopiert!']} />
                </HStack>
            </div>
        </>
    ),
};
