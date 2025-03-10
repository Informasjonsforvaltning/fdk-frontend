import { PropsWithChildren } from 'react';

import { type Locale, getDictionary } from '@fdk-frontend/dictionaries';

import HeaderLayout from '../header-layout';
import FooterLayout from '../footer-layout';

export type HeaderFooterLayoutProps = {
    params: Promise<{
        lang: Locale['code'];
    }>;
};

const HeaderFooterLayout = async ({ children, params }: PropsWithChildren & HeaderFooterLayoutProps) => {
    const { lang } = await params;

    const dictionary = await getDictionary(lang, 'common');

    const {
        FDK_COMMUNITY_BASE_URI: communityBaseUri = '/',
        FDK_REGISTRATION_BASE_URI: registrationBaseUri = '/',
    } = process.env;

    return (
        <HeaderLayout
            dictionary={dictionary}
            baseUri={`/${lang}`}
            registrationBaseUri={registrationBaseUri}
            communityBaseUri={communityBaseUri}
        >
            <FooterLayout
                dictionary={dictionary}
                baseUri={`/${lang}`}
            >
                {children}
            </FooterLayout>
        </HeaderLayout>
    );
};

export default HeaderFooterLayout;
