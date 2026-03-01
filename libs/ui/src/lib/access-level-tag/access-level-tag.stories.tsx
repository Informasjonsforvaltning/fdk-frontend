import type { Meta, StoryObj } from '@storybook/react-vite';

import AccessLevelTag from '.';
import VStack from '../vstack';

const meta: Meta<typeof AccessLevelTag> = {
    component: AccessLevelTag,
    title: 'AccessLevelTag',
};

export default meta;
type Story = StoryObj<typeof AccessLevelTag>;

export const Primary: Story = {
    parameters: {
        nextjs: {
            appDirectory: true,
        },
    },
    render: () => (
        <>
            <div style={{ padding: '1rem' }}>
                <VStack>
                    <AccessLevelTag
                        accessCode='PUBLIC'
                        locale='nb'
                    />
                    <AccessLevelTag
                        accessCode='RESTRICTED'
                        locale='nb'
                    />
                    <AccessLevelTag
                        accessCode='NON_PUBLIC'
                        locale='nb'
                    />
                </VStack>
            </div>
        </>
    ),
};
