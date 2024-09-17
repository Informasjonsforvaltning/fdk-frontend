import { PropsWithChildren } from 'react';
import RootLayout, { RootLayoutProps, generateStaticParams } from '@fdk-frontend/ui/layout-root';

import { getDictionary } from '@fdk-frontend/dictionaries';

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
        FDK_BASE_URI: baseUri = '',
        FDK_COMMUNITY_BASE_URI: communityBaseUri = '/',
        FDK_REGISTRATION_BASE_URI: registrationBaseUri = '/',
    } = process.env;

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
