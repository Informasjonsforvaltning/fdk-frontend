import { PropsWithChildren } from 'react';
import { type LocaleCodes } from '@fdk-frontend/localization';
import { type RootLayoutProps } from '../root-layout';
import HeaderLayout from '../header-layout';
import FooterLayout from '../footer-layout';
import FeedbackBanner from '../../feedback-banner';

const NormalLayout = async ({ children, params }: PropsWithChildren & RootLayoutProps) => {
    const { lang } = await params;
    const locale = lang as LocaleCodes;
    const { FDK_COMMUNITY_BASE_URI: communityBaseUri } = process.env;

    return (
        <HeaderLayout locale={locale}>
            <FooterLayout locale={locale}>
                <main id='main'>
                    {children}
                    <FeedbackBanner
                        locale={locale}
                        communityBaseUri={communityBaseUri as string}
                    />
                </main>
            </FooterLayout>
        </HeaderLayout>
    );
};

export default NormalLayout;
