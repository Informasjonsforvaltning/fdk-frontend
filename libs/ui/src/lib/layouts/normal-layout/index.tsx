import { PropsWithChildren } from 'react';
import { getDictionary } from '@fdk-frontend/dictionaries';
import { type RootLayoutProps } from '../root-layout';
import HeaderLayout from '../header-layout';
import FooterLayout from '../footer-layout';
import FeedbackBanner from '../../feedback-banner';

const NormalLayout = async ({
    children,
    params,
}: PropsWithChildren & RootLayoutProps) => {
    const { lang } = await params;

    const dictionary = await getDictionary(lang, 'common');

    const { FDK_COMMUNITY_BASE_URI: communityBaseUri } = process.env;

    return (
        <HeaderLayout
            dictionary={dictionary}
            locale={lang}
        >
            <FooterLayout
                dictionary={dictionary}
                locale={lang}
            >
                <main id='main'>
                    {children}
                    <FeedbackBanner
                        locale={lang}
                        dictionary={dictionary}
                        communityBaseUri={communityBaseUri as string}
                    />
                </main>
            </FooterLayout>
        </HeaderLayout>
    );
};

export default NormalLayout;
