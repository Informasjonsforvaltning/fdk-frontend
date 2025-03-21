import type { Meta, StoryObj } from '@storybook/react';

import AccessLevelTag from '.';
import VStack from '../vstack';

import dictionary from '@fdk-frontend/libs/dictionaries/src/lib/dictionaries/nb/details-page.json';

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
                        dictionary={dictionary}
                    />
                    <AccessLevelTag
                        accessCode='RESTRICTED'
                        dictionary={dictionary}
                    />
                    <AccessLevelTag
                        accessCode='NON_PUBLIC'
                        dictionary={dictionary}
                    />
                </VStack>
            </div>
        </>
    ),
};
