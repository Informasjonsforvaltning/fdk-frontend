import type { Meta, StoryObj } from '@storybook/react';
import { getDictionary } from '@fdk-frontend/dictionaries';

import Footer from '.';

const dictionary = await getDictionary('en', 'common');

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
