import type { Meta, StoryObj } from '@storybook/react-vite';
import { getLocalization } from '@fdk-frontend/localization';

import Footer from '.';

const dictionary = getLocalization('en').common;

const meta: Meta<typeof Footer> = {
    component: Footer,
    title: 'Footer',
};

export default meta;
type Story = StoryObj<typeof Footer>;

export const Primary: Story = {
    parameters: {
        nextjs: {
            appDirectory: true,
        },
    },
    render: () => (
        <Footer
            baseUri='/'
            dictionary={dictionary}
        />
    ),
};
