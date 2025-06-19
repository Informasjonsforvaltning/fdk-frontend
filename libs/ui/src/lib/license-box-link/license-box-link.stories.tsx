import type { Meta, StoryObj } from '@storybook/react';
import { getDictionary } from '@fdk-frontend/dictionaries';

import LicenseBoxLink from '.';

const dictionary = await getDictionary('nb', 'common');

const meta: Meta<typeof LicenseBoxLink> = {
    component: LicenseBoxLink,
    title: 'LicenseBoxLink',
};

export default meta;
type Story = StoryObj<typeof LicenseBoxLink>;

export const Primary: Story = {
    parameters: {
        nextjs: {
            appDirectory: true,
        },
    },
    render: () => (
        <>
            <div style={{ padding: '1rem' }}>
                <LicenseBoxLink
                    uri='http://www.example.com/'
                    locale='nb'
                    dictionary={dictionary}
                >
                    This is a LicenseBoxLink
                </LicenseBoxLink>
            </div>
        </>
    ),
};
