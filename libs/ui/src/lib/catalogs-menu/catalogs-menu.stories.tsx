import type { Meta, StoryObj } from '@storybook/react';
import { getDictionary } from '@fdk-frontend/dictionaries';

import CatalogsMenu from '.';

const dictionary = await getDictionary('en', 'common');

const meta: Meta<typeof CatalogsMenu> = {
    component: CatalogsMenu,
    title: 'CatalogsMenu',
};

export default meta;
type Story = StoryObj<typeof CatalogsMenu>;

export const Primary: Story = {
    render: () => (
        <CatalogsMenu
            baseUri='/'
            dictionary={dictionary}
        />
    ),
};
