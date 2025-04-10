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
        FDK_COMMUNITY_BASE_URI: communityBaseUri,
    } = process.env;

    return (
        <HeaderLayout
            dictionary={commonDictionary}
            locale={lang}
        >
            <FooterLayout
                dictionary={commonDictionary}
                locale={lang}
            >
                <main id='main'>
                    <FeedbackLayout
                        dictionary={docsDictionary}
                        locale={lang}
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
