import type { Meta, StoryObj } from '@storybook/react-vite';

import { OrgLogo } from '.';

const meta: Meta<typeof OrgLogo> = {
    component: OrgLogo,
    title: 'OrgLogo',
    parameters: {
        layout: 'centered',
    },
    argTypes: {
        orgLogoSrc: {
            control: 'text',
            description: 'URL of the organization logo image',
        },
        orgNr: {
            control: 'text',
            description: 'Organization number; used to fetch emblem from Digdir when orgLogoSrc is not set',
        },
        className: {
            control: 'text',
            description: 'Additional CSS classes',
        },
    },
};

export default meta;
type Story = StoryObj<typeof OrgLogo>;

const logoWrapperStyle = { maxWidth: '2rem', padding: '1rem' };

export const Default: Story = {
    args: {
        orgLogoSrc: 'https://orglogo.digdir.no/api/emblem/svg/991825827',
    },
    render: (args) => (
        <div style={logoWrapperStyle}>
            <OrgLogo {...args} />
        </div>
    ),
};

export const WithOrgNr: Story = {
    args: {
        orgNr: '889640782',
    },
    render: (args) => (
        <div style={logoWrapperStyle}>
            <OrgLogo {...args} />
        </div>
    ),
};
