import type { Meta, StoryObj } from '@storybook/react';

import LanguageSwitcher from '.';

const meta: Meta<typeof LanguageSwitcher> = {
    component: LanguageSwitcher,
    title: 'LanguageSwitcher',
};

export default meta;
type Story = StoryObj<typeof LanguageSwitcher>;

export const Primary: Story = {
    parameters: {
        nextjs: {
            appDirectory: true,
        },
    },
    render: () => (
        <>
            <div style={{ padding: '1rem' }}>
                <LanguageSwitcher />
            </div>
            <div style={{ background: 'black', padding: '1rem' }}>
                <LanguageSwitcher inverted />
            </div>
        </>
    ),
};
