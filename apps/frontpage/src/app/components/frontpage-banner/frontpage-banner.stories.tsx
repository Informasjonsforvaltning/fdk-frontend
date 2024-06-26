import type { Meta, StoryObj } from '@storybook/react';
import { getDictionary } from '@fdk-frontend/dictionaries';

import { FrontpageBanner } from '.';

const dictionary = await getDictionary('nb');

const meta: Meta<typeof FrontpageBanner> = {
  component: FrontpageBanner,
  title: 'FrontpageBanner'
};

export default meta;
type Story = StoryObj<typeof FrontpageBanner>;

export const Primary: Story = {
  render: () => (
    <FrontpageBanner />
  ),
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  }
};