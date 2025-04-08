import { PropsWithChildren } from 'react';
import { getDictionary } from '@fdk-frontend/dictionaries';
import { type RootLayoutProps } from '../root-layout';
import HeaderLayout from '../header-layout';
import FooterLayout from '../footer-layout';

const HeaderFooterLayout = async ({ children, params }: PropsWithChildren & RootLayoutProps) => {
    const { lang } = await params;
    const dictionary = await getDictionary(lang, 'common');
    const { FDK_COMMUNITY_BASE_URI: communityBaseUri = '/', FDK_REGISTRATION_BASE_URI: registrationBaseUri = '/' } =
        process.env;

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
