import type { Meta, StoryObj } from '@storybook/react';

import TestComponent from '.';

const meta: Meta<typeof TestComponent> = {
  component: TestComponent,
};

export default meta;
type Story = StoryObj<typeof TestComponent>;

export const Primary: Story = {
  render: () => <TestComponent />,
};