import type { Meta, StoryObj } from '@storybook/react';
import { getDictionary } from '@fdk-frontend/dictionaries';

import { Footer } from '.';

const dictionary = await getDictionary('nb');

const meta: Meta<typeof Footer> = {
  component: Footer,
  title: 'Footer'
};

export default meta;
type Story = StoryObj<typeof Footer>;

export const Primary: Story = {
  render: () => (
    <Footer
      dictionary={dictionary}
    />
  ),
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  }
};