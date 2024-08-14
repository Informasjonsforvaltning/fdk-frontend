import type { Meta, StoryObj } from '@storybook/react';

import { LabelWithTag } from '.';

const meta: Meta<typeof LabelWithTag> = {
    component: LabelWithTag,
    title: 'LabelWithTag',
};

export default meta;
type Story = StoryObj<typeof LabelWithTag>;

export const Primary: Story = {
    render: () => (
        <LabelWithTag
            labelText='My label'
            tagText='My tag'
        />
    ),
};
