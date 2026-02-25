import type { Meta, StoryObj } from '@storybook/react-vite';
import { getLocalization } from '@fdk-frontend/localization';

import { FrontpageBanner } from '.';

const dictionary = getLocalization('nb').frontpage;

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
