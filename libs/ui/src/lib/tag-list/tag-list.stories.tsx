import type { Meta, StoryObj } from '@storybook/react';

import { Tag } from '@digdir/designsystemet-react';
import TagList from '.';

const meta: Meta<typeof TagList> = {
    component: TagList,
    title: 'TagList',
};

export default meta;
type Story = StoryObj<typeof TagList>;

export const Primary: Story = {
    parameters: {
        nextjs: {
            appDirectory: true,
        },
    },
    render: () => (
        <>
            <div style={{ padding: '1rem' }}>
                <TagList>
                    <Tag size='sm'>My tag</Tag>
                    <Tag
                        size='sm'
                        color='success'
                    >
                        My tag
                    </Tag>
                    <Tag
                        size='sm'
                        color='neutral'
                    >
                        My tag
                    </Tag>
                    <Tag
                        size='sm'
                        color='warning'
                    >
                        My tag
                    </Tag>
                    <Tag
                        size='sm'
                        color='danger'
                    >
                        My tag
                    </Tag>
                </TagList>
            </div>
        </>
    ),
};
