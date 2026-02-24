import type { Meta, StoryObj } from '@storybook/react';
import EntityTeaser from './index';

const meta: Meta<typeof EntityTeaser> = {
    title: 'Components/EntityTeaser',
    component: EntityTeaser,
    tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof EntityTeaser>;

export const Default: Story = {};
