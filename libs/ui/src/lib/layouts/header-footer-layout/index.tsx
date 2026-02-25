import { PropsWithChildren } from 'react';
import { getLocalization } from '@fdk-frontend/localization';
import { type RootLayoutProps } from '../root-layout';
import HeaderLayout from '../header-layout';
import FooterLayout from '../footer-layout';

const HeaderFooterLayout = async ({ children, params }: PropsWithChildren & RootLayoutProps) => {
    const { lang } = await params;
    const dictionary = getLocalization(lang).common;
    return (
        <HeaderLayout
            dictionary={dictionary}
            locale={lang}
        >
            <FooterLayout
                dictionary={dictionary}
                locale={lang}
            >
                {children}
            </FooterLayout>
        </HeaderLayout>
    );
};

export default HeaderFooterLayout;
