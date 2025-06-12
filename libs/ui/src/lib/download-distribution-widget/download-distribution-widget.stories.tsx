import type { Meta, StoryObj } from '@storybook/react';
import { getDictionary } from '@fdk-frontend/dictionaries';

import DownloadDistributionWidget from '.';

const dictionary = await getDictionary('nb', 'details-page');

const meta: Meta<typeof DownloadDistributionWidget> = {
    component: DownloadDistributionWidget,
    title: 'DownloadDistributionWidget',
};

export default meta;
type Story = StoryObj<typeof DownloadDistributionWidget>;

export const Primary: Story = {
    parameters: {
        nextjs: {
            appDirectory: true,
        },
    },
    render: () => (
        <>
            <div style={{ padding: '1rem' }}>
                <DownloadDistributionWidget
                    dictionary={dictionary}
                    locale='nb'
                    downloadUrl='https://www.example.com/'
                />
            </div>
            In LinkList:
            <div style={{ padding: '1rem' }}>
                <ul className='fdk-link-list'>
                    <li>
                        <DownloadDistributionWidget
                            dictionary={dictionary}
                            locale='nb'
                            downloadUrl='https://www.example.com/'
                        />
                    </li>
                    <li>
                        <DownloadDistributionWidget
                            dictionary={dictionary}
                            locale='nb'
                            downloadUrl='https://www.example.com/'
                        />
                    </li>
                </ul>
            </div>
        </>
    ),
};
