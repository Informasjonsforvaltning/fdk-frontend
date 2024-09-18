import { PropsWithChildren } from 'react';
import RootLayout, { generateStaticParams } from '@fdk-frontend/ui/layout-root';

import { type Locale, getDictionary } from '@fdk-frontend/dictionaries';

import FeedbackLayout from '../components/layouts/feedback-layout';

export type DocsLayoutProps = {
    params: {
        lang: Locale['code'];
    };
};

const DocsLayout = async ({ children, ...props }: PropsWithChildren & DocsLayoutProps) => {
    const { lang } = props.params;
    const dictionary = await getDictionary(lang, 'docs');

    const {
        FDK_DATA_NORGE_BASE_URI,
        FDK_BASE_URI = '',
        FDK_COMMUNITY_BASE_URI: communityBaseUri = '/'
    } = process.env;

    const baseUri = FDK_DATA_NORGE_BASE_URI || FDK_BASE_URI;

    return (
        <RootLayout {...props}>
            <FeedbackLayout
                dictionary={dictionary}
                baseUri={baseUri}
                communityBaseUri={communityBaseUri}
            >
                {children}
            </FeedbackLayout>
        </RootLayout>
    );
};

export { generateStaticParams };
export default DocsLayout;
