import type { Meta, StoryObj } from '@storybook/react';

import OpenLicenseTag from '.';
import VStack from '../vstack';

import dictionary from '@fdk-frontend/libs/dictionaries/src/lib/dictionaries/nb/details-page.json';

const meta: Meta<typeof OpenLicenseTag> = {
    component: OpenLicenseTag,
    title: 'OpenLicenseTag',
};

export default meta;
type Story = StoryObj<typeof OpenLicenseTag>;

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
                    <OpenLicenseTag dictionary={dictionary} />
                </VStack>
            </div>
        </>
    ),
};
