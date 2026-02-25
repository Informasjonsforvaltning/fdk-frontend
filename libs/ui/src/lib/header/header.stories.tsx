import type { Meta, StoryObj } from '@storybook/react-vite';
import { getLocalization } from '@fdk-frontend/localization';

import Header from '.';

const dictionary = getLocalization('en').common;

const meta: Meta<typeof Header> = {
    component: Header,
    title: 'Header',
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Primary: Story = {
    parameters: {
        nextjs: {
            appDirectory: true,
        },
    },
    render: () => (
        <Header
            baseUri='/'
            dictionary={dictionary}
        />
    ),
};
