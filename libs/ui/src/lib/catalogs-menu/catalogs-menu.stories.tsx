import type { Meta, StoryObj } from '@storybook/react-vite';
import { getLocalization } from '@fdk-frontend/localization';

import CatalogsMenu from '.';

const dictionary = getLocalization('en').common;

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
