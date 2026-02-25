import { PropsWithChildren } from 'react';
import { type RootLayoutProps } from '../root-layout';
import HeaderLayout from '../header-layout';
import FooterLayout from '../footer-layout';
import FeedbackBanner from '../../feedback-banner';

const NormalLayout = async ({ children, params }: PropsWithChildren & RootLayoutProps) => {
    const { lang } = await params;
    const { FDK_COMMUNITY_BASE_URI: communityBaseUri } = process.env;

    return (
        <HeaderLayout locale={lang}>
            <FooterLayout locale={lang}>
                <main id='main'>
                    {children}
                    <FeedbackBanner
                        locale={lang}
                        communityBaseUri={communityBaseUri as string}
                    />
                </main>
            </FooterLayout>
        </HeaderLayout>
    );
};

export default NormalLayout;
