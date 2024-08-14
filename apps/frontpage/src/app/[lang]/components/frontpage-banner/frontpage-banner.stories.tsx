import type { Meta, StoryObj } from '@storybook/react';
import { getDictionary } from '@fdk-frontend/dictionaries';

import { FrontpageBanner } from '.';

const dictionary = await getDictionary('nb', 'frontpage');

const meta: Meta<typeof FrontpageBanner> = {
    component: FrontpageBanner,
    title: 'FrontpageBanner',
};

export default meta;
type Story = StoryObj<typeof FrontpageBanner>;

export const Primary: Story = {
    render: () => <FrontpageBanner dictionary={dictionary} />,
    parameters: {
        nextjs: {
            appDirectory: true,
        },
    },
};
