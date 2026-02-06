import { PropsWithChildren } from 'react';
import { getDictionary, type LocaleCodes } from '@fdk-frontend/dictionaries';
import { type RootLayoutProps } from '../root-layout';
import HeaderLayout from '../header-layout';
import FooterLayout from '../footer-layout';
import FeedbackBanner from '../../feedback-banner';

const NormalLayout = async ({ children, params }: PropsWithChildren & RootLayoutProps) => {
    const { lang } = await params;
    const locale = lang as LocaleCodes;

    const dictionary = await getDictionary(locale, 'common');

    const { FDK_COMMUNITY_BASE_URI: communityBaseUri } = process.env;

    return (
        <HeaderLayout
            dictionary={dictionary}
            locale={locale}
        >
            <FooterLayout
                dictionary={dictionary}
                locale={locale}
            >
                <main id='main'>
                    {children}
                    <FeedbackBanner
                        locale={locale}
                        dictionary={dictionary}
                        communityBaseUri={communityBaseUri as string}
                    />
                </main>
            </FooterLayout>
        </HeaderLayout>
    );
};

export default NormalLayout;
