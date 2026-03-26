import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import SearchInput from '.';

const meta: Meta<typeof SearchInput> = {
    component: SearchInput,
    title: 'SearchInput',
    parameters: {
        nextjs: {
            appDirectory: true,
        },
    },
    args: {
        searchLabel: 'Search',
        placeholder: 'What are you looking for?',
    },
};

export default meta;
type Story = StoryObj<typeof SearchInput>;

export const Uncontrolled: Story = {};

export const Controlled: Story = {
    render: (args) => {
        const [value, setValue] = useState('initial value');
        return <SearchInput {...args} value={value} onChange={setValue} />;
    },
};

export const WithLocale: Story = {
    args: {
        locale: 'nb',
        searchLabel: 'Søk',
        placeholder: 'Hva leter du etter?',
    },
};
