import type { Meta, StoryObj } from '@storybook/react';
import { getDictionary } from '@fdk-frontend/dictionaries';

import Header from '.';

const dictionary = await getDictionary('en', 'common');

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
