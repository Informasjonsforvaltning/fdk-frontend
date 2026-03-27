import type { Meta, StoryObj } from '@storybook/react-vite';
import DocsTeaser from './index';

const meta: Meta<typeof DocsTeaser> = {
    title: 'DocsTeaser',
    component: DocsTeaser,
    tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof DocsTeaser>;

export const Dataset: Story = {
    args: {
        title: 'Hello',
        desc: 'World'
    },
};

export const Loading: Story = {
    args: {
        locale: 'nb',
    },
};

