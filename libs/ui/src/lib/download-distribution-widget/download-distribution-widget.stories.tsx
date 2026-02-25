import type { Meta, StoryObj } from '@storybook/react-vite';
import { getLocalization } from '@fdk-frontend/localization';

import DownloadDistributionWidget from '.';

const dictionary = getLocalization('nb').detailsPage;

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
                <ul className='fdk-box-list'>
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
