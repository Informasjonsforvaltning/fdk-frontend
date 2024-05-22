import type { Meta, StoryObj } from '@storybook/react';
import { getDictionary } from '@fdk-frontend/dictionaries';

import { Header } from '.';

const dictionary = await getDictionary('nb');

const meta: Meta<typeof Header> = {
  component: Header,
  title: 'Header'
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Primary: Story = {
  render: () => (
    <Header
      dictionary={dictionary}
    />
  ),
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  }
};