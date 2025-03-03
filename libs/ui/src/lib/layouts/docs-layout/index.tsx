import { PropsWithChildren } from 'react';

import { type Locale, getDictionary } from '@fdk-frontend/dictionaries';

import HeaderLayout from '../header-layout';
import FeedbackLayout from '../feedback-layout';

export type DocsLayoutProps = {
    params: Promise<{
        lang: Locale['code'];
    }>;
};

const DocsLayout = async ({ children, params }: PropsWithChildren & DocsLayoutProps) => {
    const { lang } = await params;

    const commonDictionary = await getDictionary(lang, 'common');
    const docsDictionary = await getDictionary(lang, 'docs');

    const {
        FDK_DATA_NORGE_BASE_URI,
        FDK_BASE_URI = '',
        FDK_COMMUNITY_BASE_URI: communityBaseUri = '/',
        FDK_REGISTRATION_BASE_URI: registrationBaseUri = '/',
    } = process.env;

    const baseUri = FDK_DATA_NORGE_BASE_URI || FDK_BASE_URI;

    return (
        <HeaderLayout
            dictionary={commonDictionary}
            baseUri={`/${lang}`}
            registrationBaseUri={registrationBaseUri}
            communityBaseUri={communityBaseUri}
        >
            <main id='main'>
                <FeedbackLayout
                    dictionary={docsDictionary}
                    baseUri={baseUri}
                    communityBaseUri={communityBaseUri}
                >
                    {children}
                </FeedbackLayout>
            </main>
        </HeaderLayout>
    );
};

export default DocsLayout;
