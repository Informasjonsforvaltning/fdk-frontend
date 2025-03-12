import { PropsWithChildren } from 'react';
import { getDictionary } from '@fdk-frontend/dictionaries';
import { type RootLayoutProps } from '../root-layout';
import HeaderLayout from '../header-layout';
import FooterLayout from '../footer-layout';
import FeedbackLayout from '../feedback-layout';

const DocsLayout = async ({ children, params }: PropsWithChildren & RootLayoutProps) => {
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
            <FooterLayout
                dictionary={commonDictionary}
                baseUri={`/${lang}`}
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
            </FooterLayout>
        </HeaderLayout>
    );
};

export default DocsLayout;
