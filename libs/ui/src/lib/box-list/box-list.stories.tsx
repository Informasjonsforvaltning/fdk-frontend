import type { Meta, StoryObj } from '@storybook/react';

import { Button, Tag } from '@digdir/designsystemet-react';
import Box from '../box';
import PlaceholderBox from '../placeholder-box/';
import BoxLink from '../box-link';
import ExternalLink from '../external-link';

const BoxList = <ul />;

const meta: Meta<typeof BoxList> = {
    component: BoxList,
    title: 'BoxList',
};

export default meta;
type Story = StoryObj<typeof BoxList>;

export const Primary: Story = {
    parameters: {
        nextjs: {
            appDirectory: true,
        },
    },
    render: () => (
        <>
            <div style={{ padding: '1rem' }}>
                <ul className='fdk-box-list'>
                    <li>
                        <Box>This is a Box</Box>
                    </li>
                    <li>
                        <Box>This is a Box</Box>
                    </li>
                    <li>
                        <Box>This is a Box</Box>
                    </li>
                    <li>
                        <Box>This is a Box</Box>
                    </li>
                </ul>
            </div>
            <div style={{ padding: '1rem' }}>
                <ul className='fdk-box-list'>
                    <li>
                        <PlaceholderBox>This is a PlaceholderBox</PlaceholderBox>
                    </li>
                    <li>
                        <PlaceholderBox>This is a PlaceholderBox</PlaceholderBox>
                    </li>
                    <li>
                        <PlaceholderBox>This is a PlaceholderBox</PlaceholderBox>
                    </li>
                    <li>
                        <PlaceholderBox>This is a PlaceholderBox</PlaceholderBox>
                    </li>
                </ul>
            </div>
            <div style={{ padding: '1rem' }}>
                <ul className='fdk-box-list'>
                    <li>
                        <BoxLink href='#'>This is a BoxLink</BoxLink>
                    </li>
                    <li>
                        <BoxLink href='#'>This is a BoxLink</BoxLink>
                    </li>
                    <li>
                        <BoxLink href='#'>This is a BoxLink</BoxLink>
                    </li>
                    <li>
                        <BoxLink href='#'>This is a BoxLink</BoxLink>
                    </li>
                </ul>
            </div>
            <div style={{ padding: '1rem' }}>
                <ul className='fdk-box-list'>
                    <li>
                        <ExternalLink
                            className='fdk-box-link'
                            href='#'
                        >
                            This is a ExternalLink with fdk-box-link class
                        </ExternalLink>
                    </li>
                    <li>
                        <ExternalLink
                            className='fdk-box-link'
                            href='#'
                        >
                            This is a ExternalLink with fdk-box-link class
                        </ExternalLink>
                    </li>
                    <li>
                        <ExternalLink
                            className='fdk-box-link'
                            href='#'
                        >
                            This is a ExternalLink with fdk-box-link class
                        </ExternalLink>
                    </li>
                    <li>
                        <ExternalLink
                            className='fdk-box-link'
                            href='#'
                        >
                            This is a ExternalLink with fdk-box-link class
                        </ExternalLink>
                    </li>
                </ul>
            </div>
            <div style={{ padding: '1rem' }}>
                <ul className='fdk-box-list'>
                    <li>
                        <BoxLink href='#'>This is a BoxLink</BoxLink>
                    </li>
                    <li>
                        <BoxLink href='#'>This is a BoxLink</BoxLink>
                        <Button
                            size='sm'
                            variant='secondary'
                        >
                            Hello
                        </Button>
                    </li>
                    <li>
                        <BoxLink href='#'>This is a BoxLink</BoxLink>
                        <Tag
                            size='sm'
                            color='warning'
                        >
                            Hello
                        </Tag>
                    </li>
                    <li>
                        <BoxLink href='#'>This is a BoxLink</BoxLink>
                    </li>
                </ul>
            </div>
            <div style={{ padding: '1rem' }}>
                <table className='fdk-box-list-table'>
                    <tr>
                        <td colSpan='2'>
                            <BoxLink href='#'>This is a BoxLink</BoxLink>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <BoxLink href='#'>This is a BoxLink</BoxLink>
                        </td>
                        <td
                            width='1'
                            align='right'
                        >
                            <Button
                                size='sm'
                                variant='secondary'
                                style={{ margin: '0 0.25rem' }}
                            >
                                Hello
                            </Button>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <BoxLink href='#'>This is a BoxLink</BoxLink>
                        </td>
                        <td>
                            <Tag
                                size='sm'
                                color='warning'
                            >
                                Forhåndsvisning ikke tilgjengelig
                            </Tag>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan='2'>
                            <BoxLink href='#'>This is a BoxLink</BoxLink>
                        </td>
                    </tr>
                </table>
            </div>
        </>
    ),
};
